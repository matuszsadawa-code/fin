import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Camera } from 'lucide-react'
import { useExitIntent } from '../../hooks/useExitIntent'
import { SOCIAL_LINKS } from '../../utils/constants'
import { trackEvent } from '../../utils/analytics'

const ExitIntentPopup: React.FC = () => {
    const { showPopup, setShowPopup } = useExitIntent()

    const handleClose = () => {
        setShowPopup(false)
        trackEvent('exit_intent_dismissed')
    }

    const handleClaim = () => {
        trackEvent('exit_intent_converted', { promo: 'TELEGRAM_SAMPLES' })
        setShowPopup(false)
    }

    // Track when popup is shown
    React.useEffect(() => {
        if (showPopup) {
            trackEvent('exit_intent_shown')
        }
    }, [showPopup])

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 sm:p-8 rounded-3xl max-w-md mx-4 text-center relative border border-blue-500/30 shadow-2xl shadow-blue-500/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                            aria-label="Zamknij"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Content */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            <Camera className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Czekaj! 😘
                        </h2>

                        <p className="text-lg sm:text-xl text-gray-200 mb-6">
                            Zanim uciekniesz... Zobacz <span className="text-blue-400 font-semibold">darmowe próbki</span>! 📸
                        </p>

                        {/* Offer Box */}
                        <div className="bg-black/30 p-6 rounded-2xl mb-6 border border-blue-500/20">
                            <motion.p
                                className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                DARMOWY DOSTĘP
                            </motion.p>
                            <p className="text-white text-lg mb-3">do prywatnego kanału</p>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-gray-400 text-lg">Ekskluzywne fotki</span>
                            </div>
                            <p className="text-blue-300 text-sm mt-2">Tylko teraz! 👇</p>
                        </div>

                        {/* CTA Button */}
                        <motion.a
                            href={SOCIAL_LINKS.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClaim}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="block w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg mb-3 shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Dołącz do Telegrama
                        </motion.a>

                        {/* Dismiss Link */}
                        <button
                            onClick={handleClose}
                            className="text-gray-400 text-sm hover:text-white transition-colors"
                        >
                            Nie, dziękuję
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ExitIntentPopup
