"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { RESOURCE_IMAGE_TYPES, resourceImageFileError } from "@/lib/resources/image-config";

export function ResourceImageInput({ imageUrl, onUrlChange, file, onFileChange, error, onError }: {
  imageUrl: string; onUrlChange: (url: string) => void; file: File | null;
  onFileChange: (file: File | null) => void; error?: string; onError: (error: string) => void;
}) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [preview, setPreview] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const visibleImage = mode === "upload" && file ? preview : imageUrl.startsWith("https://") ? imageUrl : "";

  function clearFile() {
    onFileChange(null); setPreview(""); onError("");
    if (input.current) { input.current.value = ""; input.current.setCustomValidity(""); }
  }

  return <div className="sm:col-span-2">
    <p id="resource-image-label" className="text-sm font-medium">Resource image</p>
    <div role="group" aria-labelledby="resource-image-label" className="mt-3 flex flex-wrap gap-3">
      {[["upload", "Upload image"], ["url", "Use image URL"]].map(([value, label]) => <label key={value} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${mode === value ? "border-ws-secondary bg-ws-secondary-container/30 text-ws-primary" : "border-ws-outline-variant/40 text-ws-on-surface-variant"}`}><input type="radio" name="imageSource" value={value} checked={mode === value} onChange={() => { setMode(value as "upload" | "url"); clearFile(); }} className="accent-ws-primary" />{label}</label>)}
    </div>
    {mode === "upload" ? <div className="mt-3 rounded-xl border border-dashed border-ws-secondary/35 bg-ws-surface-container-low/40 p-5">
      <label htmlFor="resource-image-file" className="flex items-center gap-3 text-sm font-semibold text-ws-primary"><Icon name="add_circle" className="text-2xl text-ws-secondary" />Choose an image from your device</label>
      <input ref={input} id="resource-image-file" type="file" accept={RESOURCE_IMAGE_TYPES.join(",")} aria-describedby={error ? "resource-image-help resource-image-error" : "resource-image-help"} aria-invalid={!!error} onChange={event => {
        const selected = event.target.files?.[0];
        if (!selected) return;
        const failure = resourceImageFileError(selected);
        if (failure) { clearFile(); event.target.setCustomValidity(failure); onError(failure); return; }
        event.target.setCustomValidity("");
        onFileChange(selected); setPreview(URL.createObjectURL(selected)); onError("");
      }} className="mt-4 block w-full min-w-0 text-sm text-ws-on-surface-variant file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-ws-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
      <p id="resource-image-help" className="mt-3 text-xs leading-5 text-ws-on-surface-variant">JPG, PNG, or WebP · up to 4 MB. Uploaded when you save the resource.{imageUrl && !file ? " Your current image will be kept unless you replace or remove it." : ""}</p>
    </div> : <label htmlFor="resource-image-url" className="mt-3 block text-sm"><span className="sr-only">HTTPS image URL</span><input id="resource-image-url" type="url" maxLength={2048} value={imageUrl} onChange={event => { onUrlChange(event.target.value); onError(""); }} placeholder="https://…" aria-invalid={!!error} aria-describedby={error ? "resource-image-error" : undefined} className="w-full rounded-lg border border-ws-outline-variant/40 bg-ws-surface-container-low px-3 py-2.5 text-sm text-ws-on-surface" /><span className="mt-2 block text-xs text-ws-on-surface-variant">Optional HTTPS link to an existing image.</span></label>}
    {visibleImage && <div className="mt-4 overflow-hidden rounded-xl border border-ws-outline-variant/30"><Image src={visibleImage} alt="Resource image preview" width={640} height={320} unoptimized className="h-48 w-full bg-ws-surface-container-low object-contain" /><div className="flex flex-wrap items-center justify-between gap-2 bg-ws-surface-container-lowest px-4 py-3"><p className="min-w-0 break-all text-xs text-ws-on-surface-variant">{file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : "Current image"}</p><button type="button" onClick={() => { clearFile(); onUrlChange(""); }} className="rounded-lg px-2 py-1 text-xs font-semibold text-ws-error hover:bg-ws-error-container/30">Remove image</button></div></div>}
    {error && <p id="resource-image-error" role="alert" className="mt-2 text-xs text-ws-error">{error}</p>}
  </div>;
}
