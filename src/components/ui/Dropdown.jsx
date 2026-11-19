import { useEffect, useRef, useState } from 'react'
import { useSound } from '../../hooks/soundContext.js'

/**
 * Nav dropdown with a chevron that flips open/closed (see Nav.png).
 * Closes on outside click, escape, or selecting an item.
 */
export default function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const { playClick, playHover } = useSound()

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
        playHover()
        setOpen(true)
      }}
      onMouseLeave={() => {
        closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 150)
      }}
    >
      <button
        type="button"
        onClick={() => {
          playClick()
          setOpen((prev) => !prev)
        }}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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

      {open && (
        <div
          className="absolute left-1/2 top-full z-50 mt-1 w-48 -translate-x-1/2 rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-xl shadow-black/40 backdrop-blur-md"
          role="menu"
        >
          {items.map((item) => (
            <a
              key={item}
              href="#"
              role="menuitem"
              onClick={(event) => {
                event.preventDefault()
                playClick()
                setOpen(false)
              }}
              className="block rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
