import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireUser } from "@/lib/auth/session";
import { listReservations } from "@/services/reservations";
import { ReservationList } from "@/components/dashboard/reservation-list";
import { ResourceError } from "@/lib/resources/validation";
import type { ReservationListData } from "@/lib/reservations";
import { WorkspaceError } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Reservations" };
export default function ReservationsPage({ searchParams }: PageProps<"/reservations">) {
  return <><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-ws-secondary">Your workspace</p><h1 className="mt-2 text-headline-xl font-bold text-ws-primary">Reservations</h1><p className="mt-2 text-sm text-ws-on-surface-variant">Manage your bookings and reservation history.</p></div><Link href="/reservations/new" className="rounded-xl bg-ws-primary px-5 py-3 text-sm font-semibold text-white">New Reservation</Link></div><Suspense fallback={<WorkspaceLoading message="Loading reservations…" />}><SavedReservations searchParams={searchParams} /></Suspense></>;
}

async function SavedReservations({ searchParams }: Pick<PageProps<"/reservations">, "searchParams">) {
  const user = await requireUser();
  const params = await searchParams;
  let data: ReservationListData | null = null;
  let error = "";
  try {
    const query = new URLSearchParams();
    for (const key of ["status", "page"]) {
      if (params[key] !== undefined && typeof params[key] !== "string") throw new ResourceError(400, "INVALID_FILTER", "Choose a valid reservation filter.");
      if (typeof params[key] === "string") query.set(key, params[key]);
    }
    data = await listReservations(user.id, query);
  } catch (failure) { error = failure instanceof ResourceError ? failure.message : "Unable to load your reservations. Please try again."; }
  if (!data) return <><WorkspaceError message={error} /><Link href="/reservations" className="mt-4 inline-block text-sm text-ws-secondary underline">Reset view</Link></>;
  return <ReservationList data={data} now={new Date().toISOString()} />;
}
