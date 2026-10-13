import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { getSupabaseConfig } from "../src/lib/supabase/config";
import { getPostgresConfig } from "../src/lib/postgres-config";

loadEnvConfig(process.cwd());

async function checkDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) { console.error("Database: DATABASE_URL is missing."); return false; }
  try {
    const parsed = new URL(connectionString);
    if (!["postgres:", "postgresql:"].includes(parsed.protocol) || !parsed.password) throw new Error();
  } catch { console.error("Database: DATABASE_URL is malformed. Check the URL and encoded password locally."); return false; }

  const adapter = new PrismaPg(getPostgresConfig(1));
  const prisma = new PrismaClient({ adapter });
  try {
    const result = await prisma.$queryRaw<{ connected: number }[]>`SELECT 1 AS connected`;
    if (result[0]?.connected !== 1) throw new Error();
    console.log("Database: connected successfully through Prisma (read-only SELECT 1).");
    return true;
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    console.error(`Database: connection failed (${code}). Check credentials, network access, and TLS configuration locally.`);
    return false;
  } finally { await prisma.$disconnect(); }
}

async function checkSupabase() {
  try {
    const { url, publishableKey } = getSupabaseConfig();
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".supabase.co")) {
      console.error("Supabase Auth: use the HTTPS Project URL copied from your Supabase dashboard.");
      return false;
    }
    const response = await fetch(new URL("/auth/v1/settings", parsed), {
      headers: { apikey: publishableKey }, signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) { console.error(`Supabase Auth: endpoint returned HTTP ${response.status}. Check the public project URL and publishable key.`); return false; }
    console.log("Supabase Auth: project endpoint reachable and publishable key accepted.");
    return true;
  } catch { console.error("Supabase Auth: connection check failed. Check environment values and network access locally."); return false; }
}

async function main() {
  const databaseOk = await checkDatabase();
  const authOk = await checkSupabase();
  if (!databaseOk || !authOk) process.exitCode = 1;
}

main().catch(() => { console.error("Connection check failed. No credentials or server error details were printed."); process.exitCode = 1; });
