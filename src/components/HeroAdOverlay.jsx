import React, { useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour afficher des emplacements publicitaires premium sur le Hero
 */
const HeroAdOverlay = () => {
  const { showAds } = useAds();
  const watermarkRef = useRef(null);
  const cornerRef = useRef(null);
  const bannerRef = useRef(null);
  const leaderboardRef = useRef(null);
  
  // Animer les emplacements publicitaires lors de leur apparition
  useEffect(() => {
    if (showAds) {
      // Animation du watermark
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.2 },
        { opacity: 0.15, scale: 1, duration: 1.2, ease: "power2.out" }
      );
      
      // Animation du corner
      gsap.fromTo(
        cornerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
      
      // Animation du banner en bas
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      
      // Animation du leaderboard sur le côté
      gsap.fromTo(
        leaderboardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [showAds]);
  
  if (!showAds) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Watermark en fond */}
      <div 
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '150px',
          color: '#D7C6AF',
          textTransform: 'uppercase',
          letterSpacing: '10px',
          transform: 'rotate(-5deg)',
          mixBlendMode: 'overlay',
          userSelect: 'none',
          opacity: 0 // Géré par GSAP
        }}
      >
        <span className="relative">
          <span>Publicité</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-70 blur-sm" style={{ mixBlendMode: 'overlay' }}></div>
        </span>
      </div>
      
      {/* Emplacement Top-Right (Advertorial corner) */}
      <div 
        ref={cornerRef}
        className="absolute top-5 right-5 bg-gradient-to-r from-black/80 to-primary/20 backdrop-blur-md px-4 py-2 rounded-md border-l-2 border-primary"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '12px',
          color: '#D7C6AF',
          opacity: 0 // Géré par GSAP
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/80 uppercase tracking-wider">SPONSORISÉ</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div className="text-xs mt-1 text-primary/80">Format 300×60</div>
      </div>
      
      {/* Emplacement Left-Side (Leaderboard vertical) */}
      <div 
        ref={leaderboardRef}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-[120px] h-[600px] border-2 border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center"
        style={{
          background: 'rgba(10, 10, 20, 0.7)',
          backdropFilter: 'blur(5px)',
          opacity: 0 // Géré par GSAP
        }}
      >
        <div className="rotate-90 text-center whitespace-nowrap">
          <div className="font-valorant text-lg text-primary mb-1">EMPLACEMENT PUBLICITAIRE</div>
          <div className="text-xs text-white/70">Skyscraper (120×600)</div>
        </div>
        
        {/* Bord lumineux animé */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'shimmer 2s infinite' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'shimmer 2s infinite reverse' }}></div>
          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent" style={{ animation: 'shimmerVertical 2s infinite' }}></div>
          <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent" style={{ animation: 'shimmerVertical 2s infinite reverse' }}></div>
        </div>
      </div>
      
      {/* Bannière horizontale bas (style gaming futuriste) */}
      <div 
        ref={bannerRef}
        className="absolute bottom-5 left-0 right-0 backdrop-blur-md flex items-center justify-center z-[25]"
        style={{ opacity: 0 }} // Géré par GSAP
      >
        <div 
          className="relative h-18 w-full max-w-5xl mx-4 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(to right, rgba(10, 10, 20, 0.7), rgba(50, 30, 80, 0.5), rgba(10, 10, 20, 0.7))',
            boxShadow: '0 0 20px rgba(215, 198, 175, 0.2)',
          }}
        >
          {/* Contenu de la bannière */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 h-full">
            <div>
              <div className="font-valorant text-lg text-primary tracking-wide uppercase">Emplacement Premium</div>
              <div className="text-xs text-white/70">Format Leaderboard (970×90)</div>
            </div>
            
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded text-white text-xs border border-primary/20">
                RÉSERVER CET ESPACE
              </div>
              <div className="h-4 w-px bg-primary/30"></div>
              <div className="text-primary/70 text-xs">TARIFS & INFOS</div>
            </div>
          </div>
          
          {/* Effet de bordure animée */}
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
            <div className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent w-full" style={{ animation: 'shimmer 3s infinite' }}></div>
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent" style={{ animation: 'shimmerVertical 3s infinite' }}></div>
            <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent" style={{ animation: 'shimmerVertical 3s infinite reverse' }}></div>
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