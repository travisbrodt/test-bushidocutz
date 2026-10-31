"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { site } from "@/config/site";
import type { MembershipTier } from "@/lib/types";
import { annualSavings, monthlyValue } from "@/lib/membership";
import { cn, formatPrice } from "@/lib/format";
import { Price } from "@/components/ui/Price";
import { useApp } from "@/components/providers/AppProvider";

export function MembershipTiers() {
  const { tiers, familyAddOn, name } = site.membership;
  const { openCheckout } = useApp();
  const [family, setFamily] = useState(false);

  const join = (tier: MembershipTier) =>
    openCheckout({
      kind: "membership",
      title: `${name}: ${tier.name}`,
      subtitle: "Founding membership",
      recurring: "month",
      lines: [
        { label: `${tier.name} membership`, amount: tier.price },
        ...(family ? [{ label: familyAddOn.name, amount: familyAddOn.price, note: "One Kids' Cut each month" }] : []),
      ],
    });

  return (
    <div>
      <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.id}
            id={tier.id}
            className={cn("relative flex scroll-mt-28 flex-col p-8 md:p-10", tier.highlighted ? "bg-ink text-paper" : "bg-paper")}
          >
            {tier.highlighted && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-accent px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                Most chosen
              </span>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-3xl">{tier.name}</h3>
                <p className={cn("mt-2 text-sm", tier.highlighted ? "text-paper/60" : "text-stone")}>{tier.tagline}</p>
              </div>
              <span aria-hidden className={cn("font-display text-4xl [writing-mode:vertical-rl]", tier.highlighted ? "text-paper/25" : "text-ink/15")}>
                {tier.jp}
              </span>
            </div>

            <p className="mt-10 font-display text-6xl tracking-tight">
              <Price amount={tier.price} placeholder={tier.placeholder} />
              <span className={cn("ml-2 font-sans text-sm tracking-normal", tier.highlighted ? "text-paper/50" : "text-stone")}>/ month</span>
            </p>
            <p className={cn("mt-2 text-sm", tier.highlighted ? "text-paper/60" : "text-stone")}>
              {formatPrice(monthlyValue(tier))} value each month
              {annualSavings(tier) > 0 && (
                <>
                  {" · "}
                  <span className={tier.highlighted ? "text-paper" : "text-ink"}>save {formatPrice(annualSavings(tier))} a year</span>
                </>
              )}
            </p>

            <ul className={cn("mt-8 flex-1 space-y-3 border-t pt-8 text-sm", tier.highlighted ? "border-line-light" : "border-line")}>
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => join(tier)}
              className={cn(
                "mt-10 py-4 text-xs font-medium uppercase tracking-[0.22em] transition-colors",
                tier.highlighted ? "bg-accent text-paper hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]" : "bg-ink text-paper hover:bg-ink-soft",
              )}
            >
              Join as {tier.name} →
            </button>
          </article>
        ))}
      </div>

      <label className="mt-6 flex cursor-pointer items-center justify-between gap-6 border border-line bg-paper-deep/50 p-5 md:p-6">
        <span>
          <span className="font-display text-xl">
            {familyAddOn.name} <span className="text-stone">+{formatPrice(familyAddOn.price)}/mo</span>
          </span>
          <span className="mt-1 block text-sm text-stone">{familyAddOn.description}</span>
        </span>
        <span className="relative inline-flex shrink-0 items-center">
          <input type="checkbox" checked={family} onChange={(e) => setFamily(e.target.checked)} className="peer sr-only" />
          <span className="h-7 w-12 rounded-full bg-ink/15 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2" />
          <span className="absolute left-1 size-5 rounded-full bg-paper shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>
    </div>
  );
}
