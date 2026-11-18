import { SoundProvider } from './hooks/useSound.jsx'
import Preloader from './components/layout/Preloader.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import LogoStrip from './components/sections/LogoStrip.jsx'
import FeatureShowcase from './components/sections/FeatureShowcase.jsx'
import WhyUzoFin from './components/sections/WhyUzoFin.jsx'
import ApiCta from './components/sections/ApiCta.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FinalCta from './components/sections/FinalCta.jsx'

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

