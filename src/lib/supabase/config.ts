export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey || /YOUR_|PASTE_/.test(url + publishableKey)) {
    throw new Error("Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your local environment.");
  }
  if (publishableKey.startsWith("sb_secret_")) {
    throw new Error("The Supabase browser client requires a publishable key, not a secret key.");
  }
  if (publishableKey.startsWith("eyJ")) {
    try {
      const payload = JSON.parse(atob(publishableKey.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))) as { role?: string };
      if (payload.role !== "anon") throw new Error("Invalid public key role.");
    } catch {
      throw new Error("Use a Supabase publishable key or legacy anon key, never a service-role key, in public environment variables.");
    }
  }
  return { url, publishableKey };
}
