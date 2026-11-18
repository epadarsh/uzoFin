import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const SoundContext = createContext(null)
const STORAGE_KEY = 'uzofin:sound-muted'

/** Plays a short synthesized tone through the Web Audio API (no audio files needed). */
function playTone(ctx, { frequency, endFrequency, duration, type = 'sine', gain = 0.05 }) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  if (endFrequency) {
    osc.frequency.exponentialRampToValueAtTime(endFrequency, ctx.currentTime + duration)
  }

  gainNode.gain.setValueAtTime(gain, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

/**
 * Provides app-wide sound feedback (click/hover tones) with a persisted mute toggle.
 * Audio only plays after a user gesture, per browser autoplay policy.
 */
export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  })
  const ctxRef = useRef(null)

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
  useEffect(() => {
    const unlock = () => getContext()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [getContext])

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

  const playHover = useCallback(() => {
    if (muted) return
    playTone(getContext(), { frequency: 780, duration: 0.05, type: 'sine', gain: 0.025 })
  }, [muted, getContext])

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

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}
