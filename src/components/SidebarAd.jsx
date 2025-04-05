import React, { useRef, useEffect } from 'react';
import { useAds } from '../contexts/AdContext';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

/**
 * Composant pour une publicité en format sidebar (160x600)
 * Conçu pour s'afficher sur les côtés des sections principales
 */
const SidebarAd = ({ className = "", onClose, position = "right" }) => {
  const { isAdTypeEnabled } = useAds();
  const { t, getTextClass } = useTranslation();
  const adRef = useRef(null);
  
  // Animation d'entrée avec direction différente selon la position
  useEffect(() => {
    if (isAdTypeEnabled('sidebar') && adRef.current) {
      const direction = position === 'right' ? 20 : -20;
      
      gsap.fromTo(
        adRef.current,
        { x: direction, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isAdTypeEnabled, position]);
  
  // Si le type d'annonce est désactivé, ne rien afficher
  if (!isAdTypeEnabled('sidebar')) return null;
  
  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-b from-black/90 to-[#16213e]/90 backdrop-blur-sm ad-container sidebar-ad ${className}`}
      style={{ 
        width: '160px',
        height: '600px',
        boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.3)',
        zIndex: 40
      }}
    >
      {/* Label Pub */}
      <div className="absolute top-0 left-0 px-2 py-0.5 bg-primary/80 rounded-br-sm z-10">
        <span className="text-black text-[10px] font-bold uppercase">Ad</span>
      </div>
      
      {/* Bouton de fermeture */}
      <button 
        className="absolute top-2 right-2 bg-black/60 hover:bg-primary text-white/90 hover:text-black rounded-full p-1 z-30 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          if (adRef.current) {
            const direction = position === 'right' ? 20 : -20;
            
            gsap.to(adRef.current, {
              opacity: 0,
              x: direction,
              duration: 0.3,
              onComplete: () => {
                if (onClose && typeof onClose === 'function') {
                  onClose();
                }
              }
            });
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Contenu de l'annonce avec effet de brillance */}
      <div className="w-full h-full flex flex-col items-center p-4">
        {/* En-tête */}
        <div className="w-full text-center mb-4">
          <h3 className="text-white text-sm font-bold">
            {t('ads.specialOffer')}
          </h3>
          <p className="text-primary text-xs">
            {t('ads.limitedTimeOffer')}
          </p>
        </div>
        
        {/* Image principale */}
        <div className="w-full h-[300px] rounded overflow-hidden mb-4">
          <img 
            src="/ads/sidebar-game.jpg" 
            alt="Game Promotion" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/160x300?text=Game+Promo";
            }}
          />
        </div>
        
        {/* Description */}
        <div className="w-full text-center mb-4">
          <h4 className="text-white text-xs font-bold mb-1">
            {t('ads.joinTheTournament')}
          </h4>
          <p className="text-white/70 text-[10px] mb-3">
            {t('ads.winExclusivePrizes')}
          </p>
          
          {/* Prix */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-white/50 text-xs line-through">1000 DH</span>
            <span className="text-primary text-lg font-bold">500 DH</span>
          </div>
        </div>
        
        {/* CTA */}
        <a 
          href="https://mgexpo.ma/tournaments" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-primary hover:bg-primary/80 text-black text-xs font-bold py-2 rounded text-center transition-colors duration-300"
        >
          {t('ads.registerNow')}
        </a>
        
        {/* Badge limite */}
        <div className="mt-4 px-3 py-1 bg-white/10 rounded-full">
          <span className="text-white/80 text-[10px]">
            {t('ads.limitedSpots')}
          </span>
        </div>
      </div>
      
      {/* Effet de surbrillance subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundSize: '100% 200%',
          animation: 'shine-vertical 3s linear infinite'
        }}
      />
      <style>{`
        @keyframes shine-vertical {
          0% { background-position: 0 -200%; }
          100% { background-position: 0 200%; }
        }
      `}</style>
    </div>
  );
};

export default SidebarAd; 