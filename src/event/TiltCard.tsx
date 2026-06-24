import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type TiltCardProps = {
  children: ReactNode
  /** Max tilt in degrees. */
  maxTilt?: number
}

/**
 * Wraps content in a 3D tilt surface.
 * - Desktop: follows the pointer (hover to tilt).
 * - Mobile: follows the device gyroscope (tilt the phone to tilt the card).
 */
/** Touch-capable device (phone/tablet) — used to drop the idle float on mobile. */
const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export function TiltCard({ children, maxTilt = 14 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Normalised pointer/orientation position in range [-0.5, 0.5].
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  // Smooth the motion for a natural, springy feel.
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.4 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])

  // Subtle glare that shifts with the tilt.
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useTransform(sy, [-0.5, 0, 0.5], [0.35, 0, 0.35])

  const handlePointerMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  // Touch-drag fallback — works in DevTools emulation and on devices without
  // (or before granting) gyroscope access. Drag a finger across the image.
  const handleTouchMove = (e: React.TouchEvent) => {
    const el = ref.current
    const touch = e.touches[0]
    if (!el || !touch) return
    const rect = el.getBoundingClientRect()
    px.set((touch.clientX - rect.left) / rect.width - 0.5)
    py.set((touch.clientY - rect.top) / rect.height - 0.5)
  }

  const handleTouchEnd = () => {
    px.set(0)
    py.set(0)
  }

  // iOS 13+ needs an explicit, gesture-triggered permission for gyroscope.
  const requestGyroPermission = () => {
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }
    if (typeof DOE?.requestPermission === 'function') {
      DOE.requestPermission().catch(() => {})
    }
  }

  // Gyroscope (mobile) — map device tilt onto the same motion values.
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0 // left-right tilt: -90..90
      const beta = e.beta ?? 0 // front-back tilt: -180..180
      // Clamp to a comfortable range and normalise to [-0.5, 0.5].
      px.set(Math.max(-0.5, Math.min(0.5, gamma / 45)))
      py.set(Math.max(-0.5, Math.min(0.5, (beta - 45) / 45)))
    }
    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => window.removeEventListener('deviceorientation', handleOrientation, true)
  }, [px, py])

  // Ask for gyroscope permission on the very first touch ANYWHERE on the page,
  // so the iOS prompt appears as early as possible (Safari requires a gesture —
  // it can't be triggered on load). Fires once, then removes itself.
  useEffect(() => {
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }
    const request = DOE?.requestPermission
    if (typeof request !== 'function') return

    const askOnce = () => {
      request.call(DOE).catch(() => {})
      window.removeEventListener('touchend', askOnce)
      window.removeEventListener('click', askOnce)
    }
    window.addEventListener('touchend', askOnce, { once: true })
    window.addEventListener('click', askOnce, { once: true })
    return () => {
      window.removeEventListener('touchend', askOnce)
      window.removeEventListener('click', askOnce)
    }
  }, [])

  const glareBackground = useTransform(
    glareX,
    (x) =>
      `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)`,
  )

  return (
    <div
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={requestGyroPermission}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Perspective gives the children real depth.
      style={{ width: '100%', perspective: 900, touchAction: 'pan-y' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: 'inherit',
          willChange: 'transform',
        }}
      >
        {/* Idle float — gentle perpetual 3D drift on desktop only. On mobile
            we skip it (the gyroscope drives the motion instead). */}
        <motion.div
          style={{ transformStyle: 'preserve-3d', borderRadius: 'inherit' }}
          animate={
            isTouchDevice
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotateZ: [-1.2, 1.2, -1.2],
                  scale: [1, 1.015, 1],
                }
          }
          transition={
            isTouchDevice
              ? undefined
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {children}
        </motion.div>

        {/* Moving glare highlight */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: glareOpacity,
            background: glareBackground,
          }}
        />
      </motion.div>
    </div>
  )
}
