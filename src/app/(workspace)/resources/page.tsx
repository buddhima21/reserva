import type { Metadata } from "next";
import { ResourceCatalog } from "@/components/resources/resource-catalog";
import { ResourcesHeading } from "@/components/resources/resources-heading";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return <><ResourcesHeading /><Suspense fallback={<p role="status" className="text-sm text-ws-on-surface-variant">Loading resources…</p>}><ResourceCatalog /></Suspense></>;
}
