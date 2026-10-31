import { site } from "@/config/site";

export function LocalBusinessJsonLd() {
  const { contact, brand, seo, integrations, services } = site;
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: brand.name,
    url: seo.url,
    image: `${seo.url}${site.home.hero.image.src}`,
    logo: `${seo.url}${brand.mark.src}`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.street}, ${contact.address.suite}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
    areaServed: seo.serviceAreas.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: contact.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
    founder: { "@type": "Person", name: brand.owner.name, jobTitle: brand.owner.title },
    sameAs: integrations.social.map((s) => s.href),
    potentialAction: { "@type": "ReserveAction", target: integrations.bookingUrl },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary },
        price: s.price,
        priceCurrency: "USD",
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
