"use client";

import { useId, useRef, type ReactNode } from "react";

export function PreviewAction({ title, message, children, className = "", ...props }: {
  title: string;
  message?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  return (
    <>
      <button type="button" className={className} {...props} aria-label={props["aria-label"] ?? title} onClick={() => dialog.current?.showModal()}>{children}</button>
      <dialog ref={dialog} aria-labelledby={headingId} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-ws-outline-variant bg-ws-surface-container-lowest p-6 text-ws-on-surface shadow-xl" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ws-secondary">Workspace preview</p>
        <h2 id={headingId} className="text-xl font-semibold text-ws-primary">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-ws-on-surface-variant">{message ?? "This action will be available when reservation and resource management are connected. This preview does not create or change any bookings."}</p>
        <div className="mt-6 flex justify-end"><button type="button" onClick={() => dialog.current?.close()} className="rounded-lg bg-ws-primary px-4 py-2 text-sm font-medium text-white">Close</button></div>
      </dialog>
    </>
  );
}
