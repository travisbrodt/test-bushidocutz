import Image from "next/image";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/booking/BookButton";
import { Reveal } from "@/components/ui/Reveal";
import { Rating } from "@/components/ui/Rating";

export function Hero() {
  const { hero } = site.home;
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10 md:left-[38%]">
        <Photo image={hero.image} priority sizes="(min-width: 768px) 62vw, 100vw" className="h-full w-full" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/55 to-ink/30 md:bg-gradient-to-r md:from-ink md:via-ink/40 md:to-transparent" />
      </div>

      <div className="pointer-events-none absolute right-6 bottom-10 z-[3] hidden h-[42vh] w-24 opacity-85 mix-blend-screen md:block lg:right-12 lg:w-28">
        <Image src={site.brand.calligraphy.src} alt="" fill sizes="120px" className="object-contain" loading="eager" />
      </div>

      <div className="relative z-[4] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-32 pb-16 md:justify-center md:px-8 md:pb-24">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-paper/70">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] tracking-tight text-balance">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookButton size="lg" arrow />
              <Button href="/membership" variant="outline-light" size="lg">
                Join the Dojo
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <Rating className="text-paper" compact />
              <p className="text-xs uppercase tracking-[0.24em] text-paper/45">{site.contact.address.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
