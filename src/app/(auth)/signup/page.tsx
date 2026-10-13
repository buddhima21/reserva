import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = { title: "Create account" };
export default function SignupPage({ searchParams }: PageProps<"/signup">) {
  return <Suspense fallback={<p role="status" className="text-sm text-charcoal-muted">Loading signup…</p>}><AuthPage mode="signup" searchParams={searchParams} /></Suspense>;
}
