const workspacePaths = ["/dashboard", "/resources", "/reservations", "/availability"];

export function safeAuthRedirect(value: unknown) {
  if (typeof value !== "string" || /[\\\x00-\x20]/.test(value)) return "/dashboard";
  try {
    const url = new URL(value, "https://reserva.local");
    if (!value.startsWith("/") || url.origin !== "https://reserva.local") return "/dashboard";
    if (!workspacePaths.some(path => url.pathname === path || url.pathname.startsWith(`${path}/`))) return "/dashboard";
    return url.pathname + url.search;
  } catch { return "/dashboard"; }
}
