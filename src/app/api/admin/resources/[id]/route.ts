import { authorizeAdminRequest, resourceFailure, resourceResponse, refreshResourcePages } from "@/lib/resources/http";
import { deleteAdminResource } from "@/services/admin";

export async function DELETE(request: Request, context: RouteContext<"/api/admin/resources/[id]">) {
  try {
    const user = await authorizeAdminRequest(request, true);
    const { id } = await context.params;
    await deleteAdminResource(user.id, id);
    refreshResourcePages(id);
    return resourceResponse({ message: "Resource deleted." });
  } catch (error) { return resourceFailure(error); }
}
