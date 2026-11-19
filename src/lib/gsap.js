import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the ScrollTrigger plugin exactly once for the whole app. GSAP
// plugins must be registered before they're used, and registering more than
// once is harmless but wasteful, so this module acts as the single shared
// entry point — every file that needs GSAP imports `gsap`/`ScrollTrigger`
// from here instead of importing directly from the `gsap` package.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
