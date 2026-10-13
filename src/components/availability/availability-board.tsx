"use client";

import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";
import { SAMPLE_DATE, parseDisplayTime, validatePreviewSlot } from "@/lib/booking-preview";
import { Icon } from "@/components/ui/icon";

type Selection = { id: string; resourceId: string; resource: string; time: string; duration: string };
type TimelineRow = { id: string; name: string; category: string; floor: string; content: ReactNode };
const SlotContext = createContext<{ selected: Selection | null; select: (slot: Selection) => void } | null>(null);
const initialSelection: Selection = { id: "resource-2-09:00 AM - 10:30 AM", resourceId: "resource-2", resource: "Creative Studio Rm 210", time: "09:00 AM - 10:30 AM", duration: "1h 30m" };

export function AvailableSlot({ selection, className = "", children }: { selection: Selection; className?: string; children: ReactNode }) {
  const context = useContext(SlotContext);
  if (!context) throw new Error("AvailableSlot must be rendered inside AvailabilityBoard");
  const active = context.selected?.id === selection.id;
  return <button type="button" onClick={() => context.select(selection)} aria-pressed={active} aria-label={`Select ${selection.resource}, ${selection.time}`} title={`${selection.resource} · ${selection.time}`} className={`${className} text-left ${active ? "ring-2 ring-ws-secondary bg-ws-secondary-container/50" : ""}`}>{children}</button>;
}

export function AvailabilityBoard({ rows }: { rows: TimelineRow[] }) {
  const [date, setDate] = useState(SAMPLE_DATE);
  const [category, setCategory] = useState("all");
  const [floor, setFloor] = useState("all");
  const [selected, setSelected] = useState<Selection | null>(initialSelection);
  const visible = rows.filter(row => (category === "all" || category === row.category) && (floor === "all" || floor === row.floor));
  const selection = date === SAMPLE_DATE && selected && visible.some(row => row.id === selected.resourceId) ? selected : null;
  const times = selection?.time.split(" - ").map(parseDisplayTime) ?? [];
  const validation = selection ? validatePreviewSlot(selection.resourceId, date, times[0], times[1]) : null;
  const href = selection ? `/reservations/new?${new URLSearchParams({ resource: selection.resourceId, date, start: times[0], end: times[1] })}` : "";
  function moveDate(amount: number) { const value = new Date(`${date}T12:00:00Z`); value.setUTCDate(value.getUTCDate() + amount); setDate(value.toISOString().slice(0, 10)); setSelected(null); }

  return <SlotContext.Provider value={{ selected: selection, select: setSelected }}>
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ws-secondary">Sample matrix · East Wing Cluster</p><h1 className="text-headline-xl font-bold text-ws-primary">Availability</h1><p className="mt-2 max-w-2xl text-sm text-ws-on-surface-variant">Explore the sample timeline. Select an available block to prepare a reservation preview.</p></div><Link href="/reservations/new" className="inline-flex self-start items-center gap-2 rounded-lg bg-ws-primary px-5 py-2.5 text-sm font-medium text-white"><Icon name="add" />New Reservation</Link></div>
    <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3"><div className="flex max-w-full items-center gap-2 rounded-lg bg-ws-surface-container-low p-1"><button type="button" aria-label="Previous day" onClick={() => moveDate(-1)} className="p-2"><Icon name="chevron_left" /></button><input aria-label="Schedule date" type="date" required value={date} onChange={event => { if(event.target.value) { setDate(event.target.value); setSelected(null); } }} className="min-w-0 rounded bg-transparent px-1 py-1 text-sm" /><button type="button" aria-label="Next day" onClick={() => moveDate(1)} className="p-2"><Icon name="chevron_right" /></button></div><select aria-label="Location filter" value={floor} onChange={event => setFloor(event.target.value)} className="rounded-lg bg-ws-surface-container-low px-3 py-2 text-sm"><option value="all">All locations</option><option value="4">Floor 4</option><option value="2">Floor 2</option><option value="3">Floor 3</option><option value="ground">Ground floor</option></select></div>
      <div className="flex flex-wrap gap-1" aria-label="Timeline categories">{[["all", "All Categories"], ["meeting", "Meeting Rooms"], ["equipment", "Equipment"], ["workspace", "Workspaces"], ["event", "Event Spaces"]].map(([value,label]) => <button key={value} type="button" aria-pressed={category===value} onClick={()=>setCategory(value)} className={`rounded-lg px-3 py-2 text-sm ${category===value ? "bg-ws-primary font-medium text-white" : "bg-ws-surface-container-low text-ws-on-surface-variant"}`}>{label}</button>)}</div>
      <div className="flex flex-wrap gap-4 text-xs text-ws-on-surface-variant"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ws-secondary" />Available slot</span><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ws-primary-container" />Booked slot</span><span>Times and bookings are illustrative.</span></div>
    </div>
    {date === SAMPLE_DATE ? <div className="mb-5 overflow-hidden rounded-2xl bg-white shadow-lg"><div className="overflow-x-auto" role="region" aria-label="Resource availability timeline" tabIndex={0}><div className="min-w-[1240px]"><div className="flex bg-ws-surface-container-low text-xs text-ws-on-surface-variant"><div className="w-[280px] shrink-0 bg-ws-surface-container px-5 py-3 font-semibold uppercase">Space / Resource</div><div className="grid flex-1 grid-cols-10">{Array.from({length:10},(_,index)=><span key={index} className="py-3 text-center">{index+8<=12 ? index+8 : index-4}:00 {index<4 ? "AM" : "PM"}</span>)}</div></div>{visible.length ? visible.map(row=><div key={row.id} className="border-t border-ws-outline-variant/30">{row.content}</div>) : <p role="status" className="p-6 text-sm">No sample resources match these filters.</p>}</div></div></div> : <p role="status" className="mb-5 rounded-xl bg-white p-8 text-sm text-ws-on-surface-variant">No sample schedule is loaded for this date. Availability has not been verified. <button type="button" className="ml-2 font-medium text-ws-secondary underline" onClick={()=>{setDate(SAMPLE_DATE);setSelected(initialSelection);}}>Show October 24 sample</button></p>}
    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-lg lg:flex-row lg:items-center"><div role="status"><p className="text-xs font-bold uppercase tracking-wider text-ws-secondary">Selected target slot</p><p className="mt-1 font-semibold text-ws-primary">{selection ? selection.resource : "Select an available block"}</p><p className="mt-1 text-sm text-ws-secondary">{selection ? `${selection.time} · ${selection.duration}` : "No slot selected"}</p>{validation?.error && <p className="mt-2 text-xs text-ws-on-surface-variant">{validation.error} Choose a shorter time in the reservation form.</p>}</div>{selection ? <Link href={href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ws-primary px-6 py-3 text-sm font-semibold text-white"><Icon name="check_circle" />Book Selected Slot</Link> : <button disabled className="rounded-xl bg-ws-primary px-6 py-3 text-sm font-semibold text-white opacity-50">Book Selected Slot</button>}</div>
    <div className="mt-8 grid gap-5 md:grid-cols-3">{[["Automated Check-in", "Planned: a 10-minute check-in grace period."], ["Smart Climate Sync", "Planned: room equipment and climate preparation."], ["Calendar Two-Way Sync", "Planned: calendar and notification integrations."]].map(([title,text])=><div key={title} className="rounded-xl bg-white p-4 shadow-sm"><h2 className="text-base font-semibold text-ws-on-surface">{title}</h2><p className="mt-1 text-sm text-ws-on-surface-variant">{text}</p></div>)}</div>
  </SlotContext.Provider>;
}
