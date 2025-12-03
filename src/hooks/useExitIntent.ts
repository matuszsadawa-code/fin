import { useEffect, useState } from 'react'

interface UseExitIntentReturn {
    showPopup: boolean
    setShowPopup: (show: boolean) => void
}

export const useExitIntent = (): UseExitIntentReturn => {
    const [showPopup, setShowPopup] = useState(false)
    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        // Check if popup was already shown in this session
        const alreadyShown = sessionStorage.getItem('exit_intent_shown')
        if (alreadyShown === 'true') {
            setHasShown(true)
            return
        }

        // Better mobile detection based on screen width
        const isMobile = window.innerWidth < 768

        // Desktop only - not useful on mobile
        if (isMobile) {
            return
        }

        let mouseLeaveTimeout: number | null = null

        const handleMouseLeave = (e: MouseEvent) => {
            // Clear any existing timeout
            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout)
            }

            // Trigger when mouse leaves from top (Y <= 5 for better detection)
            // and hasn't shown yet
            if (e.clientY <= 5 && !showPopup && !hasShown) {
                // Small delay to prevent accidental triggers
                mouseLeaveTimeout = setTimeout(() => {
                    setShowPopup(true)
                    setHasShown(true)
                    sessionStorage.setItem('exit_intent_shown', 'true')
                }, 100)
            }
        }

        // Also add a fallback - show after 45 seconds if user hasn't seen it
        const fallbackTimer = setTimeout(() => {
            if (!hasShown && !showPopup) {
                setShowPopup(true)
                setHasShown(true)
                sessionStorage.setItem('exit_intent_shown', 'true')
            }
        }, 45000) // 45 seconds

        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave)
            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout)
            }
            clearTimeout(fallbackTimer)
        }
    }, [showPopup, hasShown])

    return { showPopup, setShowPopup }
}
