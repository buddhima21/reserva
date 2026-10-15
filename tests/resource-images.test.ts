import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import { MAX_RESOURCE_IMAGE_BYTES, resourceImageFileError } from "../src/lib/resources/image-config";
import { prepareResourceImage, readResourceSubmission, saveResourceSubmission } from "../src/lib/resources/image-upload";
import { ResourceError } from "../src/lib/resources/validation";

const details = { name: "Studio", category: "meeting", location: "Level 2", capacity: "6" };

async function image(format: "png" | "jpeg" | "webp" = "png", width = 8, height = 4) {
  const bytes = await sharp({ create: { width, height, channels: 3, background: "#338866" } }).toFormat(format).toBuffer();
  return new File([new Uint8Array(bytes)], `room.${format}`, { type: `image/${format}` });
}

function submission(file?: File, values: Record<string, string> = details) {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) form.set(key, value);
  if (file) form.set("image", file);
  return new Request("http://localhost/api/resources", { method: "POST", body: form });
}

test("image selection rejects unsupported, empty, and oversized files", () => {
  assert.match(resourceImageFileError({ type: "image/svg+xml", size: 20 })!, /JPG/);
  assert.match(resourceImageFileError({ type: "image/png", size: 0 })!, /empty/);
  assert.match(resourceImageFileError({ type: "image/png", size: MAX_RESOURCE_IMAGE_BYTES + 1 })!, /4 MB/);
  assert.equal(resourceImageFileError({ type: "image/webp", size: MAX_RESOURCE_IMAGE_BYTES }), null);
});

test("multipart resource details normalize capacity and retain a selected image", async () => {
  const result = await readResourceSubmission(submission(await image()));
  assert.equal(result.input.capacity, 6);
  assert.equal(result.input.imageUrl, null);
  assert.equal(result.file?.type, "image/png");
  const partial = await readResourceSubmission(submission(await image(), {}), true);
  assert.deepEqual(partial.input, { imageUrl: null });
});

test("JSON image links remain compatible with resource creates and partial edits", async () => {
  const result = await readResourceSubmission(new Request("http://localhost/api/resources", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ imageUrl: "https://example.com/room.png" }) }), true);
  assert.equal(result.file, null);
  assert.equal(result.input.imageUrl, "https://example.com/room.png");
});

test("multipart submissions reject duplicate fields, forged fields, and ambiguous images", async () => {
  const duplicate = new FormData();
  duplicate.append("name", "First"); duplicate.append("name", "Second");
  await assert.rejects(readResourceSubmission(new Request("http://localhost/api/resources", { method: "POST", body: duplicate })), ResourceError);
  await assert.rejects(readResourceSubmission(submission(await image(), { ...details, userId: "forged" })), ResourceError);
  await assert.rejects(readResourceSubmission(submission(await image(), { ...details, imageUrl: "https://example.com/room.png" })), error => error instanceof ResourceError && error.code === "INVALID_IMAGE");
});

test("the body limit also rejects oversized uploads without content-length", async () => {
  const multipart = submission(new File([new Uint8Array(MAX_RESOURCE_IMAGE_BYTES + 100_000)], "large.png", { type: "image/png" }));
  // Finish Undici's asynchronous multipart encoder before the size guard cancels
  // the reader. Cancelling the encoder mid-flight can reject after the test ends.
  const request = new Request(multipart.url, {
    method: "POST",
    headers: multipart.headers,
    body: await multipart.arrayBuffer(),
  });
  assert.equal(request.headers.has("content-length"), false);
  await assert.rejects(readResourceSubmission(request), error => error instanceof ResourceError && error.status === 413);
});

test("real JPG, PNG, and WebP images decode and become optimized WebP", async () => {
  for (const format of ["jpeg", "png", "webp"] as const) {
    const result = await prepareResourceImage(await image(format));
    const metadata = await sharp(result).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, 8);
    assert.equal(metadata.exif, undefined);
  }
  const resized = await sharp(await prepareResourceImage(await image("png", 2400, 1200))).metadata();
  assert.equal(resized.width, 1920); assert.equal(resized.height, 960);
});

test("fake images and incorrect MIME types are rejected before storage", async () => {
  await assert.rejects(prepareResourceImage(new File(["not an image"], "fake.png", { type: "image/png" })), ResourceError);
  const valid = await image();
  await assert.rejects(prepareResourceImage(new File([await valid.arrayBuffer()], "fake.jpg", { type: "image/jpeg" })), ResourceError);
  await assert.rejects(prepareResourceImage(await image("png", 5100, 5100)), ResourceError);
});

function storageFixture(uploadFails = false) {
  const uploaded: string[] = [];
  const removed: string[] = [];
  const client = { storage: { from(bucket: string) {
    assert.equal(bucket, "resource-images");
    return {
      async upload(path: string, bytes: Buffer, options: { contentType: string; upsert: boolean }) {
        assert.equal((await sharp(bytes).metadata()).format, "webp");
        assert.equal(options.contentType, "image/webp"); assert.equal(options.upsert, false);
        uploaded.push(path); return { error: uploadFails ? { message: "storage error" } : null };
      },
      getPublicUrl(path: string) { return { data: { publicUrl: `https://example.com/storage/${path}` } }; },
      async remove(paths: string[]) { removed.push(...paths); return { error: null }; },
    };
  } } };
  const factory = async () => client as unknown as Awaited<ReturnType<NonNullable<Parameters<typeof saveResourceSubmission>[4]>>>;
  return { uploaded, removed, factory };
}

test("saving an uploaded resource persists its URL under an unguessable admin-owned path", async () => {
  const fixture = storageFixture();
  const result = await saveResourceSubmission(submission(await image()), "admin-id", false, async input => input, fixture.factory);
  assert.match(fixture.uploaded[0], /^admin-id\/[0-9a-f-]+\.webp$/);
  assert.equal(result.imageUrl, `https://example.com/storage/${fixture.uploaded[0]}`);
  assert.equal(fixture.removed.length, 0);
});

test("a rejected resource save removes the new upload and preserves the original failure", async () => {
  const fixture = storageFixture();
  const failure = new ResourceError(409, "CONFLICT", "Resource is in use.");
  await assert.rejects(saveResourceSubmission(submission(await image()), "admin-id", true, async () => { throw failure; }, fixture.factory), error => error === failure);
  assert.deepEqual(fixture.removed, fixture.uploaded);
});

test("storage failures and invalid details never save a resource", async () => {
  const fixture = storageFixture(true);
  let saved = false;
  const save = async () => { saved = true; };
  await assert.rejects(saveResourceSubmission(submission(await image()), "admin-id", false, save, fixture.factory), error => error instanceof ResourceError && error.status === 503);
  assert.equal(saved, false);
  const invalid = storageFixture();
  await assert.rejects(saveResourceSubmission(submission(await image(), { ...details, name: "" }), "admin-id", false, save, invalid.factory), ResourceError);
  assert.equal(invalid.uploaded.length, 0); assert.equal(saved, false);
});
