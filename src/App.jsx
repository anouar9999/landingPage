import { useLayoutEffect, useState, useRef } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Partners from "./components/Partners";
import Event from "./components/Event";
import Speaker from "./components/Speaker";
import Schedule from "./components/Schedule";
import Tickets from "./components/Tickets";
import HomePageSlider from "./components/HomePageSlider";
import PassGamers from "./components/PassGamers";
import GameDetailPopup from "./components/GameDetailPopup";
import Lenis from "@studio-freight/lenis";
import AdProvider from "./contexts/AdContext";
import AdController from "./components/AdController";
import FooterAd from "./components/FooterAd";
import PopupAd from "./components/PopupAd";
import './App.scss';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPassGamersOpen, setPassGamersOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  // Référence à l'instance Lenis pour la gestion du défilement
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    // Initialiser Lenis pour un défilement fluide
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false
    });

    function raf(time) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);

    // Nettoyer l'instance Lenis lors du démontage du composant
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Désactiver le défilement lorsque des modales sont ouvertes
  useLayoutEffect(() => {
    if (lenisRef.current) {
      if (isPopupOpen || isPassGamersOpen) {
        // Stopper le défilement quand un popup est ouvert
        lenisRef.current.stop();
      } else {
        // Réactiver le défilement quand tous les popups sont fermés
        lenisRef.current.start();
      }
    }
  }, [isPopupOpen, isPassGamersOpen]);

  const openGameDetailPopup = (game) => {
    setSelectedGame(game);
    setPopupOpen(true);
  };

  const openPassGamersPopup = () => {
    setPassGamersOpen(true);
  };

  const closePassGamersPopup = () => {
    setPassGamersOpen(false);
  };

  const closeGameDetailPopup = () => {
    setPopupOpen(false);
  };

  // Composant de contenu principal enveloppé dans le AdProvider
  const AppContent = () => (
    <>
      <Navbar />
      
      <main>
        {/* Section Hero */}
        <Hero />

        {/* Autres sections */}
        <About />
        <Partners />
        <HomePageSlider />
        <Event />
        <Speaker openGameDetailPopup={openGameDetailPopup} />
        <Schedule />
        <Tickets openPassGamersPopup={openPassGamersPopup} />
        
        {/* Publicité avant le footer */}
        <FooterAd />
        
        {/* Footer */}
        <Footer />
        
        {/* Popups */}
        {isPopupOpen && (
          <GameDetailPopup
            isOpen={isPopupOpen}
            onClose={closeGameDetailPopup}
            game={selectedGame}
          />
        )}
        {isPassGamersOpen && (
          <PassGamers
            isOpen={isPassGamersOpen}
            onClose={closePassGamersPopup}
          />
        )}
        
        {/* Popup publicitaire */}
        <PopupAd />
      </main>
      
      {/* Contrôleur de publicités */}
      <AdController />
    </>
  );

  return (
    <AdProvider>
      <AppContent />
    </AdProvider>
  );
}

export default App;
