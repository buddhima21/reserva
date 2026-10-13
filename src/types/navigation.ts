export type WorkspacePath =
  | "/dashboard"
  | "/resources"
  | "/reservations"
  | "/availability";

export type NavigationItem = {
  readonly label: string;
  readonly href: WorkspacePath;
};
