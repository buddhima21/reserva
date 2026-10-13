import type { ReactNode } from "react";

export type ResourcePreview = {
  id: string;
  name: string;
  category: string;
  capacity: number;
  floor: string;
  availableNow: boolean;
  searchText: string;
  content: ReactNode;
};

export type ReservationPreview = {
  id: string;
  category: "my" | "team";
  content: ReactNode;
};
