import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { ResourceError } from "@/lib/resources/validation";
import { getReservation } from "@/services/reservations";
import { displayBookingTime, type ReservationRecord } from "@/lib/reservations";
import { CancelReservation } from "@/components/reservations/reservation-form";
import { WorkspaceError } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Reservation Details" };
export default function ReservationDetailsPage({ params }: PageProps<"/reservations/[id]">) {
  return <Suspense fallback={<WorkspaceLoading message="Loading reservation…" />}><ReservationDetails params={params} /></Suspense>;
}

async function ReservationDetails({ params }: Pick<PageProps<"/reservations/[id]">, "params">) {
  const user = await requireUser();
  let reservation: ReservationRecord | null = null;
  try { reservation = await getReservation(user.id, (await params).id); }
  catch (failure) { if (failure instanceof ResourceError && [400, 404].includes(failure.status)) notFound(); }
  if (!reservation) return <WorkspaceError message="Unable to load this reservation. Please try again." />;
  const completed = new Date(reservation.endTime) <= new Date();
  const status = reservation.status === "CANCELLED" ? "Cancelled" : completed ? "Completed" : new Date(reservation.startTime) <= new Date() ? "In progress" : "Confirmed";
  return <div className="mx-auto max-w-4xl"><Link href="/reservations" className="mb-6 inline-block text-sm text-ws-secondary">← Back to Reservations</Link><section className="rounded-2xl bg-ws-primary-container p-6 text-white sm:p-8"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{status}</span><h1 className="mt-4 text-3xl font-bold tracking-tight">{reservation.purpose}</h1><Link href={`/resources/${reservation.resourceId}`} className="mt-3 inline-block text-sm text-ws-secondary-fixed underline-offset-4 hover:underline">{reservation.resource.name}</Link></section><section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="text-lg font-semibold text-ws-primary">Reservation Details</h2><dl className="mt-6 grid gap-6 text-sm sm:grid-cols-2">{[["Start", displayBookingTime(reservation.startTime)], ["End", displayBookingTime(reservation.endTime)], ["Location", reservation.resource.location], ["Time zone", "Asia/Colombo"], ["Reservation ID", reservation.id], ["Booked on", displayBookingTime(reservation.createdAt)]].map(([label, value]) => <div key={label}><dt className="text-xs text-ws-outline">{label}</dt><dd className="mt-1 break-words font-medium">{value}</dd></div>)}</dl>{reservation.notes && <div className="mt-6 border-t border-ws-outline-variant/30 pt-5"><h3 className="text-sm font-medium">Notes &amp; requirements</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ws-on-surface-variant">{reservation.notes}</p></div>}{reservation.status === "CONFIRMED" && !completed && <div className="mt-7 flex items-center justify-between gap-4 border-t border-ws-outline-variant/30 pt-5"><p className="text-xs text-ws-on-surface-variant">Cancellation releases this time slot and preserves your history.</p><CancelReservation id={reservation.id} /></div>}{reservation.cancelledAt && <p className="mt-6 text-sm text-ws-on-surface-variant">Cancelled on {displayBookingTime(reservation.cancelledAt)}</p>}</section></div>;
}
