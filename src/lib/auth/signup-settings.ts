import "server-only";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function emailConfirmationDisabled() {
  const { url, publishableKey } = getSupabaseConfig();
  const response = await fetch(new URL("/auth/v1/settings", url), {
    headers: { apikey: publishableKey },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Unable to check signup settings.");
  const settings = await response.json();
  return settings.mailer_autoconfirm === true;
}
