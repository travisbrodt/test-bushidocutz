import { site } from "@/config/site";
import { Rating } from "@/components/ui/Rating";

export function ProofBar() {
  return (
    <section aria-label="Why Bushido Cutz" className="border-y border-line-light bg-ink-soft text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-6 md:px-8">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-[0.22em] text-paper/75">
          {site.home.proof.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span aria-hidden className="inline-block size-1.5 rotate-45 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        <Rating />
      </div>
    </section>
  );
}
