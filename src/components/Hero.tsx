import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hero } from '../content'
import { EASE } from '../lib/motion'

export default function Hero({ ready }: { ready: boolean }) {
  const [showVideo, setShowVideo] = useState(false)

  // Keep YouTube's startup overlays behind the poster while the player initializes.
  useEffect(() => {
    const timer = window.setTimeout(() => setShowVideo(true), 3500)
    return () => window.clearTimeout(timer)
  }, [])

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

  const current = hero.chapter

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {/* YouTube hero background */}
      <div className="absolute inset-0 overflow-hidden bg-charcoal">
        {/* Fallback image displayed while YouTube loads */}
        <img
          src={current.poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <iframe
          src="https://www.youtube-nocookie.com/embed/Kca8uk_3ay0?autoplay=1&mute=1&controls=0&cc_load_policy=0&loop=1&playlist=Kca8uk_3ay0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&start=1"
          title="Tierra Luxe cinematic villa video"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/25" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/45 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-32">
        <div className="max-w-4xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
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

              <Link
                to={hero.ctas.secondary.to}
                className="link-underline group inline-flex items-center gap-2 rounded-full border border-ivory/50 px-7 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition-colors duration-500 ease-expo hover:border-ivory"
              >
                {hero.ctas.secondary.label}

                <ArrowUpRight
                  strokeWidth={1.5}
                  className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
