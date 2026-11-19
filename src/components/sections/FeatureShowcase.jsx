import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import { useCounter } from '../../hooks/useCounter.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import bgDark from '../../assets/feature/bg-dark.png'
import ribbon1 from '../../assets/feature/ribbon-1.png'
import ribbon2 from '../../assets/feature/ribbon-2.png'
import ribbon3 from '../../assets/feature/ribbon-3.png'

const RIBBON_FRAMES = [ribbon1, ribbon2, ribbon3]

const HERO_STATS = [
  {
    end: 11.5,
    decimals: 1,
    suffix: 'M+',
    label: 'TRANSACTIONS PROCESSED MONTHLY',
    className: 'bg-linear-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent',
  },
  {
    end: 99.9,
    decimals: 1,
    suffix: '%',
    label: 'PLATFORM UPTIME AND RELIABILITY',
    className: 'text-sky-400',
  },
  {
    end: 70,
    decimals: 0,
    suffix: '%',
    wordAfter: 'Faster',
    label: 'MERCHANT ONBOARDING WITH AI AUTOMATION',
    className: 'text-sky-300',
  },
]

const FEATURE_CARDS = [
  {
    title: 'AI Banking',
    accent: 'border-sky-400',
    description:
      'Smart, automated digital banking for businesses. Instant onboarding, intelligent insights, and real-time account operations.',
    end: 3969,
    label: 'TRANSACTIONS PER SECOND',
  },
  {
    title: 'Payments',
    accent: 'border-amber-400',
    description:
      'Fast, secure, and scalable payment infrastructure. Send and receive money globally with ease.',
    end: 1675,
    label: 'VALIDATOR NODES',
  },
  {
    title: 'Payouts',
    accent: 'border-violet-400',
    description:
      'Bulk, automated payouts built for high-volume businesses. Reliable, trackable, and lightning-fast disbursements.',
    end: 163077581394,
    label: 'TOTAL TRANSACTIONS',
  },
  {
    title: 'Merchant Onboarding',
    accent: 'border-emerald-400',
    description:
      'Frictionless onboarding for merchants at any scale. Automated KYC, verification, and risk assessments—done in minutes.',
    end: 100,
    suffix: '%',
    label: 'ON-TIME MERCHANT ONBOARD',
  },
]

function StatCounter({ end, decimals = 0, suffix = '', wordAfter, label, className }) {
  const [ref, value] = useCounter({ end, decimals })
  return (
    <div ref={ref}>
      <p className={`text-4xl font-semibold sm:text-5xl ${className}`}>
        {decimals ? value.toFixed(decimals) : value.toLocaleString()}
        {suffix}
        {wordAfter && <span className="ml-2 text-white">{wordAfter}</span>}
      </p>
      <p className="mt-2 text-xs tracking-wide text-white/50">{label}</p>
    </div>
  )
}

function FeatureCard({ title, accent, description, end, suffix = '', label }) {
  const [counterRef, value] = useCounter({ end })
  const revealRef = useScrollReveal({ y: 20 })

  return (
    <div
      ref={revealRef}
      className={`rounded-2xl border-l-1 border-b-1 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 ${accent}`}
    >
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{description}</p>
      <p ref={counterRef} className="mt-5 text-sm font-semibold text-sky-300">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-[11px] tracking-wide text-white/40">{label}</p>
    </div>
  )
}

/** Section 3 — stats, scroll-scrubbed "3D" ribbon, and the feature-card grid. */
export default function FeatureShowcase() {
  const sectionRef = useRef(null)
  const ribbonRef = useRef(null)
  const headingRef = useScrollReveal({ y: 24 })
  const suiteRef = useScrollReveal({ y: 24 })

  // Fake rotation: swap between the 3 pre-rendered ribbon frames as the
  // section scrolls through view (no real 3D geometry available).
  useEffect(() => {
    const section = sectionRef.current
    const img = ribbonRef.current
    if (!section || !img) return undefined

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const frame = Math.min(
          RIBBON_FRAMES.length - 1,
          Math.floor(self.progress * RIBBON_FRAMES.length),
        )
        img.src = RIBBON_FRAMES[frame]
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-900 py-24 text-white">
      <img
        src={bgDark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headingRef} className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
              Your Business Pays Are Now Faster and Secure
            </h2>

            <div className="mt-12 flex justify-center lg:mt-16 lg:justify-start">
              <img
                ref={ribbonRef}
                src={ribbon1}
                alt="Abstract 3D ribbon representing UzoFin's financial infrastructure"
                className="w-full max-w-md select-none"
              />
            </div>
          </div>

          <div>
            <div className="space-y-6">
              {HERO_STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>

            <div ref={suiteRef} className="mt-12">
              <h3 className="text-2xl font-semibold sm:text-3xl">Our Intelligent Financial Suite</h3>
              <p className="mt-2 text-sm text-white/60">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-400 align-middle" />
                Tools That Accelerate Every Step Of Your Financial Workflow.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {FEATURE_CARDS.map((card) => (
                  <FeatureCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
