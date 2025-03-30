import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import gsap from 'gsap';

/**
 * Composant pour une bannière publicitaire mobile fixe en bas de l'écran
 */
const MobileBottomAd = () => {
  const { showAds } = useAds();
  const [isVisible, setIsVisible] = useState(true);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const adRef = useRef(null);
  
  // Vérifier la taille de l'écran - seulement visible sur mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier initialement et à chaque redimensionnement
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);
  
  // Animation d'entrée
  useEffect(() => {
    if (showAds && isVisible && !hasBeenClosed && adRef.current && isMobile) {
      gsap.fromTo(
        adRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [showAds, isVisible, hasBeenClosed, isMobile]);
  
  const handleClose = () => {
    if (adRef.current) {
      gsap.to(adRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          setIsVisible(false);
          setHasBeenClosed(true); // Marquer comme fermé pour ne pas le réafficher
        }
      });
    } else {
      setIsVisible(false);
      setHasBeenClosed(true);
    }
  };
  
  // Ne pas afficher si les conditions ne sont pas remplies
  if (!showAds || !isVisible || hasBeenClosed || !isMobile) return null;
  
  return (
    <div 
      ref={adRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0a0a14] to-[#16213e] shadow-lg border-t border-primary/30"
      style={{ transform: 'translateY(100%)', opacity: 0 }}
    >
      {/* Bouton de fermeture */}
      <button 
        onClick={handleClose}
        className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-primary/40 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Label Publicité */}
      <div className="absolute -top-3 left-3 px-2 py-0.5 rounded-md bg-primary/80 text-white text-xs font-valorant">
        PUB
      </div>
      
      {/* Contenu */}
      <div className="flex items-center px-4 py-3">
        {/* Logo/Image publicitaire */}
        <div className="relative w-12 h-12 mr-4 rounded-md overflow-hidden border border-primary/30 flex-shrink-0 bg-black/30">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-valorant text-xs">LOGO</span>
          </div>
          
          {/* Animation subtile */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent" 
            style={{ animation: 'scan 2s infinite linear' }}
          ></div>
        </div>
        
        {/* Texte */}
        <div className="flex-grow">
          <h3 className="text-white font-valorant text-sm">Pub Gaming Mobile</h3>
          <p className="text-gray-300 text-xs mt-0.5">Profitez de nos offres spéciales gaming</p>
        </div>
        
        {/* Bouton CTA */}
        <button className="bg-primary/30 border border-primary/50 text-white text-xs px-3 py-1.5 rounded-md hover:bg-primary/50 transition-all backdrop-blur-sm font-valorant flex-shrink-0">
          VOIR
        </button>
      </div>
      
      <style jsx="true">{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default MobileBottomAd; 