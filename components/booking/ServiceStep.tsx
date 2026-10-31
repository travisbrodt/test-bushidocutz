"use client";

import { useEffect, useRef } from "react";
import { Check, Clock } from "lucide-react";
import { cn, formatDuration } from "@/lib/format";
import type { BookingCatalog } from "@/lib/booking/types";
import { Price } from "@/components/ui/Price";

export function ServiceStep({
  catalog,
  serviceId,
  addOnIds,
  barberId,
  onService,
  onToggleAddOn,
  onBarber,
  scrollToAddOns,
}: {
  catalog: BookingCatalog;
  /** Jump straight to add-ons when the drawer opened with a service already chosen. */
  scrollToAddOns?: boolean;
  serviceId?: string;
  addOnIds: string[];
  barberId?: string;
  onService: (id: string) => void;
  onToggleAddOn: (id: string) => void;
  onBarber: (id: string | undefined) => void;
}) {
  const addOnsRef = useRef<HTMLFieldSetElement>(null);
  const service = catalog.groups.flatMap((g) => g.services).find((s) => s.id === serviceId);

  useEffect(() => {
    if (scrollToAddOns) addOnsRef.current?.scrollIntoView({ block: "start" });
  }, [scrollToAddOns]);

  return (
    <div className="space-y-8">
      {catalog.barbers.length > 1 && (
        <fieldset>
          <legend className="eyebrow mb-3 text-stone">Barber</legend>
          <div className="flex flex-wrap gap-2">
            {[{ id: undefined, name: "Any available" }, ...catalog.barbers].map((b) => (
              <button
                key={b.id ?? "any"}
                type="button"
                aria-pressed={barberId === b.id}
                onClick={() => onBarber(b.id)}
                className={cn(
                  "border px-4 py-2.5 text-sm transition-colors",
                  barberId === b.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40",
                )}
              >
                {b.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {catalog.groups.map((group) => (
        <fieldset key={group.id}>
          <legend className="eyebrow mb-3 text-stone">{group.name}</legend>
          <div className="space-y-2">
            {group.services.map((s) => {
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
                    onChange={() => {
                      onService(s.id);
                      requestAnimationFrame(() => addOnsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
                    }}
                    className="sr-only"
                  />
                  <span className={cn("mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border", selected ? "border-paper" : "border-ink/30")}>
                    {selected && <span className="size-2 rounded-full bg-accent" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-lg leading-tight">{s.name}</span>
                      <Price amount={s.price} placeholder={s.placeholder} className="text-base" />
                    </span>
                    <span className={cn("mt-1 flex items-center gap-1.5 text-xs", selected ? "text-paper/60" : "text-stone")}>
                      <Clock className="size-3 shrink-0" />
                      <span className="whitespace-nowrap">{formatDuration(s.durationMin)}</span>
                      {s.description && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="line-clamp-1">{s.description}</span>
                        </>
                      )}
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
          {service.addOns.length ? (
            <>
              <p className="mb-3 text-sm text-stone">Small rituals that honor the guest in the chair.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {service.addOns.map((a) => {
                  const checked = addOnIds.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={cn(
                        "flex cursor-pointer flex-col gap-1 border p-4 transition-colors",
                        checked ? "border-accent bg-accent/5" : "border-line hover:border-ink/40",
                      )}
                    >
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggleAddOn(a.id)} />
                      <span className="flex items-center justify-between gap-2 text-sm font-medium">
                        {a.name}
                        <span className={cn("flex size-4 shrink-0 items-center justify-center border", checked ? "border-accent bg-accent text-paper" : "border-ink/30")}>
                          {checked && <Check className="size-3" strokeWidth={3} />}
                        </span>
                      </span>
                      {a.description && <span className="line-clamp-2 text-xs text-stone">{a.description}</span>}
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
  );
}
