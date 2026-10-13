import Link from "next/link";

export default function ResourceNotFound() {
  return <section className="rounded-xl bg-white p-10 text-center"><h1 className="text-2xl font-semibold text-ws-primary">Resource not found</h1><p className="mt-3 text-sm text-ws-on-surface-variant">This resource does not exist or the link is invalid.</p><Link href="/resources" className="mt-5 inline-block rounded-lg bg-ws-primary px-5 py-2.5 text-sm text-white">Back to resources</Link></section>;
}
