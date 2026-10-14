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
      gsap.from(element.querySelectorAll("[data-hero]"), { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", clearProps: "all" });
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach(target => {
        gsap.from(target, { y: 32, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: target, start: "top 94%", once: true } });
      });
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
