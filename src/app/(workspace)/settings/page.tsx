import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireUser, userDisplayName } from "@/lib/auth/session";
import { hasAdminAccess } from "@/lib/auth/admin";
import { Icon } from "@/components/ui/icon";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { AccountSettingsForm } from "@/components/settings/account-settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <Suspense fallback={<WorkspaceLoading message="Loading your settings…" />}><Settings /></Suspense>;
}

async function Settings() {
  const user = await requireUser();
  const admin = await hasAdminAccess(user.id);
  const name = userDisplayName(user);
  const joined = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "Asia/Colombo" }).format(new Date(user.created_at));
  return <div className="space-y-7">
    <div><p className="text-xs font-semibold uppercase tracking-wider text-ws-secondary">Your workspace account</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ws-primary">Settings</h1><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">Keep your profile up to date and manage how you access RESERVA.</p></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
      <AccountSettingsForm name={name} email={user.email ?? ""} />
      <aside className="space-y-6">
        <section className="overflow-hidden rounded-2xl border border-ws-outline-variant/25 bg-white shadow-sm">
          <div className="bg-ws-primary p-6 text-white"><span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/15 text-lg font-semibold">{name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase()}</span><h2 className="mt-4 break-words text-lg font-semibold">{name}</h2><p className="mt-1 break-all text-sm text-white/70">{user.email}</p><span className="mt-4 inline-flex rounded-full bg-ws-secondary-container px-3 py-1 text-xs font-medium text-ws-on-secondary-container">{admin ? "Administrator" : "Workspace member"}</span></div>
          <dl className="space-y-4 p-6 text-sm"><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Member since</dt><dd className="font-medium text-ws-primary">{joined}</dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Workspace timezone</dt><dd className="font-medium text-ws-primary">Asia/Colombo</dd></div></dl>
        </section>
        <section className="rounded-2xl border border-ws-outline-variant/25 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><Icon name="lock" className="text-xl text-ws-secondary" /><h2 className="font-semibold text-ws-primary">Your session</h2></div><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">Closing a tab keeps you signed in. Sign out when you finish using a shared device to end this browser’s session.</p><div className="mt-5"><SignOutButton /></div></section>
        <section className="rounded-2xl bg-ws-surface-container-low p-6"><h2 className="font-semibold text-ws-primary">Workspace access</h2><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">{admin ? "You can manage resources and all reservations through Administration." : "You can browse resources, check availability, and manage your own reservations. Resource changes are handled by administrators."}</p><Link href={admin ? "/admin" : "/reservations"} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ws-secondary">{admin ? "Open administration" : "View your reservations"}<Icon name="arrow_forward" /></Link></section>
      </aside>
    </div>
  </div>;
}
