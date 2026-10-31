import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramLink } from "@/components/ui/InstagramLink";

export function GalleryStrip() {
  const items = site.gallery.filter((g) => g.category !== "transformations").slice(0, 7);
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-8">
        <SectionHeading eyebrow="The work" title="Craftsmanship and care in every cut." />
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Button href="/gallery" variant="outline" arrow>
            View the gallery
          </Button>
          <InstagramLink className="text-stone hover:text-ink" />
        </div>
      </div>
      <div
        className="mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:scroll-px-8 md:px-8 xl:scroll-px-(--gutter) xl:px-(--gutter) [&::-webkit-scrollbar]:hidden"
        style={{ "--gutter": "calc((100% - 80rem) / 2 + 2rem)" } as React.CSSProperties}
      >
        {items.map((item) => (
          <figure key={item.src} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]">
            <Photo image={item} sizes="(min-width: 1024px) 26vw, 72vw" className="aspect-[4/5]" />
            {item.caption && (
              <figcaption className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone">
                {item.caption}
                <span aria-hidden className="text-ink/30">—</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
