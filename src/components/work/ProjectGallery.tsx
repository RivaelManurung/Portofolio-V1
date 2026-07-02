"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/animation";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  accent: string;
}

/**
 * Fully animated project gallery:
 *  - staggered scroll-reveal of a bento grid
 *  - hover zoom + accent overlay + index badge
 *  - click opens an animated lightbox with keyboard + arrow navigation
 */
export function ProjectGallery({ images, title, accent }: ProjectGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) =>
      setActive((current) =>
        current === null
          ? current
          : (current + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (active === null) {
      // Return focus to the thumbnail that opened the lightbox.
      triggerRef.current?.focus();
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Focus trap: keep Tab within the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the dialog on open.
    const raf = requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [active, close, step]);

  return (
    <>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        {images.map((src, i) => (
          <m.button
            key={src + i}
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setActive(i);
            }}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease: EASE_OUT_EXPO },
              },
            }}
            className={`group relative block overflow-hidden rounded-2xl ring-1 ring-neutral-200/70 ${
              i === 0 ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"
            }`}
            aria-label={`Open ${title} screenshot ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40rem"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
            {/* Accent wash on hover */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(to top, ${accent}55, transparent 60%)`,
              }}
            />
            {/* Index badge */}
            <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-neutral-900 backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Expand cue */}
            <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
              View
            </span>
          </m.button>
        ))}
      </m.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <m.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-md outline-none sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <m.div
                key={active}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                onClick={(e) => e.stopPropagation()}
                className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl"
              >
                <Image
                  src={images[active]}
                  alt={`${title} screenshot ${active + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  className="object-cover"
                />
              </m.div>
            </AnimatePresence>

            <div
              role="status"
              aria-live="polite"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
            >
              {active + 1} / {images.length}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
