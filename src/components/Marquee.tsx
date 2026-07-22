import { useEffect, useRef } from 'react'
import { marquee } from '../content'
import { prefersReducedMotion } from '../lib/motion'
import { gsap } from '../lib/gsap'

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  // One half of the loop — repeated words + gold bullets.
  const half = Array.from({ length: 3 }).flatMap(() => marquee.words)

  const Sequence = () => (
    <div className="flex shrink-0 items-center">
      {half.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-6xl uppercase italic text-charcoal/90 md:text-8xl">
            {w}
          </span>
          <span className="text-4xl text-gold md:text-6xl">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="overflow-hidden bg-travertine py-16" aria-hidden="true">
      <div className="edge-fade-x">
        <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
          <Sequence />
          <Sequence />
        </div>
      </div>
    </section>
  )
}
