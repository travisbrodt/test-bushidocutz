import type { ImageRef } from "./types";

export interface CheckoutLine {
  label: string;
  amount: number;
  note?: string;
}

export interface CheckoutRequest {
  kind: "membership" | "product" | "gift";
  title: string;
  subtitle?: string;
  image?: ImageRef;
  lines: CheckoutLine[];
  /** e.g. "month" or "8 weeks"; omitted for one-time purchases. */
  recurring?: string;
  /** Collect a shipping address (physical goods). */
  shipping?: boolean;
}

export function checkoutTotal(req: CheckoutRequest) {
  return req.lines.reduce((sum, l) => sum + l.amount, 0);
}

export function subscriptionPrice(price: number, discountPct: number) {
  return Math.round(price * (1 - discountPct / 100) * 100) / 100;
}
