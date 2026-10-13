import { createServerSupabaseClient } from "@/lib/supabase/server";
import { authResponse, isSameOrigin, readAuthInput, validEmail, authErrorMessage } from "@/lib/auth/http";
import { safeAuthRedirect } from "@/lib/auth/redirect";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return authResponse({ error: "Invalid request origin." }, 403);
  const input = await readAuthInput(request);
  if (!input || !validEmail(input.email) || typeof input.password !== "string" || !input.password || input.password.length > 128) {
    return authResponse({ error: "Enter a valid email address and password." }, 400);
  }
  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email: input.email.trim(), password: input.password });
    if (error) return authResponse({ error: error.code === "invalid_credentials" ? "The email or password is incorrect." : authErrorMessage(error.code) }, error.status === 429 ? 429 : 400);
    return authResponse({ redirect: safeAuthRedirect(input.next) });
  } catch { return authResponse({ error: "Sign in is temporarily unavailable. Please try again." }, 503); }
}
