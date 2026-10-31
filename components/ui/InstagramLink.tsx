import { site } from "@/config/site";
import { cn } from "@/lib/format";

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={cn("size-4", className)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramLink({ className }: { className?: string }) {
  const { handle, href } = site.integrations.instagram;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]", className)}
    >
      <InstagramIcon />@{handle}
    </a>
  );
}
