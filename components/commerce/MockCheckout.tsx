"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { checkoutTotal, type CheckoutRequest } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { Photo } from "@/components/ui/Photo";
import { Seal } from "@/components/ui/Seal";

const successCopy: Record<CheckoutRequest["kind"], { seal: string; title: string; body: string }> = {
  membership: {
    seal: "道場",
    title: "Welcome to the Dojo.",
    body: "Your founding membership is reserved. Michael will reach out within a day to lock in your recurring time.",
  },
  product: {
    seal: "済",
    title: "Order confirmed.",
    body: "A confirmation is on its way to your inbox. Local orders can be picked up at your next visit.",
  },
  gift: {
    seal: "贈",
    title: "Gift sent.",
    body: "The gift card is on its way. It never expires and works for any service or product.",
  },
};

export function MockCheckout({ request, onClose }: { request: CheckoutRequest | null; onClose: () => void }) {
  return (
    <Drawer
      open={!!request}
      onClose={onClose}
      eyebrow="Secure checkout · Prototype"
      title={request?.title ?? "Checkout"}
    >
      {request && <CheckoutBody key={request.title} request={request} onClose={onClose} />}
    </Drawer>
  );
}

function CheckoutBody({ request, onClose }: { request: CheckoutRequest; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const total = checkoutTotal(request);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1100);
  };

  if (status === "done") {
    const copy = successCopy[request.kind];
    return (
      <div className="flex flex-col items-start gap-6 py-6">
        <Seal text={copy.seal} size="lg" />
        <h3 className="font-display text-3xl">{copy.title}</h3>
        <p className="text-stone">{copy.body}</p>
        <button type="button" onClick={onClose} className="bg-ink px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-paper">
          Done
        </button>
        <p className="text-xs text-stone">Prototype: no payment was processed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="flex gap-4">
        {request.image && <Photo image={request.image} className="size-20 shrink-0" sizes="80px" />}
        <div className="min-w-0 flex-1">
          {request.subtitle && <p className="text-sm text-stone">{request.subtitle}</p>}
          <ul className="mt-2 space-y-1 text-sm">
            {request.lines.map((l) => (
              <li key={l.label} className="flex justify-between gap-6">
                <span>
                  {l.label}
                  {l.note && <span className="block text-xs text-stone">{l.note}</span>}
                </span>
                <span className="tabular-nums">{l.amount < 0 ? `−${formatPrice(-l.amount, { cents: true })}` : formatPrice(l.amount, { cents: !Number.isInteger(l.amount) })}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-baseline justify-between border-y border-line py-4">
        <span className="eyebrow text-stone">{request.recurring ? `Billed every ${request.recurring}` : "Total"}</span>
        <span className="font-display text-3xl tabular-nums">{formatPrice(total, { cents: !Number.isInteger(total) })}</span>
      </div>

      <fieldset className="space-y-3">
        <legend className="eyebrow mb-3 text-stone">Your details</legend>
        <Field label="Full name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Mobile (for appointment texts)" name="tel" type="tel" autoComplete="tel" />
      </fieldset>

      {request.shipping && (
        <fieldset className="space-y-3">
          <legend className="eyebrow mb-3 text-stone">Delivery</legend>
          <Field label="Street address" name="street" autoComplete="street-address" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" name="city" autoComplete="address-level2" />
            <Field label="ZIP" name="zip" autoComplete="postal-code" />
          </div>
          <p className="text-xs text-stone">Leave blank to pick up at your next visit.</p>
        </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow mb-3 text-stone">Payment</legend>
        <div className="flex items-center gap-3 border border-dashed border-ink/25 p-4 text-sm text-stone">
          <Lock className="size-4 shrink-0" />
          Card entry would load here from a payment provider. This prototype doesn&apos;t collect payment.
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "processing"}
        className="w-full bg-accent py-4.5 text-xs font-medium uppercase tracking-[0.22em] text-paper disabled:opacity-60"
      >
        {status === "processing"
          ? "Processing…"
          : request.kind === "membership"
            ? "Start membership"
            : request.recurring
              ? "Start subscription"
              : "Complete purchase"}
      </button>
      {request.recurring && <p className="text-center text-xs text-stone">Pause or cancel anytime. No contracts.</p>}
    </form>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-stone">{label}</span>
      <input
        {...props}
        className="w-full border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors placeholder:text-stone/60 focus:border-ink"
      />
    </label>
  );
}
