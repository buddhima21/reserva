import { authorizeResourceRequest, resourceBody, resourceFailure, resourceResponse, refreshResourcePages } from "@/lib/resources/http";
import { parseResourceInput } from "@/lib/resources/validation";
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
    await authorizeResourceRequest(request, true);
    const resource = await createResource(parseResourceInput(await resourceBody(request)) as ResourceInput);
    refreshResourcePages(resource.id);
    return resourceResponse({ resource }, 201);
  } catch (error) { return resourceFailure(error); }
}
