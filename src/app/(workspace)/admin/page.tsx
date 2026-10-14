import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { adminDashboardSummary, adminReservationOwners } from "@/services/admin";
import { listAdminReservations } from "@/services/reservations";
import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminHeading } from "@/components/admin/admin-heading";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import { RefreshAdmin } from "@/components/admin/admin-actions";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminPage() {
  return <><AdminHeading title="Workspace overview" description="A live view of your shared spaces, equipment, and reservations across the platform." action /><Suspense fallback={<WorkspaceLoading message="Loading platform statistics…" />}><Overview /></Suspense></>;
}

async function Overview() {
  const user = await requireAdmin();
  const [stats, reservations] = await Promise.all([adminDashboardSummary(user.id), listAdminReservations(user.id, new URLSearchParams({ status: "upcoming", pageSize: "5" }))]);
  const owners = await adminReservationOwners(user.id, reservations.items.map(row => row.userId));
  return <AdminOverview stats={stats} reservations={reservations} owners={owners} refresh={<RefreshAdmin />} />;
}
