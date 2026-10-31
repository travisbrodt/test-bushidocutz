import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BookButton } from "@/components/booking/BookButton";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramLink";

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
        <div className="mx-auto grid max-w-7xl gap-px bg-line md:grid-cols-2">
          <div className="flex flex-col items-start gap-6 bg-paper px-5 py-16 md:px-8">
            <p className="font-display text-3xl">Ready for yours?</p>
            <BookButton size="lg" arrow />
          </div>
          <div className="flex flex-col items-start gap-6 bg-paper px-5 py-16 md:px-8">
            <div>
              <p className="font-display text-3xl">Fresh work, every week.</p>
              <p className="mt-2 text-sm text-stone">New cuts and transformations land on Instagram first.</p>
            </div>
            <Button href={site.integrations.instagram.href} external variant="outline" size="lg">
              <InstagramIcon /> Follow @{site.integrations.instagram.handle}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
