import { useCallback, useEffect, useState } from 'react'

/** iOS 13+ exposes a gesture-gated permission gate on DeviceOrientationEvent. */
type OrientationPermission = {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

/** True only on platforms that gate motion behind an explicit prompt (iOS 13+). */
function needsMotionPrompt() {
  if (typeof window === 'undefined') return false
  const DOE = window.DeviceOrientationEvent as unknown as OrientationPermission
  return typeof DOE?.requestPermission === 'function'
}

export type MotionStatus = 'unsupported' | 'idle' | 'granted' | 'denied'

/**
 * Drives an explicit "Enable tilt" control. iOS only ever shows the motion
 * prompt in direct response to a user gesture (a tap on a real button is the
 * most reliable trigger) and only while the decision is undecided — so this
 * exposes the current status plus a `request` you call from an onClick.
 */
export function useMotionPermission() {
  // 'unsupported' → Android/desktop, no prompt needed (motion just works).
  const [status, setStatus] = useState<MotionStatus>(() =>
    needsMotionPrompt() ? 'idle' : 'unsupported',
  )

  const request = useCallback(async () => {
    const DOE = window.DeviceOrientationEvent as unknown as OrientationPermission
    if (typeof DOE?.requestPermission !== 'function') {
      setStatus('unsupported')
      return
    }
    try {
      const res = await DOE.requestPermission()
      setStatus(res === 'granted' ? 'granted' : 'denied')
    } catch {
      // iOS throws if called outside a gesture or while a request is pending.
      setStatus('denied')
    }
  }, [])

  // iOS has no API to query the current grant. But if motion data actually
  // arrives, permission is already granted (e.g. via the app-level first-gesture
  // ask or a previous visit) — so flip to 'granted' and hide the enable button.
  useEffect(() => {
    if (status !== 'idle') return
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha != null || e.beta != null || e.gamma != null) {
        setStatus('granted')
      }
    }
    window.addEventListener('deviceorientation', onOrientation, true)
    return () => window.removeEventListener('deviceorientation', onOrientation, true)
  }, [status])

  return { status, request }
}

/**
 * Requests motion/orientation (gyroscope) permission on the first user gesture
 * after every page load. iOS Safari requires a real gesture — permission can't
 * be requested on load — so we listen for any gesture (touch start, tap, click,
 * scroll start) and retry until one is accepted, then stop.
 *
 * Because this lives at the app root, it runs on every refresh. Note: iOS only
 * shows the prompt while the decision is still undecided — once granted it
 * stays granted, and once denied it stays denied until the user clears the
 * site's data (Settings → Safari → Motion & Orientation Access).
 */
export function useGyroPermission() {
  useEffect(() => {
    const DOE = window.DeviceOrientationEvent as unknown as OrientationPermission
    const request = DOE?.requestPermission
    if (typeof request !== 'function') return // Android / desktop need no prompt.

    // Fire on the EARLIEST possible gesture. `touchstart`/`pointerdown` fire the
    // moment a finger lands — including the start of a scroll — so scrolling can
    // trigger the prompt too, not just discrete taps/clicks.
    const events: Array<keyof WindowEventMap> = [
      'touchstart',
      'pointerdown',
      'touchend',
      'click',
    ]
    let done = false // permission actually resolved — stop listening.
    let pending = false // a request is in flight — don't fire a second one.

    const cleanup = () => events.forEach((evt) => window.removeEventListener(evt, ask))

    const ask = () => {
      if (done || pending) return
      pending = true
      // CRITICAL: only retire the listeners once the prompt RESOLVES. iOS
      // rejects a request made from a scroll-start, so on rejection we keep
      // listening and let the next gesture (e.g. the touchend or a tap) retry —
      // otherwise one ignored scroll would consume the only attempt.
      request
        .call(DOE)
        .then(() => {
          done = true
          cleanup()
        })
        .catch(() => {})
        .finally(() => {
          pending = false
        })
    }

    events.forEach((evt) => window.addEventListener(evt, ask))
    return cleanup
  }, [])
}
