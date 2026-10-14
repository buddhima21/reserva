import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export function userDisplayName(user: { email?: string; user_metadata: Record<string, unknown> }) {
  const name = user.user_metadata.full_name;
  return typeof name === "string" && name.trim() ? name.trim().slice(0, 80) : user.email?.split("@")[0] ?? "Member";
}
