import { useSound } from '../../hooks/useSound.jsx'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap'

const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
}

const variants = {
  gradient: 'btn-gradient text-white shadow-lg ',
  outline:
    'btn-outline border border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50',
  'outline-dark':
    'border border-ink-900/15 text-ink-900 bg-transparent hover:bg-ink-900/5 hover:border-ink-900/30',
}

/**
 * Shared CTA button used across the site. Renders an <a> when `href` is
 * provided, otherwise a <button>. Plays a click tone and shows an arrow
 * icon by default, matching the "START BUILDING ->" style from the design.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'gradient',
  size = 'md',
  icon = true,
  className = '',
  ...rest
}) {
  const { playClick, playHover } = useSound()
  const Tag = href ? 'a' : 'button'

  const handleClick = (event) => {
    playClick()
    onClick?.(event)
  }

  return (
    <Tag
      href={href}
      onClick={handleClick}
      onMouseEnter={playHover}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Tag>
  )
}
