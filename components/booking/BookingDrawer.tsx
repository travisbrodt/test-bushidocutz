"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Clock, ExternalLink } from "lucide-react";
import { site, servicesById } from "@/config/site";
import type { ServiceCategory } from "@/lib/types";
import { cn, formatDuration, formatPrice } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { Price } from "@/components/ui/Price";
import { Seal } from "@/components/ui/Seal";

const categoryLabels: Record<ServiceCategory, string> = {
  cuts: "Cuts",
  beard: "Beard",
  rituals: "Rituals",
  women: "Women",
  kids: "Kids",
};

/** Services that already include every add-on. */
const ALL_INCLUSIVE = new Set(["vip"]);

export function BookingDrawer({
  open,
  initialServiceId,
  onClose,
}: {
  open: boolean;
  initialServiceId?: string;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} eyebrow="Book with Michael" title="Your appointment">
      {open && <BookingFlow key={initialServiceId ?? "none"} initialServiceId={initialServiceId} onClose={onClose} />}
    </Drawer>
  );
}

function BookingFlow({ initialServiceId, onClose }: { initialServiceId?: string; onClose: () => void }) {
  const [serviceId, setServiceId] = useState<string | undefined>(
    initialServiceId && servicesById[initialServiceId] ? initialServiceId : undefined,
  );
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [handedOff, setHandedOff] = useState(false);
  const addOnsRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (initialServiceId) addOnsRef.current?.scrollIntoView({ block: "start" });
  }, [initialServiceId]);

  const selectService = (id: string) => {
    setServiceId(id);
    requestAnimationFrame(() => addOnsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const service = serviceId ? servicesById[serviceId] : undefined;
  const addOnsAllowed = service && !ALL_INCLUSIVE.has(service.id);
  const chosenAddOns = addOnsAllowed ? site.addOns.filter((a) => addOnIds.includes(a.id)) : [];
  const total = (service?.price ?? 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);
  const duration = (service?.durationMin ?? 0) + chosenAddOns.reduce((s, a) => s + a.durationMin, 0);

  const grouped = useMemo(() => {
    const map = new Map<ServiceCategory, typeof site.services>();
    for (const s of site.services) map.set(s.category, [...(map.get(s.category) ?? []), s]);
    return [...map.entries()];
  }, []);

  const memberTier = site.membership.tiers.find((t) => t.includes.some((i) => i.label.includes("Men's Precision Cut")));
  const showMemberNudge = service && ["mens-cut", "cut-beard"].includes(service.id) && memberTier;

  const continueToSchedule = () => {
    window.open(site.integrations.bookingUrl, "_blank", "noopener,noreferrer");
    setHandedOff(true);
  };

  if (handedOff && service) {
    return (
      <div className="flex flex-col items-start gap-6 py-4">
        <Seal text="予約" size="lg" />
        <div>
          <h3 className="font-display text-3xl leading-tight">Almost there.</h3>
          <p className="mt-3 text-stone">
            Our scheduler opened in a new tab. Choose <strong className="text-ink">{service.name}</strong>
            {chosenAddOns.length > 0 && <> and mention {chosenAddOns.map((a) => a.name).join(", ")}</>} when you pick your time.
          </p>
        </div>
        <dl className="w-full divide-y divide-line border-y border-line text-sm">
          <div className="flex justify-between py-3"><dt className="text-stone">Estimated time</dt><dd>{formatDuration(duration)}</dd></div>
          <div className="flex justify-between py-3"><dt className="text-stone">Estimated total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        <a href={site.integrations.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">
          Scheduler didn&apos;t open? Open it here <ExternalLink className="size-3.5" />
        </a>
        {showMemberNudge && (
          <div className="w-full bg-ink p-6 text-paper">
            <p className="eyebrow text-paper/50">Coming back every few weeks?</p>
            <p className="mt-2 font-display text-xl">Members get priority booking and pay less per cut.</p>
            <Link href="/membership" onClick={onClose} className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-4">
              See The Dojo membership
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="space-y-8">
        {grouped.map(([category, services]) => (
          <fieldset key={category}>
            <legend className="eyebrow mb-3 text-stone">{categoryLabels[category]}</legend>
            <div className="space-y-2">
              {services.map((s) => {
                const selected = s.id === serviceId;
                return (
                  <label
                    key={s.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-4 border p-4 transition-colors",
                      selected ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={selected}
                      onChange={() => selectService(s.id)}
                      className="sr-only"
                    />
                    <span className={cn("mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border", selected ? "border-paper" : "border-ink/30")}>
                      {selected && <span className="size-2 rounded-full bg-accent" />}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-lg leading-tight">{s.name}</span>
                        <Price amount={s.price} placeholder={s.placeholder} className="text-base" />
                      </span>
                      <span className={cn("mt-1 flex items-center gap-1.5 text-xs", selected ? "text-paper/60" : "text-stone")}>
                        <Clock className="size-3" /> {formatDuration(s.durationMin)}
                        <span aria-hidden>·</span>
                        <span className="line-clamp-1">{s.summary}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        {service && (
          <fieldset ref={addOnsRef} className="scroll-mt-4">
            <legend className="eyebrow mb-1 text-stone">Omotenashi add-ons</legend>
            {addOnsAllowed ? (
              <>
                <p className="mb-3 text-sm text-stone">Small rituals that honor the guest in the chair.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {site.addOns.map((a) => {
                    const checked = addOnIds.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={cn(
                          "flex cursor-pointer flex-col gap-1 border p-4 transition-colors",
                          checked ? "border-accent bg-accent/5" : "border-line hover:border-ink/40",
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            setAddOnIds((ids) => (checked ? ids.filter((id) => id !== a.id) : [...ids, a.id]))
                          }
                        />
                        <span className="flex items-center justify-between gap-2 text-sm font-medium">
                          {a.name}
                          <span className={cn("flex size-4 items-center justify-center border", checked ? "border-accent bg-accent text-paper" : "border-ink/30")}>
                            {checked && <Check className="size-3" strokeWidth={3} />}
                          </span>
                        </span>
                        <span className="text-xs text-stone">{a.description}</span>
                        <span className="mt-1 text-xs">
                          + <Price amount={a.price} placeholder={a.placeholder} /> · {a.durationMin} min
                        </span>
                      </label>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-sm text-stone">Every ritual is already included in {service.name}.</p>
            )}
          </fieldset>
        )}
      </div>

      <div className="sticky bottom-0 -mx-6 mt-8 border-t border-line bg-paper px-6 pt-5 pb-1 md:-mx-8 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow whitespace-nowrap text-stone">Est. total</p>
            <p className="font-display text-3xl tabular-nums">{formatPrice(total)}</p>
            <p className="text-xs text-stone">{service ? formatDuration(duration) : "Select a service"}</p>
          </div>
          <button
            type="button"
            disabled={!service}
            onClick={continueToSchedule}
            className="shrink-0 whitespace-nowrap bg-accent px-5 py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper transition-opacity disabled:opacity-30 md:px-6"
          >
            Choose a time →
          </button>
        </div>
        <p className="mt-3 text-[0.7rem] text-stone">Times and payment are confirmed on our secure scheduler.</p>
      </div>
    </div>
  );
}
