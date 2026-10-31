"use client";

import { MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { useApp } from "@/components/providers/AppProvider";

export function StickyMobileBar() {
  const { openBooking, bookingOpen } = useApp();
  if (bookingOpen) return null;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1fr_1.6fr] border-t border-line-light bg-ink/95 pb-[env(safe-area-inset-bottom)] text-paper backdrop-blur md:hidden"
    >
      <a href={site.contact.phoneHref} className="flex flex-col items-center justify-center gap-1 py-3 text-[0.65rem] uppercase tracking-[0.18em]">
        <Phone className="size-4" strokeWidth={1.5} />
        Call
      </a>
      <a
        href={site.contact.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 border-x border-line-light py-3 text-[0.65rem] uppercase tracking-[0.18em]"
      >
        <MapPin className="size-4" strokeWidth={1.5} />
        Directions
      </a>
      <button
        type="button"
        onClick={() => openBooking()}
        className="m-2 bg-accent text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper"
      >
        Book now
      </button>
    </nav>
  );
}
