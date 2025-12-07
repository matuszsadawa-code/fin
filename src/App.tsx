import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PersonalIntro from './components/sections/PersonalIntro'
import SocialHub from './components/sections/SocialHub'
import PreviewGallery from './components/sections/PreviewGallery'
import CryptoEbookSection from './components/sections/CryptoEbookSection'
import PremiumContentSection from './components/sections/PremiumContentSection'
import PaywallSection from './components/sections/PaywallSection'
import FAQSection from './components/sections/FAQSection'
import StickyCTA from './components/sections/StickyCTA'
import Footer from './components/sections/Footer'
import VerificationSection from './components/sections/VerificationSection'
import FloatingHearts from './components/animations/FloatingHearts'
import FloatingCryptoIcons from './components/animations/FloatingCryptoIcons'
import InteractiveHearts from './components/animations/InteractiveHearts'
import TestimonialsSection from './components/sections/TestimonialsSection'
import RealTimeActivityWidget from './components/ui/RealTimeActivityWidget'

import TopBar from './components/ui/TopBar'
import AgeGate from './components/ui/AgeGate'
import ExitIntentPopup from './components/ui/ExitIntentPopup'
import AnalyticsDashboard from './components/pages/AnalyticsDashboard'
import VerifyPage from './components/pages/VerifyPage'
import VIPAccessPage from './components/pages/VIPAccessPage'
import PaymentSuccessPage from './components/pages/PaymentSuccessPage'

import { trackPageView, storeDeviceData, trackScrollDepth, trackTimeOnPage } from './utils/analytics'

function HomePage() {
  useEffect(() => {
    // Track initial page view
    trackPageView('home')

    // Store device data on first load
    storeDeviceData()

    // Track scroll depth
    const handleScroll = () => {
      trackScrollDepth()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Track time on page every 10 seconds
    const timeInterval = setInterval(() => {
      trackTimeOnPage('home')
    }, 10000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-neon-gradient relative">
      {/* Age Gate - Must verify before seeing content */}
      <AgeGate />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Pasek górny z logo i informacjami */}
      <TopBar />

      {/* Latające serduszka w tle */}
      <FloatingHearts />

      {/* Latające ikony crypto i blockchain */}
      <FloatingCryptoIcons />

      {/* Interaktywne serduszka reagujące na scroll */}
      <InteractiveHearts />

      {/* Główna zawartość z marginesem na górze dla paska i na dole dla sticky CTA */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-20 pb-20 sm:pb-24">
        <PersonalIntro />
        <SocialHub />
        <CryptoEbookSection />
        <VerificationSection />
        <PreviewGallery />
        <PremiumContentSection />
        <PaywallSection />
        <TestimonialsSection />
        <FAQSection />
        <StickyCTA />
        <Footer />
      </div>

      {/* Widget powiadomień o aktywności w czasie rzeczywistym */}
      <RealTimeActivityWidget />


    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/vip-access" element={<VIPAccessPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
