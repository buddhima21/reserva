import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { adminDashboardSummary, adminReservationOwners } from "@/services/admin";
import { listAdminReservations } from "@/services/reservations";
import { categoryLabels, resourceCategories } from "@/types/resource";
import { displayBookingTime } from "@/lib/reservations";
import { AdminHeading } from "@/components/admin/admin-heading";
import { Icon } from "@/components/ui/icon";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import { RefreshAdmin } from "@/components/admin/admin-actions";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminPage() {
  return <><AdminHeading title="Workspace overview" description="A live view of your shared spaces, equipment, and reservations across the platform." action /><Suspense fallback={<WorkspaceLoading message="Loading platform statistics…" />}><Overview /></Suspense></>;
}

async function Overview() {
  const user = await requireAdmin();
  const [stats, reservations] = await Promise.all([adminDashboardSummary(user.id), listAdminReservations(user.id, new URLSearchParams({ status: "upcoming", pageSize: "5" }))]);
  const owners = await adminReservationOwners(user.id, reservations.items.map(row => row.userId));
  const cards = [
    ["Total resources", stats.totalResources, `${stats.activeResources} operational`, "meeting_room", "/admin/resources"],
    ["Available now", stats.availableNow, "Operational and unoccupied", "check_circle", "/availability"],
    ["Bookings today", stats.todayReservations, "Confirmed, including overnight bookings", "calendar_today", "/admin/reservations"],
    ["In progress", stats.ongoingReservations, `${stats.upcomingReservations} upcoming`, "schedule", "/admin/reservations?status=ongoing"],
  ] as const;
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ws-outline-variant/30 bg-white px-4 py-3"><p className="text-xs text-ws-on-surface-variant">Updated {displayBookingTime(stats.checkedAt)} · All users</p><RefreshAdmin /></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, count, detail, icon, href]) => <Link key={label} href={href} className="rounded-2xl border border-ws-outline-variant/25 bg-white p-5 shadow-sm transition hover:border-ws-secondary/50"><div className="flex items-center justify-between"><p className="text-sm font-medium text-ws-on-surface-variant">{label}</p><span className="rounded-xl bg-ws-secondary-container p-2 text-ws-secondary"><Icon name={icon} className="text-xl" /></span></div><p className="mt-5 text-4xl font-bold tracking-tight text-ws-primary">{count}</p><p className="mt-3 text-xs text-ws-on-surface-variant">{detail}</p></Link>)}</div>
    <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <section className="overflow-hidden rounded-2xl border border-ws-outline-variant/25 bg-white shadow-sm"><div className="flex items-center justify-between gap-3 border-b border-ws-outline-variant/25 p-5"><div><h2 className="text-lg font-semibold text-ws-primary">Next reservations</h2><p className="mt-1 text-xs text-ws-on-surface-variant">Upcoming bookings across your workspace</p></div><Link href="/admin/reservations?status=upcoming" className="shrink-0 text-sm font-medium text-ws-secondary">View all</Link></div><div className="divide-y divide-ws-outline-variant/25">{reservations.items.length ? reservations.items.map(row => <Link key={row.id} href={`/admin/reservations/${row.id}`} className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-ws-surface-container-low"><div><p className="font-semibold text-ws-primary">{row.resource.name}</p><p className="mt-1 text-sm text-ws-on-surface-variant">{row.purpose}</p><p className="mt-2 text-xs text-ws-outline">{owners[row.userId]?.name ?? "Workspace member"}</p></div><div className="text-sm text-ws-on-surface-variant"><p>{displayBookingTime(row.startTime)}</p><span className="mt-2 inline-flex rounded-full bg-ws-secondary-container px-2.5 py-1 text-xs font-medium text-ws-on-secondary-container">Confirmed</span></div></Link>) : <p className="p-8 text-center text-sm text-ws-on-surface-variant">No upcoming reservations. New bookings will appear here.</p>}</div></section>
      <div className="space-y-6"><section className="rounded-2xl bg-ws-primary p-6 text-white"><h2 className="text-lg font-semibold">Resource readiness</h2><p className="mt-2 text-sm leading-6 text-white/70">Keep the inventory ready for your members.</p><dl className="mt-6 space-y-4">{[["Available for booking", stats.activeResources], ["Unavailable", stats.inactiveResources], ["Under maintenance", stats.maintenanceResources]].map(([label, count]) => <div key={label} className="flex justify-between border-b border-white/15 pb-3 text-sm"><dt className="text-white/75">{label}</dt><dd className="font-semibold">{count}</dd></div>)}</dl><Link href="/admin/resources" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ws-secondary-fixed">Manage inventory<Icon name="arrow_forward" /></Link></section><section className="rounded-2xl border border-ws-outline-variant/25 bg-white p-6"><h2 className="font-semibold text-ws-primary">Reservation history</h2><dl className="mt-4 space-y-3 text-sm">{[["All reservations", stats.totalReservations], ["Completed", stats.completedReservations], ["Cancelled", stats.cancelledReservations]].map(([label, count]) => <div key={label} className="flex justify-between"><dt className="text-ws-on-surface-variant">{label}</dt><dd className="font-semibold text-ws-primary">{count}</dd></div>)}</dl></section></div>
    </div>
    <section className="rounded-2xl border border-ws-outline-variant/25 bg-white p-6"><h2 className="font-semibold text-ws-primary">Inventory by category</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{resourceCategories.map(category => <Link key={category} href={`/admin/resources?category=${category}`} className="flex items-center justify-between rounded-xl bg-ws-surface-container-low p-4"><span className="text-sm text-ws-on-surface-variant">{categoryLabels[category]}</span><span className="text-xl font-bold text-ws-primary">{stats.categories[category] ?? 0}</span></Link>)}</div></section>
  </div>;
}
