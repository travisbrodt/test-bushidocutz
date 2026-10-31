import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, productsBySlug } from "@/config/site";
import { asset } from "@/lib/asset";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { PurchaseOptions } from "@/components/commerce/PurchaseOptions";
import { ProductCard } from "@/components/commerce/ProductCard";

export function generateStaticParams() {
  return site.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = productsBySlug[slug];
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline} ${product.description[0]}`,
    openGraph: { images: [{ url: asset(product.images[0].src) }] },
  };
}

const numerals = ["一", "二", "三", "四", "五"];

export default function ProductPage(props: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={props.params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <section aria-busy="true" className="mx-auto grid max-w-7xl gap-12 px-5 pt-28 pb-20 md:grid-cols-2 md:gap-20 md:px-8 md:pt-36">
      <div className="aspect-square animate-pulse bg-paper-deep" />
      <div className="space-y-4 pt-16">
        <div className="h-12 w-3/4 animate-pulse bg-paper-deep" />
        <div className="h-5 w-1/2 animate-pulse bg-paper-deep" />
        <div className="h-40 animate-pulse bg-paper-deep" />
      </div>
    </section>
  );
}

async function ProductContent({ params }: { params: PageProps<"/shop/[slug]">["params"] }) {
  const { slug } = await params;
  const product = productsBySlug[slug];
  if (!product) notFound();

  const related = site.products.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.2em] text-stone">
          <Link href="/shop" className="link-underline">Shop</Link>
          <span aria-hidden className="mx-3">/</span>
          <span className="text-ink">{product.name.replace("Bushido ", "")}</span>
        </nav>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <Photo key={img.src} image={img} priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-square bg-ink" />
            ))}
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <h1 className="font-display text-5xl leading-tight md:text-6xl">{product.name}</h1>
            <p className="mt-3 font-display text-xl text-stone">{product.tagline}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <Price amount={product.price} placeholder={product.placeholder} className="font-display text-3xl" />
              <span className="text-sm text-stone">{product.size}</span>
            </p>
            <div className="mt-8 space-y-4 leading-relaxed text-stone">
              {product.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-10">
              <PurchaseOptions slug={product.slug} />
            </div>

            <dl className="mt-10 grid grid-cols-2 border-t border-line">
              {product.features.map((f) => (
                <div key={f.label} className="border-b border-line py-4 pr-4">
                  <dt className="eyebrow text-stone">{f.label}</dt>
                  <dd className="mt-1 text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>

            {product.draftCopy && (
              <p className="mt-6 border border-dashed border-accent/50 p-3 text-xs text-accent">
                Draft description for review. Details to be confirmed by {site.brand.owner.name.split(" ")[0]}.
              </p>
            )}
          </div>
        </div>
      </section>

      {(product.directions || product.ingredients) && (
        <section className="bg-ink text-paper">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
            {product.directions && (
              <div>
                <p className="eyebrow text-paper/50">The ritual</p>
                <h2 className="mt-4 font-display text-4xl">How to use it.</h2>
                <ol className="mt-10 border-t border-line-light">
                  {product.directions.map((d, i) => (
                    <li key={d} className="flex gap-6 border-b border-line-light py-6">
                      <span aria-hidden className="font-display text-2xl text-accent">{numerals[i]}</span>
                      <span className="text-lg text-paper/80">{d}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="space-y-12">
              {product.reviews && (
                <div className="space-y-8">
                  {product.reviews.map((r) => (
                    <blockquote key={r.author} className="border-l border-accent pl-6">
                      <p className="font-display text-2xl leading-snug">&ldquo;{r.quote}&rdquo;</p>
                      <cite className="mt-3 block text-xs not-italic uppercase tracking-[0.2em] text-paper/45">{r.author}</cite>
                    </blockquote>
                  ))}
                </div>
              )}
              {product.ingredients && (
                <details className="group border-t border-line-light pt-6">
                  <summary className="eyebrow flex cursor-pointer list-none justify-between text-paper/60 [&::-webkit-details-marker]:hidden">
                    Ingredients <span className="transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-paper/60">{product.ingredients}</p>
                </details>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h2 className="font-display text-3xl">Complete the arsenal</h2>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
