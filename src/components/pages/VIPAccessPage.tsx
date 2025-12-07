import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Shield, Lock, Check, Award, ChevronRight, Zap } from 'lucide-react';
import FloatingHearts from '../animations/FloatingHearts';
import FloatingCryptoIcons from '../animations/FloatingCryptoIcons';

// Użyj zmiennej środowiskowej lub defaultowego adresu lokalnego
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TELEGRAM_BOT_WEBHOOK = `${API_BASE_URL}/api/create-payment`;

interface PricingTier {
    id: string;
    name: string;
    price: number;
    priceFormatted: string;
    originalPrice?: string;
    savings?: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    borderColor: string;
    textColor: string;
    popular?: boolean;
    features: string[];
    stripePriceId: string; // Legacy
    pricesPerCycle?: {
        [key in 'monthly' | 'quarterly' | 'lifetime']: {
            price: number;
            priceFormatted: string;
            stripePriceId: string;
            savings?: string;
        }
    };
}

const VIPAccessPage: React.FC = () => {
    type BillingCycle = 'monthly' | 'quarterly' | 'lifetime';
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [selectedTier, setSelectedTier] = useState<string>('vip');
    const [isProcessing, setIsProcessing] = useState(false);
    const [telegramUserId, setTelegramUserId] = useState<string>('');


    // Odczyt Telegram User ID z URLParams (przekazywane przez bota)
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('user_id');
        if (userId) {
            setTelegramUserId(userId);
        }

        // Telegram WebApp API
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();

            // Pobierz user ID z Telegram WebApp
            if (tg.initDataUnsafe?.user?.id) {
                setTelegramUserId(tg.initDataUnsafe.user.id.toString());
            }
        }
    }, []);

    const pricingTiers: PricingTier[] = [
        {
            id: 'vip',
            name: 'VIP Access',
            price: 100, // Base monthly price for display logic if needed
            priceFormatted: '100 zł', // Default placeholder
            pricesPerCycle: {
                monthly: { price: 100, priceFormatted: '100 zł', stripePriceId: 'price_VIP_MONTHLY' },
                quarterly: { price: 250, priceFormatted: '250 zł', stripePriceId: 'price_VIP_QUARTERLY', savings: 'Oszczędzasz 50 zł' },
                lifetime: { price: 999, priceFormatted: '999 zł', stripePriceId: 'price_VIP_LIFETIME', savings: 'Dostęp dożywotni' }
            },
            icon: Crown,
            gradient: 'from-pink-900/50 to-purple-900/50',
            borderColor: 'border-pink-500',
            textColor: 'text-pink-400',
            popular: true,
            features: [
                'Nielimitowane treści +18 (foto + video)',
                'Prywatne DM - piszę sama!',
                'Live Video Sexting',
                'Custom Content na zamówienie',
                'GFE (Girlfriend Experience)',
                '🎁 BONUS: Darmowy Crypto E-book',
                'Płatność jednorazowa!',
            ],
            stripePriceId: '', // Legacy, unused
        },
        {
            id: 'diamond',
            name: 'Diamond VIP',
            price: 250,
            pricesPerCycle: {
                monthly: { price: 250, priceFormatted: '250 zł', stripePriceId: 'price_DIAMOND_MONTHLY' },
                quarterly: { price: 600, priceFormatted: '600 zł', stripePriceId: 'price_DIAMOND_QUARTERLY', savings: 'Oszczędzasz 150 zł' },
                lifetime: { price: 2499, priceFormatted: '2499 zł', stripePriceId: 'price_DIAMOND_LIFETIME', savings: 'Dostęp dożywotni' }
            },
            priceFormatted: '250 zł',
            icon: Sparkles,
            gradient: 'from-yellow-900/30 to-orange-900/30',
            borderColor: 'border-yellow-500/30',
            textColor: 'text-yellow-400',
            features: [
                'Wszystko z VIP Access',
                'Priorytetowe odpowiedzi',
                'Ekskluzywne live streamy',
                'Mój prywatny numer WhatsApp',
                '🔥 Możliwość spotkań IRL (Warszawa)',
                '🎁 BONUS: Darmowy Crypto E-book',
                'Płatność jednorazowa!',
            ],
            stripePriceId: '', // Legacy
        },
    ];

    const handleCheckout = async () => {

        setIsProcessing(true);

        const tier = pricingTiers.find(t => t.id === selectedTier);
        if (!tier) return;

        // Get price details based on selected cycle
        // @ts-expect-error - we know this exists now
        const priceDetails = tier.pricesPerCycle[billingCycle];

        try {
            // Wywołanie backendu bota Telegram
            const response = await fetch(TELEGRAM_BOT_WEBHOOK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    telegram_user_id: telegramUserId || null, // Może być null jeśli użytkonik kupuje przez www bez bota
                    price_id: priceDetails.stripePriceId,
                    tier_name: `${tier.name} (${billingCycle})`,
                    amount: priceDetails.price,
                }),
            });

            const data = await response.json();

            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                console.error('Błąd z backendu:', data);
                alert(`Błąd tworzenia sesji płatności: ${data.error || 'Nieznany błąd'}`);
            }
        } catch (error) {
            console.error('Payment error:', error);

            let errorMessage = 'Wystąpił błąd połączenia z serwerem płatności.';

            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                errorMessage += '\n\nMożliwe przyczyny:\n1. Backend nie jest uruchomiony\n2. Błąd CORS (upewnij się, że backend zezwala na połączenia z tego adresu)\n3. Adblock blokuje żądanie';
            }

            alert(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-neon-gradient relative overflow-hidden">
            {/* Latające serduszka w tle */}
            <FloatingHearts />

            {/* Latające ikony crypto i blockchain */}
            <FloatingCryptoIcons />

            {/* Główna zawartość */}
            <div className="relative z-10 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 mb-6 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 rainbow-border-animated"
                        >
                            <Crown className="w-5 h-5 text-pink-400" />
                            <span className="text-sm font-medium text-white">VIP Membership</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold mb-6"
                        >
                            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                                DOŁĄCZ DO VIP! 💋
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                        >
                            Wybierz swój pakiet dostępu i odkryj ekskluzywny świat Mai Lubicz
                        </motion.p>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                        >
                            <p className="text-lg text-white mb-2">
                                <span className="text-pink-400 font-semibold">127 fanów</span> już mnie subskrybuje
                            </p>
                            <p className="text-base text-gray-400">
                                Ostatnio dołączyło <span className="text-green-400 font-semibold">+8 osób</span> w tym tygodniu
                            </p>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-4 mt-6"
                        >
                            <div className="flex items-center bg-green-400/10 rounded-full px-4 py-2 rainbow-border-full">
                                <Shield className="w-4 h-4 text-green-400 mr-2" />
                                <span className="text-green-400 text-sm font-medium">Bezpieczne Płatności</span>
                            </div>
                            <div className="flex items-center bg-blue-400/10 rounded-full px-4 py-2 rainbow-border-full">
                                <Lock className="w-4 h-4 text-blue-400 mr-2" />
                                <span className="text-blue-400 text-sm font-medium">100% Dyskrecja</span>
                            </div>
                            <div className="flex items-center bg-purple-400/10 rounded-full px-4 py-2 rainbow-border-full">
                                <Award className="w-4 h-4 text-purple-400 mr-2" />
                                <span className="text-purple-400 text-sm font-medium">Natychmiastowy Dostęp</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Billing Cycle Selector */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-dark-800/60 backdrop-blur-xl p-1 rounded-2xl border border-gray-700 flex flex-wrap gap-1 justify-center">
                            {(['monthly', 'quarterly', 'lifetime'] as const).map((cycle) => (
                                <button
                                    key={cycle}
                                    onClick={() => setBillingCycle(cycle)}
                                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${billingCycle === cycle
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {cycle === 'monthly' && '1 Miesiąc'}
                                    {cycle === 'quarterly' && '3 Miesiące (-20%)'}
                                    {cycle === 'lifetime' && 'Lifetime (Dożywotnio)'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {pricingTiers.map((tier, index) => {
                            // @ts-ignore
                            const currentPrice = tier.pricesPerCycle[billingCycle];

                            return (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={`relative cursor-pointer ${tier.popular ? 'md:scale-105' : ''}`}
                                >
                                    {/* Popular Badge */}
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg shadow-pink-500/50 z-10">
                                            NAJPOPULARNIEJSZE ⭐
                                        </div>
                                    )}

                                    {/* Selection Ring */}
                                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${selectedTier === tier.id
                                        ? 'ring-4 ring-pink-500 ring-offset-4 ring-offset-dark-900'
                                        : ''
                                        }`} />

                                    <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${tier.gradient} backdrop-blur-xl border-2 ${selectedTier === tier.id ? tier.borderColor : 'border-gray-700'
                                        } transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col`}>

                                        {/* Icon */}
                                        <div className="flex justify-center mb-6">
                                            <div className={`p-4 rounded-xl bg-gradient-to-br ${tier.gradient} border ${tier.borderColor}`}>
                                                <tier.icon className={`w-8 h-8 ${tier.textColor}`} />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-3xl font-bold text-white text-center mb-4">
                                            {tier.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="text-center mb-6">
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <span className={`text-5xl font-bold ${tier.id === 'vip' ? 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent' : tier.textColor}`}>
                                                    {currentPrice.priceFormatted}
                                                </span>
                                            </div>
                                            {currentPrice.savings && (
                                                <p className="text-green-400 text-sm font-medium mt-2">⚡ {currentPrice.savings}</p>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-6 flex-grow">
                                            {tier.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Selection Indicator */}
                                        <div className="flex items-center justify-center">
                                            {selectedTier === tier.id ? (
                                                <div className="flex items-center gap-2 text-pink-400 font-bold">
                                                    <Check className="w-5 h-5" />
                                                    <span>Wybrano</span>
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 text-sm">
                                                    Kliknij aby wybrać
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Checkout Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >


                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-full py-6 rounded-2xl text-center font-bold text-xl transition-all duration-300
                ${isProcessing
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-pink-500/50 transform hover:scale-105'
                                }
                text-white flex items-center justify-center gap-3`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                                    <span>Przetwarzanie...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-6 h-6" />
                                    <span>PRZEJDŹ DO PŁATNOŚCI</span>
                                    <ChevronRight className="w-6 h-6" />
                                </>
                            )}
                        </button>

                        {/* Payment Info */}
                        <div className="mt-6 p-6 bg-dark-800/60 backdrop-blur-xl rounded-xl border border-gray-700">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-400" />
                                Bezpieczna płatność Stripe
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Płatność jednorazowa - bez subskrypcji
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Natychmiastowy dostęp do kanału VIP po płatności
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Akceptujemy karty: Visa, Mastercard, Blik
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Szyfrowane połączenie SSL
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* FAQ Mini Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 p-6 bg-dark-800/40 backdrop-blur-xl rounded-xl border border-gray-700"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Najczęściej Zadawane Pytania</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-pink-400 font-bold mb-2">🔒 Czy płatność jest bezpieczna?</h4>
                                <p className="text-gray-300 text-sm">Tak! Korzystamy z Stripe - lidera w branży płatności online. Twoje dane są w pełni zabezpieczone.</p>
                            </div>
                            <div>
                                <h4 className="text-pink-400 font-bold mb-2">⚡ Kiedy otrzymam dostęp?</h4>
                                <p className="text-gray-300 text-sm">Natychmiast po potwierdzeniu płatności zostaniesz automatycznie dodany do prywatnego kanału Telegram.</p>
                            </div>
                            <div>
                                <h4 className="text-pink-400 font-bold mb-2">🎁 Co dokładnie otrzymam?</h4>
                                <p className="text-gray-300 text-sm">Dostęp do ekskluzywnych treści +18, prywatne rozmowy ze mną, custom content i wiele więcej - zgodnie z wybranym pakietem.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// TypeScript global extension dla Telegram WebApp API
declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                ready: () => void;
                expand: () => void;
                initDataUnsafe?: {
                    user?: {
                        id: number;
                        first_name?: string;
                        last_name?: string;
                        username?: string;
                    };
                };
            };
        };
    }
}

export default VIPAccessPage;
