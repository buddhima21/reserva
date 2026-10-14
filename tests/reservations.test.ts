import assert from "node:assert/strict";
import { test } from "node:test";
import { parseReservationInput, parseReservationRange, validateCalendarDate, localDayRange, localDate } from "../src/lib/reservations";
import { ResourceError, hasDatabaseError } from "../src/lib/resources/validation";

const data = { resourceId: "f5b8d2c0-1d4f-4aa4-9909-1c07e81d10f0", startTime: "2028-01-01T10:00:00+05:30", endTime: "2028-01-01T11:00:00+05:30", purpose: " Team review ", notes: " Notes " };

test("reservation input normalizes timestamps to absolute instants and trims text", () => {
  const parsed = parseReservationInput(data);
  assert.equal(parsed.startTime.toISOString(), "2028-01-01T04:30:00.000Z");
  assert.equal(parsed.endTime.toISOString(), "2028-01-01T05:30:00.000Z");
  assert.equal(parsed.purpose, "Team review");
  assert.equal(parsed.notes, "Notes");
});

test("invalid calendars, naive times, equal/reversed instants are rejected", () => {
  for (const value of ["2027-02-29T10:00:00Z", "2028-02-30T10:00:00Z", "2028-13-01T10:00:00Z", "2028-01-01T24:00:00Z", "2028-01-01T10:60:00Z", "2028-01-01T10:00:60Z", "2028-01-01T10:00:00", "2028-01-01", "invalid", "0000-01-01T10:00:00Z"]) {
    assert.throws(() => parseReservationRange(value, "2029-01-01T10:00:00Z"), ResourceError);
  }
  assert.throws(() => parseReservationRange(data.startTime, "2028-01-01T04:30:00Z"), ResourceError);
  assert.throws(() => parseReservationRange(data.endTime, data.startTime), ResourceError);
  validateCalendarDate("2028-02-29");
});

test("ownership, status, IDs, and purpose cannot be forged", () => {
  for (const value of [{ ...data, userId: "another-user" }, { ...data, status: "CANCELLED" }, { ...data, resourceId: "resource-1" }, { ...data, purpose: " " }, { ...data, purpose: "x".repeat(121) }, { ...data, notes: "x".repeat(1001) }, { ...data, notes: "bad\0text" }]) {
    assert.throws(() => parseReservationInput(value), ResourceError);
  }
});

test("availability days follow Asia/Colombo midnight boundaries", () => {
  const range = localDayRange("2026-10-13");
  assert.equal(range.startTime.toISOString(), "2026-10-12T18:30:00.000Z");
  assert.equal(range.endTime.toISOString(), "2026-10-13T18:30:00.000Z");
  assert.equal(localDate("2026-10-13T20:00:00Z"), "2026-10-14");
});

test("trigger errors require their native SQL code and controlled message", () => {
  const wrapped = { meta: { driverAdapterError: { cause: { originalCode: "23514", originalMessage: "Resource has active reservations" } } } };
  assert.equal(hasDatabaseError(wrapped, "23514", "Resource has active reservations"), true);
  assert.equal(hasDatabaseError({ code: "P2002", message: "Resource has active reservations" }, "23514", "Resource has active reservations"), false);
});
