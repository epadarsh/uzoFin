import { useEffect, useState } from 'react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import Dropdown from '../ui/Dropdown.jsx'
import SoundToggle from '../ui/SoundToggle.jsx'
import MobileNav from './MobileNav.jsx'
import { useSound } from '../../hooks/useSound.jsx'

export const NAV_LINKS = [
  { label: 'AI Banking', href: '#ai-banking', active: true },
  { label: 'Payments', items: ['Payment Links', 'Checkout', 'Invoicing'] },
  { label: 'Payouts', items: ['Bulk Payouts', 'Vendor Payments', 'Settlements'] },
  { label: 'Support', href: '#support' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-900/80 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <Logo />
          <span className="mt-1 text-[10px] tracking-wide text-white/50">
            Connect. Control. Comply
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.items ? (
              <Dropdown key={link.label} label={link.label} items={link.items} />
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className={`text-sm transition-colors ${
                  link.active ? 'font-medium text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SoundToggle />
          <Button href="#start-building" size="sm">
            START BUILDING
          </Button>
        </div>

        <button
          type="button"
          onClick={() => {
            playClick()
            setMobileOpen(true)
          }}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 4.5h14M2 9h14M2 13.5h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
