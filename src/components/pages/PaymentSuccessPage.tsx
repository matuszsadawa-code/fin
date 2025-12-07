import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, Copy, ArrowRight } from 'lucide-react';
import FloatingHearts from '../animations/FloatingHearts';

// Użyj zmiennej środowiskowej lub defaultowego adresu lokalnego
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const VERIFY_PAYMENT_URL = `${API_BASE_URL}/api/verify-payment`;

const PaymentSuccessPage: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [inviteLink, setInviteLink] = useState<string>('');
    const [tierName, setTierName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const sessionId = params.get('session_id');

            if (!sessionId) {
                setStatus('error');
                setErrorMessage('Brak identyfikatora sesji płatności.');
                return;
            }

            try {
                const response = await fetch(VERIFY_PAYMENT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setInviteLink(data.link);
                    setTierName(data.tier);
                    setStatus('success');
                } else {
                    setStatus('error');
                    setErrorMessage(data.error || 'Weryfikacja płatności nie powiodła się.');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
                setErrorMessage('Błąd połączenia z serwerem. Spróbuj odświeżyć stronę.');
            }
        };

        verifyPayment();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        alert('Link skopiowany do schowka!');
    };

    return (
        <div className="min-h-screen bg-neon-gradient relative overflow-hidden flex items-center justify-center px-4">
            <FloatingHearts />

            <div className="max-w-md w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-dark-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl text-center"
                >
                    {status === 'loading' && (
                        <div className="py-12">
                            <Loader2 className="w-16 h-16 text-pink-500 animate-spin mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-2">Weryfikacja płatności...</h2>
                            <p className="text-gray-400">Proszę czekać, sprawdzamy status Twojej transakcji.</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="py-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                            >
                                <Check className="w-10 h-10 text-white" />
                            </motion.div>

                            <h2 className="text-3xl font-bold text-white mb-2">Sukces! 🎉</h2>
                            <p className="text-gray-300 mb-8">
                                Twoja płatność za <span className="text-pink-400 font-bold">{tierName}</span> została potwierdzona.
                            </p>

                            <div className="bg-dark-900/50 rounded-xl p-6 border border-gray-600 mb-8">
                                <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold">Twój link zaproszenia:</p>

                                <a
                                    href={inviteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl mb-4 hover:shadow-lg hover:shadow-pink-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    DOŁĄCZ DO KANAŁU VIP
                                    <ArrowRight className="w-5 h-5" />
                                </a>

                                <button
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    Skopiuj link
                                </button>
                            </div>

                            <p className="text-xs text-gray-500">
                                Link jest jednorazowy. Proszę nie udostępniać go innym osobom.
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-12">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Coś poszło nie tak</h2>
                            <p className="text-red-400 mb-6">{errorMessage}</p>
                            <p className="text-gray-400 text-sm">
                                Jeśli pieniądze zostały pobrane z Twojego konta, skontaktuj się z obsługą klienta podając ID sesji (z paska adresu).
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
