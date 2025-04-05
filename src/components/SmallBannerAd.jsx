import React, { useRef, useEffect } from 'react';
import { useAds } from '../contexts/AdContext';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

/**
 * Composant pour une bannière publicitaire en format compact (300x60)
 * Conçu pour s'afficher dans les espaces restreints comme sous le header
 */
const SmallBannerAd = ({ className = "", onClose }) => {
  const { isAdTypeEnabled } = useAds();
  const { t, getTextClass } = useTranslation();
  const adRef = useRef(null);
  
  // Animation d'entrée
  useEffect(() => {
    if (isAdTypeEnabled('small') && adRef.current) {
      gsap.fromTo(
        adRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      
      // Animation de pulsation pour attirer l'attention
      const pulseTimeline = gsap.timeline({repeat: 2});
      pulseTimeline.to(adRef.current, {
        scale: 1.03,
        duration: 0.5,
        ease: "power1.inOut"
      }).to(adRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut"
      });
    }
  }, [isAdTypeEnabled]);
  
  // Animation pour le texte défilant
  useEffect(() => {
    const textElements = document.querySelectorAll('.scrolling-text');
    if (textElements.length > 0) {
      textElements.forEach(el => {
        // Vérifier si le texte est plus large que son conteneur
        if (el.scrollWidth > el.clientWidth) {
          gsap.to(el, {
            x: -(el.scrollWidth - el.clientWidth + 10),
            duration: 5,
            ease: "linear",
            repeat: -1,
            repeatDelay: 1,
            yoyo: true
          });
        }
      });
    }
  }, []);
  
  // Si le type d'annonce est désactivé, ne rien afficher
  if (!isAdTypeEnabled('small')) return null;
  
  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden rounded-md border border-primary/20 bg-gradient-to-r from-black/90 to-[#16213e]/90 backdrop-blur-sm ad-container small-banner-ad ${className}`}
      style={{ 
        width: '300px',
        height: '60px',
        boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.3)',
        zIndex: 40
      }}
    >
      {/* Label Pub discret */}
      <div className="absolute top-0 left-0 px-1.5 py-0.5 bg-primary/80 rounded-br-sm z-10">
        <span className="text-black text-[8px] font-bold uppercase">Ad</span>
      </div>
      
      {/* Bouton de fermeture minimal */}
      <button 
        className="absolute top-1 right-1 bg-black/60 hover:bg-primary text-white/90 hover:text-black rounded-full p-0.5 z-30 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          if (adRef.current) {
            gsap.to(adRef.current, {
              opacity: 0,
              y: -20,
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
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Contenu de l'annonce avec effet de brillance */}
      <div className="w-full h-full flex items-center p-2">
        {/* Logo ou image avec rotation subtile au survol */}
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden transform transition-transform duration-300 hover:rotate-12">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40?text=MGE";
            }}
          />
        </div>
        
        {/* Texte avec animation de défilement si trop long */}
        <div className="flex-1 ml-2 overflow-hidden">
          <h4 className="text-white text-xs font-bold truncate">
            <span className="scrolling-text inline-block whitespace-nowrap">
              {t('ads.sponsoredMessage')}
            </span>
          </h4>
          <p className="text-white/70 text-[10px] truncate">
            <span className="scrolling-text inline-block whitespace-nowrap">
              {t('ads.checkOurNewOffers')}
            </span>
          </p>
        </div>
        
        {/* CTA avec effet de brillance */}
        <a 
          href="https://mgexpo.ma" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/90 text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap transition-all duration-300 relative overflow-hidden cta-shine-effect"
        >
          {t('ads.learnMore')}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent shine-overlay"></span>
        </a>
      </div>
      
      {/* Effet de surbrillance subtil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shine 2s linear infinite'
        }}
      />
      <style>{`
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shine-overlay {
          opacity: 0;
          transform: translateX(-100%);
        }
        
        .cta-shine-effect:hover .shine-overlay {
          animation: shine-slide 1.5s ease-in-out infinite;
        }
        
        @keyframes shine-slide {
          0% { opacity: 0; transform: translateX(-100%); }
          20% { opacity: 1; }
          40% { opacity: 0; transform: translateX(100%); }
          100% { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SmallBannerAd; 