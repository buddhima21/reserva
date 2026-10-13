import { Icon } from "@/components/ui/icon";
import { AvailabilityBoard, AvailableSlot } from "./availability-board";

export function AvailabilityPreview() {
 return <AvailabilityBoard rows={[
{ id: "resource-1", name: "Executive Boardroom 4A", category: "meeting", floor: "4", content: (
    <div className="flex items-stretch hover:bg-ws-surface-container-low/40 transition-colors group">
      <div className="w-[280px] flex-shrink-0 p-space-md flex items-center gap-space-sm bg-ws-surface-container-lowest">
        <div className="w-10 h-10 rounded-xl bg-ws-surface-container flex items-center justify-center text-ws-primary flex-shrink-0">
          <Icon name="videocam" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate font-semibold">Executive Boardroom 4A</span>
          </div>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-body-sm text-body-sm">
            <span className="inline-flex items-center gap-0.5 text-ws-secondary">
              <Icon name="group" className="text-[13px]" /> 16 seats
            </span>
            <span>•</span>
            <span className="truncate">Dual 85&quot; Displays</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-20 p-2 flex items-center">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-40">
          <div className="bg-ws-surface-container-lowest"></div>
          <div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div>
          <div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div>
          <div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div>
          <div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div>
          <div className="bg-ws-surface-container-low/30"></div>
        </div>
        <div className="absolute h-14 top-3 left-[0%] w-[5%] p-1">
          <AvailableSlot selection={{"id":"resource-1-08:00 AM - 08:30 AM","resourceId":"resource-1","resource":"Executive Boardroom 4A","time":"08:00 AM - 08:30 AM","duration":"30m"}} className="w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/50 cursor-pointer flex items-center justify-center transition-all group/cell">
            <Icon name="add" className="text-[14px] text-ws-secondary opacity-0 group-hover/cell:opacity-100" />
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[5%] w-[10%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-sm overflow-hidden">
            <div className="flex items-center justify-between text-ws-on-primary-container font-label-sm text-[10px]">
              <span className="truncate">08:30 - 09:30</span>
              <Icon name="lock" className="text-[12px]" />
            </div>
            <span className="font-label-md text-label-md truncate font-semibold">Marcus V. - Sync</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[15%] w-[5%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-1-09:30 AM - 10:00 AM","resourceId":"resource-1","resource":"Executive Boardroom 4A","time":"09:30 AM - 10:00 AM","duration":"30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/30 hover:bg-ws-secondary-container/70 cursor-pointer p-1.5 flex flex-col justify-center transition-all group/cell">
            <span className="font-label-sm text-[10px] text-ws-secondary font-bold tracking-tight truncate">Free 30m</span>
            <span className="font-label-sm text-[9px] text-ws-on-surface-variant truncate opacity-0 group-hover/cell:opacity-100">+ Book</span>
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[20%] w-[15%] p-1 z-20">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-lg relative overflow-hidden ring-2 ring-amber-400">
            <div className="absolute top-1 right-1.5 flex items-center gap-1 bg-amber-500 text-ws-primary px-1.5 py-0.2 rounded-full font-label-sm text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-ws-primary animate-pulse"></span>
              <span>ACTIVE</span>
            </div>
            <span className="font-label-sm text-[10px] text-ws-on-primary-container truncate">10:00 - 11:30 AM</span>
            <span className="font-label-md text-label-md truncate font-bold text-white">Alex C. - Sprint Plan</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[35%] w-[25%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-1-11:30 AM - 02:00 PM","resourceId":"resource-1","resource":"Executive Boardroom 4A","time":"11:30 AM - 02:00 PM","duration":"2h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <div className="flex items-center gap-space-xs text-ws-secondary font-label-md text-label-md font-semibold">
              <Icon name="event_available" className="text-[16px]" />
              <span className="truncate">Available • Click to Book (2.5h)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-ws-surface-container-lowest text-ws-secondary font-label-sm text-label-sm opacity-0 group-hover/free:opacity-100 shadow-xs">Select Slot</span>
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[60%] w-[15%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-sm overflow-hidden">
            <span className="font-label-sm text-[10px] text-ws-on-primary-container truncate">02:00 - 03:30 PM</span>
            <span className="font-label-md text-label-md truncate font-semibold">Sarah L. - Design Crit</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[75%] w-[25%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-1-03:30 PM - 06:00 PM","resourceId":"resource-1","resource":"Executive Boardroom 4A","time":"03:30 PM - 06:00 PM","duration":"2h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <div className="flex items-center gap-space-xs text-ws-secondary font-label-md text-label-md font-medium">
              <span className="truncate">Available • 2h 30m window</span>
            </div>
            <Icon name="touch_app" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
      </div>
    </div>
) },
{ id: "resource-2", name: "Creative Studio Rm 210", category: "workspace", floor: "2", content: (
    <div className="flex items-stretch hover:bg-ws-surface-container-low/40 transition-colors group">
      <div className="w-[280px] flex-shrink-0 p-space-md flex items-center gap-space-sm bg-ws-surface-container-lowest">
        <div className="w-10 h-10 rounded-xl bg-ws-surface-container flex items-center justify-center text-ws-secondary flex-shrink-0">
          <Icon name="palette" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate font-semibold block">Creative Studio Rm 210</span>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-body-sm text-body-sm">
            <span className="inline-flex items-center gap-0.5 text-ws-secondary">
              <Icon name="group" className="text-[13px]" /> 8 seats
            </span>
            <span>•</span>
            <span className="truncate">Acoustic Panels • 4K Rig</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-20 p-2 flex items-center">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-40">
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
        </div>
        <div className="absolute h-14 top-3 left-[0%] w-[50%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-2-09:00 AM - 10:30 AM","resourceId":"resource-2","resource":"Creative Studio Rm 210","time":"09:00 AM - 10:30 AM","duration":"1h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/40 cursor-pointer p-3 flex items-center justify-between transition-all">
            <div className="flex items-center gap-space-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-ws-secondary"></span>
              <div>
                <span className="font-label-md text-label-md text-ws-primary font-bold block">Available • 5h Window</span>
                <span className="font-label-sm text-[11px] text-ws-secondary font-semibold">Suggested: 09:00 AM - 10:30 AM</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs">Select</span>
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[50%] w-[15%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-sm overflow-hidden">
            <span className="font-label-sm text-[10px] text-ws-on-primary-container truncate">01:00 - 02:30 PM</span>
            <span className="font-label-md text-label-md truncate font-semibold">Video Production</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[65%] w-[35%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-2-02:30 PM - 06:00 PM","resourceId":"resource-2","resource":"Creative Studio Rm 210","time":"02:30 PM - 06:00 PM","duration":"3h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <span className="font-label-md text-label-md text-ws-secondary font-medium">Available (3h 30m)</span>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
      </div>
    </div>
) },
{ id: "resource-3", name: "Conference Hall A", category: "event", floor: "ground", content: (
    <div className="flex items-stretch hover:bg-ws-surface-container-low/40 transition-colors group">
      <div className="w-[280px] flex-shrink-0 p-space-md flex items-center gap-space-sm bg-ws-surface-container-lowest">
        <div className="w-10 h-10 rounded-xl bg-ws-surface-container flex items-center justify-center text-ws-primary flex-shrink-0">
          <Icon name="podium" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate font-semibold block">Conference Hall A</span>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-body-sm text-body-sm">
            <span className="inline-flex items-center gap-0.5 text-ws-secondary">
              <Icon name="groups" className="text-[13px]" /> 60 seats
            </span>
            <span>•</span>
            <span className="truncate">Auditorium Setup</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-20 p-2 flex items-center">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-40">
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
        </div>
        <div className="absolute h-14 top-3 left-[0%] w-[30%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-3-08:00 AM - 11:00 AM","resourceId":"resource-3","resource":"Conference Hall A","time":"08:00 AM - 11:00 AM","duration":"3h"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <span className="font-label-md text-label-md text-ws-secondary font-medium">Available (3h window)</span>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[30%] w-[30%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2.5 flex flex-col justify-center shadow-sm overflow-hidden">
            <div className="flex items-center justify-between text-ws-on-primary-container font-label-sm text-[10px]">
              <span>11:00 AM - 02:00 PM</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[9px] uppercase font-bold">Company Wide</span>
            </div>
            <span className="font-label-md text-label-md truncate font-bold text-white">All-Hands Tech Prep &amp; Broadcast</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[60%] w-[40%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-3-02:00 PM - 06:00 PM","resourceId":"resource-3","resource":"Conference Hall A","time":"02:00 PM - 06:00 PM","duration":"4h"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <span className="font-label-md text-label-md text-ws-secondary font-medium">Available (4h window)</span>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
      </div>
    </div>
) },
{ id: "resource-4", name: "Portable 4K Projector #1", category: "equipment", floor: "unknown", content: (
    <div className="flex items-stretch hover:bg-ws-surface-container-low/40 transition-colors group">
      <div className="w-[280px] flex-shrink-0 p-space-md flex items-center gap-space-sm bg-ws-surface-container-lowest">
        <div className="w-10 h-10 rounded-xl bg-ws-surface-container flex items-center justify-center text-ws-primary flex-shrink-0">
          <Icon name="videocam_off" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate font-semibold">Portable 4K Projector #1</span>
          </div>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-body-sm text-body-sm">
            <span className="text-ws-secondary font-medium">Hardware</span>
            <span>•</span>
            <span className="truncate">IT Lab Asset #802</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-20 p-2 flex items-center">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-40">
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
        </div>
        <div className="absolute h-14 top-3 left-[0%] w-[70%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-4-08:00 AM - 03:00 PM","resourceId":"resource-4","resource":"Portable 4K Projector #1","time":"08:00 AM - 03:00 PM","duration":"7h"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <span className="font-label-md text-label-md text-ws-secondary font-medium">Available (7h block ready in IT Lab)</span>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[70%] w-[15%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-sm overflow-hidden">
            <span className="font-label-sm text-[10px] text-ws-on-primary-container truncate">03:00 - 04:30 PM</span>
            <span className="font-label-md text-label-md truncate font-semibold">Hardware Demo</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[85%] w-[15%] p-1 z-10">
          <AvailableSlot selection={{"id":"resource-4-04:30 PM - 06:00 PM","resourceId":"resource-4","resource":"Portable 4K Projector #1","time":"04:30 PM - 06:00 PM","duration":"1h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <span className="font-label-md text-label-md text-ws-secondary font-medium">Available</span>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
      </div>
    </div>
) },
{ id: "focus-pod", name: "Focus Pod B3", category: "workspace", floor: "3", content: (
    <div className="flex items-stretch hover:bg-ws-surface-container-low/40 transition-colors group">
      <div className="w-[280px] flex-shrink-0 p-space-md flex items-center gap-space-sm bg-ws-surface-container-lowest">
        <div className="w-10 h-10 rounded-xl bg-ws-surface-container flex items-center justify-center text-ws-secondary flex-shrink-0">
          <Icon name="door_front" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-headline-sm text-headline-sm text-ws-on-surface truncate font-semibold block">Focus Pod B3</span>
          <div className="flex items-center gap-space-xs text-ws-on-surface-variant font-body-sm text-body-sm">
            <span className="inline-flex items-center gap-0.5 text-ws-secondary">
              <Icon name="person" className="text-[13px]" /> 1 person
            </span>
            <span>•</span>
            <span className="truncate">Sound-Isolated</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-20 p-2 flex items-center">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-40">
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
          <div className="bg-ws-surface-container-lowest"></div><div className="bg-ws-surface-container-low/30"></div>
        </div>
        <div className="absolute h-14 top-3 left-[0%] w-[85%] p-1 z-10">
          <AvailableSlot selection={{"id":"focus-pod-08:00 AM - 04:30 PM","resourceId":"focus-pod","resource":"Focus Pod B3","time":"08:00 AM - 04:30 PM","duration":"8h 30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer p-2 flex items-center justify-between transition-all group/free">
            <div className="flex items-center gap-space-xs text-ws-secondary font-label-md text-label-md font-medium">
              <Icon name="headphones" className="text-[16px]" />
              <span>Available uninterrupted for single deep-work focus</span>
            </div>
            <Icon name="add_circle" className="text-ws-secondary opacity-0 group-hover/free:opacity-100 text-[18px]" />
          </AvailableSlot>
        </div>
        <div className="absolute h-14 top-3 left-[85%] w-[10%] p-1 z-10">
          <div className="w-full h-full rounded-lg bg-ws-primary-container text-ws-on-primary p-2 flex flex-col justify-center shadow-sm overflow-hidden">
            <span className="font-label-sm text-[10px] text-ws-on-primary-container truncate">04:30 - 05:30 PM</span>
            <span className="font-label-md text-label-md truncate font-semibold">Client Call</span>
          </div>
        </div>
        <div className="absolute h-14 top-3 left-[95%] w-[5%] p-1 z-10">
          <AvailableSlot selection={{"id":"focus-pod-05:30 PM - 06:00 PM","resourceId":"focus-pod","resource":"Focus Pod B3","time":"05:30 PM - 06:00 PM","duration":"30m"}} className="slot-select-card w-full h-full rounded-lg bg-ws-secondary-container/20 hover:bg-ws-secondary-container/60 cursor-pointer flex items-center justify-center transition-all group/free">
            <Icon name="add" className="text-[14px] text-ws-secondary opacity-0 group-hover/free:opacity-100" />
          </AvailableSlot>
        </div>
      </div>
    </div>
) }
 ]} />;
}
