import Link from "next/link";
import { site } from "@/config/site";
import { annualSavings } from "@/lib/membership";
import { formatPrice } from "@/lib/format";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FoundingMeter } from "./FoundingMeter";

export function MembershipTeaser() {
  const m = site.membership;
  return (
    <section className="relative overflow-hidden bg-paper-deep">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-16 hidden font-display text-[18rem] leading-none text-ink/[0.035] lg:block"
      >
        {m.jp}
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-2 md:px-8 md:py-36">
        <div>
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            Membership · {m.jp}
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Join {m.name}.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">{m.pitch}</p>
          <FoundingMeter className="mt-10" />
          <Button href="/membership" variant="ink" size="lg" arrow className="mt-10">
            Become a founding member
          </Button>
        </div>

        <ul className="divide-y divide-line border-y border-line self-center">
          {m.tiers.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.08}>
              <Link href={`/membership#${t.id}`} className="group flex items-center gap-6 py-7">
                <span aria-hidden className="w-16 whitespace-nowrap font-display text-2xl text-ink/25 transition-colors group-hover:text-accent">
                  {t.jp}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-3">
                    <span className="font-display text-2xl">{t.name}</span>
                    {t.highlighted && (
                      <span className="bg-ink px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-paper">Most chosen</span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm text-stone">{t.tagline}</span>
                </span>
                <span className="text-right">
                  <Price amount={t.price} placeholder={t.placeholder} suffix="/mo" className="font-display text-2xl" />
                  {annualSavings(t) > 0 && (
                    <span className="block text-xs text-stone">Save {formatPrice(annualSavings(t))}/yr</span>
                  )}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
