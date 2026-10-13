"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { categoryLabels, resourceCategories, resourceStatuses, statusLabels, type ResourceRecord } from "@/types/resource";
import { Icon } from "@/components/ui/icon";

const inputClass = "mt-2 w-full rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 py-2.5 text-sm text-ws-on-surface";

export function ResourceForm({ resource }: { resource?: ResourceRecord }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const cancelHref = resource ? `/resources/${resource.id}` : "/resources";

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const data = { ...Object.fromEntries(form), capacity: Number(form.get("capacity")) };
    setPending(true); setError(""); setFields({});
    try {
      const response = await fetch(resource ? `/api/resources/${resource.id}` : "/api/resources", { method: resource ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (response.status === 401) { router.replace(`/login?next=${encodeURIComponent(resource ? `/resources/${resource.id}/edit` : "/resources/new")}`); router.refresh(); return; }
      if (!response.ok) { setError(result.error); setFields(result.fields ?? {}); return; }
      router.push(`/resources/${result.resource.id}`); router.refresh();
    } catch { setError("Unable to save the resource. Check your connection and try again."); }
    finally { setPending(false); }
  }

  function fieldError(name: string) {
    return fields[name] ? <span id={`${name}-error`} className="mt-1 block text-xs text-ws-error">{fields[name]}</span> : null;
  }
  function accessibility(name: string) {
    return { "aria-invalid": !!fields[name], "aria-describedby": fields[name] ? `${name}-error` : undefined };
  }

  return <div className="mx-auto max-w-3xl"><Link href={cancelHref} className="mb-6 inline-flex items-center gap-2 text-sm text-ws-secondary"><Icon name="arrow_back" />Back to {resource ? "resource" : "resources"}</Link><p className="text-xs font-semibold uppercase tracking-wider text-ws-secondary">Workspace Inventory</p><h1 className="mt-2 text-headline-xl font-bold text-ws-primary">{resource ? "Edit Resource" : "Add Resource"}</h1><p className="mt-2 text-sm text-ws-on-surface-variant">{resource ? "Update the details your workspace uses to find this resource." : "Add a room, workspace, or piece of equipment to your shared inventory."}</p>
    <form onSubmit={save} aria-busy={pending} className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      {error && <p role="alert" className="mb-5 rounded-lg bg-ws-error-container/60 p-4 text-sm text-ws-on-error-container">{error}</p>}
      <fieldset disabled={pending} className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium sm:col-span-2" htmlFor="resource-name">Resource name *<input id="resource-name" name="name" required minLength={2} maxLength={120} defaultValue={resource?.name} placeholder="Executive Meeting Room 4A" className={inputClass} {...accessibility("name")} />{fieldError("name")}</label>
        <label className="text-sm font-medium" htmlFor="resource-category">Category *<select id="resource-category" name="category" defaultValue={resource?.category ?? "meeting"} className={inputClass} {...accessibility("category")}>{resourceCategories.map(value => <option key={value} value={value}>{categoryLabels[value]}</option>)}</select>{fieldError("category")}</label>
        <label className="text-sm font-medium" htmlFor="resource-status">Status *<select id="resource-status" name="status" defaultValue={resource?.status ?? "ACTIVE"} className={inputClass} {...accessibility("status")}>{resourceStatuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}</select>{fieldError("status")}</label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="resource-location">Location *<input id="resource-location" name="location" required minLength={2} maxLength={200} defaultValue={resource?.location} placeholder="Building, floor, room or equipment locker" className={inputClass} {...accessibility("location")} />{fieldError("location")}</label>
        <label className="text-sm font-medium" htmlFor="resource-floor">Floor<input id="resource-floor" name="floor" maxLength={30} defaultValue={resource?.floor ?? ""} placeholder="4 or ground" className={inputClass} {...accessibility("floor")} />{fieldError("floor")}</label>
        <label className="text-sm font-medium" htmlFor="resource-capacity">Capacity<input id="resource-capacity" name="capacity" type="number" min={0} max={10000} step={1} required defaultValue={resource?.capacity ?? 0} className={inputClass} {...accessibility("capacity")} /><span className="mt-1 block text-xs font-normal text-ws-outline">Use 0 for equipment.</span>{fieldError("capacity")}</label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="resource-description">Description<textarea id="resource-description" name="description" rows={4} maxLength={2000} defaultValue={resource?.description ?? ""} className={inputClass} {...accessibility("description")} />{fieldError("description")}</label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="resource-image">Image URL<input id="resource-image" name="imageUrl" type="url" maxLength={2048} defaultValue={resource?.imageUrl ?? ""} placeholder="https://…" className={inputClass} {...accessibility("imageUrl")} /><span className="mt-1 block text-xs font-normal text-ws-outline">Optional HTTPS image link. A resource icon is shown when omitted.</span>{fieldError("imageUrl")}</label>
      </fieldset>
      <div className="mt-7 flex items-center justify-between gap-3 border-t border-ws-outline-variant/30 pt-5"><Link href={cancelHref} className="rounded-lg px-4 py-2 text-sm text-ws-on-surface-variant">Cancel</Link><button disabled={pending} type="submit" className="inline-flex items-center gap-2 rounded-lg bg-ws-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-ws-primary-container disabled:opacity-60"><Icon name="check_circle" />{pending ? "Saving…" : resource ? "Save Changes" : "Create Resource"}</button></div>
    </form>
  </div>;
}
