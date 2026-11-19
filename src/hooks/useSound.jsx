import { useCallback, useEffect, useRef, useState } from 'react'
import { SoundContext, STORAGE_KEY, playTone } from './soundContext.js'

/**
 * Provides app-wide sound feedback (click/hover tones) with a persisted mute toggle.
 * Audio only plays after a user gesture, per browser autoplay policy.
 *
 * Wrap the app (or any subtree) with <SoundProvider> once; descendants read
 * the exposed API via the `useSound()` hook (see soundContext.js).
 */
export function SoundProvider({ children }) {
  // Lazily read the persisted mute preference on first render so the UI
  // doesn't flash "unmuted" before syncing with localStorage.
  const [muted, setMuted] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  })
  // Holds the single shared AudioContext instance for this provider's
  // lifetime; created lazily (not on mount) because browsers require a user
  // gesture before an AudioContext can produce sound.
  const ctxRef = useRef(null)

  // Returns the shared AudioContext, creating it on first use and resuming
  // it if the browser had auto-suspended it (e.g. tab was backgrounded).
  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AudioCtx()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // Unlock the audio context on the first user gesture anywhere on the page.
  // Browsers block audio playback until a user interacts with the page, so
  // this ensures the context is ready before the first click/hover sound is
  // actually needed, rather than waiting for the first button interaction.
  useEffect(() => {
    const unlock = () => getContext()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [getContext])

  // Short, punchy descending tone used for button/link clicks.
  const playClick = useCallback(() => {
    if (muted) return
    playTone(getContext(), {
      frequency: 520,
      endFrequency: 320,
      duration: 0.12,
      type: 'triangle',
      gain: 0.07,
    })
  }, [muted, getContext])

  // Quieter, shorter tone used for hover feedback on interactive elements.
  const playHover = useCallback(() => {
    if (muted) return
    playTone(getContext(), { frequency: 780, duration: 0.05, type: 'sine', gain: 0.025 })
  }, [muted, getContext])

  // Flips the mute flag and persists the new preference to localStorage so
  // it survives page reloads.
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      return next
    })
  }, [])

  return (
    <SoundContext.Provider value={{ muted, toggleMute, playClick, playHover }}>
      {children}
    </SoundContext.Provider>
  )
}
