import { Star } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/format";

export function Rating({ className, compact }: { className?: string; compact?: boolean }) {
  const { score, count, source } = site.integrations.rating;
  return (
    <a
      href={site.integrations.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`Rated ${score} out of 5 from ${count} ${source} reviews`}
    >
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
        ))}
      </span>
      <span className="text-sm">
        <span className="font-medium">{score}</span>
        <span className="opacity-60">
          {" "}
          · {count} {source} reviews
        </span>
        {!compact && <span className="ml-2 opacity-60 transition-opacity group-hover:opacity-100">→</span>}
      </span>
    </a>
  );
}
