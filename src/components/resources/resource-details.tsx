import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PreviewAction } from "@/components/ui/preview-action";
import { QuickReservation } from "@/components/reservations/quick-reservation";
import { ScheduleDateTabs } from "./schedule-date-tabs";

export function ResourceDetails() {
 return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-sm">
          <Link className="group inline-flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container text-ws-on-surface-variant hover:text-ws-on-surface transition-all font-label-md text-label-md" data-path="resources" href="/resources">
            <Icon name="arrow_back" className="text-[18px] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Resources</span>
          </Link>
          <span className="text-ws-outline-variant">/</span>
          <span className="font-tabular-time text-tabular-time text-ws-outline uppercase tracking-wider">RES-B4-402</span>
        </div>
        <div className="flex items-center gap-space-xs flex-wrap">
          <PreviewAction title="Edit Resource" className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-ws-surface-container-lowest hover:bg-ws-surface-container-low text-ws-on-surface-variant hover:text-ws-on-surface shadow-sm transition-all font-label-md text-label-md">
            <Icon name="edit" className="text-[18px] text-ws-outline" />
            <span>Edit Resource</span>
          </PreviewAction>
          <PreviewAction title="Delete Resource" className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-ws-surface-container-lowest hover:bg-ws-error-container/50 text-ws-error shadow-sm transition-all font-label-md text-label-md">
            <Icon name="delete" className="text-[18px]" />
            <span className="hidden sm:inline">Delete Resource</span>
          </PreviewAction>
          <a className="inline-flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-ws-primary text-ws-on-primary hover:bg-ws-primary-container shadow-md hover:shadow-lg transition-all font-headline-sm text-headline-sm" href="#quick-reserve">
            <Icon name="calendar_add_on" className="text-[18px] text-ws-secondary-container" />
            <span>Reserve This Room</span>
          </a>
        </div>
      </div>
      <div className="relative bg-ws-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-xl overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-ws-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="px-space-xs py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Conference &amp; Executive</span>
              <span className="px-space-xs py-0.5 rounded bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                <Icon name="meeting_room" className="text-[14px]" /> Meeting Room
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-ws-secondary-container/40 text-ws-on-secondary-container font-label-sm text-label-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ws-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ws-secondary"></span>
                </span>
                Available Now
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-ws-on-surface tracking-tight">Executive Meeting Room 4A</h1>
            <p className="font-body-md text-body-md text-ws-on-surface-variant flex flex-wrap items-center gap-space-xs">
              <Icon name="pin_drop" className="text-[18px] text-ws-secondary" />
              Building 4, 4th Floor, East Wing (Room 402)
              <span className="text-ws-outline-variant">•</span>
              <span className="font-tabular-time text-tabular-time text-ws-outline font-normal">Next scheduled booking at 02:00 PM</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs lg:pt-0">
            <div className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg bg-ws-surface-container-low">
              <div className="w-9 h-9 rounded-full bg-ws-surface-container-lowest flex items-center justify-center text-ws-primary shadow-sm">
                <Icon name="groups" className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-ws-outline uppercase tracking-wider">Capacity</span>
                <span className="font-headline-sm text-headline-sm text-ws-on-surface">Up to 16 seats</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg bg-ws-surface-container-low">
              <div className="w-9 h-9 rounded-full bg-ws-surface-container-lowest flex items-center justify-center text-ws-secondary shadow-sm">
                <Icon name="graphic_eq" className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-ws-outline uppercase tracking-wider">Acoustic Shield</span>
                <span className="font-headline-sm text-headline-sm text-ws-on-surface">ISO-3382 Calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="sm:col-span-2 relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-sm group">
              <Image loading="eager" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" alt="A modern architectural executive boardroom with an expansive matte natural oak conference table, black ergonomic executive task chairs, floor-to-ceiling glass walls overlooking a tranquil city skyline, motorized discreet woven roller blinds, and warm architectural recessed cove lighting with deep forest green accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAxnOab_T-gvthOKpRL2kMmjhOUKw_jtVvkrFGpOZ5tf1gkGzKo4gmRThZKKfCiSC4_wbAwi9W7RH3zMM2YsxTXMxTHVULGPCKzmeJHlDLcSEujCqZrKceuwPzYQLr5pOYzxA_5DDqki3HkuLs4Xz9TJ8ojvdi0M_dy3Mg-QREN-B48784XGLCocHeXcUwVKnu90g1LUWnfezBlsRBpscPX5w0Ee_2PNZJfsf2-y2QAEYZ69a84_OU" width={800} height={500} unoptimized />
              <div className="absolute inset-0 bg-linear-to-t from-ws-primary/80 via-transparent to-transparent flex items-end p-space-md">
                <div className="flex items-center justify-between w-full text-ws-on-primary">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-ws-secondary-fixed uppercase tracking-wider">Main Perspective</span>
                    <span className="font-headline-sm text-headline-sm">East Wing Boardroom Layout</span>
                  </div>
                  <span className="px-space-xs py-1 rounded bg-ws-surface-container-lowest/20 backdrop-blur-md text-[11px] font-mono">4K Telepresence Active</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-space-md h-64 sm:h-72">
              <div className="relative flex-1 rounded-xl overflow-hidden shadow-sm group">
                <Image loading="eager" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Close up perspective of an integrated executive conference table equipped with brushed matte black aluminum power pop-ups, sleek tactile touch controls, and high performance ceiling beamforming microphones mounted flush on sound-absorbing architectural acoustic panels in soft natural tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqaN6r12OZr0lBwsEceQ7bEj1dEujhzwjya0XmhhtxR4irhwQVIPMs30wS02EQnGeC8ILPaGrX5icFl5fKw7cYkSEFrPKISzmU5rR_fgkrfBXaqeHn9fEvug4Ha7ROhadGzDkpx4dhWy9nogMj8Iqf7t10k9oQZDnxEdvZ3Dhwu2VWwUX9WaAoWaqMfgCOrkBx2yaNQCQa6hcej4CKU8EAoDXtc917uVV_TA5QOos7l1RJLAr7lfBj" width={800} height={500} unoptimized />
                <div className="absolute bottom-2 left-2 px-space-xs py-0.5 rounded bg-ws-primary/70 backdrop-blur-sm text-ws-on-primary font-label-sm text-label-sm">
                  Touch Controls &amp; Telephony
                </div>
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden shadow-sm group">
                <Image loading="eager" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Contemporary enterprise collaboration corner inside a meeting room featuring two seamless full-height magnetic whiteboards, digital stylus docks, and high-fidelity video conference screens displaying real-time analytics graphs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9fES_ZvQG7zew-l70bGyAx7u10mVXAIzQ_qrX5C_z3Qwa6NIREvwQWIwD9CgLXojjgqHozyI2QX67y__Qqfe8YL_yUcWe4YCPdf74ZHNf9ivafxaH0EfYEQvbBytmbeS4CvB7lIt7UxRuNK0M5QvV4aZFQyYMKHV-0RzLEk-DlcjwYz9gyEt8ZEU-cdcgUy-8LZjuJGDoL_ffWBy3Jtv2w5x4av2YDcfhBCfWgTurovu5A7h-HJb1" width={800} height={500} unoptimized />
                <div className="absolute bottom-2 left-2 px-space-xs py-0.5 rounded bg-ws-primary/70 backdrop-blur-sm text-ws-on-primary font-label-sm text-label-sm">
                  Dual Ideation Walls
                </div>
              </div>
            </div>
          </div>
          <div className="bg-ws-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-4 rounded-full bg-ws-secondary"></span>
                <h2 className="font-headline-md text-headline-md text-ws-on-surface">Resource Specifications &amp; Description</h2>
              </div>
              <span className="font-label-sm text-label-sm text-ws-outline uppercase tracking-wider">Sample specifications</span>
            </div>
            <p className="font-body-lg text-body-lg text-ws-on-surface-variant leading-relaxed">
              Designed for executive strategy syncs, hybrid cross-regional conferences, and high-impact stakeholder presentations. Acoustic dampened glass walling with motorized privacy blinds ensures confidential deliberations remain secure.
            </p>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-ws-outline uppercase tracking-wider mb-space-xs">Included Hardware &amp; Facilities</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-primary shadow-xs">
                    <Icon name="tv" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">85&quot; 4K Sony Bravia Commercial Display</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">AirPlay, Google Cast &amp; HDMI 2.1 tethered</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-secondary shadow-xs">
                    <Icon name="videocam" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">Cisco Webex Room Kit Pro</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Quad-camera speaker tracking, PTZ auto-framing</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-primary shadow-xs">
                    <Icon name="mic" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">Ceiling Beamforming Microphones</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Biamp Tesira Forte DSP with echo suppression</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-secondary shadow-xs">
                    <Icon name="draw" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">Dual Magnetic Whiteboards</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">8ft x 4ft porcelain enamel with magnetic accessories</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-primary shadow-xs">
                    <Icon name="wifi" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">Dedicated WiFi 6E &amp; PoE Ports</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Low-latency Gigabit pipeline (SSID: Reserva-Exec-4)</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-ws-surface-container-low hover:bg-ws-surface-container transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest flex items-center justify-center text-ws-secondary shadow-xs">
                    <Icon name="blinds" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate">Motorized Smart Blinds</span>
                    <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Full blackout or 5% solar filtration modes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScheduleDateTabs>
<div className="bg-ws-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="font-headline-md text-headline-md text-ws-on-surface">Existing Reservations &amp; Timeline</h2>
                <p className="font-body-sm text-body-sm text-ws-on-surface-variant">Track room commitments, current occupants, and open booking windows.</p>
              </div>
              
            </div>
            <div className="bg-ws-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-ws-on-surface font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ws-secondary"></span> 9-Hour Operational Day Coverage
                </span>
                <span className="text-ws-outline">62% Booked • 3h 30m Open</span>
              </div>
              <div className="w-full h-3 rounded-full bg-ws-surface-container flex overflow-hidden">
                <div className="h-full bg-ws-outline-variant hover:opacity-80 transition-opacity" style={{"width":"11.1%"}} title="Completed: 08:30 - 09:30"></div>
                <div className="h-full bg-transparent" style={{"width":"5.5%"}}></div>
                <div className="h-full bg-ws-primary hover:opacity-90 transition-opacity" style={{"width":"16.6%"}} title="In Progress: 10:00 - 11:30"></div>
                <div className="h-full bg-ws-secondary-container hover:opacity-80 transition-opacity" style={{"width":"27.7%"}} title="Available Window"></div>
                <div className="h-full bg-ws-primary-container hover:opacity-80 transition-opacity" style={{"width":"16.6%"}} title="Upcoming: 02:00 - 03:30"></div>
                <div className="h-full bg-ws-secondary hover:opacity-80 transition-opacity" style={{"width":"11.1%"}} title="Draft Booking: 03:30 - 04:30"></div>
                <div className="h-full bg-ws-secondary-container" style={{"width":"11.4%"}} title="Available Slot"></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-ws-outline pt-0.5">
                <span>08:00 AM</span>
                <span>10:00 AM</span>
                <span>12:00 PM</span>
                <span>02:00 PM</span>
                <span>04:00 PM</span>
                <span>06:00 PM</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-ws-surface-container-low/50 hover:bg-ws-surface-container-low transition-all gap-space-sm opacity-75">
                <div className="flex items-start sm:items-center gap-space-md">
                  <div className="flex flex-col items-center justify-center w-24 py-1 rounded bg-ws-surface-container text-ws-on-surface-variant font-tabular-time text-tabular-time">
                    <span className="font-semibold text-ws-on-surface">08:30 AM</span>
                    <span className="text-[11px]">09:30 AM</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-headline-sm text-ws-on-surface line-through decoration-outline">Daily Engineering Leadership Sync</span>
                      <span className="px-2 py-0.5 rounded-full bg-ws-surface-container text-ws-on-surface-variant font-label-sm text-label-sm">Completed</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-ws-on-surface-variant flex items-center gap-1.5 mt-0.5">
                      <Icon name="person" className="text-[15px] text-ws-outline" />
                      Hosted by Marcus Vance (Platform Core)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs self-end sm:self-center">
                  <span className="text-ws-outline text-body-sm font-tabular-time">60 min</span>
                  <Icon name="check_circle" className="text-[18px] text-ws-outline" />
                </div>
              </div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-ws-primary-container text-ws-on-primary shadow-sm gap-space-sm overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-ws-secondary-fixed"></div>
                <div className="flex items-start sm:items-center gap-space-md pl-space-xs">
                  <div className="flex flex-col items-center justify-center w-24 py-1 rounded bg-ws-surface-container-lowest/10 font-tabular-time text-tabular-time">
                    <span className="font-semibold text-ws-secondary-container">10:00 AM</span>
                    <span className="text-ws-surface-variant text-[11px]">11:30 AM</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-headline-sm font-semibold">Sprint Planning &amp; Q4 Architecture Review</span>
                      <span className="px-2 py-0.5 rounded-full bg-ws-secondary text-ws-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-ws-secondary-fixed animate-pulse"></span> In Progress
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-ws-surface-container flex items-center gap-1.5 mt-0.5">
                      <Icon name="badge" className="text-[15px] text-ws-secondary-fixed" />
                      Hosted by Alex Chen (You) • 12 participants checked in
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm self-end sm:self-center">
                  <PreviewAction title="Extend +15m" className="px-space-sm py-1 rounded-lg bg-ws-surface-container-lowest text-ws-primary hover:bg-ws-surface-variant font-label-md text-label-md transition-colors">
                    Extend +15m
                  </PreviewAction>
                  <PreviewAction title="End Early" className="px-space-sm py-1 rounded-lg bg-ws-surface-container-lowest/15 hover:bg-ws-surface-container-lowest/25 text-ws-on-primary font-label-md text-label-md transition-colors">
                    End Early
                  </PreviewAction>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-ws-surface-container-low hover:bg-ws-surface-container transition-all gap-space-sm">
                <div className="flex items-start sm:items-center gap-space-md">
                  <div className="flex flex-col items-center justify-center w-24 py-1 rounded bg-ws-surface-container-lowest text-ws-on-surface font-tabular-time text-tabular-time shadow-xs">
                    <span className="font-semibold text-ws-primary">02:00 PM</span>
                    <span className="text-ws-on-surface-variant text-[11px]">03:30 PM</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-headline-sm text-ws-on-surface">Product Design Crit &amp; Critique</span>
                      <span className="px-2 py-0.5 rounded-full bg-ws-surface-container-highest text-ws-on-surface-variant font-label-sm text-label-sm">Upcoming</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-ws-on-surface-variant flex items-center gap-1.5 mt-0.5">
                      <Icon name="person" className="text-[15px] text-ws-secondary" />
                      Hosted by Sarah Lin (Design System Lead)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md self-end sm:self-center">
                  <span className="font-tabular-time text-tabular-time text-ws-outline">Starts in 3h 10m</span>
                  <PreviewAction title="View booking details" className="w-8 h-8 rounded-lg bg-ws-surface-container-lowest hover:bg-ws-surface-container flex items-center justify-center text-ws-on-surface-variant transition-colors">
                    <Icon name="more_vert" className="text-[18px]" />
                  </PreviewAction>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-ws-secondary-container/25 hover:bg-ws-secondary-container/40 transition-all gap-space-sm group cursor-pointer">
                <div className="flex items-start sm:items-center gap-space-md">
                  <div className="flex flex-col items-center justify-center w-24 py-1 rounded bg-ws-surface-container-lowest text-ws-secondary font-tabular-time text-tabular-time shadow-xs">
                    <span className="font-semibold text-ws-secondary">04:30 PM</span>
                    <span className="text-ws-on-surface-variant text-[11px]">05:30 PM</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-headline-sm text-headline-sm text-ws-primary flex items-center gap-1.5">
                        <Icon name="add_circle" className="text-[18px] text-ws-secondary" /> Available Slot
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold">1h window ready to book</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-ws-on-surface-variant mt-0.5">
                      No scheduling conflicts detected. Fast-track instant reservation allowed.
                    </p>
                  </div>
                </div>
                <Link href="/reservations/new?resource=resource-1&amp;date=2026-10-24&amp;start=16:30&amp;end=17:30" className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-ws-primary text-ws-on-primary hover:bg-ws-primary-container font-label-md text-label-md shadow-sm transition-all self-end sm:self-center">
                  <span>Book Slot</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>
            </div>
          </div>
</ScheduleDateTabs>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-space-xl sticky top-20" id="quick-reserve">
          <div className="bg-ws-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-ws-primary text-ws-on-primary flex items-center justify-center">
                  <Icon name="bolt" className="text-[18px]" />
                </div>
                <h3 className="font-headline-md text-headline-md text-ws-on-surface">Quick Reservation</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-ws-surface-container text-ws-secondary font-mono text-[11px] font-semibold">DIRECT PASS</span>
            </div>
            <QuickReservation />
          </div>
          <div className="bg-ws-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-7 h-7 rounded-lg bg-ws-surface-container text-ws-on-surface-variant flex items-center justify-center">
                <Icon name="verified_user" className="text-[18px]" />
              </div>
              <h4 className="font-headline-sm text-headline-sm text-ws-on-surface">Policies &amp; Guidelines</h4>
            </div>
            <ul className="flex flex-col gap-space-sm text-body-sm font-body-sm text-ws-on-surface-variant">
              <li className="flex items-start gap-space-sm">
                <Icon name="hourglass_top" className="text-ws-secondary text-[18px] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ws-on-surface">Max booking window:</span> Up to 4 consecutive hours per individual or team per daily cycle.
                </div>
              </li>
              <li className="flex items-start gap-space-sm">
                <Icon name="cancel_schedule_send" className="text-ws-secondary text-[18px] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ws-on-surface">Auto-cancellation:</span> 10-minute check-in grace period. Unclaimed rooms are automatically recycled.
                </div>
              </li>
              <li className="flex items-start gap-space-sm">
                <Icon name="cleaning_services" className="text-ws-secondary text-[18px] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ws-on-surface">Cleaning policy:</span> Please erase whiteboards, discard beverages, and return executive chairs to base positions.
                </div>
              </li>
              <li className="flex items-start gap-space-sm">
                <Icon name="support_agent" className="text-ws-secondary text-[18px] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ws-on-surface">AV Support Hotline:</span> Dial extension 4099 from the room touchpanel for instant technical support.
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-ws-surface-container-low rounded-xl p-space-md flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-3 h-3 rounded-full bg-ws-secondary"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-ws-outline">Environmental telemetry</span>
                <span className="font-headline-sm text-headline-sm text-ws-on-surface">21.5°C • 480 ppm CO₂</span>
              </div>
            </div>
            <span className="font-tabular-time text-tabular-time text-ws-secondary font-medium">Optimal</span>
          </div>
        </div>
      </div>
    </div>
 );
}

