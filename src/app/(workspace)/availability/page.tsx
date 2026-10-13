import type { Metadata } from "next";
import { AvailabilityPreview } from "@/components/availability/availability-preview";

export const metadata: Metadata = { title: "Availability" };
export default function AvailabilityPage() { return <AvailabilityPreview />; }
