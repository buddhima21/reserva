import { authorizeResourceRequest, authorizeAdminRequest, resourceBody, resourceFailure, resourceResponse, refreshResourcePages } from "@/lib/resources/http";
import { parseResourceInput } from "@/lib/resources/validation";
import { getResource, updateResource, deactivateResource } from "@/services/resources";

export async function GET(request: Request, context: RouteContext<"/api/resources/[id]">) {
  try {
    await authorizeResourceRequest(request);
    return resourceResponse({ resource: await getResource((await context.params).id) });
  } catch (error) { return resourceFailure(error); }
}

export async function PATCH(request: Request, context: RouteContext<"/api/resources/[id]">) {
  try {
    await authorizeAdminRequest(request, true);
    const { id } = await context.params;
    const resource = await updateResource(id, parseResourceInput(await resourceBody(request), true));
    refreshResourcePages(id);
    return resourceResponse({ resource });
  } catch (error) { return resourceFailure(error); }
}

export async function DELETE(request: Request, context: RouteContext<"/api/resources/[id]">) {
  try {
    await authorizeAdminRequest(request, true);
    const { id } = await context.params;
    const resource = await deactivateResource(id);
    refreshResourcePages(id);
    return resourceResponse({ resource, message: "Resource deactivated. Its record and history are preserved." });
  } catch (error) { return resourceFailure(error); }
}
