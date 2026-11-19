import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Attaches a fade-up-on-scroll-into-view animation to the returned ref.
 * Pass `stagger` to animate each direct child individually instead of the
 * whole container at once.
 *
 * @param {object} options
 * @param {number} [options.y=40] - starting vertical offset in px; the element animates from this
 *   offset up to its natural position (y: 0).
 * @param {number} [options.duration=0.8] - animation duration in seconds.
 * @param {number} [options.delay=0] - delay, in seconds, before the animation starts once triggered.
 * @param {number} [options.stagger=0] - delay between each child's animation start, in seconds; 0
 *   animates the whole container as a single unit instead of its children individually.
 * @param {string} [options.start='top 85%'] - ScrollTrigger "start" position (element-position
 *   viewport-position), e.g. 'top 85%' fires when the element's top crosses 85% down the viewport.
 * @returns {React.RefObject} ref to attach to the element (or container of children) to reveal.
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

    // When staggering, animate each direct child separately; otherwise treat
    // the whole element as one animation target.
    const targets = stagger ? el.children : el

    // gsap.context() scopes the tween to this component instance so
    // `ctx.revert()` can cleanly undo it (and detach the ScrollTrigger) on
    // unmount or when dependencies change, preventing animation/memory leaks.
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
            // Only play the reveal once, forward; don't reverse/replay when
            // scrolling back up past the trigger point.
            toggleActions: 'play none none none',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y, duration, delay, stagger, start])

  return ref
}
