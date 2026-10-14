import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { listAdminReservations } from "@/services/reservations";
import { adminReservationOwners } from "@/services/admin";
import { displayBookingTime } from "@/lib/reservations";
import { adminSearchParams } from "@/lib/admin";
import { AdminHeading } from "@/components/admin/admin-heading";
import { CancelReservation } from "@/components/reservations/reservation-form";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import { RefreshAdmin } from "@/components/admin/admin-actions";

export const metadata: Metadata = { title: "Admin Reservations" };
const statuses = [["all", "All reservations"], ["upcoming", "Upcoming"], ["ongoing", "In progress"], ["completed", "Completed"], ["CANCELLED", "Cancelled"]];

export default function AdminReservationsPage({ searchParams }: PageProps<"/admin/reservations">) {
  return <><AdminHeading title="All reservations" description="Review bookings across all members, open their full details, and cancel upcoming or ongoing reservations to release a slot." /><Suspense fallback={<WorkspaceLoading message="Loading all reservations…" />}><Bookings searchParams={searchParams} /></Suspense></>;
}

async function Bookings({ searchParams }: Pick<PageProps<"/admin/reservations">, "searchParams">) {
  const user = await requireAdmin();
  const query = adminSearchParams(await searchParams, ["status", "q", "resourceId", "page"]);
  const data = await listAdminReservations(user.id, query);
  const owners = await adminReservationOwners(user.id, data.items.map(row => row.userId));
  const now = new Date();
  function pageHref(page: number) { const next = new URLSearchParams(query); next.set("page", String(page)); return `/admin/reservations?${next}`; }
  return <div>
    <form action="/admin/reservations" className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-ws-outline-variant/30 bg-white p-4"><label className="min-w-48 flex-1 text-xs font-medium text-ws-on-surface-variant">Search<input name="q" maxLength={120} defaultValue={query.get("q") ?? ""} placeholder="Purpose or resource name" className="mt-2 w-full rounded-lg bg-ws-surface-container-low px-3 py-2.5 text-sm" /></label><label className="text-xs font-medium text-ws-on-surface-variant">Status<select name="status" defaultValue={query.get("status") ?? "all"} className="mt-2 block rounded-lg bg-ws-surface-container-low px-3 py-2.5 text-sm">{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>{query.has("resourceId") && <input type="hidden" name="resourceId" value={query.get("resourceId")!} />}<button type="submit" className="rounded-lg bg-ws-primary px-4 py-2.5 text-sm font-medium text-white">Apply filters</button><Link href="/admin/reservations" className="px-2 py-2.5 text-sm text-ws-secondary">Reset</Link></form>
    <section className="overflow-hidden rounded-2xl border border-ws-outline-variant/30 bg-white shadow-sm"><div className="flex items-center justify-between gap-3 border-b border-ws-outline-variant/25 p-5"><h2 className="font-semibold text-ws-primary">{data.total} reservations</h2><RefreshAdmin /></div><div className="divide-y divide-ws-outline-variant/25">{data.items.map(row => {
      const completed = new Date(row.endTime) <= now;
      const label = row.status === "CANCELLED" ? "Cancelled" : completed ? "Completed" : new Date(row.startTime) <= now ? "In progress" : "Confirmed";
      return <article key={row.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><Link href={`/admin/reservations/${row.id}`} className="font-semibold text-ws-primary hover:underline">{row.resource.name}</Link><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${row.status === "CONFIRMED" && !completed ? "bg-ws-secondary-container text-ws-on-secondary-container" : "bg-ws-surface-container-low text-ws-on-surface-variant"}`}>{label}</span></div><p className="mt-2 break-words text-sm">{row.purpose}</p><p className="mt-2 text-xs text-ws-on-surface-variant">{displayBookingTime(row.startTime)} – {displayBookingTime(row.endTime)}</p><p className="mt-2 break-all text-xs text-ws-outline">{owners[row.userId]?.name ?? "Workspace member"}{owners[row.userId]?.email && ` · ${owners[row.userId].email}`}</p></div><div className="flex flex-wrap gap-2"><Link href={`/admin/reservations/${row.id}`} className="rounded-lg bg-ws-surface-container-low px-4 py-2 text-sm font-medium text-ws-primary">Details</Link>{row.status === "CONFIRMED" && !completed && <CancelReservation id={row.id} admin />}</div></article>;
    })}{!data.items.length && <div className="p-10 text-center"><p className="text-sm text-ws-on-surface-variant">No reservations match these filters.</p><Link href="/admin/reservations" className="mt-4 inline-block text-sm font-medium text-ws-secondary">View all reservations</Link></div>}</div></section>
    <nav aria-label="Admin reservation pagination" className="mt-5 flex items-center justify-between text-sm"><span className="text-ws-on-surface-variant">Page {data.page} · {data.total} reservations</span><div className="flex gap-4">{data.page > 1 && <Link href={pageHref(data.page - 1)} className="text-ws-secondary">Previous</Link>}{data.page * data.pageSize < data.total && <Link href={pageHref(data.page + 1)} className="text-ws-secondary">Next</Link>}</div></nav>
  </div>;
}
