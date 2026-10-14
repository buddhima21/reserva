import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { authResponse, isSameOrigin, readAuthInput } from "@/lib/auth/http";
import { updateAccountSettings } from "@/services/account-settings";
import { ResourceError } from "@/lib/resources/validation";

export async function PATCH(request: Request) {
  if (!isSameOrigin(request)) return authResponse({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return authResponse({ error: "Sign in to manage your account.", code: "UNAUTHORIZED" }, 401);
    const { url, publishableKey } = getSupabaseConfig();
    const verifier = createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
    try {
      return authResponse(await updateAccountSettings(data.user, await readAuthInput(request), supabase.auth, verifier.auth));
    } finally {
      // Password verification creates a separate temporary session; revoke it.
      await verifier.auth.signOut({ scope: "local" }).catch(() => {});
    }
  } catch (error) {
    if (error instanceof ResourceError) return authResponse({ error: error.message, code: error.code }, error.status);
    return authResponse({ error: "Account settings are temporarily unavailable. Please try again.", code: "SETTINGS_UNAVAILABLE" }, 503);
  }
}
