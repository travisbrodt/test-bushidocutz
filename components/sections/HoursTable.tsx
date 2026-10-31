"use client";

import { site } from "@/config/site";
import { cn, formatHours } from "@/lib/format";
import { useClientValue } from "@/lib/useClientValue";

const todayInStudio = () =>
  new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/Los_Angeles" });

export function HoursTable() {
  const today = useClientValue(todayInStudio, null);

  return (
    <dl className="divide-y divide-line border-y border-line">
      {site.contact.hours.map((h) => {
        const isToday = h.day === today;
        return (
          <div key={h.day} className={cn("flex items-center justify-between py-3 text-sm", isToday && "font-medium")}>
            <dt className="flex items-center gap-3">
              {h.day}
              {isToday && <span className="bg-accent px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-paper">Today</span>}
            </dt>
            <dd className={h.closed ? "text-stone/70" : ""}>{formatHours(h)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
