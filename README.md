# Bushido Cutz Hair Studio: website redesign prototype

A redesign prototype for [Bushido Cutz Hair Studio](https://www.bushidocutz.com), the private barber suite run by Master Barber Michael Hedden inside Sola Salons in Beaverton, Oregon.

**Live preview:** https://travisbrodt.github.io/test-bushidocutz/

> This is a prototype for review. Prices marked with a red dot are placeholders, and the membership, subscription and gift card checkouts are realistic mockups. No payment is collected.

## What's in it

| Page | Purpose |
| --- | --- |
| Home | Hero, Google rating, featured services, the VIP Omotenashi ritual, membership teaser, gallery, house product, testimonials, location and a first-visit offer |
| Services | Full menu by category, add-ons and a membership savings callout |
| Membership | "The Dojo" monthly tiers (Ronin, Samurai, Shogun), founding-member meter, savings table and FAQ |
| Shop | Bushido products with subscribe-and-save, a bundle, and the 440C shears |
| Gift cards | Preset or custom amounts, recipient, message and delivery |
| Gallery | Filterable cuts, transformations and studio photos with a lightbox |
| About | Michael's story and the Seven Virtues of Bushido |

**Ways the site earns or captures revenue:**

- **Booking:** a slide-out drawer to pick a service and add-ons with a running total, then a handoff to the existing Barberly scheduler.
- **Memberships:** monthly tiers with a capped founding-member offer.
- **Product subscriptions:** 15% off with delivery every 6, 8 or 12 weeks.
- **Gift cards:** for one-off and holiday revenue.
- **Lead capture:** a first-visit offer that also records each client's rebooking cadence.

All imagery is Michael's own photography and brand assets. No generated images are used.

## Run it locally

Requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build the static site and preview it:

```bash
npm run build      # outputs plain HTML to ./out
npx serve out
```

## Editing content

Almost everything client-specific lives in one file, **`config/site.ts`**:

- **Business info:** brand, contact details, hours and address.
- **Links:** booking, review and social URLs.
- **Catalog:** services, add-ons, membership tiers, products, bundles and gift card amounts.
- **Content:** testimonials, accolades and gallery images.
- **Placeholders:** `placeholder: true` marks prices that still need confirming.
- **To verify:** `contact.needsVerification` lists facts that conflicted on the old site and need Michael's sign-off.

Images live in `public/images/`. Colors are CSS variables in `app/globals.css`, and `brand.theme` in the config can override them.

To hide the placeholder price dots, build with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`.

### Reusing this for another business

The layout, booking drawer, membership tiers, shop and checkout don't depend on the barbershop specifically. To re-skin the site for another local business, replace `config/site.ts`, swap the images in `public/images/`, and adjust the theme colors.

## Deployment

Every push to `main` builds a static export and publishes it to GitHub Pages through `.github/workflows/deploy.yml`. The workflow sets `NEXT_PUBLIC_BASE_PATH` (here, `/test-bushidocutz`) so that links and images resolve under the repo path. With no base path set, the same build works at the root of a custom domain.

## Before launch

- **Contact details:** confirm the phone number, hours and map location (see `contact.needsVerification`).
- **Pricing:** set real prices for every service, tier, product and bundle.
- **Product copy:** finalize the drafts, marked `draftCopy: true`.
- **Payments:** connect a real payment provider (for example Stripe or Square) for memberships, subscriptions, the shop and gift cards.
- **Lead capture:** connect the form to a CRM or email/SMS tool. It currently saves only in the visitor's browser.
- **Portrait:** replace the about-page portrait with a high-resolution photo of Michael.

## Tech

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · Motion · Lucide icons
