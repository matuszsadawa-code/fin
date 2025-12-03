import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Jakie treści znajdę w VIP?',
      answer: 'W VIP czeka na Ciebie ponad 500+ ekskluzywnych materiałów - profesjonalne sesje zdjęciowe w wysokiej jakości, gorące filmiki, spontaniczne stories z mojego życia i specjalne niespodzianki tylko dla subskrybentów. Regularnie dodaję nowe treści (3-4 razy w tygodniu), więc zawsze znajdziesz coś świeżego. Plus oczywiście masz bezpośredni kontakt ze mną w wiadomościach - to miejsce, gdzie mogę być prawdziwą sobą i dzielić się tym, czego nie zobaczysz nigdzie indziej.'
    },
    {
      id: '2',
      question: 'Czy to naprawdę Ty odpisujesz na wiadomości?',
      answer: 'Tak, każda wiadomość jest ode mnie! 💕 Nie mam żadnego managera czy bota - jak piszesz do mnie, to rozmawiasz ze mną osobiście. Staram się odpowiadać jak najszybciej, ale czasem może minąć kilka godzin (szczególnie w nocy albo gdy jestem na treningu). Uwielbiam poznawać moich fanów i budować prawdziwe relacje, dlatego odpisuję każdemu samodzielnie.'
    },
    {
      id: '3',
      question: 'Jak działa subskrypcja?',
      answer: 'Super prosto! Wybierasz plan (mam VIP Access za 89,99 zł/msc lub Diamond VIP za 149,99 zł/msc), płacisz bezpiecznie i od razu otrzymujesz pełny dostęp do wszystkich moich treści. Subskrypcja odnawia się automatycznie co miesiąc, ale możesz ją anulować kiedy chcesz - zachowasz dostęp do końca opłaconego okresu. Zero ukrytych opłat, zero zobowiązań na lata. Wszystko jest bezpieczne i dyskretne.'
    },
    {
      id: '4',
      question: 'Kiedy robisz live streamy?',
      answer: 'Robię live sessions 2-3 razy w miesiącu, najczęściej wieczorami w weekendy! 🎥 Zawsze informuję z wyprzedzeniem w VIP, żebyś nie przegapił. To mój ulubiony moment - możemy pogadać na żywo, odpowiadam na Twoje pytania i pokazuję coś ekstra. Każdy live jest spontaniczny i autentyczny, bez scenariusza. To naprawdę wyjątkowe chwile!'
    },
    {
      id: '5',
      question: 'Czy mogę anulować subskrypcję kiedy chcę?',
      answer: 'Jasne! Żadnych zobowiązań na pół roku czy rok - możesz anulować w dowolnym momencie bezpośrednio w ustawieniach. Twój dostęp pozostanie aktywny do końca opłaconego miesiąca, więc nie tracisz ani złotówki. To bardzo proste i bez żadnych ukrytych haczyków. Chcę, żebyś był ze mną, bo naprawdę tego chcesz, a nie z przymusu! 😊'
    },
    {
      id: '6',
      question: 'Czy robisz treści na zamówienie?',
      answer: 'Tak, uwielbiam takie wyzwania! 😍 Dla moich subskrybentów mogę przygotować spersonalizowane zdjęcia czy filmiki - oczywiście w granicach rozsądku i tego, co czuję się komfortowo robić. Napisz do mnie prywatnie w VIP z pomysłem, a ustalimy szczegóły i cenę. To super sposób, żeby dostać coś naprawdę unikalnego, stworzonego specjalnie dla Ciebie!'
    },
    {
      id: '7',
      question: 'Czy e-book o krypto jest tego wart?',
      answer: 'Absolutnie! 📚 Ten e-book to efekt 2 lat mojej nauki i doświadczenia na rynku krypto. Zbieram w nim wszystko - od podstaw, przez bezpieczne strategie, checklisty, po zaawansowane taktyki, które pomogły mi samej zarabiać. Teraz jest w promocji za 149,99 zł (normalnie 299 zł). Jeśli chcesz wejść w świat kryptowalut bez błędów początkujących, to naprawdę dobra inwestycja w siebie. Pomyśl o tym jak o prywatnym mentoringu, tyle że w formie książki!'
    },
    {
      id: '8',
      question: 'Czy moje dane i płatności są bezpieczne?',
      answer: 'W 100%! 🔒 Wszystkie płatności przechodzą przez bezpieczną platformę z pełnym szyfrowaniem. Twoje dane osobowe i finansowe są chronione według najwyższych standardów i nigdy nie są udostępniane nikomu. Platforma dba o pełną dyskrecję - nikt nie dowie się, co kupujesz. Na wyciągu z karty pojawi się neutralna nazwa, nie moja. Prywatność i bezpieczeństwo to dla mnie absolutny priorytet!'
    }
  ]

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-neon-pink" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold glow-text">
              Często zadawane pytania
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Masz pytania dotyczące VIP, e-booka lub moich treści? Odpowiedzi na najczęstsze pytania znajdziesz poniżej.
            Jeśli nie znalazłeś odpowiedzi, napisz do mnie bezpośrednio!
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 overflow-hidden hover:border-neon-pink/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 text-left flex items-center justify-between hover:bg-dark-700/30 transition-colors duration-200 touch-manipulation min-h-[60px] sm:min-h-[70px]"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white pr-3 sm:pr-4 leading-tight">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-neon-pink" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                      <div className="border-t border-gray-600/50 pt-3 sm:pt-4">
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}

      </div>
    </section>
  )
}

export default FAQSection
