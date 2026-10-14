import "server-only";
import { getPrisma } from "@/lib/prisma";
import { ResourceError, validateResourceId, hasDatabaseConstraint, hasDatabaseError } from "@/lib/resources/validation";
import { serializeResource } from "@/services/resources";
import { localDayRange, type ReservationInput, type ReservationRecord, type ReservationListData, type DayAvailability } from "@/lib/reservations";
import type { Prisma, PrismaClient } from "@/generated/prisma/client";
import { assertAdminUser } from "./admin-access";

type Database = Pick<PrismaClient, "resource" | "reservation">;
type StoredReservation = Prisma.ReservationGetPayload<{ include: { resource: true } }>;
const include = { resource: true } as const;

function serialize(reservation: StoredReservation): ReservationRecord {
  return { ...reservation, startTime: reservation.startTime.toISOString(), endTime: reservation.endTime.toISOString(), createdAt: reservation.createdAt.toISOString(), updatedAt: reservation.updatedAt.toISOString(), cancelledAt: reservation.cancelledAt?.toISOString() ?? null, resource: serializeResource(reservation.resource) };
}

export async function createReservation(userId: string, data: ReservationInput, db = getPrisma()) {
  if (data.startTime <= new Date()) throw new ResourceError(400, "PAST_START", "Choose a start time in the future.");
  try {
    return await db.$transaction(async tx => {
      const rows = await tx.$queryRaw<{ id: string; status: string }[]>`SELECT id, status FROM public.resources WHERE id = ${data.resourceId}::uuid FOR UPDATE`;
      if (!rows.length) throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
      if (rows[0].status !== "ACTIVE") throw new ResourceError(409, "RESOURCE_UNAVAILABLE", "This resource is inactive or under maintenance.");
      if (data.startTime <= new Date()) throw new ResourceError(400, "PAST_START", "The start time has passed. Choose a later time.");
      const overlapping = await tx.reservation.findFirst({ where: { resourceId: data.resourceId, status: "CONFIRMED", startTime: { lt: data.endTime }, endTime: { gt: data.startTime } }, select: { id: true } });
      if (overlapping) throw new ResourceError(409, "BOOKING_CONFLICT", "This resource is already reserved for part of that time range. Choose another time or resource.");
      return serialize(await tx.reservation.create({ data: { ...data, userId }, include }));
    }, { maxWait: 10000, timeout: 15000 });
  } catch (error) {
    if (hasDatabaseConstraint(error, "reservations_no_overlap")) throw new ResourceError(409, "BOOKING_CONFLICT", "Another booking took this slot. Choose another time or resource.");
    if (hasDatabaseConstraint(error, "reservations_resource_active") || hasDatabaseError(error, "23514", "Resource is not active")) throw new ResourceError(409, "RESOURCE_UNAVAILABLE", "This resource is no longer active.");
    throw error;
  }
}

export async function getReservation(userId: string, id: string, db: Database = getPrisma()) {
  validateResourceId(userId, "User");
  return getScopedReservation(userId, id, db);
}

async function getScopedReservation(userId: string | null, id: string, db: Database) {
  validateResourceId(id, "Reservation");
  const row = await db.reservation.findFirst({ where: { id, ...(userId === null ? {} : { userId }) }, include });
  if (!row) throw new ResourceError(404, "NOT_FOUND", "This reservation could not be found.");
  return serialize(row);
}

export async function listReservations(userId: string, params = new URLSearchParams(), db: Database = getPrisma()): Promise<ReservationListData> {
  validateResourceId(userId, "User");
  return listScopedReservations(userId, params, db);
}

async function listScopedReservations(userId: string | null, params: URLSearchParams, db: Database): Promise<ReservationListData> {
  const status = params.get("status") ?? "all";
  const page = Number(params.get("page") ?? 1);
  const pageSize = Number(params.get("pageSize") ?? 12);
  if (!["all", "upcoming", "ongoing", "completed", "CANCELLED"].includes(status) || !Number.isInteger(page) || page < 1 || page > 100000 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw new ResourceError(400, "INVALID_FILTER", "Choose a valid reservation filter and pagination values.");
  const where: Prisma.ReservationWhereInput = userId === null ? {} : { userId };
  if (params.has("resourceId")) { validateResourceId(params.get("resourceId")!); where.resourceId = params.get("resourceId")!; }
  const query = params.get("q")?.trim();
  if (query && (query.length > 120 || query.includes("\0"))) throw new ResourceError(400, "INVALID_FILTER", "Search must contain at most 120 characters.");
  if (query) where.OR = [{ purpose: { contains: query, mode: "insensitive" } }, { resource: { name: { contains: query, mode: "insensitive" } } }];
  if (status === "CANCELLED") where.status = "CANCELLED";
  if (status === "ongoing") { where.status = "CONFIRMED"; const now = new Date(); where.startTime = { lte: now }; where.endTime = { gt: now }; }
  if (status === "upcoming" || status === "completed") {
    where.status = "CONFIRMED";
    const now = new Date();
    where.endTime = status === "upcoming" ? { gt: now } : { lte: now };
    if (status === "upcoming" && userId === null) where.startTime = { gt: now };
  }
  const [items, total] = await Promise.all([
    db.reservation.findMany({ where, include, orderBy: [{ startTime: status === "upcoming" ? "asc" : "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize }),
    db.reservation.count({ where }),
  ]);
  return { items: items.map(serialize), total, page, pageSize, status };
}

export async function cancelReservation(userId: string, id: string, db = getPrisma()) {
  validateResourceId(userId, "User");
  return cancelScopedReservation(userId, id, db);
}

async function cancelScopedReservation(userId: string | null, id: string, db: PrismaClient) {
  validateResourceId(id, "Reservation");
  return db.$transaction(async tx => {
    const rows = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM public.reservations WHERE id = ${id}::uuid AND (${userId}::uuid IS NULL OR "userId" = ${userId}::uuid) FOR UPDATE`;
    if (!rows.length) throw new ResourceError(404, "NOT_FOUND", "This reservation could not be found.");
    const row = await tx.reservation.findUniqueOrThrow({ where: { id }, include });
    if (row.status === "CANCELLED") return serialize(row);
    if (row.endTime <= new Date()) throw new ResourceError(409, "RESERVATION_COMPLETED", "Completed reservations cannot be cancelled.");
    return serialize(await tx.reservation.update({ where: { id }, data: { status: "CANCELLED", cancelledAt: new Date() }, include }));
  }, { maxWait: 10000, timeout: 15000 });
}

export async function listAdminReservations(actorId: string, params = new URLSearchParams(), db = getPrisma()) {
  await assertAdminUser(actorId, db);
  return listScopedReservations(null, params, db);
}

export async function getAdminReservation(actorId: string, id: string, db = getPrisma()) {
  await assertAdminUser(actorId, db);
  return getScopedReservation(null, id, db);
}

export async function cancelAdminReservation(actorId: string, id: string, db = getPrisma()) {
  await assertAdminUser(actorId, db);
  return cancelScopedReservation(null, id, db);
}

export async function checkAvailability(resourceId: string, startTime: Date, endTime: Date, db: Database = getPrisma()) {
  validateResourceId(resourceId);
  const resource = await db.resource.findUnique({ where: { id: resourceId } });
  if (!resource) throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
  const bookings = await db.reservation.findMany({ where: { resourceId, status: "CONFIRMED", startTime: { lt: endTime }, endTime: { gt: startTime } }, select: { startTime: true, endTime: true }, orderBy: { startTime: "asc" } });
  return { available: resource.status === "ACTIVE" && bookings.length === 0, resourceStatus: resource.status, conflicts: bookings.map(row => ({ startTime: row.startTime.toISOString(), endTime: row.endTime.toISOString() })), checkedAt: new Date().toISOString() };
}

export async function dayAvailability(date: string, db: Database = getPrisma()): Promise<DayAvailability> {
  const { startTime, endTime } = localDayRange(date);
  const rows = await db.resource.findMany({ where: { status: "ACTIVE" }, orderBy: [{ name: "asc" }, { id: "asc" }], include: { reservations: { where: { status: "CONFIRMED", startTime: { lt: endTime }, endTime: { gt: startTime } }, select: { startTime: true, endTime: true }, orderBy: { startTime: "asc" } } } });
  return { date, startTime: startTime.toISOString(), endTime: endTime.toISOString(), checkedAt: new Date().toISOString(), resources: rows.map(({ reservations, ...resource }) => ({ ...serializeResource(resource), bookings: reservations.map(row => ({ startTime: row.startTime.toISOString(), endTime: row.endTime.toISOString() })) })) };
}

export async function bookingResources() {
  return (await getPrisma().resource.findMany({ where: { status: "ACTIVE" }, orderBy: { name: "asc" } })).map(serializeResource);
}

export async function dashboardSummary(userId: string) {
  const db = getPrisma();
  const now = new Date();
  const ongoing = { status: "CONFIRMED" as const, startTime: { lte: now }, endTime: { gt: now } };
  const [resources, availableNow, activeReservations, upcomingReservations, liveResources] = await Promise.all([
    db.resource.count(), db.resource.count({ where: { status: "ACTIVE", reservations: { none: ongoing } } }),
    db.reservation.count({ where: { userId, ...ongoing } }), db.reservation.count({ where: { userId, status: "CONFIRMED", startTime: { gt: now } } }),
    db.resource.findMany({ where: { status: "ACTIVE" }, take: 5, orderBy: { name: "asc" }, include: { reservations: { where: ongoing, select: { endTime: true }, take: 1 } } }),
  ]);
  return { resources, availableNow, activeReservations, upcomingReservations, liveResources: liveResources.map(({ reservations, ...resource }) => ({ ...serializeResource(resource), occupiedUntil: reservations[0]?.endTime.toISOString() ?? null })) };
}
