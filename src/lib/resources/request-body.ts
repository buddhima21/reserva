import { ResourceError } from "./validation";

export async function resourceBody(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new ResourceError(415, "UNSUPPORTED_MEDIA_TYPE", "Send request data as application/json.");
  try { return await request.json(); }
  catch { throw new ResourceError(400, "INVALID_JSON", "The request body contains invalid JSON."); }
}
