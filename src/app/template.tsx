"use client";

import { m } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animation";

/**
 * App Router `template.tsx` re-mounts on every navigation, so it gives each
 * route a fresh enter animation. Reduced-motion is honoured globally via the
 * MotionConfig in SmoothScroll.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      {children}
    </m.div>
  );
}
