import assert from "node:assert/strict";
import { test } from "node:test";
import { SIGN_OUT_EVENT, signOutCurrentBrowser, watchBrowserSession } from "../src/lib/auth/browser-session";

test("successful sign-out notifies other tabs and navigates after the API succeeds", async () => {
  const events: string[] = [];
  const storage = { setItem(key: string, value: string) { assert.equal(key, SIGN_OUT_EVENT); assert.ok(value); events.push("notification"); } };
  await signOutCurrentBrowser(storage, () => { events.push("navigation"); }, async (url, init) => {
    assert.equal(url, "/api/auth/logout");
    assert.equal(init?.method, "POST");
    assert.ok(init?.signal);
    events.push("request");
    return Response.json({ redirect: "/login" });
  });
  assert.deepEqual(events, ["request", "notification", "navigation"]);
});

test("failed or timed-out sign-out never broadcasts success or navigates", async () => {
  const unexpected = () => { assert.fail("A failed logout cannot report success"); };
  await assert.rejects(signOutCurrentBrowser({ setItem: unexpected }, unexpected, async () => new Response(null, { status: 503 })));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException("Timed out", "TimeoutError")), 10);
  try {
    await assert.rejects(signOutCurrentBrowser({ setItem: unexpected }, unexpected, async (_url, init) => new Promise<Response>((_resolve, reject) => {
      init!.signal!.addEventListener("abort", () => reject(init!.signal!.reason), { once: true });
    }), controller.signal), { name: "TimeoutError" });
  } finally { clearTimeout(timer); }
});

test("disabled browser storage does not prevent successful sign-out", async () => {
  let navigated = false;
  await signOutCurrentBrowser({ setItem() { throw new Error("Storage disabled"); } }, () => { navigated = true; }, async () => Response.json({}));
  assert.equal(navigated, true);
});

function tab() {
  const target = new EventTarget();
  let marker: string | null = "previous-sign-out";
  let redirects = 0;
  let reloads = 0;
  Object.assign(target, {
    localStorage: { getItem() { return marker; } },
    location: { replace(path: string) { assert.equal(path, "/login"); redirects++; }, reload() { reloads++; } },
  });
  return { target, browser: target as unknown as Window, mark: (value: string) => { marker = value; }, redirects: () => redirects, reloads: () => reloads };
}

test("switching tabs alone does not sign out; a new logout notification redirects once", () => {
  const t = tab();
  const stop = watchBrowserSession(t.browser);
  t.target.dispatchEvent(new Event("focus"));
  t.target.dispatchEvent(Object.assign(new Event("storage"), { key: "unrelated", newValue: "value" }));
  assert.equal(t.redirects(), 0);
  t.mark("new-sign-out");
  t.target.dispatchEvent(new Event("focus"));
  t.target.dispatchEvent(Object.assign(new Event("storage"), { key: SIGN_OUT_EVENT, newValue: "new-sign-out" }));
  assert.equal(t.redirects(), 1);
  stop();
});

test("background tabs receive logout events and restored history verifies the session", () => {
  const t = tab();
  const stop = watchBrowserSession(t.browser);
  t.target.dispatchEvent(Object.assign(new Event("pageshow"), { persisted: false }));
  assert.equal(t.reloads(), 0);
  t.target.dispatchEvent(Object.assign(new Event("pageshow"), { persisted: true }));
  assert.equal(t.reloads(), 1);
  t.target.dispatchEvent(Object.assign(new Event("storage"), { key: SIGN_OUT_EVENT, newValue: "another-sign-out" }));
  assert.equal(t.redirects(), 1);
  stop();
  const cleaned = tab();
  const dispose = watchBrowserSession(cleaned.browser);
  dispose();
  cleaned.mark("new-sign-out");
  cleaned.target.dispatchEvent(new Event("focus"));
  assert.equal(cleaned.redirects(), 0);
});
