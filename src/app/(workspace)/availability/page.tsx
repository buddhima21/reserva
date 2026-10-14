import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import { AvailabilityPreview } from "@/components/availability/availability-preview";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Availability" };
export default function AvailabilityPage() { return <Suspense fallback={<WorkspaceLoading message="Loading availability…" />}><AvailabilityPreview /></Suspense>; }
