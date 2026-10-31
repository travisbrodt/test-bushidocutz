import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  jp,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  jp?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-36 pb-16 md:grid-cols-12 md:px-8 md:pt-44 md:pb-24">
        <div className="md:col-span-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-stone">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1] tracking-tight text-balance">{title}</h1>
          </Reveal>
          {children && (
            <Reveal delay={0.16}>
              <div className="mt-8 max-w-xl text-lg leading-relaxed text-stone">{children}</div>
            </Reveal>
          )}
        </div>
        {aside && <div className="flex items-end md:col-span-4">{aside}</div>}
      </div>
      {jp && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-28 right-4 hidden font-display text-[9rem] leading-none text-ink/[0.05] [writing-mode:vertical-rl] md:block lg:right-10"
        >
          {jp}
        </span>
      )}
    </section>
  );
}
