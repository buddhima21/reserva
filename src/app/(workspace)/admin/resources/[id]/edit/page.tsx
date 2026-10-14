import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getResource } from "@/services/resources";
import { ResourceError } from "@/lib/resources/validation";
import { ResourceForm } from "@/components/resources/resource-form";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Admin Edit Resource" };
export default function EditAdminResource({ params }: PageProps<"/admin/resources/[id]/edit">) { return <Suspense fallback={<WorkspaceLoading />}><Form params={params} /></Suspense>; }
async function Form({ params }: Pick<PageProps<"/admin/resources/[id]/edit">, "params">) {
  await requireAdmin();
  let resource;
  try { resource = await getResource((await params).id); }
  catch (error) { if (error instanceof ResourceError && [400, 404].includes(error.status)) notFound(); throw error; }
  return <ResourceForm admin resource={resource} />;
}
