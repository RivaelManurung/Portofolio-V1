"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { services } from "@/lib/data";
import { fadeUp, EASE_OUT_EXPO } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export function Service() {
  const [active, setActive] = useState(0);

  return (
    <section id="service" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <AnimatedHeading
          prefix="/"
          text="SERVICE"
          className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl"
        />

        <div className="mt-10">
          {services.map((service, i) => {
            const isOpen = active === i;
            return (
              <m.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  id={`service-trigger-${i}`}
                  className={cn(
                    "group flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition-colors sm:px-8 sm:py-7",
                    isOpen
                      ? "rounded-t-3xl bg-neutral-900 pb-4 text-white sm:pb-5"
                      : "rounded-3xl border-b border-neutral-200 text-neutral-950 hover:bg-neutral-50"
                  )}
                >
                  <span className="text-2xl font-bold uppercase tracking-tight sm:text-4xl">
                    {service.title}
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all",
                      isOpen
                        ? "bg-white/10 text-white"
                        : "text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white"
                    )}
                  >
                    {isOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`service-panel-${i}`}
                      role="region"
                      aria-labelledby={`service-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden rounded-b-3xl bg-neutral-900 text-white"
                    >
                      <div className="grid gap-6 px-6 pb-8 sm:grid-cols-[1fr_auto] sm:px-8">
                        <p className="max-w-md text-sm text-neutral-300 sm:text-base">
                          {service.description}
                        </p>
                        <span className="self-end text-xs font-semibold uppercase tracking-widest text-neutral-400">
                          {service.meta}
                        </span>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
