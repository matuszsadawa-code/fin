export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { 
      center: true, 
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', '"Playfair Display"', 'serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        // Nowa kobiecy system kolorów
        brand: {
          50: '#FFF1F6',
          100: '#FFE4ED',
          200: '#FFC9DC',
          300: '#FF9DC1',
          400: '#FF71B8',
          500: '#FF4FD8',
          600: '#E03BBE',
          700: '#BA2D9C',
          800: '#8E2377',
          900: '#5A164B',
        },
        lavender: {
          50: '#F8F4FF',
          100: '#F1E9FF',
          200: '#E5D3FF',
          300: '#D1B3FF',
          400: '#C9B6FF',
          500: '#B794F6',
          600: '#9F7AEA',
          700: '#8B5CF6',
          800: '#7C3AED',
          900: '#6D28D9',
        },
        blush: {
          50: '#FFF7FB',
          100: '#FFECF5',
          200: '#FFD9EA',
          300: '#FFC7D9',
          400: '#FFB3CC',
          500: '#FF9FBF',
          600: '#FF8BB3',
          700: '#FF77A6',
          800: '#FF6399',
          900: '#FF4F8C',
        },
        // Zachowanie kompatybilności z obecnymi kolorami
        primary: {
          50: '#FFF1F6',
          100: '#FFE4ED',
          200: '#FFC9DC',
          300: '#FF9DC1',
          400: '#FF71B8',
          500: '#FF4FD8',
          600: '#E03BBE',
          700: '#BA2D9C',
          800: '#8E2377',
          900: '#5A164B',
        },
        neon: {
          pink: '#FF4FD8',
          purple: '#C9B6FF',
          blue: '#06b6d4',
        },
        dark: {
          900: '#0D0A10',
          800: '#1A1220',
          700: '#2A2030',
          600: '#3A2F40',
          500: '#4A3F50',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(135deg, #0D0A10 0%, #1A1220 25%, #2A2030 50%, #1A1220 75%, #0D0A10 100%)',
        'aurora': 'radial-gradient(1200px circle at 20% 10%, rgba(255,113,184,.35), transparent 60%), radial-gradient(1000px circle at 80% 30%, rgba(201,182,255,.30), transparent 60%), linear-gradient(180deg, #0D0A10 0%, #1A1220 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.05) 100%)',
      },
      boxShadow: {
        'glass': '0 1px 0 rgba(255,255,255,.25) inset, 0 10px 30px -10px rgba(255,79,216,.45)',
        'glass-hover': '0 1px 0 rgba(255,255,255,.35) inset, 0 18px 40px rgba(255,79,216,.6)',
        'glow-pink': '0 0 20px rgba(255,79,216,.4)',
        'glow-purple': '0 0 20px rgba(201,182,255,.4)',
        'soft': '0 2px 10px rgba(0,0,0,.1)',
        'dreamy': '0 8px 32px rgba(255,79,216,.2)',
      },
      backdropBlur: {
        xs: '6px',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'blob': 'blob 18s ease-in-out infinite',
        'blob-delayed': 'blob 18s ease-in-out infinite 9s',
        'reveal-up': 'reveal-up 0.7s cubic-bezier(.2,.8,.2,1) both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 5px #FF4FD8, 0 0 10px #FF4FD8, 0 0 15px #FF4FD8',
          },
          '100%': {
            boxShadow: '0 0 10px #FF4FD8, 0 0 20px #FF4FD8, 0 0 30px #FF4FD8',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '25%': { transform: 'translate(10px,-10px) scale(1.02)' },
          '50%': { transform: 'translate(-5px,5px) scale(1.05)' },
          '75%': { transform: 'translate(-10px,-5px) scale(1.02)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
}
