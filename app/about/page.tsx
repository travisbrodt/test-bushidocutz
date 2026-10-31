import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/booking/BookButton";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Michael Hedden",
  description: `${site.brand.owner.name}, Master Barber and owner of ${site.brand.name}: precision, discipline and the code of Bushido in a private Beaverton suite.`,
};

export default function AboutPage() {
  const { story, principles, brand } = site;
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-32 pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pt-44 md:pb-28">
          <div className="flex flex-col justify-end md:col-span-6">
            <p className="eyebrow flex items-center gap-3 text-paper/55">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              About · {brand.owner.title}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[1] tracking-tight">{brand.owner.name}</h1>
            <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-paper/80">{story.lede}</p>
          </div>
          <div className="relative md:col-span-6">
            <Photo image={story.portrait} priority sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5]" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-64 w-20 mix-blend-screen md:block">
              <Image src={brand.calligraphy.src} alt="" fill sizes="80px" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-4">
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            The name
          </p>
          <p className="mt-6 font-display text-7xl leading-none">{brand.jp}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-stone">Bushidō · The way of the warrior</p>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-stone md:col-span-7 md:col-start-6">
          {story.paragraphs.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-px bg-line md:grid-cols-2">
        {story.detailImages.map((img) => (
          <Photo key={img.src} image={img} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        ))}
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading eyebrow="On the wall of the suite" title="The Seven Virtues, practiced in the chair.">
            <p>The code that hangs beneath the katanas in the studio isn&apos;t decoration. Each virtue maps to a promise.</p>
          </SectionHeading>
          <ol className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.romaji} delay={(i % 4) * 0.06} className="bg-paper-deep p-8">
                <span aria-hidden className="font-display text-5xl">{p.jp}</span>
                <p className="mt-6 eyebrow text-stone">
                  {p.romaji} · {p.meaning}
                </p>
                <p className="mt-3 font-display text-lg leading-snug">{p.practice}</p>
              </Reveal>
            ))}
            <li className="flex flex-col justify-between bg-ink p-8 text-paper">
              <p className="font-display text-2xl leading-snug">Experience the code for yourself.</p>
              <BookButton className="mt-8 self-start" size="sm" arrow>
                Book
              </BookButton>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Our commitment" title="Quality over quantity. Always." />
          <div className="mt-10 flex flex-wrap gap-3">
            <BookButton size="lg" arrow />
            <Button href="/membership" variant="outline" size="lg">
              Join the Dojo
            </Button>
          </div>
        </div>
        <ul className="divide-y divide-line border-y border-line md:col-span-6 md:col-start-7">
          {story.commitments.map((c, i) => (
            <li key={c} className="flex items-baseline gap-6 py-5">
              <span className="font-display text-sm text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl">{c}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
