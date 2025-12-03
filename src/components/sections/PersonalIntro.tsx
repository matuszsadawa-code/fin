import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Lock, CreditCard, Cake, Scale, Ruler, Cpu, TrendingUp, Zap, MapPin } from 'lucide-react'
import heroImage from '../../assets/hero.png'

const PersonalIntro: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Trust certificates data
  const trustCertificates = [
    {
      icon: CheckCircle,
      text: "Zweryfikowany Twórca",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      ariaLabel: "Profil zweryfikowany przez platformę"
    },
    {
      icon: Shield,
      text: "Wiek zweryfikowany",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      ariaLabel: "Wiek potwierdzony dokumentem tożsamości"
    },
    {
      icon: Lock,
      text: "Gwarancja dyskrecji",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      ariaLabel: "Pełna dyskrecja i prywatność gwarantowana"
    },
    {
      icon: CreditCard,
      text: "Bezpieczne Płatności",
      color: "text-yellow-400",
      bgColor: "bg-gradient-to-br from-yellow-400/10 via-neon-pink/10 to-purple-400/10",
      ariaLabel: "Szyfrowane i bezpieczne metody płatności"
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 lg:order-1">
            <div>


              {/* Mobile Image - pokazuje się tylko na mobile pod nagłówkiem */}
              <motion.div
                variants={itemVariants}
                className="lg:hidden mb-8"
              >
                <div className="relative group max-w-sm mx-auto">
                  {/* Simple Image Container without border */}
                  <div className="relative">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                      <img
                        src={heroImage}
                        alt="Maja Czereśnia"
                        className="w-full h-full object-cover object-center rounded-3xl transform scale-110"
                      />
                    </div>

                    {/* Verification Text Label with Icon */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500/90 to-rose-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-pink-500/30 border border-pink-400/30 animate-bounce-slow">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 drop-shadow-lg" />
                        <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                          Profil Zweryfikowany
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-pink-400/15 rounded-full blur-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Hero-style floating particles */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-neon-pink rounded-full animate-float opacity-50 shadow-lg shadow-neon-pink/40" role="img" aria-label="Dekoracyjny element"></div>
                  <div className="absolute bottom-1/4 -right-2 w-2 h-2 bg-neon-purple rounded-full animate-float delay-1500 opacity-50 shadow-lg shadow-neon-purple/40" role="img" aria-label="Dekoracyjny element"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  <motion.div
                    className="relative p-2 sm:p-3 rounded-full glass-crypto backdrop-blur-md flex-shrink-0"
                    whileHover={{
                      scale: 1.05,
                      rotate: 360,
                      boxShadow: "0 0 30px rgba(255, 79, 216, 0.4)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/30 to-purple-500/30 blur-sm animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-md"></div>
                    <Cpu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 relative z-10 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 mb-1 sm:mb-2" style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))' }}>STUDENTKA BLOCKCHAIN</h3>
                    <p className="leading-relaxed">Studiuję technologie blockchain na jednej z najlepszych uczelni w Polsce. Dzień spędzam nad kodowaniem, ale wieczory... to już inna historia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <motion.div
                    className="relative p-2 sm:p-3 rounded-full glass-trading backdrop-blur-md flex-shrink-0"
                    whileHover={{
                      scale: 1.05,
                      rotate: 360,
                      boxShadow: "0 0 30px rgba(201, 182, 255, 0.4)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-neon-pink/20 blur-sm"></div>
                    <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-400 relative z-10" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-purple-400 mb-1 sm:mb-2" style={{ filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.5))' }}>FANKA CRYPTO & TRADINGU</h3>
                    <p className="leading-relaxed">Pasjonuję się kryptowalutami i tradingiem. Moja pewność siebie w inwestycjach może być... zaraźliwa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <motion.div
                    className="relative p-2 sm:p-3 rounded-full glass-nsfw backdrop-blur-md flex-shrink-0"
                    whileHover={{
                      scale: 1.05,
                      rotate: 360,
                      boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-neon-pink/20 blur-sm"></div>
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-400 relative z-10" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-pink-400 mb-1 sm:mb-2" style={{ filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.5))' }}>AKTYWNA I SUMIENNA</h3>
                    <p className="leading-relaxed">Codziennie aktywna, zawsze odpowiadam na wiadomości. Moi fani wiedzą, że mogą na mnie liczyć.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 relative"
              style={{
                borderTop: '1px solid transparent',
                backgroundImage: 'linear-gradient(90deg, rgba(52, 211, 153, 0.3), rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3))',
                backgroundSize: '100% 1px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top'
              }}
            >
              {/* Animated glow effect for the border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/40 to-transparent animate-pulse"></div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 p-3 rounded-full group-hover:from-pink-500/30 group-hover:via-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(147, 51, 234, 0.2), 0 0 60px rgba(59, 130, 246, 0.1)'
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -15, 15, -15, 0],
                      boxShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 50px rgba(147, 51, 234, 0.4), 0 0 70px rgba(59, 130, 246, 0.3)"
                    }}
                    transition={{
                      rotate: { duration: 0.8, ease: "easeInOut" },
                      scale: { duration: 0.3 },
                      boxShadow: { duration: 0.4 }
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full blur-sm opacity-60"></div>
                      <Cake className="w-6 h-6 relative z-10" style={{
                        background: 'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))'
                      }} />
                    </div>
                  </motion.div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg animate-pulse" style={{
                  background: 'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 15px rgba(236, 72, 153, 0.6), 0 0 30px rgba(147, 51, 234, 0.4)'
                }}>25</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium group-hover:text-pink-400 transition-colors duration-300">Wiek</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    className="bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 p-3 rounded-full group-hover:from-green-500/30 group-hover:via-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(16, 185, 129, 0.2), 0 0 60px rgba(20, 184, 166, 0.1)'
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: [-3, 3, -3, 3, 0],
                      boxShadow: "0 0 30px rgba(34, 197, 94, 0.5), 0 0 50px rgba(16, 185, 129, 0.4), 0 0 70px rgba(20, 184, 166, 0.3)"
                    }}
                    transition={{
                      y: { duration: 1, ease: "easeInOut" },
                      scale: { duration: 0.3 },
                      boxShadow: { duration: 0.4 }
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full blur-sm opacity-60"></div>
                      <Scale className="w-6 h-6 relative z-10" style={{
                        background: 'linear-gradient(45deg, #22c55e, #10b981, #14b8a6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))'
                      }} />
                    </div>
                  </motion.div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg animate-pulse" style={{
                  background: 'linear-gradient(45deg, #22c55e, #10b981, #14b8a6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 15px rgba(34, 197, 94, 0.6), 0 0 30px rgba(16, 185, 129, 0.4)',
                  animationDelay: '0.5s'
                }}>56kg</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium group-hover:text-green-400 transition-colors duration-300">Waga</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 p-3 rounded-full group-hover:from-orange-500/30 group-hover:via-red-500/30 group-hover:to-pink-500/30 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(239, 68, 68, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)'
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, 20, -20, 0],
                      boxShadow: "0 0 30px rgba(249, 115, 22, 0.5), 0 0 50px rgba(239, 68, 68, 0.4), 0 0 70px rgba(236, 72, 153, 0.3)"
                    }}
                    transition={{
                      rotate: { duration: 0.6, ease: "easeInOut" },
                      scale: { duration: 0.3 },
                      boxShadow: { duration: 0.4 }
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full blur-sm opacity-60"></div>
                      <Ruler className="w-6 h-6 relative z-10" style={{
                        background: 'linear-gradient(45deg, #f97316, #ef4444, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))'
                      }} />
                    </div>
                  </motion.div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg animate-pulse" style={{
                  background: 'linear-gradient(45deg, #f97316, #ef4444, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 15px rgba(249, 115, 22, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)',
                  animationDelay: '1s'
                }}>170cm</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium group-hover:text-orange-400 transition-colors duration-300">Wzrost</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-green-500/20 p-3 rounded-full group-hover:from-purple-500/30 group-hover:via-indigo-500/30 group-hover:to-green-500/30 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(99, 102, 241, 0.2), 0 0 60px rgba(34, 197, 94, 0.1)'
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 360],
                      boxShadow: "0 0 35px rgba(147, 51, 234, 0.6), 0 0 55px rgba(99, 102, 241, 0.5), 0 0 75px rgba(34, 197, 94, 0.4)"
                    }}
                    transition={{
                      rotate: { duration: 1.2, ease: "easeInOut" },
                      scale: { duration: 0.3 },
                      boxShadow: { duration: 0.4 }
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-green-400 rounded-full blur-sm opacity-70"></div>
                      <MapPin className="w-6 h-6 relative z-10" style={{
                        background: 'linear-gradient(45deg, #8b5cf6, #6366f1, #22c55e)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))'
                      }} />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg"
                  animate={{
                    textShadow: [
                      "0 0 15px rgba(147, 51, 234, 0.6)",
                      "0 0 25px rgba(99, 102, 241, 0.8)",
                      "0 0 35px rgba(34, 197, 94, 0.6)",
                      "0 0 25px rgba(99, 102, 241, 0.8)",
                      "0 0 15px rgba(147, 51, 234, 0.6)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #6366f1, #22c55e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  WWA
                </motion.div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium group-hover:text-purple-400 transition-colors duration-300">Lokalizacja</div>
              </div>
            </motion.div>

            {/* Trust Certificates */}
            <motion.div
              variants={itemVariants}
              className="pt-8 mt-8 relative"
            >
              {/* Enhanced glassmorphism border with multiple layers */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-400/40 via-neon-pink/60 to-cyan-400/40 animate-pulse"></div>

              {/* Animated flowing border effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/80 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>

              {/* Glow effect behind the border */}
              <div className="absolute -top-2 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-sm"></div>


              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {trustCertificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="flex flex-col items-center text-center p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl hover:border-gold/60 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gold/25 min-h-[85px] sm:min-h-[100px] md:min-h-[120px] relative overflow-hidden touch-manipulation"
                    role="button"
                    tabIndex={0}
                    aria-label={certificate.ariaLabel}
                  >
                    {/* Enhanced glassmorphism border glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/10 via-transparent to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated border shimmer effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>

                    {/* Inner glow effect */}
                    <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-dark-800/90 to-dark-700/90 backdrop-blur-xl"></div>

                    {/* Content wrapper with higher z-index */}
                    <div className="relative z-10 flex flex-col items-center w-full h-full">
                      <div
                        className={`${certificate.color} ${certificate.bgColor} p-2 sm:p-2.5 md:p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-1.5 sm:mb-2 md:mb-3 shadow-lg`}
                        style={
                          certificate.text === "Bezpieczne Płatności"
                            ? {
                              filter: 'drop-shadow(0 0 8px rgba(255, 212, 0, 0.4)) drop-shadow(0 0 16px rgba(236, 72, 153, 0.3))',
                              animation: 'pulse 2s infinite'
                            }
                            : {}
                        }
                      >
                        <certificate.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs md:text-sm text-gray-200 font-medium leading-tight group-hover:text-white transition-colors duration-300 px-1">
                        {certificate.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Image - ukryte na mobile */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block order-2 lg:order-2"
          >
            <div className="relative group">
              {/* Simple Image Container without border */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                  <img
                    src={heroImage}
                    alt="Maja Czereśnia"
                    className="w-full h-full object-cover object-center rounded-3xl transform scale-90"
                  />
                </div>

                {/* Verification Text Label with Icon */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-pink-500/90 to-rose-500/90 backdrop-blur-md text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-pink-500/30 border border-pink-400/30 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                    <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                      Profil Zweryfikowany
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-pink-400/15 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>

              {/* Hero-style floating particles */}
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-neon-pink rounded-full animate-float opacity-50 shadow-lg shadow-neon-pink/40" role="img" aria-label="Dekoracyjny element"></div>
              <div className="absolute bottom-1/4 -right-2 sm:-right-3 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-neon-purple rounded-full animate-float delay-1500 opacity-50 shadow-lg shadow-neon-purple/40" role="img" aria-label="Dekoracyjny element"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalIntro
