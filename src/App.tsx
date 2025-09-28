import { useEffect } from 'react'
import PersonalIntro from './components/sections/PersonalIntro'
import SocialHub from './components/sections/SocialHub'
import PreviewGallery from './components/sections/PreviewGallery'
import SubscriptionComparisonSection from './components/sections/SubscriptionComparisonSection'
import PaywallSection from './components/sections/PaywallSection'
import FAQSection from './components/sections/FAQSection'
import StickyCTA from './components/sections/StickyCTA'
import VerificationSection from './components/sections/VerificationSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FloatingHearts from './components/animations/FloatingHearts'
import InteractiveHearts from './components/animations/InteractiveHearts'
import RealTimeActivityWidget from './components/ui/RealTimeActivityWidget'

import { trackPageView } from './utils/analytics'
import { initAllAnimations } from './utils/animations'

function App() {
  useEffect(() => {
    // Track initial page view
    trackPageView('home')
    
    // Initialize feminine design system animations
    const timer = setTimeout(() => {
      initAllAnimations()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-aurora bg-grain relative overflow-hidden">
      {/* Aurora animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl animate-blob opacity-60"></div>
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-lavender-400/20 blur-3xl animate-blob-delayed opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blush-400/15 blur-3xl animate-blob opacity-40"></div>
      </div>

      {/* Latające serduszka w tle - enhanced */}
      <FloatingHearts />

      {/* Interaktywne serduszka reagujące na scroll */}
      <InteractiveHearts />

      {/* Główna zawartość */}
      <div className="relative z-10">
        <PersonalIntro />
        <VerificationSection />
        <PreviewGallery />
        <SocialHub />
        <SubscriptionComparisonSection />
        <PaywallSection />
        <TestimonialsSection />
        <FAQSection />
        <StickyCTA />
      </div>

      {/* Widget powiadomień o aktywności w czasie rzeczywistym */}
      <RealTimeActivityWidget />
    </div>
  )
}

export default App





