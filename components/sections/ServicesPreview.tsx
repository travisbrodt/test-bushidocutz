import { site } from "@/config/site";
import type { Service } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/booking/BookButton";

export function ServicesPreview() {
  const featured = site.services.filter((s) => s.featured && s.id !== site.home.ritual.serviceId);

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow="The menu" title="Crafted with discipline. Priced with sincerity.">
          <p>Every service is one-on-one, in a private suite, with the time it deserves. No conveyor belt, no rush.</p>
        </SectionHeading>
        <Button href="/services" variant="outline" arrow className="self-start md:self-auto">
          Full menu & pricing
        </Button>
      </div>

      <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
        {featured.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="bg-paper">
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col">
      {service.image ? (
        <Photo
          image={service.image}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="aspect-[4/5]"
          imgClassName="transition-transform duration-[1.4s] ease-calm group-hover:scale-[1.04]"
        />
      ) : (
        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-ink text-paper">
          <span aria-hidden className="font-display text-[9rem] leading-none text-paper/90">刃</span>
          <span className="eyebrow absolute bottom-6 left-6 text-paper/50">{service.kicker}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        {service.kicker && <p className="eyebrow text-stone">{service.kicker}</p>}
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight">{service.name}</h3>
          <Price amount={service.price} placeholder={service.placeholder} className="font-display text-2xl" />
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">{service.summary}</p>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="text-xs uppercase tracking-[0.18em] text-stone">{formatDuration(service.durationMin)}</span>
          <BookButton serviceId={service.id} variant="text" size="sm" arrow>
            Book
          </BookButton>
        </div>
      </div>
    </article>
  );
}
