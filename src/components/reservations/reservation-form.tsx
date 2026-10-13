"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { bookingResources, displayTime, SAMPLE_DATE, timeMinutes, validatePreviewSlot } from "@/lib/booking-preview";
import { Icon } from "@/components/ui/icon";
import { PreviewAction } from "@/components/ui/preview-action";

const inputClass = "mt-1 h-11 w-full rounded-lg bg-ws-surface-container-low px-3.5 text-sm text-ws-on-surface";
const photo = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAxnOab_T-gvthOKpRL2kMmjhOUKw_jtVvkrFGpOZ5tf1gkGzKo4gmRThZKKfCiSC4_wbAwi9W7RH3zMM2YsxTXMxTHVULGPCKzmeJHlDLcSEujCqZrKceuwPzYQLr5pOYzxA_5DDqki3HkuLs4Xz9TJ8ojvdi0M_dy3Mg-QREN-B48784XGLCocHeXcUwVKnu90g1LUWnfezBlsRBpscPX5w0Ee_2PNZJfsf2-y2QAEYZ69a84_OU";
type InitialDraft = { resource: string; date: string; start: string; end: string; title: string; notes: string };

export function ReservationForm() {
  const params = useSearchParams();
  const requested = params.get("resource");
  const resource = bookingResources.find(item => item.id === requested)?.id ?? "resource-1";
  const date = params.get("date");
  return <ReservationEditor key={params.toString()} initial={{ resource, date: date && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) ? date : SAMPLE_DATE, start: Number.isFinite(timeMinutes(params.get("start") ?? "")) ? params.get("start")! : "10:30", end: Number.isFinite(timeMinutes(params.get("end") ?? "")) ? params.get("end")! : "11:30", title: params.get("title") ?? "Q4 Roadmap Architecture Alignment", notes: params.get("notes") ?? "Engineering Architecture Guild (8 attendees) + Product Ops remote." }} />;
}

function ReservationEditor({ initial }: { initial: InitialDraft }) {
  const [draft, setDraft] = useState(initial);
  const [av, setAv] = useState(true);
  const [notice, setNotice] = useState("");
  const resource = bookingResources.find(item => item.id === draft.resource)!;
  const slot = validatePreviewSlot(resource.id, draft.date, draft.start, draft.end);
  const conflict = slot.conflicts[0];
  const duration = Number.isFinite(slot.duration) && slot.duration > 0 ? `${Math.floor(slot.duration / 60) ? `${Math.floor(slot.duration / 60)}h ` : ""}${slot.duration % 60 ? `${slot.duration % 60}m` : ""}`.trim() : "—";
  function update(key: keyof InitialDraft, value: string) { setDraft(current => ({ ...current, [key]: value })); setNotice(""); }
  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (slot.error || conflict || !draft.title.trim()) return;
    setNotice("Reservation preview ready. No booking was saved, no room was locked, and no invitations were sent.");
  }
  function nextSlot() {
    const end = conflict?.end ?? "11:30";
    const minutes = timeMinutes(end) + 60;
    setDraft(current => ({ ...current, start: end, end: `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}` }));
    setNotice("");
  }

  return <div className="mx-auto w-full max-w-6xl pb-8">
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs text-ws-on-surface-variant"><Link href="/reservations" className="hover:underline">Reservations</Link> / New Reservation</p><h1 className="text-headline-xl text-ws-on-surface">Create a Reservation</h1><p className="mt-1 text-sm text-ws-on-surface-variant">Reserve shared rooms, conference spaces, or equipment with sample conflict checking.</p></div><span className="self-start rounded-full bg-ws-surface-container-high px-3 py-1 text-xs text-ws-on-surface-variant">Local preview · No live synchronization</span></div>
    <form onSubmit={preview} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <div className="flex flex-col gap-5 lg:col-span-7">
        <div className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm">
          <div><div className="flex items-center justify-between gap-2"><label htmlFor="resource-select" className="text-sm font-medium">Select Resource <span className="text-ws-error">*</span></label><Link href="/resources" className="text-xs font-medium text-ws-secondary hover:underline">Browse All</Link></div><select id="resource-select" required value={draft.resource} onChange={event => update("resource", event.target.value)} className={inputClass}>{bookingResources.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><p className="mt-2 text-xs text-ws-on-surface-variant">{resource.capacity ? `Capacity: ${resource.capacity} people · ` : "Equipment · "}{resource.location}</p></div>
          <label className="text-sm font-medium" htmlFor="reservation-date">Reservation Date <span className="text-ws-error">*</span><input id="reservation-date" type="date" required value={draft.date} onChange={event => update("date",event.target.value)} className={inputClass} /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label htmlFor="start-time" className="text-sm font-medium">Start Time <span className="text-ws-error">*</span><input id="start-time" type="time" required value={draft.start} onChange={event=>update("start",event.target.value)} className={inputClass} /></label><label htmlFor="end-time" className="text-sm font-medium">End Time <span className="text-ws-error">*</span><input id="end-time" type="time" required value={draft.end} onChange={event=>update("end",event.target.value)} className={inputClass} /></label></div>
          <label htmlFor="booking-title" className="text-sm font-medium">Booking Title / Purpose <span className="text-ws-error">*</span><input id="booking-title" required maxLength={120} value={draft.title} onChange={event=>update("title",event.target.value)} className={inputClass} /></label>
          <label htmlFor="booking-notes" className="text-sm font-medium">Attendees & Special Requirements<textarea id="booking-notes" rows={3} maxLength={1000} value={draft.notes} onChange={event=>update("notes",event.target.value)} className="mt-1 w-full rounded-lg bg-ws-surface-container-low p-3.5 text-sm font-normal" /></label>
          <label className="flex items-start gap-3 rounded-lg bg-ws-surface-container-low/70 p-3 text-xs leading-5"><input type="checkbox" checked={av} onChange={event=>{setAv(event.target.checked);setNotice("");}} className="mt-1 accent-ws-primary" /><span>Request video conferencing setup (planned integration; no link is created in this preview).</span><Icon name="videocam" className="mt-1 text-lg text-ws-outline" /></label>
        </div>
        <div role="status" className={`rounded-xl p-5 shadow-sm ${slot.error || conflict ? "bg-ws-error-container/60" : "bg-ws-secondary-container/40"}`}>
          <div className="flex items-start gap-3"><Icon name={slot.error || conflict ? "warning" : "check_circle"} className={`mt-1 text-xl ${slot.error || conflict ? "text-ws-error" : "text-ws-secondary"}`} /><div className="min-w-0 flex-1"><h2 className="text-base font-semibold">{slot.error ? "Check your reservation times" : conflict ? "Scheduling Conflict Detected" : slot.known ? "No Conflicts in Sample Schedule" : "Availability Not Verified"}</h2><p className="mt-2 text-sm leading-6">{slot.error || (conflict ? `${resource.name} is already reserved from ${displayTime(conflict.start)}–${displayTime(conflict.end)} (${conflict.title}). Choose another time or resource.` : slot.known ? "The selected interval does not overlap the loaded sample bookings. Real availability must be checked by the future backend." : "No sample schedule is loaded for this date. This preview cannot confirm real availability.")}</p>
            {conflict && <div className="mt-4 flex flex-col gap-3"><div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-3"><div className="text-sm"><p className="font-semibold">Studio Innovation Hub</p><p className="text-xs text-ws-on-surface-variant">Sample alternative · 18 seats · Floor 3</p></div><button type="button" onClick={()=>update("resource","studio-hub")} className="rounded-lg bg-ws-secondary-container px-3 py-2 text-sm font-semibold text-ws-on-secondary-container">Switch Room</button></div><div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-3"><span className="text-sm">Try a one-hour slot after {displayTime(conflict.end)}</span><button type="button" onClick={nextSlot} className="rounded-lg bg-ws-surface-container-high px-3 py-2 text-sm font-semibold">Use This Slot</button></div></div>}
            {(draft.resource !== initial.resource || draft.start !== initial.start || draft.end !== initial.end) && <button type="button" onClick={()=>{setDraft(initial);setNotice("");}} className="mt-3 text-xs font-medium underline">Undo changes</button>}
          </div></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/reservations" className="rounded-xl bg-ws-surface-container-high px-6 py-2.5 text-sm font-medium">Cancel</Link><div className="flex flex-wrap gap-2"><button type="button" onClick={()=>setNotice("This draft remains only in the current page. It will be lost on reload; nothing has been saved to a database.")} className="rounded-xl bg-ws-surface-container-low px-4 py-2.5 text-sm">Save Draft</button><button type="submit" disabled={!!slot.error || !!conflict || !draft.title.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-ws-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50"><Icon name="verified" />Confirm Reservation</button></div></div>
        {notice && <p role="status" className="rounded-xl border border-ws-outline-variant bg-white p-4 text-sm text-ws-secondary">{notice}</p>}
      </div>
      <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-5">
        <div className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wider text-ws-outline">Live preview</p><h2 className="text-base font-semibold">Reservation Summary</h2></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${conflict || slot.error ? "bg-ws-error-container text-ws-on-error-container" : "bg-ws-secondary-container text-ws-on-secondary-container"}`}>{slot.error ? "Invalid interval" : conflict ? "Conflict Alert" : slot.known ? "Sample slot available" : "Unverified"}</span></div>
          <div className="relative overflow-hidden rounded-xl bg-ws-surface-container-low">{resource.id === "resource-1" ? <Image loading="eager" src={photo} alt="Executive meeting room with oak conference table and glass walls" width={800} height={500} unoptimized className="h-36 w-full object-cover" /> : <div className="flex h-36 items-center justify-center bg-ws-surface-container"><Icon name={resource.kind==="Equipment" ? "videocam" : "meeting_room"} className="text-5xl text-ws-secondary" /></div>}<div className="absolute inset-0 bg-linear-to-t from-ws-primary/90 to-transparent" /><div className="absolute right-3 bottom-3 left-3 text-white"><p className="text-xs uppercase tracking-wider text-ws-secondary-fixed">{resource.kind}</p><p className="font-semibold">{resource.name}</p></div></div>
          <dl className="flex flex-col gap-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Date</dt><dd className="text-right font-medium">{draft.date}</dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Requested Slot</dt><dd className="text-right font-medium">{displayTime(draft.start)}–{displayTime(draft.end)}<br /><span className="text-xs text-ws-secondary">{duration}</span></dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Location</dt><dd className="max-w-[65%] text-right">{resource.location}</dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Capacity</dt><dd>{resource.capacity ? `${resource.capacity} seats` : "Equipment"}</dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">AV Setup</dt><dd className="text-ws-secondary">{av ? "Requested" : "Not requested"}</dd></div><div className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">Purpose</dt><dd className="max-w-[65%] text-right break-words">{draft.title || "Not provided"}</dd></div></dl>
          <div className="rounded-xl bg-ws-surface-container-low p-3.5"><p className="text-xs font-semibold uppercase text-ws-on-surface-variant">Sample Slot Availability Radar</p><div className="mt-3 flex h-6 overflow-hidden rounded-md text-[10px]"><span className="flex w-[20%] items-center justify-center bg-ws-surface-container">Free</span><span className="flex w-[30%] items-center justify-center bg-ws-error-container">10:00–11:30</span><span className="flex w-[30%] items-center justify-center bg-ws-secondary-container">Available</span><span className="flex w-[20%] items-center justify-center bg-ws-surface-container">Hold</span></div><p className="mt-2 text-xs text-ws-outline">Illustrative Room 4A schedule for October 24.</p></div>
          <div className="rounded-lg bg-ws-surface-container-low/60 p-3 text-xs leading-5 text-ws-on-surface-variant"><p className="font-semibold text-ws-on-surface">Planned cancellation policy</p><p>Free cancellation up to 15 minutes before the booking start time.</p></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ws-surface-container-low p-4"><div><p className="text-sm font-semibold">Facilities Concierge</p><p className="text-xs text-ws-on-surface-variant">Catering & layout modifications</p></div><PreviewAction title="Contact facilities" message="Facilities support will be connected in a later stage. This preview does not send messages." className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium">Contact</PreviewAction></div>
      </aside>
    </form>
  </div>;
}


