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
  const cached = globalForPrisma.prisma;
  // Hot reload preserves globals, including clients created before a model was added.
  if (cached?.admin && cached.resource && cached.reservation) return cached;
  if (cached) {
    globalForPrisma.prisma = undefined;
    void cached.$disconnect().catch(() => {});
  }
  const prisma = createPrismaClient();
  globalForPrisma.prisma = prisma;
  return prisma;
}
