import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoursTable } from "./HoursTable";

export function LocationHours() {
  const { address, phone, phoneHref, mapsUrl } = site.contact;
  const query = encodeURIComponent(`${site.brand.name}, ${address.street} ${address.suite}, ${address.city}, ${address.region} ${address.postalCode}`);

  return (
    <section id="visit" className="bg-paper-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:gap-16 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Visit the suite" title="Find us near Washington Square.">
            <p>
              {address.street}, {address.suite}
              <br />
              {address.city}, {address.region} {address.postalCode}
            </p>
            <p className="mt-2 text-sm">{address.note}. Easy parking right outside.</p>
          </SectionHeading>
          <div className="mt-10">
            <HoursTable />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={mapsUrl} external variant="ink" arrow>
              Get directions
            </Button>
            <Button href={phoneHref} variant="outline">
              {phone}
            </Button>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden md:col-span-7">
          <iframe
            title={`Map to ${site.brand.name}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.1] sepia-[0.15]"
          />
          <p className="pointer-events-none absolute bottom-6 left-6 bg-ink px-4 py-3 text-xs uppercase tracking-[0.2em] text-paper">
            {site.seo.serviceAreas.slice(0, 4).join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
