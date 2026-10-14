import { readFileSync } from "node:fs";
import path from "node:path";
import type { PoolConfig } from "pg";

// Shared by the server-only Prisma client and the standalone connection check.
export function getPostgresConfig(max: number): PoolConfig {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing from the server environment.");
  }

  const url = new URL(connectionString);
  if (!["postgres:", "postgresql:"].includes(url.protocol) || !url.password) {
    throw new Error("DATABASE_URL must be a PostgreSQL URL with an encoded password.");
  }

  // pg connection-string SSL parameters override the ssl object. Use the
  // certificate settings below consistently, including for copied pooler URLs.
  for (const parameter of ["sslmode", "sslrootcert", "sslcert", "sslkey", "ssl"]) {
    url.searchParams.delete(parameter);
  }

  return {
    connectionString: url.toString(),
    max,
    connectionTimeoutMillis: 10000,
    ssl: {
      ca: readFileSync(path.join(process.cwd(), "certs", "supabase-ca.crt"), "utf8"),
      rejectUnauthorized: true,
    },
  };
}
