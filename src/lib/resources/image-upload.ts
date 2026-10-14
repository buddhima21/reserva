import "server-only";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import type { createServerSupabaseClient } from "@/lib/supabase/server";
import { MAX_RESOURCE_IMAGE_BYTES, RESOURCE_IMAGE_BUCKET, resourceImageFileError } from "./image-config";
import { parseResourceInput, ResourceError } from "./validation";
import { resourceBody } from "./request-body";
import type { ResourceInput } from "@/types/resource";

function imageError(message: string) {
  return new ResourceError(400, "INVALID_IMAGE", message, { image: message });
}

export async function readResourceSubmission(request: Request, partial = false) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return { input: parseResourceInput(await resourceBody(request), partial), file: null };
  }
  const length = Number(request.headers.get("content-length"));
  if (length > MAX_RESOURCE_IMAGE_BYTES + 64 * 1024) throw new ResourceError(413, "IMAGE_TOO_LARGE", "Choose an image smaller than 4 MB.", { image: "Choose an image smaller than 4 MB." });
  let form: FormData;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing form body");
    const chunks: Buffer[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_RESOURCE_IMAGE_BYTES + 64 * 1024) {
        await reader.cancel();
        throw new ResourceError(413, "IMAGE_TOO_LARGE", "Choose an image smaller than 4 MB.", { image: "Choose an image smaller than 4 MB." });
      }
      chunks.push(Buffer.from(value));
    }
    form = await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
  } catch (failure) {
    if (failure instanceof ResourceError) throw failure;
    throw new ResourceError(400, "INVALID_FORM", "Unable to read this upload. Choose the image again.");
  }
  const values: Record<string, unknown> = {};
  let file: File | null = null;
  const seen = new Set<string>();
  for (const [key, value] of form) {
    if (seen.has(key)) throw new ResourceError(400, "INVALID_FORM", "Submit each resource field only once.");
    seen.add(key);
    if (key === "image") {
      if (!(value instanceof File)) throw imageError("Choose a valid image file.");
      const error = resourceImageFileError(value);
      if (error) throw imageError(error);
      file = value;
    } else {
      if (typeof value !== "string") throw new ResourceError(400, "INVALID_FORM", "Resource details must be text fields.");
      values[key] = key === "capacity" && value.trim() ? Number(value) : value;
    }
  }
  if (file) {
    if (values.imageUrl) throw imageError("Choose an uploaded image or an image URL, not both.");
    values.imageUrl = null;
  }
  return { input: parseResourceInput(values, partial), file };
}

export async function prepareResourceImage(file: File) {
  const error = resourceImageFileError(file);
  if (error) throw imageError(error);
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const pipeline = sharp(buffer, { limitInputPixels: 25_000_000, failOn: "warning" });
    const metadata = await pipeline.metadata();
    const formats: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
    const mime = formats[metadata.format ?? ""];
    if (!mime || mime !== file.type || (metadata.pages ?? 1) > 1) throw imageError("Choose a single JPG, PNG, or WebP image with the correct file type.");
    // Decode and re-encode: no SVG, embedded metadata, or original filenames are stored.
    return await pipeline.rotate().resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  } catch (failure) {
    if (failure instanceof ResourceError) throw failure;
    throw imageError("This image could not be read. Choose a valid JPG, PNG, or WebP image under 25 megapixels.");
  }
}

type StorageClient = Pick<Awaited<ReturnType<typeof createServerSupabaseClient>>, "storage">;

export async function saveResourceSubmission<T>(request: Request, userId: string, partial: boolean, save: (input: Partial<ResourceInput>) => Promise<T>, clientFactory: () => Promise<StorageClient> = async () => (await import("@/lib/supabase/server")).createServerSupabaseClient(30000)) {
  const { input, file } = await readResourceSubmission(request, partial);
  if (!file) return save(input);
  const bytes = await prepareResourceImage(file);
  const client = await clientFactory();
  const storage = client.storage.from(RESOURCE_IMAGE_BUCKET);
  const path = `${userId}/${randomUUID()}.webp`;
  const { error } = await storage.upload(path, bytes, { contentType: "image/webp", upsert: false, cacheControl: "31536000" });
  if (error) throw new ResourceError(503, "IMAGE_UPLOAD_FAILED", "The image could not be uploaded. Please try again or use an image URL.", { image: "Image storage is temporarily unavailable." });
  const { data } = storage.getPublicUrl(path);
  try { return await save({ ...input, imageUrl: data.publicUrl }); }
  catch (failure) {
    // A rejected resource save must not leave its new image in storage.
    try {
      const cleanup = await storage.remove([path]);
      if (cleanup.error) console.error("Resource image cleanup failed after a rejected save.");
    } catch { console.error("Resource image cleanup failed after a rejected save."); }
    throw failure;
  }
}
