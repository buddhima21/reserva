import { loadEnvConfig } from "@next/env";
import { getPrisma } from "../src/lib/prisma";

loadEnvConfig(process.cwd());
const db = getPrisma();

async function main() {
  const [action, email, ...extra] = process.argv.slice(2);
  if (!["grant", "revoke"].includes(action) || !email || extra.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Usage: npm run admin:access -- grant|revoke email@example.com");
  }
  const users = await db.$queryRaw<{ id: string }[]>`SELECT id FROM auth.users WHERE lower(email) = lower(${email.trim()})`;
  if (users.length !== 1) throw new Error("No unique account found. Register that email in RESERVA first, then rerun this command.");
  if (action === "grant") await db.admin.upsert({ where: { userId: users[0].id }, create: { userId: users[0].id }, update: {} });
  else await db.admin.deleteMany({ where: { userId: users[0].id } });
  console.log(action === "grant" ? "Administrator access granted. Sign in and open /admin." : "Administrator access revoked.");
}

main().catch(error => {
  if (error instanceof Error && /^(Usage:|No unique account)/.test(error.message)) console.error(error.message);
  else console.error("Admin access update failed. Verify migrations and the database connection. No credentials printed.");
  process.exitCode = 1;
}).finally(() => db.$disconnect());
