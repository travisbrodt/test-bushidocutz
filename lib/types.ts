export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface ImageRef {
  src: string;
  alt: string;
  /** CSS object-position, used to crop around overlays baked into source photos. */
  position?: string;
  /** Scale around `position` to frame out text or logos baked into a photo. */
  zoom?: number;
  /** Skip the editorial grade (e.g. logos, designed graphics). */
  ungraded?: boolean;
}

export interface HoursEntry {
  day: Weekday;
  open?: string;
  close?: string;
  closed?: boolean;
}

export type ServiceCategory = "cuts" | "beard" | "rituals" | "women" | "kids";

export interface Service {
  id: string;
  name: string;
  /** Short poetic name from the brand voice, e.g. "The Way of the Blade". */
  kicker?: string;
  category: ServiceCategory;
  durationMin: number;
  price: number;
  /** True until the owner confirms the real price. */
  placeholder?: boolean;
  summary: string;
  description: string;
  image?: ImageRef;
  featured?: boolean;
  /** Suggested weeks until the next visit; drives rebook reminders. */
  rebookWeeks?: number;
}

export interface AddOn {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  placeholder?: boolean;
  description: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  jp: string;
  price: number;
  placeholder?: boolean;
  tagline: string;
  perks: string[];
  /** Monthly retail value of what's included, for the savings math. */
  includes: { label: string; value: number }[];
  highlighted?: boolean;
}

export interface Membership {
  name: string;
  jp: string;
  pitch: string;
  foundingCap: number;
  foundingClaimed: number;
  tiers: MembershipTier[];
  familyAddOn: { name: string; price: number; description: string };
  faq: { q: string; a: string }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  context?: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  placeholder?: boolean;
  size: string;
  images: ImageRef[];
  description: string[];
  features: { label: string; value: string }[];
  directions?: string[];
  ingredients?: string;
  subscribable: boolean;
  reviews?: Testimonial[];
  /** Copy still needs owner input before launch. */
  draftCopy?: boolean;
}

export interface Bundle {
  slug: string;
  name: string;
  description: string;
  productSlugs: string[];
  price: number;
  placeholder?: boolean;
  image: ImageRef;
}

export type GalleryCategory =
  | "fades"
  | "textured"
  | "beard"
  | "long"
  | "transformations"
  | "studio";

export interface GalleryItem extends ImageRef {
  category: GalleryCategory;
  caption?: string;
  tall?: boolean;
}

export interface Principle {
  jp: string;
  romaji: string;
  meaning: string;
  practice: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    jp: string;
    tagline: string;
    owner: { name: string; title: string };
    logo: ImageRef;
    mark: ImageRef;
    calligraphy: ImageRef;
    theme: {
      ink: string;
      paper: string;
      accent: string;
      stone: string;
    };
  };
  seo: {
    url: string;
    title: string;
    description: string;
    serviceAreas: string[];
  };
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      region: string;
      postalCode: string;
      note: string;
    };
    geo: { lat: number; lng: number };
    mapsUrl: string;
    hours: HoursEntry[];
    /** Facts that conflicted on the old site and need owner sign-off. */
    needsVerification: string[];
  };
  integrations: {
    bookingUrl: string;
    reviewsUrl: string;
    rating: { score: number; count: number; source: string; asOf: string };
    social: { label: string; href: string }[];
  };
  home: {
    hero: {
      eyebrow: string;
      headline: string;
      sub: string;
      image: ImageRef;
    };
    proof: string[];
    ritual: {
      eyebrow: string;
      title: string;
      body: string[];
      steps: string[];
      serviceId: string;
      image: ImageRef;
    };
  };
  story: {
    lede: string;
    paragraphs: string[];
    portrait: ImageRef;
    detailImages: ImageRef[];
    commitments: string[];
  };
  principles: Principle[];
  services: Service[];
  addOns: AddOn[];
  firstVisitOffer: { title: string; body: string; addOnId: string };
  membership: Membership;
  products: Product[];
  bundles: Bundle[];
  subscription: { discountPct: number; cadencesWeeks: number[] };
  giftCards: { amounts: number[]; image: ImageRef; note: string };
  testimonials: Testimonial[];
  gallery: GalleryItem[];
}
