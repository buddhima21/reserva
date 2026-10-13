import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function AuthShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-ivory text-charcoal lg:grid lg:grid-cols-[1fr_1.05fr]">
    <section className="relative hidden overflow-hidden bg-forest p-12 text-ivory lg:flex lg:flex-col xl:p-16">
      <div aria-hidden="true" className="absolute -bottom-52 -left-36 size-[650px] rounded-full border border-white/10" /><div aria-hidden="true" className="absolute -bottom-24 -left-8 size-[400px] rounded-full border border-white/10" />
      <Brand light />
      <div className="relative my-auto max-w-lg py-16"><span className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-subtle/30 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-emerald-surface"><span className="size-1.5 rounded-full bg-emerald-subtle" />A little less coordination.</span><h2 className="text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">Make space for<br /><span className="text-emerald-subtle">your best work.</span></h2><p className="mt-6 max-w-sm text-base leading-7 text-ivory/70">One thoughtful workspace for your rooms, equipment, and reservations.</p>
        <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-emerald-subtle/15 text-emerald-subtle"><Icon name="calendar_month" className="text-xl" /></span><div><p className="text-sm font-medium">Everything in its right place.</p><p className="mt-1 text-xs text-ivory/60">Find a resource. Choose a time. Keep things moving.</p></div></div></div>
      </div><p className="relative text-xs text-ivory/50">RESERVA · Designed for a more considered workday.</p>
    </section>
    <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16"><div className="flex items-center justify-between"><span className="lg:hidden"><Brand /></span><Link href="/" className="ml-auto inline-flex items-center gap-2 text-sm text-charcoal-muted hover:text-forest"><Icon name="arrow_back" />Back to home</Link></div><div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12">{children}</div><p className="text-center text-xs text-charcoal-light">A calmer way to manage shared resources.</p></section>
  </main>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="RESERVA home" className={`inline-flex items-center gap-3 font-bold tracking-wider ${light ? "text-ivory" : "text-forest"}`}><span aria-hidden="true" className="grid size-9 grid-cols-2 gap-1 rounded-xl bg-emerald-subtle/15 p-2"><span className="rounded-sm bg-current" /><span className="rounded-sm bg-emerald-subtle" /><span className="rounded-sm bg-emerald-subtle" /><span className="rounded-sm bg-current" /></span>RESERVA</Link>;
}
