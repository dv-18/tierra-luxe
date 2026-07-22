import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../content'
import { EASE } from '../lib/motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the overlay whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Solid ivory on sub-pages always; transparent-over-hero only on Home.
  const solid = scrolled || !isHome
  const onDark = !solid
  const textColor = onDark ? 'text-ivory' : 'text-charcoal'

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-colors duration-700 ease-expo',
          solid
            ? 'bg-ivory/80 backdrop-blur-md border-b border-line'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav
          className={[
            'mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between transition-all duration-700 ease-expo',
            solid ? 'h-16' : 'h-20',
          ].join(' ')}
          aria-label="Primary"
        >
          {/* Wordmark */}
          <Link
            to="/"
            className={`font-display tracking-[0.2em] text-lg transition-colors duration-700 ease-expo ${textColor}`}
          >
            {site.brand}
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-9">
            {nav.links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`link-underline text-xs uppercase tracking-[0.18em] transition-colors duration-700 ease-expo ${textColor} hover:opacity-100 ${
                    onDark ? 'opacity-90' : 'opacity-70'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            to={nav.ctaTo}
            className={[
              'hidden lg:inline-flex items-center rounded-full border px-6 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-500 ease-expo',
              textColor,
              'border-current',
              onDark
                ? 'hover:bg-ivory hover:text-charcoal hover:border-ivory'
                : 'hover:bg-charcoal hover:text-ivory hover:border-charcoal',
            ].join(' ')}
          >
            {nav.cta}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`lg:hidden ${textColor}`}
            aria-label="Open menu"
          >
            <Menu strokeWidth={1.25} className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-travertine lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display tracking-[0.2em] text-lg text-charcoal">
                {site.brand}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-charcoal"
                aria-label="Close menu"
              >
                <X strokeWidth={1.25} className="h-6 w-6" />
              </button>
            </div>

            <ul className="mt-10 flex flex-col gap-2 px-6">
              {nav.links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl text-charcoal py-2"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="absolute bottom-10 left-6 right-6">
              <Link
                to={nav.ctaTo}
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full border border-charcoal px-6 py-4 text-xs uppercase tracking-[0.2em] text-charcoal"
              >
                {nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
