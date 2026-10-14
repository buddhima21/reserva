import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import path from "node:path";

// Exercise real Route Handlers in Next.js, including cookies and redirects.
async function main() {
  const listener = createServer();
  listener.listen(0, "localhost");
  await once(listener, "listening");
  const address = listener.address();
  assert.ok(address && typeof address !== "string");
  const port = address.port;
  await new Promise<void>((resolve, reject) => listener.close(error => error ? reject(error) : resolve()));
  const base = `http://localhost:${port}`;
  const server = spawn(process.execPath, [path.join(process.cwd(), "node_modules/next/dist/bin/next"), "start", "--hostname", "localhost", "--port", String(port)], { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  let serverError: Error | undefined;
  server.on("error", error => { serverError = error; });
  server.stdout.resume();
  server.stderr.resume();

  try {
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      if (serverError) throw serverError;
      if (server.exitCode !== null) throw new Error("Next.js server exited before readiness. Run npm run build first.");
      try { ready = (await fetch(`${base}/login`, { signal: AbortSignal.timeout(1000) })).ok; } catch {}
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    assert.ok(ready, "Build the project before running HTTP checks.");
    const id = randomUUID();
    for (const pathname of ["/settings", "/admin", "/admin/resources", "/admin/reservations", "/admin/resources/new", `/admin/resources/${id}/edit`, `/admin/reservations/${id}`]) {
      const response = await fetch(base + pathname, { redirect: "manual" });
      assert.equal(response.status, 307, pathname);
      const target = new URL(response.headers.get("location")!, base);
      assert.equal(target.pathname, "/login");
      assert.equal(target.searchParams.get("next"), pathname);
    }
    for (const pathname of ["/api/admin/statistics", "/api/admin/reservations", `/api/admin/reservations/${id}`]) {
      const response = await fetch(base + pathname);
      assert.equal(response.status, 401, pathname);
      assert.match(response.headers.get("cache-control")!, /no-store/);
    }
    for (const [pathname, method] of [["/api/settings/account", "PATCH"], ["/api/resources", "POST"], [`/api/resources/${id}`, "PATCH"], [`/api/resources/${id}`, "DELETE"], [`/api/admin/resources/${id}`, "DELETE"], [`/api/admin/reservations/${id}`, "DELETE"]]) {
      const unauthorized = await fetch(base + pathname, { method, headers: { origin: base } });
      assert.equal(unauthorized.status, 401, pathname);
      for (const headers of [new Headers({ origin: "https://other.example" }), new Headers()]) {
        const blocked = await fetch(base + pathname, { method, headers });
        assert.equal(blocked.status, 403, pathname);
        assert.equal((await blocked.json()).code, "INVALID_ORIGIN");
      }
    }
    for (const [pathname, method] of [["/api/resources", "POST"], [`/api/resources/${id}`, "PATCH"]]) {
      const form = new FormData();
      form.set("image", new File(["fake image"], "room.png", { type: "image/png" }));
      const response = await fetch(base + pathname, { method, headers: { origin: base }, body: form });
      assert.equal(response.status, 401, "Uploads must authorize before processing files");
    }
    const logout = await fetch(`${base}/api/auth/logout`, { method: "POST", headers: { origin: base } });
    assert.equal(logout.status, 200, "Signing out with no existing session is safe and repeatable");
    assert.equal((await logout.json()).redirect, "/login");
    assert.match(logout.headers.get("cache-control")!, /no-store/);
    const blockedLogout = await fetch(`${base}/api/auth/logout`, { method: "POST", headers: { origin: "https://other.example" } });
    assert.equal(blockedLogout.status, 403);
    console.log("HTTP checks passed: protected redirects, unauthenticated APIs, same-origin mutations, and repeatable logout.");
  } finally {
    const stopped = server.exitCode !== null || server.signalCode !== null;
    if (!stopped) { const exited = once(server, "exit"); server.kill(); await exited; }
  }
}

main().catch(error => { console.error(error instanceof Error ? error.message : "HTTP checks failed."); process.exitCode = 1; });
