import { cn } from "@/lib/format";

/** A hanko-style seal: the only place the accent color is used decoratively. */
export function Seal({
  text,
  size = "md",
  className,
}: {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = { sm: "size-9 text-sm", md: "size-12 text-lg", lg: "size-16 text-2xl" }[size];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[3px] bg-accent font-display font-semibold leading-none text-paper shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--paper)_25%,transparent)]",
        text.length > 1 && "[writing-mode:vertical-rl] tracking-tight",
        dims,
        className,
      )}
    >
      {text}
    </span>
  );
}
