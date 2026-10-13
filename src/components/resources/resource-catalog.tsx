import { requireUser } from "@/lib/auth/session";
import { listResources } from "@/services/resources";
import { ResourceExplorer } from "./resource-explorer";
import type { ResourceList } from "@/types/resource";

export async function ResourceCatalog() {
  await requireUser();
  let initial: ResourceList = { items: [], total: 0, page: 1, pageSize: 12, floors: [], categoryCounts: {} };
  let error = "";
  try { initial = await listResources(); }
  catch {
    error = "Resource storage is unavailable. Please try again.";
  }
  return <ResourceExplorer initial={initial} initialError={error} />;
}
