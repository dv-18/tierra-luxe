/**
 * Tierra Luxe — single source of truth for all copy + media.
 *
 * ⚠️ NEEDS-CONFIRMATION — search this file for "FLAG:" to find every place
 * that holds a placeholder pending real business data:
 *   - Sienna: location, specs and photography (stock placeholders).
 *   - Frond P / Redwood sizes, Redwood bathroom count (omitted until known).
 *   - The brand partner list (no names until verified).
 *   - Contact email + social handles.
 *   - Team names and photography.
 *
 * Frond O uses the project's own photography; Frond P and Redwood use
 * architectural renders (flagged with `renders: true`).
 */

import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, Compass, Gem, LineChart } from 'lucide-react'

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* Stock placeholder pool — used only by Sienna until its own photography exists. */
const IMG = {
  poolDusk: '1613490493576-7fde63acd811',
  whiteFacade: '1600585154340-be6161a56a0c',
  livingRoom: '1600596542815-ffad4c1539a9',
  sereneInterior: '1600607687939-ce8a6c25118c',
  warmVilla: '1613977257363-707ba9348227',
  terracePool: '1580587771525-78b9dba3b914',
  interiorStone: '1582268611958-ebfd161ef9cf',
}

/* Project media folders (public/projects). */
const FO = '/projects/frond-o'
const FP = '/projects/frond-p'
const RW = '/projects/redwood'

export const site = {
  brand: 'TIERRA LUXE',
  tagline: 'A luxury residential transformation studio.',
  // FLAG: placeholder — confirm the real inbox before this goes live.
  email: 'hello@tierraluxe.ae',
  location: 'Palm Jumeirah, Dubai',
  year: 2026,
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
  words: ['Considered', 'Reimagined', 'Realized'],
}

export type HeroChapter = {
  eyebrow: string
  title: string
  poster: string
  alt: string
}

export const hero = {
  supporting:
    'We identify villas with exceptional potential in Palm Jumeirah, Jumeirah Golf Estates and other established communities — and reimagine them from the structure outward, with architecture, interiors and landscape considered as one.',
  ctas: {
    primary: { label: 'View the Collection', href: '#villas' },
    secondary: { label: 'About Tierra Luxe', to: '/about' },
  },
  // One calm headline over the background film — no rotating chapters.
  chapter: {
    eyebrow: 'A Residential Transformation Studio',
    title: 'Transforming Villas Into Exceptional Living Spaces',
    poster: `${FO}/night-exterior.webp`,
    alt: 'Frond O villa exterior at night on Palm Jumeirah',
  } as HeroChapter,
}

export const intro = {
  eyebrow: 'About Us',
  statement:
    'A family-owned studio that *identifies potential* where others see an existing villa — and reimagines it from the structure outward, so the finished home feels as considered as it is beautiful.',
  storyLink: { label: 'Read our story', to: '/about' },
  columns: [
    {
      heading: 'Identifying Potential',
      body: 'We look for villas with genuine transformation potential in established, prestigious communities — assessing structure, proportion, light and land before a single line is drawn.',
    },
    {
      heading: 'Crafted from Within',
      body: 'Every project is delivered with carefully selected architects, interior designers and specialist craft partners — natural stone, warm timber and considered materiality throughout.',
    },
  ],
}

/* ------------------------------------------------------------------ *
 * Villas — the collection (drives home, /villas and /villas/:slug).
 *
 * Spec values are only shown when present: leave a field undefined
 * rather than guess. Sienna is entirely provisional — search "FLAG:".
 * ------------------------------------------------------------------ */

export interface VillaSection {
  n: number
  heading: string
  body: string
  image: string
}

export interface VillaTransformation {
  label?: string
  beforeImage?: string
  afterImage: string
}

export interface VillaVideo {
  youtubeId: string
  title: string
}

export interface Villa {
  slug: string
  aliases?: string[] // old slugs that still resolve to this villa
  name: string
  status: string // Sold / In Development / Available
  location: string
  heroImage: string
  cardImage: string
  cardAlt: string
  gallery: string[]
  portraitGallery?: string[]
  transformations?: VillaTransformation[] // before/after slider renders only when a beforeImage exists
  video?: VillaVideo
  renders?: boolean // true → images are architectural visualisations, show disclaimer
  sizeSqft?: string // built-up area, e.g. "7,336"
  bedrooms?: number
  bathrooms?: number
  levels?: string
  shortSpec: string // condensed line for grid cards
  overview: string[]
  pullQuote: string
  sections: VillaSection[] // accordion: Architecture / Interior / Exterior & Landscape
}

export const villas: Villa[] = [
  {
    slug: 'frond-o-palm-jumeirah',
    aliases: ['villa-o58', 'frond-n-palm-jumeirah'],
    name: 'Frond O',
    status: 'Sold',
    location: 'Palm Jumeirah',
    heroImage: `${FO}/night-exterior.webp`,
    cardImage: `${FO}/pool-terrace.webp`,
    cardAlt: 'Frond O waterfront pool terrace on Palm Jumeirah',
    transformations: [
      {
        label: 'Waterfront Elevation',
        beforeImage: `${FO}/before-exterior.webp`,
        afterImage: `${FO}/after-exterior.webp`,
      },
      {
        label: 'Arrival Elevation',
        beforeImage: `${FO}/arrival-before.webp`,
        afterImage: `${FO}/street-exterior.webp`,
      },
    ],
    video: {
      youtubeId: 'Kca8uk_3ay0',
      title: 'Frond O, Palm Jumeirah | Tierra Luxe',
    },
    gallery: [
      `${FO}/living-room.webp`,
      `${FO}/pool-terrace.webp`,
      `${FO}/kitchen.webp`,
      `${FO}/dressing-room.webp`,
      `${FO}/night-exterior.webp`,
    ],
    portraitGallery: [
      `${FO}/vertical-dining.webp`,
      `${FO}/vertical-entry.webp`,
      `${FO}/vertical-living.webp`,
    ],
    sizeSqft: '7,336',
    bedrooms: 4,
    bathrooms: 5,
    levels: '2',
    shortSpec: '4 Bed · 7,336 sq ft · Palm Jumeirah',
    overview: [
      'Frond O is a completed two-level residence on Palm Jumeirah, transformed from a traditional villa into a contemporary waterfront home.',
      'Across 7,336 square feet, four bedrooms and five bathrooms are arranged around soaring glazing, open living spaces and uninterrupted views towards the water.',
      'The 5,000-square-foot plot is shaped for indoor–outdoor living, with a waterfront pool terrace, sunken seating and a calm palette of stone, timber and glass.',
    ],
    pullQuote: 'A complete waterfront transformation, designed around light, scale and the horizon.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'The original villa was recast as a clean contemporary composition, with expansive glazing, strong horizontal lines and a waterfront elevation opened towards the water.',
        image: `${FO}/street-exterior.webp`,
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Double-height glazing, pale stone and warm timber create generous, light-led rooms. Bespoke joinery and carefully integrated lighting keep the interior refined without feeling formal.',
        image: `${FO}/living-room.webp`,
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'The waterfront garden is organised around a private pool, a sunken conversation lounge and open terraces that extend the main living spaces towards the view.',
        image: `${FO}/pool-terrace.webp`,
      },
    ],
  },
  {
    slug: 'frond-p-palm-jumeirah',
    name: 'Frond P',
    status: 'In Development',
    location: 'Palm Jumeirah',
    renders: true,
    heroImage: `${FP}/beach-terrace.webp`,
    cardImage: `${FP}/beachfront-elevation.webp`,
    cardAlt: 'Frond P beachfront elevation with infinity pool on Palm Jumeirah',
    gallery: [
      `${FP}/living-room.webp`,
      `${FP}/dining.webp`,
      `${FP}/kitchen.webp`,
      `${FP}/staircase.webp`,
      `${FP}/bar.webp`,
      `${FP}/study.webp`,
      `${FP}/principal-suite.webp`,
      `${FP}/outdoor-lounge.webp`,
      `${FP}/pool-view.webp`,
      `${FP}/water-garden.webp`,
    ],
    bedrooms: 4,
    bathrooms: 5,
    levels: '2',
    shortSpec: '4 Bed · 5 Bath · Palm Jumeirah',
    overview: [
      'A beachfront villa on Palm Jumeirah, being reimagined as a contemporary residence of stone and glass that opens entirely towards the sea.',
      'Four bedrooms are arranged across two levels — a principal suite and three en-suite bedrooms — with a study, a bar and generous living and dining spaces at the heart of the plan.',
      'An infinity pool and beach-side terrace carry the living spaces out to the water, framed by a calm water garden and shaded outdoor lounge.',
    ],
    pullQuote: 'Stone, glass and water — a residence that opens entirely to the sea.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A contemporary composition of natural stone and full-height glazing, with a quiet, considered street presence that gives way to an elevation opened wholly towards the beach.',
        image: `${FP}/street-view.webp`,
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Light-led living, dining and kitchen spaces flow into one another, finished in a restrained palette of stone and warm timber, with a sculptural stair connecting the two levels.',
        image: `${FP}/living-room.webp`,
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'An infinity pool, beach-side terrace and water garden extend the home outdoors, layering shade, water and planting between the house and the shoreline.',
        image: `${FP}/pool-view.webp`,
      },
    ],
  },
  {
    slug: 'sienna',
    name: 'Sienna',
    status: 'In Development',
    // FLAG: real location not confirmed — kept general on purpose.
    location: 'Dubai',
    // FLAG: stock placeholder photography — replace with Sienna's own imagery.
    heroImage: img(IMG.poolDusk, 2200),
    cardImage: img(IMG.warmVilla, 1600),
    cardAlt: 'Sienna villa exterior',
    gallery: [img(IMG.livingRoom, 1600), img(IMG.interiorStone, 1600), img(IMG.terracePool, 1600)],
    // FLAG: bedrooms / bathrooms / levels / size not confirmed — omitted.
    shortSpec: 'In Development · Dubai', // FLAG: update once specs are confirmed
    // FLAG: provisional copy — confirm with the project details.
    overview: [
      'Sienna is a villa currently in development, being reimagined from the structure outward with architecture, interiors and landscape considered as one.',
      'Further details of the residence will be shared as the project progresses.',
    ],
    pullQuote: 'A residence being reimagined from the structure outward.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'Proportion, light and flow are being reconsidered before a single finish is chosen.',
        image: img(IMG.whiteFacade, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Interiors are being composed with carefully selected design and craft partners, in a quiet palette of natural materials.',
        image: img(IMG.sereneInterior, 1600),
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'Outdoor spaces are being shaped to extend the living areas, with water, shade and considered planting.',
        image: img(IMG.terracePool, 1600),
      },
    ],
  },
  {
    slug: 'redwood-jumeirah-golf-estates',
    name: 'Redwood',
    status: 'In Development',
    location: 'Jumeirah Golf Estates',
    renders: true,
    heroImage: `${RW}/street-front.webp`,
    cardImage: `${RW}/garden-front.webp`,
    cardAlt: 'Redwood arched villa elevation and garden in Jumeirah Golf Estates',
    gallery: [
      `${RW}/atrium.webp`,
      `${RW}/spiral-stair.webp`,
      `${RW}/living-room.webp`,
      `${RW}/family-room.webp`,
      `${RW}/dining.webp`,
      `${RW}/kitchen.webp`,
      `${RW}/loggia-dining.webp`,
      `${RW}/outdoor-lounge.webp`,
      `${RW}/roof-terrace.webp`,
      `${RW}/pool-garden.webp`,
    ],
    bedrooms: 6,
    levels: '3 + roof terrace',
    shortSpec: '6 Bed · Jumeirah Golf Estates',
    overview: [
      'An arched, Mediterranean-contemporary villa in Jumeirah Golf Estates, organised around a double-height atrium and a sculptural spiral stair.',
      'Six bedrooms — a principal suite, four bedrooms and a guest suite — sit across the ground and first floors, with a gym and cinema below and a lounge terrace on the roof.',
      'Outside, a pool garden with a fire feature and a covered loggia for dining make the garden an extension of the home.',
    ],
    pullQuote: 'Arches, light and a stair that rises like sculpture.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A softly arched elevation in warm, natural tones gives the villa a calm Mediterranean presence, reinterpreted with clean contemporary proportions.',
        image: `${RW}/arched-elevation.webp`,
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'A double-height atrium draws daylight deep into the plan, with a sculptural spiral stair connecting the basement, ground and first floors and the roof terrace above.',
        image: `${RW}/atrium.webp`,
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'A pool garden with a fire feature, a covered loggia for outdoor dining and a roof-terrace lounge layer the outdoor spaces from garden to sky.',
        image: `${RW}/pool-garden.webp`,
      },
    ],
  },
]

export function getVilla(slug: string | undefined): Villa | undefined {
  return villas.find((v) => v.slug === slug || v.aliases?.includes(slug ?? ''))
}

export function relatedVillas(slug: string, count = 2): Villa[] {
  return villas.filter((v) => v.slug !== slug).slice(0, count)
}

/* ------------------------------------------------------------------ *
 * Home villa stack — derived from `villas` (not hand-duplicated) so the
 * two never drift out of sync.
 * ------------------------------------------------------------------ */

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
  eyebrow: 'The Collection',
  title: 'Redefined Residences',
  viewAll: 'View all',
  items: villas.map((v, i) => ({
    index: String(i + 1).padStart(2, '0'),
    slug: v.slug,
    name: v.name,
    category: v.status,
    descriptor: v.pullQuote,
    image: v.cardImage,
    alt: v.cardAlt,
  })) as Project[],
}

export type ProcessStep = {
  no: string
  title: string
  body: string
}

export const process = {
  eyebrow: 'The Tierra Process',
  title: 'From Potential to Home',
  steps: [
    {
      no: '01',
      title: 'Source',
      body: 'Identify villas with transformation potential in established communities.',
    },
    {
      no: '02',
      title: 'Structure',
      body: 'Understand the existing structure, proportions, constraints and potential.',
    },
    {
      no: '03',
      title: 'Design',
      body: 'Reimagine the residence through architecture, interiors, landscape, light and materiality.',
    },
    {
      no: '04',
      title: 'Craft',
      body: 'Work with carefully selected architects, designers, contractors and specialist partners.',
    },
    {
      no: '05',
      title: 'Transform',
      body: 'Execute with attention to quality, natural materials, proportion and detail.',
    },
    {
      no: '06',
      title: 'Realize',
      body: 'Complete the residence and create value for the people and partners involved.',
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
  gallery: [`${FO}/living-room.webp`, `${RW}/living-room.webp`],
  pillars: [
    {
      icon: HeartHandshake,
      title: 'Family Invested',
      body: 'Family invested in every villa. Every decision is made with the same care we would apply if we were moving in ourselves.',
      image: `${FO}/after-exterior.webp`,
    },
    {
      icon: Compass,
      title: 'Harmony by Design',
      body: 'A holistic approach to layout, light and flow, so every home feels balanced by design — long before it is beautiful.',
      image: `${RW}/family-room.webp`,
    },
    {
      icon: Gem,
      title: 'Craft Without Compromise',
      body: 'Architectural and interior excellence in every finish and detail, delivered with carefully selected architects, designers and specialist craft partners.',
      image: `${FO}/kitchen.webp`,
    },
    {
      icon: LineChart,
      title: 'Transparent Participation',
      body: 'Where investment is involved, participation is structured transparently — clear, documented and professional for every partner in a project.',
      image: `${RW}/garden-front.webp`,
    },
  ] as Pillar[],
}

export const contact = {
  eyebrow: 'Begin the Conversation',
  title: "Let's build something exceptional.",
  // faint background — swap for a looped aerial villa clip if desired
  bgPoster: `${FO}/night-exterior.webp`,
  bgAlt: 'Frond O villa exterior at night on Palm Jumeirah',
  interests: ['Buying', 'Selling', 'Investing', 'Partnering with us'],
  socials: [
    // FLAG: placeholder handles — replace with real profile URLs before launch.
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'WhatsApp', href: 'https://wa.me/' },
  ],
  // FLAG: confirm this claim reflects current activity.
  availability: 'Considering new opportunities in established communities',
}

/* ------------------------------------------------------------------ *
 * About page content.
 * ------------------------------------------------------------------ */

export const aboutContent = {
  heroImage: `${FO}/pool-terrace.webp`,
  heroAlt: 'Frond O waterfront pool terrace on Palm Jumeirah',
  label: 'About Us',
  statementHeading: 'More Than a Home',
  statementBody:
    'Tierra Luxe is a family-owned studio that transforms villas with exceptional potential into considered, exceptional homes — in Palm Jumeirah, Jumeirah Golf Estates and other established communities. We reimagine each residence from the structure outward, working with carefully selected architects, designers and specialist partners to bring architecture, interiors and landscape into balance.',
  // Vision is presented before Mission, per brand brief.
  vision: {
    label: 'Vision',
    body: 'To transform overlooked villas into exceptional living environments — homes that are as considered in how they feel as they are beautiful in how they look.',
    image: `${FP}/beach-terrace.webp`,
    alt: 'Frond P beach-side terrace and pool on Palm Jumeirah',
  },
  mission: {
    label: 'Mission',
    body: 'To build exceptional homes while creating a professional, transparent and rewarding experience for every partner in a project — residents, investors, architects, designers, contractors and specialist craft partners alike.',
    image: `${FO}/living-room.webp`,
    alt: 'Frond O double-height living room overlooking the water',
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
      body: 'Family invested in every villa. Every decision is made with the same care we would apply if we were moving in ourselves.',
    },
    {
      n: 3,
      title: 'Integrity',
      body: 'Clear, transparent participation for every partner and investor involved in a project.',
    },
    {
      n: 4,
      title: 'Harmony',
      body: 'A holistic approach to light, proportion and materiality, so each home feels balanced by design.',
    },
    {
      n: 5,
      title: 'Innovation',
      body: 'Considered construction and interior craft applied to homes built to age gracefully.',
    },
  ],
  // Renamed from a single named philosophy to broader, internationally
  // legible language, per brand brief — no dominant foreign-jargon term.
  holistic: {
    eyebrow: 'Our Holistic Approach',
    statement:
      'We design with a *holistic approach* — light, proportion and material in dialogue with how people actually live — so a home feels *balanced* long before it is beautiful.',
    body: 'Orientation, natural light, material and flow are considered together, informed by time-tested principles of balance as much as by architecture itself. It is not decoration; it is the quiet order beneath a home that simply feels right to live in.',
  },
  // FLAG: placeholder names/roles — replace with real leadership + photography.
  team: [
    { name: 'Founder', role: 'Founder & Principal' },
    { name: 'Managing Director', role: 'Managing Director' },
    { name: 'Head of Design', role: 'Head of Design' },
  ],
  brandsHeading: 'Brands We Use',
}

/**
 * Brands We Use — grouped by category, ready for verified logos.
 *
 * FLAG: the previous version of this section listed specific furniture
 * houses (Minotti, Hermès, etc.) that were never confirmed as real Tierra
 * partners — they have been removed rather than presented as fact. Do not
 * add a brand here until the team confirms it is a genuine, current partner.
 * `items: []` renders a tasteful "logos to follow" placeholder per category.
 */
export interface BrandGroup {
  category: string
  items: string[]
}

export const brandGroups: BrandGroup[] = [
  { category: 'Interiors', items: [] },
  { category: 'Stone & Timber', items: [] },
  { category: 'Lighting', items: [] },
  { category: 'Fixtures', items: [] },
  { category: 'Landscape', items: [] },
  { category: 'Specialist Craft', items: [] },
]
