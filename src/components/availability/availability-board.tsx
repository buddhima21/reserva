"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { localDate, localTime, type DayAvailability } from "@/lib/reservations";
import { categoryLabels } from "@/types/resource";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";

type Selection = { resourceId: string; name: string; startTime: string; endTime: string };

export function AvailabilityBoard({ initial }: { initial: DayAvailability }) {
  const [data, setData] = useState(initial);
  const [date, setDate] = useState(initial.date);
  const [category, setCategory] = useState("all");
  const [floor, setFloor] = useState("all");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [retry, setRetry] = useState(0);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setPending(true); setError("");
      try {
        const response = await fetch(`/api/availability?${new URLSearchParams({ date })}`, { cache: "no-store", signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to load availability.");
        if (!controller.signal.aborted) setData(result);
      } catch (failure) { if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : "Unable to load availability."); }
      finally { if (!controller.signal.aborted) setPending(false); }
    }, 150);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [date, retry]);
  const current = data.date === date && !error && !pending ? data : null;
  const resources = current?.resources.filter(resource => (category === "all" || resource.category === category) && (floor === "all" || resource.floor === floor)) ?? [];
  const selected = selection && resources.some(resource => resource.id === selection.resourceId && !resource.bookings.some(booking => new Date(booking.startTime) < new Date(selection.endTime) && new Date(booking.endTime) > new Date(selection.startTime))) ? selection : null;
  const dayStart = current ? new Date(current.startTime).getTime() : 0;
  const dayEnd = current ? new Date(current.endTime).getTime() : 0;
  const now = current ? new Date(current.checkedAt).getTime() : 0;
  function moveDate(amount: number) { const value = new Date(`${date}T12:00:00Z`); value.setUTCDate(value.getUTCDate() + amount); setPending(true); setError(""); setDate(value.toISOString().slice(0, 10)); setSelection(null); }
  function refresh() { setPending(true); setError(""); setRetry(value => value + 1); setSelection(null); }
  function select(resourceId: string, name: string, start: number, end: number, currentTime: number) {
    const chosenStart = Math.ceil(Math.max(start, currentTime + 60000) / 60000) * 60000;
    const chosenEnd = Math.floor(Math.min(end, chosenStart + 3600000) / 60000) * 60000;
    if (chosenEnd <= chosenStart) return;
    setSelection({ resourceId, name, startTime: new Date(chosenStart).toISOString(), endTime: new Date(chosenEnd).toISOString() });
  }
  const href = selected ? `/reservations/new?${new URLSearchParams({ resource: selected.resourceId, date: localDate(selected.startTime), endDate: localDate(selected.endTime), start: localTime(selected.startTime), end: localTime(selected.endTime) })}` : "";
  return <div aria-busy={pending}><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-ws-secondary">Live resource schedule</p><h1 className="mt-2 text-headline-xl font-bold text-ws-primary">Availability</h1><p className="mt-2 text-sm text-ws-on-surface-variant">Select a free window to prepare a booking. Times are in Asia/Colombo.</p></div><Link href="/reservations/new" className="rounded-xl bg-ws-primary px-5 py-3 text-sm font-semibold text-white">New Reservation</Link></div>
    <div className="mb-5 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 rounded-lg bg-ws-surface-container-low p-1"><button type="button" aria-label="Previous day" onClick={() => moveDate(-1)} className="p-2"><Icon name="chevron_left" /></button><input type="date" aria-label="Schedule date" required value={date} onChange={event => { if (event.target.value && event.target.value !== date) { setPending(true); setError(""); setDate(event.target.value); setSelection(null); } }} className="max-w-[160px] bg-transparent px-2 py-1 text-sm" /><button type="button" aria-label="Next day" onClick={() => moveDate(1)} className="p-2"><Icon name="chevron_right" /></button></div><div className="flex flex-wrap gap-2"><select aria-label="Location filter" value={floor} onChange={event => { setFloor(event.target.value); setSelection(null); }} className="rounded-lg bg-ws-surface-container-low px-3 py-2 text-sm"><option value="all">All locations</option>{Array.from(new Set(data.resources.map(resource => resource.floor).filter(Boolean))).map(value => <option key={value} value={value!}>Floor {value}</option>)}</select><button type="button" onClick={refresh} className="rounded-lg bg-ws-surface-container-low px-3 py-2 text-sm">Refresh</button></div></div><div className="flex flex-wrap gap-1">{[["all", "All Categories"], ["meeting", "Meeting Rooms"], ["equipment", "Equipment"], ["workspace", "Workspaces"], ["event", "Event Spaces"]].map(([value, label]) => <button key={value} type="button" aria-pressed={category === value} onClick={() => { setCategory(value); setSelection(null); }} className={`rounded-lg px-3 py-2 text-sm ${category === value ? "bg-ws-primary font-medium text-white" : "bg-ws-surface-container-low text-ws-on-surface-variant"}`}>{label}</button>)}</div><p className="text-xs text-ws-on-surface-variant">Available windows appear in pale green; confirmed bookings appear in dark green. Availability is checked again on confirmation.</p></div>
    {error && <p role="alert" className="mb-5 rounded-xl bg-ws-error-container/60 p-4 text-sm text-ws-on-error-container">{error} <button type="button" onClick={refresh} className="underline">Try again</button></p>}
    {!current && !error ? <WorkspaceLoading message="Loading schedule…" /> : current ? <div role="region" aria-label="Resource availability timeline" tabIndex={0} className="mb-5 overflow-x-auto rounded-2xl bg-white shadow-sm"><div className="min-w-[1400px]"><div className="flex bg-ws-surface-container-low text-xs text-ws-on-surface-variant"><div className="w-[280px] shrink-0 px-5 py-3 font-semibold uppercase">Space / Resource</div><div className="grid flex-1 grid-cols-12">{Array.from({ length: 12 }, (_, index) => <span key={index} className="py-3 pl-2">{String(index * 2).padStart(2, "0")}:00</span>)}</div></div>{resources.length ? resources.map(resource => {
      const segments: { start: number; end: number; booked: boolean }[] = [];
      let cursor = dayStart;
      for (const booking of resource.bookings) {
        const start = Math.max(dayStart, new Date(booking.startTime).getTime());
        const end = Math.min(dayEnd, new Date(booking.endTime).getTime());
        if (start > cursor) segments.push({ start: cursor, end: start, booked: false });
        segments.push({ start, end, booked: true }); cursor = Math.max(cursor, end);
      }
      if (cursor < dayEnd) segments.push({ start: cursor, end: dayEnd, booked: false });
      return <div key={resource.id} className="flex border-t border-ws-outline-variant/30"><div className="w-[280px] shrink-0 p-5"><Link href={`/resources/${resource.id}`} className="text-sm font-semibold text-ws-primary hover:underline">{resource.name}</Link><p className="mt-1 text-xs text-ws-on-surface-variant">{categoryLabels[resource.category]} · {resource.location}</p></div><div className="relative min-h-24 flex-1 bg-[linear-gradient(to_right,#c1c8c333_1px,transparent_1px)] bg-[length:8.333%_100%]">{segments.map((segment, index) => {
        const label = `${localTime(new Date(segment.start))} – ${segment.end === dayEnd ? "24:00" : localTime(new Date(segment.end))}`;
        const style = { left: `${(segment.start - dayStart) / 864000}%`, width: `${(segment.end - segment.start) / 864000}%` };
        if (segment.booked) return <div key={index} style={style} title={`Reserved ${label}`} className="absolute top-3 bottom-3 overflow-hidden rounded-lg border-x-2 border-white bg-ws-primary-container p-2 text-xs text-white"><span className="block truncate font-semibold">Reserved</span><span className="block truncate">{label}</span></div>;
        const disabled = Math.floor(segment.end / 60000) * 60000 <= Math.ceil(Math.max(segment.start, now + 60000) / 60000) * 60000;
        const active = selected?.resourceId === resource.id && new Date(selected.startTime).getTime() >= segment.start && new Date(selected.endTime).getTime() <= segment.end;
        return <button key={index} type="button" style={style} disabled={disabled} onClick={() => select(resource.id, resource.name, segment.start, segment.end, Date.now())} aria-label={`Select ${resource.name}, ${label}`} aria-pressed={active} title={`Free ${label}`} className={`absolute top-3 bottom-3 overflow-hidden rounded-lg border-x-2 border-white p-2 text-left text-xs disabled:cursor-default disabled:opacity-30 ${active ? "bg-ws-secondary-container ring-2 ring-ws-secondary" : "bg-ws-secondary-container/30 hover:bg-ws-secondary-container/60"}`}><span className="block truncate font-semibold">Available</span><span className="block truncate">{label}</span></button>;
      })}</div></div>;
    }) : <div className="p-8 text-sm"><p>No active resources match these filters.</p><Link href="/resources" className="mt-3 inline-block font-medium text-ws-secondary underline">Manage resources</Link></div>}</div></div> : null}
    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div role="status"><p className="text-xs font-bold uppercase tracking-wider text-ws-secondary">Selected target slot</p><p className="mt-2 font-semibold text-ws-primary">{selected?.name ?? "Select an available window"}</p>{selected && <p className="mt-1 text-sm text-ws-on-surface-variant">{localTime(selected.startTime)} – {localTime(selected.endTime)} · You can adjust this slot in the reservation form.</p>}</div>{selected ? <Link href={href} className="rounded-xl bg-ws-primary px-6 py-3 text-center text-sm font-semibold text-white">Book Selected Slot</Link> : <button disabled className="rounded-xl bg-ws-primary px-6 py-3 text-sm font-semibold text-white opacity-50">Book Selected Slot</button>}</div>
  </div>;
}
