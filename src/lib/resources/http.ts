import "server-only";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { isSameOrigin } from "@/lib/auth/http";
import { ResourceError } from "./validation";
import { revalidatePath } from "next/cache";

export function resourceResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
}

export async function authorizeResourceRequest(request: Request, mutation = false) {
  if (mutation && !isSameOrigin(request)) throw new ResourceError(403, "INVALID_ORIGIN", "This request must come from the RESERVA application.");
  const user = await getCurrentUser();
  if (!user) throw new ResourceError(401, "UNAUTHORIZED", "Sign in to use the workspace.");
  return user;
}

export async function resourceBody(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new ResourceError(415, "UNSUPPORTED_MEDIA_TYPE", "Send request data as application/json.");
  try { return await request.json(); }
  catch { throw new ResourceError(400, "INVALID_JSON", "The request body contains invalid JSON."); }
}

export function resourceFailure(error: unknown) {
  if (error instanceof ResourceError) return resourceResponse({ error: error.message, code: error.code, fields: error.fields }, error.status);
  const code = error && typeof error === "object" && "code" in error ? error.code : null;
  if (code === "P2002") return resourceResponse({ error: "A resource with this identifier already exists.", code: "CONFLICT" }, 409);
  if (code === "P2003") return resourceResponse({ error: "This resource is referenced by another record and cannot be removed.", code: "RESOURCE_IN_USE" }, 409);
  if (code === "P1001" || code === "P1002" || code === "P2024" || code === "P2021" || code === "P2028") return resourceResponse({ error: "Workspace storage is temporarily unavailable. Please try again.", code: "DATABASE_UNAVAILABLE" }, 503);
  return resourceResponse({ error: "Unable to complete the request. Please try again.", code: "INTERNAL_ERROR" }, 500);
}

export function refreshResourcePages(id: string) {
  revalidatePath("/resources");
  revalidatePath(`/resources/${id}`);
  revalidatePath(`/resources/${id}/edit`);
  revalidatePath("/resources/executive-meeting-room-4a");
  revalidatePath("/dashboard");
  revalidatePath("/availability");
  revalidatePath("/reservations");
  revalidatePath("/reservations/[id]", "page");
}
