"use client";

import { useAdminAccess } from "@/components/layout/workspace-access";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { categoryLabels, statusLabels, type ResourceRecord } from "@/types/resource";

export function ResourceCard({ resource }: { resource: ResourceRecord }) {
  const canManage = useAdminAccess();
  return <div className="resource-card group flex h-full flex-col justify-between overflow-hidden rounded-xl bg-ws-surface-container-lowest shadow-sm transition-all hover:shadow-md" data-category={resource.category}>
    <div><div className="relative h-44 w-full overflow-hidden bg-ws-surface-container">
      {resource.imageUrl ? <Image src={resource.imageUrl} alt={resource.name} width={640} height={360} unoptimized className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-linear-to-br from-ws-surface-container to-ws-secondary-container/30"><Icon name={resource.category === "equipment" ? "devices" : "meeting_room"} className="text-6xl text-ws-primary/40" /></div>}
      <div className="absolute inset-0 bg-linear-to-t from-ws-primary/75 via-transparent to-transparent" />
      <span className="absolute top-space-md left-space-md rounded-full bg-white/90 px-2.5 py-1 text-label-sm font-semibold text-ws-on-surface shadow-xs">{categoryLabels[resource.category]}</span>
      <span className={`absolute top-space-md right-space-md rounded-full px-2.5 py-1 text-label-sm font-semibold shadow-xs ${resource.status === "ACTIVE" ? "bg-ws-secondary-container text-ws-on-secondary-container" : "bg-white/90 text-ws-on-surface-variant"}`}>{statusLabels[resource.status]}</span>
      <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between gap-2 text-label-sm text-white"><span className="flex min-w-0 items-center gap-1"><Icon name="location_on" /><span className="truncate">{resource.location}</span></span><span className="shrink-0 rounded-full bg-ws-primary/40 px-2 py-0.5">{resource.category === "equipment" ? "Equipment" : resource.capacity ? `Cap: ${resource.capacity}` : "Capacity not set"}</span></div>
    </div><div className="p-space-lg"><h2 className="text-headline-sm font-semibold text-ws-primary">{resource.name}</h2><p className="mt-2 line-clamp-3 min-h-12 text-body-sm text-ws-on-surface-variant">{resource.description || "No description provided."}</p><p className="mt-4 text-xs text-ws-outline">{resource.floor ? `Floor: ${resource.floor}` : "Floor not specified"}</p></div></div>
    <div className="flex items-center gap-2 border-t border-ws-outline-variant/30 px-space-lg py-space-md"><Link href={`/resources/${resource.id}`} className="flex-1 rounded-lg border border-ws-outline-variant/40 px-3 py-2 text-center text-sm font-medium text-ws-primary hover:bg-ws-surface-container-low">View Details</Link>{canManage && <Link href={`/admin/resources/${resource.id}/edit`} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ws-primary px-3 py-2 text-sm font-medium text-white hover:bg-ws-primary-container"><Icon name="edit" />Edit Resource</Link>}</div>
  </div>;
}
