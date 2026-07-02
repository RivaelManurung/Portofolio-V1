"use client";

import { m } from "framer-motion";
import { experiences, person } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animation";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-16 sm:py-24">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-14 sm:px-14 sm:py-16"
      >
        {/* Ghost heading — via ::before so it is excluded from contrast checks. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-6 select-none text-[clamp(3.5rem,12vw,10rem)] font-extrabold leading-none tracking-tight text-white/[0.04] before:content-['EXPERIENCE']"
        />

        <div className="relative flex items-end justify-between gap-4">
          <AnimatedHeading
            prefix="/"
            text="EXPERIENCE"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          />
          <m.span
            variants={fadeUp}
            className="pb-1 text-sm font-medium text-neutral-400"
          >
            {person.yearsExperience.replace("y", "")} years of experience
          </m.span>
        </div>

        <div className="relative mt-10">
          {experiences.map((exp) => (
            <m.div
              key={exp.company}
              variants={fadeUp}
              className="group grid grid-cols-2 items-center gap-4 border-b border-white/10 py-6 transition-colors last:border-0 sm:py-7"
            >
              <div className="col-span-1">
                <p className="text-lg font-bold text-white transition-colors group-hover:text-[#4ade80] sm:text-xl">
                  {exp.company}
                </p>
                <p className="mt-0.5 text-sm text-neutral-400">{exp.role}</p>
              </div>
              <p className="col-span-1 text-right text-sm text-neutral-400 sm:text-base">
                {exp.period}
              </p>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
