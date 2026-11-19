import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Turns a container with a single track child into an infinitely scrolling
 * marquee. The track is cloned once so the loop is seamless, and the
 * animation pauses on hover/focus for accessibility and readability.
 *
 * direction: 1 scrolls content leftward, -1 scrolls it rightward.
 *
 * @param {object} options
 * @param {number} [options.speed=40] - scroll speed in pixels per second; higher is faster.
 * @param {1 | -1} [options.direction=1] - 1 scrolls content leftward, -1 scrolls it rightward.
 * @returns {React.RefObject} ref to attach to the marquee container (its first child is the track).
 */
export function useMarquee({ speed = 40, direction = 1 } = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    // The "track" is whatever single element the caller rendered as the
    // container's first child (e.g. a row of logo/card elements).
    const track = container.firstElementChild
    if (!track) return undefined

    // Clone the track once and append it right after the original so the
    // two copies sit edge-to-edge. Animating both together from x=0 to
    // x=-trackWidth (or the reverse) creates a loop with no visible seam,
    // because the clone slides into exactly the position the original just
    // vacated. `data-cloned` prevents re-cloning on effect re-runs.
    if (!track.dataset.cloned) {
      const clone = track.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      container.appendChild(clone)
      track.dataset.cloned = 'true'
    }

    // Compute how long one full loop should take so the perceived speed
    // (pixels per second) stays constant regardless of track width.
    const trackWidth = track.scrollWidth
    const loopDuration = trackWidth / speed

    // Animate both the original track and its clone (container.children)
    // together as one continuous strip, looping forever (`repeat: -1`).
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

    // Pause scrolling while the user is hovering or has focused into the
    // marquee (e.g. tabbing through links), so content is easier to read.
    const pause = () => tween.pause()
    const resume = () => tween.resume()

    container.addEventListener('mouseenter', pause)
    container.addEventListener('mouseleave', resume)
    container.addEventListener('focusin', pause)
    container.addEventListener('focusout', resume)

    // Clean up the tween and listeners when the component unmounts or the
    // effect re-runs due to a dependency change.
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
