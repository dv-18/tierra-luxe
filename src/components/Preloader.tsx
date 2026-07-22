import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { preloader } from '../content'
import { EASE, prefersReducedMotion } from '../lib/motion'

const COUNT_MS = 2400
const WORD_MS = 800

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  // Cycle the display words.
  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % preloader.words.length)
    }, WORD_MS)
    return () => window.clearInterval(id)
  }, [])

  // Animate the 000 → 100 counter via rAF.
  useEffect(() => {
    const reduced = prefersReducedMotion()
    let raf = 0
    let start = 0

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      setExiting(true)
      window.setTimeout(onDone, reduced ? 0 : 900)
    }

    if (reduced) {
      setCount(100)
      window.setTimeout(finish, 300)
      return
    }

    const tick = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / COUNT_MS, 1)
      // ease-out for a confident settle
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(finish, 400)
      }
    }
    raf = requestAnimationFrame(tick)

    // Safety net: rAF is throttled (or fully paused) in a backgrounded tab, so
    // guarantee the preloader always completes even if `tick` never finishes.
    const guard = window.setTimeout(() => {
      setCount(100)
      finish()
    }, COUNT_MS + 2000)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(guard)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-travertine"
      initial={{ opacity: 1 }}
      aria-hidden="true"
    >
      {/* Ivory reveal panel that slides up at the end */}
      <motion.div
        className="absolute inset-0 bg-travertine"
        initial={{ y: 0 }}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {/* Cycling word — centered */}
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              className="font-display italic text-4xl md:text-6xl text-charcoal"
              initial={{ y: 16, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -16, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {preloader.words[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bottom-left counter */}
        <div className="absolute bottom-8 left-6 md:left-10">
          <span className="font-display text-7xl md:text-8xl text-charcoal tabular-nums leading-none">
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Brand mark, bottom-right */}
        <div className="absolute bottom-10 right-6 md:right-10 hidden sm:block">
          <span className="font-display tracking-[0.3em] text-sm text-stone">
            TIERRA&nbsp;LUXE
          </span>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-line">
          <div
            className="h-full bg-gold origin-left"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
