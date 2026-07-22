import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { experience } from '../content'
import { EASE, prefersReducedMotion } from '../lib/motion'
import { gsap, ScrollTrigger } from '../lib/gsap'

const pillars = experience.pillars

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLDivElement>(null)
  const secondaryRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true)
      return
    }
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${pillars.length * window.innerHeight * 0.85}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            pillars.length - 1,
            Math.floor(self.progress * pillars.length),
          )
          setActive(idx)
          gsap.set(primaryRef.current, { yPercent: -8 * self.progress })
          gsap.set(secondaryRef.current, { yPercent: -18 * self.progress })
        },
      })
      stRef.current = st
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const jumpTo = (i: number) => {
    setActive(i)
    const st = stRef.current
    if (!st) return
    const target = st.start + ((i + 0.5) / pillars.length) * (st.end - st.start)
    st.scroll(target)
  }

  const textStyle = (i: number): CSSProperties => ({
    opacity: i === active ? 1 : 0,
    filter: i === active ? 'blur(0px)' : 'blur(6px)',
    transform: `translateY(${i === active ? 0 : i < active ? -28 : 28}px)`,
    transition: 'opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease',
    pointerEvents: i === active ? 'auto' : 'none',
  })

  // --- Reduced-motion fallback: simple stacked pillars with fades ---
  if (reduced) {
    return (
      <section id="invest" className="bg-charcoal py-28 text-ivory">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Heading />
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                <img
                  src={p.image}
                  alt=""
                  className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover"
                />
                <span className="section-label text-xs text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-3xl italic">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // --- Pinned word-crossfade ---
  return (
    <section id="invest" ref={sectionRef} className="bg-charcoal text-ivory">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 pt-24 md:px-10">
          <Heading />

          <div className="grid flex-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            {/* Left: parallax image stack that swaps with the active pillar */}
            <div className="relative h-[42vh] md:h-[58vh]">
              <div ref={primaryRef} className="absolute inset-0">
                {pillars.map((p, i) => (
                  <img
                    key={p.title}
                    src={p.image}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transition: 'opacity 0.8s ease',
                    }}
                  />
                ))}
              </div>

              {/* Secondary accent image, offset + faster parallax */}
              <div
                ref={secondaryRef}
                className="absolute -bottom-10 -right-4 hidden h-1/2 w-1/2 overflow-hidden rounded-xl border border-gold/40 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:block"
              >
                {experience.gallery.map((g, i) => (
                  <img
                    key={g}
                    src={g}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      opacity: i === active % experience.gallery.length ? 1 : 0,
                      transition: 'opacity 0.8s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: one pillar at a time, crossfading */}
            <div className="relative h-[40vh] md:h-[46vh]">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={textStyle(i)}
                  aria-hidden={i !== active}
                >
                  <span className="section-label text-xs text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-4xl italic leading-tight md:text-6xl">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/70 md:text-base">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Index dots */}
          <div className="flex items-center justify-center gap-6 pb-10">
            {pillars.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Show pillar ${i + 1}`}
                className={`font-grotesk text-xs tracking-[0.2em] transition-colors duration-500 ${
                  i === active ? 'text-gold' : 'text-ivory/40 hover:text-ivory/70'
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Heading() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px w-10 bg-gold" />
        <span className="section-label text-xs text-ivory/60">
          {experience.eyebrow}
        </span>
      </div>
      <h2 className="font-grotesk text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
        {experience.title}
      </h2>
    </div>
  )
}
