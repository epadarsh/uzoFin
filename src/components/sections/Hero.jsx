import bgLeft from '../../assets/hero/bg-left.png'
import bgRight from '../../assets/hero/bg-right.png'
import Button from '../ui/Button.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

/** Section 1 — full-bleed dark hero with gradient headline and two CTAs. */
export default function Hero() {
  // Fade+rise each direct child of the content wrapper (heading, paragraph,
  // button row) into view, slightly staggered, as soon as the page loads
  // (start: 'top 95%' fires almost immediately since the hero is above the fold).
  const contentRef = useScrollReveal({ stagger: 0.12, y: 30, start: 'top 95%' })

  return (
    <section className="relative isolate overflow-hidden bg-black pt-36 pb-28 text-white sm:pt-44 sm:pb-36">
      {/* decorative ring frames, cropped off-canvas on each side */}
      <img
        src={bgLeft}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[55%] max-w-150 select-none opacity-90"
      />
      <img
        src={bgRight}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[55%] max-w-150 select-none opacity-90"
      />

      <div
        ref={contentRef}
        className="relative mx-auto max-w-5xl px-6 text-center sm:px-10"
      >
        <h1 className="text-3xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
          AI-powered{' '}
          {/* Gradient-filled text: the span's background is clipped to its text
              shape (bg-clip-text) and the text color itself is made
              transparent, so the gradient shows through the glyphs. */}
          <span className="bg-linear-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
            Banking &amp; Payment Solutions
          </span>{' '}
          built for Modern Businesses
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70 sm:text-base">
          UzOfin brings intelligent automation, real-time payments, and seamless
          financial operations together so you can scale without friction.
        </p>

        {/* Primary filled CTA + secondary outline CTA, matching the design's
            "START BUILDING" / "READ DOCS" pairing. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#start-building">START BUILDING</Button>
          <Button href="#docs" variant="outline">
            READ DOCS
          </Button>
        </div>
      </div>
    </section>
  )
}
