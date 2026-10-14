import { authorizeResourceRequest as authorize, resourceFailure, resourceResponse } from "@/lib/resources/http";
import { parseReservationRange } from "@/lib/reservations";
import { ResourceError } from "@/lib/resources/validation";
import { checkAvailability, dayAvailability } from "@/services/reservations";

export async function GET(request: Request) {
  try {
    await authorize(request);
    const params = new URL(request.url).searchParams;
    if (params.has("date")) return resourceResponse(await dayAvailability(params.get("date")!));
    const resourceId = params.get("resourceId");
    if (!resourceId) throw new ResourceError(400, "INVALID_FILTER", "Provide a date or a resource ID and start/end times.");
    const { startTime, endTime } = parseReservationRange(params.get("startTime"), params.get("endTime"));
    return resourceResponse(await checkAvailability(resourceId, startTime, endTime));
  } catch (error) { return resourceFailure(error); }
}
