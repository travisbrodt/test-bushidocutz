import Link from "next/link";
import { site } from "@/config/site";
import type { Product } from "@/lib/types";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group flex h-full flex-col bg-paper">
      <div className="relative overflow-hidden">
        <Photo
          image={product.images[0]}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-square bg-ink"
          imgClassName="transition-transform duration-[1.4s] ease-calm group-hover:scale-[1.04]"
        />
        {product.subscribable && (
          <span className="absolute top-4 left-4 z-[2] bg-paper px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em]">
            Subscribe · save {site.subscription.discountPct}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-tight">{product.name.replace("Bushido ", "")}</h3>
          <Price amount={product.price} placeholder={product.placeholder} className="font-display text-xl" />
        </div>
        <p className="mt-2 flex-1 text-sm text-stone">{product.tagline}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-stone transition-colors group-hover:text-ink">
          {product.size} <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}
