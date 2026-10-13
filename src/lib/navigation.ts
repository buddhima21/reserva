import type { NavigationItem } from "@/types/navigation";

export const workspaceNavigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resources", href: "/resources" },
  { label: "Reservations", href: "/reservations" },
  { label: "Availability", href: "/availability" },
] as const satisfies readonly NavigationItem[];
