import React from 'react'
import { motion } from 'framer-motion'
import { User, CheckCircle } from 'lucide-react'

const TopBar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:py-3 md:px-6 lg:px-8"
    >
      {/* Enhanced Glassmorphism background with better mobile visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-purple-500/10 to-neon-pink/10 backdrop-blur-xl rainbow-border-subtle"></div>

      {/* Enhanced mobile background for better contrast */}
      <div className="absolute inset-0 bg-dark-900/60 sm:bg-dark-900/40 backdrop-blur-xl"></div>

      {/* Subtle glow effect at the bottom */}
      <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-sm"></div>

      {/* Animated flowing border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-400/40 via-neon-pink/60 to-cyan-400/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Left side - Profile info with improved mobile layout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold/15 to-neon-pink/15 backdrop-blur-sm rainbow-border-subtle">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                <span className="hidden xs:inline">Profil: </span>
                <span className="bg-gradient-to-r from-neon-pink via-purple-400 to-gold bg-clip-text text-transparent font-bold inline-flex items-center gap-1">
                  <span className="hidden sm:inline">Maja Lubicz</span>
                  <span className="sm:hidden">Maja</span>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 drop-shadow-lg flex-shrink-0" />
                  </motion.div>
                </span>
              </span>
            </div>
          </motion.div>

          {/* Center - Logo (absolutely centered) with improved mobile sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gold via-neon-pink to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
              social.club
            </h1>

            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-neon-pink/20 to-purple-400/20 blur-xl opacity-50 -z-10"></div>
          </motion.div>

          {/* Spacer to maintain layout */}
          <div className="flex-shrink-0 w-16 sm:w-20 md:w-24 lg:hidden"></div>

          {/* Right side - Spacer to balance layout (desktop) */}
          <div className="flex-shrink-0 w-16 sm:w-20 md:w-24 hidden lg:block"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

        {/* Floating particles effect - reduced for mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold/30 rounded-full"
              style={{
                left: `${25 + i * 50}% `,
                top: '50%',
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none"></div>
    </motion.div>
  )
}

export default TopBar