import { site, servicesById } from "@/config/site";
import { formatDuration } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/booking/BookButton";

const numerals = ["一", "二", "三", "四", "五", "六", "七"];

export function RitualVIP() {
  const { ritual } = site.home;
  const service = servicesById[ritual.serviceId];

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:gap-16 md:px-8 md:py-36">
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Photo image={ritual.image} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5]" />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:pt-8">
          <p className="eyebrow flex items-center gap-3 text-paper/55">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {ritual.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">{ritual.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-paper/70 md:text-lg">
            {ritual.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ol className="mt-12 border-t border-line-light">
            {ritual.steps.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 0.06} className="flex items-baseline gap-6 border-b border-line-light py-5">
                <span aria-hidden className="w-8 font-display text-2xl text-accent">{numerals[i]}</span>
                <span className="font-display text-xl md:text-2xl">{step}</span>
              </Reveal>
            ))}
          </ol>

          {service && (
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <BookButton serviceId={service.id} size="lg" arrow>
                Book the VIP Experience
              </BookButton>
              <p className="text-sm text-paper/60">
                <Price amount={service.price} placeholder={service.placeholder} className="font-display text-2xl text-paper" />
                <span className="ml-3">{formatDuration(service.durationMin)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
