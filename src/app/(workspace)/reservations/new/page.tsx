import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { requireUser } from "@/lib/auth/session";
import { bookingResources } from "@/services/reservations";

export const metadata: Metadata = { title: "Create a Reservation" };
export default function NewReservationPage() {
  return <Suspense fallback={<WorkspaceLoading message="Loading reservation form…" />}><NewReservation /></Suspense>;
}

async function NewReservation() {
  await requireUser();
  const resources = await bookingResources();
  return <ReservationForm resources={resources} now={new Date().toISOString()} />;
}
