"use client";

import { useEffect } from "react";
import { watchBrowserSession } from "@/lib/auth/browser-session";

export function SessionSync() {
  useEffect(() => watchBrowserSession(window), []);
  return null;
}
