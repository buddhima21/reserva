import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { requireUser } from "./session";
import { isAdminUser } from "@/services/admin-access";

// React cache deduplicates within a request; revocation is read on the next request.
export const hasAdminAccess = cache(isAdminUser);

export async function requireAdmin() {
  const user = await requireUser();
  if (!await hasAdminAccess(user.id)) redirect("/dashboard?access=admin-required");
  return user;
}
