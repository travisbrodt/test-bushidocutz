import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/format";

/** The Bushido crest. `tone` is the color of the background it sits on. */
export function Mark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("relative inline-block aspect-[640/664]", className)}>
      <Image
        src={site.brand.mark.src}
        alt=""
        fill
        sizes="96px"
        className={cn("object-contain", tone === "dark" ? "invert mix-blend-screen" : "mix-blend-multiply")}
      />
    </span>
  );
}

export function Wordmark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("relative inline-block aspect-[840/170]", className)}>
      <Image
        src={site.brand.logo.src}
        alt={site.brand.shortName}
        fill
        sizes="240px"
        loading="eager"
        className={cn("object-contain", tone === "dark" ? "invert mix-blend-screen" : "mix-blend-multiply")}
      />
    </span>
  );
}
