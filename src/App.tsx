import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import { prefersReducedMotion } from './lib/motion'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Villas from './pages/Villas'
import VillaDetail from './pages/VillaDetail'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  // Smooth scroll (Lenis) synced into GSAP's ticker + ScrollTrigger — created once.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis
    lenis.stop() // hold until the preloader reveals the page

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Glide to in-page hash targets via Lenis. Handles both "#x" links and
    // "/#x" nav links when the target exists on the current page. When the
    // target isn't here (e.g. "/#process" from a sub-page), we do nothing and
    // let the router navigate — the pathname-change effect then scrolls to it.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href') || ''
      let hash = ''
      if (href.startsWith('#')) hash = href
      else if (href.startsWith('/#')) hash = href.slice(1)
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return // not on this page → let the router handle it
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -64 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Lock scrolling until the preloader is done, then recalc triggers.
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      lenisRef.current?.stop()
    } else {
      document.body.style.overflow = ''
      lenisRef.current?.start()
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  }, [isLoading])

  // We manage scroll position ourselves; stop the browser from restoring it.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // On client-side navigation: honour a hash target, else scroll to top, and
  // refresh ScrollTrigger so pinned/scrubbed sections on the new route recalc.
  useEffect(() => {
    if (isLoading) return
    const lenis = lenisRef.current

    const settle = () => {
      if (location.hash) {
        const el = document.querySelector(location.hash)
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 })
          else (el as HTMLElement).scrollIntoView()
          ScrollTrigger.refresh()
          return
        }
      }
      // Reset the native scroll first, then resync Lenis so the two can't drift.
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.resize()
        lenis.scrollTo(0, { immediate: true, force: true })
      }
      ScrollTrigger.refresh()
    }

    // Two passes: once after the new route mounts, once after images settle.
    const t1 = window.setTimeout(settle, 80)
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [location.pathname, location.hash, isLoading])

  return (
    <>
      {isLoading && <Preloader onDone={() => setIsLoading(false)} />}
      <Nav />
      <Routes>
        <Route path="/" element={<Home ready={!isLoading} />} />
        <Route path="/about" element={<About />} />
        <Route path="/villas" element={<Villas />} />
        <Route path="/villas/:slug" element={<VillaDetail />} />
      </Routes>
    </>
  )
}
