import { useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useMarquee } from '../../hooks/useMarquee.js'
import { gsap } from '../../lib/gsap'
import gradient1 from '../../assets/testimonials/gradient-1.png'
import gradient2 from '../../assets/testimonials/gradient-2.png'
import gradient3 from '../../assets/testimonials/gradient-3.png'

// Cycled across the card list below (via index % length) so the 10 cards
// don't all share the exact same background image.
const CARD_BACKGROUNDS = [gradient1, gradient2, gradient3]

// Content for each card in the auto-scrolling "Industry Standard" marquee.
const INDUSTRY_CARDS = [
	{
		title: 'Scalability & Integration',
		description:
			'Scale effortlessly as your business grows, with flexible integrations that connect your banking, payment, and payout operations.',
	},
	{
		title: 'Step-by-step guide',
		description:
			'Launch with confidence using clear documentation, practical guidance, and developer-friendly tools at every step.',
	},
	{
		title: 'SaaS based solution',
		description:
			'Access a reliable, always-updated financial platform that adapts to your workflows without complex infrastructure.',
	},
	{
		title: 'Easy to customise',
		description:
			'Easily customize the platform to fit your unique business needs and workflows.',
	},
	{
		title: 'Secure and compliant',
		description:
			'Built with security and compliance in mind, ensuring your data is protected and meets regulatory requirements.',
	},
	{
		title: 'Scalable and flexible',
		description:
			'Easily scale your operations as your business grows, with a flexible platform that adapts to your changing needs.',
	},
	{
		title: 'Cost-effective',
		description:
			'Reduce costs and improve efficiency with a cost-effective solution that streamlines your financial operations.',
	},
	{
		title: 'Expert support',
		description:
			'Get expert support from our team of financial and technical experts, ensuring you have the help you need when you need it.',
	},
	{
		title: 'Innovative features',
		description:
			'Stay ahead of the competition with innovative features that help you optimize your financial operations and drive growth.',
	},
	{
		title: 'User-friendly interface',
		description:
			'Enjoy a user-friendly interface that makes it easy to navigate and use the platform, even for non-technical users.',
	},
]

/**
 * One card in the Industry Standard marquee: title/description over a
 * gradient background, with a decorative blurred "blob" glow behind it and
 * a checkmark icon that fades/slides in on hover.
 */
function IndustryCard({ title, description, background }) {
	return (
		<article
			className="group relative flex min-h-72 w-70 shrink-0 flex-col justify-center overflow-hidden rounded-3xl border border-white/10 px-8 py-10 text-center shadow-2xl shadow-black/30 bg-cover bg-center transition-transform duration-300 hover:-translate-y-2 sm:w-85"
			style={{ backgroundImage: `url(${background})` }}
		>
			{/* Decorative blurred glow layers, purely cosmetic (negative z-index
			    keeps them behind the card's text content). */}
			<div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
				<div className="h-full w-full animate-blob rounded-3xl opacity-70 blur-3xl" />
				<div className="absolute right-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu overflow-hidden rounded-full">
					<div
						className="h-[300%] w-[300%] animate-blob rounded-full opacity-30"
						style={{
							background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)`,
						}}
					/>
				</div>
			</div>

			<h3 className="text-2xl font-medium text-fuchsia-200">{title}</h3>
			<p className="mx-auto mt-4 max-w-sm text-base leading-7 text-white/70">
				{description}
			</p>
			<a
				href="#docs"
				className="mt-5 text-sm font-medium text-white underline decoration-white/50 underline-offset-4 transition-colors hover:text-fuchsia-200"
			>
				Know more
			</a>

			{/* Checkmark badge, hidden by default and animated in (slide up +
			    fade in) only when the card is hovered, via the `group`/`group-hover`
			    Tailwind utilities on the parent <article>. */}
			<span
				aria-hidden="true"
				className="absolute right-5 bottom-5 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="task-alt-gradient" x1="0" y1="0" x2="32" y2="32">
							<stop offset="0" stopColor="#6300B1" />
							<stop offset="1" stopColor="#8C01FA" />
						</linearGradient>
					</defs>
					<circle cx="16" cy="16" r="13" stroke="url(#task-alt-gradient)" strokeWidth="2" />
					<path
						d="M10.5 16.5 14.5 20.5 21.8 12"
						stroke="url(#task-alt-gradient)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
		</article>
	)
}

/**
 * The scrolling track of IndustryCards. Combines the horizontal useMarquee
 * loop with an extra per-card vertical "bob" animation, so alternating cards
 * float up and down out of phase with each other while the whole row drifts
 * sideways.
 */
function IndustryMarquee() {
	const trackRef = useMarquee({ speed: 38, direction: 1 })

	useEffect(() => {
		const container = trackRef.current
		if (!container) return undefined

		// Select every rendered <article> (IndustryCard) inside the marquee
		// track, including the clone useMarquee creates internally, so both
		// copies bob in sync.
		const cards = container.querySelectorAll('article')
		const tween = gsap.to(cards, {
			// Even-indexed cards drift up, odd-indexed cards drift down, creating
			// an alternating wave pattern across the row.
			y: (index) => (index % 2 === 0 ? -32 : 32),
			duration: 1,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
			// Slight delay between each card's animation start, so they don't
			// all move in perfect lockstep.
			stagger: 0.12,
		})

		return () => tween.kill()
	}, [trackRef])

	return (
		<div ref={trackRef} className="flex overflow-hidden py-10">
			<div className="flex shrink-0 gap-6 pr-6">
				{INDUSTRY_CARDS.map((card, index) => (
					<IndustryCard
						key={card.title}
						{...card}
						background={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
					/>
				))}
			</div>
		</div>
	)
}

/** Section 6 — three-card Industry Standard feature showcase. */
export default function Testimonials() {
	const headingRef = useScrollReveal({ y: 24, stagger: 0.1 })

	return (
		<section className="overflow-hidden bg-black py-24 sm:py-28">
			<div ref={headingRef} className="mx-auto max-w-6xl px-6 text-center">
				<p className="text-2xl font-medium text-sky-400 sm:text-3xl">
					24/7 support
				</p>
				<h2 className="mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl">
					Industry{' '}
					<span className="bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
						Standard
					</span>
				</h2>
			</div>

			<div className="mt-16">
				<IndustryMarquee />
			</div>
		</section>
	)
}
