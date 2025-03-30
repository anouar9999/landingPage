import React, { useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import gsap from 'gsap';

/**
 * Composant pour afficher des emplacements publicitaires premium sur le Hero
 * Amélioré avec des animations plus subtiles et des effets visuels plus élégants
 */
const HeroAdOverlay = () => {
  const { isAdTypeEnabled } = useAds();
  const watermarkRef = useRef(null);
  const cornerRef = useRef(null);
  const bannerRef = useRef(null);
  const leaderboardRef = useRef(null);
  
  // Animer les emplacements publicitaires lors de leur apparition
  useEffect(() => {
    if (isAdTypeEnabled('hero')) {
      // Animation du watermark avec une échelle plus naturelle
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.12, scale: 1, duration: 1.5, ease: "power2.out" }
      );
      
      // Animation du corner avec un léger rebond
      gsap.fromTo(
        cornerRef.current,
        { opacity: 0, y: -20, x: 10 },
        { opacity: 1, y: 0, x: 0, duration: 0.7, ease: "back.out(1.5)" }
      );
      
      // Animation du banner en bas avec un effet de glissement
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      
      // Animation du leaderboard sur le côté avec un effet de glissement et rotation subtile
      gsap.fromTo(
        leaderboardRef.current,
        { opacity: 0, x: -30, rotation: -1 },
        { opacity: 1, x: 0, rotation: 0, duration: 0.7, ease: "power2.out", delay: 0.4 }
      );
    }
  }, [isAdTypeEnabled]);
  
  if (!isAdTypeEnabled('hero')) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Watermark en fond avec effet de brillance subtil */}
      <div 
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '160px',
          color: '#D7C6AF',
          textTransform: 'uppercase',
          letterSpacing: '12px',
          transform: 'rotate(-5deg)',
          mixBlendMode: 'overlay',
          userSelect: 'none',
          opacity: 0, // Géré par GSAP
          filter: 'blur(1px)', // Effet de flou légèrement plus subtil
        }}
      >
        <span className="relative">
          <span>Publicité</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-70 animate-pulse" style={{ mixBlendMode: 'overlay' }}></div>
        </span>
      </div>
      
      {/* Emplacement Top-Right (Advertorial corner) - Design amélioré */}
      <div 
        ref={cornerRef}
        className="absolute top-5 right-5 bg-gradient-to-r from-black/80 to-primary/10 backdrop-blur-md px-4 py-2 rounded-md border-l-2 border-primary shadow-lg"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '12px',
          color: '#D7C6AF',
          opacity: 0, // Géré par GSAP
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3), 0 0 5px rgba(215, 198, 175, 0.2)'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/90 uppercase tracking-wider">SPONSORISÉ</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div className="text-xs mt-1 text-primary/90">Format 300×60</div>
      </div>
      
      {/* Emplacement Left-Side (Leaderboard vertical) - Design amélioré */}
      <div 
        ref={leaderboardRef}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-[120px] h-[600px] border border-primary/30 rounded-lg flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.8), rgba(25, 20, 40, 0.6))',
          backdropFilter: 'blur(7px)',
          opacity: 0, // Géré par GSAP
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(215, 198, 175, 0.1) inset'
        }}
      >
        <div className="rotate-90 text-center whitespace-nowrap">
          <div className="font-valorant text-lg text-primary mb-1">EMPLACEMENT PUBLICITAIRE</div>
          <div className="text-xs text-white/70">Skyscraper (120×600)</div>
        </div>
        
        {/* Effets de brillance améliorés */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" style={{ animation: 'shimmer 3s infinite ease-in-out' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" style={{ animation: 'shimmer 3s infinite ease-in-out reverse' }}></div>
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/80 to-transparent" style={{ animation: 'shimmerVertical 3s infinite ease-in-out' }}></div>
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/80 to-transparent" style={{ animation: 'shimmerVertical 3s infinite ease-in-out reverse' }}></div>
        </div>
        
        {/* Motif géométrique subtil en fond */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, rgba(215, 198, 175, 0.6) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Bannière horizontale bas (style gaming futuriste) - Design amélioré */}
      <div 
        ref={bannerRef}
        className="absolute bottom-5 left-0 right-0 backdrop-blur-md flex items-center justify-center z-[25]"
        style={{ opacity: 0 }} // Géré par GSAP
      >
        <div 
          className="relative h-20 w-full max-w-5xl mx-4 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(to right, rgba(10, 10, 20, 0.8), rgba(40, 25, 60, 0.6), rgba(10, 10, 20, 0.8))',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(215, 198, 175, 0.15) inset',
          }}
        >
          {/* Contenu de la bannière */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 h-full">
            <div>
              <div className="font-valorant text-lg text-primary tracking-wide uppercase">Emplacement Premium</div>
              <div className="text-xs text-white/70">Format Leaderboard (970×90)</div>
            </div>
            
            <div className="flex items-center gap-3 mt-2 md:mt-0">
              <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded text-white text-xs border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                RÉSERVER CET ESPACE
              </div>
              <div className="h-6 w-px bg-primary/30"></div>
              <div className="text-primary text-xs hover:text-primary/80 transition-colors cursor-pointer">TARIFS & INFOS</div>
            </div>
          </div>
          
          {/* Effet de bordure animée amélioré */}
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/90 to-transparent w-full" style={{ animation: 'shimmer 4s infinite ease-in-out' }}></div>
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/70 to-transparent" style={{ animation: 'shimmerVertical 4s infinite ease-in-out' }}></div>
            <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/70 to-transparent" style={{ animation: 'shimmerVertical 4s infinite ease-in-out reverse' }}></div>
            
            {/* Effet de particules subtil */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/80 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-primary/80 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Styles pour les animations */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmerVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default HeroAdOverlay; 