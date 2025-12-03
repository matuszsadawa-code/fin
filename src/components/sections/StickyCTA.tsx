import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'
import { trackCTAClick } from '../../utils/analytics'

const StickyCTA: React.FC = () => {
  const handleClick = () => {
    trackCTAClick('sticky_bottom_cta', 'bottom')
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-600 to-purple-600 backdrop-blur-xl border-t border-pink-400/30 shadow-2xl shadow-pink-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Left - Message */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
          </motion.div>
          <div>
            <p className="text-white font-bold text-sm sm:text-lg">Maja jest teraz Online 💋</p>
            <p className="text-pink-100 text-xs sm:text-sm hidden sm:block">Dołącz i poznaj mnie bliżej...</p>
          </div>
        </div>

        {/* Right - CTA Button */}
        <motion.a
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-pink-600 font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Zobacz Więcej</span>
          <span className="sm:hidden">Zobacz Więcej</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default StickyCTA
