import { authorizeResourceRequest, authorizeAdminRequest, resourceFailure, resourceResponse, refreshResourcePages } from "@/lib/resources/http";
import { saveResourceSubmission } from "@/lib/resources/image-upload";
import { createResource, listResources } from "@/services/resources";
import type { ResourceInput } from "@/types/resource";

export async function GET(request: Request) {
  try {
    await authorizeResourceRequest(request);
    return resourceResponse(await listResources(new URL(request.url).searchParams));
  } catch (error) { return resourceFailure(error); }
}

export async function POST(request: Request) {
  try {
    const user = await authorizeAdminRequest(request, true);
    const resource = await saveResourceSubmission(request, user.id, false, input => createResource(input as ResourceInput));
    refreshResourcePages(resource.id);
    return resourceResponse({ resource }, 201);
  } catch (error) { return resourceFailure(error); }
}
