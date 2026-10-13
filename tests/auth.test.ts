import assert from "node:assert/strict";
import { test } from "node:test";
import { safeAuthRedirect } from "../src/lib/auth/redirect";
import { POST as login } from "../src/app/api/auth/login/route";
import { POST as signup } from "../src/app/api/auth/signup/route";
import { POST as logout } from "../src/app/api/auth/logout/route";
import { emailConfirmationDisabled } from "../src/lib/auth/signup-settings";

const origin = "http://localhost:3000";
function request(path: string, body: object, requestOrigin = origin) {
  return new Request(origin + path, { method: "POST", headers: { origin: requestOrigin, "content-type": "application/json" }, body: JSON.stringify(body) });
}

test("redirects retain workspace URLs and reject external/ambiguous destinations", () => {
  assert.equal(safeAuthRedirect("/reservations/new?resource=abc"), "/reservations/new?resource=abc");
  for (const value of ["https://evil.test", "//evil.test", "/\\evil.test", "/login", "/dashboard/../../auth/confirm", " /resources", "/dashboard\n", undefined, ["/resources"]]) {
    assert.equal(safeAuthRedirect(value), "/dashboard");
  }
});

test("credential changes reject cross-origin requests before contacting Supabase", async () => {
  for (const handler of [login, signup, logout]) {
    const response = await handler(request("/api/auth/login", {}, "https://evil.test"));
    assert.equal(response.status, 403);
    assert.match(response.headers.get("cache-control")!, /no-store/);
  }
});

test("login rejects malformed JSON and invalid credentials locally", async () => {
  assert.equal((await login(request("/api/auth/login", { email: "bad", password: "" }))).status, 400);
  const malformed = new Request(origin + "/api/auth/login", { method: "POST", headers: { origin, "content-type": "application/json" }, body: "{" });
  assert.equal((await login(malformed)).status, 400);
});

test("signup enforces name, password length, and matching passwords", async () => {
  for (const fields of [{ name: "A", password: "strong-pass", confirmPassword: "strong-pass" }, { name: "Alex", password: "short", confirmPassword: "short" }, { name: "Alex", password: "strong-pass", confirmPassword: "different" }]) {
    const response = await signup(request("/api/auth/signup", { email: "alex@example.com", ...fields }));
    assert.equal(response.status, 400);
  }
});

test("signup blocks before creating a user when confirmation is enabled", async (context) => {
  context.mock.method(globalThis, "fetch", async () => Response.json({ mailer_autoconfirm: false }));
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test";
  const response = await signup(request("/api/auth/signup", { name: "Alex", email: "alex@example.com", password: "strong-pass", confirmPassword: "strong-pass" }));
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /configuration/);
});

test("signup settings require explicit auto-confirm and fail on unavailable settings", async (context) => {
  const fetchMock = context.mock.method(globalThis, "fetch", async () => Response.json({ mailer_autoconfirm: true }));
  assert.equal(await emailConfirmationDisabled(), true);
  fetchMock.mock.mockImplementation(async () => Response.json({}));
  assert.equal(await emailConfirmationDisabled(), false);
  fetchMock.mock.mockImplementation(async () => new Response(null, { status: 503 }));
  await assert.rejects(emailConfirmationDisabled());
});
