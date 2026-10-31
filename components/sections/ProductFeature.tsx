import Link from "next/link";
import { productsBySlug } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PurchaseOptions } from "@/components/commerce/PurchaseOptions";

export function ProductFeature({ slug = "matte-cream", priority }: { slug?: string; priority?: boolean }) {
  const product = productsBySlug[slug];
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-32">
        <Reveal>
          <Photo image={product.images[0]} priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-square bg-black" />
        </Reveal>
        <div>
          <p className="eyebrow flex items-center gap-3 text-paper/55">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            The house product
          </p>
          <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">{product.name}</h2>
          <p className="mt-3 font-display text-xl text-paper/70">{product.tagline}</p>
          <p className="mt-6 leading-relaxed text-paper/65">{product.description[0]}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px bg-line-light [&>div:nth-child(even)]:pl-4">
            {product.features.map((f) => (
              <div key={f.label} className="bg-ink py-3 pr-4">
                <dt className="eyebrow text-paper/40">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <PurchaseOptions slug={product.slug} tone="dark" />
          </div>

          {product.reviews?.[0] && (
            <blockquote className="mt-10 border-l border-accent pl-5">
              <p className="font-display text-lg text-paper/85">&ldquo;{product.reviews[0].quote}&rdquo;</p>
              <cite className="mt-2 block text-xs not-italic uppercase tracking-[0.2em] text-paper/45">{product.reviews[0].author}</cite>
            </blockquote>
          )}
          <Link href={`/shop/${product.slug}`} className="link-underline mt-8 inline-block text-xs uppercase tracking-[0.2em] text-paper/70">
            Ingredients & the ritual →
          </Link>
        </div>
      </div>
    </section>
  );
}
