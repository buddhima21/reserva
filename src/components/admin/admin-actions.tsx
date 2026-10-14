"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceFeedback } from "@/components/ui/workspace-feedback";
import { Icon } from "@/components/ui/icon";
import type { ResourceRecord } from "@/types/resource";

export function RefreshAdmin() {
  const router = useRouter();
  const [pending, transition] = useTransition();
  return <button type="button" disabled={pending} onClick={() => transition(() => router.refresh())} className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-ws-secondary disabled:opacity-50"><Icon name="restart_alt" />{pending ? "Refreshing…" : "Refresh"}</button>;
}

export function ResourceStatusControl({ resource }: { resource: ResourceRecord }) {
  const router = useRouter();
  const { notify, dismiss } = useWorkspaceFeedback();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function change(status: string) {
    if (pending || status === resource.status) return;
    dismiss(); setPending(true); setError("");
    try {
      const response = await fetch(`/api/resources/${resource.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to update availability.");
      notify("Resource availability updated."); router.refresh();
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to update availability."); }
    finally { setPending(false); }
  }
  return <div className="max-w-64"><select aria-label={`Availability of ${resource.name}`} value={resource.status} disabled={pending} onChange={event => change(event.target.value)} className="rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 py-2 text-sm disabled:opacity-50"><option value="ACTIVE">Available for booking</option><option value="INACTIVE">Unavailable</option><option value="MAINTENANCE">Maintenance</option></select>{error && <p role="alert" className="mt-2 text-xs text-ws-error">{error}</p>}</div>;
}

export function DeleteResource({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const { notify, dismiss } = useWorkspaceFeedback();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function remove() {
    if (pending) return;
    dismiss(); setPending(true); setError("");
    try {
      const response = await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to delete resource.");
      dialog.current?.close(); notify("Resource deleted."); router.refresh();
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to delete resource."); }
    finally { setPending(false); }
  }
  return <><button type="button" onClick={() => { setError(""); dialog.current?.showModal(); }} className="rounded-lg border border-ws-error/25 px-3 py-2 text-xs font-medium text-ws-error">Delete</button><dialog ref={dialog} aria-labelledby={`delete-${id}`} onCancel={event => { if (pending) event.preventDefault(); }} className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 id={`delete-${id}`} className="text-lg font-semibold text-ws-primary">Delete {name}?</h2><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">This permanently removes the resource. Resources with reservation history cannot be deleted; mark them unavailable instead.</p>{error && <p role="alert" className="mt-4 text-sm text-ws-error">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" disabled={pending} onClick={() => dialog.current?.close()} className="rounded-lg px-4 py-2 text-sm">Keep resource</button><button type="button" disabled={pending} onClick={remove} className="rounded-lg bg-ws-error px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{pending ? "Deleting…" : "Delete resource"}</button></div></dialog></>;
}
