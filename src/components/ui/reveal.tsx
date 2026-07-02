"use client";

import { m, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/animation";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
  amount?: number;
}

/**
 * Scroll-triggered reveal. Defaults to a fade-up; pass `variants` to override.
 * Reduced-motion users get an instant, non-animated appearance via framer's
 * built-in reduced-motion handling.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  as = "div",
  amount = 0.3,
}: RevealProps) {
  const MotionTag = m[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
