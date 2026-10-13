"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_DATE, validatePreviewSlot } from "@/lib/booking-preview";

export function QuickReservation() {
  const router = useRouter();
  const [date, setDate] = useState(SAMPLE_DATE);
  const [start, setStart] = useState("15:30");
  const [end, setEnd] = useState("16:30");
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("Alex Chen, Sarah Lin");
  const slot = validatePreviewSlot("resource-1", date, start, end);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (slot.error || slot.conflicts.length || !title.trim()) return;
    const params = new URLSearchParams({ resource: "resource-1", date, start, end, title, notes: attendees });
    router.push(`/reservations/new?${params}`);
  }
  const input = "mt-1 h-10 w-full rounded-lg bg-ws-surface-container-low px-3 text-sm text-ws-on-surface";
  return <form onSubmit={submit} className="flex flex-col gap-4">
    <label className="text-xs font-medium text-ws-on-surface-variant">Reservation date<input aria-label="Reservation date" type="date" required value={date} onChange={event => setDate(event.target.value)} className={input} /></label>
    <div className="grid grid-cols-2 gap-3"><label className="text-xs font-medium text-ws-on-surface-variant">Start time<input aria-label="Start time" type="time" required value={start} onChange={event => setStart(event.target.value)} className={input} /></label><label className="text-xs font-medium text-ws-on-surface-variant">End time<input aria-label="End time" type="time" required value={end} onChange={event => setEnd(event.target.value)} className={input} /></label></div>
    <p role="status" className="text-sm text-ws-secondary">{slot.error || (slot.conflicts.length ? "This sample slot overlaps an existing reservation." : `${slot.duration} minutes · ${slot.known ? "No sample conflicts" : "Availability not verified"}`)}</p>
    <label className="text-xs font-medium text-ws-on-surface-variant">Meeting title / purpose<input required maxLength={120} value={title} onChange={event => setTitle(event.target.value)} placeholder="Weekly Team Retro & OKR Review" className={input} /></label>
    <label className="text-xs font-medium text-ws-on-surface-variant">Internal collaborators<input value={attendees} onChange={event => setAttendees(event.target.value)} className={input} /></label>
    <button type="submit" disabled={!!slot.error || !!slot.conflicts.length} className="rounded-lg bg-ws-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Reserve Resource</button>
    <p className="text-center text-xs text-ws-outline">Continue to the reservation preview. No calendar invites are sent.</p>
  </form>;
}
