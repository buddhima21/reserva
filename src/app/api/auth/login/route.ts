import { createServerSupabaseClient } from "@/lib/supabase/server";
import { authResponse, isSameOrigin, readAuthInput, validEmail } from "@/lib/auth/http";
import { loginErrorResponse } from "@/lib/auth/login-error";
import { safeAuthRedirect } from "@/lib/auth/redirect";
import { isAdminUser } from "@/services/admin-access";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return authResponse({ error: "Invalid request origin." }, 403);
  const input = await readAuthInput(request);
  if (!input || !validEmail(input.email) || typeof input.password !== "string" || !input.password || input.password.length > 128) {
    return authResponse({ error: "Enter a valid email address and password." }, 400);
  }
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: input.email.trim(), password: input.password });
    if (error) {
      const failure = loginErrorResponse(error);
      console.warn("Login authentication failed", { code: failure.body.code, status: error.status });
      return authResponse(failure.body, failure.status);
    }
    const next = safeAuthRedirect(input.next);
    return authResponse({ redirect: next === "/dashboard" && await isAdminUser(data.user.id) ? "/admin" : next });
  } catch { return authResponse({ error: "Sign in is temporarily unavailable. Please try again." }, 503); }
}
