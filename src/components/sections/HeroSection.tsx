import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, MessageCircle, Shield, CheckCircle, Lock, CreditCard, Bitcoin, Coins, ArrowDown } from 'lucide-react'
import heroGif from '../../assets/openart-video-46e8f1bb-1764363-unscreen.gif'

const HeroSection: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const fullText = "W dzień studentka blockchain... w nocy spełniam Twoje najdziksze wyobrażenia."
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50) // Faster typing for better feel

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const trustBoosters = [
    {
      icon: CheckCircle,
      text: "Zweryfikowany Twórca",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20"
    },
    {
      icon: Shield,
      text: "Wiek zweryfikowany",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20"
    },
    {
      icon: Lock,
      text: "Gwarancja dyskrecji",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20"
    },
    {
      icon: CreditCard,
      text: "Bezpieczne Płatności",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/20"
    }
  ]

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a] opacity-60"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto lg:mx-0"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">Dostępna teraz online</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold leading-tight">
                <span className="block text-white">Maja</span>
                <span className="block bg-gradient-to-r from-neon-pink via-purple-400 to-neon-purple bg-clip-text text-transparent animate-gradient-x">
                  Czereśnia
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 font-light h-[60px] sm:h-[40px]">
                <span className="typewriter">{typewriterText}</span>
                <span className="animate-pulse text-neon-pink">|</span>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              {[
                { label: "Wiek", value: "22", sub: "Lata" },
                { label: "Lokalizacja", value: "PL", sub: "Polska" },
                { label: "Status", value: "VIP", sub: "Modelka" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('preview-gallery')}
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-pink to-purple-600 rounded-full font-bold text-white shadow-lg shadow-neon-pink/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  Zobacz Galerię
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('social-hub')}
                className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Napisz do mnie
              </motion.button>
            </div>

            {/* Trust Boosters */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustBoosters.map((booster, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start gap-2 group">
                  <div className={`p-2 rounded-lg ${booster.bgColor} ${booster.color} ring-1 ring-inset ${booster.borderColor} group-hover:scale-110 transition-transform`}>
                    <booster.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400 text-center lg:text-left group-hover:text-gray-300 transition-colors">
                    {booster.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] sm:w-[380px] lg:w-[420px] aspect-[3/4]">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-pink to-purple-600 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse-slow"></div>

              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/50 bg-gray-900">
                <img
                  src={heroGif}
                  alt="Maja Czereśnia"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl"
                >
                  <Bitcoin className="w-8 h-8 text-yellow-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl"
                >
                  <Coins className="w-8 h-8 text-blue-400" />
                </motion.div>
              </div>

              {/* Verification Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-black p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-500 p-2 rounded-full text-white">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm">Zweryfikowana</div>
                  <div className="text-xs text-gray-600">Oficjalny Profil</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-gray-500 hover:text-white transition-colors"
        onClick={() => scrollToSection('preview-gallery')}
      >
        <span className="text-xs uppercase tracking-widest">Odkryj więcej</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </header>
  )
}

export default HeroSection
