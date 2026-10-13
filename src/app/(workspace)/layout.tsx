import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Suspense } from "react";
import { requireUser, userDisplayName } from "@/lib/auth/session";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<p role="status" className="p-8 text-sm text-muted">Loading your workspace…</p>}><AuthenticatedWorkspace>{children}</AuthenticatedWorkspace></Suspense>;
}

async function AuthenticatedWorkspace({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return <DashboardShell name={userDisplayName(user)}>{children}</DashboardShell>;
}
