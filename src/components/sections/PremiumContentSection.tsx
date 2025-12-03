import React from 'react'
import { motion } from 'framer-motion'
import {
  Flame,
  Heart,
  Gift,
  Phone,
  Video,
  Sparkles,
  MessageCircle,
  ArrowRight
} from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'

interface ContentItem {
  id: string
  title: string
  description: string
  type: 'exclusive' | 'interaction' | 'bonus'
  icon: React.ReactNode
  preview?: string
  isNew?: boolean
  isHot?: boolean
  value?: string
}

const PremiumContentSection: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: 'ad-free',
      title: 'Spotkania Na Żywo',
      description: 'Wyjdźmy poza internet! Możliwość spotkań na żywo, realne znajomości i prawdziwe emocje.',
      type: 'bonus',
      icon: <Heart className="w-6 h-6" />,
      preview: 'Prawdziwa bliskość...',
      isHot: true,
      value: 'VIP'
    },
    {
      id: 'premium-content',
      title: 'Ekskluzywne Treści',
      description: 'Świeże, ekskluzywne zdjęcia i filmy każdego dnia! Najwyższa jakość, intymne momenty.',
      type: 'exclusive',
      icon: <Gift className="w-6 h-6" />,
      preview: 'Codziennie nowe...',
      isHot: true,
      value: 'Daily'
    },
    {
      id: 'behind-scenes',
      title: 'Prywatny Numer',
      description: 'Masz mój prywatny numer telefonu i WhatsApp! Rozmawiaj ze mną osobiście, kiedy chcesz.',
      type: 'exclusive',
      icon: <Phone className="w-6 h-6" />,
      preview: 'Bezpośredni kontakt...',
      isNew: true,
      value: 'VIP'
    },
    {
      id: 'hd-content',
      title: 'Sexting & Live Video',
      description: 'Gorące wiadomości z ekskluzywnymi materiałami wideo i zdjęciami na żywo!',
      type: 'exclusive',
      icon: <Video className="w-6 h-6" />,
      preview: 'Real-time action...',
      isHot: true,
      value: 'Live'
    },
    {
      id: 'early-access',
      title: 'Girlfriend Experience',
      description: 'Autentyczna relacja jak z prawdziwą dziewczyną! Codzienne rozmowy i wspólne chwile.',
      type: 'exclusive',
      icon: <Sparkles className="w-6 h-6" />,
      preview: 'Prawdziwa relacja...',
      isNew: true,
      value: 'GFE'
    },
    {
      id: 'direct-messages',
      title: 'Prywatny Chat 24/7',
      description: 'Piszę do Ciebie sama! Nieograniczone wiadomości, szybkie odpowiedzi i autentyczna rozmowa.',
      type: 'interaction',
      icon: <MessageCircle className="w-6 h-6" />,
      preview: 'Zawsze dostępna...',
      isHot: true,
      value: '24/7'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Premium <span className="bg-gradient-to-r from-neon-pink via-purple-400 to-neon-purple bg-clip-text text-transparent animate-gradient-x">Content</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Dołącz do elitarnego grona i zyskaj dostęp do materiałów, których nie znajdziesz nigdzie indziej.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contentItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                {item.isHot && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/20 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> HOT
                  </span>
                )}
                {item.isNew && (
                  <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs font-bold rounded-full border border-neon-purple/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> NEW
                  </span>
                )}
              </div>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-neon-pink">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.description}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.preview}</span>
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-pink text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  ODBLOKUJ <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumContentSection