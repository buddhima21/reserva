import { ResourceError, validateResourceId } from "@/lib/resources/validation";
import type { ResourceRecord } from "@/types/resource";

export type ReservationRecord = {
  id: string; resourceId: string; userId: string; startTime: string; endTime: string;
  status: "CONFIRMED" | "CANCELLED"; purpose: string; notes: string | null;
  cancelledAt: string | null; createdAt: string; updatedAt: string; resource: ResourceRecord;
};
export type ReservationInput = { resourceId: string; startTime: Date; endTime: Date; purpose: string; notes: string | null };
export type ReservationListData = { items: ReservationRecord[]; total: number; page: number; pageSize: number; status: string };
export type OccupiedInterval = { startTime: string; endTime: string };
export type DayAvailability = { date: string; startTime: string; endTime: string; checkedAt: string; resources: (ResourceRecord & { bookings: OccupiedInterval[] })[] };

export function validateCalendarDate(value: unknown): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number(value.slice(0, 4)) < 1) throw new ResourceError(400, "INVALID_DATE", "Choose a valid calendar date.");
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) throw new ResourceError(400, "INVALID_DATE", "Choose a valid calendar date.");
  return value;
}

export function parseDateTime(value: unknown, field: string): Date {
  const match = typeof value === "string" ? value.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/) : null;
  if (!match || Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4] ?? 0) > 59) throw new ResourceError(400, "INVALID_RANGE", "Provide valid start and end times with an explicit timezone.", { [field]: "Use an ISO date/time including Z or a timezone offset." });
  validateCalendarDate(match[1]);
  const parsed = new Date(value as string);
  if (!Number.isFinite(parsed.getTime())) throw new ResourceError(400, "INVALID_RANGE", "The reservation time is invalid.");
  return parsed;
}

export function parseReservationRange(start: unknown, end: unknown) {
  const startTime = parseDateTime(start, "startTime");
  const endTime = parseDateTime(end, "endTime");
  if (endTime <= startTime) throw new ResourceError(400, "INVALID_RANGE", "End time must be after start time.", { endTime: "Choose a time after the start." });
  return { startTime, endTime };
}

export function parseReservationInput(value: unknown): ReservationInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ResourceError(400, "INVALID_BODY", "Provide a JSON reservation object.");
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some(key => !["resourceId", "startTime", "endTime", "purpose", "notes"].includes(key))) throw new ResourceError(400, "INVALID_FIELD", "Only resource, time, purpose, and notes can be submitted. Ownership comes from your session.");
  if (typeof input.resourceId !== "string") throw new ResourceError(400, "INVALID_ID", "Select a valid resource.");
  validateResourceId(input.resourceId);
  const range = parseReservationRange(input.startTime, input.endTime);
  if (typeof input.purpose !== "string" || input.purpose.includes("\0") || input.purpose.trim().length < 2 || input.purpose.trim().length > 120) throw new ResourceError(400, "VALIDATION_ERROR", "Enter a purpose of 2–120 characters.", { purpose: "Enter 2–120 characters." });
  if (input.notes != null && (typeof input.notes !== "string" || input.notes.includes("\0") || input.notes.length > 1000)) throw new ResourceError(400, "VALIDATION_ERROR", "Notes must contain at most 1,000 characters.", { notes: "Use at most 1,000 characters." });
  return { resourceId: input.resourceId, ...range, purpose: input.purpose.trim(), notes: typeof input.notes === "string" ? input.notes.trim() || null : null };
}

export function localDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}
export function localTime(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(value));
}
export function displayBookingTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Colombo", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
export function localInputTime(date: string, time: string) { return `${date}T${time}:00+05:30`; }
export function localDayRange(date: string) {
  validateCalendarDate(date);
  const startTime = new Date(`${date}T00:00:00+05:30`);
  return { startTime, endTime: new Date(startTime.getTime() + 86400000) };
}
