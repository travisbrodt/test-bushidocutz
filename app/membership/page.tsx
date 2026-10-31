import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { site } from "@/config/site";
import { annualSavings, monthlyValue } from "@/lib/membership";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { FoundingMeter } from "@/components/sections/FoundingMeter";
import { MembershipTiers } from "@/components/membership/MembershipTiers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderLegend } from "@/components/ui/Price";

export const metadata: Metadata = {
  title: "The Dojo Membership",
  description: `Monthly barber memberships at ${site.brand.name}: priority booking, reserved recurring slots and member pricing. Limited founding spots.`,
};

const steps = [
  { jp: "選", title: "Choose your rhythm", body: "Pick the tier that matches how often you like to stay sharp." },
  { jp: "約", title: "Reserve your slot", body: "Michael reaches out to lock in a recurring time that's yours." },
  { jp: "整", title: "Show up sharp", body: "Billed monthly. No checkout at the chair. Pause or cancel anytime." },
];

export default function MembershipPage() {
  const m = site.membership;
  return (
    <>
      <PageHeader eyebrow={`Membership · ${m.jp}`} title={<>Your chair, reserved.</>} jp={m.jp} aside={<FoundingMeter />}>
        <p>{m.pitch}</p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <MembershipTiers />
        <PlaceholderLegend className="mt-6" />
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading tone="dark" eyebrow="The math" title="Members keep more of their money.">
            <p>What a year looks like booking each visit individually, compared with membership.</p>
          </SectionHeading>
          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="eyebrow border-b border-line-light text-paper/45">
                  <th className="py-4 font-medium">Tier</th>
                  <th className="py-4 font-medium">Booking individually</th>
                  <th className="py-4 font-medium">As a member</th>
                  <th className="py-4 text-right font-medium">You keep</th>
                </tr>
              </thead>
              <tbody>
                {m.tiers.map((t) => (
                  <tr key={t.id} className="border-b border-line-light">
                    <td className="py-6 font-display text-2xl">{t.name}</td>
                    <td className="py-6 text-paper/60 tabular-nums line-through decoration-paper/30">{formatPrice(monthlyValue(t) * 12)}/yr</td>
                    <td className="py-6 tabular-nums">{formatPrice(t.price * 12)}/yr</td>
                    <td className="py-6 text-right font-display text-3xl text-accent tabular-nums">{formatPrice(annualSavings(t))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-paper/40">Based on current menu prices. Product discounts not included.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="How it works" title="Three steps. Then just show up." />
        <ol className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="bg-paper p-8 md:p-10">
              <span aria-hidden className="font-display text-5xl text-accent">{s.jp}</span>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-stone">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Questions" title="Honest answers." />
          </div>
          <div className="divide-y divide-line border-y border-line md:col-span-8">
            {m.faq.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.25} />
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
