import { lazy, Suspense, useEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { hero } from '../content'
import { EASE, prefersReducedMotion } from '../lib/motion'

// hls.js is only needed when real footage is wired in — keep it out of the
// initial bundle and load it on demand.
const FadingVideo = lazy(() => import('./FadingVideo'))

const CHAPTER_MS = 7000
const FADE_MS = 500

/**
 * rAF opacity crossfade across N layers. Reads current opacity each frame so
 * an interrupted fade resumes mid-way rather than snapping.
 */
function useCrossfade(count: number, active: number) {
  const targetRef = useRef(active)
  targetRef.current = active
  const valsRef = useRef<number[]>(
    Array.from({ length: count }, (_, i) => (i === active ? 1 : 0)),
  )
  const [, force] = useReducer((x) => x + 1, 0)
  const rafRef = useRef<number | undefined>(undefined)
  const lastRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (prefersReducedMotion()) {
      valsRef.current = valsRef.current.map((_, i) => (i === targetRef.current ? 1 : 0))
      force()
      return
    }
    const loop = (t: number) => {
      const last = lastRef.current ?? t
      const dt = Math.min(t - last, 100)
      lastRef.current = t
      let settled = true
      valsRef.current = valsRef.current.map((o, i) => {
        const target = i === targetRef.current ? 1 : 0
        const delta = dt / FADE_MS
        let v = o
        if (o < target) v = Math.min(target, o + delta)
        else if (o > target) v = Math.max(target, o - delta)
        if (Math.abs(v - target) > 0.001) settled = false
        return v
      })
      force()
      if (!settled) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        rafRef.current = undefined
        lastRef.current = undefined
      }
    }
    if (rafRef.current === undefined) {
      lastRef.current = undefined
      rafRef.current = requestAnimationFrame(loop)
    }
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }
  }, [active])

  return valsRef.current
}

export default function Hero({ ready }: { ready: boolean }) {
  const chapters = hero.chapters
  const [active, setActive] = useState(0)
  const opacities = useCrossfade(chapters.length, active)

  // Auto-advance chapters (paused until the preloader has revealed the hero).
  useEffect(() => {
    if (!ready) return
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % chapters.length),
      CHAPTER_MS,
    )
    return () => window.clearTimeout(id)
  }, [active, ready, chapters.length])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const word = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: EASE },
    },
  }
  const soft = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  }

  const current = chapters[active]

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {/* Media layers */}
      <div className="absolute inset-0">
        {chapters.map((c, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ opacity: opacities[i] }}
            aria-hidden={i !== active}
          >
            {hero.useVideo && c.video ? (
              <Suspense
                fallback={
                  <img
                    src={c.poster}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                }
              >
                <FadingVideo
                  hls={c.video.hls}
                  mp4={c.video.mp4}
                  poster={c.poster}
                  active={i === active}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Suspense>
            ) : (
              <img
                src={c.poster}
                alt={i === active ? c.alt : ''}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: i === active ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 8000ms linear',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Scrims: nav legibility (top), text legibility + melt into next (bottom) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-32">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={container}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <motion.p
                variants={soft}
                className="mb-5 text-xs uppercase tracking-[0.3em] text-ivory/80"
              >
                {current.eyebrow}
              </motion.p>
              <h1 className="font-display italic leading-[0.95] text-ivory text-5xl md:text-7xl lg:text-8xl">
                {current.title.split(' ').map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-bottom">
                    <motion.span variants={word} className="inline-block pr-[0.25em]">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Supporting line + CTAs (constant across chapters) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            transition={{ delayChildren: 0.6 }}
          >
            <motion.p
              variants={soft}
              className="mt-7 max-w-lg font-body text-sm font-light text-ivory/85 md:text-base"
            >
              {hero.supporting}
            </motion.p>

            <motion.div variants={soft} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={hero.ctas.primary.href}
                className="group inline-flex items-center rounded-full bg-ivory px-7 py-3 text-xs uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 ease-expo hover:bg-transparent hover:text-ivory hover:ring-1 hover:ring-inset hover:ring-ivory/70"
              >
                {hero.ctas.primary.label}
              </a>
              <a
                href={hero.ctas.secondary.href}
                className="link-underline group inline-flex items-center gap-2 rounded-full border border-ivory/50 px-7 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition-colors duration-500 ease-expo hover:border-ivory"
              >
                {hero.ctas.secondary.label}
                <ArrowUpRight
                  strokeWidth={1.5}
                  className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide index + dots (bottom-right) */}
      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-5 md:right-10">
        <div className="flex items-center gap-3">
          {chapters.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show chapter ${i + 1}`}
              className="group relative flex flex-col items-center"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  i === active ? 'bg-gold' : 'bg-ivory/40 group-hover:bg-ivory/70'
                }`}
              />
              {i === active && (
                <span className="absolute -bottom-2 h-px w-8 overflow-hidden">
                  <motion.span
                    key={active}
                    className="block h-full w-full origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CHAPTER_MS / 1000, ease: 'linear' }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="font-display text-lg tabular-nums text-ivory/70">
          <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
          <span className="mx-1 text-ivory/40">—</span>
          {String(chapters.length).padStart(2, '0')}
        </p>
      </div>

      {/* Scroll cue (bottom-center) */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">Scroll</span>
        <span className="relative block h-12 w-px bg-ivory/25">
          <span className="absolute left-0 top-0 h-4 w-full animate-float-slow bg-gold" />
        </span>
      </div>
    </section>
  )
}
