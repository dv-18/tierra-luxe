/**
 * Tierra Luxe — single source of truth for all copy + media.
 *
 * ⚠️ NEEDS-CONFIRMATION — search this file for "FLAG:" to find every place
 * that holds a placeholder pending real business data. Nothing here should
 * be treated as verified fact until the flagged items are confirmed:
 *   - The four villa names (only 3 were specified in the brief; the 4th is
 *     a temporary placeholder) and which real project each maps to.
 *   - Every villa's bedrooms/bathrooms/levels/size/status.
 *   - The brand partner list (previously-listed names were unverified
 *     placeholders and have been removed rather than presented as fact).
 *   - Contact email + social handles.
 *   - All photography/video (still Unsplash stock placeholders).
 *
 * Images: replace the Unsplash URLs with Tierra's own photography.
 * Video:  set `hero.useVideo = true` and give the hero chapter a `video.hls`
 *         (HLS master playlist) and/or `video.mp4` fallback once real
 *         footage exists. Footage must show exterior architecture, living,
 *         dining, landscaping, materials and indoor/outdoor space — never
 *         bedrooms.
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
  kitchen: '1600210492486-724fe5c67fb0',
  poolside: '1602343168117-bb8ffe3e2e9f',
  coastalVilla: '1564013799919-ab600027ffc6',
  house: '1570129477492-45c003edd2be',
  // "Before" — dated / pre-redevelopment placeholders for the transformation slider
  before1: '1583608205776-bfd35f0d9f83', // traditional villa + palms
  before2: '1576941089067-2de3c901e126', // white house, red roof
  before3: '1568605114967-8130f3a36994', // traditional chalet at dusk
  before4: '1605146769289-440113cc3d00', // suburban brick home
}

/* A ready-to-use HLS test stream so the streaming pipeline works the moment
 * `hero.useVideo` is flipped on. Replace with Tierra's own villa footage —
 * exterior/architecture/living/landscape only, never bedrooms. */
const SAMPLE_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

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
  video?: { hls?: string; mp4?: string }
}

export const hero = {
  /**
   * A single calm, editorial hero — not an auto-advancing carousel.
   * Flip to true once real cinematic footage exists (exterior architecture,
   * living, dining, landscaping, materials — no bedrooms).
   */
  useVideo: false,
  supporting:
    'We identify villas with exceptional potential in Palm Jumeirah, Jumeirah Golf Estates and other established communities — and reimagine them from the structure outward, with architecture, interiors and landscape considered as one.',
  ctas: {
    primary: { label: 'View the Collection', href: '#villas' },
    secondary: { label: 'About Tierra Luxe', to: '/about' },
  },
  // A single chapter — Hero.tsx suppresses carousel chrome (dots, index
  // counter, auto-advance) automatically whenever this array holds one item.
  chapters: [
    {
      eyebrow: 'A Residential Transformation Studio',
      title: 'Transforming Villas Into Exceptional Living Spaces',
      poster: img(IMG.warmVilla, 2200),
      alt: 'Warmly lit villa exterior with landscaped grounds at golden hour — no interior bedrooms shown',
      video: { hls: SAMPLE_HLS, mp4: '' },
    },
  ] as HeroChapter[],
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
 * FLAG — needs confirmation before launch:
 *   1. Names: the brief specified "Villa Palm Front O", "Villa CNR" and
 *      "Villa Redwood" but not which real project each corresponds to —
 *      the mapping below (in collection order) is provisional and MUST be
 *      checked against the actual projects.
 *   2. The fourth villa's name was not established — "Villa Four" below is
 *      an explicit temporary placeholder, not a real name. Replace it.
 *   3. Every bedrooms/bathrooms/levels/size/status value below is a
 *      placeholder carried over from earlier draft copy — none are
 *      confirmed. In particular "status" defaults to "Available" for all
 *      four rather than guessing at "Sold"/"Under Offer", since presenting
 *      an unconfirmed sale status would be a real (not just cosmetic)
 *      mistake.
 *   4. Locations are kept general ("Palm Jumeirah") rather than citing a
 *      specific frond/plot, since the exact plot was not confirmed.
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
  status: string // Available / Under Offer / Sold — FLAG: confirm real status
  location: string
  heroImage: string
  cardImage: string
  gallery: string[]
  beforeImage: string // pre-redevelopment (transformation slider)
  afterImage: string // post-redevelopment (transformation slider)
  sizeSqft: string // approximate size, e.g. "8,200+ sq ft"
  bedrooms: number
  bathrooms: number
  levels: number
  shortSpec: string // condensed line for grid cards, e.g. "5 Bed · 6 Bath · 2 Levels"
  overview: string[]
  pullQuote: string
  sections: VillaSection[] // accordion: Architecture / Interior / Exterior & Landscape
}

export const villas: Villa[] = [
  {
    slug: 'villa-palm-front-o',
    name: 'Villa Palm Front O', // FLAG: confirm this maps to the intended project
    status: 'Available', // FLAG: confirm actual status
    location: 'Palm Jumeirah',
    heroImage: img(IMG.poolDusk, 2200),
    cardImage: img(IMG.livingRoom, 1600),
    beforeImage: img(IMG.before1, 1600),
    afterImage: img(IMG.poolDusk, 1600),
    gallery: [img(IMG.sereneInterior, 1600), img(IMG.interiorWood, 1600), img(IMG.terracePool, 1600)],
    sizeSqft: '8,200+ sq ft', // FLAG: confirm
    bedrooms: 5, // FLAG: confirm
    bathrooms: 6, // FLAG: confirm
    levels: 2, // FLAG: confirm
    shortSpec: '5 Bed · 6 Bath · 2 Levels',
    overview: [
      'A garden-fronted villa reimagined around a single, uninterrupted living volume — the ground plane opened wall to wall so light and water read as one continuous surface from entrance to pool.',
      'The redesign strips away the original compartmented plan in favour of clarity: fewer rooms, larger, each framed by full-height glazing that dissolves the line between inside and out.',
      'Materials are quiet and considered — natural stone underfoot, oiled timber overhead — chosen to age gracefully in the coastal light.',
    ],
    pullQuote: 'Fewer rooms, larger, each framed by light and water.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A double-height living volume anchors the plan, its structure re-engineered to remove internal columns and carry a continuous ribbon of glazing. Proportion and light were reconsidered before a single finish was chosen.',
        image: img(IMG.whiteFacade, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'Interiors are composed by hand with carefully selected design and craft partners — natural stone floors, oiled-timber joinery and stone monoliths that feel excavated rather than installed.',
        image: img(IMG.livingRoom, 1600),
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'A mirror-still pool runs the length of the garden elevation, wrapped by shaded terraces, an outdoor kitchen and mature landscaping that gives the plot immediate privacy.',
        image: img(IMG.terracePool, 1600),
      },
    ],
  },
  {
    slug: 'villa-cnr',
    name: 'Villa CNR', // FLAG: confirm this maps to the intended project
    status: 'Available', // FLAG: confirm actual status
    location: 'Palm Jumeirah',
    heroImage: img(IMG.warmVilla, 2200),
    cardImage: img(IMG.sereneInterior, 1600),
    beforeImage: img(IMG.before2, 1600),
    afterImage: img(IMG.warmVilla, 1600),
    gallery: [img(IMG.interiorStone, 1600), img(IMG.interiorWood, 1600), img(IMG.poolside, 1600)],
    sizeSqft: '9,400+ sq ft', // FLAG: confirm
    bedrooms: 6, // FLAG: confirm
    bathrooms: 7, // FLAG: confirm
    levels: 2, // FLAG: confirm
    shortSpec: '6 Bed · 7 Bath · 2 Levels',
    overview: [
      'Every axis of this corner residence was reconsidered for balance — orientation, entry, water and light re-tuned so the home feels settled the moment you step inside.',
      'The result is a house that breathes: quiet courtyards, a central spine of daylight, and rooms that open toward the morning sun.',
      'It is one of the studio’s clearest statements of harmony by design — architecture in service of stillness.',
    ],
    pullQuote: 'A house that breathes — architecture in service of stillness.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'The plan is organised around a central light-well aligned to the cardinal points, with the primary suite oriented for privacy and morning light. Massing steps back to admit low light deep into the home.',
        image: img(IMG.whiteHouse, 1600),
      },
      {
        n: 2,
        heading: 'The Interior',
        body: 'A restrained, tonal palette — lime plaster, pale timber and brushed bronze — lets natural light do the work. Bespoke joinery conceals storage so surfaces stay calm.',
        image: img(IMG.sereneInterior, 1600),
      },
      {
        n: 3,
        heading: 'Exterior & Landscape',
        body: 'A courtyard, reflecting pool and shaded terrace extend the sense of calm outdoors, framed by considered, low-maintenance planting.',
        image: img(IMG.poolside, 1600),
      },
    ],
  },
  {
    slug: 'villa-redwood',
    name: 'Villa Redwood', // FLAG: confirm this maps to the intended project
    status: 'Available', // FLAG: confirm actual status
    location: 'Palm Jumeirah',
    heroImage: img(IMG.aerialCoast, 2200),
    cardImage: img(IMG.terracePool, 1600),
    beforeImage: img(IMG.before3, 1600),
    afterImage: img(IMG.terracePool, 1600),
    gallery: [img(IMG.poolDusk, 1600), img(IMG.interiorWood, 1600), img(IMG.house, 1600)],
    sizeSqft: '14,000+ sq ft', // FLAG: confirm
    bedrooms: 7, // FLAG: confirm
    bathrooms: 9, // FLAG: confirm
    levels: 3, // FLAG: confirm
    shortSpec: '7 Bed · 9 Bath · 3 Levels',
    overview: [
      'Taken back to its frame and rebuilt, this residence is the most ambitious transformation in the current collection — three levels organised around a full-height atrium.',
      'A considered sequence of spaces carries light and water from entrance to garden, with every threshold detailed to disappear.',
      'Sea-facing glazing runs the rear elevation, dissolving the boundary between the living spaces and the water beyond.',
    ],
    pullQuote: 'A residence rebuilt from the frame outward.',
    sections: [
      {
        n: 1,
        heading: 'The Architecture',
        body: 'A complete structural rebuild allowed a three-storey atrium and a cantilevered upper floor. The rear elevation is entirely glazed to capture uninterrupted views.',
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
        heading: 'Exterior & Landscape',
        body: 'A rooftop pool, shaded terraces and mature landscaping make the residence feel self-contained without closing off the view.',
        image: img(IMG.poolDusk, 1600),
      },
    ],
  },
  {
    // FLAG: temporary placeholder — the brief explicitly asked not to invent
    // a real name for the fourth villa. Replace slug + name once confirmed.
    slug: 'villa-four',
    name: 'Villa Four', // FLAG: placeholder — real name pending
    status: 'Available', // FLAG: confirm actual status
    location: 'Palm Jumeirah',
    heroImage: img(IMG.whiteFacade, 2200),
    cardImage: img(IMG.coastalVilla, 1600),
    beforeImage: img(IMG.before4, 1600),
    afterImage: img(IMG.coastalVilla, 1600),
    gallery: [img(IMG.kitchen, 1600), img(IMG.terracePool, 1600), img(IMG.livingRoom, 1600)],
    sizeSqft: '7,600+ sq ft', // FLAG: confirm
    bedrooms: 5, // FLAG: confirm
    bathrooms: 6, // FLAG: confirm
    levels: 2, // FLAG: confirm
    shortSpec: '5 Bed · 6 Bath · 2 Levels',
    overview: [
      'Coastal-facing living reimagined with seamless indoor–outdoor thresholds — sliding walls of glass retract entirely so the living room and terrace become one room.',
      'The palette is bright and salt-washed, a lighter counterpoint to the rest of the collection.',
      'Shaded terraces and deep overhangs keep the interior cool through the warmer months.',
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
        heading: 'Exterior & Landscape',
        body: 'A wraparound terrace, pool and shaded lounge extend the living space outdoors, with direct water access.',
        image: img(IMG.terracePool, 1600),
      },
    ],
  },
]

export function getVilla(slug: string | undefined): Villa | undefined {
  return villas.find((v) => v.slug === slug)
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
    alt: `${v.name} exterior`,
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
  gallery: [img(IMG.interiorStone, 1400), img(IMG.interiorWood, 1400)],
  pillars: [
    {
      icon: HeartHandshake,
      title: 'Family Invested',
      body: 'Family invested in every villa. Every decision is made with the same care we would apply if we were moving in ourselves.',
      image: img(IMG.warmVilla, 1600),
    },
    {
      icon: Compass,
      title: 'Harmony by Design',
      body: 'A holistic approach to layout, light and flow, so every home feels balanced by design — long before it is beautiful.',
      image: img(IMG.sereneInterior, 1600),
    },
    {
      icon: Gem,
      title: 'Craft Without Compromise',
      body: 'Architectural and interior excellence in every finish and detail, delivered with carefully selected architects, designers and specialist craft partners.',
      image: img(IMG.livingRoom, 1600),
    },
    {
      icon: LineChart,
      title: 'Transparent Participation',
      body: 'Where investment is involved, participation is structured transparently — clear, documented and professional for every partner in a project.',
      image: img(IMG.terracePool, 1600),
    },
  ] as Pillar[],
}

export const contact = {
  eyebrow: 'Begin the Conversation',
  title: "Let's build something exceptional.",
  // faint background — swap for a looped aerial villa clip if desired
  bgPoster: img(IMG.aerialCoast, 2000),
  bgAlt: 'Aerial view of a coastline at golden hour',
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
  heroImage: img(IMG.warmVilla, 2400),
  heroAlt: 'Warmly lit luxury villa exterior at golden hour',
  label: 'About Us',
  statementHeading: 'More Than a Home',
  statementBody:
    'Tierra Luxe is a family-owned studio that transforms villas with exceptional potential into considered, exceptional homes — in Palm Jumeirah, Jumeirah Golf Estates and other established communities. We reimagine each residence from the structure outward, working with carefully selected architects, designers and specialist partners to bring architecture, interiors and landscape into balance.',
  // Vision is presented before Mission, per brand brief.
  vision: {
    label: 'Vision',
    body: 'To transform overlooked villas into exceptional living environments — homes that are as considered in how they feel as they are beautiful in how they look.',
    image: img(IMG.terracePool, 1600),
    alt: 'Luxury villa terrace opening onto a landscaped pool',
  },
  mission: {
    label: 'Mission',
    body: 'To build exceptional homes while creating a professional, transparent and rewarding experience for every partner in a project — residents, investors, architects, designers, contractors and specialist craft partners alike.',
    image: img(IMG.sereneInterior, 1600),
    alt: 'Serene, light-filled interior with natural materials',
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
