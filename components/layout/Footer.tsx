import Link from "next/link";
import { site } from "@/config/site";
import { formatHours } from "@/lib/format";
import { Mark, Wordmark } from "@/components/ui/Mark";
import { PlaceholderLegend } from "@/components/ui/Price";
import { CurrentYear } from "./CurrentYear";

const footerNav = [
  { href: "/services", label: "Services & pricing" },
  { href: "/membership", label: "The Dojo membership" },
  { href: "/shop", label: "Shop products" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Michael" },
];

export function Footer() {
  const { contact, brand, integrations } = site;
  return (
    <footer className="relative overflow-hidden bg-ink pb-24 text-paper md:pb-0">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 md:px-8">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <Mark tone="dark" className="w-12" />
              <Wordmark tone="dark" className="w-40" />
            </div>
            <p className="mt-6 max-w-xs font-display text-xl leading-snug text-paper/80">{brand.tagline}</p>
            <p className="mt-6 text-sm text-paper/50">
              {brand.owner.name}, {brand.owner.title}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-5 text-paper/40">Visit</h3>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-paper/80">
              <p>{contact.address.street}, {contact.address.suite}</p>
              <p>{contact.address.city}, {contact.address.region} {contact.address.postalCode}</p>
              <p className="text-paper/50">{contact.address.note}</p>
              <p className="pt-3"><a className="link-underline" href={contact.phoneHref}>{contact.phone}</a></p>
              <p><a className="link-underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </address>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-5 text-paper/40">Hours</h3>
            <dl className="space-y-1.5 text-sm">
              {contact.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt className="text-paper/60">{h.day}</dt>
                  <dd className={h.closed ? "text-paper/35" : "text-paper/85"}>{formatHours(h)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h3 className="eyebrow mb-5 text-paper/40">Explore</h3>
            <ul className="space-y-2 text-sm text-paper/80">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link className="link-underline" href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line-light pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {brand.name} LLC. All photography is the property of {brand.shortName}.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <PlaceholderLegend />
            {integrations.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline uppercase tracking-[0.2em]">
                {s.label}
              </a>
            ))}
            <a href={integrations.reviewsUrl} target="_blank" rel="noopener noreferrer" className="link-underline uppercase tracking-[0.2em]">
              Google reviews
            </a>
          </div>
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 hidden font-display text-[11rem] leading-none text-paper/[0.04] [writing-mode:vertical-rl] lg:block"
      >
        {brand.jp}
      </span>
    </footer>
  );
}
