import { formatPrice, cn } from "@/lib/format";

const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export function Price({
  amount,
  placeholder,
  suffix,
  className,
}: {
  amount: number;
  placeholder?: boolean;
  suffix?: string;
  className?: string;
}) {
  const flagged = placeholder && showPlaceholders;
  return (
    <span className={cn("relative inline-flex items-baseline tabular-nums", className)}>
      {formatPrice(amount)}
      {suffix && <span className="ml-0.5 text-[0.6em] opacity-60">{suffix}</span>}
      {flagged && (
        <>
          <span
            aria-hidden
            title="Placeholder price, pending owner confirmation"
            className="ml-1 inline-block size-1.5 -translate-y-[0.6em] rounded-full bg-accent"
          />
          <span className="sr-only">(placeholder price)</span>
        </>
      )}
    </span>
  );
}

export function PlaceholderLegend({ className }: { className?: string }) {
  if (!showPlaceholders) return null;
  return (
    <p className={cn("flex items-center gap-2 text-xs opacity-60", className)}>
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-accent" />
      Placeholder pricing, pending confirmation
    </p>
  );
}
