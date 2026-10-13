import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { ResourceError, validateResourceId } from "@/lib/resources/validation";
import { getResource, getResourceBySlug } from "@/services/resources";
import { ResourceDetails } from "./resource-details";
import { ResourceForm } from "./resource-form";
import type { ResourceRecord } from "@/types/resource";

export async function ResourcePage({ params, edit = false, slug }: { params?: Promise<{ id: string }>; edit?: boolean; slug?: string }) {
  await requireUser();
  let resource: ResourceRecord | null = null;
  try {
    const id = params ? (await params).id : undefined;
    if (id) validateResourceId(id);
    resource = slug ? await getResourceBySlug(slug) : await getResource(id!);
  } catch (error) {
    if (error instanceof ResourceError && (error.status === 400 || error.status === 404)) notFound();
  }
  if (!resource) return <p role="alert" className="rounded-xl bg-white p-6 text-sm text-ws-error">Unable to load this resource. Please refresh and try again.</p>;
  return edit ? <ResourceForm resource={resource} /> : <ResourceDetails resource={resource} />;
}
