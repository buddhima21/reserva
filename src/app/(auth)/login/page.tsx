import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = { title: "Sign in" };
export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return <Suspense fallback={<p role="status" className="text-sm text-charcoal-muted">Loading sign in…</p>}><AuthPage mode="login" searchParams={searchParams} /></Suspense>;
}
