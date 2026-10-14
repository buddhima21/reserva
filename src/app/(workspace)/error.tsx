"use client";

import { WorkspaceError } from "@/components/ui/workspace-feedback";

export default function WorkspaceErrorBoundary({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <WorkspaceError message="This workspace view is temporarily unavailable. Your saved data has not been changed." onRetry={retry} />;
}
