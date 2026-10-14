export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white border-y border-border-light relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-[11.5px] font-bold uppercase tracking-widest text-emerald-dark mb-3">Simpler by Design</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest leading-[1.15]">
            Everything you need.<br/>Nothing you don&apos;t.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl bg-ivory border border-border-light hover:border-border-strong hover:shadow-card transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs font-semibold tracking-wider text-emerald-dark bg-emerald-surface px-2.5 py-1 rounded-md">01</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-forest group-hover:scale-105 transition-transform">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest mb-3 tracking-tight">Find Your Space</h3>
              <p className="text-[15px] text-charcoal-muted leading-relaxed">
                Find rooms and equipment in seconds with search, category filters, capacity, and location details.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border-light flex items-center text-xs font-medium text-forest group-hover:text-emerald-dark transition-colors">
              <span>Instant search &amp; filters</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
          <div className="group p-8 rounded-2xl bg-ivory border border-border-light hover:border-border-strong hover:shadow-card transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs font-semibold tracking-wider text-emerald-dark bg-emerald-surface px-2.5 py-1 rounded-md">02</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-forest group-hover:scale-105 transition-transform">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest mb-3 tracking-tight">Book with Confidence</h3>
              <p className="text-[15px] text-charcoal-muted leading-relaxed">
                Check availability and reserve exactly what you need, with conflict checks that protect shared resources.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border-light flex items-center text-xs font-medium text-forest group-hover:text-emerald-dark transition-colors">
              <span>Automated conflict guard</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
          <div className="group p-8 rounded-2xl bg-ivory border border-border-light hover:border-border-strong hover:shadow-card transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs font-semibold tracking-wider text-emerald-dark bg-emerald-surface px-2.5 py-1 rounded-md">03</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-forest group-hover:scale-105 transition-transform">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest mb-3 tracking-tight">Stay Organized</h3>
              <p className="text-[15px] text-charcoal-muted leading-relaxed">
                See your upcoming reservations, review booking details, and release a slot when your plans change.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border-light flex items-center text-xs font-medium text-forest group-hover:text-emerald-dark transition-colors">
              <span>Booking history &amp; cancellation</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
