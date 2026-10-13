export const SAMPLE_DATE = "2026-10-24";

export const bookingResources = [
  { id: "resource-1", name: "Executive Meeting Room 4A", capacity: 16, location: "HQ Building 4, Floor 4, East Wing", kind: "Meeting Room" },
  { id: "resource-2", name: "Creative Studio Rm 210", capacity: 8, location: "HQ Building 4, Floor 2, Studio Wing", kind: "Workspace" },
  { id: "resource-3", name: "Conference Hall A", capacity: 60, location: "Ground Floor Auditorium", kind: "Event Space" },
  { id: "resource-4", name: "Portable 4K Projector #1", capacity: 0, location: "IT Lab Asset #802", kind: "Equipment" },
  { id: "resource-5", name: "MacBook Pro 16 inch (M3 Max)", capacity: 0, location: "Device Lab Locker B", kind: "Equipment" },
  { id: "resource-6", name: "The Greenhouse", capacity: 10, location: "Floor 3, Atrium", kind: "Workspace" },
  { id: "studio-hub", name: "Studio Innovation Hub", capacity: 18, location: "HQ Building 4, Floor 3, West Wing", kind: "Collaboration Lab" },
  { id: "focus-pod", name: "Focus Pod B3", capacity: 1, location: "HQ Building 4, Floor 3", kind: "Workspace" },
] as const;

const sampleBookings: Record<string, { start: string; end: string; title: string }[]> = {
  "resource-1": [{ start: "08:30", end: "09:30", title: "Engineering Leadership Sync" }, { start: "10:00", end: "11:30", title: "Sprint Planning" }, { start: "14:00", end: "15:30", title: "Design Critique" }],
  "resource-2": [{ start: "13:00", end: "14:30", title: "Video Production" }],
  "resource-3": [{ start: "11:00", end: "14:00", title: "All-Hands Tech Prep" }],
  "resource-4": [{ start: "15:00", end: "16:30", title: "Hardware Demo" }],
  "focus-pod": [{ start: "16:30", end: "17:30", title: "Client Call" }],
  "resource-5": [],
  "resource-6": [],
  "studio-hub": [],
};

export function timeMinutes(time: string) {
  if (!/^\d{2}:\d{2}$/.test(time)) return NaN;
  const [hour, minute] = time.split(":").map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 ? hour * 60 + minute : NaN;
}

export function displayTime(time: string) {
  const minutes = timeMinutes(time);
  if (!Number.isFinite(minutes)) return "—";
  const hour = Math.floor(minutes / 60);
  return `${hour % 12 || 12}:${String(minutes % 60).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

export function parseDisplayTime(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "";
  const hour = Number(match[1]);
  if (hour < 1 || hour > 12 || Number(match[2]) > 59) return "";
  return `${String(hour % 12 + (match[3].toUpperCase() === "PM" ? 12 : 0)).padStart(2, "0")}:${match[2]}`;
}

export function validatePreviewSlot(resourceId: string, date: string, start: string, end: string) {
  const duration = timeMinutes(end) - timeMinutes(start);
  if (!Number.isFinite(duration) || duration <= 0) return { error: "End time must be after start time.", duration, conflicts: [], known: false };
  if (timeMinutes(start) < 480 || timeMinutes(end) > 1080) return { error: "Choose a slot within sample operating hours: 8:00 AM–6:00 PM.", duration, conflicts: [], known: false };
  if (duration > 240) return { error: "The sample booking policy allows a maximum of four hours.", duration, conflicts: [], known: false };
  const known = date === SAMPLE_DATE && resourceId in sampleBookings;
  const conflicts = known ? (sampleBookings[resourceId] ?? []).filter(slot => timeMinutes(start) < timeMinutes(slot.end) && timeMinutes(end) > timeMinutes(slot.start)) : [];
  return { error: "", duration, conflicts, known };
}
