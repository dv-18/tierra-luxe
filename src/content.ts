/**
 * Tierra Luxe — single source of truth for all copy + media.
 * Swap these placeholders for real villa footage, photography and figures
 * without touching any component.
 *
 * Images: replace the Unsplash URLs with Tierra's own photography.
 * Video:  set `hero.useVideo = true` and give each chapter a `video.hls`
 *         (HLS master playlist) and/or `video.mp4` fallback. The hero
 *         gracefully falls back to the still `poster` when no clip plays.
 */

import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, Compass, Gem, LineChart } from 'lucide-react'

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* Verified image pool (swap for Tierra's own photography). */
const IMG = {
  poolDusk: '1613490493576-7fde63acd811',
  whiteFacade: '1600585154340-be6161a56a0c',
  livingRoom: '1600596542815-ffad4c1539a9',
  sereneInterior: '1600607687939-ce8a6c25118c',
  whiteHouse: '1512917774080-9991f1c4c750',
  warmVilla: '1613977257363-707ba9348227',
  interiorWood: '1600047509807-ba8f99d2cdde',
  terracePool: '1580587771525-78b9dba3b914',
  aerialCoast: '1512453979798-5ea266f8880c',
  interiorStone: '1582268611958-ebfd161ef9cf',
  bedroom: '1600566753086-00f18fb6b3ea',
  kitchen: '1600210492486-724fe5c67fb0',
  poolside: '1602343168117-bb8ffe3e2e9f',
  coastalVilla: '1564013799919-ab600027ffc6',
  house: '1570129477492-45c003edd2be',
  // "Before" — dated / pre-redevelopment placeholders for the transformation slider
  before1: '1583608205776-bfd35f0d9f83', // traditional villa + palms
  before2: '1576941089067-2de3c901e126', // white house, red roof
  before3: '1568605114967-8130f3a36994', // traditional chalet at dusk
  before4: '1605146769289-440113cc3d00', // suburban brick home
  before5: '1583608205776-bfd35f0d9f83', // (reuse)
  before6: '1568605114967-8130f3a36994', // (reuse)
}

/* A ready-to-use HLS test stream so the streaming pipeline works the moment
 * `hero.useVideo` is flipped on. Replace with Tierra's own villa footage. */
const SAMPLE_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

export const site = {
  brand: 'TIERRA LUXE',
  tagline: 'Transforming Properties into Exceptional Living Spaces.',
  email: 'hello@tierraluxe.ae',
  location: 'Palm Jumeirah, Dubai',
  year: 2026,
  partners: 'BuildCorp Interiors',
}

export const nav = {
  links: [
    { label: 'About', to: '/about' },
    { label: 'Villas', to: '/villas' },
    { label: 'Process', to: '/#process' },
    { label: 'Contact', to: '/#contact' },
  ],
  cta: 'Enquire',
  ctaTo: '/#contact',
}

export const preloader = {
  words: ['Sourced', 'Redesigned', 'Realized'],
}

export type HeroChapter = {
  eyebrow: string
  title: string
  poster: string
  alt: string
  video?: { hls?: string; mp4?: string }
}

export const hero = {
  /** Flip to true once real HLS/MP4 footage is wired into each chapter. */
  useVideo: false,
  supporting:
    'We acquire, reimagine and elevate villas on Palm Jumeirah — pairing architectural craft with the harmony of Vastu Shastra.',
  ctas: {
    primary: { label: 'View the Collection', href: '#villas' },
    secondary: { label: 'Investment Opportunities', href: '#invest' },
  },
  chapters: [
    {
      eyebrow: 'Palm Jumeirah',
      title: 'The Pursuit of Perfect Living',
      poster: img(IMG.poolDusk, 2000),
      alt: 'Contemporary villa with an infinity pool glowing at dusk',
      video: { hls: SAMPLE_HLS, mp4: '' },
    },
    {
      eyebrow: 'Redesigned from Within',
      title: 'Where Space Meets Serenity',
      poster: img(IMG.whiteFacade, 2000),
      alt: 'Minimal white villa facade under a clear sky',
      video: { hls: SAMPLE_HLS, mp4: '' },
    },
    {
      eyebrow: 'A Family Standard',
      title: 'Transforming Properties into Exceptional Living Spaces',
      poster: img(IMG.warmVilla, 2000),
      alt: 'Warmly lit luxury villa exterior with landscaped grounds',
      video: { hls: SAMPLE_HLS, mp4: '' },
    },
  ] as HeroChapter[],
}

export const intro = {
  eyebrow: 'About Us',
  // words wrapped in *asterisks* render italic + gold in the statement
  statement:
    'A family-owned studio blending architectural excellence with the timeless principles of *Vastu Shastra* — designing homes that feel as considered as they are beautiful.',
  storyLink: { label: 'Read our story', to: '/about' },
  columns: [
    {
      heading: 'Sourced on the Palm',
      body: 'We identify villas with quiet potential along the fronds and crescent of Palm Jumeirah, then reimagine them from the structure outward — proportion, light and flow reconsidered before a single finish is chosen.',
    },
    {
      heading: 'Crafted from Within',
      body: 'In partnership with BuildCorp Interiors, every interior is composed by hand — natural stone, warm timber and bespoke joinery — so the finished home feels inevitable rather than decorated.',
    },
  ],
}

export type Project = {
  index: string
  slug: string
  name: string
  category: string
  descriptor: string
  image: string
  alt: string
}

export const projects = {
  eyebrow: 'Selected Villas',
  title: 'Redefined Residences',
  viewAll: 'View all',
  items: [
    {
      index: '01',
      slug: 'casa-della-terra',
      name: 'Casa Della Terra',
      category: 'Redesigned',
      descriptor:
        'A garden-fronted frond villa reworked around a double-height living volume and a mirror-still pool.',
      image: img(IMG.livingRoom, 1800),
      alt: 'Bright open-plan living room with floor-to-ceiling glass',
    },
    {
      index: '02',
      slug: 'villa-serenita',
      name: 'Villa Serenità',
      category: 'Vastu-Aligned',
      descriptor:
        'Layout, light and orientation re-tuned to Vastu Shastra for a home that breathes calm.',
      image: img(IMG.sereneInterior, 1800),
      alt: 'Serene interior with soft daylight and natural materials',
    },
    {
      index: '03',
      slug: 'the-sanctuary',
      name: 'The Sanctuary',
      category: 'Full Redevelopment',
      descriptor:
        'Taken back to its frame and rebuilt — a crescent villa reborn as a private wellness retreat.',
      image: img(IMG.terracePool, 1800),
      alt: 'Luxury villa terrace opening onto a landscaped pool',
    },
    {
      index: '04',
      slug: 'villa-costiera',
      name: 'Villa Costiera',
      category: 'Redesigned',
      descriptor:
        'Coastal-facing living reimagined with seamless indoor–outdoor thresholds and shaded terraces.',
      image: img(IMG.coastalVilla, 1800),
      alt: 'Modern coastal villa with expansive glazed terrace',
    },
  ] as Project[],
}

export type ProcessStep = {
  no: string
  title: string
  body: string
}

export const process = {
  eyebrow: 'The Tierra Process',
  title: 'From Acquisition to Return',
  steps: [
    {
      no: '01',
      title: 'Source',
      body: 'Identify undervalued villas on Palm Jumeirah with genuine redevelopment upside.',
    },
    {
      no: '02',
      title: 'Structure',
      body: 'Establish a dedicated SPV so investors participate cleanly and transparently.',
    },
    {
      no: '03',
      title: 'Redesign',
      body: 'Architectural and interior transformation, guided by Vastu Shastra harmony.',
    },
    {
      no: '04',
      title: 'Elevate',
      body: 'Premium finishes, outdoor living, pools and landscaping with BuildCorp Interiors.',
    },
    {
      no: '05',
      title: 'Realize',
      body: 'Market and resell the villa; investors receive their share of the profit.',
    },
  ] as ProcessStep[],
}

export type Pillar = {
  icon: LucideIcon
  title: string
  body: string
  image: string
}

export const experience = {
  eyebrow: 'Why Tierra',
  title: 'The Tierra Standard',
  // secondary parallax layers behind the active pillar image
  gallery: [img(IMG.interiorStone, 1400), img(IMG.interiorWood, 1400)],
  pillars: [
    {
      icon: HeartHandshake,
      title: 'Rooted in Family',
      body: 'A family-owned business, personally invested in every home we touch — every villa carries our name, so every decision is made as if we were moving in ourselves.',
      image: img(IMG.warmVilla, 1600),
    },
    {
      icon: Compass,
      title: 'Harmony by Design',
      body: 'Vastu Shastra principles woven into layout, light and flow, so each home feels balanced long before it is beautiful.',
      image: img(IMG.sereneInterior, 1600),
    },
    {
      icon: Gem,
      title: 'Craft Without Compromise',
      body: 'Architectural and interior excellence in every finish and detail — natural stone, warm timber and bespoke joinery, made by hand with BuildCorp Interiors.',
      image: img(IMG.livingRoom, 1600),
    },
    {
      icon: LineChart,
      title: 'Aligned Returns',
      body: 'Investors and outcomes structured transparently through dedicated SPVs, so participation is clean, documented and fully aligned.',
      image: img(IMG.terracePool, 1600),
    },
  ] as Pillar[],
}

export const marquee = {
  words: ['Tierra Luxe', 'Exceptional Living', 'Palm Jumeirah'],
}

export const contact = {
  eyebrow: 'Begin the Conversation',
  title: "Let's build something exceptional.",
  // faint background — swap for a looped aerial villa clip if desired
  bgPoster: img(IMG.aerialCoast, 2000),
  bgAlt: 'Aerial view of a coastline at golden hour',
  interests: ['Buying', 'Selling', 'Investing'],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'WhatsApp', href: 'https://wa.me/' },
  ],
  availability: 'Currently acquiring on Palm Jumeirah',
}

/* ------------------------------------------------------------------ *
 * Villas — full collection (drives /villas and /villas/:slug).
 * The first four slugs match the home scroll-stack cards.
 * ------------------------------------------------------------------ */

export interface VillaSection {
  n: number
  heading: string
  body: string
  image: string
}

export interface Villa {
  slug: string
  name: string
  status: string
  location: string
  area: string
  heroImage: string
  cardImage: string
  gallery: string[]
  beforeImage: string // pre-redevelopment (transformation slider)
  afterImage: string // post-redevelopment (transformation slider)
  price: string
  builtUpSqft: string
  plotSqft: string
  enclosedAreaSqft: string // big pinned stat, e.g. "14,000"
  bedrooms: number
  bathrooms: number
  levels: number
  shortSpec: string // "5 Bed · 8,200 sqft · Palm Jumeirah"
  overview: string[]
  pullQuote: string
  sections: VillaSection[] // accordion: Architecture / Interior / Outdoor
  proximity: { label: string; minutes: number }[]
}

const PROXIMITY: Villa['proximity'] = [
  { label: 'Atlantis The Palm', minutes: 6 },
  { label: 'Nakheel Mall', minutes: 4 },
  { label: 'Burj Al Arab', minutes: 12 },
  { label: 'DXB International', minutes: 28 },
  { label: 'Downtown Dubai', minutes: 25 },
]

export const villas: Villa[] = [
  {
    slug: 'casa-della-terra',
    name: 'Casa Della Terra',
    status: 'Redesigned',
    location: 'Frond G, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.poolDusk, 2200),
    cardImage: img(IMG.livingRoom, 1600),
    beforeImage: img(IMG.before1, 1600),
    afterImage: img(IMG.poolDusk, 1600),
    gallery: [img(IMG.sereneInterior, 1600), img(IMG.interiorWood, 1600), img(IMG.terracePool, 1600)],
    price: 'AED 46,000,000',
    builtUpSqft: '8,200',
    plotSqft: '11,400',
    enclosedAreaSqft: '8,200',
    bedrooms: 5,
    bathrooms: 6,
    levels: 2,
    shortSpec: '5 Bed · 8,200 sqft · Palm Jumeirah',
    overview: [
      'A garden-fronted frond villa reimagined around a single, uninterrupted living volume — the ground plane opened wall to wall so light and water read as one continuous surface from entrance to pool.',
      'The redesign strips away the original compartmented plan in favour of clarity: fewer rooms, larger, each framed by full-height glazing that dissolves the line between inside and out.',
      'Materials are quiet and considered — travertine underfoot, oiled oak overhead — chosen to age gracefully in the Palm’s coastal light.',
    ],
    pullQuote: 'Fewer rooms, larger, each framed by light and water.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A double-height living volume anchors the plan, its structure re-engineered to remove internal columns and carry a continuous ribbon of glazing. Proportion was reset to Vastu principles before a single finish was chosen.',
        image: img(IMG.whiteFacade, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Interiors are composed by hand with BuildCorp Interiors — travertine floors, oiled-oak joinery and stone monoliths that feel excavated rather than installed. Every threshold is detailed to disappear.',
        image: img(IMG.livingRoom, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A mirror-still pool runs the length of the garden elevation, wrapped by shaded terraces, an outdoor kitchen and mature landscaping that gives the plot immediate privacy.',
        image: img(IMG.terracePool, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
  {
    slug: 'villa-serenita',
    name: 'Villa Serenità',
    status: 'Vastu-Aligned',
    location: 'Frond K, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.warmVilla, 2200),
    cardImage: img(IMG.sereneInterior, 1600),
    beforeImage: img(IMG.before2, 1600),
    afterImage: img(IMG.warmVilla, 1600),
    gallery: [img(IMG.interiorStone, 1600), img(IMG.bedroom, 1600), img(IMG.interiorWood, 1600)],
    price: 'AED 52,000,000',
    builtUpSqft: '9,400',
    plotSqft: '12,900',
    enclosedAreaSqft: '9,400',
    bedrooms: 6,
    bathrooms: 7,
    levels: 2,
    shortSpec: '6 Bed · 9,400 sqft · Palm Jumeirah',
    overview: [
      'Every axis of Villa Serenità was re-tuned to Vastu Shastra — orientation, entry, water and light rebalanced so the home feels settled the moment you step inside.',
      'The result is a house that breathes: quiet courtyards, a central spine of daylight, and rooms that open toward the morning sun.',
      'It is Tierra’s clearest statement of harmony by design — architecture in service of stillness.',
    ],
    pullQuote: 'A house that breathes — architecture in service of stillness.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'The plan is organised around a central light-well aligned to the cardinal points, with the primary suite placed in the south-west per Vastu. Massing steps back to admit low morning light deep into the home.',
        image: img(IMG.whiteHouse, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'A restrained, tonal palette — lime plaster, pale oak and brushed bronze — lets natural light do the work. Bespoke joinery conceals storage so surfaces stay calm.',
        image: img(IMG.sereneInterior, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A meditation courtyard, reflecting pool and shaded majlis terrace extend the sense of calm outdoors, framed by drought-tolerant planting.',
        image: img(IMG.poolside, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
  {
    slug: 'the-sanctuary',
    name: 'The Sanctuary',
    status: 'Full Redevelopment',
    location: 'The Crescent, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.aerialCoast, 2200),
    cardImage: img(IMG.terracePool, 1600),
    beforeImage: img(IMG.before3, 1600),
    afterImage: img(IMG.terracePool, 1600),
    gallery: [img(IMG.poolDusk, 1600), img(IMG.interiorWood, 1600), img(IMG.poolside, 1600)],
    price: 'AED 120,000,000',
    builtUpSqft: '14,000',
    plotSqft: '19,500',
    enclosedAreaSqft: '14,000',
    bedrooms: 7,
    bathrooms: 9,
    levels: 3,
    shortSpec: '7 Bed · 14,000 sqft · Palm Jumeirah',
    overview: [
      'Taken back to its frame and rebuilt, The Sanctuary is a crescent villa reborn as a private wellness retreat — the most ambitious redevelopment in the Tierra collection.',
      'Three levels are organised around a full-height atrium, with a spa, indoor pool and cinema carved into the lower ground.',
      'Sea-facing glazing runs the entire rear elevation, dissolving the boundary between the living spaces and the Gulf beyond.',
    ],
    pullQuote: 'A crescent villa reborn as a private wellness retreat.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A complete structural rebuild allowed a three-storey atrium and cantilevered upper floor. The rear elevation is entirely glazed to capture uninterrupted sea views along the crescent.',
        image: img(IMG.house, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Book-matched stone, dark timber and layered lighting create a sequence of calm, gallery-like spaces. A floating stair wraps the atrium as sculpture.',
        image: img(IMG.interiorWood, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A rooftop infinity pool, private beach access, spa and gym make the villa a self-contained retreat. Landscaping shelters the plot without closing the view.',
        image: img(IMG.poolDusk, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
  {
    slug: 'villa-costiera',
    name: 'Villa Costiera',
    status: 'Redesigned',
    location: 'Frond D, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.whiteFacade, 2200),
    cardImage: img(IMG.coastalVilla, 1600),
    beforeImage: img(IMG.before4, 1600),
    afterImage: img(IMG.coastalVilla, 1600),
    gallery: [img(IMG.kitchen, 1600), img(IMG.terracePool, 1600), img(IMG.livingRoom, 1600)],
    price: 'AED 41,000,000',
    builtUpSqft: '7,600',
    plotSqft: '10,200',
    enclosedAreaSqft: '7,600',
    bedrooms: 5,
    bathrooms: 6,
    levels: 2,
    shortSpec: '5 Bed · 7,600 sqft · Palm Jumeirah',
    overview: [
      'Coastal-facing living reimagined with seamless indoor–outdoor thresholds — sliding walls of glass retract entirely so the living room and terrace become one room.',
      'The palette is bright and salt-washed, a lighter counterpoint to the collection’s warmer villas.',
      'Shaded terraces and deep overhangs keep the interior cool through the Dubai summer.',
    ],
    pullQuote: 'Sliding walls retract entirely — the terrace becomes one room.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'Deep roof overhangs and full-pocket sliding glazing let the ground floor open completely to the garden, while the upper floor is set back to create shaded balconies.',
        image: img(IMG.coastalVilla, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Pale timber, honed limestone and linen tones keep interiors light. The kitchen is a sculptural island of stone at the heart of the plan.',
        image: img(IMG.kitchen, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A wraparound terrace, lap pool and shaded lounge extend the living space outdoors, with direct frond-side water access.',
        image: img(IMG.terracePool, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
  {
    slug: 'villa-aurelia',
    name: 'Villa Aurelia',
    status: 'Available',
    location: 'Frond M, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.whiteHouse, 2200),
    cardImage: img(IMG.whiteHouse, 1600),
    beforeImage: img(IMG.before5, 1600),
    afterImage: img(IMG.whiteHouse, 1600),
    gallery: [img(IMG.livingRoom, 1600), img(IMG.bedroom, 1600), img(IMG.poolside, 1600)],
    price: 'AED 58,000,000',
    builtUpSqft: '10,100',
    plotSqft: '13,600',
    enclosedAreaSqft: '10,100',
    bedrooms: 6,
    bathrooms: 8,
    levels: 2,
    shortSpec: '6 Bed · 10,100 sqft · Palm Jumeirah',
    overview: [
      'Villa Aurelia is a study in golden light — oriented to catch the late sun across a west-facing garden and pool.',
      'Generous, gallery-proportioned rooms flow into one another, hung with warm brass detailing and soft stone.',
      'Currently available and ready to reserve through a dedicated SPV.',
    ],
    pullQuote: 'A study in golden light, hung with warm brass and soft stone.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A symmetrical entrance court gives way to an open, west-facing living wing. Roof lanterns draw daylight to the centre of the plan.',
        image: img(IMG.whiteHouse, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Warm neutrals, brushed brass and figured stone create an interior that glows at dusk. A double-island kitchen anchors family living.',
        image: img(IMG.livingRoom, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A west-facing pool terrace, sunken lounge and outdoor dining pavilion make the garden the social heart of the home.',
        image: img(IMG.poolside, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
  {
    slug: 'casa-marea',
    name: 'Casa Marea',
    status: 'Available',
    location: 'Frond B, Palm Jumeirah',
    area: 'Palm Jumeirah',
    heroImage: img(IMG.poolside, 2200),
    cardImage: img(IMG.poolside, 1600),
    beforeImage: img(IMG.before6, 1600),
    afterImage: img(IMG.poolside, 1600),
    gallery: [img(IMG.poolDusk, 1600), img(IMG.sereneInterior, 1600), img(IMG.terracePool, 1600)],
    price: 'AED 49,000,000',
    builtUpSqft: '8,800',
    plotSqft: '11,900',
    enclosedAreaSqft: '8,800',
    bedrooms: 5,
    bathrooms: 6,
    levels: 2,
    shortSpec: '5 Bed · 8,800 sqft · Palm Jumeirah',
    overview: [
      'Casa Marea takes its cue from water — a long reflecting pool leads the eye from the entrance through the living spaces to the sea.',
      'Cool tones, polished plaster and pale stone give the interior a serene, tidal calm.',
      'Available now, structured for clean investor participation via a dedicated SPV.',
    ],
    pullQuote: 'A reflecting pool leads the eye from entrance to sea.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A linear plan organised along a central water axis, with living spaces stepping down toward the frond-side garden and the Gulf.',
        image: img(IMG.whiteFacade, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Polished plaster, pale stone and bleached oak keep the palette cool and coastal. Sightlines run uninterrupted from front door to horizon.',
        image: img(IMG.sereneInterior, 1600),
      },
      {
        n: 3,
        heading: 'Outdoor & Amenities',
        body: 'A reflecting pool, sunken fire lounge and beach cabana complete the water-led composition, framed by soft coastal planting.',
        image: img(IMG.poolDusk, 1600),
      },
    ],
    proximity: PROXIMITY,
  },
]

/* ------------------------------------------------------------------ *
 * About page content.
 * ------------------------------------------------------------------ */

export const aboutContent = {
  heroImage: img(IMG.warmVilla, 2400),
  heroAlt: 'Warmly lit luxury villa on Palm Jumeirah at golden hour',
  label: 'About Us',
  statementHeading: 'More Than a Home',
  statementBody:
    'Tierra Luxe is a family-owned studio redeveloping ultra-luxury villas on Palm Jumeirah. We source homes with quiet potential, reimagine them from the structure outward, and let investors participate cleanly through dedicated SPVs — pairing architectural craft with the harmony of Vastu Shastra.',
  mission: {
    label: 'Mission',
    body: 'To transform overlooked villas into exceptional living spaces — homes that feel as considered as they are beautiful — while offering investors a transparent, structured way to share in the value we create.',
    image: img(IMG.sereneInterior, 1600),
    alt: 'Serene, light-filled interior with natural materials',
  },
  vision: {
    label: 'Vision',
    body: 'To become Palm Jumeirah’s most trusted name in villa redevelopment — a family standard for design, craft and integrity that outlasts trends and compounds for everyone involved.',
    image: img(IMG.terracePool, 1600),
    alt: 'Luxury villa terrace opening onto a landscaped pool',
  },
  values: [
    {
      n: 1,
      title: 'Excellence',
      body: 'We redesign from the structure outward and refuse to hide a compromise behind a finish.',
    },
    {
      n: 2,
      title: 'Family',
      body: 'A family-owned business — every villa carries our name, so every decision is personal.',
    },
    {
      n: 3,
      title: 'Integrity',
      body: 'Clean SPV structures and documented process, so investors always know exactly where they stand.',
    },
    {
      n: 4,
      title: 'Harmony',
      body: 'Vastu Shastra woven into layout, light and flow, so each home feels balanced by design.',
    },
    {
      n: 5,
      title: 'Innovation',
      body: 'Contemporary construction and interior craft applied to homes built to age gracefully.',
    },
  ],
  vastu: {
    eyebrow: 'The Vastu Philosophy',
    // *starred* words render italic + gold
    statement:
      'We design with *Vastu Shastra* — the ancient science of orientation, light and flow — so a home feels *settled* long before it is beautiful.',
    body: 'Entry, water, kitchen and rest are placed in dialogue with the sun and the cardinal points. It is not decoration; it is the invisible order beneath a home that simply feels right to live in.',
  },
  team: [
    { name: 'A. Rahman', role: 'Founder & Principal' },
    { name: 'S. Rahman', role: 'Managing Director' },
    { name: 'L. Fernandes', role: 'Head of Design' },
  ],
  brandsHeading: 'Our Associated Brands',
}

/* Furnishing / luxury houses — neutral text wordmarks (drop in real SVGs later). */
export const brands: string[] = [
  'Minotti',
  'Henge',
  'Hermès',
  'Molteni&C',
  'B&B Italia',
  'Poliform',
  'Flexform',
  'Gallotti & Radice',
  'Poltrona Frau',
  'Antonio Lupi',
  'Bang & Olufsen',
  'Giorgetti',
]

export function getVilla(slug: string | undefined): Villa | undefined {
  return villas.find((v) => v.slug === slug)
}

export function relatedVillas(slug: string, count = 3): Villa[] {
  return villas.filter((v) => v.slug !== slug).slice(0, count)
}
