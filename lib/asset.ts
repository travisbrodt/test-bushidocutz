/** Prefixes a `/public` path with the deploy base path (e.g. `/test-bushidocutz` on GitHub Pages). */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
