import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Brief logo-spin preloader shown while the app first mounts.
 * Plays a one-shot GSAP timeline (scale/fade in → spin → fade out) and then
 * unmounts itself by rendering `null`.
 *
 * @param {object} props
 * @param {() => void} [props.onComplete] - called once the exit animation finishes.
 */
export default function Preloader({ onComplete }) {
  // Full-screen overlay; faded out at the end of the timeline.
  const rootRef = useRef(null)
  // The spinning gradient orb.
  const orbRef = useRef(null)
  // Once true, the component renders nothing — removing it from the DOM
  // after its exit animation has fully played.
  const [done, setDone] = useState(false)

  useEffect(() => {
    // A GSAP timeline sequences the three animation steps below in order,
    // automatically starting each one where the previous finished (unless a
    // position offset like '-=0.1' is given to overlap them slightly).
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete?.()
      },
    })

    tl
      // 1. Pop the orb in with a slight overshoot (back.out easing).
      .fromTo(
        orbRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
      )
      // 2. Spin it a full rotation, starting slightly before step 1 ends.
      .to(orbRef.current, { rotate: 360, duration: 0.9, ease: 'power1.inOut' }, '-=0.1')
      // 3. Fade the whole overlay out, after a short pause.
      .to(rootRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, '+=0.15')

    return () => tl.kill()
  }, [onComplete])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-ink-900"
    >
      <span
        ref={orbRef}
        className="h-14 w-14 rounded-full bg-linear-to-br from-cyan-300 via-blue-500 to-violet-600"
        aria-hidden="true"
      />
      {/* Screen-reader-only label; the orb itself is purely decorative. */}
      <span className="sr-only">Loading UzoFin…</span>
    </div>
  )
}
