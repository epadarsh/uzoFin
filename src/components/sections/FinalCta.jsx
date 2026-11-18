import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useSound } from '../../hooks/useSound.jsx'
import bgDiscs from '../../assets/finalcta/bg-discs.png'
import Button from '../ui/Button.jsx'

/** Section 7 — final CTA with floating iridescent disc decorations. */
export default function FinalCta() {
  const contentRef = useScrollReveal({ y: 28, stagger: 0.1 })
  const discRef = useRef(null)
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const el = discRef.current
    if (!el) return undefined

    const tween = gsap.to(el, {
      y: -6,
      rotate: 8,
      duration: 9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  return (
    <section className="relative overflow-hidden bg-ink-900 py-28 text-white sm:py-32">
      <img
        ref={discRef}
        src={bgDiscs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill opacity-80"
      />

      <div ref={contentRef} className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl leading-tight font-light sm:text-5xl">
          The future of your industry{' '}
          <span className="bg-linear-to-r from-violet-400 to-pink-300 bg-clip-text font-semibold text-transparent">
            starts here
          </span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#docs">BOOK A DEMO</Button>
          <Button href="#docs" variant="outline">BUILD AI</Button>
        </div>
      </div>
    </section>
  )
}
