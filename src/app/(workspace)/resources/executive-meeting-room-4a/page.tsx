import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import { ResourcePage } from "@/components/resources/resource-page";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Executive Meeting Room 4A" };
export default function ResourceDetailsPage() { return <Suspense fallback={<WorkspaceLoading message="Loading resource…" />}><ResourcePage slug="executive-meeting-room-4a" /></Suspense>; }
