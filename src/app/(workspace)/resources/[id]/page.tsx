import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourcePage } from "@/components/resources/resource-page";

export const metadata: Metadata = { title: "Resource Details" };
export default function ResourceDetailsPage({ params }: PageProps<"/resources/[id]">) {
  return <Suspense fallback={<WorkspaceLoading message="Loading resource…" />}><ResourcePage params={params} /></Suspense>;
}
