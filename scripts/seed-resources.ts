import { loadEnvConfig } from "@next/env";
import { getPrisma } from "../src/lib/prisma";
import samples from "../prisma/seed-resources.json";
import type { ResourceInput } from "../src/types/resource";

loadEnvConfig(process.cwd());
const prisma = getPrisma();

async function main() {
  await prisma.$transaction(async tx => {
    for (const sample of samples) {
      await tx.resource.upsert({ where: { slug: sample.slug }, create: { ...sample, category: sample.category as ResourceInput["category"], status: "ACTIVE" }, update: {} });
    }
  });
  console.log("Six initial resources ensured. Existing records and edits were preserved.");
}

main().catch(() => { console.error("Resource seed failed. Verify migrations and the database connection."); process.exitCode = 1; }).finally(() => prisma.$disconnect());
