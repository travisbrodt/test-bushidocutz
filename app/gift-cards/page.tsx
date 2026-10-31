import type { Metadata } from "next";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { GiftCardBuilder } from "@/components/commerce/GiftCardBuilder";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `Give a precision cut, a hot towel shave or the full VIP Experience at ${site.brand.name}. Instant email delivery.`,
};

export default function GiftCardsPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-32 pb-24 md:grid-cols-2 md:gap-20 md:px-8 md:pt-44 md:pb-32">
      <div>
        <p className="eyebrow flex items-center gap-3 text-stone">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          Gift cards · 贈り物
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1] tracking-tight">
          Give the gift of being taken care of.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
          A precision cut, a hot towel shave, or the full VIP Experience. {site.giftCards.note}
        </p>
        <div className="relative mt-12 aspect-[1.6/1] max-w-md overflow-hidden shadow-2xl shadow-ink/30 [transform:rotate(-2deg)]">
          <Photo image={site.giftCards.image} priority sizes="448px" className="h-full w-full" />
          <span className="absolute right-5 bottom-4 z-[2] text-[0.6rem] uppercase tracking-[0.3em] text-paper/70">Gift card</span>
        </div>
      </div>
      <div className="md:pt-24">
        <GiftCardBuilder />
      </div>
    </section>
  );
}
