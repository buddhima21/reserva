import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";
import path from "node:path";

// Match Next.js .env loading, including .env.local, for Prisma CLI commands.
loadEnvConfig(process.cwd());

// Prisma's migration engine uses URL TLS options; runtime pg uses the same CA
// through getPostgresConfig. Keep credentials only in the local environment.
function migrationUrl() {
  if (!process.env.DATABASE_URL) return undefined;
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("sslmode", "require");
  url.searchParams.set("sslaccept", "strict");
  url.searchParams.set("sslcert", path.join(process.cwd(), "certs", "supabase-ca.crt"));
  return url.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: migrationUrl() },
});
