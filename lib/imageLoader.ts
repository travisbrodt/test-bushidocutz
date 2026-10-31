import { asset } from "./asset";

/** Static hosting has no image optimizer, so serve the original file. `w` keeps each srcset entry distinct. */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  return src.startsWith("/") ? `${asset(src)}?w=${width}` : src;
}
