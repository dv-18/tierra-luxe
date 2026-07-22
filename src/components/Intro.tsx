import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { intro } from '../content'
import { EASE, revealUp } from '../lib/motion'

/** Render *starred* words as italic gold emphasis. */
function Statement({ text }: { text: string }) {
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

export default function Intro() {
  return (
    <section id="philosophy" className="bg-travertine py-28 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Eyebrow rail */}
        <motion.div {...revealUp} className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs uppercase tracking-[0.28em] text-stone">
            {intro.eyebrow}
          </span>
        </motion.div>

        {/* Statement */}
        <motion.h2
          {...revealUp}
          className="font-display text-3xl leading-[1.15] text-charcoal md:text-5xl text-balance"
        >
          <Statement text={intro.statement} />
        </motion.h2>

        {/* Animated hairline under the heading */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mt-12 block h-px w-full origin-left bg-line"
        />

        {/* Two columns of body copy */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {intro.columns.map((col, i) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            >
              <h3 className="mb-4 font-display text-xl italic text-charcoal">
                {col.heading}
              </h3>
              <p className="text-sm leading-relaxed text-stone md:text-base">
                {col.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Read our story → About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mt-12"
        >
          <Link
            to={intro.storyLink.to}
            className="link-underline group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal"
          >
            {intro.storyLink.label}
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
