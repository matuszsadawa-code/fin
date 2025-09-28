/**
 * Reveal Animations & Mikrointerakcje
 * Nowoczesny system animacji dla kobiecego design systemu
 */

// Intersection Observer dla reveal-on-scroll
export const initRevealAnimations = (): void => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal-up')
          entry.target.classList.remove('opacity-0', 'translate-y-3')
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  // Obserwuj wszystkie elementy z data-reveal
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.classList.add('opacity-0', 'translate-y-3')
    revealObserver.observe(element)
  })
}

// Magnetic button effect
export const initMagneticButtons = (): void => {
  const magneticButtons = document.querySelectorAll('.btn-magnetic')

  magneticButtons.forEach((button) => {
    const element = button as HTMLElement

    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.2s ease-out'
    })

    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * 0.08
      const deltaY = (e.clientY - centerY) * 0.08

      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`
    })

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0) scale(1)'
      element.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    })
  })
}

// Glass hover effects enhancement
export const initGlassEffects = (): void => {
  const glassElements = document.querySelectorAll('.glass--hover')

  glassElements.forEach((element) => {
    const el = element as HTMLElement

    el.addEventListener('mouseenter', () => {
      el.style.willChange = 'transform, box-shadow'
    })

    el.addEventListener('mouseleave', () => {
      el.style.willChange = 'auto'
    })
  })
}

// Parallax effect dla floating elements
export const initParallaxEffects = (): void => {
  let ticking = false

  const updateParallax = () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('[data-parallax]')

    parallaxElements.forEach((element) => {
      const el = element as HTMLElement
      const speed = parseFloat(el.dataset.parallax || '0.5')
      const yPos = -(scrolled * speed)
      el.style.transform = `translateY(${yPos}px)`
    })

    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  // Throttled scroll listener
  window.addEventListener('scroll', requestTick, { passive: true })
}

// Smooth scroll dla anchor links
export const initSmoothScroll = (): void => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const href = link.getAttribute('href')
      if (!href) return

      const target = document.querySelector(href)
      if (!target) return

      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    })
  })
}

// Aurora blob animation enhancement
export const initAuroraBlobs = (): void => {
  const blobs = document.querySelectorAll('.animate-blob, .animate-blob-delayed')

  // Dodaj random delay i intensity dla bardziej naturalnych animacji
  blobs.forEach((blob, index) => {
    const el = blob as HTMLElement
    const randomDelay = Math.random() * 2
    const randomDuration = 18 + Math.random() * 6

    el.style.animationDelay = `${randomDelay}s`
    el.style.animationDuration = `${randomDuration}s`

    // Dodaj subtle mouse interaction
    el.addEventListener('mouseenter', () => {
      el.style.animationPlayState = 'paused'
      el.style.transform = 'scale(1.1)'
      el.style.transition = 'transform 0.6s ease-out'
    })

    el.addEventListener('mouseleave', () => {
      el.style.animationPlayState = 'running'
      el.style.transform = 'scale(1)'
    })
  })
}

// Text gradient shimmer effect
export const initTextShimmers = (): void => {
  const textGradients = document.querySelectorAll('.text-gradient')

  textGradients.forEach((element) => {
    const el = element as HTMLElement

    el.addEventListener('mouseenter', () => {
      el.classList.add('animate-shimmer')
      el.style.backgroundSize = '200% 100%'
    })

    el.addEventListener('mouseleave', () => {
      el.classList.remove('animate-shimmer')
    })
  })
}

// Performance optimized scroll listener
export const initOptimizedScrollEffects = (): void => {
  let scrollTimeout: NodeJS.Timeout

  const handleScroll = () => {
    document.body.classList.add('is-scrolling')

    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('is-scrolling')
    }, 150)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
}

// Reduced motion check
export const respectsReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Main initialization function
export const initAllAnimations = (): void => {
  // Sprawdź preferencje animacji
  if (respectsReducedMotion()) {
    document.body.classList.add('reduce-motion')
    return
  }

  // Initialize all animation systems
  initRevealAnimations()
  initMagneticButtons()
  initGlassEffects()
  initParallaxEffects()
  initSmoothScroll()
  initAuroraBlobs()
  initTextShimmers()
  initOptimizedScrollEffects()

  console.log('✨ Feminine design system animations initialized')
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations)
  } else {
    initAllAnimations()
  }
}

// CSS utility classes dla reveal animations
export const revealClasses = {
  base: 'transition-all duration-700 ease-out',
  hidden: 'opacity-0 translate-y-3',
  visible: 'opacity-100 translate-y-0',
}

// Export dla użycia w komponentach React
export const addRevealAnimation = (element: HTMLElement, delay = 0): void => {
  element.setAttribute('data-reveal', '')
  element.style.transitionDelay = `${delay}ms`
}