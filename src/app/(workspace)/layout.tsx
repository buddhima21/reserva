import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Suspense } from "react";
import { requireUser, userDisplayName } from "@/lib/auth/session";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<WorkspaceLoading message="Loading your workspace…" />}><AuthenticatedWorkspace>{children}</AuthenticatedWorkspace></Suspense>;
}

async function AuthenticatedWorkspace({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return <DashboardShell name={userDisplayName(user)}>{children}</DashboardShell>;
}
