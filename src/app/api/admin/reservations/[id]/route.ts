import { authorizeAdminRequest, resourceFailure, resourceResponse, refreshReservationPages } from "@/lib/resources/http";
import { getAdminReservation, cancelAdminReservation } from "@/services/reservations";

export async function GET(request: Request, context: RouteContext<"/api/admin/reservations/[id]">) {
  try {
    const user = await authorizeAdminRequest(request);
    return resourceResponse({ reservation: await getAdminReservation(user.id, (await context.params).id) });
  } catch (error) { return resourceFailure(error); }
}

export async function DELETE(request: Request, context: RouteContext<"/api/admin/reservations/[id]">) {
  try {
    const user = await authorizeAdminRequest(request, true);
    const { id } = await context.params;
    const reservation = await cancelAdminReservation(user.id, id);
    refreshReservationPages(id);
    return resourceResponse({ reservation, message: "Reservation cancelled. History preserved." });
  } catch (error) { return resourceFailure(error); }
}
