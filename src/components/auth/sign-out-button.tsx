"use client";
import { useState } from "react";
import { signOutCurrentBrowser } from "@/lib/auth/browser-session";

export function SignOutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    if (pending) return;
    setPending(true); setError("");
    try {
      // A document navigation clears cached authenticated layouts in this tab.
      await signOutCurrentBrowser({ setItem: (key, value) => window.localStorage.setItem(key, value) }, () => window.location.replace("/login"));
    } catch (error) {
      setError(error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError") ? "Sign out took too long. Please try again." : "Sign out failed. Please try again.");
    } finally { setPending(false); }
  }
  return <div><button type="button" onClick={signOut} disabled={pending} className="rounded-lg border border-ws-outline-variant/40 px-3 py-1.5 text-xs font-medium text-ws-primary hover:bg-ws-surface-container-low disabled:opacity-50">{pending ? "Signing out…" : "Sign out"}</button>{error && <p role="alert" className="mt-1 text-xs text-ws-error">{error}</p>}</div>;
}
