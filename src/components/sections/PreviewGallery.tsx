import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Lock, Play, Image, Video } from 'lucide-react'

// Import gallery images
import img1 from '../../assets/gallery/ig_00008_.png'
import img2 from '../../assets/gallery/ig_00019_.png'
import img3 from '../../assets/gallery/ig_00028_.png'
import img4 from '../../assets/gallery/ig_00049_.png'
import img5 from '../../assets/gallery/ig_00051_.png'
import img6 from '../../assets/gallery/ig_00057_.png'
import img7 from '../../assets/gallery/ig_00093_.png'
import img8 from '../../assets/gallery/ig_00098_.png'
import img9 from '../../assets/gallery/ig_00120_.png'
import img10 from '../../assets/gallery/ig_00148_.png'

interface GalleryItem {
  id: string
  type: 'image' | 'video'
  category: 'nsfw' | 'lifestyle' | 'reels'
  title: string
  preview: string
  isBlurred: boolean
  imageUrl?: string
  thumbnailUrl?: string
}

const PreviewGallery: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      type: 'image',
      category: 'lifestyle',
      title: 'Słodkie chwile',
      preview: 'Naturalne piękno',
      isBlurred: false,
      imageUrl: img1,
      thumbnailUrl: img1,
    },
    {
      id: '2',
      type: 'image',
      category: 'nsfw',
      title: 'Intymne spojrzenie',
      preview: 'Tylko dla subskrybentów',
      isBlurred: true,
      imageUrl: img2,
      thumbnailUrl: img2,
    },
    {
      id: '3',
      type: 'image',
      category: 'lifestyle',
      title: 'Spontaniczny moment',
      preview: 'Prawdziwa ja',
      isBlurred: false,
      imageUrl: img3,
      thumbnailUrl: img3,
    },
    {
      id: '4',
      type: 'image',
      category: 'nsfw',
      title: 'Zmysłowe kadry',
      preview: 'Ekskluzywna zawartość',
      isBlurred: true,
      imageUrl: img4,
      thumbnailUrl: img4,
    },
    {
      id: '5',
      type: 'image',
      category: 'lifestyle',
      title: 'Codzienne życie',
      preview: 'Za kulisami',
      isBlurred: false,
      imageUrl: img5,
      thumbnailUrl: img5,
    },
    {
      id: '6',
      type: 'image',
      category: 'nsfw',
      title: 'Prywatne chwile',
      preview: 'Tylko dla VIP',
      isBlurred: true,
      imageUrl: img6,
      thumbnailUrl: img6,
    },
    {
      id: '7',
      type: 'image',
      category: 'lifestyle',
      title: 'Naturalne ujęcia',
      preview: 'Bez retuszu',
      isBlurred: false,
      imageUrl: img7,
      thumbnailUrl: img7,
    },
    {
      id: '8',
      type: 'image',
      category: 'nsfw',
      title: 'Gorące kadry',
      preview: 'Treść dla dorosłych',
      isBlurred: true,
      imageUrl: img8,
      thumbnailUrl: img8,
    },
    {
      id: '9',
      type: 'image',
      category: 'lifestyle',
      title: 'Szczere momenty',
      preview: 'Autentyczne zdjęcia',
      isBlurred: false,
      imageUrl: img9,
      thumbnailUrl: img9,
    },
    {
      id: '10',
      type: 'image',
      category: 'nsfw',
      title: 'Ekskluzywne treści',
      preview: 'Premium content',
      isBlurred: true,
      imageUrl: img10,
      thumbnailUrl: img10,
    },
  ]

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || isPaused) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth
    const singleSetWidth = scrollWidth / 3 // Since we have 3 copies of items

    if (singleSetWidth <= clientWidth) return

    let scrollPosition = scrollContainer.scrollLeft || 0
    const scrollSpeed = 0.5 // pixels per frame
    let animationId: number

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed

        // Reset to beginning when reaching end of first set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0
        }

        scrollContainer.scrollLeft = scrollPosition
        animationId = requestAnimationFrame(autoScroll)
      }
    }

    animationId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  const handleItemClick = (item: GalleryItem) => {
    if (item.isBlurred) {
      // Show unlock modal/redirect to payment
      alert('To tylko zajawka. Pokażę Ci więcej za zamkniętymi drzwiami.')
    }
  }

  return (
    <section id="preview-gallery" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects - subtle aurora */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-dark-800/20 to-dark-900/30"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Moja <span className="text-gradient">Galeria</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Zajrzyj do mojego świata pełnego autentycznych momentów i ekskluzywnych treści
          </motion.p>
        </div>

        {/* Gallery Horizontal Scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Duplicate items for seamless infinite scroll */}
            {[...galleryItems, ...galleryItems, ...galleryItems].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                className="relative group cursor-pointer flex-shrink-0"
              >
                {/* Image/Video Container - glass design */}
                <div className="relative w-64 aspect-[4/5] rounded-2xl overflow-hidden glass">
                  {/* Actual Image */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Fallback Content if no image */}
                  {!item.imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {item.type === 'video' ? (
                          <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        ) : (
                          <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        )}
                        <p className="text-gray-400 text-sm">{item.title}</p>
                      </div>
                    </div>
                  )}

                {/* Blur Overlay for NSFW - glass design */}
                {item.isBlurred && (
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/30 flex items-center justify-center glass-pink">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-brand-400 mx-auto mb-4 drop-shadow-lg" />
                      <p className="text-white font-semibold mb-2">Treść dla dorosłych</p>
                      <p className="text-white/80 text-sm">Kliknij aby odblokować</p>
                    </div>
                  </div>
                )}

                {/* Play Button for Videos - glass design */}
                {item.type === 'video' && !item.isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-pink w-16 h-16 rounded-full flex items-center justify-center shadow-glow-pink">
                      <Play className="w-8 h-8 text-white ml-1 drop-shadow-lg" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                  transition-opacity duration-300
                  ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.preview}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className={`
                  absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                  ${item.category === 'nsfw' 
                    ? 'bg-red-500/80 text-white' 
                    : item.category === 'lifestyle'
                      ? 'bg-blue-500/80 text-white'
                      : 'bg-purple-500/80 text-white'
                  }
                `}>
                  {item.category.toUpperCase()}
                </div>

                {/* Glow Effect - nowe kolory */}
                <div className={`
                  absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-300 -z-10
                  ${hoveredItem === item.id ? 'opacity-40' : 'opacity-0'}
                  ${item.isBlurred 
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500' 
                    : 'bg-gradient-to-r from-brand-500 to-lavender-400'
                  }
                `}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

export default PreviewGallery
