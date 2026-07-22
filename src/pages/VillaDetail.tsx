import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { getVilla, relatedVillas, type Villa } from '../content'
import { EASE, prefersReducedMotion } from '../lib/motion'
import { gsap, ScrollTrigger } from '../lib/gsap'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import EnquirySection from '../components/EnquirySection'
import SiteFooter from '../components/SiteFooter'

export default function VillaDetail() {
  const { slug } = useParams()
  const villa = getVilla(slug)

  // Scroll handled globally on route change; nothing else needed here.
  if (!villa) {
    return (
      <main className="grid min-h-screen place-items-center bg-travertine px-6 text-center">
        <div>
          <p className="section-label mb-4 text-xs text-stone">Not found</p>
          <h1 className="font-display text-4xl text-charcoal md:text-6xl">
            This villa isn't in the collection.
          </h1>
          <Link
            to="/villas"
            className="link-underline mt-8 inline-block text-xs uppercase tracking-[0.2em] text-charcoal"
          >
            ← Back to the collection
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <main>
        <VillaHero villa={villa} />
        <Overview villa={villa} />
        <PinnedGlide villa={villa} />
        <Accordion villa={villa} />
        <Transformation villa={villa} />
        <Proximity villa={villa} />
      </main>
      <EnquirySection villaName={villa.name} />
      <Related slug={villa.slug} />
      <SiteFooter />
    </>
  )
}

/* ---------------------------------------------------------------- Hero */
function VillaHero({ villa }: { villa: Villa }) {
  return (
    <section className="relative h-[86svh] w-full overflow-hidden bg-charcoal">
      <img
        src={villa.heroImage}
        alt={villa.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:px-10">
        <span className="mb-5 inline-flex w-fit rounded-full bg-ivory/85 px-3 py-1 font-grotesk text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal">
          {villa.status}
        </span>
        <h1 className="font-display text-5xl leading-[0.95] text-ivory md:text-8xl">
          {villa.name.split(' ').map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block pr-[0.25em]"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.08 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-5 text-sm uppercase tracking-[0.2em] text-ivory/85"
        >
          {villa.location}
        </motion.p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------- Overview + specs */
function Overview({ villa }: { villa: Villa }) {
  const specs: [string, string][] = [
    ['Address', villa.location],
    ['Bedrooms', String(villa.bedrooms)],
    ['Bathrooms', String(villa.bathrooms)],
    ['Levels', String(villa.levels)],
    ['Built-up Area', `${villa.builtUpSqft} sq.ft`],
    ['Plot Area', `${villa.plotSqft} sq.ft`],
    ['Expected Price', villa.price],
    ['Status', villa.status],
  ]

  return (
    <section className="bg-travertine py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Left — description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="section-label mb-6 text-xs text-stone">Overview</p>
          <div className="space-y-6 text-sm leading-relaxed text-stone md:text-base">
            <p className="border-l-2 border-gold pl-5 font-display text-2xl italic leading-snug text-charcoal md:text-3xl">
              {villa.pullQuote}
            </p>
            {villa.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Right — spec list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          <div className="mb-6 text-right">
            <span className="font-display text-3xl text-charcoal md:text-4xl">
              {villa.name}
            </span>
          </div>
          <dl>
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
              >
                <dt className="section-label text-[11px] text-stone">{label}</dt>
                <dd className="text-right text-sm text-charcoal md:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------- ★ Pinned-image glide */
function StatOverlay({ villa }: { villa: Villa }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-ivory">
      <span className="section-label text-xs text-ivory/80 md:text-sm">
        Enclosed Area
      </span>
      <span className="mt-3 font-display text-7xl leading-none md:text-[10rem]">
        {villa.enclosedAreaSqft}
        <sup className="ml-2 align-top font-body text-base font-light tracking-wide text-ivory/80 md:text-xl">
          Sq.ft.
        </sup>
      </span>
    </div>
  )
}

function GlidePanel({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto max-w-2xl rounded-[24px] border border-line bg-ivory p-10 shadow-[0_40px_100px_-50px_rgba(24,20,16,0.5)] md:p-14"
      >
        {children}
      </motion.div>
    </div>
  )
}

function PinnedGlide({ villa }: { villa: Villa }) {
  const glideRef = useRef<HTMLElement>(null)
  const statRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true)
      return
    }
    // The image is pinned via CSS `sticky` (rock-solid); GSAP ScrollTrigger
    // drives a subtle parallax on the ENCLOSED AREA stat as panels glide over.
    const ctx = gsap.context(() => {
      gsap.to(statRef.current, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: glideRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, glideRef)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [])

  const panelA = (
    <GlidePanel>
      <p className="section-label mb-4 text-xs text-stone">The Experience</p>
      <p className="font-display text-3xl italic leading-snug text-charcoal md:text-4xl">
        {villa.pullQuote}
      </p>
      <p className="mt-6 text-sm leading-relaxed text-stone md:text-base">
        {villa.overview[0]}
      </p>
    </GlidePanel>
  )

  const panelB = (
    <GlidePanel>
      <p className="section-label mb-4 text-xs text-stone">By the Numbers</p>
      <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
        {villa.bedrooms} bedrooms · {villa.bathrooms} bathrooms · {villa.levels} levels
      </p>
      <p className="mt-6 text-sm leading-relaxed text-stone md:text-base">
        {villa.overview[villa.overview.length - 1]}
      </p>
    </GlidePanel>
  )

  // Reduced-motion / no-pin fallback: normal stacked flow.
  if (reduced) {
    return (
      <section className="bg-charcoal">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <img
            src={villa.gallery[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <StatOverlay villa={villa} />
        </div>
        <div className="space-y-10 py-16">
          {panelA}
          {panelB}
        </div>
      </section>
    )
  }

  return (
    <section ref={glideRef} className="relative bg-charcoal">
      {/* Pinned (sticky) background image + persistent stat */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={villa.gallery[0]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div ref={statRef} className="absolute inset-0">
          <StatOverlay villa={villa} />
        </div>
      </div>

      {/* Content that glides over the pinned image; gaps reveal the stat */}
      <div className="relative z-10 -mt-[100vh]">
        <div className="h-screen" /> {/* gap — image + stat */}
        {panelA}
        <div className="h-[80vh]" /> {/* gap — image + stat */}
        {panelB}
        <div className="h-[45vh]" /> {/* trailing gap */}
      </div>
    </section>
  )
}

/* ------------------------------------------------ ★ Numbered accordion */
function Accordion({ villa }: { villa: Villa }) {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-travertine py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {villa.sections.map((s, i) => {
          const isOpen = open === i
          return (
            <div key={s.n} className="border-t border-line last:border-b">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-6 py-8 text-left md:gap-10"
                aria-expanded={isOpen}
              >
                <span className="font-display text-3xl text-gold md:text-4xl">
                  {s.n}
                </span>
                <h3 className="flex-1 font-grotesk text-xl font-bold uppercase tracking-tight text-charcoal md:text-3xl">
                  {s.heading}
                </h3>
                <ChevronDown
                  strokeWidth={1.5}
                  className={`h-6 w-6 shrink-0 text-stone transition-transform duration-500 ease-expo ${
                    isOpen ? 'rotate-180 text-gold' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-12 md:grid-cols-2 md:items-center md:gap-14">
                      <img
                        src={s.image}
                        alt={s.heading}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[20px] object-cover"
                      />
                      <p className="text-sm leading-relaxed text-stone md:text-base">
                        {s.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* --------------------------------------- Experience the Transformation */
function Transformation({ villa }: { villa: Villa }) {
  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="section-label text-xs text-ivory/60">
              The Transformation
            </span>
          </div>
          <h2 className="font-grotesk text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
            Experience the Transformation
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/70 md:text-base">
            Every Tierra villa begins as something ordinary. We take it back to its
            structure and reimagine it from within — proportion, light and flow
            reconsidered, then finished by hand.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/70 md:text-base">
            Drag the slider to see how{' '}
            <span className="text-ivory">{villa.name}</span> was reborn — from the
            home we acquired into the {villa.bedrooms}-bedroom residence it is today.
          </p>
        </motion.div>

        {/* Slider */}
        <BeforeAfterSlider
          before={villa.beforeImage}
          after={villa.afterImage}
          beforeAlt={`${villa.name} before redevelopment`}
          afterAlt={`${villa.name} after redevelopment`}
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------- Proximity */
function Proximity({ villa }: { villa: Villa }) {
  return (
    <section className="bg-charcoal py-20 text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="section-label text-xs text-ivory/60">Proximity</span>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {villa.proximity.map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="font-display text-4xl text-ivory md:text-5xl">
                {p.minutes}
                <span className="ml-2 font-body text-xs uppercase tracking-[0.16em] text-gold">
                  min
                </span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ivory/60">
                {p.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------- Related villas */
function Related({ slug }: { slug: string }) {
  const items = relatedVillas(slug, 3)
  return (
    <section className="bg-travertine py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="section-label text-xs text-stone">More Residences</span>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((v) => (
            <Link key={v.slug} to={`/villas/${v.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[20px] border border-line">
                <img
                  src={v.cardImage}
                  alt={v.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1200 ease-expo group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-display text-2xl text-charcoal">{v.name}</h3>
                <ArrowUpRight
                  strokeWidth={1.5}
                  className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone">
                {v.shortSpec}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
