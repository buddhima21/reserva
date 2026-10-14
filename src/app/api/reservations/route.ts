import { revalidatePath } from "next/cache";
import { authorizeResourceRequest as authorize, resourceBody, resourceFailure, resourceResponse } from "@/lib/resources/http";
import { parseReservationInput } from "@/lib/reservations";
import { createReservation, listReservations } from "@/services/reservations";

export async function GET(request: Request) {
  try {
    const user = await authorize(request);
    return resourceResponse(await listReservations(user.id, new URL(request.url).searchParams));
  } catch (error) { return resourceFailure(error); }
}

export async function POST(request: Request) {
  try {
    const user = await authorize(request, true);
    const reservation = await createReservation(user.id, parseReservationInput(await resourceBody(request)));
    for (const path of ["/reservations", "/availability", "/dashboard", "/resources"]) revalidatePath(path);
    return resourceResponse({ reservation }, 201);
  } catch (error) { return resourceFailure(error); }
}
