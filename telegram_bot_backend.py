"""
Telegram Bot Backend - Integracja z Stripe dla VIP Access
==========================================================

Ten plik zawiera przykładową implementację backendu dla bota Telegram
z integracją płatności Stripe dla dostępu VIP.

Wymagania:
- python-telegram-bot >= 20.0
- stripe
- flask
- python-dotenv

Instalacja:
pip install python-telegram-bot stripe flask python-dotenv
"""

import os
import logging
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Load environment variables
load_dotenv()

# Configuration
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
WEBAPP_BASE_URL = os.getenv("WEBAPP_BASE_URL", "https://your-domain.com")
VIP_CHANNEL_ID = os.getenv("VIP_CHANNEL_ID", "@your_vip_channel")
DIAMOND_CHANNEL_ID = os.getenv("DIAMOND_CHANNEL_ID", "@your_diamond_channel")

# Setup
stripe.api_key = STRIPE_SECRET_KEY
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask app for webhooks
app = Flask(__name__)
CORS(app) # Enable CORS for all routes
bot = Bot(token=TELEGRAM_BOT_TOKEN)


# ============================================================================
# TELEGRAM BOT COMMANDS
# ============================================================================

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler dla komendy /start"""
    user = update.effective_user
    
    welcome_text = f"""
👋 Cześć {user.first_name}!

Witaj w ekskluzywnym świecie Mai Lubicz 💕

🌟 Co mogę dla Ciebie zrobić?

/verify - Zobacz moją zweryfikowaną tożsamość ✅
/vip - Poznaj pakiety VIP i uzyskaj dostęp 💎
/help - Pomoc i FAQ
    """
    
    await update.message.reply_text(welcome_text)


async def verify_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Pokaż stronę weryfikacji"""
    keyboard = [
        [InlineKeyboardButton(
            "✅ Zobacz Weryfikację", 
            web_app=WebAppInfo(url=f"{WEBAPP_BASE_URL}/verify")
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "🔒 Sprawdź moją zweryfikowaną tożsamość!\n\n"
        "✅ Dowód tożsamości\n"
        "✅ Wiek potwierdzony (25 lat)\n"
        "✅ Lokalizacja (Warszawa)\n"
        "✅ Wiadomość głosowa\n\n"
        "Kliknij poniżej, aby zobaczyć szczegóły 👇",
        reply_markup=reply_markup
    )


async def vip_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Pokaż formularz VIP Access"""
    user_id = update.effective_user.id
    vip_url = f"{WEBAPP_BASE_URL}/vip-access?user_id={user_id}"
    
    keyboard = [
        [InlineKeyboardButton(
            "💎 KUP DOSTĘP VIP", 
            web_app=WebAppInfo(url=vip_url)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message_text = """
🔥 EKSKLUZYWNY DOSTĘP VIP 🔥

Wybierz swój pakiet:

💋 **VIP Access** - 100 zł
   • Nielimitowane treści +18
   • Prywatne DM ze mną
   • Live Video Sexting
   • Custom Content
   • GFE Experience
   • 🎁 Darmowy Crypto E-book

💎 **Diamond VIP** - 250 zł
   • Wszystko z VIP Access
   • Priorytetowe odpowiedzi
   • Ekskluzywne live streamy
   • Mój prywatny WhatsApp
   • Możliwość spotkań IRL (Warszawa)
   • 🎁 Darmowy Crypto E-book

Kliknij poniżej, aby wybrać pakiet 👇
    """
    
    await update.message.reply_text(
        message_text,
        reply_markup=reply_markup,
        parse_mode='Markdown'
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler dla komendy /help"""
    help_text = """
📚 POMOC - MAJA VIP BOT

**Dostępne komendy:**
/start - Rozpocznij rozmowę
/verify - Zobacz weryfikację tożsamości
/vip - Kup dostęp VIP
/help - Ta wiadomość

**FAQ:**

❓ Czy płatność jest bezpieczna?
✅ Tak! Używamy Stripe - światowego lidera płatności.

❓ Kiedy otrzymam dostęp?
✅ Natychmiast po potwierdzeniu płatności.

❓ Co dokładnie otrzymam?
✅ Dostęp do prywatnego kanału z ekskluzywnymi treściami.

**Potrzebujesz pomocy?**
Napisz prywatną wiadomość do @maja_support
    """
    
    await update.message.reply_text(help_text, parse_mode='Markdown')


# ============================================================================
# STRIPE PAYMENT ENDPOINT
# ============================================================================

@app.route('/api/create-payment', methods=['POST'])
def create_payment():
    """
    Endpoint do tworzenia sesji płatności Stripe
    
    Request JSON:
    {
        "telegram_user_id": "123456789",
        "price_id": "price_xxx",
        "tier_name": "VIP Access",
        "amount": 100
    }
    
    Response JSON:
    {
        "checkout_url": "https://checkout.stripe.com/...",
        "session_id": "cs_xxx"
    }
    """
    try:
        data = request.json
        telegram_user_id = data.get('telegram_user_id')
        price_id = data.get('price_id')
        tier_name = data.get('tier_name')
        amount = data.get('amount')
        
        # Validation
        if not price_id:
            logger.error("Missing price_id in payment request")
            return jsonify({'error': 'Missing required fields'}), 400
        
        logger.info(f"Creating payment session for user {telegram_user_id}, tier {tier_name}")
        
        # Create Stripe Checkout Session
        checkout_session_kwargs = {
            'payment_method_types': ['card', 'blik'],
            'line_items': [{
                'price': price_id,
                'quantity': 1,
            }],
            'mode': 'payment',  # One-time payment
            'success_url': f'{WEBAPP_BASE_URL}/payment-success?session_id={{CHECKOUT_SESSION_ID}}',
            'cancel_url': f'{WEBAPP_BASE_URL}/payment-cancel',
            'metadata': {
                'tier': tier_name,
                'amount': amount
            }
        }

        if telegram_user_id:
            checkout_session_kwargs['client_reference_id'] = str(telegram_user_id)
            checkout_session_kwargs['metadata']['telegram_user_id'] = telegram_user_id
        
        session = stripe.checkout.Session.create(**checkout_session_kwargs)
        
        logger.info(f"Payment session created successfully: {session.id}")
        
        return jsonify({
            'checkout_url': session.url,
            'session_id': session.id
        }), 200
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        return jsonify({'error': f'Stripe error: {str(e)}'}), 500
    except Exception as e:
        logger.error(f"Error creating payment: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/verify-payment', methods=['POST'])
def verify_payment():
    """
    Weryfikuje sesję płatności i zwraca link do kanału
    """
    try:
        data = request.json
        session_id = data.get('session_id')
        
        if not session_id:
            return jsonify({'error': 'Missing session_id'}), 400
            
        # 1. Retrieve session from Stripe
        session = stripe.checkout.Session.retrieve(session_id)
        
        # 2. Verify payment status
        if session.payment_status != 'paid':
            return jsonify({'error': 'Payment not verified'}), 400
            
        # 3. Get tier from metadata
        metadata = session.get('metadata', {})
        tier = metadata.get('tier', 'VIP Access')
        
        # 4. Generate Invite Link
        channel_id = DIAMOND_CHANNEL_ID if 'Diamond' in tier else VIP_CHANNEL_ID
        
        # Create a unique invite link for this user (one-time use or limited time recommended)
        invite_link = bot.export_chat_invite_link(chat_id=channel_id)
        
        return jsonify({
            'success': True,
            'link': invite_link,
            'tier': tier
        }), 200
        
    except Exception as e:
        logger.error(f"Error verifying payment: {e}")
        return jsonify({'error': str(e)}), 500


# ============================================================================
# STRIPE WEBHOOK
# ============================================================================

@app.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    """
    Webhook handler dla eventów Stripe
    Obsługuje 'checkout.session.completed' - dodaje użytkownika do kanału VIP
    """
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        logger.error(f"Invalid webhook payload: {e}")
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid webhook signature: {e}")
        return jsonify({'error': 'Invalid signature'}), 400
    
    # Handle successful payment
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        metadata = session.get('metadata', {})
        telegram_user_id = metadata.get('telegram_user_id')
        tier = metadata.get('tier')
        amount = metadata.get('amount')
        
        logger.info(f"Payment completed for user {telegram_user_id}, tier {tier}, amount {amount} PLN")
        
        # Add user to VIP channel ONLY if telegram_user_id is present
        if telegram_user_id:
            try:
                add_user_to_vip_channel(telegram_user_id, tier)
                send_welcome_message(telegram_user_id, tier)
                logger.info(f"User {telegram_user_id} successfully added to VIP channel")
            except Exception as e:
                logger.error(f"Error processing successful payment: {e}")
                # Możesz tutaj dodać retry logic lub powiadomienie admina
        else:
             logger.info("No telegram_user_id provided - likely a web purchase without bot interaction")
    
    return jsonify({'status': 'success'}), 200


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def add_user_to_vip_channel(user_id: str, tier: str):
    """
    Dodaj użytkownika do odpowiedniego kanału VIP
    
    Args:
        user_id: Telegram user ID
        tier: Nazwa pakietu ('VIP Access' lub 'Diamond VIP')
    """
    try:
        # Określ kanał na podstawie pakietu
        if tier == "VIP Access":
            channel_id = VIP_CHANNEL_ID
        elif tier == "Diamond VIP":
            channel_id = DIAMOND_CHANNEL_ID
        else:
            logger.warning(f"Unknown tier: {tier}")
            channel_id = VIP_CHANNEL_ID
        
        # Utwórz link zaproszenia (opcjonalnie z limitem czasu)
        invite_link = bot.export_chat_invite_link(chat_id=channel_id)
        
        # Wyślij link użytkownikowi
        message = f"""
🎉 **WITAJ W KLUBIE VIP!** 🎉

Twoja płatność została potwierdzona! 💕

📱 Kliknij poniżej, aby dołączyć do kanału {tier}:
{invite_link}

✨ Miłej zabawy! 😘

- Maja 💋
        """
        
        bot.send_message(
            chat_id=user_id,
            text=message,
            parse_mode='Markdown'
        )
        
        logger.info(f"Invite link sent to user {user_id}")
        
    except Exception as e:
        logger.error(f"Error adding user {user_id} to channel: {e}")
        raise


def send_welcome_message(user_id: str, tier: str):
    """
    Wyślij wiadomość powitalną użytkownikowi
    
    Args:
        user_id: Telegram user ID
        tier: Nazwa pakietu
    """
    try:
        if tier == "VIP Access":
            message = """
🔥 **WITAJ W VIP ACCESS!** 🔥

Dziękuję za dołączenie do mojego ekskluzywnego świata! 💋

✨ **Twoje korzyści:**
✅ Nielimitowane treści +18 (foto + video)
✅ Prywatne DM - odpowiadam osobiście!
✅ Live Video Sexting
✅ Custom Content na zamówienie
✅ GFE (Girlfriend Experience)
🎁 BONUS: Darmowy Crypto E-book

📨 Napisz do mnie "Hej" aby rozpocząć rozmowę! 😘

- Maja 💕
            """
        elif tier == "Diamond VIP":
            message = """
💎 **WITAJ W DIAMOND VIP!** 💎

Wow! Dziękuję za wybranie najwyższego poziomu! 🔥

✨ **Twoje EKSKLUZYWNE korzyści:**
✅ Wszystko z VIP Access
✅ Priorytetowe odpowiedzi (odpowiadam jako pierwsza!)
✅ Ekskluzywne live streamy tylko dla Ciebie
✅ Mój prywatny numer WhatsApp
💋 Możliwość spotkań IRL (Warszawa)
🎁 BONUS: Darmowy Crypto E-book

📱 Zapisz mój WhatsApp: +48 XXX XXX XXX

Zapraszam do rozmowy! 😘💎

- Maja 💕
            """
        else:
            message = f"Witaj w {tier}! Dziękuję za dołączenie! 💕"
        
        bot.send_message(
            chat_id=user_id,
            text=message,
            parse_mode='Markdown'
        )
        
        logger.info(f"Welcome message sent to user {user_id}")
        
    except Exception as e:
        logger.error(f"Error sending welcome message to {user_id}: {e}")


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Uruchom bota Telegram"""
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    
    # Dodaj handlery
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("verify", verify_command))
    application.add_handler(CommandHandler("vip", vip_command))
    application.add_handler(CommandHandler("help", help_command))
    
    # Uruchom bota
    logger.info("Starting Telegram bot...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    import sys
    
    # Uruchom Flask webhook server w osobnym wątku
    if '--webhook-only' in sys.argv:
        logger.info("Starting Flask webhook server on port 8000...")
        app.run(host='0.0.0.0', port=8000)
    else:
        logger.info("Starting Telegram bot...")
        main()


# ============================================================================
# .ENV FILE EXAMPLE
# ============================================================================
"""
Stwórz plik .env w tym samym folderze z następującą zawartością:

TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
WEBAPP_BASE_URL=https://your-domain.com
VIP_CHANNEL_ID=@your_vip_channel
DIAMOND_CHANNEL_ID=@your_diamond_channel

UWAGA: NIE COMMITUJ tego pliku do git! Dodaj .env do .gitignore
"""

# ============================================================================
# DEPLOYMENT
# ============================================================================
"""
Wdrożenie na serwerze:

1. Zainstaluj zależności:
   pip install -r requirements.txt

2. Uruchom bota:
   python telegram_bot_backend.py

3. Uruchom webhook server (w osobnym terminalu):
   python telegram_bot_backend.py --webhook-only

4. Ustaw webhook w Stripe Dashboard:
   https://your-server.com/webhook/stripe

5. Testuj płatności!

Alternatywnie: użyj systemd/supervisor do zarządzania procesami
"""
