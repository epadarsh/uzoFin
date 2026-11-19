import { createContext, useContext } from 'react'

export const SoundContext = createContext(null)
export const STORAGE_KEY = 'uzofin:sound-muted'

/** Plays a short synthesized tone through the Web Audio API (no audio files needed). */
export function playTone(ctx, { frequency, endFrequency, duration, type = 'sine', gain = 0.05 }) {
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

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}
