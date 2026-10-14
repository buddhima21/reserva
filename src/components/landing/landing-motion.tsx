"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "all" } });
      hero.from(element.querySelector(".hero-badge"), { y: 16, opacity: 0, duration: 0.65 })
        .from(element.querySelectorAll("[data-hero-line]"), { yPercent: 110, duration: 1.1, stagger: 0.13 }, 0.1)
        .from(element.querySelectorAll("[data-hero]:not(.hero-badge)"), { y: 22, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.45)
        .from(element.querySelector(".hero-underline path"), { strokeDashoffset: 1, duration: 0.85 }, 0.8);
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach(target => {
        const card = target.matches(".landing-feature-card, .landing-step-card");
        const index = card ? Array.from(target.parentElement!.children).indexOf(target) : 0;
        gsap.from(target, { y: card ? 38 : 24, opacity: 0, duration: 0.85, delay: window.matchMedia("(min-width: 768px)").matches ? index * 0.1 : 0, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: target, start: "top 94%", once: true } });
      });
      gsap.from(element.querySelector(".workflow-connector"), { scaleX: 0, transformOrigin: "left center", duration: 1.3, ease: "power2.out", scrollTrigger: { trigger: element.querySelector("#how-it-works"), start: "top 65%", once: true }, clearProps: "all" });
      gsap.to(element.querySelector(".landing-reading-progress"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: element, start: "top top", end: "bottom bottom", scrub: 0.2 } });
      ScrollTrigger.create({ trigger: element, start: "top -40", end: "bottom top", toggleClass: { targets: element.querySelector(".landing-header")!, className: "is-scrolled" } });
    }, element);
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = Array.from(element.querySelectorAll<HTMLElement>(".landing-feature-card, .landing-step-card")).map(card => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
          card.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        };
        const reset = () => { card.style.removeProperty("--pointer-x"); card.style.removeProperty("--pointer-y"); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", reset);
        return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", reset); reset(); };
      });
      return () => cleanups.forEach(cleanup => cleanup());
    }, element);
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element.querySelector(".product-surface"), { rotateX: 5, transformOrigin: "center top" }, { rotateX: 0, ease: "none", scrollTrigger: { trigger: element.querySelector(".product-frame"), start: "top bottom", end: "top 30%", scrub: 0.8 } });
      gsap.to(element.querySelector(".hero-aura-left"), { x: 30, y: -20, ease: "none", scrollTrigger: { trigger: element.querySelector(".landing-hero"), start: "top top", end: "bottom top", scrub: 1 } });
    }, element);
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    const images = Array.from(element.querySelectorAll("img"));
    images.forEach(image => image.addEventListener("load", refresh));
    void document.fonts.ready.then(refresh);
    return () => { active = false; images.forEach(image => image.removeEventListener("load", refresh)); media.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
