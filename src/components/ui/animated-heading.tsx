"use client";

import { m } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animation";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  /** Optional leading marker (e.g. "/") rendered muted before the text. */
  prefix?: string;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const char = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/**
 * Heading that reveals character-by-character on scroll into view.
 * The full text stays accessible: the visible chars are aria-hidden and a
 * visually-hidden copy carries the real accessible name.
 */
export function AnimatedHeading({ text, className, prefix }: AnimatedHeadingProps) {
  return (
    <m.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
      aria-label={prefix ? `${prefix}${text}` : text}
    >
      {prefix && (
        <span className="text-neutral-500" aria-hidden>
          {prefix}
        </span>
      )}
      <span aria-hidden>
        {text.split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <m.span variants={char} className="inline-block">
              {c === " " ? " " : c}
            </m.span>
          </span>
        ))}
      </span>
    </m.h2>
  );
}
