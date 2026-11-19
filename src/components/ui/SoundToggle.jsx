import { useSound } from '../../hooks/soundContext.js'

/** Mute/unmute toggle for the site's click/hover sound effects. */
export default function SoundToggle({ className = '' }) {
  const { muted, toggleMute, playClick } = useSound()

  return (
    <button
      type="button"
      onClick={() => {
        toggleMute()
        playClick()
      }}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white ${className}`}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2 6h2.5L8 3.2v9.6L4.5 10H2V6Z"
            fill="currentColor"
          />
          <path
            d="m10.5 6.2 3 3.6m0-3.6-3 3.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 6h2.5L8 3.2v9.6L4.5 10H2V6Z" fill="currentColor" />
          <path
            d="M10.5 5.3a3.2 3.2 0 0 1 0 5.4M12.3 3.5a6 6 0 0 1 0 9"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  )
}
