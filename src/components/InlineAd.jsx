import React, { useRef, useEffect } from 'react';
import { useAds } from '../contexts/AdContext';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

/**
 * Composant pour un emplacement publicitaire au milieu du contenu (728x90)
 * Adapté pour la séparation des sections importantes
 */
const InlineAd = ({ className = "", onClose }) => {
  const { isAdTypeEnabled } = useAds();
  const { t, getTextClass } = useTranslation();
  const adRef = useRef(null);
  
  // Animation d'entrée avec effet de fondu
  useEffect(() => {
    if (isAdTypeEnabled('inline') && adRef.current) {
      gsap.fromTo(
        adRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isAdTypeEnabled]);
  
  // Si le type d'annonce est désactivé, ne rien afficher
  if (!isAdTypeEnabled('inline')) return null;
  
  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-r from-black/80 via-[#16213e]/80 to-black/80 backdrop-blur-md ad-container inline-ad mx-auto my-8 ${className}`}
      style={{ 
        maxWidth: '728px',
        height: '90px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        zIndex: 30
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
            gsap.to(adRef.current, {
              opacity: 0,
              y: 10,
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
      
      {/* Contenu de l'annonce */}
      <div className="w-full h-full flex items-center p-4">
        {/* Logo ou image */}
        <div className="h-full aspect-square rounded overflow-hidden flex items-center justify-center mr-4">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-16 w-16 object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80?text=MGE";
            }}
          />
        </div>
        
        {/* Texte */}
        <div className="flex-1">
          <h3 className="text-white text-sm font-bold">
            {t('ads.gamingTournament')}
          </h3>
          <p className="text-white/70 text-xs max-w-xs line-clamp-2">
            {t('ads.registerAndCompete')}
          </p>
        </div>
        
        {/* CTA */}
        <a 
          href="https://mgexpo.ma/tournaments" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/80 text-black text-xs font-bold px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ml-4"
        >
          {t('ads.joinNow')}
        </a>
      </div>
      
      {/* Effet de dégradé animé */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          backgroundSize: '200% 100%',
          animation: 'gradient-move 2s ease infinite'
        }}
      />
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 100% 0%; }
          100% { background-position: -100% 0%; }
        }
      `}</style>
    </div>
  );
};

export default InlineAd; 