import Link from "next/link";

export function LandingCta() {
  return (
    <section id="cta" className="py-24 md:py-32 bg-forest text-ivory relative overflow-hidden">
      <div aria-hidden="true" className="cta-aura" />
      <div aria-hidden="true" className="cta-rings"><span /><span /></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1F4D41_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>
      <div data-reveal className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-light text-emerald-surface text-xs font-medium mb-8 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-subtle"></span>
          Zero Hassle Onboarding
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory leading-[1.1] mb-6">
          Make room for what <span className="text-emerald-subtle font-serif italic font-normal">matters.</span>
        </h2>
        <p className="text-lg sm:text-xl text-ivory/80 max-w-xl mx-auto font-normal leading-relaxed mb-10">
          Take the complexity out of managing shared resources.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-ivory text-forest hover:bg-white text-[15px] font-semibold tracking-tight shadow-md hover:shadow-xl transition-all duration-200 group">
            <span>Get Started</span>
            <svg aria-hidden="true" className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-ivory/90 hover:text-ivory hover:bg-forest-light/60 text-[15px] font-medium border border-white/15 transition-all">
            View Demo Flow
          </a>
        </div>
      </div>
    </section>
  );
}
