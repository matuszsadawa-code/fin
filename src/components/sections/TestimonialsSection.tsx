import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCheck, MoreVertical, Phone, Video, ArrowLeft, Send } from 'lucide-react'
import profileImage from '../../assets/gallery/550356917_24256911460671885_5800828560684937416_n.jpg'
import { SOCIAL_LINKS } from '../../utils/constants'

interface Testimonial {
  id: string
  platform: 'whatsapp' | 'telegram' | 'onlyfans' | 'instagram'
  name: string
  message: string
  time: string
  avatarUrl: string
  rating?: number
  verified?: boolean
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      platform: 'whatsapp',
      name: "Michał",
      message: "Nie wierzyłem, że odpisujesz, aż dostałem to wideo o 3 w nocy... 🔥 Jesteś niesamowita!",
      time: "03:24",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: '2',
      platform: 'telegram',
      name: "Kamil_Crypto",
      message: "Maja, twoje treści to coś niesamowitego! Każdy dzień z VIP to nowa przygoda 😍",
      time: "23:45",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: '3',
      platform: 'onlyfans',
      name: "Anonim",
      message: "Najlepsza inwestycja tego roku. Maja, jesteś wyjątkowa ❤️",
      time: "14:15",
      avatarUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      verified: true
    },
    {
      id: '4',
      platform: 'whatsapp',
      name: "Piotr",
      message: "Twoje nocne wiadomości to najlepszy sposób na zakończenie dnia 🌙",
      time: "21:30",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: '5',
      platform: 'telegram',
      name: "Bartek",
      message: "VIP kanał to najlepsze co mi się przytrafiło. Worth every penny!",
      time: "07:22",
      avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80",
      rating: 5
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const renderWhatsAppCard = (t: Testimonial) => (
    <div className="bg-[#e5ddd5] dark:bg-[#0b141a] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm mx-auto h-full flex flex-col font-sans">
      {/* Header */}
      <div className="bg-[#008069] dark:bg-[#202c33] p-3 flex items-center gap-3 text-white shadow-sm z-10">
        <ArrowLeft className="w-5 h-5" />
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
          <img src={profileImage} alt="Maja" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight">Maja ❤️</h3>
          <p className="text-[10px] opacity-80">online</p>
        </div>
        <div className="flex gap-4">
          <Video className="w-5 h-5" />
          <Phone className="w-4 h-4" />
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 relative overflow-hidden flex flex-col justify-end space-y-2" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
        <div className="absolute inset-0 bg-[#e5ddd5]/90 dark:bg-[#0b141a]/90"></div>

        {/* Date Bubble */}
        <div className="relative z-10 flex justify-center mb-4">
          <span className="bg-[#e1f3fb] dark:bg-[#1f2c34] text-gray-600 dark:text-gray-300 text-[10px] px-2 py-1 rounded-lg shadow-sm font-medium uppercase">
            Dzisiaj
          </span>
        </div>

        {/* User Message (Right) */}
        <div className="relative z-10 self-end max-w-[85%]">
          <div className="bg-[#d9fdd3] dark:bg-[#005c4b] p-2 px-3 rounded-lg rounded-tr-none shadow-sm text-sm text-gray-800 dark:text-gray-100 leading-snug">
            {t.message}
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.time}</span>
              <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
            </div>
          </div>
        </div>

        {/* Maja Reply (Left) - Optional */}
        <div className="relative z-10 self-start max-w-[85%]">
          <div className="bg-white dark:bg-[#202c33] p-2 px-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-800 dark:text-gray-100 leading-snug">
            Dzięki {t.name}! 😘 Czekaj na wieczór... 😈
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-2 flex items-center gap-2">
        <div className="bg-white dark:bg-[#2a3942] flex-1 rounded-full px-4 py-2 text-sm text-gray-400 flex justify-between items-center">
          <span>Napisz wiadomość...</span>
        </div>
        <div className="bg-[#008069] p-2 rounded-full text-white">
          <Send className="w-4 h-4" />
        </div>
      </div>
    </div>
  )

  const renderTelegramCard = (t: Testimonial) => (
    <div className="bg-[#99BA92] dark:bg-[#0e1621] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm mx-auto h-full flex flex-col font-sans relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://telegram.org/file/464001088/1/bI7_Mp_7ksA.97872/014e2d83c22e38a035")', backgroundSize: 'cover' }}></div>

      {/* Header */}
      <div className="bg-[#517da2] dark:bg-[#17212b] p-3 flex items-center gap-3 text-white shadow-sm z-10">
        <ArrowLeft className="w-5 h-5" />
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
          <img src={profileImage} alt="Maja" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight">Maja VIP 💎</h3>
          <p className="text-[10px] opacity-80">12 453 subskrybentów</p>
        </div>
        <MoreVertical className="w-4 h-4" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 relative z-10 flex flex-col justify-end space-y-3">

        {/* Message Bubble */}
        <div className="self-start max-w-[90%] bg-white dark:bg-[#182533] p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 dark:text-gray-100 leading-snug relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[#4c78a1] dark:text-[#64b5ef] font-semibold text-xs">{t.name}</span>
          </div>
          {t.message}
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[10px] text-gray-400">{t.time}</span>
          </div>
        </div>

        {/* Maja Reply */}
        <div className="self-start max-w-[90%] bg-white dark:bg-[#182533] p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 dark:text-gray-100 leading-snug relative ml-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#e17076] font-semibold text-xs">Maja (Admin)</span>
            <span className="bg-[#e17076]/10 text-[#e17076] text-[8px] px-1 rounded">WŁAŚCICIEL</span>
          </div>
          Dzięki za wsparcie! ❤️
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[10px] text-gray-400">{t.time}</span>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-[#17212b] p-2 flex items-center gap-2 z-10">
        <div className="flex-1 text-sm text-gray-400 px-2">
          Napisz wiadomość...
        </div>
        <Send className="w-5 h-5 text-[#517da2]" />
      </div>
    </div>
  )

  const renderOnlyFansCard = (t: Testimonial) => (
    <div className="bg-white dark:bg-[#1b1b1b] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm mx-auto h-full flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#1b1b1b] p-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
          <h3 className="font-bold text-sm text-gray-800 dark:text-white uppercase">POSTY</h3>
        </div>
        <MoreVertical className="w-4 h-4 text-gray-800 dark:text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black">
        {/* Post Header */}
        <div className="bg-white dark:bg-[#1b1b1b] p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img src={profileImage} alt="Maja" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-gray-900 dark:text-white">Maja</span>
              <CheckCheck className="w-3 h-3 text-[#00aff0] bg-transparent rounded-full" />
            </div>
            <span className="text-xs text-gray-500">@mayalubicz • 2h temu</span>
          </div>
        </div>

        {/* Post Content (Text) */}
        <div className="bg-white dark:bg-[#1b1b1b] px-3 pb-2 text-sm text-gray-800 dark:text-gray-200">
          Kto chce nowy filmik? 👇😈
        </div>

        {/* Comment Section */}
        <div className="mt-2 bg-white dark:bg-[#1b1b1b] p-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-2xl p-3 text-sm">
                <span className="font-bold text-gray-900 dark:text-white mr-2">{t.name}</span>
                <span className="text-gray-700 dark:text-gray-300">{t.message}</span>
              </div>
              <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-medium">
                <span>Lubię to!</span>
                <span>Odpowiedz</span>
                <span>{t.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCard = (t: Testimonial) => {
    switch (t.platform) {
      case 'whatsapp': return renderWhatsAppCard(t)
      case 'telegram': return renderTelegramCard(t)
      case 'onlyfans': return renderOnlyFansCard(t)
      default: return renderWhatsAppCard(t)
    }
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-neon-pink/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 glow-text">
            Co mówią o mnie
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Prawdziwe wiadomości od prawdziwych fanów. Zobacz, dlaczego nie mogą się bez mnie obejść.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-sm mx-auto h-[500px] mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {renderCard(testimonials[currentIndex])}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-neon-pink scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
                }
              `}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-pink mb-2">98%</div>
            <div className="text-gray-400">Zadowolonych fanów</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-purple mb-2">24/7</div>
            <div className="text-gray-400">Odpowiadam na wiadomości</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-pink mb-2">5★</div>
            <div className="text-gray-400">Średnia ocena</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 backdrop-blur-sm rounded-2xl p-8 border border-neon-pink/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold mb-4 text-white">
              Dołącz do zadowolonych fanów
            </h3>
            <p className="text-gray-300 mb-6">
              Nie czekaj - każda chwila to stracona okazja na niezapomniane doświadczenia.
            </p>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform inline-block"
            >
              Zacznij swoją przygodę
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
