import { Suspense, type ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<WorkspaceLoading message="Checking administrator access…" />}><AdminBoundary>{children}</AdminBoundary></Suspense>;
}

async function AdminBoundary({ children }: { children: ReactNode }) { await requireAdmin(); return children; }
