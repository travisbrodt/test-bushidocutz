"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { site } from "@/config/site";
import type { GalleryCategory } from "@/lib/types";
import { cn } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";

const labels: Record<GalleryCategory | "all", string> = {
  all: "All",
  fades: "Fades",
  textured: "Textured",
  beard: "Beards",
  long: "Long hair",
  transformations: "Before & after",
  studio: "The suite",
};

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);

  const present = new Set(site.gallery.map((g) => g.category));
  const filters = (Object.keys(labels) as (GalleryCategory | "all")[]).filter((k) => k === "all" || present.has(k as GalleryCategory));
  const items = filter === "all" ? site.gallery : site.gallery.filter((g) => g.category === filter);

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? null : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "border px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
              filter === f ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40",
            )}
          >
            {labels[f]}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              layout
              key={item.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 break-inside-avoid"
            >
              <button type="button" onClick={() => setActive(i)} className="group block w-full text-left" aria-label={`Enlarge: ${item.alt}`}>
                <Photo
                  image={item}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={item.category === "transformations" ? "aspect-square" : item.tall ? "aspect-[3/4]" : "aspect-[4/5]"}
                  imgClassName="transition-transform duration-[1.2s] ease-calm group-hover:scale-[1.03]"
                />
                {item.caption && (
                  <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-stone">{item.caption}</span>
                )}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="relative h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
            </div>
            <button type="button" aria-label="Close" onClick={() => setActive(null)} className="absolute top-5 right-5 p-2 text-paper">
              <X className="size-6" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => (e.stopPropagation(), step(-1))}
              className="absolute left-3 p-3 text-paper/70 hover:text-paper md:left-6"
            >
              <ChevronLeft className="size-8" strokeWidth={1} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => (e.stopPropagation(), step(1))}
              className="absolute right-3 p-3 text-paper/70 hover:text-paper md:right-6"
            >
              <ChevronRight className="size-8" strokeWidth={1} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs uppercase tracking-[0.2em] text-paper/60">
              {current.caption ?? current.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
