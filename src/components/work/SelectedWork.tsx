"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/data";
import { stagger } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const FILTERS = ["All", "Real Project", "Exploration"] as const;
type Filter = (typeof FILTERS)[number];

export function SelectedWork() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === (filter as ProjectCategory));
  }, [filter]);

  return (
    <section id="work" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Ghost heading — rendered via ::before so it stays purely decorative
          and is excluded from contrast checks. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 select-none text-center text-[clamp(3rem,13vw,11rem)] font-extrabold leading-none tracking-tight text-neutral-100 before:content-['PORTFOLIO']"
      />

      <div className="relative mx-auto max-w-6xl">
        <AnimatedHeading
          prefix="/"
          text="SELECTED WORK"
          className="text-center text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl"
        />

        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div
            role="group"
            aria-label="Filter projects"
            className="flex items-center gap-2 rounded-full bg-neutral-100 p-1"
          >
            {FILTERS.map((f) => (
              <m.button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.94 }}
                aria-pressed={filter === f}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === f
                    ? "text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {filter === f && (
                  <m.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-neutral-900"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </m.button>
            ))}
          </div>

          <Link
            href="#work"
            className="group flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
          >
            View All Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <m.div
          layout
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </m.div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} {filter === "All" ? "" : filter + " "}
          project{visible.length === 1 ? "" : "s"}.
        </p>
      </div>
    </section>
  );
}
