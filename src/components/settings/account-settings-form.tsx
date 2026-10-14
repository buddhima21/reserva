"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";

const card = "rounded-2xl border border-ws-outline-variant/25 bg-white p-5 shadow-sm sm:p-7";
const input = "mt-2 w-full rounded-xl border border-ws-outline-variant/50 bg-white px-4 py-3 text-sm text-ws-primary outline-none focus:border-ws-secondary focus:ring-2 focus:ring-ws-secondary/15 disabled:bg-ws-surface-container-low disabled:text-ws-on-surface-variant";
const button = "rounded-xl bg-ws-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-ws-primary-container disabled:cursor-wait disabled:opacity-50";

function Feedback({ error, success }: { error: string; success: string }) {
  return <>{error && <p role="alert" className="mt-4 rounded-lg bg-ws-error/10 p-3 text-sm text-ws-error">{error}</p>}{success && <p role="status" className="mt-4 rounded-lg bg-ws-secondary-container p-3 text-sm text-ws-on-secondary-container">{success}</p>}</>;
}

export function AccountSettingsForm({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [profilePending, setProfilePending] = useState(false);
  const [passwordPending, setPasswordPending] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>, action: "profile" | "password") {
    event.preventDefault();
    if (profilePending || passwordPending) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const setPending = action === "profile" ? setProfilePending : setPasswordPending;
    const setError = action === "profile" ? setProfileError : setPasswordError;
    const setSuccess = action === "profile" ? setProfileSuccess : setPasswordSuccess;
    setError(""); setSuccess("");
    if (action === "password" && fields.password !== fields.confirmPassword) { setError("Your new passwords don’t match."); return; }
    setPending(true);
    try {
      const response = await fetch("/api/settings/account", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, ...fields }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? "Unable to save your settings. Please try again."); return; }
      setSuccess(action === "profile" ? "Your profile has been updated." : "Your password has been updated. Use it the next time you sign in.");
      if (action === "password") { form.reset(); setShowPassword(false); }
      router.refresh();
    } catch { setError("We couldn’t connect. Please try again."); }
    finally { setPending(false); }
  }

  return <div className="space-y-6">
    <section className={card}><div className="flex items-center gap-3"><span className="rounded-xl bg-ws-secondary-container p-2 text-ws-secondary"><Icon name="person" className="text-xl" /></span><div><h2 className="text-lg font-semibold text-ws-primary">Profile details</h2><p className="mt-1 text-sm text-ws-on-surface-variant">How your name appears across the workspace.</p></div></div>
      <form onSubmit={event => submit(event, "profile")} className="mt-6" aria-busy={profilePending}><fieldset disabled={profilePending || passwordPending} className="space-y-5"><label htmlFor="settings-name" className="block text-sm font-medium text-ws-primary">Full name<input key={name} id="settings-name" name="name" autoComplete="name" required minLength={2} maxLength={80} defaultValue={name} className={input} /></label><div><label htmlFor="settings-email" className="block text-sm font-medium text-ws-primary">Email address</label><input id="settings-email" type="email" value={email} readOnly className={`${input} bg-ws-surface-container-low`} aria-describedby="email-help" /><p id="email-help" className="mt-2 text-xs leading-5 text-ws-on-surface-variant">Your sign-in email. Contact your workspace administrator if you need to change it.</p></div><div className="flex justify-end border-t border-ws-outline-variant/25 pt-5"><button type="submit" className={button}>{profilePending ? "Saving…" : "Save profile"}</button></div></fieldset><Feedback error={profileError} success={profileSuccess} /></form>
    </section>
    <section className={card}><div className="flex items-center gap-3"><span className="rounded-xl bg-ws-secondary-container p-2 text-ws-secondary"><Icon name="lock" className="text-xl" /></span><div><h2 className="text-lg font-semibold text-ws-primary">Password &amp; security</h2><p className="mt-1 text-sm text-ws-on-surface-variant">Choose a strong password you haven’t used elsewhere.</p></div></div>
      <form onSubmit={event => submit(event, "password")} className="mt-6" aria-busy={passwordPending}><fieldset disabled={profilePending || passwordPending} className="space-y-5"><label htmlFor="current-password" className="block text-sm font-medium text-ws-primary">Current password<input id="current-password" name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} className={input} /></label><div className="grid gap-5 sm:grid-cols-2"><label htmlFor="new-password" className="block text-sm font-medium text-ws-primary">New password<input id="new-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={128} aria-describedby="new-password-help" className={input} /></label><label htmlFor="confirm-new-password" className="block text-sm font-medium text-ws-primary">Confirm new password<input id="confirm-new-password" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={128} className={input} /></label></div><div className="flex flex-wrap items-center justify-between gap-3"><p id="new-password-help" className="text-xs text-ws-on-surface-variant">At least 8 characters. Your current password is required.</p><button type="button" aria-pressed={showPassword} aria-controls="new-password confirm-new-password" onClick={() => setShowPassword(value => !value)} className="text-xs font-medium text-ws-secondary underline underline-offset-4">{showPassword ? "Hide new passwords" : "Show new passwords"}</button></div><div className="flex justify-end border-t border-ws-outline-variant/25 pt-5"><button type="submit" className={button}>{passwordPending ? "Updating…" : "Update password"}</button></div></fieldset><Feedback error={passwordError} success={passwordSuccess} /></form>
    </section>
  </div>;
}
