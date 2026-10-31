"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { cn, formatPrice } from "@/lib/format";
import { useApp } from "@/components/providers/AppProvider";

export function GiftCardBuilder() {
  const { amounts, image } = site.giftCards;
  const { openCheckout } = useApp();
  const [amount, setAmount] = useState(amounts[1] ?? amounts[0]);
  const [custom, setCustom] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState<"email" | "print">("email");

  const value = custom ? Math.max(10, Number(custom) || 0) : amount;
  const matchedService = site.services.find((s) => s.price === value);

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-4 text-stone">Amount</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {amounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setCustom("");
              }}
              aria-pressed={!custom && amount === a}
              className={cn(
                "border py-4 font-display text-2xl transition-colors",
                !custom && amount === a ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40",
              )}
            >
              {formatPrice(a)}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-3 border border-line px-4 focus-within:border-ink">
          <span className="text-stone">$</span>
          <input
            inputMode="numeric"
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-transparent py-3.5 text-sm outline-none"
          />
        </label>
        {matchedService && <p className="mt-3 text-sm text-stone">Covers a {matchedService.name}.</p>}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="eyebrow mb-4 text-stone">For</legend>
        <input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's name"
          aria-label="Recipient's name"
          className="w-full border border-line bg-transparent px-4 py-3.5 text-sm outline-none focus:border-ink"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A short note (optional)"
          aria-label="Gift message (optional)"
          rows={3}
          className="w-full resize-none border border-line bg-transparent px-4 py-3.5 text-sm outline-none focus:border-ink"
        />
        <div className="flex gap-2">
          {(["email", "print"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDelivery(d)}
              aria-pressed={delivery === d}
              className={cn(
                "flex-1 border py-3 text-xs uppercase tracking-[0.2em] transition-colors",
                delivery === d ? "border-ink bg-ink text-paper" : "border-line",
              )}
            >
              {d === "email" ? "Email it" : "Pick up in suite"}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() =>
          openCheckout({
            kind: "gift",
            title: "Gift card",
            subtitle: recipient ? `For ${recipient}` : site.brand.name,
            image,
            lines: [
              {
                label: `${site.brand.shortName} gift card`,
                amount: value,
                note: delivery === "email" ? "Delivered by email" : "Pick up in the suite",
              },
            ],
          })
        }
        className="w-full bg-accent py-4.5 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]"
      >
        Send a {formatPrice(value)} gift card →
      </button>
    </div>
  );
}
