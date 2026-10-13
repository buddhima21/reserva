import { resourceCategories, resourceStatuses, type ResourceInput } from "@/types/resource";

export class ResourceError extends Error {
  constructor(public status: number, public code: string, message: string, public fields?: Record<string, string>) {
    super(message);
  }
}

export function validateResourceId(value: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
    throw new ResourceError(400, "INVALID_ID", "Resource ID must be a valid UUID.");
  }
}

export function parseResourceInput(value: unknown, partial = false): Partial<ResourceInput> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ResourceError(400, "INVALID_BODY", "Provide a JSON resource object.");
  const input = value as Record<string, unknown>;
  const output: Record<string, unknown> = {};
  const fields: Record<string, string> = {};
  const allowed = ["name", "category", "description", "location", "capacity", "status", "floor", "imageUrl"];
  for (const key of Object.keys(input)) if (!allowed.includes(key)) fields[key] = "This field cannot be changed.";

  for (const [key, maximum, required] of [["name", 120, true], ["location", 200, true], ["description", 2000, false], ["floor", 30, false], ["imageUrl", 2048, false]] as const) {
    if (partial && !(key in input)) continue;
    const item = input[key];
    if (!required && (item == null || item === "")) { output[key] = null; continue; }
    if (typeof item !== "string" || item.includes("\0") || item.trim().length > maximum || (required && item.trim().length < 2)) {
      fields[key] = required ? `Enter 2–${maximum} characters.` : `Use at most ${maximum} characters.`;
      continue;
    }
    output[key] = item.trim() || null;
  }

  if (!partial || "category" in input) {
    if (!resourceCategories.includes(input.category as ResourceInput["category"])) fields.category = "Choose a valid category.";
    else output.category = input.category;
  }
  if (!partial || "status" in input) {
    const status = input.status ?? (partial ? undefined : "ACTIVE");
    if (!resourceStatuses.includes(status as ResourceInput["status"])) fields.status = "Choose a valid resource status.";
    else output.status = status;
  }
  if (!partial || "capacity" in input) {
    const capacity = input.capacity ?? (partial ? undefined : 0);
    if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity < 0 || capacity > 10000) fields.capacity = "Enter a whole number from 0 to 10,000.";
    else output.capacity = capacity;
  }
  if (typeof output.imageUrl === "string") {
    try {
      const url = new URL(output.imageUrl);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error();
    } catch { fields.imageUrl = "Use a valid HTTPS image URL without embedded credentials."; }
  }
  if (Object.keys(fields).length) throw new ResourceError(400, "VALIDATION_ERROR", "Check the highlighted resource fields.", fields);
  if (partial && !Object.keys(output).length) throw new ResourceError(400, "EMPTY_UPDATE", "Provide at least one resource field to update.");
  return output as Partial<ResourceInput>;
}

export function parseResourceQuery(params: URLSearchParams) {
  const query = params.get("q")?.trim() ?? "";
  const category = params.get("category") ?? "all";
  const status = params.get("status") ?? "all";
  const floor = params.get("floor")?.trim() ?? "all";
  const capacity = params.get("capacity") ?? "all";
  const page = Number(params.get("page") ?? "1");
  const pageSize = Number(params.get("pageSize") ?? "12");
  if (query.includes("\0") || floor.includes("\0") || query.length > 120 || floor.length > 30 || !["all", ...resourceCategories].includes(category) || !["all", ...resourceStatuses].includes(status) || !["all", "small", "medium", "large"].includes(capacity) || !Number.isInteger(page) || page < 1 || page > 100000 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
    throw new ResourceError(400, "INVALID_FILTER", "Use valid search filters, page, and page size (1–100).");
  }
  return { query, category, status, floor, capacity, page, pageSize };
}
