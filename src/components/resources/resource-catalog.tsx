import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PreviewAction } from "@/components/ui/preview-action";
import { ResourceExplorer } from "./resource-explorer";

export function ResourceCatalog() {
  return <ResourceExplorer items={[
  { ...{"id":"resource-1","name":"Executive Meeting Room","category":"meeting","capacity":16,"floor":"4","availableNow":true,"searchText":"Meeting Room Available Now location_on 4th Floor, East Wing group Cap: 16 Executive Meeting Room Primary high-priority strategic briefing room with telepresence tv 85\" 4K Display mic Dual Polycom Mic draw Whiteboard Today's Utilization Free next 3h View Details Book Now arrow_forward"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="meeting">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container overflow-hidden">
          <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="A sunlit luxury executive boardroom with a long white oak table, ergonomic forest green chairs, floor-to-ceiling panoramic glass windows overlooking city architecture, and integrated flush-mounted conferencing hardware." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYKJVtTLIbOwEnms7dRmJDiwZU7gqogQXHrdzrqTB6szoDRNBVbMPEsRhk_MX4SzLYA4laea8j4FdMo5fNJ9WsNdFZPk4QMJU5VRCXI3pkR44gDtVoWXG-abns9MGpde4IzmSoDpX70TQmCDtE7vdVbu-hmeOIVLBtqS4nkVS3vftZoptXSvIQjKyXLW65gjGBlnVekbNugi4U-uDyQcjYeW_cESxVFKPlY3qzcpe6Ol5NWxX3XqmP" width={640} height={360} unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-ws-primary/60 via-transparent to-transparent"></div>
          <div className="absolute top-space-md left-space-md flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest/90 backdrop-blur-md text-ws-on-surface font-semibold shadow-xs">Meeting Room</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-secondary animate-pulse"></span>
              Available Now
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-primary">
            <div className="flex items-center gap-1 font-label-sm text-label-sm opacity-90">
              <Icon name="location_on" className="text-[16px]" />
              <span>4th Floor, East Wing</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-primary/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Icon name="group" className="text-[16px]" />
              <span>Cap: 16</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">Executive Meeting Room</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Primary high-priority strategic briefing room with telepresence</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="tv" className="text-[14px]" /> 85&quot; 4K Display
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="mic" className="text-[14px]" /> Dual Polycom Mic
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="draw" className="text-[14px]" /> Whiteboard
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-ws-on-surface-variant font-label-sm text-label-sm">
              <span>Today&apos;s Utilization</span>
              <span className="font-tabular-time text-tabular-time text-ws-secondary font-semibold">Free next 3h</span>
            </div>
            <div className="w-full h-1.5 bg-ws-surface-container rounded-full overflow-hidden flex">
              <div className="bg-ws-secondary h-full" style={{"width":"35%"}}></div>
              <div className="bg-ws-surface-container h-full" style={{"width":"25%"}}></div>
              <div className="bg-ws-primary h-full" style={{"width":"40%"}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <Link href="/resources/executive-meeting-room-4a" className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </Link>
        <Link href="/reservations/new?resource=resource-1" className="flex-1 py-2 rounded-lg bg-ws-primary-container text-ws-on-primary hover:bg-ws-on-primary-fixed-variant font-label-md text-label-md transition-all shadow-xs text-center flex items-center justify-center gap-1">
          <span>Book Now</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) },
  { ...{"id":"resource-2","name":"Creative Studio","category":"workspace","capacity":8,"floor":"2","availableNow":true,"searchText":"Workspace & Media Available Now location_on 2nd Floor, Room 210 group Cap: 8 Creative Studio Soundproofed multimedia recording and high-fidelity video mastering desktop_windows Calibrated Monitors graphic_eq Audio Interface surround_sound Acoustic Paneling Today's Utilization Instant Access View Details Book Now arrow_forward"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="workspace">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container overflow-hidden">
          <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Modern audio-visual production suite and design lab with dark acoustic slatted wall panels, warm soft ambient task lighting, dual studio monitors, and professional mixing consoles." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5W9VI504XiBAzH6YJWjrTGxlUZ1XDNxy3RFsmnI24GbKiv1ndgK7SadvB9NK7_rZibQDnuuxStWCM2ZlnY3D7v-ktvvZDOJZBOPKZA6QLz-5SPOHn3rRPbtabZWwrxyyRb3-oCnW3qYsOdqIX5NuSBy_ymc87k4oVu4K7FP-6LQhyaxvXDHX-Pax8BZnSk1VtMYIkptAs_1PtTksqOrkjWNMmW2MhLdsIIjep54txrksAhnLKErL" width={640} height={360} unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-ws-primary/60 via-transparent to-transparent"></div>
          <div className="absolute top-space-md left-space-md flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest/90 backdrop-blur-md text-ws-on-surface font-semibold shadow-xs">Workspace &amp; Media</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-secondary"></span>
              Available Now
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-primary">
            <div className="flex items-center gap-1 font-label-sm text-label-sm opacity-90">
              <Icon name="location_on" className="text-[16px]" />
              <span>2nd Floor, Room 210</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-primary/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Icon name="group" className="text-[16px]" />
              <span>Cap: 8</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">Creative Studio</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Soundproofed multimedia recording and high-fidelity video mastering</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="desktop_windows" className="text-[14px]" /> Calibrated Monitors
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="graphic_eq" className="text-[14px]" /> Audio Interface
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="surround_sound" className="text-[14px]" /> Acoustic Paneling
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-ws-on-surface-variant font-label-sm text-label-sm">
              <span>Today&apos;s Utilization</span>
              <span className="font-tabular-time text-tabular-time text-ws-secondary font-semibold">Instant Access</span>
            </div>
            <div className="w-full h-1.5 bg-ws-surface-container rounded-full overflow-hidden flex">
              <div className="bg-ws-secondary h-full" style={{"width":"15%"}}></div>
              <div className="bg-ws-surface-container h-full" style={{"width":"60%"}}></div>
              <div className="bg-ws-primary h-full" style={{"width":"25%"}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <PreviewAction aria-label={"View details for Creative Studio"} title={"Creative Studio"} message={"Soundproofed multimedia recording and high-fidelity video mastering This resource uses sample data; availability and specifications are illustrative."} className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </PreviewAction>
        <Link href="/reservations/new?resource=resource-2" className="flex-1 py-2 rounded-lg bg-ws-primary-container text-ws-on-primary hover:bg-ws-on-primary-fixed-variant font-label-md text-label-md transition-all shadow-xs text-center flex items-center justify-center gap-1">
          <span>Book Now</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) },
  { ...{"id":"resource-3","name":"Conference Hall A","category":"event","capacity":60,"floor":"ground","availableNow":false,"searchText":"Event Spaces Reserved until 2:00 PM location_on Ground Floor Auditorium group Cap: 60 Conference Hall A Large-scale auditorium configured for all-hands meetings and tech launches volume_up Stage Audio videocam Streaming Rig nest_display Dual Laser Projection Today's Utilization Available 2:00 PM View Details Reserve Later schedule"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="event">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container overflow-hidden">
          <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Expansive modern lecture hall and conference theater with tiered curved seating, architectural warm linear ceiling downlights, presenter podium, and immense dual projector screens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtsUBgSMe2_FUFqFzkaStv7P0IY0bIXTa6Um7bM0Fo5eoE8C4QW22utZzmRVW2d0X6oaYgNeD471SmLPvRtyNRh--LA9WsokdBtKekRSHFpLcwGEHxRVg10pMAFFS2I-SfX99LrmSw1UO2P42e0q4C6hSEWxgIYwX--30yxi0dOsk8L0IrdzLxUXD0P0sZV6aO9QXBaU3QuR1tXBpPdBXaXkrXkKz29nddjkpIWPhw9gBA6sRMb84W" width={640} height={360} unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-ws-primary/60 via-transparent to-transparent"></div>
          <div className="absolute top-space-md left-space-md flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest/90 backdrop-blur-md text-ws-on-surface font-semibold shadow-xs">Event Spaces</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-error-container text-ws-on-error-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-error"></span>
              Reserved until 2:00 PM
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-primary">
            <div className="flex items-center gap-1 font-label-sm text-label-sm opacity-90">
              <Icon name="location_on" className="text-[16px]" />
              <span>Ground Floor Auditorium</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-primary/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Icon name="group" className="text-[16px]" />
              <span>Cap: 60</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">Conference Hall A</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Large-scale auditorium configured for all-hands meetings and tech launches</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="volume_up" className="text-[14px]" /> Stage Audio
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="videocam" className="text-[14px]" /> Streaming Rig
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="nest_display" className="text-[14px]" /> Dual Laser Projection
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-ws-on-surface-variant font-label-sm text-label-sm">
              <span>Today&apos;s Utilization</span>
              <span className="font-tabular-time text-tabular-time text-ws-outline font-semibold">Available 2:00 PM</span>
            </div>
            <div className="w-full h-1.5 bg-ws-surface-container rounded-full overflow-hidden flex">
              <div className="bg-ws-error h-full" style={{"width":"65%"}}></div>
              <div className="bg-ws-secondary h-full" style={{"width":"35%"}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <PreviewAction aria-label={"View details for Conference Hall A"} title={"Conference Hall A"} message={"Large-scale auditorium configured for all-hands meetings and tech launches This resource uses sample data; availability and specifications are illustrative."} className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </PreviewAction>
        <Link href="/reservations/new?resource=resource-3" className="flex-1 py-2 rounded-lg bg-ws-surface-container-high text-ws-on-surface hover:bg-ws-surface-container-highest font-label-md text-label-md transition-all text-center flex items-center justify-center gap-1">
          <span>Reserve Later</span>
          <Icon name="schedule" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) },
  { ...{"id":"resource-4","name":"Portable 4K Laser Projector","category":"equipment","capacity":0,"floor":"unknown","availableNow":true,"searchText":"videocam Asset ID: EP-4029 Equipment Available Now lock IT Desk Locker #4 scale 3.2 kg Portable 4K Laser Projector Epson Pro ultra-bright mobile presentation setup with lens shift high_quality 4K UHD light_mode 4000 Lumens wifi Wireless HDMI business_center Carry Case Checkout Policy Same-day return by 19:00 View Details Book Now arrow_forward"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="equipment">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container-low flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-ws-surface-container-lowest to-ws-surface-container opacity-80"></div>
          <div className="absolute w-36 h-36 rounded-full bg-ws-secondary-container/40 blur-xl"></div>
          <div className="relative flex flex-col items-center gap-2 text-ws-primary">
            <div className="w-16 h-16 rounded-2xl bg-ws-surface-container-lowest shadow-sm flex items-center justify-center text-ws-secondary group-hover:scale-110 transition-transform">
              <Icon name="videocam" className="text-[36px]" />
            </div>
            <span className="font-mono text-[11px] text-ws-outline uppercase tracking-wider font-semibold">Asset ID: EP-4029</span>
          </div>
          <div className="absolute top-space-md left-space-md">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest text-ws-on-surface font-semibold shadow-xs">Equipment</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-secondary"></span>
              Available Now
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-surface">
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-ws-on-surface-variant">
              <Icon name="lock" className="text-[16px]" />
              <span>IT Desk Locker #4</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-surface-container-lowest px-2 py-0.5 rounded-full shadow-xs">
              <Icon name="scale" className="text-[16px]" />
              <span>3.2 kg</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">Portable 4K Laser Projector</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Epson Pro ultra-bright mobile presentation setup with lens shift</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="high_quality" className="text-[14px]" /> 4K UHD
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="light_mode" className="text-[14px]" /> 4000 Lumens
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="wifi" className="text-[14px]" /> Wireless HDMI
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="business_center" className="text-[14px]" /> Carry Case
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-ws-on-surface-variant">Checkout Policy</span>
            <span className="font-label-sm text-label-sm font-semibold text-ws-primary">Same-day return by 19:00</span>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <PreviewAction aria-label={"View details for Portable 4K Laser Projector"} title={"Portable 4K Laser Projector"} message={"Epson Pro ultra-bright mobile presentation setup with lens shift This resource uses sample data; availability and specifications are illustrative."} className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </PreviewAction>
        <Link href="/reservations/new?resource=resource-4" className="flex-1 py-2 rounded-lg bg-ws-primary-container text-ws-on-primary hover:bg-ws-on-primary-fixed-variant font-label-md text-label-md transition-all shadow-xs text-center flex items-center justify-center gap-1">
          <span>Book Now</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) },
  { ...{"id":"resource-5","name":"MacBook Pro 16\" (M3 Max)","category":"equipment","capacity":0,"floor":"unknown","availableNow":true,"searchText":"laptop_mac Asset ID: LAB-MBP-16 Equipment Available Now shelves Device Lab Locker B memory 64GB / 1TB MacBook Pro 16\" (M3 Max) Heavy compile testing and GPU benchmark loaner workstation speed 16-core CPU terminal Clean Dev Env battery_charging_full 100W GaN Charger Battery Health 100% • Cycles: 18 View Details Book Now arrow_forward"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="equipment">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container-low flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-ws-surface-container-lowest to-ws-surface-container opacity-80"></div>
          <div className="absolute w-36 h-36 rounded-full bg-ws-secondary-container/40 blur-xl"></div>
          <div className="relative flex flex-col items-center gap-2 text-ws-primary">
            <div className="w-16 h-16 rounded-2xl bg-ws-surface-container-lowest shadow-sm flex items-center justify-center text-ws-secondary group-hover:scale-110 transition-transform">
              <Icon name="laptop_mac" className="text-[36px]" />
            </div>
            <span className="font-mono text-[11px] text-ws-outline uppercase tracking-wider font-semibold">Asset ID: LAB-MBP-16</span>
          </div>
          <div className="absolute top-space-md left-space-md">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest text-ws-on-surface font-semibold shadow-xs">Equipment</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-secondary"></span>
              Available Now
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-surface">
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-ws-on-surface-variant">
              <Icon name="shelves" className="text-[16px]" />
              <span>Device Lab Locker B</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-surface-container-lowest px-2 py-0.5 rounded-full shadow-xs">
              <Icon name="memory" className="text-[16px]" />
              <span>64GB / 1TB</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">MacBook Pro 16&quot; (M3 Max)</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Heavy compile testing and GPU benchmark loaner workstation</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="speed" className="text-[14px]" /> 16-core CPU
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="terminal" className="text-[14px]" /> Clean Dev Env
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="battery_charging_full" className="text-[14px]" /> 100W GaN Charger
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-ws-on-surface-variant">Battery Health</span>
            <span className="font-label-sm text-label-sm font-semibold text-ws-secondary">100% • Cycles: 18</span>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <PreviewAction aria-label={"View details for MacBook Pro 16\" (M3 Max)"} title={"MacBook Pro 16\" (M3 Max)"} message={"Heavy compile testing and GPU benchmark loaner workstation This resource uses sample data; availability and specifications are illustrative."} className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </PreviewAction>
        <Link href="/reservations/new?resource=resource-5" className="flex-1 py-2 rounded-lg bg-ws-primary-container text-ws-on-primary hover:bg-ws-on-primary-fixed-variant font-label-md text-label-md transition-all shadow-xs text-center flex items-center justify-center gap-1">
          <span>Book Now</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) },
  { ...{"id":"resource-6","name":"The Greenhouse","category":"workspace","capacity":10,"floor":"3","availableNow":true,"searchText":"Workspaces Available Now location_on 3rd Floor, Atrium group Cap: 10 The Greenhouse Biophilic design thinking hub with movable boards and natural sun exposure chair Modular Soft Seating view_carousel Moveable Glassboards wb_sunny Natural Daylight Today's Utilization Free next 5h View Details Book Now arrow_forward"}, content: (
    <div className="h-full resource-card group bg-ws-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" data-category="workspace">
      <div>
        <div className="relative h-44 w-full bg-ws-surface-container overflow-hidden">
          <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Modern open-air biophilic atrium workspace flooded with natural light, lush living green plant walls, light timber workbenches, and comfortable modular Scandinavian felt chairs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAteFIPG8K5U1uP_X7uGsTPb9bP4fvwrvDgG_C3H9zGP6iiVHDVhhF8eVQxoyF_SwOswXWPlVMi8J-TRUI1sh-flLrY77HtGkzKiLouKnFDAaqmEwj_PTLfBTwXnAgGCRqDy-vHvLAuzV67zW7URXoI3P1OsGyloYlVVFne32z7_yZGgHIpQckWJVlCIWRarCv_bgxlTRPb00dHsH4GdSzmK-r6Xia-zuzEBFfROWRmRobIHoyWQVHr" width={640} height={360} unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-ws-primary/60 via-transparent to-transparent"></div>
          <div className="absolute top-space-md left-space-md flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-ws-surface-container-lowest/90 backdrop-blur-md text-ws-on-surface font-semibold shadow-xs">Workspaces</span>
          </div>
          <div className="absolute top-space-md right-space-md">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ws-secondary-container text-ws-on-secondary-container font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-ws-secondary"></span>
              Available Now
            </span>
          </div>
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-ws-on-primary">
            <div className="flex items-center gap-1 font-label-sm text-label-sm opacity-90">
              <Icon name="location_on" className="text-[16px]" />
              <span>3rd Floor, Atrium</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-ws-primary/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Icon name="group" className="text-[16px]" />
              <span>Cap: 10</span>
            </div>
          </div>
        </div>
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-sm text-headline-sm text-ws-on-surface font-bold group-hover:text-ws-secondary transition-colors">The Greenhouse</h2>
            <span className="font-body-sm text-body-sm text-ws-on-surface-variant">Biophilic design thinking hub with movable boards and natural sun exposure</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="chair" className="text-[14px]" /> Modular Soft Seating
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="view_carousel" className="text-[14px]" /> Moveable Glassboards
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ws-surface-container-low text-ws-on-surface-variant font-label-sm text-label-sm">
              <Icon name="wb_sunny" className="text-[14px]" /> Natural Daylight
            </span>
          </div>
          <div className="bg-ws-surface-container-low p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-ws-on-surface-variant font-label-sm text-label-sm">
              <span>Today&apos;s Utilization</span>
              <span className="font-tabular-time text-tabular-time text-ws-secondary font-semibold">Free next 5h</span>
            </div>
            <div className="w-full h-1.5 bg-ws-surface-container rounded-full overflow-hidden flex">
              <div className="bg-ws-secondary h-full" style={{"width":"20%"}}></div>
              <div className="bg-ws-surface-container h-full" style={{"width":"80%"}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center gap-space-sm">
        <PreviewAction aria-label={"View details for The Greenhouse"} title={"The Greenhouse"} message={"Biophilic design thinking hub with movable boards and natural sun exposure This resource uses sample data; availability and specifications are illustrative."} className="flex-1 py-2 rounded-lg bg-ws-surface-container-low text-ws-on-surface hover:bg-ws-surface-container font-label-md text-label-md transition-colors text-center">
          View Details
        </PreviewAction>
        <Link href="/reservations/new?resource=resource-6" className="flex-1 py-2 rounded-lg bg-ws-primary-container text-ws-on-primary hover:bg-ws-on-primary-fixed-variant font-label-md text-label-md transition-all shadow-xs text-center flex items-center justify-center gap-1">
          <span>Book Now</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  ) }
  ]} />;
}

