"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { useRouter } from "next/navigation";

const inputClass = "mt-2 w-full rounded-xl border border-border-strong bg-white px-4 py-3 text-sm text-charcoal shadow-xs outline-none transition focus:border-emerald-dark focus:ring-2 focus:ring-emerald-subtle/15 disabled:opacity-60";

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next: string }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (signup && data.password !== data.confirmPassword) { setError("Your passwords don’t match. Please try again."); return; }
    setPending(true); setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, next }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? "Please try again."); return; }
      if (result.redirect) { router.replace(result.redirect); router.refresh(); return; }
      setError("Unable to complete sign in. Please try again.");
    } catch { setError("We couldn’t connect. Check your connection and try again."); }
    finally { setPending(false); }
  }

  const otherHref = `${signup ? "/login" : "/signup"}?${new URLSearchParams({ next })}`;
  return <>
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-dark">Your workspace, simplified</p><h1 className="text-3xl font-semibold tracking-tight text-forest sm:text-4xl">{signup ? "Create your account" : "Welcome back"}</h1><p className="mt-3 text-sm leading-6 text-charcoal-muted">{signup ? "A little more focus. A little less scheduling. Let’s get you started." : "Sign in to your RESERVA workspace and pick up where you left off."}</p>
    <form onSubmit={submit} className="mt-8 space-y-5" aria-busy={pending}>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">{error}</p>}
      <fieldset disabled={pending} className="space-y-5">
        {signup && <label className="block text-sm font-medium text-charcoal" htmlFor="full-name">Full name<input id="full-name" name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Your full name" className={inputClass} /></label>}
        <label className="block text-sm font-medium text-charcoal" htmlFor="email">Email address<input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={inputClass} /></label>
        <div><label className="block text-sm font-medium text-charcoal" htmlFor="password">Password</label><div className="relative"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} required minLength={signup ? 8 : 1} maxLength={128} aria-describedby={signup ? "password-help" : undefined} placeholder={signup ? "Create a strong password" : "Enter your password"} className={`${inputClass} pr-20`} /><button type="button" onClick={() => setShowPassword(value => !value)} aria-controls="password" aria-pressed={showPassword} className="absolute inset-y-0 right-3 mt-2 flex items-center rounded px-1 text-xs font-medium text-charcoal-muted hover:text-forest">{showPassword ? "Hide" : "Show"}</button></div>{signup && <p id="password-help" className="mt-2 text-xs text-charcoal-muted">Use at least 8 characters.</p>}</div>
        {signup && <label className="block text-sm font-medium text-charcoal" htmlFor="confirm-password">Confirm password<input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={128} placeholder="Enter your password again" className={inputClass} /></label>}
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-light disabled:cursor-wait disabled:opacity-60">{pending ? (signup ? "Creating your account…" : "Signing in…") : (signup ? "Create account" : "Sign in")}<Icon name="arrow_forward" /></button>
      </fieldset>
    </form>
    <p className="mt-7 text-center text-sm text-charcoal-muted">{signup ? "Already have an account?" : "New to RESERVA?"} <Link href={otherHref} className="font-semibold text-forest underline-offset-4 hover:underline">{signup ? "Sign in" : "Create an account"}</Link></p>
  </>;
}
