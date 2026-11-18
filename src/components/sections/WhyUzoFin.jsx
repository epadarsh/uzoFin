import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useMarquee } from '../../hooks/useMarquee.js'
import gradient1 from '../../assets/testimonials/gradient-1.png'
import gradient2 from '../../assets/testimonials/gradient-2.png'
import gradient3 from '../../assets/testimonials/gradient-3.png'

// Unique feature cards, distributed across the 3 marquee rows below.
const CARDS = [
  { title: 'Dashboard', description: 'Manage banking, payments, and merchants in one place.' },
  {
    title: 'AI-Driven Decisions',
    description: 'Automate approvals, verification, and financial operations.',
  },
  {
    title: 'Unified Dashboard',
    description: 'View all your financial activity from a single pane of glass.',
  },
  {
    title: 'Multiple Payment Options',
    description: 'Accept payments via cards, wallets, bank transfers, and more.',
  },
  {
    title: 'Developer-Friendly APIs',
    description: 'Build, integrate, and launch faster.',
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Bank-level encryption and compliance.',
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Designed for startups to enterprises.',
  },
]

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12 12 4m0 0H5m7 0v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeatureCard({ title, description, background }) {
  return (
    <div
      className="w-80 shrink-0 rounded-2xl border border-white/10 px-6 py-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <span className="text-white/70">
          <ArrowIcon />
        </span>
      </div>
      <p className="mt-2 text-sm text-white/80">{description}</p>
    </div>
  )
}

function MarqueeRow({ cards, direction, background }) {
  const trackRef = useMarquee({ speed: 45, direction })

  return (
    <div ref={trackRef} className="flex overflow-hidden">
      <div className="flex shrink-0 gap-5 pr-5">
        {cards.map((card) => (
          <FeatureCard key={card.title} background={background} {...card} />
        ))}
      </div>
    </div>
  )
}

/** Section 4 — "Why UzoFin?" with 3 infinitely auto-scrolling feature rows. */
export default function WhyUzoFin() {
  const headingRef = useScrollReveal({ y: 24, stagger: 0.1 })

  const row1 = [CARDS[0], CARDS[1], CARDS[2], CARDS[3]]
  const row2 = [CARDS[3], CARDS[4], CARDS[5], CARDS[6]]
  const row3 = [CARDS[1], CARDS[6], CARDS[5], CARDS[4]]

  return (
    <section className="bg-black py-20 sm:py-24">
      <div ref={headingRef} className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
          Why{' '}
          <span className="bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            UzOFin?
          </span>
        </h2>
        <p className="mt-4 text-sm text-ink-500 sm:text-base">
          A single, intelligent platform for banking, payments, and payouts — built to
          scale with your business, with enterprise-grade security at every step.
        </p>
      </div>

      <div className="mt-14 space-y-5">
        <MarqueeRow cards={row1} direction={1} background={gradient1} />
        <MarqueeRow cards={row2} direction={-1} background={gradient2} />
        <MarqueeRow cards={row3} direction={1} background={gradient3} />
      </div>
    </section>
  )
}
