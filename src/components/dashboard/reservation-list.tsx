"use client";

import { useState } from "react";
import type { ReservationPreview } from "@/types/workspace-preview";

export function ReservationList({ items }: { items: ReservationPreview[] }) {
  const [filter, setFilter] = useState("all");
  const visible = items.filter(item => filter === "all" || item.category === filter);
  return (
    <>
      <div className="flex flex-col justify-between gap-space-md rounded-xl bg-ws-surface-container-lowest p-space-lg shadow-sm xl:flex-row xl:items-center">
        <div><h2 className="text-headline-md font-bold tracking-tight text-ws-primary">Today&apos;s Reservations</h2><p className="text-body-sm text-ws-on-surface-variant">Sample allocations across your workspace</p></div>
        <div className="flex flex-wrap gap-1 self-start rounded-xl bg-ws-surface-container-low p-1" aria-label="Reservation filters">
          {[["all", "All Today"], ["my", "My Bookings"], ["team", "Team Bookings"]].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${filter === value ? "bg-white text-ws-on-surface shadow-sm" : "text-ws-on-surface-variant"}`}>{label} ({items.filter(item => value === "all" || item.category === value).length})</button>)}
        </div>
      </div>
      <div className="flex flex-col gap-space-sm" role="region" aria-label="Reservations"><p className="sr-only" role="status">{visible.length} reservations shown</p>{visible.map(item => <div key={item.id}>{item.content}</div>)}</div>
    </>
  );
}
