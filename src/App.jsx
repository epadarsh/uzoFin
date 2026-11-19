// Wraps the whole app in sound-effect context (mute state + click/hover tones).
import { SoundProvider } from './hooks/useSound.jsx'
// Layout/chrome: shown on every view regardless of scroll position.
import Preloader from './components/layout/Preloader.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
// Page sections, rendered top-to-bottom in the order the design specifies.
import Hero from './components/sections/Hero.jsx'
import LogoStrip from './components/sections/LogoStrip.jsx'
import FeatureShowcase from './components/sections/FeatureShowcase.jsx'
import WhyUzoFin from './components/sections/WhyUzoFin.jsx'
import ApiCta from './components/sections/ApiCta.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FinalCta from './components/sections/FinalCta.jsx'

/**
 * Root application component.
 *
 * Composes the entire single-page layout: a one-time Preloader animation,
 * a fixed Header, the ordered list of page sections inside <main>, and the
 * Footer. Everything is wrapped in SoundProvider so any nested component can
 * call `useSound()` to play click/hover tones or read/toggle the mute state.
 */
function App() {
  return (
    <SoundProvider>
      <Preloader />
      <Header />
      <main id="top">
        <Hero />
        <LogoStrip />
        <FeatureShowcase />
        <ApiCta />
        <WhyUzoFin />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </SoundProvider>
  )
}

export default App

