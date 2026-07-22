import { motion } from 'framer-motion'
import { brands, aboutContent } from '../content'
import { EASE } from '../lib/motion'

/**
 * Alpago-style "Our Associated Brands" — a bordered hairline grid of luxury
 * furnishing houses rendered as neutral text wordmarks (drop in real SVGs
 * later). Muted → charcoal on hover.
 */
export default function Brands({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`bg-travertine ${compact ? 'py-20' : 'py-28'}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="section-label text-xs text-stone">
            {aboutContent.brandsHeading}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.05 }}
              className="group flex min-h-[110px] items-center justify-center border-b border-r border-line px-4 md:min-h-[140px]"
            >
              <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.16em] text-stone/70 transition-colors duration-500 ease-expo group-hover:text-charcoal md:text-base">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
