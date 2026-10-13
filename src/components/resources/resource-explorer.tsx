"use client";

import { useState } from "react";
import type { ResourcePreview } from "@/types/workspace-preview";
import { Icon } from "@/components/ui/icon";

const categories = [ ["all", "All"], ["meeting", "Meeting Rooms"], ["equipment", "Equipment"], ["workspace", "Workspaces"], ["event", "Event Spaces"] ] as const;
const controlClass = "h-9 rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 text-sm text-ws-on-surface";

export function ResourceExplorer({ items }: { items: ResourcePreview[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [capacity, setCapacity] = useState("all");
  const [floor, setFloor] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = items.filter(item =>
    (category === "all" || item.category === category) &&
    item.searchText.toLowerCase().includes(query.toLowerCase().trim()) &&
    (status !== "now" || item.availableNow) &&
    (floor === "all" || item.floor === floor) &&
    (capacity === "all" || (capacity === "small" && item.capacity >= 1 && item.capacity <= 4) || (capacity === "medium" && item.capacity >= 5 && item.capacity <= 10) || (capacity === "large" && item.capacity >= 12))
  );
  function reset() { setQuery(""); setCategory("all"); setStatus("all"); setCapacity("all"); setFloor("all"); }

  return (
    <div>
      <div className="mb-space-xl flex flex-col gap-space-md rounded-xl bg-ws-surface-container-lowest p-space-md shadow-sm">
        <div className="flex flex-col gap-space-md sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Icon name="search" className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-ws-outline" />
            <input aria-label="Search resources" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Escape") setQuery(""); }} placeholder="Search resources, locations, or equipment..." className="h-11 w-full rounded-lg bg-ws-surface-container-low pr-4 pl-10 text-sm text-ws-on-surface placeholder:text-ws-outline" />
          </div>
          <div className="flex self-start rounded-lg bg-ws-surface-container-low p-1" aria-label="Resource view">
            {(["grid", "list"] as const).map(mode => <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`flex items-center gap-1 rounded-md px-4 py-1.5 text-sm font-medium ${view === mode ? "bg-ws-surface-container-lowest text-ws-primary shadow-sm" : "text-ws-on-surface-variant"}`}><Icon name={mode === "grid" ? "grid_view" : "view_list"} />{mode === "grid" ? "Grid" : "List"}</button>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Resource categories">
          {categories.map(([value, label]) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${category === value ? "bg-ws-primary-container text-white shadow-sm" : "bg-ws-surface-container-low text-ws-on-surface-variant hover:bg-ws-surface-container"}`}>{label} <span className="ml-1 opacity-70">{value === "all" ? items.length : items.filter(item => item.category === value).length}</span></button>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <select aria-label="Availability status" value={status} onChange={event => setStatus(event.target.value)} className={controlClass}><option value="all">All Statuses</option><option value="now">Available Now</option></select>
          <select aria-label="Capacity" value={capacity} onChange={event => setCapacity(event.target.value)} className={controlClass}><option value="all">Any Capacity</option><option value="small">1–4 people</option><option value="medium">5–10 people</option><option value="large">12+ people</option></select>
          <select aria-label="Floor" value={floor} onChange={event => setFloor(event.target.value)} className={controlClass}><option value="all">All Floors</option><option value="ground">Ground Floor</option><option value="2">Floor 2</option><option value="3">Floor 3</option><option value="4">Floor 4</option></select>
          <button type="button" aria-label="Reset filters" onClick={reset} className={controlClass}><Icon name="restart_alt" /></button>
        </div>
      </div>
      <p role="status" className="mb-4 text-sm text-ws-on-surface-variant">Showing {visible.length} of {items.length} sample resources</p>
      {visible.length ? <div className={view === "grid" ? "grid grid-cols-1 gap-space-lg md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-space-md"}>{visible.map(item => <div key={item.id} className={view === "list" ? "resource-list-item" : ""}>{item.content}</div>)}</div> : <div className="rounded-xl border border-ws-outline-variant/40 bg-white p-12 text-center"><h2 className="text-lg font-semibold text-ws-primary">No resources found</h2><p className="mt-2 text-sm text-ws-on-surface-variant">Try another search or reset your filters.</p><button type="button" onClick={reset} className="mt-4 rounded-lg bg-ws-primary px-4 py-2 text-sm text-white">Reset filters</button></div>}
    </div>
  );
}
