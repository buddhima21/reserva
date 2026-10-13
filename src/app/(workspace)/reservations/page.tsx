import type { Metadata } from "next";
import Link from "next/link";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = { title: "Reservations" };
export default function ReservationsPage() {
  return <><PagePlaceholder title="Reservations" description="Reservation management will be connected in the next stage. You can explore the new reservation form using sample data." /><Link href="/reservations/new" className="mt-6 inline-flex rounded-lg bg-ws-primary px-5 py-3 text-sm font-semibold text-white">Create a Reservation</Link></>;
}
