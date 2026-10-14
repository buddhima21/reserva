import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getPostgresConfig } from "./postgres-config";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaPg(getPostgresConfig(5));
  return new PrismaClient({ adapter });
}

// Created lazily: build-time imports need no database connection or credentials.
export function getPrisma() {
  const prisma = globalForPrisma.prisma ?? createPrismaClient();
  globalForPrisma.prisma = prisma;
  return prisma;
}
