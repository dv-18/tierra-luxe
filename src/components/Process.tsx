import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { process } from '../content'
import { EASE, prefersReducedMotion } from '../lib/motion'
import { gsap } from '../lib/gsap'

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 })
      return
    }
    const ctx = gsap.context(() => {
      // Gold connector draws downward as the section scrolls.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        },
      )
      // Each step slides in on enter.
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="bg-travertine py-28">
      {/* Heading */}
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-4 flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs uppercase tracking-[0.28em] text-stone">
            {process.eyebrow}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.05 }}
          className="font-display text-4xl text-charcoal md:text-6xl"
        >
          {process.title}
        </motion.h2>
      </div>

      {/* Timeline */}
      <ol ref={listRef} className="relative mx-auto mt-20 max-w-[1000px] px-6">
        {/* Track + gold fill (left on mobile, center on desktop) */}
        <span className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-line md:left-1/2" />
        <span
          ref={lineRef}
          className="absolute left-6 top-0 h-full w-px origin-top -translate-x-1/2 bg-gold md:left-1/2"
        />

        {process.steps.map((step, i) => {
          const right = i % 2 === 1
          return (
            <li
              key={step.no}
              className="process-step relative mb-14 last:mb-0 md:mb-24 md:grid md:grid-cols-2 md:gap-16"
            >
              {/* Node */}
              <span className="absolute left-6 top-3 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-ivory md:left-1/2" />

              <div
                className={[
                  'pl-16 md:pl-0',
                  right
                    ? 'md:col-start-2 md:pl-16'
                    : 'md:col-start-1 md:row-start-1 md:pr-16 md:text-right',
                ].join(' ')}
              >
                <span
                  className="block font-display text-5xl leading-none md:text-6xl"
                  style={{ WebkitTextStroke: '1px hsl(var(--gold))', color: 'transparent' }}
                >
                  {step.no}
                </span>
                <h3 className="mt-4 font-display text-2xl italic text-charcoal md:text-3xl">
                  {step.title}
                </h3>
                <p
                  className={[
                    'mt-3 text-sm leading-relaxed text-stone',
                    right ? '' : 'md:ml-auto',
                    'max-w-sm',
                  ].join(' ')}
                >
                  {step.body}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
