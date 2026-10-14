import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { listResources } from "@/services/resources";
import { AdminHeading } from "@/components/admin/admin-heading";
import { DeleteResource, ResourceStatusControl } from "@/components/admin/admin-actions";
import { WorkspaceLoading } from "@/components/ui/workspace-feedback";
import { resourceCategories, categoryLabels } from "@/types/resource";
import { adminSearchParams } from "@/lib/admin";

export const metadata: Metadata = { title: "Admin Resources" };

export default function AdminResourcesPage({ searchParams }: PageProps<"/admin/resources">) {
  return <><AdminHeading title="Resource management" description="Add and edit inventory, control booking availability, and remove resources without reservation history." action /><Suspense fallback={<WorkspaceLoading message="Loading inventory…" />}><Inventory searchParams={searchParams} /></Suspense></>;
}

async function Inventory({ searchParams }: Pick<PageProps<"/admin/resources">, "searchParams">) {
  await requireAdmin();
  const query = adminSearchParams(await searchParams, ["q", "status", "category", "page"]);
  const data = await listResources(query);
  function pageHref(page: number) { const next = new URLSearchParams(query); next.set("page", String(page)); return `/admin/resources?${next}`; }
  return <div>
    <form action="/admin/resources" className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-ws-outline-variant/30 bg-white p-4"><label className="min-w-48 flex-1 text-xs font-medium text-ws-on-surface-variant">Search<input name="q" defaultValue={query.get("q") ?? ""} maxLength={120} placeholder="Resource name or location" className="mt-2 w-full rounded-lg bg-ws-surface-container-low px-3 py-2.5 text-sm" /></label><label className="text-xs font-medium text-ws-on-surface-variant">Category<select name="category" defaultValue={query.get("category") ?? "all"} className="mt-2 block rounded-lg bg-ws-surface-container-low px-3 py-2.5 text-sm"><option value="all">All categories</option>{resourceCategories.map(category => <option key={category} value={category}>{categoryLabels[category]}</option>)}</select></label><label className="text-xs font-medium text-ws-on-surface-variant">Availability<select name="status" defaultValue={query.get("status") ?? "all"} className="mt-2 block rounded-lg bg-ws-surface-container-low px-3 py-2.5 text-sm"><option value="all">All resources</option><option value="ACTIVE">Available for booking</option><option value="INACTIVE">Unavailable</option><option value="MAINTENANCE">Maintenance</option></select></label><button type="submit" className="rounded-lg bg-ws-primary px-4 py-2.5 text-sm font-medium text-white">Apply filters</button><Link href="/admin/resources" className="px-2 py-2.5 text-sm text-ws-secondary">Reset</Link></form>
    <div className="overflow-x-auto rounded-2xl border border-ws-outline-variant/30 bg-white shadow-sm"><table className="w-full text-left text-sm"><caption className="border-b border-ws-outline-variant/25 p-5 text-left font-semibold text-ws-primary">{data.total} resources · Availability for booking does not guarantee a free time slot</caption><thead className="bg-ws-surface-container-low text-xs text-ws-on-surface-variant"><tr>{["Resource", "Category / capacity", "Availability", "Actions"].map(label => <th key={label} scope="col" className="px-5 py-3 font-semibold">{label}</th>)}</tr></thead><tbody className="divide-y divide-ws-outline-variant/25">{data.items.map(row => <tr key={row.id}><td className="min-w-52 px-5 py-5"><Link href={`/resources/${row.id}`} className="font-semibold text-ws-primary hover:underline">{row.name}</Link><p className="mt-1 text-xs text-ws-on-surface-variant">{row.location}</p></td><td className="px-5 py-5"><p>{categoryLabels[row.category]}</p><p className="mt-1 text-xs text-ws-on-surface-variant">{row.capacity ? `${row.capacity} people` : "Equipment / capacity not set"}</p></td><td className="px-5 py-5"><ResourceStatusControl resource={row} /></td><td className="px-5 py-5"><div className="flex gap-2"><Link href={`/admin/resources/${row.id}/edit`} className="rounded-lg bg-ws-surface-container-low px-3 py-2 text-xs font-medium text-ws-primary">Edit</Link><DeleteResource id={row.id} name={row.name} /></div></td></tr>)}</tbody></table>{!data.items.length && <div className="p-10 text-center"><p className="text-sm text-ws-on-surface-variant">No resources match this view.</p><Link href="/admin/resources/new" className="mt-4 inline-block text-sm font-medium text-ws-secondary">Add a resource</Link></div>}</div>
    <nav aria-label="Admin resource pagination" className="mt-5 flex items-center justify-between text-sm"><span className="text-ws-on-surface-variant">Page {data.page} · {data.total} resources</span><div className="flex gap-4">{data.page > 1 && <Link href={pageHref(data.page - 1)} className="text-ws-secondary">Previous</Link>}{data.page * data.pageSize < data.total && <Link href={pageHref(data.page + 1)} className="text-ws-secondary">Next</Link>}</div></nav>
  </div>;
}
