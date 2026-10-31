import type { Metadata } from "next";
import { site, productsBySlug } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/commerce/ProductCard";
import { BundleButton } from "@/components/commerce/BundleButton";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Price, PlaceholderLegend } from "@/components/ui/Price";
import Link from "next/link";
import { ProductFeature } from "@/components/sections/ProductFeature";

export const metadata: Metadata = {
  title: "Shop Bushido Products",
  description: "Bushido Matte Cream, the new Rei Styling Putty, Sea Salt Spray, Styling Powder and 440C Japanese steel shears. Subscribe and save, or pick up at your next cut.",
};

const subscribePoints = [
  { jp: "節", title: `Save ${site.subscription.discountPct}% every order`, body: "Member-level pricing without the membership." },
  { jp: "時", title: "Arrives before you run out", body: `Choose every ${site.subscription.cadencesWeeks.join(", ")} weeks. Skip anytime.` },
  { jp: "手", title: "Or grab it at the chair", body: "Local? We'll have it ready at your next appointment." },
];

export default function ShopPage() {
  const bundle = site.bundles[0];
  const bundleRetail = bundle?.productSlugs.reduce((s, slug) => s + (productsBySlug[slug]?.price ?? 0), 0) ?? 0;
  const others = site.products.filter((p) => p.slug !== "matte-cream");
  const styling = others.filter((p) => p.subscribable);
  const tools = others.filter((p) => !p.subscribable);

  return (
    <>
      <PageHeader eyebrow="Shop · The Arsenal" title="Tools for the daily ritual." jp="道具">
        <p>The same products Michael uses in the chair. Subscribe and they arrive before you run out, or pick them up at your next cut.</p>
      </PageHeader>

      <ProductFeature priority />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl">The full line</h2>
          <PlaceholderLegend />
        </div>
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {styling.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        {tools.map((p) => (
          <Reveal key={p.slug}>
            <Link href={`/shop/${p.slug}`} className="group mt-16 grid items-center gap-10 border-t border-line pt-16 md:grid-cols-2 md:gap-16">
              <Photo
                image={p.images[0]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3]"
                imgClassName="transition-transform duration-[1.4s] ease-calm group-hover:scale-[1.03]"
              />
              <div>
                <p className="eyebrow text-stone">The tools</p>
                <h3 className="mt-4 font-display text-4xl leading-tight">{p.name.replace("Bushido ", "")}</h3>
                <p className="mt-4 leading-relaxed text-stone">{p.description[0]}</p>
                <p className="mt-6 flex items-baseline gap-6">
                  <Price amount={p.price} placeholder={p.placeholder} className="font-display text-3xl" />
                  <span className="text-xs uppercase tracking-[0.2em] text-stone transition-colors group-hover:text-ink">
                    {p.size} <span aria-hidden>→</span>
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {bundle && (
        <section className="bg-paper-deep">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-32">
            <Photo image={bundle.image} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-square" />
            <div>
              <p className="eyebrow flex items-center gap-3 text-stone">
                <span aria-hidden className="inline-block h-px w-8 bg-accent" />
                Bundle
              </p>
              <h2 className="mt-6 font-display text-5xl">{bundle.name}</h2>
              <p className="mt-6 text-lg leading-relaxed text-stone">{bundle.description}</p>
              <p className="mt-8 flex items-baseline gap-4">
                <span className="font-display text-5xl">{formatPrice(bundle.price)}</span>
                <span className="text-stone line-through">{formatPrice(bundleRetail)}</span>
                <span className="bg-ink px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-paper">
                  Save {formatPrice(bundleRetail - bundle.price)}
                </span>
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <BundleButton bundle={bundle} retail={bundleRetail} />
                <Button href="/gift-cards" variant="outline">
                  Give it as a gift
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <ul className="grid gap-12 md:grid-cols-3">
          {subscribePoints.map((p) => (
            <li key={p.title} className="flex gap-5">
              <span aria-hidden className="font-display text-4xl text-accent">{p.jp}</span>
              <div>
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-stone">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
