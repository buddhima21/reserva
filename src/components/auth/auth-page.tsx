import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { safeAuthRedirect } from "@/lib/auth/redirect";
import { AuthForm } from "./auth-form";

export async function AuthPage({ mode, searchParams }: { mode: "login" | "signup"; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const next = safeAuthRedirect(params.next);
  const user = await getCurrentUser();
  if (user) redirect(next);
  return <AuthForm mode={mode} next={next} />;
}
