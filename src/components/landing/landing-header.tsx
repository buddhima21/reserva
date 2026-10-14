import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="landing-header sticky top-0 z-50 bg-ivory/85 backdrop-blur-md border-b border-border-light transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-subtle rounded-lg py-1">
          <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-emerald-surface shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#45B592"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#45B592"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor"/>
            </svg>
          </div>
          <div className="flex items-baseline tracking-tight">
            <span className="font-bold text-lg text-forest tracking-wider font-sans">RESERVA</span>
          </div>
        </a>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8 text-[14.5px] font-medium text-charcoal-muted">
          <a href="#features" className="hover:text-forest transition-colors duration-150 py-1">Features</a>
          <a href="#how-it-works" className="hover:text-forest transition-colors duration-150 py-1">How It Works</a>
          <a href="#signature-product" className="hover:text-forest transition-colors duration-150 py-1">Product</a>
          <a href="#about" className="hover:text-forest transition-colors duration-150 py-1">About</a>
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-[14px] font-medium text-charcoal-muted hover:text-forest transition-colors px-2 py-1.5">Sign In</Link>
          <Link href="/signup" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-forest hover:bg-forest-light text-ivory text-[13.5px] font-medium tracking-tight shadow-sm hover:shadow transition-all duration-150 group">
            <span>Get Started</span>
            <svg aria-hidden="true" className="w-3.5 h-3.5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      <details className="lg:hidden border-t border-border-light px-6 py-3">
        <summary className="cursor-pointer text-sm font-medium text-forest">Explore RESERVA</summary>
        <nav aria-label="Mobile navigation" className="flex flex-wrap gap-x-6 gap-y-3 pt-4 pb-2 text-sm text-charcoal-muted">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#signature-product">Product</a>
          <a href="#about">About</a>
        </nav>
      </details>
    </header>
  );
}
