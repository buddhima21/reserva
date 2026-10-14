import Link from "next/link";

export default function AdminNotFound() {
  return <section className="rounded-2xl bg-white p-8 text-center"><h1 className="text-2xl font-semibold text-ws-primary">Record not found</h1><p className="mt-3 text-sm text-ws-on-surface-variant">This resource or reservation is no longer available.</p><Link href="/admin" className="mt-5 inline-block text-sm font-medium text-ws-secondary">Return to admin overview</Link></section>;
}
