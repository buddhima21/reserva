export function ProductPreview() {
  return (
    <section id="signature-product" className="py-12 md:py-20 relative px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="mb-4 text-center text-xs text-charcoal-muted">Illustrative product preview · Sample data</p>
        <div className="overflow-x-auto rounded-2xl" role="img" aria-label="Product concept: a resource schedule with room availability and a selected reservation slot.">
          <div inert className="min-w-[760px]">
            <div className="rounded-2xl border border-border-strong bg-white shadow-browser overflow-hidden transition-all">
              <div className="px-5 py-3.5 bg-[#F2F4F0] border-b border-border-light flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E5E7EB] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#E5E7EB] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#E5E7EB] inline-block"></span>
                  <div className="ml-4 flex items-center gap-2 text-xs text-charcoal-light font-mono bg-white/80 px-3 py-1 rounded-md border border-border-light">
                    <svg aria-hidden="true" className="w-3 h-3 text-emerald-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span>app.reserva.workspace/availability</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-surface text-forest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-subtle"></span>
                    Live Sync Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 bg-ivory min-h-[580px]">
                <div className="hidden md:flex md:col-span-3 border-r border-border-light bg-white flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2.5 mb-7 px-1">
                      <div className="w-6 h-6 rounded bg-forest flex items-center justify-center text-emerald-surface">
                        <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
                          <rect x="9" y="2" width="5" height="5" rx="1" fill="#45B592"/>
                          <rect x="2" y="9" width="5" height="5" rx="1" fill="#45B592"/>
                          <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="font-bold text-xs tracking-wider text-forest">RESERVA</span>
                      <span className="text-[10px] text-charcoal-light font-mono ml-auto">v2.4</span>
                    </div>
                    <div className="space-y-1">
                      <div className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-charcoal-muted hover:bg-ivory flex items-center gap-2.5 cursor-default">
                        <svg aria-hidden="true" className="w-4 h-4 text-charcoal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        Overview
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-charcoal-muted hover:bg-ivory flex items-center gap-2.5 cursor-default">
                        <svg aria-hidden="true" className="w-4 h-4 text-charcoal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        Resource Catalog
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-forest bg-emerald-surface flex items-center gap-2.5 cursor-default border border-emerald-subtle/20">
                        <svg aria-hidden="true" className="w-4 h-4 text-emerald-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Live Availability
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-subtle"></span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-charcoal-muted hover:bg-ivory flex items-center gap-2.5 cursor-default">
                        <svg aria-hidden="true" className="w-4 h-4 text-charcoal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        Reservations
                        <span className="ml-auto text-[10px] bg-charcoal/5 px-1.5 py-0.5 rounded text-charcoal-muted">4</span>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border-light">
                      <p className="text-[10px] font-bold text-charcoal-light uppercase tracking-wider mb-2.5 px-2">Pinned Spaces</p>
                      <div className="space-y-1.5 text-xs text-charcoal-muted">
                        <div className="px-2 py-1 rounded hover:bg-ivory flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-subtle"></span>
                            Executive 4A
                          </span>
                          <span className="text-[10px] text-charcoal-light">16p</span>
                        </div>
                        <div className="px-2 py-1 rounded hover:bg-ivory flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Studio Rm 210
                          </span>
                          <span className="text-[10px] text-charcoal-light">8p</span>
                        </div>
                        <div className="px-2 py-1 rounded hover:bg-ivory flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-subtle"></span>
                            Conference Hall A
                          </span>
                          <span className="text-[10px] text-charcoal-light">60p</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border-light flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center text-xs font-medium">AC</div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-forest leading-tight">Alex Chen</p>
                      <p className="text-[10px] text-charcoal-light">Design Engineering</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-light">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-charcoal-light mb-1">
                          <span>Main HQ</span>
                          <span>/</span>
                          <span className="text-forest font-medium">Floor 4 East Wing</span>
                        </div>
                        <h3 className="text-xl font-bold text-forest">Real-time Schedule Matrix</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex rounded-lg border border-border-strong bg-white p-0.5 text-xs">
                          <button className="px-3 py-1 font-medium bg-forest text-white rounded-md shadow-xs">Today, Oct 24</button>
                          <button className="px-3 py-1 font-medium text-charcoal-muted hover:text-forest">Oct 25</button>
                          <button className="px-3 py-1 font-medium text-charcoal-muted hover:text-forest">Oct 26</button>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-emerald-surface hover:bg-emerald-surface/80 text-forest text-xs font-semibold border border-emerald-subtle/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-subtle"></span>
                          Instant Lock
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="bg-white rounded-xl p-4 border border-border-light shadow-subtle hover:border-border-strong transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] flex items-center justify-center text-forest">
                              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-forest">Executive Boardroom 4A</h4>
                              <p className="text-xs text-charcoal-light">16 seats • Dual 85&quot; Displays • Cisco Webex</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-surface text-forest border border-emerald-subtle/20">
                            Available now
                          </span>
                        </div>
                        <div className="grid grid-cols-6 gap-1.5 text-[11px]">
                          <div className="h-9 rounded-md bg-charcoal/5 border border-border-light flex items-center justify-center text-charcoal-light">09:00 AM</div>
                          <div className="h-9 rounded-md bg-emerald-surface/90 border border-emerald-subtle/40 flex items-center justify-center text-forest font-medium">
                            10:00 AM Free
                          </div>
                          <div className="h-9 rounded-md bg-forest text-ivory font-medium flex items-center justify-center px-1 text-center truncate">
                            11:00 Sprint
                          </div>
                          <div className="h-9 rounded-md bg-emerald-surface/90 border border-emerald-subtle/40 flex items-center justify-center text-forest font-medium">
                            12:00 PM Free
                          </div>
                          <div className="h-9 rounded-md bg-charcoal/5 border border-border-light flex items-center justify-center text-charcoal-light">01:00 PM</div>
                          <div className="h-9 rounded-md bg-emerald-surface/90 border border-emerald-subtle/40 flex items-center justify-center text-forest font-medium">
                            02:00 PM Free
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border-2 border-emerald-subtle/60 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-subtle text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg tracking-wider">
                          TARGET SLOT SELECTED
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-surface flex items-center justify-center text-forest">
                              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-forest">Creative Studio Rm 210</h4>
                              <p className="text-xs text-charcoal-light">8 seats • Acoustic Panels • 4K Cameras</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-dark">
                            Oct 24 • 09:30 AM – 11:00 AM
                          </span>
                        </div>
                        <div className="bg-[#F3FAF5] rounded-lg p-3 border border-emerald-subtle/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center text-[10px]">
                              ✓
                            </div>
                            <div className="text-xs">
                              <span className="font-medium text-forest">Zero Conflict Verified</span>
                              <span className="text-charcoal-light ml-1.5">• Ready for 1-click booking confirmation</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-charcoal-muted">1.5 hrs</span>
                            <button className="px-3 py-1 rounded bg-forest text-ivory text-xs font-medium hover:bg-forest-light transition-colors">
                              Lock Slot
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-border-light shadow-subtle">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] flex items-center justify-center text-forest">
                              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-forest">Portable 4K Laser Projector #1</h4>
                              <p className="text-xs text-charcoal-light">Hardware • IT Desk Locker #4 • 4000 Lumens</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-surface text-forest border border-emerald-subtle/20">
                            Available All Day
                          </span>
                        </div>
                        <div className="h-7 rounded-md bg-emerald-surface/60 border border-emerald-subtle/30 flex items-center px-4 text-xs text-forest justify-between font-medium">
                          <span>Uninterrupted Open Window (08:00 AM – 06:00 PM)</span>
                          <span className="text-[11px] text-emerald-dark font-sans underline cursor-default">Quick Reserve →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border-light flex items-center justify-between text-xs text-charcoal-muted">
                    <div className="flex items-center gap-2">
                      <svg aria-hidden="true" className="w-4 h-4 text-emerald-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                      <span>Automated 10-minute check-in release policy active</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px]">32 Resources Online</span>
                      <span className="w-1 h-1 rounded-full bg-charcoal-light"></span>
                      <span className="font-medium text-forest">No double-booking guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
