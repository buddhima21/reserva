import type { CSSProperties } from "react";

const paths: Record<string, string> = {
  grid_view: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  view_list: "M8 5h13 M8 12h13 M8 19h13 M3 5h1 M3 12h1 M3 19h1",
  search: "M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  add: "M12 5v14 M5 12h14",
  add_circle: "M12 8v8 M8 12h8 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  schedule: "M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  calendar_month: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2",
  event: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2",
  meeting_room: "M4 21h16 M6 21V3h12v18 M13 12h1",
  domain: "M3 21V7h8V3h10v18H3 M6 10h2 M6 14h2 M6 18h2 M15 6h2 M15 10h2 M15 14h2 M15 18h2",
  person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 8 0 0 1 16 0v2",
  group: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-2a7 7 0 0 1 14 0v2 M17 4a4 4 0 0 1 0 8 M19 16a6 6 0 0 1 3 5",
  location_on: "M12 22S4 14 4 9a8 8 0 0 1 16 0c0 5-8 13-8 13 M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  arrow_forward: "M4 12h16 M14 6l6 6-6 6",
  chevron_right: "M9 5l7 7-7 7",
  chevron_left: "M15 5l-7 7 7 7",
  expand_more: "M5 9l7 7 7-7",
  restart_alt: "M3 11a9 9 0 1 1 2 7 M3 4v7h7",
  videocam: "M3 6h12v12H3z M15 10l6-4v12l-6-4",
  laptop_mac: "M4 3h16v14H4z M2 21h20 M8 17v4 M16 17v4",
  tv: "M3 5h18v13H3z M8 22h8 M12 18v4",
  mic: "M9 4a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V4 M5 10v2a7 7 0 0 0 14 0v-2 M12 19v3 M8 22h8",
  wifi: "M2 8a16 16 0 0 1 20 0 M5 12a11 11 0 0 1 14 0 M8 16a6 6 0 0 1 8 0 M12 20h.01",
  lock: "M5 10h14v11H5z M8 10V6a4 4 0 0 1 8 0v4",
  check_circle: "M8 12l3 3 5-6 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  verified_user: "M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3 M8 12l3 3 5-6",
  bolt: "M13 2L4 14h7l-1 8 10-12h-8l1-8",
  analytics: "M4 21V11 M12 21V3 M20 21V7",
  tune: "M4 7h16 M4 17h16 M8 4v6 M16 14v6",
  notifications: "M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3 M10 21h4",
  help: "M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3 M12 17h.01 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  desk: "M3 8h18v3H3z M5 11v10 M19 11v10 M14 11v7h5",
  terminal: "M3 4h18v16H3z M6 8l4 4-4 4 M13 16h5",
  memory: "M6 6h12v12H6z M9 9h6v6H9z M9 2v4 M15 2v4 M9 18v4 M15 18v4 M2 9h4 M2 15h4 M18 9h4 M18 15h4",
  light_mode: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 1v3 M12 20v3 M1 12h3 M20 12h3 M4 4l2 2 M18 18l2 2 M20 4l-2 2 M6 18l-2 2",
  chair: "M5 12V5h14v7 M3 11v7h18v-7 M6 18v4 M18 18v4 M3 14h18",
  share: "M8 12l8-5 M8 12l8 5 M6 12h.01 M18 5h.01 M18 19h.01",
  draw: "M4 20l1-5L17 3l4 4L9 19l-5 1 M14 6l4 4",
  palette: "M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h4a4 4 0 0 0 4-4c0-4-4-6-9-6 M7 8h.01 M11 6h.01 M16 7h.01 M6 13h.01",
  qr_code: "M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h3v3h3v3h-6z",
  scale: "M12 3v18 M7 21h10 M4 7h16 M5 7l-4 7h8L5 7 M19 7l-4 7h8l-4-7",
  speed: "M4 19a10 10 0 1 1 16 0 M12 14l5-6 M11 15h2 M5 12h2 M12 5v2",
  battery_charging_full: "M8 2h8 M6 4h12v18H6z M13 7l-4 6h4l-1 5 4-7h-4l1-4",
  view_carousel: "M7 4h10v16H7z M2 7h3v10H2z M19 7h3v10h-3z",
  self_improvement: "M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0 M4 13l6-4h4l6 4 M12 10v6 M6 21l6-5 6 5 M3 21h18",
  more_vert: "M12 5h.01 M12 12h.01 M12 19h.01",
};

const aliases: Record<string, string> = {
  event_available: "calendar_month", event_upcoming: "calendar_month", timelapse: "schedule",
  radar: "search", how_to_reg: "check_circle", sensors: "wifi", devices: "tv",
  high_quality: "tv", wb_sunny: "light_mode", phone_in_talk: "mic", shelves: "domain",
  business_center: "desk", volume_off: "mic", settings: "tune", unfold_more: "expand_more",
  desktop_windows: "tv", nest_display: "tv", graphic_eq: "analytics", surround_sound: "wifi", volume_up: "mic",
  arrow_back: "chevron_left", pin_drop: "location_on", groups: "group", calendar_add_on: "calendar_month", calendar_today: "calendar_month",
  timer: "schedule", update: "schedule", hourglass_top: "schedule", cancel_schedule_send: "calendar_month", cleaning_services: "desk", support_agent: "help",
  verified: "check_circle", done_all: "check_circle", warning: "help", swap_horiz: "arrow_forward", fast_forward: "arrow_forward",
  podium: "desk", videocam_off: "videocam", door_front: "meeting_room", headphones: "mic", touch_app: "person", blinds: "view_list", edit: "draw", delete: "view_list",
};

export function Icon({ name, className = "", style }: { name: string; className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`inline-block shrink-0 align-middle ${className}`} style={{ width: "1em", height: "1em", ...style }}>
      <path d={paths[aliases[name] ?? name] ?? paths.grid_view} />
    </svg>
  );
}
