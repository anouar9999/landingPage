import React from 'react';
import NavBar from '../components/Navbar';
import PassGamers from '../components/PassGamers';
import Footer from '../components/Footer';

export default function PassGamersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-black text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs - Primary color themed */}
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-r from-primary/15 via-gray-700/10 to-transparent blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-gradient-to-r from-gray-800/20 via-primary/10 to-transparent blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-gradient-to-r from-primary/15 to-gray-900/10 blur-3xl animate-spin-slow"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
        
        {/* Floating particles - Primary themed */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <NavBar />

        {/* Pass Gamers Section */}
        <div>
          <PassGamers />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 61, 8, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 61, 8, 0.08) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px) scale(0.9);
          }
          50% {
            transform: translateY(-10px) scale(1);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(0.8);
          }
          100% {
            transform: rotate(360deg) scale(1.2);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
