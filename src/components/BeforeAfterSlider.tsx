import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '../lib/motion'

type Props = {
  before: string
  after: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

/**
 * Smooth before/after image comparison slider. The "after" image is the base
 * layer; the "before" image is clipped to the left of a draggable divider.
 * Driven by Pointer Events (mouse / touch / pen) with keyboard support.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = 'Before redevelopment',
  afterAlt = 'After redevelopment',
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeLayerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const draggingRef = useRef(false)
  const posRef = useRef(50)
  const pointerFrameRef = useRef<number | null>(null)
  const queuedClientXRef = useRef<number | null>(null)
  const [animateHint, setAnimateHint] = useState(true)

  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  const applyPosition = useCallback((next: number) => {
    const bounded = Math.min(100, Math.max(0, next))
    posRef.current = bounded
    if (beforeLayerRef.current) {
      beforeLayerRef.current.style.clipPath = `inset(0 ${100 - bounded}% 0 0)`
    }
    if (dividerRef.current) dividerRef.current.style.left = `${bounded}%`
    handleRef.current?.setAttribute('aria-valuenow', String(Math.round(bounded)))
  }, [])

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    applyPosition(p)
  }, [applyPosition])

  const queueFromClientX = useCallback((clientX: number) => {
    queuedClientXRef.current = clientX
    if (pointerFrameRef.current !== null) return
    pointerFrameRef.current = requestAnimationFrame(() => {
      if (queuedClientXRef.current !== null) setFromClientX(queuedClientXRef.current)
      queuedClientXRef.current = null
      pointerFrameRef.current = null
    })
  }, [setFromClientX])

  const onPointerDown = (e: React.PointerEvent) => {
    setAnimateHint(false)
    draggingRef.current = true
    containerRef.current?.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    queueFromClientX(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (queuedClientXRef.current !== null) setFromClientX(queuedClientXRef.current)
    queuedClientXRef.current = null
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current)
    pointerFrameRef.current = null
    draggingRef.current = false
    const el = containerRef.current
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setAnimateHint(false)
      applyPosition(posRef.current - 3)
    } else if (e.key === 'ArrowRight') {
      setAnimateHint(false)
      applyPosition(posRef.current + 3)
    }
  }

  // A one-time "peek" hint when the slider scrolls into view, to signal it's draggable.
  useEffect(() => {
    if (!inView || !animateHint) return
    let raf = 0
    const start = performance.now()
    const DURATION = 1600
    const tick = (t: number) => {
      const elapsed = t - start
      if (elapsed >= DURATION || !animateHint) {
        applyPosition(50)
        return
      }
      // ease in-out sweep: 50 → 62 → 38 → 50
      const x = elapsed / DURATION
      const sweep = Math.sin(x * Math.PI * 2) * 12 * (1 - x)
      applyPosition(50 + sweep)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, animateHint, applyPosition])

  useEffect(
    () => () => {
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current)
    },
    [],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE }}
      className={className}
    >
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={() => {
          draggingRef.current = false
        }}
        className="group relative aspect-[3/2] w-full cursor-ew-resize select-none overflow-hidden rounded-[20px] border border-ivory/10 bg-charcoal"
        style={{ touchAction: 'pan-y' }}
      >
        {/* After (base) */}
        <img
          src={after}
          alt={afterAlt}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Before (clipped to the left of the divider) */}
        <div
          ref={beforeLayerRef}
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'inset(0 50% 0 0)', willChange: 'clip-path' }}
        >
          <img
            src={before}
            alt={beforeAlt}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 rounded-md bg-charcoal/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-ivory backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-md bg-charcoal/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-ivory backdrop-blur-sm">
          After
        </span>

        {/* Divider + handle */}
        <div
          ref={dividerRef}
          className="pointer-events-none absolute inset-y-0"
          style={{ left: '50%', willChange: 'left' }}
        >
          <div className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-ivory/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
          <button
            ref={handleRef}
            type="button"
            onKeyDown={onKeyDown}
            aria-label="Drag to compare before and after"
            aria-valuenow={50}
            aria-valuemin={0}
            aria-valuemax={100}
            role="slider"
            className="pointer-events-auto absolute top-1/2 left-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-charcoal/40 text-ivory backdrop-blur-md transition-transform duration-300 ease-expo group-hover:scale-105"
          >
            <ChevronLeft strokeWidth={1.75} className="h-4 w-4 -mr-1" />
            <ChevronRight strokeWidth={1.75} className="h-4 w-4 -ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
