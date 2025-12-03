import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Crown, Star, Zap, Heart, XIcon, Calendar, Infinity } from 'lucide-react'
import { SUBSCRIPTION_FEATURES, PRICING } from '../../utils/constants'

interface VIPPlan {
  id: string
  duration: string
  price: number
  originalPrice?: number
  savings?: string
  popular?: boolean
  icon: React.ReactNode
}

const SubscriptionComparisonSection: React.FC = () => {
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false)

  const vipPlans: VIPPlan[] = [
    {
      id: '1-month',
      duration: '1 MIESIĄC',
      price: PRICING.vip_1_month,
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: '3-months',
      duration: '3 MIESIĄCE',
      price: PRICING.vip_3_months,
      originalPrice: 147,
      savings: 'Oszczędzasz 18 zł',
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'lifetime',
      duration: 'LIFETIME',
      price: PRICING.vip_lifetime,
      originalPrice: 588,
      savings: 'Oszczędzasz 289 zł',
      icon: <Infinity className="w-6 h-6" />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  const handleVIPClick = () => {
    setIsVIPModalOpen(true)
  }

  const handlePlanSelect = (planId: string) => {
    // Tu można dodać logikę przekierowania do płatności
    console.log(`Selected plan: ${planId}`)
    setIsVIPModalOpen(false)
  }

  return (
    <section id="subscription-comparison" className="py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
            <span className="bg-gradient-to-r from-neon-pink via-purple-400 to-neon-purple bg-clip-text text-transparent animate-glow-text">
              Porównanie Subskrypcji
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Wybierz plan, który najlepiej odpowiada Twoim potrzebom i odkryj ekskluzywne treści
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-dark-800/80 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-8 h-full">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600/20 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Subskrypcja Darmowa</h3>
                <div className="text-3xl font-bold text-gray-300">
                  0 zł
                  <span className="text-sm font-normal text-gray-500">/miesiąc</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-300 mb-4">Co otrzymujesz:</h4>
                {SUBSCRIPTION_FEATURES.free.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}

                {/* What's NOT included */}
                <div className="pt-4 border-t border-gray-700/50">
                  <h5 className="font-semibold text-gray-400 mb-3">Nie obejmuje:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-500">Ekskluzywne treści</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-500">Prywatne wiadomości</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-500">Treści premium</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button className="w-full py-3 px-6 bg-gray-600/30 hover:bg-gray-600/50 border border-gray-500/50 rounded-xl text-white font-semibold transition-all duration-300">
                  Aktualny Plan
                </button>
              </div>
            </div>
          </motion.div>

          {/* VIP Plan */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-2 rounded-full text-white font-bold text-sm animate-glow">
                <Star className="w-4 h-4 inline mr-2" />
                NAJPOPULARNIEJSZY
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-dark-800/80 backdrop-blur-xl border border-neon-pink/30 rounded-2xl p-8 h-full glow-border">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-full mb-4 animate-glow">
                  <Crown className="w-8 h-8 text-neon-pink" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Subskrypcja VIP</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                  od 49 zł
                  <span className="text-sm font-normal text-gray-400">/miesiąc</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-neon-pink mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Wszystko z planu darmowego PLUS:
                </h4>
                {SUBSCRIPTION_FEATURES.vip.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-neon-pink flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={handleVIPClick}
                  className="w-full neon-button py-4 px-6 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300"
                >
                  DOŁĄCZ DO VIP
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Dołącz do tysięcy zadowolonych subskrybentów VIP
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Bezpieczne płatności</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Anuluj w każdej chwili</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Natychmiastowy dostęp</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* VIP Subscription Modal */}
      <AnimatePresence>
        {isVIPModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVIPModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative bg-dark-800/95 backdrop-blur-xl border border-neon-pink/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVIPModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-400" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-full mb-4 animate-glow">
                  <Crown className="w-8 h-8 text-neon-pink" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Subskrypcja VIP</h3>
                <p className="text-gray-300">Wybierz plan, który najlepiej Ci odpowiada</p>
              </div>

              {/* VIP Plans */}
              <div className="space-y-4">
                {vipPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 ${plan.popular
                        ? 'border-neon-pink/50 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 glow-border'
                        : 'border-gray-600/30 bg-gray-800/30 hover:border-neon-pink/30'
                      }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-1 rounded-full text-white font-bold text-xs animate-glow">
                          NAJPOPULARNIEJSZY
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${plan.popular ? 'bg-neon-pink/20' : 'bg-gray-700/50'}`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{plan.duration}</h4>
                          {plan.savings && (
                            <p className="text-sm text-green-400 font-semibold">{plan.savings}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        {plan.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {plan.originalPrice} zł
                          </div>
                        )}
                        <div className="text-2xl font-bold text-neon-pink">
                          {plan.price} zł
                        </div>
                        {plan.id !== 'lifetime' && (
                          <div className="text-sm text-gray-400">
                            {Math.round(plan.price / (plan.id === '3-months' ? 3 : 1))} zł/miesiąc
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Crypto Ebook Bonus Badge */}
                    <div className="mt-3 pt-3 border-t border-gray-700/30">
                      <div className="flex items-center justify-center space-x-2 text-xs">
                        <span className="text-green-400 font-semibold">🎁</span>
                        <span className="text-gray-300">+ Darmowy <span className="text-green-400 font-bold">Crypto E-book</span></span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Global Bonus Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl border border-green-400/20">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎁</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">BONUS dla każdej subskrypcji!</h4>
                    <p className="text-sm text-gray-300">
                      Otrzymasz darmowy <span className="text-green-400 font-semibold">Crypto E-book</span> - mój osobisty przewodnik po świecie kryptowalut, który pomoże Ci zrozumieć podstawy i zacząć zarabiać!
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400 mb-4">
                  Bezpieczne płatności • Anuluj w każdej chwili • Natychmiastowy dostęp
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>SSL szyfrowanie</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SubscriptionComparisonSection
