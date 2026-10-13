import "server-only";
import { getPrisma } from "@/lib/prisma";
import { ResourceError, validateResourceId, parseResourceQuery } from "@/lib/resources/validation";
import type { Prisma, PrismaClient } from "@/generated/prisma/client";
import type { ResourceInput, ResourceList, ResourceRecord } from "@/types/resource";

type Database = Pick<PrismaClient, "resource">;
type StoredResource = Prisma.ResourceGetPayload<object>;

export function serializeResource(resource: StoredResource): ResourceRecord {
  return { ...resource, category: resource.category as ResourceInput["category"], createdAt: resource.createdAt.toISOString(), updatedAt: resource.updatedAt.toISOString() };
}

export async function listResources(params = new URLSearchParams(), db: Database = getPrisma()): Promise<ResourceList> {
  const filters = parseResourceQuery(params);
  const where: Prisma.ResourceWhereInput = {};
  if (filters.query) where.OR = ["name", "description", "location"].map(field => ({ [field]: { contains: filters.query, mode: "insensitive" } }));
  if (filters.category !== "all") where.category = filters.category;
  if (filters.status !== "all") where.status = filters.status as ResourceInput["status"];
  if (filters.floor !== "all") where.floor = filters.floor;
  if (filters.capacity === "small") where.capacity = { gte: 1, lte: 4 };
  if (filters.capacity === "medium") where.capacity = { gte: 5, lte: 10 };
  if (filters.capacity === "large") where.capacity = { gte: 11 };
  const [items, total, floors, categories] = await Promise.all([
    db.resource.findMany({ where, orderBy: [{ name: "asc" }, { id: "asc" }], skip: (filters.page - 1) * filters.pageSize, take: filters.pageSize }),
    db.resource.count({ where }),
    db.resource.findMany({ select: { floor: true }, where: { floor: { not: null } }, distinct: ["floor"], orderBy: { floor: "asc" } }),
    db.resource.groupBy({ by: ["category"], _count: { _all: true } }),
  ]);
  return { items: items.map(serializeResource), total, page: filters.page, pageSize: filters.pageSize, floors: floors.flatMap(item => item.floor ? [item.floor] : []), categoryCounts: Object.fromEntries(categories.map(item => [item.category, item._count._all])) };
}

export async function getResource(id: string, db: Database = getPrisma()) {
  validateResourceId(id);
  const resource = await db.resource.findUnique({ where: { id } });
  if (!resource) throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
  return serializeResource(resource);
}

export async function getResourceBySlug(slug: string) {
  const resource = await getPrisma().resource.findUnique({ where: { slug } });
  if (!resource) throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
  return serializeResource(resource);
}

export async function createResource(data: ResourceInput, db: Database = getPrisma()) {
  return serializeResource(await db.resource.create({ data }));
}

export async function updateResource(id: string, data: Partial<ResourceInput>, db: Database = getPrisma()) {
  validateResourceId(id);
  try { return serializeResource(await db.resource.update({ where: { id }, data })); }
  catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
    throw error;
  }
}

export async function deactivateResource(id: string, db: Database = getPrisma()) {
  return updateResource(id, { status: "INACTIVE" }, db);
}
