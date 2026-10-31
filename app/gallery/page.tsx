import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BookButton } from "@/components/booking/BookButton";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Fades, textured crops, beard shaping and before-and-after transformations by ${site.brand.owner.name} in Beaverton, OR.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery · The work" title="Craftsmanship and care in every cut." jp="作品">
        <p>Real clients, real chair, no filters beyond good light. See a style you like? Screenshot it and bring it to your appointment.</p>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <GalleryGrid />
      </section>
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-8">
          <p className="font-display text-3xl">Ready for yours?</p>
          <BookButton size="lg" arrow />
        </div>
      </section>
    </>
  );
}
