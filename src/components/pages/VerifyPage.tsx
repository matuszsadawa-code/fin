import React from 'react';
import VerificationSection from '../sections/VerificationSection';
import FloatingHearts from '../animations/FloatingHearts';
import FloatingCryptoIcons from '../animations/FloatingCryptoIcons';
import RealTimeActivityWidget from '../ui/RealTimeActivityWidget';

const VerifyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neon-gradient relative overflow-hidden">
            {/* Latające serduszka w tle */}
            <FloatingHearts />

            {/* Latające ikony crypto i blockchain */}
            <FloatingCryptoIcons />

            {/* Główna zawartość */}
            <div className="relative z-10 py-8">
                <VerificationSection />
                {/* <TrustBadgesSection /> */}
            </div>

            {/* Widget powiadomień */}
            <RealTimeActivityWidget />
        </div>
    );
};

export default VerifyPage;
