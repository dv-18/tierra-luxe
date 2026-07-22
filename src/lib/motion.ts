/** Soft expo-out — the single easing used across the whole page. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Framer Motion viewport reveal preset — opacity + gentle rise, once. */
export const revealUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 1, ease: EASE },
}
