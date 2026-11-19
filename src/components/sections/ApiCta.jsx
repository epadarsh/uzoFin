import bgLines from '../../assets/apicta/bg.png'
import Button from '../ui/Button.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { gsap } from '../../lib/gsap'
import { useEffect, useRef } from 'react'

/** Section 5 — API callout with a slowly floating line-art background. */
export default function ApiCta() {
  const contentRef = useScrollReveal({ y: 24, stagger: 0.1 })
  // The decorative line-art background image, animated with a simple
  // yoyo-repeat GSAP tween (not scroll-driven, just a continuous ambient drift).
  const bgRef = useRef(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return undefined

    // Gently drift the background up and down forever: `yoyo: true` reverses
    // the tween back to its start instead of snapping, and `repeat: -1` loops
    // indefinitely.
    const tween = gsap.to(el, {
      y: 18,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  return (
    <section className="relative overflow-hidden bg-black py-24 sm:py-28">
      <img
        ref={bgRef}
        src={bgLines}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-70"
      />

      <div ref={contentRef} className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl text-white">
          Build Faster with Our {' '}
          <span className="bg-linear-to-r from-brand-500 to-accent-pink bg-clip-text text-transparent">
            Powerful API&apos;s
          </span>
        </h2>
        <p className="mt-4 text-sm text-white sm:text-base">
          Plug into secure, developer-friendly financial API&apos;s and launch in days, not months
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="#start-building">START BUILDING</Button>
        </div>
      </div>
    </section>
  )
}
