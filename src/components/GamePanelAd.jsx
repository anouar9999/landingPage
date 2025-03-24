import React, { useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant publicitaire qui s'affiche parmi les panneaux de jeux
 * dans un style similaire mais distinctement identifié comme publicité
 */
const GamePanelAd = ({ isMobile = false, index = 0 }) => {
  const { showAds } = useAds();
  const adRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  
  // Animation à l'affichage
  useEffect(() => {
    if (showAds && adRef.current) {
      // Animation de base du panneau
      gsap.fromTo(
        adRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 * index, ease: "power2.out" }
      );
      
      // Animation de l'effet de lueur
      gsap.fromTo(
        glowRef.current,
        { opacity: 0 },
        { 
          opacity: 0.7, 
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );
      
      // Animation du contenu
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.3 + 0.1 * index, ease: "back.out(1.7)" }
      );
    }
  }, [showAds, index]);
  
  if (!showAds) return null;
  
  // Classes CSS en fonction du mode mobile ou desktop
  const panelClasses = isMobile
    ? "mobile-game-panel relative min-w-[200px] h-[350px] overflow-hidden rounded-2xl"
    : `desktop-game-panel game-panel-clickable relative flex-1 ${index % 2 === 0 ? "mt-0" : "mt-16"} h-[450px] lg:h-[500px] max-w-[270px] lg:max-w-[350px] overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 group`;
  
  return (
    <div
      ref={adRef}
      className={panelClasses}
    >
      {/* Fond avec effet de gradient animé */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradientBG 8s ease infinite',
        }}
      ></div>
      
      {/* Effet de lueur */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-primary/20 blur-md"
        style={{ opacity: 0 }}
      ></div>
      
      {/* Grille d'arrière-plan de style cyberpunk/gaming */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(106, 90, 205, .3) 25%, rgba(106, 90, 205, .3) 26%, transparent 27%, transparent 74%, rgba(106, 90, 205, .3) 75%, rgba(106, 90, 205, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(106, 90, 205, .3) 25%, rgba(106, 90, 205, .3) 26%, transparent 27%, transparent 74%, rgba(106, 90, 205, .3) 75%, rgba(106, 90, 205, .3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
      ></div>
      
      {/* Badge "Publicité" */}
      <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-lg z-10">
        <h2 className="text-white uppercase font-valorant text-sm">Sponsorisé</h2>
      </div>
      
      {/* Contenu de la publicité */}
      <div 
        ref={contentRef} 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
      >
        <div className="text-center">
          <div className="font-valorant text-white text-2xl mb-3">VOTRE PUB ICI</div>
          <div className="text-primary/90 text-sm font-medium mb-6">Format Premium Gaming</div>
          
          <div className="relative mx-auto w-32 h-32 mb-4 border-2 border-dashed border-primary/40 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border border-primary animate-ping opacity-20"></div>
            </div>
            <div className="font-valorant text-primary text-lg">LOGO</div>
          </div>
          
          <div className="relative mt-auto">
            <button className="bg-primary/30 border border-primary/50 text-white text-sm px-5 py-1.5 rounded-full hover:bg-primary/50 transition-all backdrop-blur-sm">
              <span className="font-valorant">RÉSERVEZ</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Effet de scanline - style rétro/gaming */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.25) 100%)',
          backgroundSize: '100% 4px'
        }}
      ></div>
      
      {/* Style pour les animations */}
      <style jsx="true">{`
        @keyframes gradientBG {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </div>
  );
};

export default GamePanelAd; 