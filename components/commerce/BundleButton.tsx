"use client";

import type { Bundle } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useApp } from "@/components/providers/AppProvider";

export function BundleButton({ bundle, retail }: { bundle: Bundle; retail: number }) {
  const { openCheckout } = useApp();
  return (
    <button
      type="button"
      onClick={() =>
        openCheckout({
          kind: "product",
          title: bundle.name,
          subtitle: bundle.description,
          image: bundle.image,
          shipping: true,
          lines: [
            { label: `${bundle.name} bundle`, amount: retail },
            { label: "Bundle savings", amount: bundle.price - retail },
          ],
        })
      }
      className="bg-accent px-8 py-4.5 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]"
    >
      Get the bundle · {formatPrice(bundle.price)}
    </button>
  );
}
