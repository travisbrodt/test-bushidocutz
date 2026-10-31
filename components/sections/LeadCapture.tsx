"use client";

import { useState, type FormEvent } from "react";
import { site, servicesById } from "@/config/site";
import { Seal } from "@/components/ui/Seal";

const rebookable = site.services.filter((s) => s.rebookWeeks);

export function LeadCapture() {
  const { firstVisitOffer } = site;
  const [contact, setContact] = useState("");
  const [serviceId, setServiceId] = useState(rebookable[0]?.id ?? "");
  const [remind, setRemind] = useState(true);
  const [done, setDone] = useState(false);

  const weeks = servicesById[serviceId]?.rebookWeeks;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const leads = JSON.parse(localStorage.getItem("leads") ?? "[]");
    leads.push({ contact, serviceId, remindWeeks: remind ? weeks : null, at: new Date().toISOString() });
    localStorage.setItem("leads", JSON.stringify(leads));
    setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-8 md:py-32">
        <div>
          <Seal text="初" size="lg" />
          <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">{firstVisitOffer.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/65">{firstVisitOffer.body}</p>
        </div>

        {done ? (
          <div className="flex flex-col justify-center border border-line-light p-8 md:p-10" role="status">
            <p className="eyebrow text-paper/50">Received</p>
            <p className="mt-4 font-display text-3xl">Thank you. Your complimentary ritual is waiting.</p>
            <p className="mt-4 text-paper/60">
              Mention it when you book.
              {remind && weeks && ` We'll nudge you in about ${weeks} weeks when your cut is due.`}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col justify-center gap-5">
            <label className="block">
              <span className="eyebrow mb-3 block text-paper/50">Email or mobile number</span>
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="you@email.com or (503) 555-0123"
                autoComplete="email"
                className="w-full border-b border-paper/30 bg-transparent py-3 font-display text-2xl outline-none transition-colors placeholder:text-paper/25 focus:border-paper"
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block text-paper/50">What do you usually book?</span>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full appearance-none border-b border-paper/30 bg-transparent py-3 text-lg outline-none focus:border-paper [&>option]:text-ink"
              >
                {rebookable.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-paper/70">
              <input
                type="checkbox"
                checked={remind}
                onChange={(e) => setRemind(e.target.checked)}
                className="mt-0.5 size-4 accent-[var(--accent)]"
              />
              <span>
                Remind me when it&apos;s time to rebook
                {weeks && <span className="text-paper"> (every {weeks} weeks keeps this style sharp)</span>}
              </span>
            </label>
            <button
              type="submit"
              className="mt-3 self-start bg-accent px-8 py-4.5 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]"
            >
              Claim my first-visit ritual →
            </button>
            <p className="text-xs text-paper/40">No spam. Unsubscribe anytime. Reply STOP to opt out of texts.</p>
          </form>
        )}
      </div>
    </section>
  );
}
