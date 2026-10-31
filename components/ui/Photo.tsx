import Image from "next/image";
import type { ImageRef } from "@/lib/types";
import { cn } from "@/lib/format";

export function Photo({
  image,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  fit = "cover",
}: {
  image: ImageRef;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-soft", !image.ungraded && "grain", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={priority}
        loading={priority ? "eager" : undefined}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", !image.ungraded && "graded", imgClassName)}
        style={{
          objectPosition: image.position,
          ...(image.zoom && { scale: String(image.zoom), transformOrigin: image.position ?? "center" }),
        }}
      />
    </div>
  );
}
