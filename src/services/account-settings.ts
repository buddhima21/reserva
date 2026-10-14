import "server-only";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { ResourceError } from "@/lib/resources/validation";

type Auth = SupabaseClient["auth"];

function settingsError(error: { code?: string; status?: number }) {
  if (error.status === 429) return new ResourceError(429, "RATE_LIMITED", "Too many attempts. Please wait a few minutes and try again.");
  if (error.code === "weak_password") return new ResourceError(400, "WEAK_PASSWORD", "Choose a stronger password that meets your account’s password requirements.");
  if (error.code === "same_password") return new ResourceError(400, "SAME_PASSWORD", "Choose a password different from your current password.");
  if (error.code === "reauthentication_needed" || error.code === "reauthentication_not_valid") return new ResourceError(403, "REAUTHENTICATION_REQUIRED", "Sign out and sign in again before changing your password.");
  return new ResourceError(503, "ACCOUNT_UPDATE_UNAVAILABLE", "Unable to update your account right now. Please try again.");
}

export async function updateAccountSettings(user: User, input: Record<string, unknown> | null, auth: Pick<Auth, "updateUser">, verifier: Pick<Auth, "signInWithPassword">) {
  if (!input) throw new ResourceError(400, "INVALID_INPUT", "Enter valid account details.");
  if (input.action === "profile") {
    const name = typeof input.name === "string" ? input.name.trim() : "";
    if (name.length < 2 || name.length > 80) throw new ResourceError(400, "INVALID_NAME", "Enter a name between 2 and 80 characters.");
    // Only the display name is accepted. Roles remain in the protected admins table.
    const { error } = await auth.updateUser({ data: { ...user.user_metadata, full_name: name } });
    if (error) throw settingsError(error);
    return { message: "Your profile has been updated." };
  }
  if (input.action !== "password") throw new ResourceError(400, "INVALID_ACTION", "Choose a valid account setting to update.");
  const { currentPassword, password, confirmPassword } = input;
  if (typeof currentPassword !== "string" || !currentPassword || currentPassword.length > 128 || typeof password !== "string" || password.length < 8 || password.length > 128 || password !== confirmPassword) {
    throw new ResourceError(400, "INVALID_PASSWORD", "Enter your current password and matching new passwords of 8 to 128 characters.");
  }
  if (password === currentPassword) throw new ResourceError(400, "SAME_PASSWORD", "Choose a password different from your current password.");
  if (!user.email) throw new ResourceError(400, "EMAIL_REQUIRED", "This account does not support password changes here.");
  // Verify separately so a failed check cannot replace or clear the active session.
  const { data, error } = await verifier.signInWithPassword({ email: user.email, password: currentPassword });
  if (error) {
    if (error.code === "invalid_credentials" || error.message === "Invalid login credentials") throw new ResourceError(400, "INCORRECT_PASSWORD", "Your current password is incorrect.");
    throw settingsError(error);
  }
  if (data.user?.id !== user.id) throw new ResourceError(403, "ACCOUNT_MISMATCH", "Unable to verify your current account.");
  const updated = await auth.updateUser({ password, current_password: currentPassword });
  if (updated.error) throw settingsError(updated.error);
  return { message: "Your password has been updated." };
}
