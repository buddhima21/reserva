import assert from "node:assert/strict";
import { test } from "node:test";
import type { SupabaseClient, User, UserAttributes } from "@supabase/supabase-js";
import { updateAccountSettings } from "../src/services/account-settings";

const user = { id: "member-id", email: "member@example.com", user_metadata: { full_name: "Member", other: "preserved" } } as unknown as User;
const passwordInput = { action: "password", currentPassword: "current-password", password: "new-password", confirmPassword: "new-password" };
function clients() {
  const writes: UserAttributes[] = [];
  let verificationCount = 0;
  let verificationError: { code: string; status: number } | null = null;
  let verifiedId = user.id;
  let updateError: { code: string; status: number } | null = null;
  const auth = { async updateUser(attributes: UserAttributes) { writes.push(attributes); return { data: { user }, error: updateError }; } } as unknown as Pick<SupabaseClient["auth"], "updateUser">;
  const verifier = { async signInWithPassword(credentials: { email: string; password: string }) { verificationCount++; assert.equal(credentials.email, user.email); assert.equal(credentials.password, passwordInput.currentPassword); return { data: { user: { ...user, id: verifiedId } }, error: verificationError }; } } as unknown as Pick<SupabaseClient["auth"], "signInWithPassword">;
  return { auth, verifier, writes, count: () => verificationCount, failVerification: (code: string, status = 400) => { verificationError = { code, status }; }, setVerifiedId: (id: string) => { verifiedId = id; }, failUpdate: (code: string, status: number) => { updateError = { code, status }; } };
}

test("profile updates accept only the name and preserve existing metadata", async () => {
  const c = clients();
  await updateAccountSettings(user, { action: "profile", name: "  Updated Member  ", role: "admin", email: "other@example.com", userId: "other-id" }, c.auth, c.verifier);
  assert.deepEqual(c.writes, [{ data: { full_name: "Updated Member", other: "preserved" } }]);
  assert.equal(c.count(), 0);
});

test("invalid settings never contact the provider or write account changes", async () => {
  const c = clients();
  for (const input of [null, { action: "role", role: "admin" }, { action: "profile", name: " " }, { ...passwordInput, confirmPassword: "mismatch" }, { ...passwordInput, currentPassword: "" }, { ...passwordInput, password: "short", confirmPassword: "short" }]) {
    await assert.rejects(updateAccountSettings(user, input, c.auth, c.verifier), { status: 400 });
  }
  assert.equal(c.count(), 0);
  assert.equal(c.writes.length, 0);
});

test("password changes require the current password and the same verified user", async () => {
  const c = clients();
  c.failVerification("invalid_credentials");
  await assert.rejects(updateAccountSettings(user, passwordInput, c.auth, c.verifier), { code: "INCORRECT_PASSWORD" });
  assert.equal(c.writes.length, 0);
  const other = clients();
  other.setVerifiedId("another-user");
  await assert.rejects(updateAccountSettings(user, passwordInput, other.auth, other.verifier), { status: 403, code: "ACCOUNT_MISMATCH" });
  assert.equal(other.writes.length, 0);
  const valid = clients();
  await updateAccountSettings(user, passwordInput, valid.auth, valid.verifier);
  assert.deepEqual(valid.writes, [{ password: passwordInput.password, current_password: passwordInput.currentPassword }]);
});

test("settings report rate limits and provider failures without private details", async () => {
  const c = clients();
  c.failVerification("over_request_rate_limit", 429);
  await assert.rejects(updateAccountSettings(user, passwordInput, c.auth, c.verifier), { status: 429 });
  assert.equal(c.writes.length, 0);
  const unavailable = clients();
  unavailable.failUpdate("unexpected_failure", 500);
  await assert.rejects(updateAccountSettings(user, { action: "profile", name: "Member Name" }, unavailable.auth, unavailable.verifier), { status: 503 });
});
