import { site } from "@/config/site";
import { spotsRemaining } from "@/lib/membership";
import { cn } from "@/lib/format";

export function FoundingMeter({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const m = site.membership;
  const remaining = spotsRemaining(m);
  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="flex items-baseline justify-between text-sm">
        <span className={tone === "dark" ? "text-paper/70" : "text-stone"}>Founding memberships</span>
        <span className="font-display text-lg">
          <span className="text-accent">{remaining}</span> of {m.foundingCap} left
        </span>
      </div>
      <div
        className={cn("mt-3 grid h-2 gap-[2px]", tone === "dark" ? "bg-transparent" : "")}
        style={{ gridTemplateColumns: `repeat(${m.foundingCap}, minmax(0, 1fr))` }}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={m.foundingCap}
        aria-valuenow={m.foundingClaimed}
        aria-label={`${m.foundingClaimed} of ${m.foundingCap} founding memberships claimed`}
      >
        {Array.from({ length: m.foundingCap }, (_, i) => (
          <span
            key={i}
            className={cn(
              i < m.foundingClaimed ? (tone === "dark" ? "bg-paper" : "bg-ink") : tone === "dark" ? "bg-paper/15" : "bg-ink/10",
            )}
          />
        ))}
      </div>
    </div>
  );
}
