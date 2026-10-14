"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { useWorkspaceFeedback } from "@/components/ui/workspace-feedback";

export function DeactivateResource({ id, name }: { id: string; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { notify, dismiss } = useWorkspaceFeedback();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function deactivate() {
    if (pending) return;
    dismiss(); setPending(true); setError("");
    try {
      const response = await fetch(`/api/resources/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (response.status === 401) { router.replace(`/login?next=${encodeURIComponent(`/resources/${id}`)}`); router.refresh(); return; }
      if (!response.ok) { setError(result.error ?? "Unable to deactivate this resource."); return; }
      notify("Resource deactivated. You can reactivate it from Edit Resource.");
      dialog.current?.close(); router.refresh();
    } catch { setError("Could not deactivate this resource. Please try again."); }
    finally { setPending(false); }
  }
  return <><button type="button" onClick={() => { setError(""); dialog.current?.showModal(); }} className="inline-flex items-center gap-2 rounded-lg border border-ws-outline-variant/40 px-4 py-2 text-sm text-ws-on-surface-variant hover:bg-ws-surface-container-low"><Icon name="delete" />Deactivate</button><dialog ref={dialog} aria-labelledby={`deactivate-${id}`} onCancel={event => { if (pending) event.preventDefault(); }} className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 id={`deactivate-${id}`} className="text-lg font-semibold text-ws-primary">Deactivate {name}?</h2><p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">This resource will be marked inactive. Its record will remain available, and you can reactivate it from Edit Resource.</p>{error && <p role="alert" className="mt-4 text-sm text-ws-error">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button disabled={pending} type="button" onClick={() => dialog.current?.close()} className="rounded-lg px-4 py-2 text-sm">Cancel</button><button disabled={pending} type="button" onClick={deactivate} className="rounded-lg bg-ws-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{pending ? "Deactivating…" : "Deactivate Resource"}</button></div></dialog></>;
}
