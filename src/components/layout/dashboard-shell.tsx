import Link from "next/link";
import type { ReactNode } from "react";
import { WorkspaceNavigation } from "./workspace-navigation";
import { Icon } from "@/components/ui/icon";
import { PreviewAction } from "@/components/ui/preview-action";
import { SignOutButton } from "@/components/auth/sign-out-button";

export function DashboardShell({ children, name }: { children: ReactNode; name: string }) {
  return (
    <div className="reserva-workspace min-h-screen font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3">Skip to content</a>
      <aside className="border-b border-ws-outline-variant/40 bg-ws-surface-container-lowest lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[260px] lg:flex-col lg:justify-between lg:border-r lg:border-b-0">
        <div>
          <Link href="/" className="flex h-16 items-center gap-2 border-b border-ws-outline-variant/30 px-5">
            <span className="grid h-8 w-8 grid-cols-2 gap-1 rounded-lg bg-ws-primary p-1.5" aria-hidden="true"><span className="rounded-sm bg-white" /><span className="rounded-sm bg-ws-secondary-fixed" /><span className="rounded-sm bg-ws-secondary-fixed" /><span className="rounded-sm bg-white" /></span>
            <span className="text-base font-bold tracking-tight text-ws-primary">RESERVA</span>
            <span className="rounded bg-ws-surface-container px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-ws-on-surface-variant">WORKSPACE</span>
          </Link>
          <div className="p-4"><p className="mb-2 hidden px-3 text-[11px] font-semibold tracking-wider text-ws-outline uppercase lg:block">Platform</p><WorkspaceNavigation /></div>
        </div>
        <div className="hidden items-center gap-3 border-t border-ws-outline-variant/30 p-5 lg:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ws-primary text-xs font-semibold text-white">{name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase()}</span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-ws-on-surface">{name}</p><p className="text-xs text-ws-on-surface-variant">Workspace member</p></div>
        </div>
      </aside>
      <div className="lg:pl-[260px]">
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-ws-outline-variant/30 bg-ws-surface-container-lowest/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:sticky lg:top-0 lg:z-30 lg:px-8">
          <div className="flex items-center gap-3 text-sm text-ws-on-surface-variant"><span>Workspace</span><Icon name="chevron_right" /><span className="font-medium text-ws-on-surface">Operations</span><Link href="/resources" className="ml-2 hidden items-center gap-2 rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 py-2 text-xs sm:flex"><Icon name="search" className="text-lg" />Search resources</Link></div>
          <div className="flex items-center gap-3"><span className="rounded-full bg-ws-surface-container-low px-3 py-1 text-xs font-medium text-ws-on-surface-variant">{name}</span><SignOutButton /><PreviewAction title="Notifications" aria-label="Notifications" className="flex rounded-lg p-1 text-xl text-ws-on-surface-variant"><Icon name="notifications" /></PreviewAction><PreviewAction title="Help and documentation" aria-label="Help and documentation" message="Explore Resources to search and filter six sample assets. The dashboard includes four sample reservations. Booking and persistence will be added in a later stage." className="flex rounded-lg p-1 text-xl text-ws-on-surface-variant"><Icon name="help" /></PreviewAction></div>
        </header>
        <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <p className="mb-5 rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-lowest px-4 py-2 text-xs text-ws-on-surface-variant">UI preview · Sample data · Bookings and resource changes are not saved.</p>
          {children}
        </main>
      </div>
    </div>
  );
}
