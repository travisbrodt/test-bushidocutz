"use client";

import { formatDuration, formatPrice } from "@/lib/format";
import { formatLongDate } from "@/lib/booking/time";
import type { BookableService, TimeSlot } from "@/lib/booking/types";

export interface DetailsForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note: string;
  /** Honeypot, hidden from people. */
  company: string;
}

const field = "w-full border border-line bg-transparent px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink";

export function DetailsStep({
  form,
  onChange,
  onSubmit,
  error,
  summary,
}: {
  form: DetailsForm;
  onChange: (patch: Partial<DetailsForm>) => void;
  onSubmit: () => void;
  error: string | null;
  summary: { service: BookableService; addOns: BookableService[]; slot: TimeSlot; total: number };
}) {
  const { service, addOns, slot, total } = summary;
  return (
    <form
      id="booking-details"
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="border border-line p-5">
        <p className="font-display text-xl leading-tight">
          {formatLongDate(slot.date)} · {slot.label}
        </p>
        <p className="mt-2 text-sm text-stone">
          {[service.name, ...addOns.map((a) => a.name)].join(" + ")}
        </p>
        <p className="mt-3 flex justify-between border-t border-line pt-3 text-sm">
          <span className="text-stone">{formatDuration(slot.duration)}</span>
          <span>{formatPrice(total)}</span>
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className="eyebrow mb-3 text-stone">Your details</legend>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" required>
            <input required autoComplete="given-name" value={form.firstName} onChange={(e) => onChange({ firstName: e.target.value })} className={field} />
          </Field>
          <Field label="Last name">
            <input autoComplete="family-name" value={form.lastName} onChange={(e) => onChange({ lastName: e.target.value })} className={field} />
          </Field>
        </div>
        <Field label="Mobile" required hint="For your confirmation and reminder texts.">
          <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => onChange({ phone: e.target.value })} className={field} />
        </Field>
        <Field label="Email">
          <input type="email" autoComplete="email" value={form.email} onChange={(e) => onChange({ email: e.target.value })} className={field} />
        </Field>
        <Field label="Anything Michael should know?">
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => onChange({ note: e.target.value })}
            placeholder="A reference photo you'll bring, a first visit, sensitive skin…"
            className={`${field} resize-none`}
          />
        </Field>
        <div aria-hidden className="hidden">
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => onChange({ company: e.target.value })} />
          </label>
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="border-l-2 border-accent bg-accent/5 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <p className="text-xs text-stone">Need to change plans? Give 24 hours&apos; notice and we&apos;ll happily rebook.</p>
    </form>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-stone">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-stone">{hint}</span>}
    </label>
  );
}
