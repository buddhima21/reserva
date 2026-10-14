import "server-only";
import { getPrisma } from "@/lib/prisma";
import { ResourceError } from "@/lib/resources/validation";
import type { PrismaClient } from "@/generated/prisma/client";

type Database = Pick<PrismaClient, "admin">;

export async function isAdminUser(userId: string, db: Database = getPrisma()) {
  return !!await db.admin.findUnique({ where: { userId }, select: { userId: true } });
}

export async function assertAdminUser(userId: string, db: Database = getPrisma()) {
  if (!await isAdminUser(userId, db)) throw new ResourceError(403, "ADMIN_REQUIRED", "Administrator access is required for this action.");
}
