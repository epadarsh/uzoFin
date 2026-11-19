import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Counts up from `start` to `end` once the returned ref scrolls into view.
 * Returns [ref, value] — spread the ref onto the element you want observed,
 * render `value` wherever the number should appear.
 *
 * @param {object} options
 * @param {number} options.end - final numeric value to count up to.
 * @param {number} [options.duration=1.5] - length of the count-up tween, in seconds.
 * @param {number} [options.start=0] - initial numeric value before the animation starts.
 * @param {number} [options.decimals=0] - how many decimal places to round displayed values to.
 * @returns {[React.RefObject, number]} a ref to attach to the trigger element, and the live counter value.
 */
export function useCounter({ end, duration = 1.5, start = 0, decimals = 0 } = {}) {
  // DOM node we watch for visibility; also the element the caller attaches the ref to.
  const ref = useRef(null)
  // The number currently rendered to the screen, updated on every animation tick.
  const [value, setValue] = useState(start)
  // Guards against re-triggering the count-up if the element scrolls in/out/in again.
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    // Watch the element and fire the animation the first time it becomes
    // at least 40% visible in the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          // Plain object used as the GSAP tween target; GSAP interpolates
          // `counter.val` from `start` to `end` over `duration` seconds.
          const counter = { val: start }
          gsap.to(counter, {
            val: end,
            duration,
            ease: 'power2.out',
            // On every animation frame, round to the requested precision and
            // push the new value into React state so the UI re-renders.
            onUpdate: () => setValue(Number(counter.val.toFixed(decimals))),
          })
          // One-shot animation — stop observing once it has fired.
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, start, decimals])

  return [ref, value]
}
