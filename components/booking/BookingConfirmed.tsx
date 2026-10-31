"use client";

import Link from "next/link";
import { CalendarPlus, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { formatDuration, formatPrice } from "@/lib/format";
import { downloadCalendarEvent } from "@/lib/booking/ics";
import { formatLongDate } from "@/lib/booking/time";
import type { BookableService, BookingConfirmation } from "@/lib/booking/types";
import { Seal } from "@/components/ui/Seal";

export function BookingConfirmed({
  confirmation,
  service,
  addOns,
  total,
  demo,
  onClose,
}: {
  confirmation: BookingConfirmation;
  service: BookableService;
  addOns: BookableService[];
  total: number;
  demo: boolean;
  onClose: () => void;
}) {
  const { slot } = confirmation;
  const pending = confirmation.status === "pending";
  const { address } = site.contact;
  const location = `${site.brand.name}, ${address.street} ${address.suite}, ${address.city}, ${address.region} ${address.postalCode}`;
  const services = [service.name, ...addOns.map((a) => a.name)].join(" + ");

  return (
    <div className="flex flex-col items-start gap-6 py-2">
      <Seal text="予約" size="lg" />
      <div>
        <h3 className="font-display text-3xl leading-tight">{pending ? "Request received." : "You're booked."}</h3>
        <p className="mt-3 text-stone">
          {pending
            ? "Michael confirms each request personally. You'll get a text as soon as it's locked in."
            : "Your chair is reserved. We'll see you soon."}
        </p>
      </div>

      <dl className="w-full divide-y divide-line border-y border-line text-sm">
        <Row label="When">
          {formatLongDate(slot.date)}, {slot.label}
        </Row>
        <Row label="Service">{services}</Row>
        <Row label="Length">{formatDuration(slot.duration)}</Row>
        <Row label="Total">{formatPrice(total)}</Row>
        <Row label="Where">
          {address.street}, {address.suite}
          <span className="block text-stone">{address.note}</span>
        </Row>
      </dl>

      <div className="flex w-full flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            downloadCalendarEvent({
              uid: confirmation.id,
              title: `${services} · ${site.brand.shortName}`,
              date: slot.date,
              start: slot.start,
              duration: slot.duration,
              location,
              description: `Booked with ${site.brand.owner.name}. Questions? ${site.contact.phone}`,
            })
          }
          className="inline-flex items-center gap-2 bg-ink px-5 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper"
        >
          <CalendarPlus className="size-4" /> Add to calendar
        </button>
        <a
          href={site.contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-ink/25 px-5 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] hover:border-ink"
        >
          <MapPin className="size-4" /> Directions
        </a>
      </div>

      {demo && (
        <p className="w-full border border-dashed border-line px-4 py-3 text-xs text-stone">
          Prototype: this booking wasn&apos;t sent to a real calendar.
        </p>
      )}

      <div className="w-full bg-ink p-6 text-paper">
        <p className="eyebrow text-paper/50">Coming back every few weeks?</p>
        <p className="mt-2 font-display text-xl">Members get priority booking and pay less per cut.</p>
        <Link href="/membership" onClick={onClose} className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-4">
          See The Dojo membership
        </Link>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 py-3">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
