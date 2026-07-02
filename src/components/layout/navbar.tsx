"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, person } from "@/lib/data";
import { EASE_OUT_EXPO } from "@/lib/animation";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-all duration-500",
          scrolled
            ? "border-neutral-200 bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white/40 backdrop-blur-sm"
        )}
      >
        {/* Brand */}
        <Link
          href="#"
          aria-label={`${person.firstName} ${person.lastName} — home`}
          className="group flex items-center gap-2 rounded-full px-2 py-1 text-base font-extrabold tracking-tight text-neutral-950"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
            {person.firstName.charAt(0)}
          </span>
          <span className="hidden sm:inline">
            {person.firstName.charAt(0) +
              person.firstName.slice(1).toLowerCase()}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative flex items-center text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton className="hidden sm:inline-block">
            <Link
              href="#contact"
              className="group flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticButton>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-neutral-100 py-3 text-lg font-semibold text-neutral-900 last:border-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white"
            >
              Let&apos;s Talk with {person.firstName}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
