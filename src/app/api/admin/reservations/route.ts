import { authorizeAdminRequest, resourceFailure, resourceResponse } from "@/lib/resources/http";
import { listAdminReservations } from "@/services/reservations";
import { adminReservationOwners } from "@/services/admin";

export async function GET(request: Request) {
  try {
    const user = await authorizeAdminRequest(request);
    const data = await listAdminReservations(user.id, new URL(request.url).searchParams);
    const owners = await adminReservationOwners(user.id, data.items.map(row => row.userId));
    return resourceResponse({ ...data, owners });
  } catch (error) { return resourceFailure(error); }
}
