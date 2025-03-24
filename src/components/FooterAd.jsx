import React, { useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour un emplacement publicitaire dans le footer, amélioré avec des animations
 * et un design plus adapté à l'univers gaming
 */
const FooterAd = () => {
  const { showAds } = useAds();
  const adContainerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Animer l'apparition de la publicité
  useEffect(() => {
    if (showAds && adContainerRef.current) {
      // Animation d'entrée
      gsap.fromTo(
        adContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      
      // Animation du contenu
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" }
      );
      
      // Animation du bouton
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.5, ease: "power2.out" }
      );
      
      // Animation de la brillance
      gsap.to(".shimmer-effect", {
        x: "100%",
        duration: 2.5,
        repeat: -1,
        ease: "power1.inOut",
        delay: 1
      });
    }
  }, [showAds]);
  
  if (!showAds) return null;
  
  return (
    <div 
      ref={adContainerRef} 
      className="w-full py-6 bg-gradient-to-r from-black via-primary/5 to-black relative overflow-hidden"
    >
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" style={{ animationDuration: '3.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef}
          className="relative w-full rounded-lg border border-primary/30 py-4 px-6 flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.9), rgba(40, 30, 80, 0.4))',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(106, 90, 205, 0.1) inset'
          }}
        >
          {/* Effet de brillance qui traverse */}
          <div 
            className="shimmer-effect absolute top-0 -left-full w-1/2 h-full"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              transform: 'skewX(-20deg)'
            }}
          ></div>
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse"></div>
              <p className="text-primary font-valorant text-sm uppercase tracking-wider">Emplacement Sponsorisé</p>
            </div>
            <h3 className="text-white text-lg md:text-xl mt-1 font-medium">Votre marque gaming mise en avant</h3>
            <p className="text-white/60 text-sm mt-1 max-w-md">Format billboard (970×250) · Haute visibilité</p>
          </div>
          
          <div ref={buttonRef} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-md blur-sm group-hover:bg-primary/30 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-primary/30 to-violet-800/30 backdrop-blur-sm px-4 py-2 rounded-md border border-primary/20 text-white text-sm transition-all duration-300 hover:border-primary/50">
                <span className="font-valorant tracking-wide">RÉSERVER</span>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-md blur-sm group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10 text-white text-sm transition-all duration-300 hover:border-white/20">
                <span className="font-valorant tracking-wide">TARIFS & INFO</span>
              </div>
            </div>
          </div>
          
          {/* Accents décoratifs */}
          <div className="absolute top-0 left-0 h-[2px] w-20 bg-gradient-to-r from-primary to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-[2px] w-20 bg-gradient-to-l from-primary to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default FooterAd; 