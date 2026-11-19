import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useMarquee } from '../../hooks/useMarquee.js'

// Exact partner names are not legible in the source design — these are
// best-effort placeholder wordmarks representing the trust/logo strip.
const LOGOS = [
  'Stripe',
  'Plaid',
  'Razorpay',
  'Visa',
  'Mastercard',
  'PayPal',
  'Square',
  'Adyen',
]

/** Section 2 — "trusted by" strip: a heading over an infinite logo marquee. */
export default function LogoStrip() {
  const headingRef = useScrollReveal({ y: 16 })
  // Scrolls the logo list left at a constant 55px/s, looping seamlessly via
  // the clone-and-tween technique in useMarquee.
  const marqueeRef = useMarquee({ speed: 55 })

  return (
    <section className="bg-black py-16 sm:py-20">
      <div ref={headingRef} className="px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-sky-500 sm:text-sm">
          POWERING TOOLS AND INTEGRATION FOR COMPANIES AROUND THE WORLD
        </p>
      </div>

      {/* useMarquee expects a single "track" child (the <ul> below); it clones
          this element internally to create the seamless loop. */}
      <div ref={marqueeRef} className="mt-10 flex overflow-hidden">
        <ul className="flex shrink-0 items-center gap-16 px-8">
          {LOGOS.map((name) => (
            <li
              key={name}
              className="shrink-0 text-xl font-semibold tracking-tight text-white/50 grayscale select-none"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
