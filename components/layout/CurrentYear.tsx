"use client";

import { useClientValue } from "@/lib/useClientValue";

export function CurrentYear() {
  const year = useClientValue(() => new Date().getFullYear(), null);
  return <span>{year ?? ""}</span>;
}
