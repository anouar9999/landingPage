import React, { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PassGamers from "./components/PassGamers";
import GameAd from "./components/GameAd";
import AdController from "./components/AdController";
import FooterAd from "./components/FooterAd";
import PopupAd from "./components/PopupAd";
import { AdProvider, useAds } from "./context/AdContext";

// Version progressive d'AppContent
function AppContent() {
  const lenisRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour détecter si un modal est ouvert
  const checkModalState = () => {
    const modalOpenElements = document.querySelectorAll('.modal-open');
    setIsModalOpen(modalOpenElements.length > 0);
  };

  useEffect(() => {
    // Observer le DOM pour détecter quand des modaux sont ouverts/fermés
    const observer = new MutationObserver(() => {
      checkModalState();
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'], 
      childList: false, 
      subtree: false 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Link lenis to requestAnimationFrame
    function raf(time) {
      if (lenisRef.current && !isModalOpen) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup function to destroy Lenis instance when component unmounts
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [isModalOpen]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      
      <Hero />
      
      {/* Séparateur subtil au lieu d'une bande visible */}
      <div className="w-full h-px bg-gray-300/10" />
      
      <About />
      <div className="w-full h-px bg-gray-300/10" />
      
      <Tri9lGlory />
      
      {/* Séparateur subtil */}
      <div className="w-full h-px bg-gray-300/10" />
      
      {/* PassGamers Section */}
      <PassGamers />

      {/* PrizePool Section */}
      <div style={{ marginBottom: "-2px" }}>
        <div className="relative">
          <PrizePool />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "150px",
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(10, 10, 10))",
              transform: "translateY(2px)",
            }}
          />
        </div>
      </div>
      
      {/* Emplacement du mini-jeu publicitaire */}
      <div className="flex justify-center my-8">
        <GameAd 
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Contact Section */}
      <div>
        <Contact />
      </div>
      
      {/* Footer Ad Section */}
      <FooterAd />

      <Footer />
      
      {/* Popup publicitaire après délai */}
      <PopupAd />
      
      {/* Contrôleur des publicités */}
      <AdController />
    </main>
  );
}

// Composant App avec le provider
function App() {
  return (
    <AdProvider>
      <AppContent />
    </AdProvider>
  );
}

export default App;
