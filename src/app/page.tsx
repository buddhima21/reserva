import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { LandingHeader } from "@/components/landing/landing-header";
import { Hero } from "@/components/landing/hero";
import { ProductPreview } from "@/components/landing/product-preview";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingMotion } from "@/components/landing/landing-motion";
import "@/components/landing/landing.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: "italic",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "RESERVA — The Smarter Way to Reserve" },
  description:
    "One beautifully simple place to manage spaces, equipment, and reservations. Less coordination. More productivity.",
};

export default function Home() {
  return (
    <div
      id="top"
      className={`reserva-landing ${newsreader.variable} bg-ivory text-charcoal font-sans antialiased selection:bg-emerald-surface selection:text-forest`}
    >
      <a
        href="#landing-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <LandingMotion>
        <LandingHeader />
        <main id="landing-content" tabIndex={-1}>
          <Hero />
          <ProductPreview />
          <Features />
          <HowItWorks />
          <LandingCta />
        </main>
        <LandingFooter />
      </LandingMotion>
    </div>
  );
}
