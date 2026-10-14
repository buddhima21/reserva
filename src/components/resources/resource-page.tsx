import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { requireAdmin, hasAdminAccess } from "@/lib/auth/admin";
import { ResourceError, validateResourceId } from "@/lib/resources/validation";
import { getResource, getResourceBySlug } from "@/services/resources";
import { ResourceDetails } from "./resource-details";
import { ResourceForm } from "./resource-form";
import type { ResourceRecord } from "@/types/resource";
import { WorkspaceError } from "@/components/ui/workspace-feedback";

export async function ResourcePage({ params, edit = false, slug }: { params?: Promise<{ id: string }>; edit?: boolean; slug?: string }) {
  const user = edit ? await requireAdmin() : await requireUser();
  let resource: ResourceRecord | null = null;
  try {
    const id = params ? (await params).id : undefined;
    if (id) validateResourceId(id);
    resource = slug ? await getResourceBySlug(slug) : await getResource(id!);
  } catch (error) {
    if (error instanceof ResourceError && (error.status === 400 || error.status === 404)) notFound();
  }
  if (!resource) return <WorkspaceError message="Unable to load this resource. Please try again." />;
  return edit ? <ResourceForm resource={resource} /> : <ResourceDetails resource={resource} canManage={await hasAdminAccess(user.id)} />;
}
