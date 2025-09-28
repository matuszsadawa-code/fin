# 💅 Visual Guidelines - Kobiecy Design System

> Nowoczesny, elegancki i kobiecy design system dla prelandingu premium content

## 🎨 Paleta Kolorów

### Brand Colors (Primary)
```css
/* Różowe tony - główne kolory marki */
--brand-50:  #FFF1F6   /* Delikatny blush */
--brand-100: #FFE4ED   /* Światły róż */
--brand-200: #FFC9DC   /* Miękki róż */
--brand-300: #FF9DC1   /* Jasny róż */
--brand-400: #FF71B8   /* Podstawowy róż */
--brand-500: #FF4FD8   /* Fuksja - główny */
--brand-600: #E03BBE   /* Intensywna fuksja */
--brand-700: #BA2D9C   /* Głęboka fuksja */
--brand-800: #8E2377   /* Ciemna fuksja */
--brand-900: #5A164B   /* Najciemniejsza fuksja */
```

### Lavender (Secondary)
```css
/* Lawenda - kolory uzupełniające */
--lavender-50:  #F8F4FF
--lavender-400: #C9B6FF  /* Główna lawenda */
--lavender-500: #B794F6
--lavender-600: #9F7AEA
```

### Blush (Accent)
```css
/* Rumieniec - akcenty i podświetlenia */
--blush-300: #FFC7D9
--blush-400: #FFB3CC
--blush-500: #FF9FBF
```

### Dark Theme
```css
/* Ciemne tło - eleganckie i głębokie */
--dark-900: #0D0A10   /* Najciemniejsze tło */
--dark-800: #1A1220   /* Sekundarne tło */
--dark-700: #2A2030   /* Karty i sekcje */
--dark-600: #3A2F40   /* Borders */
--dark-500: #4A3F50   /* Disabled states */
```

## ✨ Glassmorphism Effects

### Core Glass
```css
.glass {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.22) inset, 
              0 10px 30px rgba(255, 79, 216, 0.22);
  backdrop-filter: blur(18px) saturate(140%);
}
```

### Glass Variants
- `.glass-pink` - Różowe szkło z subtelnym tłem brand color
- `.glass-lavender` - Lawendowe szkło
- `.glass-blush` - Delikatne rumiane szkło
- `.glass--hover` - Efekt hover z liftingiem

### Aurora Backgrounds
```css
.bg-aurora-soft {
  background: 
    radial-gradient(800px circle at 25% 15%, rgba(255, 113, 184, 0.2), transparent 50%),
    radial-gradient(600px circle at 75% 20%, rgba(201, 182, 255, 0.15), transparent 50%),
    radial-gradient(400px circle at 50% 80%, rgba(255, 199, 217, 0.1), transparent 50%);
}
```

## 📝 Typografia

### Font Stack
```css
/* Sans-serif (główny) */
font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;

/* Display (nagłówki) */
font-family: 'Fraunces', 'Playfair Display', serif;

/* Fallback (kompatybilność) */
font-family: 'Urbanist', sans-serif;
```

### Hierarchia Typograficzna
```css
/* Hero Heading */
.text-6xl     /* 60px - główne nagłówki hero */
.text-5xl     /* 48px - duże nagłówki sekcji */
.text-4xl     /* 36px - nagłówki sekcji */

/* Body Text */
.text-xl      /* 20px - lead text */
.text-lg      /* 18px - główny tekst */
.text-base    /* 16px - standardowy tekst */
.text-sm      /* 14px - mały tekst */
.text-xs      /* 12px - podpisy, metadane */
```

### Gradient Text
```css
.text-gradient {
  background: linear-gradient(90deg, #FF9DC1, #FF4FD8 45%, #C9B6FF 90%);
  -webkit-background-clip: text;
  color: transparent;
}
```

## 🎭 Animacje & Transitions

### Timing Functions
```css
/* Smooth & Natural */
cubic-bezier(0.4, 0, 0.2, 1)         /* smooth */
cubic-bezier(0.68, -0.55, 0.265, 1.55) /* bounce-in */
cubic-bezier(0.2, 0.8, 0.2, 1)      /* reveal-up */
```

### Kluczowe Animacje
```css
/* Floating Elements */
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50%      { transform: translateY(-8px) }
}

/* Blob Morphing */
@keyframes blob {
  0%, 100% { transform: translate(0,0) scale(1) }
  25%      { transform: translate(10px,-10px) scale(1.02) }
  50%      { transform: translate(-5px,5px) scale(1.05) }
  75%      { transform: translate(-10px,-5px) scale(1.02) }
}

/* Reveal on Scroll */
@keyframes reveal-up {
  0%   { opacity: 0; transform: translateY(12px) }
  100% { opacity: 1; transform: translateY(0) }
}
```

## 🔄 Mikrointerakcje

### Hover States
```css
/* Button Hover */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Glass Hover */
.glass--hover:hover {
  transform: translateY(-2px);
  box-shadow: enhanced;
}

/* Magnetic Effect */
.btn-magnetic {
  transition: transform 0.2s ease-out;
}
```

### Focus States
```css
.focus-visible\:outline-brand-400:focus-visible {
  outline: 2px solid #FF71B8;
  outline-offset: 2px;
}
```

## 📐 Layout & Spacing

### Container System
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

/* Responsive padding */
@media (min-width: 640px) { padding: 2rem; }
@media (min-width: 1024px) { padding: 4rem; }
```

### Border Radius
```css
.rounded-xl   /* 12px - karty */
.rounded-2xl  /* 20px - większe sekcje */
.rounded-3xl  /* 28px - hero elements */
```

### Shadows
```css
.shadow-glass       /* Glassmorphism shadow */
.shadow-glass-hover /* Enhanced hover shadow */
.shadow-dreamy     /* Soft dreamy shadow */
.shadow-glow-pink  /* Pink glow effect */
```

## ♿ Accessibility

### Kontrasty
- Tekst podstawowy: minimum 4.5:1
- Duży tekst (18px+): minimum 3:1
- Focus indicators: wyraźne outline w kolorze brand

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Readers
- Poprawne hierarchy headings (h1 → h6)
- aria-label dla ikon i elementów interaktywnych
- Meaningful alt text dla images

## 🌈 Użycie Kolorów

### Do's ✅
- Używaj `brand-500` (#FF4FD8) jako główny kolor CTA
- `lavender-400` (#C9B6FF) jako kolor uzupełniający
- `blush-300` (#FFC7D9) do subtelnych akcentów
- Gradienty dla elementów premium/hero
- Glass effects dla kart i overlay

### Don'ts ❌
- Nie mieszaj więcej niż 3 kolorów w jednym elemencie
- Nie używaj pure black (#000) - zawsze dark-900
- Nie używaj mocnych saturacji dla dużych powierzchni
- Nie pomijaj fallbacków dla glassmorphism

## 📱 Responsive Behavior

### Breakpoints
```css
sm:   640px   /* Mobile landscape */
md:   768px   /* Tablet portrait */
lg:   1024px  /* Tablet landscape */
xl:   1280px  /* Desktop */
2xl:  1536px  /* Large desktop */
```

### Mobile Considerations
- Zmniejsz intensywność blur effects
- Zwiększ tap targets (minimum 44px)
- Uprość animacje
- Użyj sticky CTA na mobile

## 🎯 Component Examples

### Hero Button
```html
<button class="rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 px-8 py-4 font-semibold text-white shadow-glass hover:scale-[1.02] hover:shadow-glass-hover transition-all duration-300 btn-magnetic">
  Dołącz teraz
</button>
```

### Glass Card
```html
<div class="glass glass--hover rounded-2xl p-6 backdrop-blur-sm">
  <h3 class="text-gradient text-xl font-semibold mb-3">Tytuł karty</h3>
  <p class="text-white/80">Zawartość karty...</p>
</div>
```

### Aurora Section
```html
<section class="bg-aurora-soft bg-grain relative overflow-hidden py-20">
  <!-- Animated blobs -->
  <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl animate-blob"></div>
  <div class="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-lavender-400/20 blur-3xl animate-blob-delayed"></div>
  
  <!-- Content -->
  <div class="container relative z-10">
    <!-- Sekcja content -->
  </div>
</section>
```

---

## 🚀 Implementation Notes

1. **Performance**: Używaj `will-change: transform` dla animowanych elementów
2. **Accessibility**: Testuj z screenreader (NVDA/VoiceOver)
3. **Cross-browser**: Zawsze dodawaj fallbacki dla backdrop-filter
4. **Mobile**: Testuj na rzeczywistych urządzeniach, nie tylko devtools

Ostatnia aktualizacja: 28.09.2025  
Wersja: 1.0.0 - Kobiecy Design System