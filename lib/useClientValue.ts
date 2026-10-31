"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Reads a browser-only value (time, locale) without a hydration mismatch. */
export function useClientValue<T>(getValue: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, getValue, () => serverValue);
}
