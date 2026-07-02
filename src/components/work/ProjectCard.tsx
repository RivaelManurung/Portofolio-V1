"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { fadeUp } from "@/lib/animation";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <m.article
      variants={fadeUp}
      layout
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-neutral-200/70">
          {/* Accent wash */}
          <div
            aria-hidden
            className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 120% at 50% 0%, ${project.accent}22, transparent 60%)`,
            }}
          />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
            {project.category === "Real Project" && (
              <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-900 backdrop-blur">
                Real Project
              </span>
            )}
            {project.liveUrl && (
              <span className="flex items-center gap-1.5 rounded-full bg-neutral-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-80" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                </span>
                Live
              </span>
            )}
          </div>
          {/* Hover CTA bubble */}
          <div className="absolute right-4 top-4 z-20 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-neutral-950 transition-colors group-hover:text-neutral-600 sm:text-xl">
            {project.title}
          </h3>
          <span className="mt-1 shrink-0 text-sm text-neutral-500">
            {project.year}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[...project.tags, project.studio].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </m.article>
  );
}
