import type { SiteConfig } from "@/lib/types";

/**
 * Single source of truth for everything client-specific. To re-skin this
 * build for another local business, replace this file and public/images.
 * Anything marked `placeholder: true` must be confirmed by the owner.
 */
export const site: SiteConfig = {
  brand: {
    name: "Bushido Cutz Hair Studio",
    shortName: "Bushido Cutz",
    jp: "武士道",
    tagline: "Precision meets perfection.",
    owner: { name: "Michael Hedden", title: "Master Barber & Owner" },
    logo: { src: "/images/brand/wordmark.png", alt: "Bushido", ungraded: true },
    mark: { src: "/images/brand/mark.png", alt: "Bushido crest", ungraded: true },
    calligraphy: {
      src: "/images/brand/calligraphy.jpg",
      alt: "Bushido written in brush calligraphy",
      ungraded: true,
    },
    theme: {
      ink: "#0e0e0c",
      paper: "#f2eee6",
      accent: "#b23a2b",
      stone: "#6f6a61",
    },
  },

  seo: {
    url: "https://www.bushidocutz.com",
    title: "Bushido Cutz Hair Studio | Master Barber in Beaverton, OR",
    description:
      "Precision men's haircuts, fades, beard rituals and hot towel shaves by Master Barber Michael Hedden. A private suite inside Sola Salons on Scholls Ferry Rd, Beaverton.",
    serviceAreas: ["Beaverton", "Aloha", "Hillsboro", "Tigard", "Portland"],
    ogImage: "/images/brand/og.jpg",
  },

  contact: {
    phone: "(772) 924-7609",
    phoneHref: "tel:+17729247609",
    email: "bushidocutz@gmail.com",
    address: {
      street: "11415 SW Scholls Ferry Rd",
      suite: "Suite 11",
      city: "Beaverton",
      region: "OR",
      postalCode: "97008",
      note: "Inside Sola Salons, near Washington Square",
    },
    geo: { lat: 45.4486, lng: -122.7932 },
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=11415+SW+Scholls+Ferry+Rd+Suite+11+Beaverton+OR+97008",
    hours: [
      { day: "Monday", open: "10:00", close: "18:00" },
      { day: "Tuesday", open: "10:00", close: "18:00" },
      { day: "Wednesday", closed: true },
      { day: "Thursday", open: "10:00", close: "18:00" },
      { day: "Friday", open: "10:00", close: "18:00" },
      { day: "Saturday", open: "10:00", close: "14:00" },
      { day: "Sunday", closed: true },
    ],
    needsVerification: [
      "Phone: old site listed both (772) 924-7609 and (503) 971-464-0286",
      "Hours: home page said closed Wednesday, About page said open Mon-Fri",
      "Map coordinates are approximate",
      "Accolades are taken from Michael's promo graphics; confirm exact award names",
    ],
  },

  integrations: {
    bookingUrl: "https://bushidocutzhairstudio.barberly.online/",
    reviewsUrl: "https://share.google/5JioQiDniYCgllwQ4",
    rating: { score: 4.9, count: 107, source: "Google", asOf: "October 2026" },
    social: [
      { label: "Instagram", href: "https://www.instagram.com/bushidocutzhairstudio/" },
      { label: "TikTok", href: "https://tiktok.com/@bushidocutz" },
      { label: "Facebook", href: "https://www.facebook.com/bushidocutzllc" },
    ],
    instagram: { handle: "bushidocutzhairstudio", href: "https://www.instagram.com/bushidocutzhairstudio/" },
  },

  home: {
    hero: {
      eyebrow: "Master Barber · Beaverton, Oregon",
      headline: "Precision is a discipline.",
      sub: "One chair. One client. A private suite where every cut is treated with the focus of a blade. Men's cuts, fades, beard rituals and hot towel shaves by Michael Hedden.",
      image: {
        src: "/images/cuts/side-fade-beard.jpg",
        alt: "Client with a sharp side-part fade and full shaped beard in the Bushido Cutz suite",
        position: "50% 30%",
      },
    },
    proof: [
      "Master Barber Michael Hedden",
      "Private suite, never rushed",
      "Hot towel & straight razor",
      "Men's, women's & kids' cuts",
    ],
    accolades: [
      { title: "Business Excellence Award 2026", detail: "Premier Industry Ratings Institute · Portland Metro" },
      { title: "Meritly Verified", detail: "Independently verified local business" },
    ],
    ritual: {
      eyebrow: "Omotenashi · The VIP Experience",
      title: "This isn't just a haircut. It's a complete transformation.",
      body: [
        "In Japanese culture, Omotenashi is the art of selfless hospitality: anticipating a guest's needs before they arise. The VIP Experience combines Master Barber precision with Japanese-inspired luxury.",
        "This is the difference between getting groomed and being taken care of.",
      ],
      steps: [
        "Precision haircut",
        "Beard trim and shaping",
        "Hot towel straight-razor shave",
        "Ozone detoxifying facial steam",
        "Signature shampoo & scalp massage",
      ],
      serviceId: "vip",
      image: {
        src: "/images/studio/michael-at-work.jpg",
        alt: "Michael giving a client a hot towel shave in the private suite",
        position: "60% 40%",
      },
    },
  },

  story: {
    lede: "Every client deserves precision, professionalism and personalized service.",
    paragraphs: [
      "Bushido Cutz Hair Studio was founded on a simple principle. Inside a private suite at Sola Salons in Beaverton, Michael created a barbering experience that puts quality and attention to detail first.",
      "The name comes from the code of honor followed by the samurai. Its principles of discipline, respect, precision and mastery guide every cut. Just as a samurai perfected their craft through dedicated practice, Michael approaches every haircut with the same commitment.",
      "You're not just another appointment. In a one-on-one setting, he takes the time to understand your style, your lifestyle and your goals, whether you're preparing for an important meeting, maintaining your everyday look, or trying something new.",
    ],
    portrait: {
      src: "/images/studio/michael-at-work.jpg",
      alt: "Michael Hedden at work in his suite",
      position: "65% 35%",
    },
    detailImages: [
      { src: "/images/studio/virtues-wall.jpg", alt: "Katana display above the Seven Virtues of Bushido in the studio" },
      { src: "/images/studio/shears.jpg", alt: "Bushido premium shears in their presentation box" },
    ],
    commitments: [
      "Quality over quantity. We never rush.",
      "Personalized service tailored to you",
      "A clean, private, distraction-free suite",
      "Premium tools and products",
      "Ongoing education in the latest techniques",
      "Lasting relationships with every client",
    ],
  },

  principles: [
    { jp: "義", romaji: "Gi", meaning: "Rectitude", practice: "Honest advice on what will actually suit you." },
    { jp: "礼", romaji: "Rei", meaning: "Respect", practice: "Your time is protected. We run on schedule." },
    { jp: "勇", romaji: "Yu", meaning: "Courage", practice: "The confidence to try something new, guided well." },
    { jp: "名誉", romaji: "Meiyo", meaning: "Honor", practice: "Every cut leaves the chair as a signature." },
    { jp: "仁", romaji: "Jin", meaning: "Compassion", practice: "Patient, gentle care for kids and first-timers." },
    { jp: "誠", romaji: "Makoto", meaning: "Sincerity", practice: "Transparent pricing. No surprise upsells." },
    { jp: "忠義", romaji: "Chu", meaning: "Loyalty", practice: "We remember your cut, so you never re-explain it." },
  ],

  services: [
    {
      id: "mens-cut",
      name: "Men's Precision Cut",
      kicker: "The warrior's edge",
      category: "cuts",
      durationMin: 45,
      price: 55,
      placeholder: true,
      summary: "Fades, tapers and classic cuts with sharp lines and intentional texture.",
      description:
        "In the spirit of the Bushido code, every cut is treated with absolute discipline. For short styles like a fade or taper, we focus on sharp lines, intentional texture and perfect tapering so your signature look stays as formidable as a warrior's edge.",
      image: { src: "/images/cuts/textured-crop.jpg", alt: "Textured crop with a clean low fade" },
      featured: true,
      rebookWeeks: 3,
    },
    {
      id: "cut-beard",
      name: "Cut & Beard Ritual",
      kicker: "The full blade",
      category: "cuts",
      durationMin: 75,
      price: 85,
      placeholder: true,
      summary: "Precision cut plus beard shaping, balm sealed with a hot brush.",
      description:
        "Our most-booked pairing. A precision cut followed by the full beard ritual: length and shape exactly as you want it, beard balm sealed into the hair with a hot brush, aftershave, toner and hydration.",
      image: { src: "/images/cuts/side-fade-beard.jpg", alt: "Side fade with a full shaped beard", position: "50% 30%" },
      featured: true,
      rebookWeeks: 3,
    },
    {
      id: "beard",
      name: "Beard Trim & Shaping",
      kicker: "The ritual",
      category: "beard",
      durationMin: 30,
      price: 35,
      placeholder: true,
      summary: "Shape, balm, hot brush, aftershave, toner and hydration.",
      description:
        "We don't just trim and shape your beard, we turn it into a ritual. You get the length and shape you want, a beard balm application sealed into the hair with a hot brush, aftershave, toner and hydration with the highest quality products.",
      image: { src: "/images/cuts/curly-beard.jpg", alt: "Full, shaped beard with natural curls on top" },
      rebookWeeks: 2,
    },
    {
      id: "hot-towel-shave",
      name: "Hot Towel Shave",
      kicker: "The way of the blade",
      category: "rituals",
      durationMin: 45,
      price: 50,
      placeholder: true,
      summary: "Steaming towels, warm lather and a traditional straight razor.",
      description:
        "The timeless art of the perfect shave. Steaming hot towels infused with essential oils soften the beard, a rich warm lather follows, then a traditional straight razor for an impeccably close shave. It finishes with a cool towel and soothing post-shave balm.",
      featured: true,
      rebookWeeks: 2,
    },
    {
      id: "facial-steam",
      name: "Ozone Detoxifying Facial Steam",
      category: "rituals",
      durationMin: 20,
      price: 30,
      placeholder: true,
      summary: "Purifying steam and ozone therapy for clearer, brighter skin.",
      description:
        "Purifying steam combined with ozone therapy deep-cleanses pores, eliminates acne-causing bacteria and boosts radiance. In 15 to 20 minutes, skin looks clearer, brighter and more luminous.",
    },
    {
      id: "scalp",
      name: "Scalp Detox Treatment",
      category: "rituals",
      durationMin: 25,
      price: 35,
      placeholder: true,
      summary: "Increases blood flow and helps remove DHT build-up.",
      description:
        "An invigorating scalp treatment that increases blood flow, detoxifies the scalp and helps remove DHT build-up to help slow or prevent hair thinning.",
    },
    {
      id: "vip",
      name: "The VIP Experience",
      kicker: "Omotenashi",
      category: "rituals",
      durationMin: 105,
      price: 150,
      placeholder: true,
      summary: "Cut, beard, hot towel shave, facial steam, shampoo and scalp massage.",
      description:
        "Expert haircut and beard trim, a therapeutic hot towel shave, ozone detoxifying facial steam, then our signature shampoo and scalp massage. The heat, the steam, the expert touch and the premium products work together to deliver something you'll feel long after you leave.",
      image: { src: "/images/studio/michael-at-work.jpg", alt: "Hot towel service in progress", position: "60% 40%" },
      featured: true,
      rebookWeeks: 4,
    },
    {
      id: "womens-short",
      name: "Women's Short Cut",
      category: "women",
      durationMin: 45,
      price: 55,
      placeholder: true,
      summary: "Pixies, crops and bobs sculpted around the \u201cMa\u201d: the space and shape.",
      description:
        "For the short-haired client, beauty is found in the details. We sculpt your existing short style to enhance your natural features, focusing on the \u201cMa\u201d (the space and shape) of the hair. Zero effort, maximum impact.",
      rebookWeeks: 5,
    },
    {
      id: "womens-long",
      name: "Women's Long Cut",
      category: "women",
      durationMin: 60,
      price: 75,
      placeholder: true,
      summary: "Seamless blends and face-framing layers that keep your length healthy.",
      description:
        "A cut designed for longevity and luster. We treat long hair with the reverence it deserves, creating seamless blends and face-framing layers that evoke the natural flow of a mountain stream.",
      image: { src: "/images/cuts/womens-long.jpg", alt: "Long layered hair, cut and finished", position: "100% 0%", zoom: 1.25 },
      rebookWeeks: 8,
    },
    {
      id: "kids",
      name: "Kids' Cut",
      category: "kids",
      durationMin: 30,
      price: 35,
      placeholder: true,
      summary: "Gentle, precise cuts for children under 10.",
      description: "Gentle, precise cuts for children under 10 to keep your little ones looking sharp.",
      rebookWeeks: 4,
    },
  ],

  addOns: [
    {
      id: "shampoo-massage",
      name: "Shampoo & Scalp Massage",
      durationMin: 10,
      price: 15,
      placeholder: true,
      description: "Signature shampoo with a tension-melting scalp massage.",
    },
    {
      id: "steam",
      name: "Ozone Facial Steam",
      durationMin: 15,
      price: 25,
      placeholder: true,
      description: "Deep-cleanse pores and leave with brighter skin.",
    },
    {
      id: "hot-towel",
      name: "Hot Towel & Balm Finish",
      durationMin: 5,
      price: 10,
      placeholder: true,
      description: "Essential-oil hot towel, cool towel and post-shave balm.",
    },
    {
      id: "scalp-detox",
      name: "Scalp Detox",
      durationMin: 15,
      price: 25,
      placeholder: true,
      description: "Boosts blood flow and helps clear DHT build-up.",
    },
  ],

  firstVisitOffer: {
    title: "Your first visit, honored.",
    body: "Leave your email or phone and we'll add a complimentary shampoo & scalp massage to your first appointment. You'll also get a gentle reminder when it's time to rebook.",
    addOnId: "shampoo-massage",
  },

  membership: {
    name: "The Dojo",
    jp: "道場",
    pitch:
      "One chair means limited time. Members get it first. A monthly membership keeps your cut on schedule, your spot reserved and your products stocked, at a better price than booking one by one.",
    foundingCap: 40,
    foundingClaimed: 23,
    tiers: [
      {
        id: "ronin",
        name: "Ronin",
        jp: "浪人",
        price: 49,
        placeholder: true,
        tagline: "Your monthly cut, locked in.",
        perks: [
          "One Men's Precision Cut every month",
          "Priority booking window before the public",
          "10% off all Bushido products",
        ],
        includes: [{ label: "Men's Precision Cut", value: 55 }],
      },
      {
        id: "samurai",
        name: "Samurai",
        jp: "侍",
        price: 89,
        placeholder: true,
        tagline: "Never more than two weeks from sharp.",
        perks: [
          "Two Men's Precision Cuts every month",
          "Beard line-up at every visit",
          "Priority booking + reserved recurring slot",
          "15% off all Bushido products",
        ],
        includes: [
          { label: "2 × Men's Precision Cut", value: 110 },
          { label: "2 × Beard line-up", value: 20 },
        ],
        highlighted: true,
      },
      {
        id: "shogun",
        name: "Shogun",
        jp: "将軍",
        price: 159,
        placeholder: true,
        tagline: "The full Omotenashi, every month.",
        perks: [
          "The VIP Experience once a month",
          "A mid-month Men's Precision Cut",
          "Matte Cream shipped to you every quarter",
          "20% off products + first pick of holiday slots",
        ],
        includes: [
          { label: "The VIP Experience", value: 150 },
          { label: "Men's Precision Cut", value: 55 },
          { label: "Matte Cream (quarterly, monthly share)", value: 9 },
        ],
      },
    ],
    familyAddOn: {
      name: "Family add-on",
      price: 29,
      description: "Add a Kids' Cut each month for a child under 10, booked back-to-back with yours.",
    },
    faq: [
      {
        q: "Can I pause or cancel?",
        a: "Yes. Pause for up to two months a year (travel, injury, life) or cancel anytime before your next billing date. No contracts.",
      },
      {
        q: "Do unused cuts roll over?",
        a: "One unused visit rolls into the next month. After that it resets, which keeps the chair fair for every member.",
      },
      {
        q: "Why is membership capped?",
        a: "Michael is one barber with one chair. Capping founding memberships guarantees every member actually gets their reserved time.",
      },
      {
        q: "What about no-shows?",
        a: "Life happens. Give 24 hours' notice and we'll rebook. A no-show without notice counts as a used visit.",
      },
    ],
  },

  products: [
    {
      slug: "matte-cream",
      name: "Bushido Matte Cream",
      tagline: "Natural hold. Zero shine. All day.",
      price: 28,
      placeholder: true,
      size: "3.53 oz / 100 g",
      images: [
        { src: "/images/products/matte-cream.jpg", alt: "Bushido Matte Cream jar with gold brush-stroke label", ungraded: true },
        { src: "/images/products/matte-cream-ritual.jpg", alt: "An open jar of Bushido Matte Cream beside a katana and cherry blossom petals" },
        { src: "/images/products/product-line.jpg", alt: "The Bushido product line on display" },
      ],
      description: [
        "True mastery requires unyielding discipline and the finest tools. Bushido Matte Cream is forged for the modern warrior who demands precision in the daily grooming ritual.",
        "A dependable, pliable hold and a deeply natural zero-shine finish. Infused with the refined scent of Evening Primrose. No grease, no compromises.",
      ],
      features: [
        { label: "Hold", value: "Pliable, buildable, all-day" },
        { label: "Finish", value: "True matte, zero shine" },
        { label: "Feel", value: "Non-greasy, washes out clean" },
        { label: "Scent", value: "Evening Primrose" },
      ],
      directions: [
        "Warm a small amount between your palms to awaken the cream.",
        "Work evenly through the hair from roots to ends.",
        "Sculpt with fingers or a comb. Push, pull and twist for texture and definition.",
      ],
      ingredients:
        "Water, Ceteareth-25, Beeswax, Bentonite, Kaolinite, Microcrystalline Wax, Ceresin, Acrylates Copolymer, Paraffin, Phenoxyethanol, Parfum, Propylene Glycol, CI 77492, Oenothera Biennis (Evening Primrose) Oil.",
      subscribable: true,
      reviews: [
        { quote: "Keeps my hair perfectly styled all day without any greasy shine.", author: "James H." },
        { quote: "Love how natural it feels and holds my style without stiffness.", author: "Mark T." },
      ],
    },
    {
      slug: "rei-styling-putty",
      name: "Bushido Rei Styling Putty",
      tagline: "Matte finish. Light hold. Effortless texture.",
      price: 26,
      placeholder: true,
      size: "80 g / 2.7 fl oz",
      images: [{ src: "/images/products/rei-putty.jpg", alt: "Three bottles of Bushido Rei Styling Putty, matte finish, light hold" }],
      description: [
        "Rei (礼) is the Bushido virtue of respect. A light-hold putty with a true matte finish for textured, natural styles that still move the way hair should.",
        "Built for crops, fringes and lived-in texture where a heavier cream would weigh things down.",
      ],
      features: [
        { label: "Hold", value: "Light, flexible" },
        { label: "Finish", value: "Matte" },
        { label: "Best for", value: "Crops, fringes, texture" },
      ],
      subscribable: true,
      draftCopy: true,
      isNew: true,
    },
    {
      slug: "sea-salt-spray",
      name: "Bushido Sea Salt Spray",
      tagline: "Grit, volume and texture before you style.",
      price: 24,
      placeholder: true,
      size: "6.76 fl oz / 200 ml",
      images: [{ src: "/images/products/product-line.jpg", alt: "Bushido Sea Salt Spray bottle", position: "0% 30%", zoom: 2 }],
      description: [
        "The foundation of a textured style. Mist into damp hair before blow-drying to build lift and a lived-in, matte texture.",
      ],
      features: [
        { label: "Use", value: "Pre-styler for texture" },
        { label: "Finish", value: "Matte, natural" },
      ],
      subscribable: true,
      draftCopy: true,
    },
    {
      slug: "styling-powder",
      name: "Bushido Styling Powder",
      tagline: "Instant root lift you can't see.",
      price: 22,
      placeholder: true,
      size: "0.7 oz / 20 g",
      images: [{ src: "/images/products/product-line.jpg", alt: "Bushido Styling Powder bottle", position: "59% 50%", zoom: 2.2 }],
      description: [
        "A weightless texturizing powder. Tap onto dry roots and work in with your fingertips for volume and grip without shine.",
      ],
      features: [
        { label: "Use", value: "Volume at the root" },
        { label: "Finish", value: "Invisible, matte" },
      ],
      subscribable: true,
      draftCopy: true,
    },
    {
      slug: "matte-styling-cream",
      name: "Bushido Matte Styling Cream",
      tagline: "A lighter matte for softer, everyday styles.",
      price: 24,
      placeholder: true,
      size: "Tube",
      images: [{ src: "/images/products/product-line.jpg", alt: "Bushido Matte Styling Cream tube", position: "100% 54%", zoom: 2.2 }],
      description: [
        "A lighter-touch matte cream in a squeeze tube. Ideal for longer layers and relaxed, natural movement.",
      ],
      features: [
        { label: "Hold", value: "Light to medium" },
        { label: "Finish", value: "Soft matte" },
      ],
      subscribable: true,
      draftCopy: true,
    },
    {
      slug: "premium-shears",
      name: "Bushido 440C Japanese Steel Shears",
      tagline: "The tools behind the craft.",
      price: 189,
      placeholder: true,
      size: '6" cutting + thinning shear',
      images: [
        { src: "/images/products/shears-440c.jpg", alt: "Bushido 440C Japanese steel cutting and thinning shears", ungraded: true },
        { src: "/images/studio/shears.jpg", alt: "Bushido shears in their presentation box" },
      ],
      description: [
        "The same Bushido-branded shears used in the chair. Forged from 440C Japanese stainless steel with a 6-inch convex edge that glides through hair instead of pushing it.",
        "A precision cutting shear and a matching thinning shear, presented in a magnetic box.",
      ],
      features: [
        { label: "Steel", value: "440C Japanese stainless" },
        { label: "Edge", value: '6" convex' },
        { label: "Includes", value: "Cutting + thinning shear" },
        { label: "Presentation", value: "Magnetic gift box" },
      ],
      subscribable: false,
      draftCopy: true,
    },
  ],

  bundles: [
    {
      slug: "the-arsenal",
      name: "The Arsenal",
      description: "Matte Cream, Sea Salt Spray, Styling Powder and Matte Styling Cream. The full daily ritual.",
      productSlugs: ["matte-cream", "sea-salt-spray", "styling-powder", "matte-styling-cream"],
      price: 84,
      placeholder: true,
      image: { src: "/images/products/product-line.jpg", alt: "The full Bushido product line" },
    },
  ],

  subscription: { discountPct: 15, cadencesWeeks: [6, 8, 12] },

  giftCards: {
    amounts: [55, 85, 150, 250],
    image: { src: "/images/brand/card.jpg", alt: "Bushido Hair Studio card with gold shears", ungraded: true },
    note: "Delivered by email instantly, or printed and handed over in the suite. Never expires.",
  },

  testimonials: [
    {
      quote:
        "I recently had a fantastic haircut and beard trim from Master Barber Michael Hedden. His attention to detail and expertise made the whole experience enjoyable. I walked out feeling refreshed and confident!",
      author: "David Browning",
      context: "Beaverton, Oregon",
    },
    { quote: "Keeps my hair perfectly styled all day without any greasy shine.", author: "James H.", context: "On the Matte Cream" },
    { quote: "Love how natural it feels and holds my style without stiffness.", author: "Mark T.", context: "On the Matte Cream" },
  ],

  gallery: [
    { src: "/images/cuts/drop-fade.jpg", alt: "Textured fringe with a drop fade", category: "fades", caption: "Drop fade", position: "40% 50%" },
    { src: "/images/cuts/textured-crop.jpg", alt: "Textured crop with a low skin fade", category: "textured", caption: "Textured crop" },
    { src: "/images/cuts/side-fade-beard.jpg", alt: "Side-part fade with a full shaped beard", category: "beard", caption: "Fade & full beard", tall: true },
    { src: "/images/cuts/mid-skin-fade.jpg", alt: "Mid skin fade with swept-back top", category: "fades", caption: "Mid skin fade", position: "0% 45%", zoom: 1.35, tall: true },
    { src: "/images/cuts/french-crop.jpg", alt: "French crop with a mid fade", category: "fades", caption: "French crop", position: "0% 60%", zoom: 1.35 },
    { src: "/images/cuts/curly-beard.jpg", alt: "Natural curls on top with a sculpted beard", category: "beard", caption: "Curls & beard" },
    { src: "/images/cuts/womens-long.jpg", alt: "Long layered women's cut", category: "long", caption: "Long layers", position: "100% 0%", zoom: 1.25, tall: true },
    { src: "/images/transformations/taper.jpg", alt: "Before and after: overgrown curls to a tapered textured cut", category: "transformations", ungraded: true },
    { src: "/images/transformations/beard-gentleman.jpg", alt: "Before and after: beard and hair cleanup", category: "transformations", ungraded: true },
    { src: "/images/transformations/silver-beard.jpg", alt: "Before and after: silver beard shaping", category: "transformations", ungraded: true },
    { src: "/images/transformations/crop.jpg", alt: "Before and after: long shag to a textured crop", category: "transformations", ungraded: true },
    { src: "/images/transformations/skin-fade-beard.jpg", alt: "Mid skin fade and beard shaping, two angles", category: "transformations", ungraded: true },
    { src: "/images/transformations/layered.jpg", alt: "Men's layered cut, two angles", category: "transformations", ungraded: true },
    { src: "/images/transformations/low-taper.jpg", alt: "Before and after: grown-out sides to a low taper", category: "transformations", ungraded: true },
    { src: "/images/transformations/short-crop.jpg", alt: "Short textured crop with a skin fade, two angles", category: "transformations", ungraded: true },
    { src: "/images/transformations/bleached-crop.jpg", alt: "Bleached textured crop with a high skin fade, two angles", category: "transformations", ungraded: true },
    { src: "/images/transformations/low-fade.jpg", alt: "Short textured cut with a low fade, two angles", category: "transformations", ungraded: true },
    { src: "/images/studio/suite.jpg", alt: "The private Bushido Cutz suite at Sola Salons", category: "studio", caption: "The suite" },
    { src: "/images/studio/virtues-wall.jpg", alt: "Katanas and the Seven Virtues of Bushido on the studio wall", category: "studio", caption: "The Seven Virtues" },
    { src: "/images/studio/shears.jpg", alt: "Bushido premium shears", category: "studio", caption: "The tools", tall: true },
  ],
};

export const servicesById = Object.fromEntries(site.services.map((s) => [s.id, s]));
export const productsBySlug = Object.fromEntries(site.products.map((p) => [p.slug, p]));
