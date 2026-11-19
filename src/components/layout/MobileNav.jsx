import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import SoundToggle from '../ui/SoundToggle.jsx'
import { NAV_LINKS } from './navLinks.js'
import { useSound } from '../../hooks/soundContext.js'

/**
 * Slide-in mobile navigation panel, shown below the `lg` breakpoint.
 * Reuses the same NAV_LINKS data as the desktop header, rendering dropdown
 * entries as expandable accordion sections instead of hover menus.
 *
 * @param {object} props
 * @param {boolean} props.open - whether the panel is currently open.
 * @param {() => void} props.onClose - called to close the panel (overlay click, X button, link tap, or Escape).
 */
export default function MobileNav({ open, onClose }) {
  // Backdrop behind the panel; faded in/out via GSAP opacity tween.
  const overlayRef = useRef(null)
  // The sliding panel itself; translated in/out along the x-axis via GSAP.
  const panelRef = useRef(null)
  // Tracks which dropdown accordion section (if any) is currently expanded;
  // `null` means all sections are collapsed.
  const [expanded, setExpanded] = useState(null)
  const { playClick } = useSound()

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return undefined

    if (open) {
      // Prevent the page behind the panel from scrolling while it's open.
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: 'power3.out' })
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
      gsap.to(panelRef.current, { x: '100%', duration: 0.35, ease: 'power3.in' })
    }

    // Allow dismissing the panel with the Escape key while it's open.
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Always restore scrolling on cleanup, in case the component unmounts
      // while the panel was open.
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // Shared close handler for every dismissal path (overlay click, X button,
  // link/sub-item tap): plays the click tone, closes the panel, and resets
  // any expanded accordion section so it reopens collapsed next time.
  const closeAndReset = () => {
    playClick()
    onClose()
    setExpanded(null)
  }

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Dimmed backdrop; tapping it closes the panel. */}
      <div
        ref={overlayRef}
        onClick={closeAndReset}
        className="invisible fixed inset-0 z-40 bg-black/60 opacity-0"
      />
      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] translate-x-full bg-ink-900 p-6 shadow-2xl"
      >
        {/* Panel header: logo + close (✕) button. */}
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1 1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_LINKS.map((link) =>
            // Links with sub-items ('Payments', 'Payouts') render as an
            // expandable accordion row instead of the desktop hover dropdown.
            link.items ? (
              <div key={link.label} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    playClick()
                    // Toggle: tapping an already-expanded section collapses it,
                    // tapping a different one switches to it.
                    setExpanded((prev) => (prev === link.label ? null : link.label))
                  }}
                  className="flex w-full items-center justify-between py-3 text-sm text-white/80"
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${
                      expanded === link.label ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {expanded === link.label && (
                  <div className="pb-3 pl-3">
                    {link.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        onClick={(event) => {
                          // Sub-items are display-only placeholders (no real
                          // destinations yet), so just close the menu.
                          event.preventDefault()
                          closeAndReset()
                        }}
                        className="block py-2 text-sm text-white/60"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Plain link — no sub-items, just navigate and close the panel.
              <a
                key={link.label}
                href={link.href}
                onClick={closeAndReset}
                className={`border-b border-white/10 py-3 text-sm ${
                  link.active ? 'font-medium text-white' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Panel footer: primary CTA + sound mute toggle. */}
        <div className="mt-8 flex items-center gap-3">
          <Button href="#start-building" size="sm" onClick={closeAndReset} className="flex-1">
            START BUILDING
          </Button>
          <SoundToggle />
        </div>
      </div>
    </div>
  )
}
