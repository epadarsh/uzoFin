import Logo from '../ui/Logo.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useSound } from '../../hooks/soundContext.js'

const COLUMNS = [
	{
		title: 'Products',
		links: [
			'AI Banking',
			'Payment',
			'Payout',
			'Merchant Onboarding',
			'FRM',
		],
	},
	{
		title: 'Company',
		links: ['About Us', 'Help Center', 'Contact'],
	},
	{
		title: 'Legal',
		links: ['Cookie Policy', 'Privacy Policy', 'Terms of Service'],
	},
]

const SOCIAL = [
	{ label: '/uzofin', name: 'LinkedIn', icon: 'in', bg: 'bg-[#0A66C2]' },
	{ label: '/uzofin', name: 'X', icon: 'x', bg: 'bg-black' },
	{
		label: '/uzofin',
		name: 'Instagram',
		icon: 'ig',
		bg: 'bg-linear-to-br from-amber-400 via-pink-500 to-violet-600',
	},
	{ label: '/uzofin', name: 'Facebook', icon: 'fb', bg: 'bg-[#1877F2]' },
]

function SocialIcon({ icon }) {
	switch (icon) {
		case 'in':
			return (
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M1.5 4.8h2.3v8H1.5v-8Zm1.15-3.7a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM5.3 4.8h2.2v1.1h.03c.3-.56 1.05-1.15 2.17-1.15C12 4.75 12.5 6.2 12.5 8.1v4.7h-2.3V8.6c0-1.03-.02-2.36-1.45-2.36-1.45 0-1.67 1.12-1.67 2.28v4.28H5.3v-8Z" />
				</svg>
			)
		case 'x':
			return (
				<svg
					width="13"
					height="13"
					viewBox="0 0 14 14"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M8.3 6.1 13 1h-1.5L7.6 5.1 4.6 1H.8l4.9 6.9L.8 13h1.5l4.2-4.4L9.7 13h3.8L8.3 6.1Zm-1.5 1.7-.5-.7L2.5 2h1.8l3.1 4.4.5.7 4.1 5.7H10l-3.2-4.6Z" />
				</svg>
			)
		case 'ig':
			return (
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					stroke="currentColor"
					aria-hidden="true"
				>
					<rect
						x="1.5"
						y="1.5"
						width="11"
						height="11"
						rx="3"
						strokeWidth="1.2"
					/>
					<circle cx="7" cy="7" r="2.6" strokeWidth="1.2" />
					<circle
						cx="10.2"
						cy="3.8"
						r="0.6"
						fill="currentColor"
						stroke="none"
					/>
				</svg>
			)
		default:
			return (
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M9 2.6H7.7c-.5 0-.7.2-.7.7v1.5h2l-.25 2H7v6.2H4.8V6.8H3.3v-2h1.5V3.2c0-1.4.8-2.6 2.6-2.6H9v2Z" />
				</svg>
			)
	}
}

export default function Footer() {
	const ref = useScrollReveal({ stagger: 0.08, y: 24 })
	const { playClick, playHover } = useSound()

	return (
		<footer className="border-t border-white/10 bg-ink-900">
			<div className="mx-auto max-w-7xl px-6 pt-14 pb-8 lg:px-10">
				<div
					ref={ref}
					className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6"
				>
					<div className="col-span-2 lg:col-span-2">
						<Logo size="large" />
						<p className="mt-4 text-sm font-medium text-white/80">
							Connect. Control. Comply
						</p>
						<p className="mt-3 max-w-xs text-sm text-white/50">
							Experience the new age of payments with UzOFin and explore new
							growth opportunities to reach greater heights
						</p>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.title}>
							<h3 className="text-xs font-semibold tracking-wide text-sky-400">
								{col.title.toUpperCase()}
							</h3>
							<ul className="mt-4 space-y-3">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#"
											onClick={(event) => {
												event.preventDefault()
												playClick()
											}}
											onMouseEnter={playHover}
											className="text-sm text-white/50 transition-colors hover:text-white"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}

					<div>
						<h3 className="text-xs font-semibold tracking-wide text-sky-400">
							SOCIAL
						</h3>
						<ul className="mt-4 space-y-3">
							{SOCIAL.map((social) => (
								<li key={social.name} className="flex items-center gap-2">
									<a
										href="#"
										aria-label={social.name}
										onClick={(event) => {
											event.preventDefault()
											playClick()
										}}
										onMouseEnter={playHover}
										className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${social.bg}`}
									>
										<SocialIcon icon={social.icon} />
									</a>
									<span className="text-sm text-white/50">
										{social.label}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
					<p>Copyright © 2026 UzOFin. All rights reserved</p>
					<p>India (EN)</p>
				</div>
			</div>
		</footer>
	)
}
