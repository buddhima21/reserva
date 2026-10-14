export const resourceCategories = ["meeting", "workspace", "equipment", "event"] as const;
export type ResourceCategory = typeof resourceCategories[number];
export const resourceStatuses = ["ACTIVE", "MAINTENANCE", "INACTIVE"] as const;
export type ResourceStatus = typeof resourceStatuses[number];

export const categoryLabels: Record<ResourceCategory, string> = {
  meeting: "Meeting Room", workspace: "Workspace", equipment: "Equipment", event: "Event Space",
};
export const statusLabels: Record<ResourceStatus, string> = {
  ACTIVE: "Active", MAINTENANCE: "Maintenance", INACTIVE: "Inactive",
};

export type ResourceInput = {
  name: string;
  category: ResourceCategory;
  description: string | null;
  location: string;
  capacity: number;
  status: ResourceStatus;
  floor: string | null;
  imageUrl: string | null;
};

export type ResourceRecord = ResourceInput & {
  id: string;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
};
export type ResourceList = { items: ResourceRecord[]; total: number; page: number; pageSize: number; floors: string[]; categoryCounts: Record<string, number> };
