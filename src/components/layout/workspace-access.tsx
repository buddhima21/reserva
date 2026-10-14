"use client";

import { createContext, useContext, type ReactNode } from "react";

const AdminContext = createContext(false);

export function WorkspaceAccess({ admin, children }: { admin: boolean; children: ReactNode }) {
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>;
}

export function useAdminAccess() { return useContext(AdminContext); }
