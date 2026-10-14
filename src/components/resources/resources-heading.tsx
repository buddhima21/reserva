"use client";

import Link from "next/link";
import { useAdminAccess } from "@/components/layout/workspace-access";
import { Icon } from "@/components/ui/icon";

export function ResourcesHeading() {
  const canManage = useAdminAccess();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Workspace Inventory</span>
            <span className="w-1 h-1 rounded-full bg-ws-outline"></span>
            <span className="text-ws-secondary font-semibold">Active Catalog</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-ws-primary tracking-tight font-bold">Explore Resources</h1>
          <p className="font-body-lg text-body-lg text-ws-on-surface-variant max-w-xl">Find shared spaces and equipment for your next booking.</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm self-start md:self-auto">
          {canManage && <Link href="/admin/resources/new" className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-ws-surface-container-lowest text-ws-on-surface font-label-md text-label-md shadow-sm hover:bg-ws-surface-container-low transition-all">
            <Icon name="add" className="text-[18px]" />
            <span>Add Resource</span>
          </Link>}
          <Link href="/reservations/new" className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-ws-primary-container text-ws-on-primary font-label-md text-label-md shadow-sm hover:bg-ws-on-primary-fixed-variant transition-all">
            <Icon name="event_available" className="text-[18px]" />
            <span>New Reservation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

