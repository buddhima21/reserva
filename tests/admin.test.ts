import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import { isAdminUser, assertAdminUser } from "../src/services/admin-access";
import { adminSearchParams } from "../src/lib/admin";
import { ResourceError } from "../src/lib/resources/validation";
import { safeAuthRedirect } from "../src/lib/auth/redirect";
import type { PrismaClient } from "../src/generated/prisma/client";
import { getReservation, listReservations, cancelReservation } from "../src/services/reservations";
import { getPrisma } from "../src/lib/prisma";

test("hot reload replaces a cached Prisma client created before the admin model", async context => {
  const cache = globalThis as unknown as { prisma?: PrismaClient };
  const original = cache.prisma;
  const originalUrl = process.env.DATABASE_URL;
  const disconnect = context.mock.fn(async () => {});
  cache.prisma = { resource: {}, reservation: {}, $disconnect: disconnect } as unknown as PrismaClient;
  process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/reserva";
  let client: PrismaClient | undefined;
  try {
    client = getPrisma();
    assert.equal(typeof client.admin.findUnique, "function");
    assert.equal(getPrisma(), client);
    assert.equal(disconnect.mock.callCount(), 1);
  } finally {
    await client?.$disconnect();
    cache.prisma = original;
    if (originalUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = originalUrl;
  }
});

test("admin access requires a persisted grant, not a client-supplied role", async () => {
  const userId = randomUUID();
  let granted = false;
  const db = { admin: { async findUnique(args: { where: { userId: string } }) { assert.equal(args.where.userId, userId); return granted ? { userId } : null; } } } as unknown as Pick<PrismaClient, "admin">;
  assert.equal(await isAdminUser(userId, db), false);
  await assert.rejects(assertAdminUser(userId, db), { status: 403, code: "ADMIN_REQUIRED" });
  granted = true;
  await assertAdminUser(userId, db);
  granted = false;
  await assert.rejects(assertAdminUser(userId, db), { status: 403 });
});

test("admin role lookup fails closed when storage is unavailable", async () => {
  const db = { admin: { async findUnique() { throw new Error("Unavailable"); } } } as unknown as Pick<PrismaClient, "admin">;
  await assert.rejects(assertAdminUser(randomUUID(), db), /Unavailable/);
});

test("member reservation services cannot omit the owner to request admin scope", async () => {
  const db = {} as PrismaClient;
  for (const value of [null, undefined, "", "not-a-user"]) {
    const userId = value as unknown as string;
    await assert.rejects(getReservation(userId, randomUUID(), db), { status: 400 });
    await assert.rejects(listReservations(userId, new URLSearchParams(), db), { status: 400 });
    await assert.rejects(cancelReservation(userId, randomUUID(), db), { status: 400 });
  }
});

test("admin redirects retain admin destinations and reject lookalike or external paths", () => {
  assert.equal(safeAuthRedirect("/admin/reservations?status=upcoming"), "/admin/reservations?status=upcoming");
  for (const path of ["/administrator", "//other.example/admin", "/admin/../../api/admin"]) assert.equal(safeAuthRedirect(path), "/dashboard");
});

test("admin filters reject repeated query keys and ignore unsupported keys", () => {
  assert.equal(adminSearchParams({ q: "meeting", role: "admin" }, ["q", "page"]).toString(), "q=meeting");
  assert.throws(() => adminSearchParams({ page: ["1", "2"] }, ["page"]), ResourceError);
});
