import { authorizeAdminRequest, resourceFailure, resourceResponse } from "@/lib/resources/http";
import { adminDashboardSummary } from "@/services/admin";

export async function GET(request: Request) {
  try {
    const user = await authorizeAdminRequest(request);
    return resourceResponse(await adminDashboardSummary(user.id));
  } catch (error) { return resourceFailure(error); }
}
