import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Suspense } from "react";
import { requireUser, userDisplayName } from "@/lib/auth/session";
import { dashboardSummary, listReservations } from "@/services/reservations";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <Suspense fallback={<WorkspaceLoading message="Loading dashboard…" />}><UserDashboard /></Suspense>;
}

async function UserDashboard() {
  const user = await requireUser();
  const [summary, reservations] = await Promise.all([dashboardSummary(user.id), listReservations(user.id, new URLSearchParams({ status: "upcoming", pageSize: "5" }))]);
  return <DashboardOverview name={userDisplayName(user)} summary={summary} reservations={reservations} now={new Date().toISOString()} />;
}
