import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { getPrisma } from "../src/lib/prisma";
import { createResource, updateResource } from "../src/services/resources";
import { createReservation, getReservation, listReservations, cancelReservation, checkAvailability, dayAvailability } from "../src/services/reservations";
import { localDate, parseReservationInput } from "../src/lib/reservations";
import { hasDatabaseConstraint } from "../src/lib/resources/validation";

loadEnvConfig(process.cwd());
const db = getPrisma();
const resourceFixtures: { id: string; name: string }[] = [];
const reservationIds = new Set<string>();
let stage = "setup";
const base = Math.ceil((Date.now() + 172800000) / 3600000) * 3600000;
const hour = 3600000;

async function main() {
  const users = await db.$queryRaw<{ id: string }[]>`SELECT id FROM auth.users ORDER BY created_at LIMIT 2`;
  assert.ok(users.length, "An existing Auth user is required. No test accounts are created.");
  const owner = users[0].id;
  const other = users[1]?.id ?? randomUUID();
  const resource = await createResource({ name: `Reservation test ${randomUUID()}`, category: "meeting", location: "Temporary verification fixture", capacity: 2, status: "ACTIVE", description: null, floor: null, imageUrl: null });
  resourceFixtures.push({ id: resource.id, name: resource.name });
  function input(start: number, end: number) { return parseReservationInput({ resourceId: resource.id, startTime: new Date(start).toISOString(), endTime: new Date(end).toISOString(), purpose: "Reservation integration check" }); }
  async function create(start: number, end: number) { const row = await createReservation(owner, input(start, end)); reservationIds.add(row.id); return row; }

  stage = "create, ownership, overlap and adjacency";
  const first = await create(base, base + hour);
  assert.equal((await getReservation(owner, first.id)).purpose, "Reservation integration check");
  await assert.rejects(getReservation(other, first.id), { status: 404 });
  await assert.rejects(cancelReservation(other, first.id), { status: 404 });
  assert.ok((await listReservations(owner)).items.every(row => row.userId === owner));
  for (const [start, end] of [[base, base + hour], [base + hour / 4, base + hour / 2], [base - hour / 2, base + hour / 2], [base + hour / 2, base + hour * 1.5], [base - hour, base + hour * 2]]) {
    await assert.rejects(createReservation(owner, input(start, end)), { status: 409, code: "BOOKING_CONFLICT" });
  }
  const adjacent = await create(base + hour, base + hour * 2);
  assert.equal((await checkAvailability(resource.id, new Date(base), new Date(base + hour))).available, false);
  const schedule = await dayAvailability(localDate(first.startTime));
  assert.ok(schedule.resources.find(row => row.id === resource.id)?.bookings.length);
  assert.ok(schedule.resources.every(row => row.bookings.every(booking => Object.keys(booking).every(key => ["startTime", "endTime"].includes(key)))));

  stage = "cancellation, released slots, and resource status protection";
  await assert.rejects(updateResource(resource.id, { status: "INACTIVE" }), { status: 409, code: "RESOURCE_IN_USE" });
  await assert.rejects(updateResource(resource.id, { status: "MAINTENANCE" }), { status: 409, code: "RESOURCE_IN_USE" });
  const cancelled = await cancelReservation(owner, first.id);
  assert.equal(cancelled.status, "CANCELLED");
  assert.equal((await cancelReservation(owner, first.id)).cancelledAt, cancelled.cancelledAt);
  assert.equal((await getReservation(owner, first.id)).status, "CANCELLED");
  const cancelledHistory = await listReservations(owner, new URLSearchParams({ status: "CANCELLED" }));
  assert.ok(cancelledHistory.total > 0);
  assert.ok(cancelledHistory.items.every(row => row.status === "CANCELLED" && row.userId === owner));
  assert.equal((await checkAvailability(resource.id, new Date(base), new Date(base + hour))).available, true);
  const replacement = await create(base, base + hour);
  await cancelReservation(owner, adjacent.id);
  await cancelReservation(owner, replacement.id);
  await updateResource(resource.id, { status: "INACTIVE" });
  await assert.rejects(createReservation(owner, input(base + hour * 4, base + hour * 5)), { code: "RESOURCE_UNAVAILABLE" });
  assert.equal((await checkAvailability(resource.id, new Date(base), new Date(base + hour))).available, false);
  await updateResource(resource.id, { status: "MAINTENANCE" });
  await assert.rejects(createReservation(owner, input(base + hour * 4, base + hour * 5)), { code: "RESOURCE_UNAVAILABLE" });
  await updateResource(resource.id, { status: "ACTIVE" });
  await assert.rejects(createReservation(owner, input(Date.now() - hour, Date.now() + hour)), { code: "PAST_START" });

  stage = "parallel booking requests";
  const raceStart = base + hour * 24;
  const race = await Promise.allSettled([createReservation(owner, input(raceStart, raceStart + hour)), createReservation(owner, input(raceStart, raceStart + hour))]);
  for (const result of race) if (result.status === "fulfilled") reservationIds.add(result.value.id);
  assert.equal(race.filter(result => result.status === "fulfilled").length, 1);
  const loser = race.find(result => result.status === "rejected");
  assert.ok(loser?.status === "rejected" && loser.reason.code === "BOOKING_CONFLICT");
  assert.equal(await db.reservation.count({ where: { resourceId: resource.id, status: "CONFIRMED", startTime: new Date(raceStart) } }), 1);

  stage = "database constraint bypass and concurrent raw writes";
  const rawStart = base + hour * 48;
  const rawIds = [randomUUID(), randomUUID()];
  rawIds.forEach(id => reservationIds.add(id));
  const rawRace = await Promise.allSettled(rawIds.map(id => db.reservation.create({ data: { id, resourceId: resource.id, userId: owner, startTime: new Date(rawStart), endTime: new Date(rawStart + hour), purpose: "Direct database race verification" } })));
  assert.equal(rawRace.filter(result => result.status === "fulfilled").length, 1);
  const rawLoser = rawRace.find(result => result.status === "rejected");
  assert.ok(rawLoser?.status === "rejected" && hasDatabaseConstraint(rawLoser.reason, "reservations_no_overlap"), "PostgreSQL must reject overlap without application prechecks.");
  const invalidId = randomUUID(); reservationIds.add(invalidId);
  await assert.rejects(db.reservation.create({ data: { id: invalidId, resourceId: resource.id, userId: owner, startTime: new Date(rawStart + hour * 4), endTime: new Date(rawStart + hour * 4), purpose: "Invalid interval verification" } }), error => hasDatabaseConstraint(error, "reservations_valid_interval"));
  const pastId = randomUUID(); reservationIds.add(pastId);
  await db.reservation.create({ data: { id: pastId, resourceId: resource.id, userId: owner, startTime: new Date(Date.now() - hour * 2), endTime: new Date(Date.now() - hour), purpose: "Completed history verification" } });
  await assert.rejects(cancelReservation(owner, pastId), { code: "RESERVATION_COMPLETED" });
  console.log("Reservation ownership, cancellation, availability, range validation, adjacency, service-level concurrency, and independent PostgreSQL overlap protection passed.");
}

async function cleanup() {
  // Only IDs generated by this script are deleted. Auth users and real bookings
  // are untouched; restrictive foreign keys prevent removing another user's data.
  await db.reservation.deleteMany({ where: { id: { in: [...reservationIds] } } });
  for (const fixture of resourceFixtures) await db.resource.delete({ where: { id: fixture.id, name: fixture.name } });
  console.log("Temporary reservation/resource fixtures removed. Existing data preserved.");
}

main().catch(error => { console.error(`Reservation check failed at ${stage} (${error?.code ?? error?.name ?? "unknown"}). No credentials printed.`); process.exitCode = 1; }).finally(async () => {
  try { await cleanup(); } catch { console.error("Fixture cleanup needs attention; no unrelated records were removed."); process.exitCode = 1; }
  await db.$disconnect();
});
