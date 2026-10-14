"use client";

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

const FeedbackContext = createContext<{
  message: string;
  notify: (message: string) => void;
  dismiss: () => void;
} | null>(null);

export function WorkspaceFeedback({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  return <FeedbackContext.Provider value={{ message, notify: setMessage, dismiss: () => setMessage("") }}>{children}</FeedbackContext.Provider>;
}

export function useWorkspaceFeedback() {
  const feedback = useContext(FeedbackContext);
  if (!feedback) throw new Error("Workspace feedback requires the workspace layout.");
  return feedback;
}

export function WorkspaceNotice() {
  const { message, dismiss } = useWorkspaceFeedback();
  return <div role="status" aria-live="polite" aria-atomic="true">{message &&
    <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-ws-secondary/20 bg-ws-secondary-container p-4 text-sm text-ws-on-secondary-container">
      <span className="flex items-center gap-2"><Icon name="check_circle" />{message}</span>
      <button type="button" onClick={dismiss} className="rounded-lg px-3 py-1 text-xs font-medium underline">Dismiss</button>
    </div>}
  </div>;
}

export function WorkspaceLoading({ message = "Loading your workspace…" }: { message?: string }) {
  return <section role="status" aria-live="polite" aria-busy="true" className="rounded-2xl bg-white p-6 shadow-sm">
    <p className="text-sm text-ws-on-surface-variant">{message}</p>
    <div aria-hidden="true" className="mt-5 space-y-3 motion-safe:animate-pulse">
      <div className="h-6 w-2/3 rounded-lg bg-ws-surface-container-low" />
      <div className="h-20 rounded-xl bg-ws-surface-container-low" />
      <div className="h-20 rounded-xl bg-ws-surface-container-low" />
    </div>
  </section>;
}

export function WorkspaceError({ message = "Unable to load this view. Please try again.", onRetry }: { message?: string; onRetry?: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <section className="rounded-2xl bg-white p-6 shadow-sm" aria-busy={pending}>
    <h2 className="text-lg font-semibold text-ws-primary">Something went wrong</h2>
    <p role="alert" className="mt-3 text-sm text-ws-on-surface-variant">{message}</p>
    <button type="button" disabled={pending} onClick={() => startTransition(() => onRetry ? onRetry() : router.refresh())} className="mt-5 rounded-lg bg-ws-primary px-4 py-2 text-sm text-white disabled:opacity-50">{pending ? "Retrying…" : "Try again"}</button>
  </section>;
}
