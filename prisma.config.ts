import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

// Match Next.js .env loading, including .env.local, for Prisma CLI commands.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL },
});
