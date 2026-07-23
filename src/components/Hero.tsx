import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { hero } from '../content'
import { EASE } from '../lib/motion'

const CHAPTER_MS = 7000

export default function Hero({ ready }: { ready: boolean }) {
  const chapters = hero.chapters
  const [active, setActive] = useState(0)

  // Rotate the three headline chapters over the same background video.
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
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const word = {
    hidden: {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
    },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        ease: EASE,
      },
    },
  }

  const soft = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: EASE,
      },
    },
  }

  const current = chapters[active]

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {/* YouTube hero background */}
      <div className="absolute inset-0 overflow-hidden bg-charcoal">
        {/* Fallback image displayed while YouTube loads */}
        <img
          src={chapters[0].poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <iframe
          src="https://www.youtube-nocookie.com/embed/Kca8uk_3ay0?autoplay=1&mute=1&controls=0&loop=1&playlist=Kca8uk_3ay0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
          title="Tierra Luxe cinematic villa video"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>

      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/25" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/45 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-32">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={container}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.4,
                },
              }}
            >
              <motion.p
                variants={soft}
                className="mb-5 text-xs uppercase tracking-[0.3em] text-ivory/80"
              >
                {current.eyebrow}
              </motion.p>

              <h1 className="font-display text-5xl italic leading-[0.95] text-ivory md:text-7xl lg:text-8xl">
                {current.title.split(' ').map((wordText, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      variants={word}
                      className="inline-block pr-[0.25em]"
                    >
                      {wordText}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Supporting text and buttons */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            transition={{
              delayChildren: 0.6,
            }}
          >
            <motion.p
              variants={soft}
              className="mt-7 max-w-lg font-body text-sm font-light text-ivory/85 md:text-base"
            >
              {hero.supporting}
            </motion.p>

            <motion.div
              variants={soft}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
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

      {/* Headline navigation */}
      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-5 md:right-10">
        <div className="flex items-center gap-3">
          {chapters.map((_, chapterIndex) => (
            <button
              key={chapterIndex}
              type="button"
              onClick={() => setActive(chapterIndex)}
              aria-label={`Show headline ${chapterIndex + 1}`}
              className="group relative flex flex-col items-center"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  chapterIndex === active
                    ? 'bg-gold'
                    : 'bg-ivory/40 group-hover:bg-ivory/70'
                }`}
              />

              {chapterIndex === active && (
                <span className="absolute -bottom-2 h-px w-8 overflow-hidden">
                  <motion.span
                    key={active}
                    className="block h-full w-full origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: CHAPTER_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="font-display text-lg tabular-nums text-ivory/70">
          <span className="text-gold">
            {String(active + 1).padStart(2, '0')}
          </span>

          <span className="mx-1 text-ivory/40">—</span>

          {String(chapters.length).padStart(2, '0')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">
          Scroll
        </span>

        <span className="relative block h-12 w-px bg-ivory/25">
          <span className="absolute left-0 top-0 h-4 w-full animate-float-slow bg-gold" />
        </span>
      </div>
    </section>
  )
}
