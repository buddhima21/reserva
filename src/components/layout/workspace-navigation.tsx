"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { workspaceNavigation } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";

const icons = { "/dashboard": "grid_view", "/resources": "meeting_room", "/reservations": "calendar_month", "/availability": "schedule" };

export function WorkspaceNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Workspace navigation" className="flex flex-wrap gap-1 lg:flex-col">
      {workspaceNavigation.map(item => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-ws-secondary-container font-semibold text-ws-primary" : "text-ws-on-surface-variant hover:bg-ws-surface-container-low"}`}><Icon name={icons[item.href]} className="text-xl" />{item.label}</Link>;
      })}
      <Link href="/resources/new" title="Add a resource to your workspace" className="hidden items-center gap-2 px-3 py-2.5 text-sm text-ws-outline lg:flex"><Icon name="tune" className="text-xl" />Manage Resources</Link>
      <span title="Workspace settings are coming soon" className="hidden items-center gap-2 px-3 py-2.5 text-sm text-ws-outline lg:flex"><Icon name="settings" className="text-xl" />Settings <span className="ml-auto text-[10px]">Soon</span></span>
    </nav>
  );
}
