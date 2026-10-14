"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { workspaceNavigation } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { useAdminAccess } from "./workspace-access";

const icons = { "/dashboard": "grid_view", "/resources": "meeting_room", "/reservations": "calendar_month", "/availability": "schedule" };

export function WorkspaceNavigation() {
  const pathname = usePathname();
  const admin = useAdminAccess();
  return (
    <nav aria-label="Workspace navigation" className="flex flex-wrap gap-1 lg:flex-col">
      {workspaceNavigation.map(item => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-ws-secondary-container font-semibold text-ws-primary" : "text-ws-on-surface-variant hover:bg-ws-surface-container-low"}`}><Icon name={icons[item.href]} className="text-xl" />{item.label}</Link>;
      })}
      {admin && <div className="mt-3 border-t border-ws-outline-variant/30 pt-3"><p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ws-outline">Administration</p>{[["/admin", "Overview", "analytics"], ["/admin/resources", "Manage resources", "tune"], ["/admin/reservations", "All reservations", "calendar_month"]].map(([href, label, icon]) => <Link key={href} href={href} aria-current={pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`)) ? "page" : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`)) ? "bg-ws-secondary-container font-semibold text-ws-primary" : "text-ws-on-surface-variant hover:bg-ws-surface-container-low"}`}><Icon name={icon} className="text-xl" />{label}</Link>)}</div>}
      <Link href="/settings" aria-current={pathname === "/settings" ? "page" : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${pathname === "/settings" ? "bg-ws-secondary-container font-semibold text-ws-primary" : "text-ws-on-surface-variant hover:bg-ws-surface-container-low"}`}><Icon name="settings" className="text-xl" />Settings</Link>
    </nav>
  );
}
