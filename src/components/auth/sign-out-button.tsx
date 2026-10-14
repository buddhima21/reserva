"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    if (pending) return;
    setPending(true); setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      router.replace("/login");
      router.refresh();
    } catch { setError("Sign out failed. Try again."); setPending(false); }
  }
  return <div><button type="button" onClick={signOut} disabled={pending} className="rounded-lg border border-ws-outline-variant/40 px-3 py-1.5 text-xs font-medium text-ws-primary hover:bg-ws-surface-container-low disabled:opacity-50">{pending ? "Signing out…" : "Sign out"}</button>{error && <p role="alert" className="mt-1 text-xs text-ws-error">{error}</p>}</div>;
}
