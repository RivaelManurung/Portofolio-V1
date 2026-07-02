"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { person, socials } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animation";
import { SocialIcon } from "@/components/ui/social-icon";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50 px-6 py-24 sm:py-32"
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(22,163,74,0.10),transparent)] blur-2xl"
      />

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {person.available && (
          <m.span
            variants={fadeUp}
            className="mb-8 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-neutral-200/70"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
            </span>
            Available for New Project
          </m.span>
        )}

        <m.h2
          variants={fadeUp}
          className="text-balance text-4xl font-extrabold uppercase tracking-tight text-neutral-950 sm:text-6xl"
        >
          Have a project in mind?
        </m.h2>

        <m.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-pretty text-base text-neutral-500 sm:text-lg"
        >
          Together, we can build something clean and impactful. Let&apos;s
          collaborate to bring your ideas to life in a way that resonates with
          everyone.
        </m.p>

        <m.div variants={fadeUp} className="mt-8">
          <MagneticButton strength={24}>
            <Link
              href={`mailto:${person.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticButton>
        </m.div>

        <m.div
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="flex items-center gap-2 rounded-full bg-neutral-900 py-2 pl-2 pr-4 text-sm font-medium text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
              R
            </span>
            {person.firstName.charAt(0) + person.firstName.slice(1).toLowerCase()}{" "}
            {person.lastName.charAt(0) + person.lastName.slice(1).toLowerCase()}
          </span>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 ring-1 ring-neutral-200/70 transition-all hover:-translate-y-0.5 hover:ring-neutral-900"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
              {social.label}
            </a>
          ))}
        </m.div>

        <m.p
          variants={fadeUp}
          className="mt-16 text-xs text-neutral-500"
        >
          © {new Date().getFullYear()} {person.firstName} {person.lastName}.
          Crafted with Next.js & Framer Motion.
        </m.p>
      </m.div>
    </footer>
  );
}
