import type { Metadata } from "next";
import { site } from "@/config/site";
import type { ServiceCategory } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { monthlyValue } from "@/lib/membership";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Price, PlaceholderLegend } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/booking/BookButton";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Men's precision cuts, fades, beard rituals, hot towel shaves, women's and kids' cuts in Beaverton. Transparent pricing and online booking at ${site.brand.name}.`,
};

const categories: { id: ServiceCategory; label: string; jp: string; intro: string }[] = [
  { id: "cuts", label: "Cuts", jp: "髪", intro: "Sharp lines, intentional texture, perfect tapering." },
  { id: "beard", label: "Beard", jp: "髭", intro: "Not a trim. A ritual." },
  { id: "rituals", label: "Rituals", jp: "儀", intro: "Heat, steam and the straight razor." },
  { id: "women", label: "Women", jp: "間", intro: "Shape and space, the art of Ma." },
  { id: "kids", label: "Kids", jp: "子", intro: "Patient, gentle and precise." },
];

const maxSavingsPct = Math.max(
  ...site.membership.tiers.map((t) => Math.floor((1 - t.price / monthlyValue(t)) * 100)),
);

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services & pricing" title="The menu." jp="品書">
        <p>
          Every service is one-on-one in a private suite. Prices are transparent and there are no surprise upsells, only
          small rituals you can choose to add.
        </p>
      </PageHeader>

      <nav aria-label="Service categories" className="sticky top-18 z-20 border-b border-line bg-paper/90 backdrop-blur md:top-20">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-5 py-4 text-[0.7rem] uppercase tracking-[0.22em] md:px-8">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="link-underline shrink-0 text-stone hover:text-ink">
              {c.label}
            </a>
          ))}
          <a href="#add-ons" className="link-underline shrink-0 text-stone hover:text-ink">Add-ons</a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {categories.map((cat) => {
          const services = site.services.filter((s) => s.category === cat.id);
          if (!services.length) return null;
          return (
            <section key={cat.id} id={cat.id} className="grid scroll-mt-40 gap-10 border-b border-line py-20 md:grid-cols-12 md:py-28">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-44">
                  <span aria-hidden className="font-display text-6xl text-accent">{cat.jp}</span>
                  <h2 className="mt-4 font-display text-4xl">{cat.label}</h2>
                  <p className="mt-3 text-stone">{cat.intro}</p>
                </div>
              </div>
              <div className="divide-y divide-line md:col-span-8">
                {services.map((s) => (
                  <Reveal key={s.id} className="py-10 first:pt-0 last:pb-0">
                    <article className="grid gap-6 sm:grid-cols-[1fr_auto]">
                      <div className="flex gap-6">
                        {s.image && (
                          <Photo image={s.image} sizes="120px" className="hidden aspect-[4/5] w-28 shrink-0 sm:block" />
                        )}
                        <div>
                          {s.kicker && <p className="eyebrow text-stone">{s.kicker}</p>}
                          <h3 className="mt-2 font-display text-2xl md:text-3xl">{s.name}</h3>
                          <p className="mt-3 max-w-xl leading-relaxed text-stone">{s.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-start">
                        <div className="sm:text-right">
                          <Price amount={s.price} placeholder={s.placeholder} className="font-display text-3xl" />
                          <p className="text-xs uppercase tracking-[0.18em] text-stone">{formatDuration(s.durationMin)}</p>
                        </div>
                        <BookButton serviceId={s.id} size="sm" arrow>
                          Book
                        </BookButton>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        <section id="add-ons" className="grid scroll-mt-40 gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <span aria-hidden className="font-display text-6xl text-accent">お</span>
            <h2 className="mt-4 font-display text-4xl">Omotenashi add-ons</h2>
            <p className="mt-3 text-stone">
              Omotenashi is the art of selfless hospitality. These aren&apos;t extra steps, they&apos;re designed to honor the guest in our chair.
            </p>
          </div>
          <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 md:col-span-8">
            {site.addOns.map((a) => (
              <li key={a.id} className="bg-paper p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl">{a.name}</h3>
                  <span className="font-display text-xl">
                    +<Price amount={a.price} placeholder={a.placeholder} />
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone">{a.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-stone">+{a.durationMin} min</p>
              </li>
            ))}
          </ul>
        </section>
        <PlaceholderLegend className="pb-10" />
      </div>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-center md:px-8">
          <div>
            <p className="font-display text-3xl md:text-4xl">Coming back every few weeks?</p>
            <p className="mt-3 text-paper/60">Members save up to {maxSavingsPct}% and get first pick of the calendar.</p>
          </div>
          <Button href="/membership" variant="paper" size="lg" arrow>
            See The Dojo
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center text-sm leading-relaxed text-stone md:px-8">
        <h2 className="sr-only">Service area</h2>
        <p>
          {site.brand.name} is a private barber suite inside Sola Salons at {site.contact.address.street}, {site.contact.address.suite},{" "}
          {site.contact.address.city}. Master Barber {site.brand.owner.name} serves clients from {site.seo.serviceAreas.slice(0, -1).join(", ")} and the greater{" "}
          {site.seo.serviceAreas.at(-1)} metro area with men&apos;s haircuts, skin fades, beard trims, hot towel shaves and women&apos;s cuts.
        </p>
      </section>
    </>
  );
}
