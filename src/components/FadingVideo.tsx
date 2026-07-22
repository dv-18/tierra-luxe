import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

type Props = {
  hls?: string
  mp4?: string
  poster: string
  active: boolean
  className?: string
}

/**
 * A single background clip. Streams via hls.js (native HLS on Safari),
 * plays only while `active`, and stays paused/offscreen otherwise so we
 * never decode video that isn't visible.
 */
export default function FadingVideo({ hls, mp4, poster, active, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  // Attach the source once (or when it changes).
  useEffect(() => {
    const video = ref.current
    if (!video) return
    let instance: Hls | null = null
    const canNativeHls = video.canPlayType('application/vnd.apple.mpegurl') !== ''

    if (hls && canNativeHls) {
      video.src = hls
    } else if (hls && Hls.isSupported()) {
      instance = new Hls({ enableWorker: true, startLevel: -1 })
      instance.loadSource(hls)
      instance.attachMedia(video)
    } else if (mp4) {
      video.src = mp4
    }

    return () => {
      instance?.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [hls, mp4])

  // Play/pause with visibility to save decode work.
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (active) {
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      style={{ willChange: active ? 'opacity' : 'auto' }}
    />
  )
}
