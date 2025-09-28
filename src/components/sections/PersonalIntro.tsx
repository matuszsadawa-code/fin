import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Activity, Heart, CheckCircle, Shield, Lock, ShieldCheck, Calendar, Weight, Ruler, User } from 'lucide-react'
import lauraImage from '../../assets/ig_00032_.png'

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
      icon: ShieldCheck,
      text: "Bezpieczne Płatności",
      color: "text-neon-pink",
      bgColor: "bg-neon-pink/10",
      ariaLabel: "Szyfrowane i bezpieczne metody płatności"
    }
  ]

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects - subtle aurora */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/20 via-dark-800/30 to-dark-900/20"></div>
      
      <div className="container mx-auto relative z-10">
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
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gradient leading-tight"
              >
                Hej! Jestem Laura
              </motion.h2>

              {/* Mobile Image - pokazuje się tylko na mobile pod nagłówkiem */}
              <motion.div
                variants={itemVariants}
                className="lg:hidden mb-8"
              >
                <div className="relative group max-w-sm mx-auto">
                  {/* Aurora Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 via-lavender-400 to-blush-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse-slow transition-opacity duration-500"></div>

                  {/* Glass Image Container */}
                  <div className="relative glass glass--hover rounded-3xl p-1.5 transition-all duration-500 shadow-glass">
                    <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-dark-800 to-dark-700 overflow-hidden relative border border-white/10">
                      <img
                        src={lauraImage}
                        alt="Laura - Sensual Portrait"
                        className="w-full h-full object-cover object-center rounded-3xl group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                        loading="lazy"
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent rounded-3xl"></div>

                      {/* Enhanced shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                    </div>

                    {/* Verification Badge - nowy design */}
                    <div
                      className="absolute -top-2 -right-2 glass-pink text-white p-2.5 rounded-full shadow-glow-pink animate-bounce-slow"
                      aria-label="Profil zweryfikowany"
                      role="img"
                    >
                      <CheckCircle className="w-5 h-5 drop-shadow-lg text-brand-400" />
                      <div className="absolute inset-0 bg-brand-400/20 rounded-full blur-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Floating particles z nowymi kolorami */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-500 rounded-full animate-float opacity-60 shadow-lg shadow-brand-500/40" role="img" aria-label="Dekoracyjny element"></div>
                  <div className="absolute bottom-1/4 -right-2 w-2 h-2 bg-lavender-400 rounded-full animate-float-delayed opacity-50 shadow-lg shadow-lavender-400/40" role="img" aria-label="Dekoracyjny element"></div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-300">
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-8 h-8 text-neon-pink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Studentka medycyny</h3>
                    <p>Studiuję medycynę na jednej z najlepszych uczelni w Polsce. Dzień spędzam nad książkami, ale wieczory... to już inna historia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-8 h-8 text-neon-purple mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Trochę zbyt pewna siebie</h3>
                    <p>Wiem czego chcę i nie boję się tego pokazać. Moja pewność siebie może być... uzależniająca.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Activity className="w-8 h-8 text-neon-pink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Aktywna i sumienna</h3>
                    <p>Codziennie aktywna, zawsze odpowiadam na wiadomości. Moi fani wiedzą, że mogą na mnie liczyć.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-brand-500/20"
            >
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-brand-500/10 p-2 rounded-full group-hover:bg-brand-500/20 transition-colors duration-300">
                    <Calendar className="w-5 h-5 text-brand-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-brand-500 mb-2">22</div>
                <div className="text-sm text-white/60">Wiek</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-lavender-400/10 p-2 rounded-full group-hover:bg-lavender-400/20 transition-colors duration-300">
                    <Weight className="w-5 h-5 text-lavender-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-lavender-400 mb-2">52kg</div>
                <div className="text-sm text-white/60">Waga</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-brand-500/10 p-2 rounded-full group-hover:bg-brand-500/20 transition-colors duration-300">
                    <Ruler className="w-5 h-5 text-brand-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-brand-500 mb-2">165cm</div>
                <div className="text-sm text-white/60">Wzrost</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blush-400/10 p-2 rounded-full group-hover:bg-blush-400/20 transition-colors duration-300">
                    <User className="w-5 h-5 text-blush-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blush-400 mb-2">85C</div>
                <div className="text-sm text-white/60">Biust</div>
              </div>
            </motion.div>

            {/* Trust Certificates */}
            <motion.div
              variants={itemVariants}
              className="pt-8 mt-8 border-t border-lavender-400/20"
            >
       

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {trustCertificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="glass glass--hover flex flex-col items-center text-center p-3 md:p-4 rounded-xl transition-all duration-300 group cursor-pointer min-h-[100px] md:min-h-[120px]"
                    role="button"
                    tabIndex={0}
                    aria-label={certificate.ariaLabel}
                  >
                    <div className={`${certificate.color} ${certificate.bgColor} p-2.5 md:p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2 md:mb-3 shadow-lg`}>
                      <certificate.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300 px-1">
                      {certificate.text}
                    </span>
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
              {/* Aurora Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 via-lavender-400 to-blush-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse-slow transition-opacity duration-500"></div>

              {/* Glass Image Container */}
              <div className="relative glass glass--hover rounded-3xl p-1.5 transition-all duration-500 shadow-glass">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-dark-800 to-dark-700 overflow-hidden relative border border-white/10">
                  <img
                    src={lauraImage}
                    alt="Laura - Sensual Portrait"
                    className="w-full h-full object-cover object-center rounded-3xl group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent rounded-3xl"></div>

                  {/* Enhanced shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                </div>

                {/* Verification Badge - nowy design */}
                <div
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 glass-pink text-white p-2.5 sm:p-3 rounded-full shadow-glow-pink animate-bounce-slow"
                  aria-label="Profil zweryfikowany"
                  role="img"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg text-brand-400" />
                  <div className="absolute inset-0 bg-brand-400/20 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>

              {/* Floating particles z nowymi kolorami */}
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full animate-float opacity-60 shadow-lg shadow-brand-500/40" role="img" aria-label="Dekoracyjny element"></div>
              <div className="absolute bottom-1/4 -right-2 sm:-right-3 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-lavender-400 rounded-full animate-float-delayed opacity-50 shadow-lg shadow-lavender-400/40" role="img" aria-label="Dekoracyjny element"></div>
            </div>

            {/* Floating Elements z nowym designem */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass-lavender rounded-full p-3"
            >
              <Heart className="w-6 h-6 text-lavender-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 glass-pink rounded-full p-3"
            >
              <Star className="w-6 h-6 text-brand-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalIntro
