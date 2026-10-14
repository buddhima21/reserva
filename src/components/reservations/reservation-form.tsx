"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { useWorkspaceFeedback } from "@/components/ui/workspace-feedback";
import { categoryLabels, type ResourceRecord } from "@/types/resource";
import { localDate, localTime, localInputTime, parseReservationRange, validateCalendarDate, displayBookingTime, type OccupiedInterval } from "@/lib/reservations";

const inputClass = "mt-1 h-11 w-full rounded-lg bg-ws-surface-container-low px-3.5 text-sm text-ws-on-surface";
type Draft = { resource: string; date: string; endDate: string; start: string; end: string; purpose: string; notes: string };
type Availability = { available: boolean; resourceStatus: string; conflicts: OccupiedInterval[]; checkedAt: string };

export function ReservationForm({ resources, now }: { resources: ResourceRecord[]; now: string }) {
  const params = useSearchParams();
  const start = new Date(Math.ceil((new Date(now).getTime() + 60000) / 900000) * 900000);
  const end = new Date(start.getTime() + 3600000);
  function date(value: string | null, fallback: string) { try { return validateCalendarDate(value); } catch { return fallback; } }
  function time(value: string | null, fallback: string) { return value && /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? value : fallback; }
  const startDate = date(params.get("date"), localDate(start));
  const requested = params.get("resource");
  const initial: Draft = { resource: requested ? resources.find(item => item.id === requested)?.id ?? "" : resources[0]?.id ?? "", date: startDate, endDate: date(params.get("endDate"), params.has("date") ? startDate : localDate(end)), start: time(params.get("start"), localTime(start)), end: time(params.get("end"), localTime(end)), purpose: (params.get("title") ?? "").slice(0, 120), notes: (params.get("notes") ?? "").slice(0, 1000) };
  return <ReservationEditor key={params.toString()} resources={resources} initial={initial} now={now} />;
}

function ReservationEditor({ resources, initial, now }: { resources: ResourceRecord[]; initial: Draft; now: string }) {
  const router = useRouter();
  const { notify, dismiss } = useWorkspaceFeedback();
  const [draft, setDraft] = useState(initial);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [check, setCheck] = useState<{ key: string; result?: Availability; error?: string } | null>(null);
  const resource = resources.find(item => item.id === draft.resource);
  let range: ReturnType<typeof parseReservationRange> | undefined;
  let rangeError = "";
  try {
    range = parseReservationRange(localInputTime(draft.date, draft.start), localInputTime(draft.endDate, draft.end));
    if (range.startTime <= new Date(now)) rangeError = "Choose a start time in the future.";
  } catch (failure) { rangeError = failure instanceof Error ? failure.message : "Choose valid dates and times."; }
  const key = resource && range && !rangeError ? new URLSearchParams({ resourceId: resource.id, startTime: range.startTime.toISOString(), endTime: range.endTime.toISOString() }).toString() : "";
  const availability = check?.key === key ? check.result : undefined;
  const checkError = check?.key === key ? check.error : undefined;
  const duration = range ? `${Math.round((range.endTime.getTime() - range.startTime.getTime()) / 60000)} minutes` : "—";
  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/availability?${key}`, { signal: controller.signal, cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to check availability.");
        if (!controller.signal.aborted) setCheck({ key, result });
      } catch (failure) { if (!controller.signal.aborted) setCheck({ key, error: failure instanceof Error ? failure.message : "Unable to check availability." }); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [key, retry]);
  function update(field: keyof Draft, value: string) { setDraft(current => ({ ...current, [field]: value })); setError(""); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!range || rangeError || !resource || pending) return;
    dismiss(); setPending(true); setError("");
    try {
      const response = await fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resourceId: resource.id, startTime: range.startTime.toISOString(), endTime: range.endTime.toISOString(), purpose: draft.purpose, notes: draft.notes }) });
      const result = await response.json();
      if (response.status === 401) { router.replace("/login?next=/reservations/new"); router.refresh(); return; }
      if (!response.ok) { setError(result.error ?? "Unable to create the reservation."); setCheck(null); setRetry(value => value + 1); return; }
      notify("Reservation confirmed successfully.");
      router.push(`/reservations/${result.reservation.id}`); router.refresh();
    } catch { setError("Unable to save the reservation. Check your connection and try again."); }
    finally { setPending(false); }
  }
  if (!resources.length) return <section className="rounded-xl bg-white p-8"><h1 className="text-2xl font-semibold text-ws-primary">No active resources</h1><p className="mt-3 text-sm">Add or activate a resource before making a reservation.</p><Link href="/resources" className="mt-4 inline-block text-sm font-medium text-ws-secondary underline">Manage resources</Link></section>;
  const blocked = !!rangeError || !resource || !!checkError || availability?.available === false;
  const feedback = rangeError || (!resource ? "Select an active resource." : checkError || (availability ? availability.available ? "No overlapping reservations found. Availability is checked again when you confirm." : availability.resourceStatus !== "ACTIVE" ? "This resource is no longer active." : "This time range overlaps an existing reservation. Choose another time or resource." : "Checking current availability…"));
  return <div className="mx-auto w-full max-w-6xl pb-8"><div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs text-ws-on-surface-variant"><Link href="/reservations">Reservations</Link> / New Reservation</p><h1 className="text-headline-xl text-ws-primary">Create a Reservation</h1><p className="mt-2 text-sm text-ws-on-surface-variant">Reserve your rooms, spaces, or equipment. All times are in Asia/Colombo.</p></div><span className="self-start rounded-full bg-ws-secondary-container px-3 py-1 text-xs text-ws-on-secondary-container">Live availability</span></div>
    <form onSubmit={submit} aria-busy={pending} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"><div className="flex flex-col gap-5 lg:col-span-7"><fieldset disabled={pending} className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm">
      <div><div className="flex items-center justify-between gap-2"><label htmlFor="resource-select" className="text-sm font-medium">Select Resource *</label><Link href="/resources" className="text-xs font-medium text-ws-secondary">Browse All</Link></div><select id="resource-select" required value={draft.resource} onChange={event => update("resource", event.target.value)} className={inputClass}><option value="" disabled>Choose an active resource</option>{resources.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><p className="mt-2 text-xs text-ws-on-surface-variant">{resource?.location ?? "The requested resource is not available. Choose another resource."}</p></div>
      <div className="grid gap-4 sm:grid-cols-2"><label htmlFor="reservation-date" className="text-sm font-medium">Start Date *<input id="reservation-date" type="date" required min={localDate(now)} value={draft.date} onChange={event => update("date", event.target.value)} className={inputClass} /></label><label htmlFor="reservation-end-date" className="text-sm font-medium">End Date *<input id="reservation-end-date" type="date" required min={draft.date} value={draft.endDate} onChange={event => update("endDate", event.target.value)} className={inputClass} /></label></div>
      <div className="grid gap-4 sm:grid-cols-2"><label htmlFor="start-time" className="text-sm font-medium">Start Time *<input id="start-time" type="time" required value={draft.start} onChange={event => update("start", event.target.value)} className={inputClass} /></label><label htmlFor="end-time" className="text-sm font-medium">End Time *<input id="end-time" type="time" required value={draft.end} onChange={event => update("end", event.target.value)} className={inputClass} /></label></div>
      <label htmlFor="booking-title" className="text-sm font-medium">Booking Title / Purpose *<input id="booking-title" required minLength={2} maxLength={120} value={draft.purpose} onChange={event => update("purpose", event.target.value)} className={inputClass} /></label><label htmlFor="booking-notes" className="text-sm font-medium">Attendees &amp; Special Requirements<textarea id="booking-notes" rows={3} maxLength={1000} value={draft.notes} onChange={event => update("notes", event.target.value)} className="mt-1 w-full rounded-lg bg-ws-surface-container-low p-3.5 text-sm font-normal" /></label>
    </fieldset><div role="status" className={`rounded-xl p-5 text-sm leading-6 shadow-sm ${blocked ? "bg-ws-error-container/60" : "bg-ws-secondary-container/40"}`}><div className="flex gap-3"><Icon name={blocked ? "warning" : "check_circle"} className="mt-1 text-xl" /><div><h2 className="font-semibold">{blocked ? "Check your reservation" : availability ? "Slot available" : "Availability check"}</h2><p className="mt-1">{feedback}</p>{availability?.conflicts.map((slot, index) => <p key={index} className="mt-2 text-xs">Reserved: {displayBookingTime(slot.startTime)} – {displayBookingTime(slot.endTime)}</p>)}{checkError && <button type="button" onClick={() => { setCheck(null); setRetry(value => value + 1); }} className="mt-2 underline">Try again</button>}</div></div></div>
      {error && <p role="alert" className="rounded-xl bg-ws-error-container p-4 text-sm text-ws-on-error-container">{error}</p>}<div className="flex flex-wrap items-center justify-between gap-3"><Link href="/reservations" className="rounded-xl bg-ws-surface-container-high px-6 py-2.5 text-sm">Cancel</Link><button type="submit" disabled={pending || blocked || !availability?.available || draft.purpose.trim().length < 2} className="inline-flex items-center gap-2 rounded-xl bg-ws-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"><Icon name="verified" />{pending ? "Reserving…" : "Confirm Reservation"}</button></div>
    </div><aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-5"><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-ws-outline">Your booking</p><h2 className="mt-1 text-base font-semibold">Reservation Summary</h2>{resource && <><div className="relative mt-5 overflow-hidden rounded-xl bg-ws-surface-container-low">{resource.imageUrl ? <Image src={resource.imageUrl} alt={resource.name} width={800} height={500} unoptimized className="h-36 w-full object-cover" /> : <div className="flex h-36 items-center justify-center"><Icon name="meeting_room" className="text-5xl text-ws-secondary" /></div>}<div className="absolute inset-0 bg-linear-to-t from-ws-primary/90 to-transparent" /><div className="absolute bottom-3 left-3 text-white"><p className="text-xs text-ws-secondary-fixed">{categoryLabels[resource.category]}</p><p className="font-semibold">{resource.name}</p></div></div><dl className="mt-5 space-y-4 text-sm">{[["Start", `${draft.date} · ${draft.start}`], ["End", `${draft.endDate} · ${draft.end}`], ["Duration", duration], ["Location", resource.location], ["Purpose", draft.purpose || "Not provided"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt className="text-ws-on-surface-variant">{label}</dt><dd className="max-w-[65%] text-right break-words">{value}</dd></div>)}</dl></>}<p className="mt-5 rounded-lg bg-ws-surface-container-low p-3 text-xs leading-5 text-ws-on-surface-variant">Cancel upcoming or ongoing bookings from reservation details. Completed bookings remain in your history.</p></div></aside></form>
  </div>;
}

export function CancelReservation({ id }: { id: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { notify, dismiss } = useWorkspaceFeedback();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function cancel() {
    if (pending) return;
    dismiss(); setPending(true); setError("");
    try {
      const response = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (response.status === 401) { router.replace(`/login?next=${encodeURIComponent(`/reservations/${id}`)}`); router.refresh(); return; }
      if (!response.ok) { setError(result.error ?? "Unable to cancel."); return; }
      notify("Reservation cancelled. The time slot is available again.");
      dialog.current?.close(); router.refresh();
    } catch { setError("Unable to cancel. Check your connection and try again."); }
    finally { setPending(false); }
  }
  return <><button type="button" onClick={() => { setError(""); dialog.current?.showModal(); }} className="rounded-lg border border-ws-outline-variant/40 px-4 py-2 text-sm text-ws-on-surface-variant">Cancel Reservation</button><dialog ref={dialog} aria-labelledby={`cancel-${id}`} onCancel={event => { if (pending) event.preventDefault(); }} className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 id={`cancel-${id}`} className="text-lg font-semibold text-ws-primary">Cancel this reservation?</h2><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">The time slot will be released. Your reservation will remain in history as cancelled.</p>{error && <p role="alert" className="mt-3 text-sm text-ws-error">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button disabled={pending} type="button" onClick={() => dialog.current?.close()} className="rounded-lg px-4 py-2 text-sm">Keep Reservation</button><button disabled={pending} type="button" onClick={cancel} className="rounded-lg bg-ws-primary px-4 py-2 text-sm text-white disabled:opacity-50">{pending ? "Cancelling…" : "Cancel Reservation"}</button></div></dialog></>;
}
