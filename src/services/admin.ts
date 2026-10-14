import "server-only";
import { getPrisma } from "@/lib/prisma";
import { ResourceError, validateResourceId } from "@/lib/resources/validation";
import { localDate, localDayRange } from "@/lib/reservations";
import { Prisma } from "@/generated/prisma/client";
import { assertAdminUser } from "./admin-access";

export async function deleteAdminResource(actorId: string, id: string, db = getPrisma()) {
  await assertAdminUser(actorId, db);
  validateResourceId(id);
  try {
    return await db.$transaction(async tx => {
      const rows = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM public.resources WHERE id = ${id}::uuid FOR UPDATE`;
      if (!rows.length) throw new ResourceError(404, "NOT_FOUND", "This resource could not be found.");
      if (await tx.reservation.count({ where: { resourceId: id } })) throw new ResourceError(409, "RESOURCE_HAS_HISTORY", "This resource has reservation history. Mark it unavailable to preserve those records.");
      await tx.resource.delete({ where: { id } });
      return { id };
    }, { maxWait: 10000, timeout: 15000 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2003") throw new ResourceError(409, "RESOURCE_HAS_HISTORY", "This resource has reservation history. Mark it unavailable instead.");
    throw error;
  }
}

export async function adminDashboardSummary(actorId: string, db = getPrisma()) {
  await assertAdminUser(actorId, db);
  const now = new Date();
  const { startTime, endTime } = localDayRange(localDate(now));
  const ongoing = { status: "CONFIRMED" as const, startTime: { lte: now }, endTime: { gt: now } };
  const [resources, availableNow, totalReservations, ongoingReservations, upcomingReservations, completedReservations, cancelledReservations, todayReservations, categories] = await Promise.all([
    db.resource.groupBy({ by: ["status"], _count: { _all: true } }),
    db.resource.count({ where: { status: "ACTIVE", reservations: { none: ongoing } } }),
    db.reservation.count(), db.reservation.count({ where: ongoing }),
    db.reservation.count({ where: { status: "CONFIRMED", startTime: { gt: now } } }),
    db.reservation.count({ where: { status: "CONFIRMED", endTime: { lte: now } } }),
    db.reservation.count({ where: { status: "CANCELLED" } }),
    db.reservation.count({ where: { status: "CONFIRMED", startTime: { lt: endTime }, endTime: { gt: startTime } } }),
    db.resource.groupBy({ by: ["category"], _count: { _all: true } }),
  ]);
  const counts = Object.fromEntries(resources.map(row => [row.status, row._count._all]));
  return { totalResources: resources.reduce((total, row) => total + row._count._all, 0), activeResources: counts.ACTIVE ?? 0, inactiveResources: counts.INACTIVE ?? 0, maintenanceResources: counts.MAINTENANCE ?? 0, availableNow, totalReservations, ongoingReservations, upcomingReservations, completedReservations, cancelledReservations, todayReservations, categories: Object.fromEntries(categories.map(row => [row.category, row._count._all])), checkedAt: now.toISOString() };
}

export async function adminReservationOwners(actorId: string, ids: string[], db = getPrisma()) {
  await assertAdminUser(actorId, db);
  if (!ids.length) return {};
  const unique = [...new Set(ids)];
  if (unique.length > 100) throw new ResourceError(400, "INVALID_FILTER", "Too many reservation owners requested.");
  unique.forEach(id => validateResourceId(id, "User"));
  const rows = await db.$queryRaw<{ id: string; email: string | null; name: string | null }[]>(Prisma.sql`SELECT id, email, raw_user_meta_data->>'full_name' AS name FROM auth.users WHERE id IN (${Prisma.join(unique.map(id => Prisma.sql`${id}::uuid`))})`);
  return Object.fromEntries(rows.map(row => [row.id, { name: row.name || row.email || "Workspace member", email: row.email }]));
}
