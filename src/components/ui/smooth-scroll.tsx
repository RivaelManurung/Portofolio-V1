"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, LazyMotion, domMax } from "framer-motion";

/**
 * Wraps the app in a Lenis smooth-scroll instance.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links → smooth scroll via Lenis
    const handleAnchor = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, []);

  // `reducedMotion="user"` makes every framer-motion animation honour the OS
  // setting (reveals, cursor springs, nav). Scroll-linked useTransform bindings
  // are gated separately in the components that use them (e.g. Hero parallax).
  // LazyMotion + `m` components ship a smaller motion runtime than the full
  // `motion` component. `domMax` includes layout animations (used by the Work
  // filter's layoutId) and gestures.
  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
