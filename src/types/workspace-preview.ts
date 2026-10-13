import type { ReactNode } from "react";

export type ReservationPreview = {
  id: string;
  category: "my" | "team";
  content: ReactNode;
};
