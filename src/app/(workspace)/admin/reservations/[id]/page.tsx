import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getAdminReservation } from "@/services/reservations";
import { adminReservationOwners } from "@/services/admin";
import { ResourceError } from "@/lib/resources/validation";
import { displayBookingTime } from "@/lib/reservations";
import { AdminHeading } from "@/components/admin/admin-heading";
import { CancelReservation } from "@/components/reservations/reservation-form";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Admin Reservation Details" };
export default function AdminReservationPage({ params }: PageProps<"/admin/reservations/[id]">) { return <Suspense fallback={<WorkspaceLoading message="Loading reservation…" />}><Details params={params} /></Suspense>; }

async function Details({ params }: Pick<PageProps<"/admin/reservations/[id]">, "params">) {
  const user = await requireAdmin();
  let row;
  try { row = await getAdminReservation(user.id, (await params).id); }
  catch (error) { if (error instanceof ResourceError && [400, 404].includes(error.status)) notFound(); throw error; }
  const owner = (await adminReservationOwners(user.id, [row.userId]))[row.userId];
  const completed = new Date(row.endTime) <= new Date();
  const label = row.status === "CANCELLED" ? "Cancelled" : completed ? "Completed" : new Date(row.startTime) <= new Date() ? "In progress" : "Confirmed";
  return <div className="mx-auto max-w-4xl"><Link href="/admin/reservations" className="mb-6 inline-block text-sm text-ws-secondary">← All reservations</Link><AdminHeading title={row.purpose} description="Reservation details and management across the workspace." /><div className="rounded-2xl border border-ws-outline-variant/30 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-center justify-between gap-4"><Link href={`/resources/${row.resourceId}`} className="text-xl font-semibold text-ws-primary">{row.resource.name}</Link><span className="rounded-full bg-ws-secondary-container px-3 py-1.5 text-xs font-semibold text-ws-on-secondary-container">{label}</span></div><dl className="mt-8 grid gap-6 sm:grid-cols-2">{[["Booked by", owner?.name ?? "Workspace member"], ["Email", owner?.email ?? "Not available"], ["Start", displayBookingTime(row.startTime)], ["End", displayBookingTime(row.endTime)], ["Location", row.resource.location], ["Created", displayBookingTime(row.createdAt)], ["Reservation ID", row.id], ["Cancelled", row.cancelledAt ? displayBookingTime(row.cancelledAt) : "—"]].map(([title, value]) => <div key={title}><dt className="text-xs font-medium text-ws-on-surface-variant">{title}</dt><dd className="mt-2 break-words text-sm text-ws-primary">{value}</dd></div>)}</dl><section className="mt-8 border-t border-ws-outline-variant/30 pt-6"><h2 className="text-sm font-semibold text-ws-primary">Notes and requirements</h2><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-ws-on-surface-variant">{row.notes || "No notes provided."}</p></section><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ws-outline-variant/30 pt-6"><p className="max-w-lg text-xs leading-5 text-ws-on-surface-variant">Cancellation releases the slot and preserves this record. Completed reservations remain in history.</p>{row.status === "CONFIRMED" && !completed && <CancelReservation id={row.id} admin />}</div></div></div>;
}
