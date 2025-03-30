import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { AdProvider } from "./contexts/AdContext";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import ProPath from "./components/ProPath";
import PassGamers from "./components/PassGamers";
import FAQ from "./components/FAQ";
import FooterAd from "./components/FooterAd";
import Footer from "./components/Footer";
import GameAd from "./components/GameAd";
import AdController from "./components/AdController";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import TifinaghFontLoader from './components/TifinaghFontLoader';
import './utils/latinToTifinagh'; // S'assurer que les utilitaires Tifinagh sont chargés

// Composant principal de l'application
function MainPage() {
  const lenisRef = useRef();
  const { language } = useLanguage(); // Accéder à la langue actuelle
  const lastLanguageRef = useRef(language); // Référence pour suivre la dernière langue
  const rafIdRef = useRef(null); // Référence pour l'animation frame
  const [adVisible, setAdVisible] = useState(true); // État pour contrôler la visibilité de l'annonce
  
  // Fonction pour initialiser ou réinitialiser Lenis
  const initLenis = () => {
    // Nettoyer l'instance précédente si elle existe
    if (lenisRef.current) {
      lenisRef.current.destroy();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    }
    
    console.log("Initialisation/Réinitialisation de Lenis");
    
    // Débloquer explicitement le défilement avant d'initialiser Lenis
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    // Configuration de Lenis pour le smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical", 
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      // Options ajoutées pour mieux gérer les changements de langue
      gestureOrientation: "vertical",
      infinite: false,
      orientation: "vertical",
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Fonction d'animation modifiée pour être nettoyable
    const animate = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };
  
  // Initialiser Lenis au montage du composant
  useEffect(() => {
    initLenis();
    
    // Ajouter un écouteur pour l'événement LenisReset
    const handleLenisReset = () => {
      console.log("Événement LenisReset reçu, réinitialisation de Lenis");
      initLenis();
    };
    
    window.addEventListener('LenisReset', handleLenisReset);
    
    // Cleanup lors du démontage
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('LenisReset', handleLenisReset);
    };
  }, []);
  
  // Réinitialiser Lenis lors des changements de langue
  useEffect(() => {
    // Vérifier si la langue a changé
    if (language !== lastLanguageRef.current) {
      console.log(`Langue changée de ${lastLanguageRef.current} à ${language}, réinitialisation de Lenis`);
      
      // Mettre à jour la référence de la dernière langue
      lastLanguageRef.current = language;
      
      // Débloquer explicitement le défilement
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Attendre que les changements de DOM soient appliqués avant de réinitialiser
      setTimeout(() => {
        initLenis();
        
        // Forcer une mise à jour du défilement
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  }, [language]);
  
  return (
    <main className="relative min-h-screen w-screen" style={{ overflow: 'visible' }}>
      <NavBar />
      
      {/* Section Hero */}
      <Hero />
      
      {/* Section À propos */}
      <About />
      
      {/* Section Road to Glory */}
      <Tri9lGlory />
      
      {/* Section Prize Pool */}
      <PrizePool />
      
      {/* Section ProPath */}
      <div id="pro-path">
        <ProPath />
      </div>
      
      {/* Section Pass Gamers */}
      <div id="PassGamers">
        <PassGamers />
      </div>
      
      {/* Section FAQ */}
      <div id="faq">
        <FAQ />
      </div>
      
      {/* Bannière de footer */}
      <FooterAd />
      
      {/* Footer */}
      <Footer />
      
      {/* Panneau publicitaire flottant - amélioré avec position et animation */}
      {adVisible && (
        <div className="fixed right-4 top-[40%] transform -translate-y-1/2 z-50 transition-all duration-500 hover:scale-105">
          <div className="relative">
            {/* Étiquette */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs px-2 py-1 rounded-t-md font-bold">
              Publicité
            </div>
            {/* Bouton de fermeture personnalisé */}
            <button 
              onClick={() => setAdVisible(false)}
              className="absolute -top-8 -right-2 bg-black/80 hover:bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {/* Annonce avec effet d'ombre amélioré */}
            <div className="transform transition-transform duration-700 hover:rotate-1">
              <GameAd width={280} height={230} className="shadow-2xl ring-1 ring-primary/30" />
            </div>
          </div>
        </div>
      )}
      
      {/* Contrôleur de publicités pour la démonstration */}
      <AdController />
    </main>
  );
}

// Wrapper pour initialiser les fonctionnalités après le chargement de l'application
const AppInitializer = ({ children }) => {
  const { language, isRtl } = useLanguage();
  
  // Effect pour mettre à jour la direction du document et les classes
  useEffect(() => {
    if (document) {
      console.log('AppInitializer - Langue active:', language);
      document.dir = isRtl ? 'rtl' : 'ltr';
      
      // Mise à jour des classes sur l'élément HTML
      const htmlElement = document.documentElement;
      
      // Gestion RTL
      if (isRtl) {
        htmlElement.classList.add('rtl');
      } else {
        htmlElement.classList.remove('rtl');
      }
    }
  }, [language, isRtl]);
  
  return (
    <>
      <TifinaghFontLoader />
      {children}
    </>
  );
};

// Composant App principal avec les providers nécessaires
function App() {
  return (
    <AdProvider>
      <LanguageProvider>
        <AppInitializer>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/downloads" element={<Documentation />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AppInitializer>
      </LanguageProvider>
    </AdProvider>
  );
}

export default App;
