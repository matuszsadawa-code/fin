# Quick Start Guide - Telegram Mini App

## ✅ Co zostało zaimplementowane

### 1. **Strona Weryfikacji** (`/verify`)

- **Route:** `http://localhost:5173/verify`
- **Zawartość:** Cała sekcja VerificationSection z głównej strony
- **Funkcje:**
  - Zdjęcie weryfikacyjne
  - Wiadomość głosowa (autoplay przy scroll)
  - Potwierdzone informacje (wiek, lokalizacja, tożsamość, głos)
  - Trust score 100%
  - Animacje tła (serduszka + crypto icons)

### 2. **Strona VIP Access** (`/vip-access`)

- **Route:** `http://localhost:5173/vip-access?user_id=12345`
- **Zawartość:** Premium formularz zakupu subskrypcji VIP
- **Funkcje:**
  - Wybór pakietu (VIP vs Diamond)
  - Integracja z Telegram WebApp API
  - Stripe Checkout integration
  - Social proof (127 fanów)
  - FAQ section
  - Trust badges
  - Responsive design

---

## 🚀 Jak przetestować lokalnie

### 1. Uruchom dev server (już działa!)

```bash
npm run dev
```

### 2. Otwórz w przeglądarce

**Strona Weryfikacji:**

```
http://localhost:5173/verify
```

**Strona VIP Access:**

```
http://localhost:5173/vip-access?user_id=123456789
```

---

## 📋 Co musisz skonfigurować przed production

### 1. Stripe Setup

1. Zaloguj się do [Stripe Dashboard](https://dashboard.stripe.com)
2. Utwórz 2 produkty:
   - **VIP Access** - 100 PLN (jednorazowa płatność)
   - **Diamond VIP** - 250 PLN (jednorazowa płatność)
3. Skopiuj **Price IDs** z każdego produktu
4. Zastąp w pliku `src/components/pages/VIPAccessPage.tsx`:

```typescript
// Linia 65
stripePriceId: 'price_TWÓJ_PRAWDZIWY_VIP_PRICE_ID',

// Linia 85  
stripePriceId: 'price_TWÓJ_PRAWDZIWY_DIAMOND_PRICE_ID',
```

### 2. Backend Endpoint

1. Stwórz endpoint w swoim bocie Telegram: `/api/create-payment`
2. Zastąp URL w `src/components/pages/VIPAccessPage.tsx` (linia 8):

```typescript
const TELEGRAM_BOT_WEBHOOK = 'https://twoj-bot.com/api/create-payment';
```

3. Zaimplementuj endpoint zgodnie z dokumentacją w `TELEGRAM_MINI_APP_INTEGRATION.md`

### 3. Webhook Stripe

1. W Stripe Dashboard → Developers → Webhooks
2. Dodaj endpoint: `https://twoj-bot.com/webhook/stripe`
3. Subskrybuj event: `checkout.session.completed`
4. Skopiuj **Webhook Secret**
5. Użyj w kodzie backendu do weryfikacji

---

## 🔗 Integracja z Telegram Bot

### Przykład wysłania linku do Mini App

```python
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ContextTypes

async def show_verification(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Pokaż stronę weryfikacji"""
    keyboard = [
        [InlineKeyboardButton(
            "✅ Zobacz Weryfikację", 
            web_app=WebAppInfo(url="https://twoja-domena.com/verify")
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Sprawdź moją zweryfikowaną tożsamość! 💕",
        reply_markup=reply_markup
    )

async def show_vip_access(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Pokaż formularz VIP Access"""
    user_id = update.effective_user.id
    vip_url = f"https://twoja-domena.com/vip-access?user_id={user_id}"
    
    keyboard = [
        [InlineKeyboardButton(
            "💎 KUP DOSTĘP VIP", 
            web_app=WebAppInfo(url=vip_url)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Gotowy na ekskluzywne doświadczenie? 💋\n\nWybierz swój pakiet VIP:",
        reply_markup=reply_markup
    )
```

---

## 🎨 Design Features

Obie strony mają **identyczny design system** jak główny prelanding:

✅ Dark mode gradient background (`bg-neon-gradient`)  
✅ Floating hearts animations  
✅ Floating crypto icons  
✅ Rainbow border animations  
✅ Glassmorphism effects  
✅ Framer Motion animations  
✅ Fully responsive (mobile-first)  
✅ Premium, conversion-optimized UI  

---

## 📱 Testowanie na urządzeniach mobilnych

### Opcja 1: Ngrok (zalecane do testowania z Telegram)

```bash
# Zainstaluj ngrok
npm install -g ngrok

# Uruchom tunel
ngrok http 5173
```

Otrzymasz publiczny URL typu: `https://abc123.ngrok.io`

Użyj go w bocie Telegram do testowania Mini App.

### Opcja 2: LocalTunnel

```bash
npm install -g localtunnel
lt --port 5173
```

---

## 🏗️ Deploy do Production

### Build aplikacji

```bash
npm run build
```

Folder `dist` będzie gotowy do wdrożenia.

### Deploy na Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy na Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🐛 Troubleshooting

### Błąd: "Cannot find module..."

```bash
npm install
```

### Błąd przy buildzie

```bash
npm run build
# Sprawdź output - może brakować obrazków/audio
```

### Telegram WebApp nie działa

- Upewnij się, że przekazujesz `user_id` w URL
- Sprawdź console.log w przeglądarce (DevTools)
- Testuj tylko z prawdziwego Telegram (nie przez przeglądarkę bezpośrednio)

### Stripe nie działa

- Sprawdź czy Price IDs są poprawne
- Weryfikuj endpoint backendu bota
- Sprawdź logi backendu

---

## 📚 Więcej informacji

Pełna dokumentacja integracji znajduje się w:

- `TELEGRAM_MINI_APP_INTEGRATION.md`

---

**Status: ✅ GOTOWE DO TESTOWANIA**

Wszystkie komponenty zostały zaimplementowane. Teraz musisz tylko:

1. Skonfigurować Stripe
2. Zaimplementować backend
3. Wdrożyć na produkcję

**Powodzenia! 🚀💎**
