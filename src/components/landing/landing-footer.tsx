import Link from "next/link";

export function LandingFooter() {
  return (
    <footer id="about" className="bg-ivory border-t border-border-light py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-forest flex items-center justify-center text-emerald-surface">
              <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="#45B592"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="#45B592"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-bold text-sm tracking-wider text-forest">RESERVA</span>
          </div>
          <span className="hidden sm:inline text-charcoal-light">•</span>
          <p className="text-xs text-charcoal-muted">A simpler way to share spaces.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-charcoal-muted">
          <a href="#features" className="hover:text-forest transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-forest transition-colors">How It Works</a>
          <Link href="/login" className="hover:text-forest transition-colors">Sign In</Link>
          <span className="text-charcoal-light">Copyright © 2026 RESERVA</span>
        </div>
      </div>
    </footer>
  );
}
