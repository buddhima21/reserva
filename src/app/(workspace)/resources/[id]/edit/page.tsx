import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourcePage } from "@/components/resources/resource-page";

export const metadata: Metadata = { title: "Edit Resource" };
export default function EditResourcePage({ params }: PageProps<"/resources/[id]/edit">) {
  return <Suspense fallback={<p role="status">Loading resource…</p>}><ResourcePage params={params} edit /></Suspense>;
}
