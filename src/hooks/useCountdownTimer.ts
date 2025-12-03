import { useState, useEffect } from 'react'

interface TimeLeft {
    hours: number
    minutes: number
    seconds: number
}

export const useCountdownTimer = (initialHours: number = 4): TimeLeft => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        hours: initialHours,
        minutes: 37,
        seconds: 12
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                // Countdown logic
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                }

                if (prev.minutes > 0) {
                    return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
                }

                if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
                }

                // Reset to 24 hours when it hits 0
                return { hours: 23, minutes: 59, seconds: 59 }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return timeLeft
}
