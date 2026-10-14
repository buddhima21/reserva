import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function AdminHeading({ title, description, action }: { title: string; description: string; action?: boolean }) {
  return <div className="dashboard-heading mb-8 flex flex-wrap items-end justify-between gap-4">
    <div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ws-secondary"><Icon name="verified_user" />RESERVA Administration</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ws-primary sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-ws-on-surface-variant">{description}</p></div>
    {action && <Link href="/admin/resources/new" className="dashboard-primary-action inline-flex items-center gap-2 rounded-xl bg-ws-primary px-5 py-3 text-sm font-semibold text-white"><Icon name="add" />Add Resource</Link>}
  </div>;
}
