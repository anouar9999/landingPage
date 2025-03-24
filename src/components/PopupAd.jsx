import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour un popup publicitaire modal avec design gaming avancé
 */
const PopupAd = () => {
  const { showAds } = useAds();
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const adContainerRef = useRef(null);
  
  // Montrer le popup après un délai
  useEffect(() => {
    let timeoutId;
    
    if (showAds) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 15000); // 15 secondes
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showAds]);
  
  // Animation d'entrée et sortie
  useEffect(() => {
    if (isVisible && popupRef.current && contentRef.current) {
      // Fond avec flou progressif
      gsap.to(popupRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        duration: 0.6,
        ease: "power2.out"
      });
      
      // Animation du contenu
      gsap.fromTo(contentRef.current, 
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      // Animation des bordures
      gsap.fromTo(".border-glow", 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "elastic.out(1, 0.8)" }
      );
      
      // Animation des particules
      gsap.to(".particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        opacity: "random(0.3, 0.8)",
        scale: "random(0.8, 1.2)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      });
      
      // Animation du contenu publicitaire
      gsap.fromTo(adContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power3.out" }
      );
      
      // Animation des lignes autour du contenu
      gsap.fromTo(".line-anim-h", 
        { width: 0 },
        { width: "100%", duration: 0.8, delay: 0.6, ease: "power1.inOut" }
      );
      
      gsap.fromTo(".line-anim-v", 
        { height: 0 },
        { height: "100%", duration: 0.8, delay: 0.6, ease: "power1.inOut" }
      );
    }
  }, [isVisible]);
  
  // Fermer le popup
  const closePopup = () => {
    if (popupRef.current && contentRef.current) {
      // Animation de sortie
      gsap.to(popupRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        delay: 0.2
      });
      
      gsap.to(contentRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };
  
  if (!showAds || !isVisible) return null;
  
  return (
    <div 
      ref={popupRef}
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      onClick={(e) => {
        if (e.target === popupRef.current) closePopup();
      }}
    >
      {/* Particules d'ambiance en fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="particle absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50 + 50}, ${Math.random() * 200 + 55}, ${Math.random() * 0.3 + 0.2})`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      <div 
        ref={contentRef}
        className="relative bg-gradient-to-br from-[#0a0a14] to-[#1a1a2e] rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(106, 90, 205, 0.15)' }}
      >
        {/* Effet de bordure brillante */}
        <div className="border-glow absolute -inset-[1px] rounded-lg z-0 opacity-0" style={{ 
          background: 'linear-gradient(45deg, #6a5acd, transparent, #6a5acd, transparent, #6a5acd)',
          filter: 'blur(2px)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 3s ease infinite'
        }}></div>
        
        {/* Bouton de fermeture */}
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 z-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-primary/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* En-tête */}
        <div className="relative p-4 border-b border-primary/20">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            <h2 className="text-primary font-valorant text-lg uppercase tracking-wider">Publicité Premium</h2>
          </div>
          <div className="text-white/60 text-xs mt-1">Sponsorisé par nos partenaires</div>
          
          {/* Lignes décoratives */}
          <div className="line-anim-h absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>
        
        {/* Contenu */}
        <div className="p-6 relative">
          <div className="line-anim-v absolute top-0 left-0 w-[1px] h-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
          <div className="line-anim-v absolute top-0 right-0 w-[1px] h-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
          
          <div 
            ref={adContainerRef}
            className="bg-gradient-to-br from-black/60 to-primary/10 p-6 rounded-lg flex flex-col items-center mb-4 relative overflow-hidden"
          >
            {/* Effet de scan light */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'skewX(-20deg) translateX(-100%)',
                animation: 'scanlight 3s ease-in-out infinite'
              }}
            ></div>
            
            <span className="text-primary text-xs font-valorant uppercase mb-2 tracking-widest">Offre Spéciale</span>
            <div className="relative h-[250px] w-full border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.8), rgba(40, 25, 90, 0.4))',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3) inset'
              }}
            >
              {/* Coins avec accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/70"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/70"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/70"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/70"></div>
              
              <div className="text-center p-4 relative z-10">
                <h3 className="text-primary font-valorant text-xl mb-2">ESPACE PUBLICITAIRE</h3>
                <p className="text-white/80 text-sm mb-3">Format Rectangle (300×250)</p>
                <div className="inline-block bg-primary/20 backdrop-blur-sm px-3 py-1 rounded text-white text-sm border border-primary/30 hover:bg-primary/30 transition-colors duration-300 cursor-pointer">
                  <span className="font-valorant text-xs">RÉSERVER CET ESPACE</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={closePopup}
              className="text-white/70 text-sm hover:text-white bg-black/30 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-black/50"
            >
              Fermer
            </button>
            <p className="text-xs text-gray-500">Apparaît après 15s de navigation</p>
          </div>
        </div>
        
        {/* Bas de page avec ligne décorative */}
        <div className="relative">
          <div className="line-anim-h absolute top-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>
      </div>
      
      {/* Styles globaux pour les animations */}
      <style jsx="true">{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes scanlight {
          0% { transform: skewX(-20deg) translateX(-100%); }
          100% { transform: skewX(-20deg) translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default PopupAd; 