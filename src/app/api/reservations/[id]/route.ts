import { authorizeResourceRequest as authorize, resourceFailure, resourceResponse, refreshReservationPages } from "@/lib/resources/http";
import { getReservation, cancelReservation } from "@/services/reservations";

export async function GET(request: Request, context: RouteContext<"/api/reservations/[id]">) {
  try {
    const user = await authorize(request);
    return resourceResponse({ reservation: await getReservation(user.id, (await context.params).id) });
  } catch (error) { return resourceFailure(error); }
}

export async function DELETE(request: Request, context: RouteContext<"/api/reservations/[id]">) {
  try {
    const user = await authorize(request, true);
    const { id } = await context.params;
    const reservation = await cancelReservation(user.id, id);
    refreshReservationPages(id);
    return resourceResponse({ reservation, message: "Reservation cancelled. Its history is preserved." });
  } catch (error) { return resourceFailure(error); }
}
