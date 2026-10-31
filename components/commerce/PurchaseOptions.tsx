"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { site, productsBySlug } from "@/config/site";
import { subscriptionPrice } from "@/lib/commerce";
import { cn, formatPrice } from "@/lib/format";
import { useApp } from "@/components/providers/AppProvider";

export function PurchaseOptions({ slug, tone = "light" }: { slug: string; tone?: "light" | "dark" }) {
  const product = productsBySlug[slug];
  const { openCheckout } = useApp();
  const { discountPct, cadencesWeeks } = site.subscription;
  const [mode, setMode] = useState<"subscribe" | "once">(product.subscribable ? "subscribe" : "once");
  const [cadence, setCadence] = useState(cadencesWeeks[1] ?? cadencesWeeks[0]);
  const [qty, setQty] = useState(1);

  const unit = mode === "subscribe" ? subscriptionPrice(product.price, discountPct) : product.price;
  const dark = tone === "dark";
  const muted = dark ? "text-paper/60" : "text-stone";
  const border = dark ? "border-line-light" : "border-line";

  const checkout = () =>
    openCheckout({
      kind: "product",
      title: product.name,
      subtitle: product.size,
      image: product.images[0],
      shipping: true,
      recurring: mode === "subscribe" ? `${cadence} weeks` : undefined,
      lines: [
        {
          label: `${product.name} × ${qty}`,
          amount: Math.round(unit * qty * 100) / 100,
          note: mode === "subscribe" ? `Subscribe & save ${discountPct}%` : undefined,
        },
      ],
    });

  return (
    <div className="space-y-3">
      {product.subscribable && (
        <OptionRow
          selected={mode === "subscribe"}
          onSelect={() => setMode("subscribe")}
          border={border}
          dark={dark}
          title={
            <>
              Subscribe & save {discountPct}%
              <span className="ml-2 bg-accent px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-paper">Best value</span>
            </>
          }
          price={formatPrice(subscriptionPrice(product.price, discountPct), { cents: true })}
        >
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={cn("text-xs", muted)}>Deliver every</span>
            {cadencesWeeks.map((w) => (
              <button
                key={w}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("subscribe");
                  setCadence(w);
                }}
                className={cn(
                  "border px-3 py-1.5 text-xs transition-colors",
                  cadence === w && mode === "subscribe"
                    ? dark
                      ? "border-paper bg-paper text-ink"
                      : "border-ink bg-ink text-paper"
                    : border,
                )}
              >
                {w} weeks
              </button>
            ))}
          </div>
          <p className={cn("mt-2 text-xs", muted)}>Skip, swap or cancel anytime. Or pick it up at your next cut.</p>
        </OptionRow>
      )}
      <OptionRow
        selected={mode === "once"}
        onSelect={() => setMode("once")}
        border={border}
        dark={dark}
        title="One-time purchase"
        price={formatPrice(product.price)}
      />

      <div className="flex gap-3 pt-3">
        <div className={cn("flex items-center border", border)}>
          <button type="button" aria-label="Decrease quantity" className="p-3.5" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus className="size-3.5" />
          </button>
          <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" className="p-3.5" onClick={() => setQty((q) => q + 1)}>
            <Plus className="size-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={checkout}
          className="flex-1 bg-accent py-4 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]"
        >
          {mode === "subscribe" ? "Start subscription" : "Add to order"} · {formatPrice(unit * qty, { cents: !Number.isInteger(unit * qty) })}
        </button>
      </div>
    </div>
  );
}

function OptionRow({
  selected,
  onSelect,
  title,
  price,
  children,
  border,
  dark,
}: {
  selected: boolean;
  onSelect: () => void;
  title: React.ReactNode;
  price: string;
  children?: React.ReactNode;
  border: string;
  dark: boolean;
}) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect())}
      className={cn(
        "cursor-pointer border p-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected ? (dark ? "border-paper" : "border-ink") : border,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3 text-sm font-medium">
          <span className={cn("flex size-4 items-center justify-center rounded-full border", dark ? "border-paper/50" : "border-ink/40")}>
            {selected && <span className="size-2 rounded-full bg-accent" />}
          </span>
          {title}
        </span>
        <span className="font-display text-lg tabular-nums">{price}</span>
      </div>
      {children}
    </div>
  );
}
