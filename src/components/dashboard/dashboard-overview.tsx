import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PreviewAction } from "@/components/ui/preview-action";
import { ReservationList } from "./reservation-list";

export function DashboardOverview({ name }: { name: string }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
        <div>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-ws-secondary"></span>
            <span>Sample day: October 24 • HQ – Building 4 (Level 3 East)</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-ws-primary tracking-tight font-bold flex items-center gap-space-sm">
            Welcome back, {name}
            <span className="inline-block animate-pulse text-ws-secondary text-headline-lg font-normal">✦</span>
          </h1>
          <p className="font-body-md text-body-md text-ws-on-surface-variant mt-1">
            Here&apos;s what&apos;s happening with your workspace today. Explore a preview of your workspace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm self-start md:self-auto">
          <Link href="/availability" className="h-10 px-space-md rounded-xl bg-ws-surface-container-lowest text-ws-on-surface hover:bg-ws-surface-container-low transition-all shadow-sm flex items-center gap-space-xs font-label-md text-label-md font-medium cursor-pointer" id="quickCheckBtn">
            <Icon name="radar" className="text-[18px] text-ws-outline" />
            <span>Quick Availability Check</span>
          </Link>
          <Link href="/reservations/new" className="h-10 px-5 rounded-xl bg-ws-primary text-ws-on-primary hover:bg-ws-on-primary-fixed-variant transition-all shadow-sm flex items-center gap-space-xs font-label-md text-label-md font-medium cursor-pointer" id="newReservationBtn">
            <Icon name="add" className="text-[18px]" />
            <span>New Reservation</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-ws-on-surface-variant font-medium">Total Resources</span>
            <span className="p-1.5 rounded-lg bg-ws-surface-container-low text-ws-secondary flex items-center justify-center">
              <Icon name="domain" className="text-[18px]" />
            </span>
          </div>
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-xl text-headline-xl text-ws-primary font-bold">32</span>
            <span className="px-2 py-0.5 rounded-full bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm font-semibold">
              +2 added
            </span>
          </div>
          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-ws-on-surface-variant font-body-sm text-body-sm">
            <span>Across 4 zones</span>
            <span className="font-tabular-time text-tabular-time text-ws-outline font-medium">98.4% uptime</span>
          </div>
        </div>
        <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-ws-on-surface-variant font-medium">Available Today</span>
            <span className="p-1.5 rounded-lg bg-ws-secondary-container/40 text-ws-on-secondary-container flex items-center justify-center">
              <Icon name="check_circle" className="text-[18px]" />
            </span>
          </div>
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-xl text-headline-xl text-ws-secondary font-bold">24</span>
            <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
              High Availability
            </span>
          </div>
          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-ws-on-surface-variant font-body-sm text-body-sm">
            <span>75% ready to book</span>
            <span className="font-tabular-time text-tabular-time text-ws-secondary font-medium">8 slots now</span>
          </div>
        </div>
        <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-ws-on-surface-variant font-medium">Active Reservations</span>
            <span className="p-1.5 rounded-lg bg-ws-surface-container-high text-ws-primary flex items-center justify-center">
              <Icon name="timelapse" className="text-[18px]" />
            </span>
          </div>
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-xl text-headline-xl text-ws-primary font-bold">8</span>
            <span className="px-2 py-0.5 rounded-full bg-ws-surface-container-high text-ws-primary font-label-sm text-label-sm font-semibold">
              3 ending soon
            </span>
          </div>
          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-ws-on-surface-variant font-body-sm text-body-sm">
            <span>Happening right now</span>
            <span className="font-tabular-time text-tabular-time text-ws-outline font-medium">38 attendees</span>
          </div>
        </div>
        <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-ws-on-surface-variant font-medium">Upcoming Bookings</span>
            <span className="p-1.5 rounded-lg bg-ws-surface-container-low text-ws-on-surface-variant flex items-center justify-center">
              <Icon name="event_upcoming" className="text-[18px]" />
            </span>
          </div>
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-xl text-headline-xl text-ws-primary font-bold">14</span>
            <span className="px-2 py-0.5 rounded-full bg-ws-error-container text-ws-on-error-container font-label-sm text-label-sm font-semibold">
              2 check-ins pend.
            </span>
          </div>
          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-ws-on-surface-variant font-body-sm text-body-sm">
            <span>Today &amp; Tomorrow</span>
            <span className="font-tabular-time text-tabular-time text-ws-outline font-medium">Next: 10:00 AM</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <section className="lg:col-span-8 flex flex-col gap-space-md">
          <ReservationList items={[{ id: "booking-1", category: "my", content: (
          <div className="reservation-card bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md" data-category="my">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-ws-surface-container-low flex flex-col items-center justify-center flex-shrink-0 text-ws-primary">
                <span className="font-label-sm text-label-sm uppercase font-bold text-ws-outline">OCT</span>
                <span className="font-headline-sm text-headline-sm font-bold leading-none">24</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-ws-primary font-semibold truncate">Executive Boardroom 4A</span>
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Confirmed
                  </span>
                  <span className="px-2 py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm">
                    Cap: 16
                  </span>
                </div>
                <div className="font-body-md text-body-md text-ws-on-surface font-medium mt-1">
                  Sprint Planning &amp; Q4 Architecture Review
                </div>
                <div className="flex items-center gap-space-md mt-2 text-ws-on-surface-variant font-body-sm text-body-sm flex-wrap">
                  <span className="flex items-center gap-1 font-tabular-time text-tabular-time text-ws-primary font-semibold">
                    <Icon name="schedule" className="text-[16px] text-ws-secondary" />
                    10:00 AM – 11:30 AM
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" className="text-[16px] text-ws-outline" />
                    Alex Chen (You)
                  </span>
                  <span className="flex items-center gap-1 text-ws-outline">
                    <Icon name="videocam" className="text-[16px]" />
                    Zoom Room Ready
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs self-end md:self-center flex-shrink-0">
              <PreviewAction title="Check In" className="h-9 px-3 rounded-lg bg-ws-primary text-ws-on-primary font-label-md text-label-md font-medium hover:bg-ws-on-primary-fixed-variant transition-colors flex items-center gap-1 cursor-pointer">
                <Icon name="how_to_reg" className="text-[16px]" />
                <span>Check In</span>
              </PreviewAction>
              <PreviewAction title="Details" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer">
                Details
              </PreviewAction>
            </div>
          </div>
          ) },
          { id: "booking-2", category: "team", content: (
          <div className="reservation-card bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md" data-category="team">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-ws-secondary-container/30 flex flex-col items-center justify-center flex-shrink-0 text-ws-secondary">
                <Icon name="sensors" className="text-[24px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-ws-primary font-semibold truncate">Studio Innovation Hub</span>
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-ws-secondary"></span>
                    In Progress
                  </span>
                  <span className="px-2 py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm">
                    Cap: 24
                  </span>
                </div>
                <div className="font-body-md text-body-md text-ws-on-surface font-medium mt-1">
                  Design System Workshop &amp; Tokens Alignment
                </div>
                <div className="flex items-center gap-space-md mt-2 text-ws-on-surface-variant font-body-sm text-body-sm flex-wrap">
                  <span className="flex items-center gap-1 font-tabular-time text-tabular-time text-ws-primary font-semibold">
                    <Icon name="schedule" className="text-[16px] text-ws-secondary" />
                    1:00 PM – 2:30 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="palette" className="text-[16px] text-ws-outline" />
                    Sarah Lin (Design)
                  </span>
                  <span className="flex items-center gap-1 text-ws-outline">
                    <Icon name="devices" className="text-[16px]" />
                    Dual Presentation Display
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs self-end md:self-center flex-shrink-0">
              <PreviewAction title="Join Screen" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer flex items-center gap-1">
                <Icon name="share" className="text-[16px] text-ws-outline" />
                <span>Join Screen</span>
              </PreviewAction>
              <PreviewAction title="Details" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer">
                Details
              </PreviewAction>
            </div>
          </div>
          ) },
          { id: "booking-3", category: "team", content: (
          <div className="reservation-card bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md" data-category="team">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-ws-surface-container-low flex flex-col items-center justify-center flex-shrink-0 text-ws-outline">
                <Icon name="videocam" className="text-[24px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-ws-primary font-semibold truncate">Portable 4K Laser Projector #2</span>
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Confirmed
                  </span>
                  <span className="px-2 py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm">
                    Equipment
                  </span>
                </div>
                <div className="font-body-md text-body-md text-ws-on-surface font-medium mt-1">
                  Hardware Device Checkout • Product Demo Hall
                </div>
                <div className="flex items-center gap-space-md mt-2 text-ws-on-surface-variant font-body-sm text-body-sm flex-wrap">
                  <span className="flex items-center gap-1 font-tabular-time text-tabular-time text-ws-primary font-semibold">
                    <Icon name="schedule" className="text-[16px] text-ws-secondary" />
                    3:00 PM – 4:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" className="text-[16px] text-ws-outline" />
                    Marcus Vance (Product)
                  </span>
                  <span className="flex items-center gap-1 text-ws-outline">
                    <Icon name="qr_code" className="text-[16px]" />
                    Unit SN: LP-8892
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs self-end md:self-center flex-shrink-0">
              <PreviewAction title="Manage Loan" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer">
                Manage Loan
              </PreviewAction>
            </div>
          </div>
          ) },
          { id: "booking-4", category: "my", content: (
          <div className="reservation-card bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md" data-category="my">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-ws-surface-container-low flex flex-col items-center justify-center flex-shrink-0 text-ws-primary">
                <Icon name="self_improvement" className="text-[24px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-ws-primary font-semibold truncate">Focus Pod B3</span>
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Confirmed
                  </span>
                  <span className="px-2 py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm">
                    Cap: 1
                  </span>
                </div>
                <div className="font-body-md text-body-md text-ws-on-surface font-medium mt-1">
                  Client Architecture Sync &amp; Strategic Pitch
                </div>
                <div className="flex items-center gap-space-md mt-2 text-ws-on-surface-variant font-body-sm text-body-sm flex-wrap">
                  <span className="flex items-center gap-1 font-tabular-time text-tabular-time text-ws-primary font-semibold">
                    <Icon name="schedule" className="text-[16px] text-ws-secondary" />
                    4:30 PM – 5:30 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" className="text-[16px] text-ws-outline" />
                    Alex Chen (You)
                  </span>
                  <span className="flex items-center gap-1 text-ws-outline">
                    <Icon name="volume_off" className="text-[16px]" />
                    Acoustic Grade A
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs self-end md:self-center flex-shrink-0">
              <PreviewAction title="Modify" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer">
                Modify
              </PreviewAction>
              <PreviewAction title="Details" className="h-9 px-3 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors cursor-pointer">
                Details
              </PreviewAction>
            </div>
          </div>
          ) }]} />
          <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm mt-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-ws-secondary-container/40 flex items-center justify-center text-ws-on-secondary-container">
                <Icon name="analytics" className="text-[20px]" />
              </div>
              <div>
                <div className="font-label-md text-label-md text-ws-primary font-semibold">HQ Utilization Peak Forecast</div>
                <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Optimal density projected between 2:00 PM – 4:00 PM today</div>
              </div>
            </div>
            <div className="flex items-center gap-space-md">
              <svg aria-hidden="true" className="w-40 h-8 text-ws-secondary overflow-visible" fill="none" viewBox="0 0 160 32">
                <path d="M0 24 L25 20 L50 26 L75 10 L100 8 L125 18 L150 12 L160 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                <circle className="fill-ws-surface-container-lowest stroke-ws-secondary" cx="100" cy="8" r="4" strokeWidth="2.5"></circle>
              </svg>
              <span className="font-tabular-time text-tabular-time font-bold text-ws-primary bg-ws-surface-container px-2 py-1 rounded">
                84% Peak
              </span>
            </div>
          </div>
        </section>
        <aside className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-xs">
                <Icon name="sensors" className="text-ws-secondary text-[20px]" />
                <h2 className="font-headline-sm text-headline-sm text-ws-primary font-bold">Live Availability</h2>
              </div>
              <span className="font-label-sm text-label-sm text-ws-outline uppercase font-semibold">Real-Time</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/60 flex items-center justify-between gap-space-xs hover:bg-ws-surface-container-low transition-colors">
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-ws-primary font-semibold truncate">Executive Meeting Room</div>
                  <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Capacity: 12 • 4th Floor</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-ws-surface-container-high text-ws-on-surface-variant font-label-sm text-label-sm font-medium whitespace-nowrap flex-shrink-0">
                  In Use till 11:30 AM
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/60 flex items-center justify-between gap-space-xs hover:bg-ws-surface-container-low transition-colors">
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-ws-primary font-semibold truncate">Creative Studio</div>
                  <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Capacity: 8 • Studio Wing</div>
                </div>
                <div className="flex items-center gap-space-xs flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Available
                  </span>
                  <PreviewAction title="Quick Book" className="text-ws-secondary hover:text-ws-on-secondary-fixed-variant p-1 rounded hover:bg-ws-surface-container-lowest cursor-pointer transition-colors">
                    <Icon name="add_circle" className="text-[18px]" />
                  </PreviewAction>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/60 flex items-center justify-between gap-space-xs hover:bg-ws-surface-container-low transition-colors">
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-ws-primary font-semibold truncate">Conference Hall A</div>
                  <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Capacity: 45 • Ground Central</div>
                </div>
                <div className="flex items-center gap-space-xs flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Available
                  </span>
                  <PreviewAction title="Quick Book" className="text-ws-secondary hover:text-ws-on-secondary-fixed-variant p-1 rounded hover:bg-ws-surface-container-lowest cursor-pointer transition-colors">
                    <Icon name="add_circle" className="text-[18px]" />
                  </PreviewAction>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/60 flex items-center justify-between gap-space-xs hover:bg-ws-surface-container-low transition-colors">
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-ws-primary font-semibold truncate">Studio Podcast Room</div>
                  <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Capacity: 4 • Media Lab</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-medium whitespace-nowrap flex-shrink-0">
                  Free until 2:00 PM
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/60 flex items-center justify-between gap-space-xs hover:bg-ws-surface-container-low transition-colors">
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-ws-primary font-semibold truncate">MacBook Pro M3 Max</div>
                  <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Lab Hardware Unit #04</div>
                </div>
                <div className="flex items-center gap-space-xs flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary"></span>
                    Available
                  </span>
                  <PreviewAction title="Reserve Equipment" className="text-ws-secondary hover:text-ws-on-secondary-fixed-variant p-1 rounded hover:bg-ws-surface-container-lowest cursor-pointer transition-colors">
                    <Icon name="add_circle" className="text-[18px]" />
                  </PreviewAction>
                </div>
              </div>
            </div>
            <Link href="/resources" className="mt-space-md w-full py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface font-label-md text-label-md font-medium hover:bg-ws-surface-container transition-colors flex items-center justify-center gap-1 cursor-pointer">
              <span>View All 32 Resources</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
          <div className="bg-ws-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <Icon name="bolt" className="text-ws-secondary text-[20px]" />
                <h2 className="font-headline-sm text-headline-sm text-ws-primary font-bold">Instant 1-Click Book</h2>
              </div>
              <span className="font-label-sm text-label-sm text-ws-outline uppercase font-semibold">Suggested</span>
            </div>
            <p className="font-body-sm text-body-sm text-ws-on-surface-variant mb-space-md">Rapid slot allocations for immediate focus sessions.</p>
            <div className="flex flex-col gap-space-sm">
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/40 flex items-center justify-between gap-space-sm hover:bg-ws-surface-container-low transition-colors">
                <div className="flex items-center gap-space-xs min-w-0">
                  <Icon name="desk" className="text-ws-outline text-[18px]" />
                  <span className="font-label-md text-label-md text-ws-on-surface font-semibold truncate">Desk Pod B2</span>
                </div>
                <div className="flex items-center gap-1">
                  <PreviewAction title="30m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    30m
                  </PreviewAction>
                  <PreviewAction title="60m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    60m
                  </PreviewAction>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/40 flex items-center justify-between gap-space-sm hover:bg-ws-surface-container-low transition-colors">
                <div className="flex items-center gap-space-xs min-w-0">
                  <Icon name="videocam" className="text-ws-outline text-[18px]" />
                  <span className="font-label-md text-label-md text-ws-on-surface font-semibold truncate">Projector Alpha</span>
                </div>
                <div className="flex items-center gap-1">
                  <PreviewAction title="45m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    45m
                  </PreviewAction>
                  <PreviewAction title="90m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    90m
                  </PreviewAction>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-ws-surface-container-low/40 flex items-center justify-between gap-space-sm hover:bg-ws-surface-container-low transition-colors">
                <div className="flex items-center gap-space-xs min-w-0">
                  <Icon name="phone_in_talk" className="text-ws-outline text-[18px]" />
                  <span className="font-label-md text-label-md text-ws-on-surface font-semibold truncate">Phone Booth 04</span>
                </div>
                <div className="flex items-center gap-1">
                  <PreviewAction title="15m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    15m
                  </PreviewAction>
                  <PreviewAction title="30m" className="quick-slot-btn px-2.5 py-1 rounded bg-ws-surface-container-lowest text-ws-primary font-label-sm text-label-sm font-semibold hover:bg-ws-secondary hover:text-ws-on-secondary transition-all shadow-xs cursor-pointer">
                    30m
                  </PreviewAction>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-ws-surface-container p-space-md rounded-xl flex items-center gap-space-md">
            <div className="w-9 h-9 rounded-full bg-ws-surface-container-lowest flex items-center justify-center text-ws-secondary flex-shrink-0">
              <Icon name="verified_user" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <div className="font-label-md text-label-md text-ws-primary font-semibold">Auto-Release Grace Period</div>
              <div className="font-body-sm text-body-sm text-ws-on-surface-variant">Rooms not checked-in within 10 min are released to waiting teams.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


