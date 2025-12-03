import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, MapPin, Star, Award, Verified, Mic } from 'lucide-react';
import weryfikacjaImage from '../../assets/weryfikacja.jpg';
import voiceVerification from '../../assets/weryfikacja.mp3';

const VerificationSection: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    const sectionElement = sectionRef.current;
    if (!audioElement || !sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            // Próba odtworzenia audio gdy sekcja jest widoczna
            audioElement.play().then(() => {
              hasPlayedRef.current = true;
              console.log('Głosówka odtworzona automatycznie');
            }).catch((error) => {
              console.log('Autoplay zablokowany przez przeglądarkę:', error);
            });
          }
        });
      },
      {
        threshold: 0.3, // Odtwórz gdy 30% sekcji jest widoczne
        rootMargin: '0px'
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const verificationItems = [
    {
      icon: Shield,
      title: "Tożsamość zweryfikowana",
      description: "Moja tożsamość została potwierdzona przez administrację platformy poprzez oficjalny dokument tożsamości.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      glowColor: "shadow-green-400/10"
    },
    {
      icon: Calendar,
      title: "Wiek potwierdzony",
      description: "Mam ukończone 25 lat, co zostało potwierdzone oficjalnym dokumentem tożsamości.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      glowColor: "shadow-blue-400/10"
    },
    {
      icon: MapPin,
      title: "Lokalizacja potwierdzona",
      description: "Mieszkam w Warszawie, co zostało potwierdzone przez geolokalizację i adres zamieszkania.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      glowColor: "shadow-purple-400/10"
    },
    {
      icon: Mic,
      title: "Głos zweryfikowany",
      description: "Mój głos został potwierdzony przez weryfikację głosową. Posłuchaj poniżej mojej autentycznej wiadomości głosowej.",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/20",
      glowColor: "shadow-pink-400/10"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 mb-6 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300 rainbow-border-animated"
          >
            <Verified className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Verified Identity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              TOŻSAMOŚĆ ZWERYFIKOWANA
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center bg-green-400/10 rounded-full px-4 py-2 hover:bg-green-400/20 transition-all duration-300 rainbow-border-full"
            >
              <Award className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm font-medium">Zaufany Profil</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center bg-blue-400/10 rounded-full px-4 py-2 hover:bg-blue-400/20 transition-all duration-300 rainbow-border-full"
            >
              <Star className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-400 text-sm font-medium">Premium Creator</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Enhanced Verification Photo Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-neon-pink/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>

            <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-700/80 to-dark-800/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 rainbow-border-animated rainbow-glow">
              {/* Verification Badge */}


              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full flex items-center justify-center mr-4">
                  <Verified className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Zdjęcie weryfikacyjne</h3>
              </div>

              <div className="relative rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={weryfikacjaImage}
                  alt="Maja trzymająca kartkę z datą i nazwą platformy"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border border-green-400/20">
                    <p className="text-white text-sm font-medium mb-1">
                      📅 Zdjęcie potwierdzone: 10.10.2025r
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional verification info */}
              <div className="mt-6 p-4 bg-green-400/5 rounded-xl rainbow-border-full">
                <div className="flex items-center text-green-400 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Weryfikacja przeprowadzona przez administrację platformy
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Verification Details */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>

            <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-700/80 to-dark-800/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 rainbow-border-animated rainbow-glow">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink/20 to-purple-400/20 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="text-2xl font-bold text-white">Potwierdzone informacje</h3>
              </div>

              <div className="space-y-6">
                {verificationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group/item flex items-start p-4 rounded-xl ${item.bgColor} hover:scale-[1.02] transition-all duration-300 cursor-pointer rainbow-border-full`}
                  >
                    <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 group-hover/item:text-gray-100 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover/item:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Voice Verification Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 p-6 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-xl rainbow-border-animated"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-pink-400/20 rounded-full flex items-center justify-center mr-3">
                    <Mic className="w-5 h-5 text-pink-400" />
                  </div>
                  <h4 className="text-white font-bold">Wiadomość głosowa</h4>
                </div>
                <audio
                  ref={audioRef}
                  controls
                  className="w-full rounded-lg"
                  style={{
                    filter: 'hue-rotate(290deg) saturate(1.5)',
                    height: '40px'
                  }}
                >
                  <source src={voiceVerification} type="audio/mpeg" />
                  Twoja przeglądarka nie obsługuje odtwarzacza audio.
                </audio>
                <p className="text-gray-400 text-xs mt-3 text-center">
                  🔊 Posłuchaj mojej autentycznej wiadomości głosowej
                </p>
              </motion.div>

              {/* Trust Score */}
              <div className="mt-8 p-6 bg-gradient-to-r from-neon-pink/10 to-purple-400/10 rounded-xl rainbow-border-animated">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold mb-1">Poziom zaufania</h4>
                    <p className="text-gray-300 text-sm">Maksymalny poziom weryfikacji</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-neon-pink">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerificationSection;