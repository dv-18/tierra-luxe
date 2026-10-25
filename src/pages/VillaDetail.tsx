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

const RENDER_NOTE = 'Architectural visualisation — final residence may vary.'

/** Spec facts that exist for this villa, in display order. */
function villaFacts(villa: Villa): [string, string][] {
  const facts: [string, string | undefined][] = [
    ['Bedrooms', villa.bedrooms?.toString()],
    ['Bathrooms', villa.bathrooms?.toString()],
    ['Levels', villa.levels],
    ['Size', villa.sizeSqft && `${villa.sizeSqft} sq ft`],
    ['Status', villa.status],
  ]
  return facts.filter((f): f is [string, string] => Boolean(f[1]))
}

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
        <Transformation villa={villa} />
        <Overview villa={villa} />
        <ProjectFilm villa={villa} />
        <PinnedGlide villa={villa} />
        <VillaGallery villa={villa} />
        <Accordion villa={villa} />
      </main>
      {villa.status !== 'Sold' && <EnquirySection villaName={villa.name} />}
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
        <h1 className="max-w-5xl font-display text-4xl leading-[0.95] text-ivory sm:text-5xl md:text-7xl lg:text-8xl">
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
      {villa.renders && (
        <p className="absolute bottom-6 right-6 z-10 text-[10px] uppercase tracking-[0.18em] text-stone/80 md:right-10">
          {RENDER_NOTE}
        </p>
      )}
    </section>
  )
}

/* ---------------------------------------------------- Overview + specs */
function Overview({ villa }: { villa: Villa }) {
  const specs = villaFacts(villa)

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

/* ------------------------------------------------------ Project film */
function ProjectFilm({ villa }: { villa: Villa }) {
  if (!villa.video) return null

  const { youtubeId, title } = villa.video
  const src =
    `https://www.youtube.com/embed/${youtubeId}` +
    `?si=bqMisemmJl1iIpws&controls=0&cc_load_policy=0&disablekb=1` +
    `&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`

  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="section-label text-xs text-ivory/60">Project Film</span>
            </div>
            <h2 className="font-grotesk text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
              Experience {villa.name}
            </h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative aspect-video overflow-hidden rounded-[24px] border border-ivory/10 bg-charcoal"
        >
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10" />
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------- ★ Pinned-image glide */
function StatOverlay({ villa }: { villa: Villa }) {
  // Lead with size when known, otherwise bedrooms, otherwise the location.
  const [label, value, unit] = villa.sizeSqft
    ? ['Size', villa.sizeSqft, 'Sq.ft.']
    : villa.bedrooms
      ? ['Bedrooms', String(villa.bedrooms), '']
      : ['Location', villa.location, '']
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
      <span className="section-label text-xs text-ivory/80 md:text-sm">{label}</span>
      <span
        className={`mt-3 font-display leading-none ${
          value.length > 8 ? 'text-5xl md:text-8xl' : 'text-7xl md:text-[10rem]'
        }`}
      >
        {value}
        {unit && (
          <sup className="ml-2 align-top font-body text-base font-light tracking-wide text-ivory/80 md:text-xl">
            {unit}
          </sup>
        )}
      </span>
    </div>
  )
}

function GlidePanel({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto max-w-2xl rounded-[24px] border border-line bg-ivory p-7 shadow-[0_40px_100px_-50px_rgba(24,20,16,0.5)] sm:p-10 md:p-14"
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
    if (prefersReducedMotion() || window.matchMedia('(max-width: 767px)').matches) {
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

  const numbers = [
    villa.bedrooms && `${villa.bedrooms} bedrooms`,
    villa.bathrooms && `${villa.bathrooms} bathrooms`,
    villa.levels && `${villa.levels} ${villa.levels === '1' ? 'level' : 'levels'}`,
  ].filter(Boolean)

  const panelB = (
    <GlidePanel>
      <p className="section-label mb-4 text-xs text-stone">
        {numbers.length > 0 ? 'By the Numbers' : villa.status}
      </p>
      <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
        {numbers.length > 0 ? numbers.join(' · ') : villa.location}
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
        <div className="relative h-[58svh] min-h-[440px] w-full overflow-hidden md:h-[70vh]">
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

/* ---------------------------------------------------------- Gallery */
function VillaGallery({ villa }: { villa: Villa }) {
  if (villa.gallery.length < 2) return null

  return (
    <section className="bg-travertine py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="section-label text-xs text-stone">Gallery</span>
            </div>
            <h2 className="font-grotesk text-3xl font-extrabold uppercase leading-tight tracking-tight text-charcoal md:text-5xl">
              Inside {villa.name}
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {villa.gallery.map((image, index) => (
            <motion.figure
              key={image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE, delay: Math.min(index * 0.06, 0.24) }}
              className={`overflow-hidden rounded-[20px] border border-line ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <img
                src={image}
                alt={`${villa.name} gallery view ${index + 1}`}
                loading="lazy"
                className={`w-full object-cover ${
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              />
            </motion.figure>
          ))}
        </div>

        {villa.portraitGallery && villa.portraitGallery.length > 0 && (
          <div className="-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {villa.portraitGallery.map((image, index) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.06 }}
                className="min-w-[78vw] snap-center overflow-hidden rounded-[20px] border border-line sm:min-w-0"
              >
                <img
                  src={image}
                  alt={`${villa.name} interior view ${index + 1}`}
                  loading="lazy"
                  className="aspect-[2/3] h-full w-full object-cover"
                />
              </motion.figure>
            ))}
          </div>
        )}

        {villa.renders && (
          <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-stone/70">
            {RENDER_NOTE}
          </p>
        )}
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
  // Only real before/after pairs earn this section.
  const transformations = (villa.transformations ?? []).filter((t) => t.beforeImage)
  if (transformations.length === 0) return null

  return (
    <section className="bg-charcoal py-16 text-ivory sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
          className="max-w-3xl"
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
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
            Every Tierra villa begins as something ordinary. We take it back to its
            structure and reimagine it from within, with proportion, light and flow
            reconsidered, then finished by hand.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
            Drag {transformations.length > 1 ? 'each slider' : 'the slider'} to compare the original villa with the completed{' '}
            <span className="text-ivory">{villa.name}</span> residence.
          </p>
        </motion.div>

        <div
          className={`mt-10 grid gap-10 md:mt-14 ${
            transformations.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl'
          }`}
        >
          {transformations.map((item, index) => (
            <div key={`${item.beforeImage ?? 'completed'}-${item.afterImage}`} className="min-w-0">
              {item.label && (
                <p className="section-label mb-4 text-xs text-ivory/60">{item.label}</p>
              )}
              <BeforeAfterSlider
                before={item.beforeImage!}
                after={item.afterImage}
                beforeAlt={`${villa.name} before redevelopment, view ${index + 1}`}
                afterAlt={`${villa.name} after redevelopment, view ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------- Related villas */
function Related({ slug }: { slug: string }) {
  const items = relatedVillas(slug, 2)
  return (
    <section className="bg-travertine py-24 md:py-28">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="section-label text-xs text-stone">More Residences</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((v) => (
            <Link key={v.slug} to={`/villas/${v.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[20px] border border-line">
                <img
                  src={v.cardImage}
                  alt={v.cardAlt}
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
