import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { aboutContent } from '../content'
import { EASE, prefersReducedMotion, revealUp } from '../lib/motion'
import { gsap, ScrollTrigger } from '../lib/gsap'
import Brands from '../components/Brands'
import EnquirySection from '../components/EnquirySection'
import SiteFooter from '../components/SiteFooter'

/** Render *starred* words as italic gold emphasis. */
function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <em key={i} className="italic text-gold">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export default function About() {
  return (
    <>
      <main>
        <Hero />
        <Statement />
        <MissionVision block={aboutContent.mission} />
        <MissionVision block={aboutContent.vision} />
        <Values />
        <Vastu />
        <Team />
        <Brands />
      </main>
      <EnquirySection />
      <SiteFooter />
    </>
  )
}

/* ------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative h-[80svh] w-full overflow-hidden bg-charcoal">
      <img
        src={aboutContent.heroImage}
        alt={aboutContent.heroAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ivory to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-6 pb-24 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="font-grotesk text-6xl font-extrabold uppercase leading-none tracking-tight text-ivory md:text-8xl"
        >
          {aboutContent.label}
        </motion.h1>
      </div>
    </section>
  )
}

/* -------------------------------------------------- Black statement */
function Statement() {
  return (
    <section className="bg-charcoal py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="font-grotesk text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl"
        >
          {aboutContent.statementHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base"
        >
          {aboutContent.statementBody}
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------- Mission / Vision block */
function MissionVision({
  block,
}: {
  block: { label: string; body: string; image: string; alt: string }
}) {
  return (
    <section className="bg-travertine py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <div className="md:col-span-5">
          <motion.h2
            {...revealUp}
            className="font-grotesk text-3xl font-extrabold uppercase tracking-tight text-charcoal md:text-5xl"
          >
            {block.label}
          </motion.h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 block h-px w-16 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            className="mt-8 text-sm leading-relaxed text-stone md:text-base"
          >
            {block.body}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="md:col-span-7"
        >
          <img
            src={block.image}
            alt={block.alt}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[24px] border border-line object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------- Values (pinned scroll-crossfade) */
const valueTextStyle = (i: number, active: number): CSSProperties => ({
  opacity: i === active ? 1 : 0,
  filter: i === active ? 'blur(0px)' : 'blur(6px)',
  transform: `translateY(${i === active ? 0 : i < active ? -28 : 28}px)`,
  transition: 'opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease',
  pointerEvents: i === active ? 'auto' : 'none',
})

function Values() {
  const values = aboutContent.values
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  // Same pin-and-scrub mechanism as the Home "Tierra Standard" section:
  // the section pins for N values' worth of scroll, advancing `active` as
  // the visitor scrolls rather than only on a dot click.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true)
      return
    }
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${values.length * window.innerHeight * 0.85}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            values.length - 1,
            Math.floor(self.progress * values.length),
          )
          setActive(idx)
        },
      })
      stRef.current = st
    }, sectionRef)
    return () => ctx.revert()
  }, [values.length])

  const jumpTo = (i: number) => {
    setActive(i)
    const st = stRef.current
    if (!st) return
    const target = st.start + ((i + 0.5) / values.length) * (st.end - st.start)
    st.scroll(target)
  }

  const Dots = () => (
    <div className="mt-16 flex items-center gap-4">
      {values.map((val, idx) => (
        <button
          key={val.n}
          type="button"
          onClick={() => jumpTo(idx)}
          aria-label={`Show value ${val.n}: ${val.title}`}
          className="group flex items-center gap-4"
        >
          <span
            className={`font-grotesk text-xs tracking-[0.2em] transition-colors duration-500 ${
              idx === active ? 'text-gold' : 'text-ivory/40 group-hover:text-ivory/70'
            }`}
          >
            0{val.n}
          </span>
          {idx < values.length - 1 && <span className="h-px w-6 bg-ivory/20" />}
        </button>
      ))}
    </div>
  )

  // --- Reduced-motion fallback: simple stacked values with fades ---
  if (reduced) {
    return (
      <section className="bg-charcoal py-28 text-ivory md:py-36">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="mb-14 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="section-label text-xs text-ivory/60">Values</span>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {values.map((val, i) => (
              <motion.div
                key={val.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                <span className="font-display text-5xl leading-none text-gold/80">
                  {val.n}
                </span>
                <h3 className="mt-4 font-grotesk text-2xl font-extrabold uppercase tracking-tight">
                  {val.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // --- Pinned scroll-crossfade ---
  return (
    <section ref={sectionRef} className="bg-charcoal text-ivory">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6 md:px-10">
          <div className="mb-14 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="section-label text-xs text-ivory/60">Values</span>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-20">
            {/* Big index */}
            <div className="font-display text-[7rem] leading-none text-gold/80 md:text-[12rem]">
              {active + 1}
            </div>

            {/* Crossfading value */}
            <div className="relative min-h-[180px]">
              {values.map((val, i) => (
                <div
                  key={val.n}
                  className="absolute inset-0"
                  style={valueTextStyle(i, active)}
                  aria-hidden={i !== active}
                >
                  <h3 className="font-grotesk text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
                    {val.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/70 md:text-base">
                    {val.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Dots />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Vastu block */
function Vastu() {
  return (
    <section className="bg-travertine py-28 md:py-36">
      <div className="mx-auto max-w-[1000px] px-6">
        <motion.div {...revealUp} className="mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs uppercase tracking-[0.28em] text-stone">
            {aboutContent.vastu.eyebrow}
          </span>
        </motion.div>
        <motion.h2
          {...revealUp}
          className="font-display text-3xl leading-[1.15] text-charcoal md:text-5xl text-balance"
        >
          <Emphasis text={aboutContent.vastu.statement} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mt-8 max-w-2xl text-sm leading-relaxed text-stone md:text-base"
        >
          {aboutContent.vastu.body}
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Team */
function Team() {
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="section-label text-xs text-stone">The Family</span>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutContent.team.map((m, i) => {
            const initials = m.name
              .split(' ')
              .map((s) => s[0])
              .join('')
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                className="rounded-[24px] border border-line bg-ivory p-8"
              >
                <div className="mb-6 grid aspect-[4/5] w-full place-items-center rounded-[16px] bg-sand">
                  <span className="font-display text-6xl italic text-stone/50">
                    {initials}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-charcoal">{m.name}</h3>
                <p className="mt-1 section-label text-[11px] text-stone">{m.role}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
