import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { SOCIAL_LINKS } from '../../utils/constants'
import profileImage from '../../assets/gallery/550356917_24256911460671885_5800828560684937416_n.jpg'

const FakeChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [messageStep, setMessageStep] = useState(0)

    // Sekwencja wiadomości
    useEffect(() => {
        // Pokaż widget po 5 sekundach
        const timer1 = setTimeout(() => {
            setIsVisible(true)
        }, 5000)

        // Otwórz czat automatycznie po 8 sekundach (jeśli user nie zamknął)
        const timer2 = setTimeout(() => {
            if (isVisible) {
                setIsOpen(true)
                // Dźwięk powiadomienia (opcjonalnie, ale zwiększa konwersję)
                // const audio = new Audio('/notification.mp3')
                // audio.play().catch(e => console.log('Audio autoplay blocked'))
            }
        }, 8000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [isVisible])

    // Symulacja pisania
    useEffect(() => {
        if (isOpen && messageStep < 2) {
            const timer = setTimeout(() => {
                setMessageStep(prev => prev + 1)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [isOpen, messageStep])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-pink-500/30 w-80 overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
                                        <img src={profileImage} alt="Maja" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Maja ❤️</h3>
                                    <p className="text-pink-100 text-xs">Pisze teraz...</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="p-4 h-64 bg-gray-50 dark:bg-gray-800 overflow-y-auto flex flex-col gap-3">
                            <div className="text-center text-xs text-gray-400 my-2">Dzisiaj, 22:43</div>

                            {/* Message 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="self-start bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[85%]"
                            >
                                <p className="text-sm text-gray-800 dark:text-gray-200">Hejka a jednak wpadłeś</p>
                            </motion.div>

                            {/* Message 2 */}
                            {messageStep >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="self-start bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[85%]"
                                >
                                    <p className="text-sm text-gray-800 dark:text-gray-200">Mam coś dla Ciebie na Telegramie haha</p>
                                </motion.div>
                            )}

                            {/* Message 3 (Image/Link) */}
                            {messageStep >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="self-start bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-2 shadow-sm max-w-[85%]"
                                >
                                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">Zerknij i powiedz co myślisz</p>
                                    <a
                                        href={SOCIAL_LINKS.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center text-sm font-bold py-2 rounded-lg transition-colors"
                                    >
                                        DOŁĄCZ
                                    </a>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area (Fake) */}
                        <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                            <input
                                type="text"
                                placeholder="Napisz wiadomość..."
                                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                disabled
                            />
                            <button className="bg-pink-600 p-2 rounded-full text-white">
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-gradient-to-r from-pink-600 to-purple-600 p-1 rounded-full shadow-lg shadow-pink-500/40 pointer-events-auto relative group"
                    >
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">1</span>
                        </div>
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                            <img src={profileImage} alt="Maja" className="w-full h-full object-cover" />
                        </div>
                        {/* Pulsing ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping opacity-75"></div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FakeChatWidget
