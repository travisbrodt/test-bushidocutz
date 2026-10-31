"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";
import { formatLongDate, parseDate, shopNow } from "@/lib/booking/time";
import type { AvailableDay, TimeSlot } from "@/lib/booking/types";

const PERIODS = [
  { label: "Morning", from: 0, to: 12 * 60 },
  { label: "Afternoon", from: 12 * 60, to: 17 * 60 },
  { label: "Evening", from: 17 * 60, to: 24 * 60 },
];

export function TimeStep({
  month,
  days,
  error,
  date,
  slot,
  canPrev,
  canNext,
  onMonth,
  onRetry,
  onDate,
  onSlot,
}: {
  month?: { year: number; month: number };
  days: AvailableDay[] | null;
  error: string | null;
  date?: string;
  slot?: TimeSlot;
  canPrev: boolean;
  canNext: boolean;
  onMonth: (delta: number) => void;
  onRetry: () => void;
  onDate: (date: string) => void;
  onSlot: (slot: TimeSlot) => void;
}) {
  const today = shopNow().date;
  const visible = days?.filter((d) => d.date >= today) ?? [];
  const day = days?.find((d) => d.date === date);
  const monthLabel = month
    ? new Date(Date.UTC(month.year, month.month - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : "";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl">{monthLabel}</h3>
        <div className="flex gap-1">
          <MonthButton label="Previous month" disabled={!canPrev || !days} onClick={() => onMonth(-1)}>
            <ChevronLeft className="size-4" />
          </MonthButton>
          <MonthButton label="Next month" disabled={!canNext || !days} onClick={() => onMonth(1)}>
            <ChevronRight className="size-4" />
          </MonthButton>
        </div>
      </div>

      {error ? (
        <div className="space-y-3">
          <p className="text-sm text-accent">{error}</p>
          <button type="button" onClick={onRetry} className="text-xs uppercase tracking-[0.2em] underline underline-offset-4">
            Try again
          </button>
        </div>
      ) : !days ? (
        <div aria-busy="true" aria-label="Loading availability" className="space-y-6">
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="h-[68px] w-14 shrink-0 animate-pulse bg-paper-deep/70" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="h-11 animate-pulse bg-paper-deep/70" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            role="radiogroup"
            aria-label="Day"
            className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((d) => {
              const dt = parseDate(d.date);
              const selected = d.date === date;
              return (
                <button
                  key={d.date}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={formatLongDate(d.date)}
                  disabled={!d.available}
                  onClick={() => onDate(d.date)}
                  className={cn(
                    "flex w-14 shrink-0 snap-start flex-col items-center gap-1 border py-3 transition-colors",
                    selected ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40",
                    !d.available && "border-transparent text-stone/40 line-through hover:border-transparent",
                  )}
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.15em]">
                    {dt.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" })}
                  </span>
                  <span className="font-display text-xl leading-none">{dt.getUTCDate()}</span>
                </button>
              );
            })}
          </div>

          {!visible.some((d) => d.available) ? (
            <p className="text-sm text-stone">
              No openings left this month.{" "}
              {canNext && (
                <button type="button" onClick={() => onMonth(1)} className="underline underline-offset-4">
                  See next month
                </button>
              )}
            </p>
          ) : day ? (
            <div className="space-y-6">
              <p className="text-sm text-stone">{formatLongDate(day.date)}</p>
              {PERIODS.map((p) => {
                const slots = day.slots.filter((s) => s.start >= p.from && s.start < p.to);
                if (!slots.length) return null;
                return (
                  <div key={p.label}>
                    <p className="eyebrow mb-3 text-stone">{p.label}</p>
                    <div role="radiogroup" aria-label={`${p.label} times`} className="grid grid-cols-3 gap-2">
                      {slots.map((s) => {
                        const selected = slot?.date === s.date && slot.start === s.start;
                        return (
                          <button
                            key={s.start}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onSlot(s)}
                            className={cn(
                              "border py-3 text-sm tabular-nums transition-colors",
                              selected ? "border-accent bg-accent text-paper" : "border-line hover:border-ink/40",
                            )}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-stone">Pick a day to see open times.</p>
          )}
        </>
      )}
    </div>
  );
}

function MonthButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 items-center justify-center border border-line transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line"
    >
      {children}
    </button>
  );
}
