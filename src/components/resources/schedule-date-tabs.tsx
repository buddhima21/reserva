"use client";

import { useState, type ReactNode } from "react";

export function ScheduleDateTabs({ children }: { children?: ReactNode }) {
  const [day, setDay] = useState("24");
  return <div><div className="mb-4 flex flex-wrap gap-1 rounded-lg bg-ws-surface-container-low p-1" aria-label="Sample schedule dates">{["24", "25", "26"].map(value => <button key={value} type="button" onClick={() => setDay(value)} aria-pressed={day === value} className={`rounded-lg px-3 py-1.5 text-sm ${day === value ? "bg-white font-semibold text-ws-primary shadow-sm" : "text-ws-on-surface-variant"}`}>Oct {value}</button>)}</div>{day === "24" ? children : <p role="status" className="rounded-xl bg-white p-6 text-sm text-ws-on-surface-variant">No sample schedule is loaded for October {day}. Availability has not been verified.</p>}</div>;
}
