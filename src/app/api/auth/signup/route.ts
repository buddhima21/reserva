import { createServerSupabaseClient } from "@/lib/supabase/server";
import { authResponse, isSameOrigin, readAuthInput, validEmail, authErrorMessage } from "@/lib/auth/http";
import { safeAuthRedirect } from "@/lib/auth/redirect";
import { emailConfirmationDisabled } from "@/lib/auth/signup-settings";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return authResponse({ error: "Invalid request origin." }, 403);
  const input = await readAuthInput(request);
  if (!input || !validEmail(input.email) || typeof input.name !== "string" || input.name.trim().length < 2 || input.name.trim().length > 80 || typeof input.password !== "string" || input.password.length < 8 || input.password.length > 128 || input.password !== input.confirmPassword) {
    return authResponse({ error: "Enter your name, a valid email, and matching passwords of 8–128 characters." }, 400);
  }
  try {
    // Check before creating a user so a misconfigured project sends no email.
    if (!await emailConfirmationDisabled()) {
      return authResponse({ error: "Signup is waiting for workspace configuration. Please contact the administrator." }, 503);
    }
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signUp({ email: input.email.trim(), password: input.password, options: { data: { full_name: input.name.trim() } } });
    if (error) return authResponse({ error: authErrorMessage(error.code) }, error.status === 429 ? 429 : 400);
    if (data.session) return authResponse({ redirect: safeAuthRedirect(input.next) });
    return authResponse({ error: "Unable to sign you in automatically. Please try signing in with your email and password." }, 409);
  } catch { return authResponse({ error: "Account creation is temporarily unavailable. Please try again." }, 503); }
}
