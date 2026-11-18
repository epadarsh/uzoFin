import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Turns a container with a single track child into an infinitely scrolling
 * marquee. The track is cloned once so the loop is seamless, and the
 * animation pauses on hover/focus for accessibility and readability.
 *
 * direction: 1 scrolls content leftward, -1 scrolls it rightward.
 */
export function useMarquee({ speed = 40, direction = 1 } = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const track = container.firstElementChild
    if (!track) return undefined

    if (!track.dataset.cloned) {
      const clone = track.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      container.appendChild(clone)
      track.dataset.cloned = 'true'
    }

    const trackWidth = track.scrollWidth
    const loopDuration = trackWidth / speed

    const tween = gsap.fromTo(
      container.children,
      { x: direction > 0 ? 0 : -trackWidth },
      {
        x: direction > 0 ? -trackWidth : 0,
        duration: loopDuration,
        ease: 'none',
        repeat: -1,
      },
    )

    const pause = () => tween.pause()
    const resume = () => tween.resume()

    container.addEventListener('mouseenter', pause)
    container.addEventListener('mouseleave', resume)
    container.addEventListener('focusin', pause)
    container.addEventListener('focusout', resume)

    return () => {
      tween.kill()
      container.removeEventListener('mouseenter', pause)
      container.removeEventListener('mouseleave', resume)
      container.removeEventListener('focusin', pause)
      container.removeEventListener('focusout', resume)
    }
  }, [speed, direction])

  return containerRef
}
