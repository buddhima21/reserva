import { createServerSupabaseClient } from "@/lib/supabase/server";
import { authResponse, isSameOrigin } from "@/lib/auth/http";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return authResponse({ error: "Invalid request origin." }, 403);
  try {
    const supabase = await createServerSupabaseClient(10000);
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) return authResponse({ error: "Unable to sign out. Please try again." }, 503);
    return authResponse({ redirect: "/login" });
  } catch { return authResponse({ error: "Unable to sign out. Please try again." }, 503); }
}
