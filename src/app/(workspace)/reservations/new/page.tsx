import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationForm } from "@/components/reservations/reservation-form";

export const metadata: Metadata = { title: "Create a Reservation" };
export default function NewReservationPage() {
  return <Suspense fallback={<p role="status" className="rounded-xl bg-white p-8 text-sm">Loading reservation preview…</p>}><ReservationForm /></Suspense>;
}
