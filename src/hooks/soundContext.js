import { createContext, useContext } from 'react'

// React context carrying the shared sound API ({ muted, toggleMute, playClick,
// playHover }) provided by <SoundProvider> (see useSound.jsx) and consumed by
// useSound() below. Kept in its own module (rather than inside useSound.jsx)
// so that file only exports the SoundProvider *component*, letting Vite's
// Fast Refresh hot-reload it reliably.
export const SoundContext = createContext(null)

// localStorage key used to persist the user's mute preference across reloads.
export const STORAGE_KEY = 'uzofin:sound-muted'

/**
 * Plays a short synthesized tone through the Web Audio API (no audio files needed).
 *
 * @param {AudioContext} ctx - the shared AudioContext to play through.
 * @param {object} options
 * @param {number} options.frequency - starting pitch, in Hz.
 * @param {number} [options.endFrequency] - if set, the pitch glides from `frequency` to this value
 *   over `duration` (used for the descending "click" tone).
 * @param {number} options.duration - how long the tone plays, in seconds.
 * @param {OscillatorType} [options.type='sine'] - waveform shape (sine, triangle, square, sawtooth).
 * @param {number} [options.gain=0.05] - peak volume (0–1) before the fade-out envelope.
 */
export function playTone(ctx, { frequency, endFrequency, duration, type = 'sine', gain = 0.05 }) {
  // OscillatorNode: the actual signal generator that produces the waveform.
  const osc = ctx.createOscillator()
  // GainNode: controls volume over time, used here purely as a fade-out envelope.
  const gainNode = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  if (endFrequency) {
    // Smoothly glide the pitch down (or up) to `endFrequency` — this is what
    // gives the click sound its distinctive downward "blip" character.
    osc.frequency.exponentialRampToValueAtTime(endFrequency, ctx.currentTime + duration)
  }

  // Start at full `gain`, then ramp down toward (near) silence by the end of
  // the tone so it fades out cleanly instead of cutting off abruptly, which
  // would otherwise produce an audible click/pop artifact.
  gainNode.gain.setValueAtTime(gain, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  // Wire the signal path: oscillator -> gain envelope -> speakers.
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

/**
 * Hook for consuming the shared sound API from any component.
 * Must be called within a <SoundProvider> (see useSound.jsx), otherwise it
 * throws to make the missing-provider mistake obvious during development.
 *
 * @returns {{ muted: boolean, toggleMute: () => void, playClick: () => void, playHover: () => void }}
 */
export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}
