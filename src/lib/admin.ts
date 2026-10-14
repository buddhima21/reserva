import { ResourceError } from "./resources/validation";

export function adminSearchParams(params: Record<string, string | string[] | undefined>, keys: string[]) {
  const query = new URLSearchParams();
  for (const key of keys) {
    const value = params[key];
    if (value !== undefined && typeof value !== "string") throw new ResourceError(400, "INVALID_FILTER", "Choose a valid filter value.");
    if (typeof value === "string") query.set(key, value);
  }
  return query;
}
