import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-surface/70 border border-emerald-subtle/30 text-forest text-[11.5px] font-semibold tracking-widest uppercase mb-8 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-subtle animate-pulse"></span>
          <span>The Smarter Way to Reserve</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-forest leading-[1.08] max-w-4xl mx-auto mb-7">
          Your space. Your time.<br/>
          <span className="text-emerald-subtle font-normal font-serif italic tracking-normal">Perfectly aligned.</span>
        </h1>
        <p className="text-lg sm:text-xl text-charcoal-muted font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          One beautifully simple place to manage spaces, equipment, and reservations. Less coordination. More productivity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-ivory text-[15px] font-medium tracking-tight shadow-md hover:shadow-lg transition-all duration-200 group">
            <span>Start Reserving</span>
            <svg aria-hidden="true" className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-ivory text-charcoal text-[15px] font-medium border border-border-strong hover:border-charcoal/30 shadow-xs transition-all duration-150">
            Explore Features
          </a>
        </div>
        <p className="text-[13px] text-charcoal-light tracking-wide font-medium">
          Built for teams that value their time.
        </p>
      </div>
    </section>
  );
}
