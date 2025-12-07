# Telegram Mini App - Integracja z VIP Access

## 📌 Przegląd

Dwie nowe podstrony dla Telegram Mini App:

1. **`/verify`** - Weryfikacja tożsamości Mai
2. **`/vip-access`** - Formularz zakupu dostępu VIP ze Stripe

---

## 🔗 Linki do podstron

### 1. Strona Weryfikacji
```
https://twoja-domena.com/verify
```

**Opis:** Wyświetla całą sekcję weryfikacji (zdjęcie weryfikacyjne + głosówka + informacje)

**Użycie w bocie:**
```python
# Przykład kodu dla bota Telegram
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

keyboard = [
    [InlineKeyboardButton("✅ Zobacz Weryfikację", web_app=WebAppInfo(url="https://twoja-domena.com/verify"))]
]
reply_markup = InlineKeyboardMarkup(keyboard)
await update.message.reply_text("Sprawdź moją zweryfikowaną tożsamość:", reply_markup=reply_markup)
```

---

### 2. Strona VIP Access  
```
https://twoja-domena.com/vip-access?user_id={telegram_user_id}
```

**Opis:** Formularz zakupu dostępu VIP z integracją Stripe

**⚠️ WAŻNE:** Zawsze przekazuj `user_id` użytkownika Telegram w parametrze URL!

**Użycie w bocie:**
```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

user_id = update.effective_user.id
vip_url = f"https://twoja-domena.com/vip-access?user_id={user_id}"

keyboard = [
    [InlineKeyboardButton("💎 KUP DOSTĘP VIP", web_app=WebAppInfo(url=vip_url))]
]
reply_markup = InlineKeyboardMarkup(keyboard)
await update.message.reply_text("Gotowy na ekskluzywne doświadczenie? 💋", reply_markup=reply_markup)
```

---

## 💳 Integracja Stripe

### Backend Endpoint (Bot Telegram)

Musisz stworzyć endpoint API w swoim bocie Telegram, który będzie obsługiwał tworzenie sesji płatności Stripe.

**Endpoint URL:**
```
https://your-telegram-bot.com/api/create-payment
```

**⚠️ ZASTĄP TEN URL W PLIKU:**
`src/components/pages/VIPAccessPage.tsx` - linia 8

```typescript
const TELEGRAM_BOT_WEBHOOK = 'https://your-telegram-bot.com/api/create-payment';
```

---

### Stripe Setup

#### 1. Utwórz produkty w Stripe Dashboard

Zaloguj się do [Stripe Dashboard](https://dashboard.stripe.com/products)

**Produkty do utworzenia:**

| Nazwa Produktu | Cena | Price ID (do zastąpienia) |
|----------------|------|---------------------------|
| VIP Access     | 100 PLN | `price_VIP_100_PLN` |
| Diamond VIP    | 250 PLN | `price_DIAMOND_250_PLN` |

#### 2. Zastąp Price IDs w kodzie

W pliku `src/components/pages/VIPAccessPage.tsx` (linie 65 i 85):

```typescript
stripePriceId: 'price_TWÓJ_PRAWDZIWY_STRIPE_PRICE_ID',
```

---

### Backend Implementation (Python + Flask)

```python
from flask import Flask, request, jsonify
import stripe
import os

app = Flask(__name__)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route('/api/create-payment', methods=['POST'])
def create_payment():
    try:
        data = request.json
        telegram_user_id = data.get('telegram_user_id')
        price_id = data.get('price_id')
        tier_name = data.get('tier_name')
        amount = data.get('amount')
        
        # Weryfikacja danych
        if not telegram_user_id or not price_id:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Stwórz Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card', 'blik'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='payment',  # Jednorazowa płatność
            success_url=f'https://twoja-domena.com/payment-success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url='https://twoja-domena.com/payment-cancel',
            client_reference_id=str(telegram_user_id),  # Przechowaj user_id do późniejszej weryfikacji
            metadata={
                'telegram_user_id': telegram_user_id,
                'tier': tier_name,
                'amount': amount
            }
        )
        
        return jsonify({
            'checkout_url': session.url,
            'session_id': session.id
        }), 200
        
    except Exception as e:
        print(f"Error creating payment: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

---

### Webhook dla potwierdzenia płatności

Po udanej płatności Stripe wysyła webhook. Musisz go obsłużyć, aby automatycznie dodać użytkownika do kanału VIP.

```python
from flask import Flask, request
import stripe
import os

app = Flask(__name__)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@app.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        return jsonify({'error': 'Invalid signature'}), 400
    
    # Obsłuż udaną płatność
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        telegram_user_id = session['metadata']['telegram_user_id']
        tier = session['metadata']['tier']
        
        # TUTAJ: Dodaj użytkownika do kanału VIP Telegram
        add_user_to_vip_channel(telegram_user_id, tier)
        
        # Wyślij wiadomość powitania
        send_welcome_message(telegram_user_id, tier)
    
    return jsonify({'status': 'success'}), 200

def add_user_to_vip_channel(user_id, tier):
    """Dodaj użytkownika do prywatnego kanału Telegram"""
    from telegram import Bot
    
    bot = Bot(token=os.getenv("TELEGRAM_BOT_TOKEN"))
    
    if tier == "VIP Access":
        channel_id = "@your_vip_channel"  # ZASTĄP SWOIM KANAŁEM
    elif tier == "Diamond VIP":
        channel_id = "@your_diamond_channel"  # ZASTĄP SWOIM KANAŁEM
    
    try:
        # Utwórz link zaproszenia lub dodaj bezpośrednio
        invite_link = bot.export_chat_invite_link(chat_id=channel_id)
        
        # Wyślij link użytkownikowi
        bot.send_message(
            chat_id=user_id,
            text=f"🎉 Witaj w VIP! Oto Twój link dostępu:\n\n{invite_link}"
        )
    except Exception as e:
        print(f"Error adding user to channel: {e}")

def send_welcome_message(user_id, tier):
    """Wyślij wiadomość powitalną"""
    from telegram import Bot
    
    bot = Bot(token=os.getenv("TELEGRAM_BOT_TOKEN"))
    
    message = f"""
🔥 WITAJ W KLUBIE VIP! 🔥

Dziękuję za dołączenie do {tier}! 💋

✨ Twoje korzyści:
{'✅ Nielimitowane treści +18' if 'VIP' in tier else ''}
{'✅ Prywatne DM ze mną' if 'VIP' in tier else ''}
{'✅ Live Video Sexting' if 'VIP' in tier else ''}
{'💎 WSZYSTKIE korzyści VIP + Priorytet' if 'Diamond' in tier else ''}

Zapraszam do eksploracji! 😘

- Maja 💕
    """
    
    bot.send_message(chat_id=user_id, text=message)
```

---

## 🚀 Deploy & Hosting

### 1. Zbuduj aplikację

```bash
cd "c:\Users\matsa\Desktop\GOTOWE PROJEKTY\Prelanding Maja"
npm run build
```

### 2. Wdróż na Vercel/Netlify

Folder `dist` będzie zawierał gotowe pliki do wdrożenia.

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🧪 Testowanie

### Test strony /verify
```
http://localhost:5173/verify
```

### Test strony /vip-access
```
http://localhost:5173/vip-access?user_id=123456789
```

---

## ⚙️ Konfiguracja Telegram Mini App

W [BotFather](https://t.me/BotFather):

1. `/mybots`
2. Wybierz swojego bota
3. `Bot Settings` → `Menu Button`
4. Ustaw URL: `https://twoja-domena.com/vip-access`

---

## 📝 Checklist Implementacji

- [ ] Utwórz produkty w Stripe Dashboard
- [ ] Skopiuj Stripe Price IDs do VIPAccessPage.tsx
- [ ] Zaktualizuj TELEGRAM_BOT_WEBHOOK URL
- [ ] Zaimplementuj backend endpoint `/api/create-payment`
- [ ] Skonfiguruj Stripe Webhook dla `checkout.session.completed`
- [ ] Zbuduj i wdróż aplikację React
- [ ] Przetestuj flow płatności end-to-end
- [ ] Skonfiguruj automatyczne dodawanie do kanału VIP
- [ ] Ustaw Menu Button w Telegram Bot

---

## 🛡️ Bezpieczeństwo

1. **Zawsze weryfikuj webhook signature od Stripe**
2. **Nie przechowuj API keys w kodzie - używaj zmiennych środowiskowych**
3. **Implementuj rate limiting na endpoint `/api/create-payment`**
4. **Loguj wszystkie transakcje do bazy danych**

---

## 📞 Support

W razie problemów z integracją, sprawdź:
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Telegram Bot API - WebApp](https://core.telegram.org/bots/webapps)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)

---

**Powodzenia! 🚀💎**
