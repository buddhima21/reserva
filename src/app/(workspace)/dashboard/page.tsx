import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Suspense } from "react";
import { requireUser, userDisplayName } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <Suspense fallback={<p role="status">Loading dashboard…</p>}><UserDashboard /></Suspense>;
}

async function UserDashboard() {
  const user = await requireUser();
  return <DashboardOverview name={userDisplayName(user)} />;
}
