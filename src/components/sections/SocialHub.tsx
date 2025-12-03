import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, ArrowUpRight, Star, Twitter } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'

interface SocialLink {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  preview: string
  url: string
  isPremium?: boolean
  isVIP?: boolean
  specialBadge?: string
}

const SocialHub: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Social Media platforms with enhanced data
  const socialMediaLinks: SocialLink[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8" />,
      description: 'Mój profil na Instagram.',
      preview: 'Mój profil na Instagram.',
      url: SOCIAL_LINKS.instagram,
      specialBadge: ''
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">TT</div>,
      description: 'Mój profil na TikTok.',
      preview: 'Mój profil na TikTok.',
      url: SOCIAL_LINKS.tiktok,
      specialBadge: ''
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <MessageCircle className="w-8 h-8" />,
      description: 'Mój profil na Telegram.',
      preview: 'Mój profil na Telegram.',
      url: SOCIAL_LINKS.telegram,
      specialBadge: ''
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: <Twitter className="w-8 h-8" />,
      description: 'Mój profil na X',
      preview: 'Obserwuj mnie na X',
      url: SOCIAL_LINKS.twitter,
      specialBadge: ''
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="social-hub" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">




        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >


          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          >
            {socialMediaLinks.map((link, index) => (
              <motion.div
                key={link.id}
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(link.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
                style={{ zIndex: hoveredCard === link.id ? 10 : 1 }}
              >
                {/* Enhanced Card - Updated to match new sections */}
                <div className={`
                      relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 text-center
                      bg-dark-800/80 backdrop-blur-xl
                      social-card-rainbow-border social-card-glow-effect
                      shadow-xl sm:shadow-2xl
                      ${hoveredCard === link.id ? 'scale-105 shadow-3xl' : ''}
                      transform-gpu touch-manipulation
                    `}>
                  {/* Special Badge */}
                  {link.specialBadge && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg"
                    >
                      <Star className="w-3 h-3 inline mr-1" />
                      {link.specialBadge}
                    </motion.div>
                  )}

                  {/* Enhanced Icon without background */}
                  <motion.div
                    className="mb-4 sm:mb-5 md:mb-6 flex items-center justify-center mx-auto"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={`
                          ${link.id === 'instagram'
                        ? 'text-pink-400'
                        : link.id === 'tiktok'
                          ? 'text-white'
                          : link.id === 'telegram'
                            ? 'text-sky-400'
                            : link.id === 'twitter'
                              ? 'text-white'
                              : 'text-white'
                      }
                        `}>
                      {link.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 font-playfair">{link.name}</h3>
                  {/* Preview Quote - Always Visible */}
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${'bg-gradient-to-r from-black/20 to-black/10 rainbow-border-subtle'
                    }`}>
                    <p className={`text-xs sm:text-sm italic leading-relaxed ${'text-neon-pink'}`}>"{link.preview}"</p>
                  </div>

                  {/* Arrow link button */}
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      rotate: 15
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                          absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                          rainbow-border-subtle
                          ${link.id === 'instagram'
                        ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
                        : link.id === 'tiktok'
                          ? 'bg-pink-500/20 text-white hover:bg-pink-500/30'
                          : link.id === 'telegram'
                            ? 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30'
                            : link.id === 'twitter'
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-pink-500/20 text-white hover:bg-pink-500/30'
                      }
                        `}
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Enhanced Glow Effect - Always visible with increased intensity on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-500 -z-10"
                  animate={{
                    opacity: hoveredCard === link.id ? 0.4 : 0.15,
                    scale: hoveredCard === link.id ? 1.05 : 1.02
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${link.id === 'instagram' ? '#E4405F, #F56040' :
                        link.id === 'tiktok' ? '#FF0050, #00F2EA' :
                          link.id === 'telegram' ? '#0088cc, #0088cc' :
                            link.id === 'twitter' ? '#000000, #1DA1F2' :
                              '#E91E63, #9C27B0'
                      })`
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default SocialHub
