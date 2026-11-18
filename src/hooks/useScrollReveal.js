import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Attaches a fade-up-on-scroll-into-view animation to the returned ref.
 * Pass `stagger` to animate each direct child individually instead of the
 * whole container at once.
 */
export function useScrollReveal({
  y = 40,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  start = 'top 85%',
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const targets = stagger ? el.children : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y, duration, delay, stagger, start])

  return ref
}
