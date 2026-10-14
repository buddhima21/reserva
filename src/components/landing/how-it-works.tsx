export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[11.5px] font-bold uppercase tracking-widest text-emerald-dark mb-2.5">Workflow</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-forest">Effortless coordination in 3 steps</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-24 right-24 h-[1px] bg-border-strong -translate-y-8 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="bg-white p-8 rounded-2xl border border-border-light text-center shadow-subtle hover:border-border-strong transition-all">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-surface text-forest flex items-center justify-center font-bold text-sm mb-6 border border-emerald-subtle/30 shadow-xs">
                01
              </div>
              <h3 className="text-lg font-bold text-forest mb-2">Discover</h3>
              <p className="text-sm text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                Find the resource that fits your needs by filtering by capacity, location, and equipment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border-light text-center shadow-subtle hover:border-border-strong transition-all">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-surface text-forest flex items-center justify-center font-bold text-sm mb-6 border border-emerald-subtle/30 shadow-xs">
                02
              </div>
              <h3 className="text-lg font-bold text-forest mb-2">Reserve</h3>
              <p className="text-sm text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                    Choose a date and time, check availability, and confirm your reservation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border-light text-center shadow-subtle hover:border-border-strong transition-all">
              <div className="w-14 h-14 mx-auto rounded-full bg-forest text-ivory flex items-center justify-center font-bold text-sm mb-6 shadow-xs">
                03
              </div>
              <h3 className="text-lg font-bold text-forest mb-2">Done</h3>
              <p className="text-sm text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                    Find your confirmed booking in Reservations, with its details and cancellation controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
