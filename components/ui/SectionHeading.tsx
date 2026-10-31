import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", tone === "dark" ? "text-paper/60" : "text-stone")}>
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">{title}</h2>
      {children && (
        <div className={cn("mt-6 text-base leading-relaxed text-pretty md:text-lg", tone === "dark" ? "text-paper/70" : "text-stone")}>
          {children}
        </div>
      )}
    </div>
  );
}
