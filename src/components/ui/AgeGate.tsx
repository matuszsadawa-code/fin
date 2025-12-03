import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, X } from 'lucide-react'

const AgeGate: React.FC = () => {
    const [isVerified, setIsVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user has already verified age
        const verified = localStorage.getItem('age_verified')
        if (verified === 'true') {
            setIsVerified(true)
        }
        setIsLoading(false)
    }, [])

    const handleVerify = () => {
        localStorage.setItem('age_verified', 'true')
        setIsVerified(true)
    }

    const handleExit = () => {
        window.location.href = 'https://www.google.com'
    }

    // Don't render anything while loading
    if (isLoading) {
        return null
    }

    // If verified, don't show gate
    if (isVerified) {
        return null
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black z-[200] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="bg-gradient-to-br from-gray-900 to-purple-900 p-8 sm:p-10 rounded-3xl max-w-md mx-4 text-center border border-purple-500/30 shadow-2xl"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    >
                        <ShieldAlert className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Weryfikacja Wieku
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                        Ta strona zawiera treści przeznaczone dla osób pełnoletnich.
                        <br />
                        Musisz mieć ukończone <span className="text-pink-400 font-semibold">18 lat</span>, aby kontynuować.
                    </p>

                    {/* Warning */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
                        <p className="text-yellow-300 text-sm">
                            ⚠️ Wchodząc na tę stronę potwierdzasz, że jesteś pełnoletni
                        </p>
                    </div>

                    {/* Verify Button */}
                    <motion.button
                        onClick={handleVerify}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg mb-4 shadow-lg hover:shadow-green-500/50 transition-all"
                    >
                        ✓ Mam 18+ lat - Wejdź
                    </motion.button>

                    {/* Exit Link */}
                    <button
                        onClick={handleExit}
                        className="text-gray-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <X className="w-4 h-4" />
                        Jestem poniżej 18 lat - Wyjdź
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default AgeGate
