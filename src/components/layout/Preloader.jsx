import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

/** Brief logo-spin preloader shown while the app first mounts. */
export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const orbRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete?.()
      },
    })

    tl.fromTo(
      orbRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
    )
      .to(orbRef.current, { rotate: 360, duration: 0.9, ease: 'power1.inOut' }, '-=0.1')
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
      <span className="sr-only">Loading UzoFin…</span>
    </div>
  )
}
