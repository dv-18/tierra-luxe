import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { villas } from '../content'
import { EASE } from '../lib/motion'
import EnquirySection from '../components/EnquirySection'
import SiteFooter from '../components/SiteFooter'

export default function Villas() {
  return (
    <>
      <main className="bg-travertine">
        {/* Header */}
        <header className="mx-auto max-w-[1400px] px-6 pb-14 pt-32 md:px-10 md:pt-40">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="section-label text-xs text-stone"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="mt-5 font-display text-5xl text-charcoal md:text-7xl"
          >
            Redefined Residences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-stone md:text-base"
          >
            A curated collection of villas sourced, redesigned and elevated across the
            fronds and crescent of Palm Jumeirah.
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="mt-10 block h-px w-full origin-left bg-line"
          />
        </header>

        {/* Grid */}
        <div className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-14 px-6 pb-28 md:grid-cols-2 md:px-10">
          {villas.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <Link to={`/villas/${v.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[20px] border border-line">
                  <img
                    src={v.cardImage}
                    alt={v.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-1200 ease-expo group-hover:scale-105"
                  />
                  <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply" />
                  <span className="absolute left-5 top-5 rounded-full bg-ivory/85 px-3 py-1 font-grotesk text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal backdrop-blur-sm">
                    {v.status}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl text-charcoal">{v.name}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone">
                      {v.shortSpec}
                    </p>
                  </div>
                  <span className="link-underline mt-2 inline-flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal">
                    View Villa
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="h-3.5 w-3.5 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <EnquirySection />
      <SiteFooter />
    </>
  )
}
