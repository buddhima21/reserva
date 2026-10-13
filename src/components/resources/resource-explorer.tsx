"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ResourceCard } from "./resource-card";
import type { ResourceList } from "@/types/resource";

const categories = [["all", "All"], ["meeting", "Meeting Rooms"], ["equipment", "Equipment"], ["workspace", "Workspaces"], ["event", "Event Spaces"]] as const;
const controlClass = "h-9 max-w-full rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 text-sm text-ws-on-surface";
const defaults = { q: "", category: "all", status: "all", capacity: "all", floor: "all", page: "1" };

export function ResourceExplorer({ initial, initialError = "" }: { initial: ResourceList; initialError?: string }) {
  const [filters, setFilters] = useState(defaults);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [data, setData] = useState(initial);
  const [error, setError] = useState(initialError);
  const [pending, setPending] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setPending(true); setError("");
      try {
        const response = await fetch(`/api/resources?${new URLSearchParams({ ...filters, pageSize: "12" })}`, { signal: controller.signal, cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to load resources.");
        if (!controller.signal.aborted) setData(result);
      } catch (failure) {
        if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : "Unable to load resources.");
      } finally { if (!controller.signal.aborted) setPending(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [filters, retry]);

  function filter(key: keyof typeof defaults, value: string) {
    setFilters(current => ({ ...current, [key]: value, page: key === "page" ? value : "1" }));
  }
  const lastPage = Math.max(1, Math.ceil(data.total / data.pageSize));
  const totalCategoryCount = Object.values(data.categoryCounts).reduce((sum, count) => sum + count, 0);

  return <div aria-busy={pending}>
    <div className="mb-space-xl flex flex-col gap-space-md rounded-xl bg-ws-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-col gap-space-md sm:flex-row sm:items-center"><div className="relative min-w-0 flex-1"><Icon name="search" className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-ws-outline" /><input aria-label="Search resources" value={filters.q} maxLength={120} onChange={event => filter("q", event.target.value)} onKeyDown={event => { if (event.key === "Escape") filter("q", ""); }} placeholder="Search resources, locations, or equipment..." className="h-11 w-full rounded-lg bg-ws-surface-container-low pr-4 pl-10 text-sm text-ws-on-surface placeholder:text-ws-outline" /></div><div className="flex self-start rounded-lg bg-ws-surface-container-low p-1" aria-label="Resource view">{(["grid", "list"] as const).map(mode => <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`flex items-center gap-1 rounded-md px-4 py-1.5 text-sm font-medium ${view === mode ? "bg-white text-ws-primary shadow-sm" : "text-ws-on-surface-variant"}`}><Icon name={mode === "grid" ? "grid_view" : "view_list"} />{mode === "grid" ? "Grid" : "List"}</button>)}</div></div>
      <div className="flex flex-wrap gap-2" aria-label="Resource categories">{categories.map(([value, label]) => <button key={value} type="button" aria-pressed={filters.category === value} onClick={() => filter("category", value)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${filters.category === value ? "bg-ws-primary-container text-white shadow-sm" : "bg-ws-surface-container-low text-ws-on-surface-variant hover:bg-ws-surface-container"}`}>{label} <span className="ml-1 opacity-70">{value === "all" ? totalCategoryCount : data.categoryCounts[value] ?? 0}</span></button>)}</div>
      <div className="flex flex-wrap gap-2"><select aria-label="Resource status" value={filters.status} onChange={event => filter("status", event.target.value)} className={controlClass}><option value="all">All Statuses</option><option value="ACTIVE">Active</option><option value="MAINTENANCE">Maintenance</option><option value="INACTIVE">Inactive</option></select><select aria-label="Capacity" value={filters.capacity} onChange={event => filter("capacity", event.target.value)} className={controlClass}><option value="all">Any Capacity</option><option value="small">1–4 people</option><option value="medium">5–10 people</option><option value="large">11+ people</option></select><select aria-label="Floor" value={filters.floor} onChange={event => filter("floor", event.target.value)} className={controlClass}><option value="all">All Floors</option>{data.floors.map(floor => <option key={floor} value={floor}>{floor === "ground" ? "Ground Floor" : `Floor ${floor}`}</option>)}</select><button type="button" aria-label="Reset filters" onClick={() => setFilters({ ...defaults })} className={controlClass}><Icon name="restart_alt" /></button></div>
    </div>
    {error && <p role="alert" className="mb-4 rounded-xl bg-ws-error-container/60 p-4 text-sm text-ws-on-error-container">{error} <button type="button" onClick={() => setRetry(value => value + 1)} className="ml-2 font-medium underline">Try again</button></p>}
    <p role="status" className="mb-4 text-sm text-ws-on-surface-variant">{pending ? "Loading resources…" : `Showing ${data.items.length ? (data.page - 1) * data.pageSize + 1 : 0}–${(data.page - 1) * data.pageSize + data.items.length} of ${data.total} resources`}</p>
    {data.items.length ? <div className={view === "grid" ? "grid grid-cols-1 gap-space-lg md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-space-md"}>{data.items.map(resource => <div key={resource.id} className={view === "list" ? "resource-list-item" : ""}><ResourceCard resource={resource} /></div>)}</div> : !error && !pending ? <div className="rounded-xl border border-ws-outline-variant/40 bg-white p-12 text-center"><h2 className="text-lg font-semibold text-ws-primary">No resources found</h2><p className="mt-2 text-sm text-ws-on-surface-variant">Add a resource or try another search.</p><button type="button" onClick={() => setFilters({ ...defaults })} className="mt-4 rounded-lg bg-ws-primary px-4 py-2 text-sm text-white">Reset filters</button></div> : null}
    {data.total > data.pageSize && <nav aria-label="Resource pagination" className="mt-6 flex items-center justify-between gap-3"><button type="button" disabled={pending || data.page <= 1} onClick={() => filter("page", String(data.page - 1))} className={`${controlClass} disabled:opacity-50`}>Previous</button><span className="text-sm text-ws-on-surface-variant">Page {data.page} of {lastPage}</span><button type="button" disabled={pending || data.page >= lastPage} onClick={() => filter("page", String(data.page + 1))} className={`${controlClass} disabled:opacity-50`}>Next</button></nav>}
  </div>;
}
