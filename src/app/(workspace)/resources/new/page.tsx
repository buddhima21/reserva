import type { Metadata } from "next";
import { ResourceForm } from "@/components/resources/resource-form";
import { requireAdmin } from "@/lib/auth/admin";
import { Suspense } from "react";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

export const metadata: Metadata = { title: "Add Resource" };
export default function NewResourcePage() { return <Suspense fallback={<WorkspaceLoading />}><AdminResourceForm /></Suspense>; }
async function AdminResourceForm() { await requireAdmin(); return <ResourceForm />; }
