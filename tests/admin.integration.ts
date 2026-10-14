import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { getPrisma } from "../src/lib/prisma";
import { isAdminUser, assertAdminUser } from "../src/services/admin-access";
import { createResource, getResource, updateResource } from "../src/services/resources";
import { createReservation, getReservation, cancelReservation, listAdminReservations, getAdminReservation, cancelAdminReservation, checkAvailability } from "../src/services/reservations";
import { adminDashboardSummary, deleteAdminResource, adminReservationOwners } from "../src/services/admin";
import { parseReservationInput } from "../src/lib/reservations";

loadEnvConfig(process.cwd());
const db = getPrisma();
const resourceIds = new Set<string>();
const bookingIds = new Set<string>();
let stage = "admin setup";

async function main() {
  const admin = await db.admin.findFirst();
  assert.ok(admin, "Grant an existing account admin access before running this suite.");
  const actor = admin.userId;
  const users = await db.$queryRaw<{ id: string }[]>`SELECT id FROM auth.users WHERE id <> ${actor}::uuid ORDER BY created_at LIMIT 1`;
  assert.ok(users.length, "A second existing Auth user is needed to verify cross-owner admin management.");
  const owner = users[0].id;
  const nonadmin = randomUUID();
  assert.equal(await isAdminUser(actor), true);
  assert.equal(await isAdminUser(nonadmin), false);
  await assert.rejects(assertAdminUser(nonadmin), { status: 403, code: "ADMIN_REQUIRED" });
  const resource = await createResource({ name: `Admin verification ${randomUUID()}`, category: "equipment", location: "Temporary admin test", capacity: 0, status: "ACTIVE", description: null, floor: null, imageUrl: null });
  resourceIds.add(resource.id);

  stage = "role guards";
  await assert.rejects(listAdminReservations(nonadmin), { status: 403 });
  await assert.rejects(adminDashboardSummary(nonadmin), { status: 403 });
  await assert.rejects(deleteAdminResource(nonadmin, resource.id), { status: 403 });
  await assert.rejects(adminReservationOwners(nonadmin, [owner]), { status: 403 });
  await assert.rejects(getAdminReservation(nonadmin, randomUUID()), { status: 403 });
  await assert.rejects(cancelAdminReservation(nonadmin, randomUUID()), { status: 403 });

  stage = "cross-owner details and statistics";
  const base = Math.ceil((Date.now() + 172800000) / 3600000) * 3600000;
  const hour = 3600000;
  const input = parseReservationInput({ resourceId: resource.id, startTime: new Date(base).toISOString(), endTime: new Date(base + hour).toISOString(), purpose: "Admin managed reservation" });
  const before = await adminDashboardSummary(actor);
  const row = await createReservation(owner, input);
  bookingIds.add(row.id);
  await assert.rejects(getReservation(actor, row.id), { status: 404 });
  await assert.rejects(cancelReservation(actor, row.id), { status: 404 });
  assert.equal((await getAdminReservation(actor, row.id)).userId, owner);
  const listed = await listAdminReservations(actor, new URLSearchParams({ resourceId: resource.id }));
  assert.equal(listed.total, 1);
  assert.equal(listed.items[0].id, row.id);
  const owners = await adminReservationOwners(actor, [owner]);
  assert.ok(owners[owner]?.name);
  const after = await adminDashboardSummary(actor);
  assert.equal(after.totalReservations, before.totalReservations + 1);
  assert.equal(after.upcomingReservations, before.upcomingReservations + 1);
  await assert.rejects(createReservation(owner, input), { code: "BOOKING_CONFLICT" });
  await assert.rejects(updateResource(resource.id, { status: "INACTIVE" }), { code: "RESOURCE_IN_USE" });

  stage = "admin cancellation and history preservation";
  const cancelled = await cancelAdminReservation(actor, row.id);
  assert.equal(cancelled.status, "CANCELLED");
  assert.equal((await cancelAdminReservation(actor, row.id)).cancelledAt, cancelled.cancelledAt);
  assert.equal((await getReservation(owner, row.id)).status, "CANCELLED");
  assert.equal((await checkAvailability(resource.id, input.startTime, input.endTime)).available, true);
  await assert.rejects(deleteAdminResource(actor, resource.id), { code: "RESOURCE_HAS_HISTORY" });
  assert.equal((await updateResource(resource.id, { status: "INACTIVE" })).status, "INACTIVE");
  await assert.rejects(createReservation(owner, input), { code: "RESOURCE_UNAVAILABLE" });

  stage = "permanent deletion of resources without history";
  const disposable = await createResource({ name: `Admin delete ${randomUUID()}`, category: "workspace", location: "Temporary admin test", capacity: 2, status: "ACTIVE", description: null, floor: null, imageUrl: null });
  resourceIds.add(disposable.id);
  await deleteAdminResource(actor, disposable.id);
  resourceIds.delete(disposable.id);
  await assert.rejects(getResource(disposable.id), { status: 404 });
  await assert.rejects(deleteAdminResource(actor, randomUUID()), { status: 404 });
  console.log("Admin permissions, cross-owner management, statistics, cancellation, conflict detection, availability, protected history, and permanent deletion passed.");
}

main().catch(error => { console.error(`Admin integration failed at ${stage} (${error?.code ?? error?.name ?? "unknown"}). No credentials printed.`); process.exitCode = 1; }).finally(async () => {
  try {
    await db.reservation.deleteMany({ where: { id: { in: [...bookingIds] } } });
    await db.resource.deleteMany({ where: { id: { in: [...resourceIds] } } });
    console.log("Temporary admin test fixtures removed. Accounts and admin grants preserved.");
  } catch { console.error("Admin fixture cleanup needs attention."); process.exitCode = 1; }
  await db.$disconnect();
});
