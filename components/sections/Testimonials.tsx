import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { Rating } from "@/components/ui/Rating";

export function Testimonials() {
  const [lead, ...rest] = site.testimonials;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            In their words
          </p>
          <blockquote className="mt-8">
            <p className="font-display text-3xl leading-[1.25] tracking-tight text-balance md:text-[2.75rem]">
              &ldquo;{lead.quote}&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4 text-sm">
              <span aria-hidden className="h-px w-10 bg-ink/30" />
              <span>
                <span className="font-medium">{lead.author}</span>
                {lead.context && <span className="text-stone"> · {lead.context}</span>}
              </span>
            </footer>
          </blockquote>
        </Reveal>
        <div className="flex flex-col justify-end gap-10 md:col-span-4">
          {rest.map((t, i) => (
            <Reveal key={t.author} delay={0.1 + i * 0.1}>
              <blockquote className="border-t border-line pt-6">
                <p className="font-display text-xl leading-snug">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">
                  {t.author}
                  {t.context && ` · ${t.context}`}
                </footer>
              </blockquote>
            </Reveal>
          ))}
          <div className="border-t border-line pt-6">
            <p className="font-display text-5xl">{site.integrations.rating.score}</p>
            <Rating className="mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
