import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { getSupabaseConfig } from "./config";

export async function createServerSupabaseClient() {
  // Supabase checks session expiry with Date.now(). Run all client initialization
  // and authentication work at request time, including authenticated prefetches.
  await connection();
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseConfig();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies. Proxy refreshes sessions;
          // Route Handlers and Server Actions can write them through this client.
        }
      },
    },
  });
}
