# Bushido Cutz Hair Studio: website redesign prototype

A redesign prototype for [Bushido Cutz Hair Studio](https://www.bushidocutz.com), the private barber suite run by Master Barber Michael Hedden inside Sola Salons in Beaverton, Oregon.

**Live preview:** https://test-bushidocutz.vercel.app

> This is a prototype for review. Prices marked with a red dot are placeholders, and the membership, subscription and gift card checkouts are realistic mockups. No payment is collected. Until Michael's Barberly key is connected, booking runs on sample availability and no appointment is created.

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

- **Booking:** a branded, on-site booking flow (service and add-ons, then a real time slot, then contact details) that books straight into Michael's Barberly calendar. No redirect to a third-party page.
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

To check a production build:

```bash
npm run build
npm start
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

## Booking

The booking drawer talks to the site's own API routes (`app/api/booking/*`), which call the scheduler from the server. The scheduler's API key never reaches the browser.

Schedulers plug in behind a small provider interface (`lib/booking/types.ts`):

- **Barberly** (`lib/booking/barberly.ts`) uses the [Barberly Booking API](https://booking-api.barberly.com/swagger/index.html) for services, team, live availability and booking creation.
- **Demo** (`lib/booking/demo.ts`) generates realistic availability from the shop hours in `config/site.ts`. It's used whenever no Barberly key is set, so the prototype works out of the box.

Adding another scheduler (Square, Acuity, and so on) means writing one more provider and selecting it in `lib/booking/provider.ts`.

### Connecting Michael's Barberly calendar

1. In the Barberly portal, go to **Apps → Booking API → Create key**.
2. In Vercel, open the project's **Settings → Environment Variables** and add the variables below, then redeploy.

| Variable | Required | Purpose |
| --- | --- | --- |
| `BARBERLY_API_KEY` | Yes | Switches booking from demo to live. Keep it server-side; never prefix it with `NEXT_PUBLIC_`. |
| `BARBERLY_LOCATION_ID` | No | Picks a location if the account has more than one. Defaults to the first. |
| `BARBERLY_TEAM_MEMBER_ID` | No | Limits booking to one barber (Michael). Without it, clients can choose any team member. |
| `BARBERLY_API_BASE_URL` | No | Overrides the API host. Defaults to `https://booking-api.barberly.com`. |

Live services, prices and durations come from Barberly, so the menu in Barberly is the source of truth for booking. A "Book" button on a site service preselects the matching Barberly service by name. If names differ, map them with `integrations.barberlyServiceMap` in `config/site.ts` (site service ID → Barberly service ID).

To try live mode locally, put the key in `.env.local` (gitignored) and restart `npm run dev`.

## Deployment

The site is hosted on Vercel and connected to this repo: every push to `main` deploys to production, and pull requests get preview URLs. Set `NEXT_PUBLIC_SITE_URL` once a custom domain is attached so share links and metadata use it.

## Before launch

- **Contact details:** confirm the phone number, hours and map location (see `contact.needsVerification`).
- **Pricing:** set real prices for every service, tier, product and bundle.
- **Product copy:** finalize the drafts, marked `draftCopy: true`.
- **Booking:** add `BARBERLY_API_KEY` in Vercel (see above) and make sure the Barberly menu matches the site.
- **Payments:** connect a real payment provider (for example Stripe or Square) for memberships, subscriptions, the shop and gift cards. Barberly can sell memberships natively, but its Booking API doesn't expose that, so the on-site membership checkout needs its own payment integration or a link to Barberly.
- **Lead capture:** connect the form to a CRM or email/SMS tool. It currently saves only in the visitor's browser.
- **Portrait:** replace the about-page portrait with a high-resolution photo of Michael.

## Tech

Next.js 16 (App Router, on Vercel) · React 19 · Tailwind CSS v4 · Motion · Lucide icons
