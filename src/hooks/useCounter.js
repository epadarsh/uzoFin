import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Counts up from `start` to `end` once the returned ref scrolls into view.
 * Returns [ref, value] — spread the ref onto the element you want observed,
 * render `value` wherever the number should appear.
 */
export function useCounter({ end, duration = 1.5, start = 0, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(start)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const counter = { val: start }
          gsap.to(counter, {
            val: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => setValue(Number(counter.val.toFixed(decimals))),
          })
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
