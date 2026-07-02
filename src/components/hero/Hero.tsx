"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { person, socials } from "@/lib/data";
import { EASE_OUT_EXPO, revealWord, fadeUp } from "@/lib/animation";
import { SocialIcon } from "@/components/ui/social-icon";
import { MagneticButton } from "@/components/ui/magnetic-button";

// WebGL hero backdrop — client-only and lazy so it never blocks the LCP image.
const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // The WebGL backdrop is a desktop-only enhancement: it reacts to the pointer
  // and its ~200KB chunk would tank mobile Core Web Vitals for no benefit on a
  // touch device. Load it only on wide, fine-pointer screens, and only once the
  // browser is idle so it never competes with the LCP hero image.
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const canRender3D =
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 1024;
    if (!canRender3D) return;

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const trigger = () => setShow3D(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(trigger);
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(trigger, 1200);
    return () => clearTimeout(t);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const nameYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const portraitYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const portraitScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fadeOutRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Disable scroll-linked parallax under reduced motion (MotionConfig covers
  // animate/whileInView, but not these direct scroll bindings).
  const nameY = reduceMotion ? undefined : nameYRaw;
  const portraitY = reduceMotion ? undefined : portraitYRaw;
  const portraitScale = reduceMotion ? undefined : portraitScaleRaw;
  const fadeOut = reduceMotion ? 1 : fadeOutRaw;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-end overflow-hidden bg-white pb-10 pt-28 sm:pb-14"
    >
      {/* 3D particle backdrop (deferred to idle to protect LCP) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {show3D && <HeroCanvas reduced={Boolean(reduceMotion)} />}
      </div>

      {/* Giant name */}
      <m.h1
        style={{ y: nameY }}
        aria-label={`${person.firstName} ${person.lastName}`}
        className="pointer-events-none absolute inset-x-0 top-[18%] z-[1] flex flex-wrap justify-center gap-x-[0.12em] px-4 text-center font-extrabold leading-[0.85] tracking-tight sm:top-[20%]"
      >
        <span aria-hidden className="contents">
          <Word className="text-transparent [-webkit-text-stroke:1.5px_theme(colors.neutral.900)] sm:[-webkit-text-stroke:2px_theme(colors.neutral.900)]">
            {person.firstName}
          </Word>
          <Word className="text-neutral-950" delay={0.12}>
            {person.lastName}
          </Word>
        </span>
      </m.h1>

      {/* Portrait */}
      <m.div
        style={{ y: portraitY, scale: portraitScale }}
        className="relative z-10 mx-auto mt-40 h-[46vh] w-[62vw] max-w-md sm:mt-48 sm:h-[54vh]"
      >
        {/* Transform-only entrance (no opacity/clip) so the LCP image paints
            immediately — animating opacity from 0 would delay LCP. */}
        <m.div
          initial={{ y: 36, scale: 1.04 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
        >
          <Image
            src="/hero-portrait.jpg"
            alt={`${person.firstName} ${person.lastName}`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 62vw, 28rem"
            className="object-cover object-top grayscale"
          />
        </m.div>
      </m.div>

      {/* Bottom overlay: role + CTA (left) and socials (right) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 sm:px-10 sm:pb-14">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="max-w-xs"
          >
            <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">
              {person.role}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              {person.tagline}
            </p>
            <MagneticButton className="mt-5">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Let&apos;s collaborate
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
          </m.div>

          <m.div
            style={{ opacity: fadeOut }}
            className="hidden flex-col items-end gap-2.5 sm:flex"
          >
            {socials.map((social, i) => (
              <m.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08, ease: EASE_OUT_EXPO }}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-sm ring-1 ring-neutral-200/70 transition-all hover:-translate-x-0.5 hover:ring-neutral-900"
              >
                <SocialIcon icon={social.icon} className="h-4 w-4" />
                {social.label}
              </m.a>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] text-[clamp(3.5rem,15vw,11rem)]">
      <m.span
        variants={revealWord}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
        className={`inline-block ${className ?? ""}`}
      >
        {children}
      </m.span>
    </span>
  );
}
