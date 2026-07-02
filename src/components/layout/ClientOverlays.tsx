"use client";

import { useEffect, useState } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useScroll,
} from "framer-motion";

/**
 * Global client-only overlays:
 *  - Custom cursor (globals.css forces `cursor: none` on fine pointers, so this
 *    is required or desktop users see no pointer at all).
 *  - Top scroll-progress bar.
 */
export function ClientOverlays() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-neutral-900"
    />
  );
}

function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Bind position directly to the pointer (no spring) so the cursor tracks 1:1
  // with zero lag. Only the ring's size/colour animates on hover.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    // Only take over the cursor on fine pointers and when motion is allowed.
    // Touch devices never fire mousemove; reduced-motion users keep the native
    // cursor (we never add the gating class, so globals.css leaves it visible).
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor-ready");

    // Position updates run at full pointer rate (cheap: no re-render).
    // The hover DOM-walk is throttled to one check per animation frame and
    // only re-renders when the boolean actually flips.
    let frame = 0;
    let pending: EventTarget | null = null;
    const runHoverCheck = () => {
      frame = 0;
      const el = pending as HTMLElement | null;
      const next = Boolean(
        el?.closest?.('a, button, [role="button"], [data-cursor="hover"]')
      );
      setHovering((prev) => (prev === next ? prev : next));
    };
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      pending = e.target;
      if (!frame) frame = requestAnimationFrame(runHoverCheck);
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-ready");
    };
  }, [x, y]);

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center"
      style={{ x, y }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <m.span
        className="block rounded-full border border-neutral-900 bg-neutral-900/5 backdrop-invert-0"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 20,
          height: hovering ? 48 : 20,
          backgroundColor: hovering
            ? "rgba(22,163,74,0.15)"
            : "rgba(23,23,23,0.06)",
          borderColor: hovering ? "#16a34a" : "#171717",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </m.div>
  );
}
