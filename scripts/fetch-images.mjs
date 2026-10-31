#!/usr/bin/env node
// Downloads the studio's own photography from the current Zyro site into
// public/images with semantic names. Run: node scripts/fetch-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const CDN = "https://assets.zyrosite.com/cdn-cgi/image";
const SITE = "10cla0tW5b604rSM";

/** [output path, source filename, cloudflare image options] */
const images = [
  // Brand
  ["brand/mark.png", "photoroom-20241009_084525-2xN6nhF2181nDmoZ.png", "format=png,trim=374;212;42;228"],
  ["brand/wordmark.png", "photoroom-20241009_084525-2xN6nhF2181nDmoZ.png", "format=png,trim=225;90;685;150"],
  ["brand/calligraphy.jpg", "screenshot_20250401_103419_google-2-aYFZHSpmCubauSPF.jpg", "format=jpeg,w=900"],
  ["brand/card.jpg", "photoroom-20241009_075053-10-3g16f3zY0WaNix8s.jpg", "format=jpeg,w=1200"],

  // Studio
  ["studio/suite.jpg", "20250920_144517-tDZe7NRGgyWLNxMu.jpg", "format=jpeg,w=2000"],
  ["studio/michael-at-work.jpg", "screenshot_20250523_091015_video-player-1-1-A5REwvAlDyORVHQx.jpg", "format=jpeg,w=1400"],
  ["studio/virtues-wall.jpg", "screenshot_20250528_083838_gallery-GRpVXyeW880qxrnG.jpg", "format=jpeg,w=1800"],
  ["studio/shears.jpg", "20251206_094103-vj2WmuXXkPeVowsP.jpg", "format=jpeg,w=1400"],

  // Cuts
  ["cuts/side-fade-beard.jpg", "20250407_122236-2-RNtx2nDMrDRar9rZ.jpg", "format=jpeg,w=1500"],
  ["cuts/curly-beard.jpg", "20250605_174141-g1GpYoJ4pJBIDxYX.jpg", "format=jpeg,w=1400"],
  ["cuts/textured-crop.jpg", "20260114_110035-Q9WvMleNx4E3mxLk.jpg", "format=jpeg,w=1400"],
  ["cuts/french-crop.jpg", "20251115_112529-Sa51cguuY4PauyVb.jpg", "format=jpeg,w=1400"],
  ["cuts/mid-skin-fade.jpg", "20250730_123901-1-1-8kGbuHhVP7mrOXAf.jpg", "format=jpeg,w=1400"],
  ["cuts/womens-long.jpg", "20250515_135432-1-xPnylW3LO8RgpzSx.jpg", "format=jpeg,w=1400"],

  // Before / after graphics (kept as the owner designed them)
  ["transformations/taper.jpg", "book-your-appointment-today_20251110_123838_0000-HzEiM82XkSWWYgp9.png", "format=jpeg,w=1400"],
  ["transformations/beard-gentleman.jpg", "20250923_162920-JDU3ddVJ9fJXvdOt.jpg", "format=jpeg,w=1400"],
  ["transformations/silver-beard.jpg", "img_20250810_205042_717-80fL32OUpQpHa4BP.jpg", "format=jpeg,w=1400"],
  ["transformations/crop.jpg", "20250905_114450-DWZjPaVbq4jX2irO.jpg", "format=jpeg,w=1400"],
  ["transformations/skin-fade-beard.jpg", "20250709_130054-1-5eLHbiNEwqapxVxY.jpg", "format=jpeg,w=1400"],
  ["transformations/layered.jpg", "20250809_110309-2-7U3fEy86Wy353SKF.jpg", "format=jpeg,w=1400"],

  // Products
  ["products/matte-cream.jpg", "20251215_182535-fg9oeTqJ6ob1f8TN.jpg", "format=jpeg,w=1400"],
  ["products/product-line.jpg", "20260122_183112-DsoVTEzvrRrpbCEw.jpg", "format=jpeg,w=1600"],
];

let ok = 0;
for (const [out, file, opts] of images) {
  const url = `${CDN}/${opts}/${SITE}/${file}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`x ${out} (${res.status})`);
    continue;
  }
  const dest = join(root, out);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  ok++;
  console.log(`✓ ${out}`);
}
console.log(`\n${ok}/${images.length} images saved to public/images`);
