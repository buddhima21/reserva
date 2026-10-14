import { requireUser } from "@/lib/auth/session";
import { localDate, type DayAvailability } from "@/lib/reservations";
import { dayAvailability } from "@/services/reservations";
import { AvailabilityBoard } from "./availability-board";
import { WorkspaceError } from "@/components/ui/workspace-feedback";

export async function AvailabilityPreview() {
  await requireUser();
  let data: DayAvailability | null = null;
  try { data = await dayAvailability(localDate(new Date())); } catch { /* Safe storage error below. */ }
  if (!data) return <WorkspaceError message="Unable to load availability. Please try again." />;
  return <AvailabilityBoard key={data.checkedAt} initial={data} />;
}
