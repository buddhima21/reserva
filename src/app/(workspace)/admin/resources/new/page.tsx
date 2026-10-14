import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { ResourceForm } from "@/components/resources/resource-form";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Admin Add Resource" };
export default function NewAdminResource() { return <Suspense fallback={<WorkspaceLoading />}><Form /></Suspense>; }
async function Form() { await requireAdmin(); return <ResourceForm admin />; }
