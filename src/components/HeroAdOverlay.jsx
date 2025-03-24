import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour afficher une publicité en fond ou en overlay sur le Hero
 */
const HeroAdOverlay = () => {
  const { showAds } = useAds();
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);
  const overlayRef = useRef(null);
  const labelRefs = useRef([]);
  
  useEffect(() => {
    if (showAds && overlayRef.current) {
      // Animation de fondu
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      );
      
      // Animation des étiquettes avec décalage
      gsap.fromTo(labelRefs.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 0.5, 
          delay: 0.5,
          ease: 'back.out(1.7)' 
        }
      );
      
      // Activer l'interaction après un délai
      const timer = setTimeout(() => {
        setIsInteractionEnabled(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showAds]);
  
  // Fonction pour ajouter une référence à un élément d'étiquette
  const addToRefs = (el) => {
    if (el && !labelRefs.current.includes(el)) {
      labelRefs.current.push(el);
    }
  };
  
  // Montrer le tooltip d'un label
  const showTooltip = (index) => {
    if (!isInteractionEnabled) return;
    
    gsap.to(`.tooltip-${index}`, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  // Cacher le tooltip d'un label
  const hideTooltip = (index) => {
    if (!isInteractionEnabled) return;
    
    gsap.to(`.tooltip-${index}`, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in'
    });
  };
  
  if (!showAds) return null;
  
  return (
    <div 
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none z-10"
    >
      {/* Watermark en fond */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-15"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '120px',
          color: '#D7C6AF',
          textTransform: 'uppercase',
          letterSpacing: '10px',
          transform: 'rotate(-5deg)',
          mixBlendMode: 'overlay',
          userSelect: 'none'
        }}
      >
        <span>Publicité</span>
      </div>
      
      {/* Points informatifs */}
      <div ref={addToRefs} className="absolute top-32 left-1/4 flex flex-col items-start pointer-events-auto">
        <div 
          className="relative bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-primary/40 mb-2 cursor-pointer"
          onMouseEnter={() => showTooltip(1)}
          onMouseLeave={() => hideTooltip(1)}
          style={{ 
            fontFamily: "'Valorant', sans-serif",
            fontSize: '12px',
            color: '#D7C6AF',
          }}
        >
          Publicité Premium
          
          {/* Tooltip */}
          <div className="tooltip-1 absolute left-full ml-2 top-0 bg-black/90 backdrop-blur-md p-3 rounded-md border border-primary/30 w-60 opacity-0 translate-y-3 transition-opacity shadow-lg">
            <h4 className="text-primary text-sm font-bold mb-1">Zone Premium</h4>
            <p className="text-white/80 text-xs">Emplacement de prestige en visibilité maximale. CTR moyen supérieur à 3%. Tarif: 4000-6000 DH/mois.</p>
          </div>
        </div>
      </div>
      
      {/* Deuxième point */}
      <div ref={addToRefs} className="absolute top-60 right-1/3 flex flex-col items-start pointer-events-auto">
        <div 
          className="relative bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-primary/40 mb-2 cursor-pointer"
          onMouseEnter={() => showTooltip(2)}
          onMouseLeave={() => hideTooltip(2)}
          style={{ 
            fontFamily: "'Valorant', sans-serif",
            fontSize: '12px',
            color: '#D7C6AF',
          }}
        >
          Billboard
          
          {/* Tooltip */}
          <div className="tooltip-2 absolute right-full mr-2 top-0 bg-black/90 backdrop-blur-md p-3 rounded-md border border-primary/30 w-60 opacity-0 translate-y-3 transition-opacity shadow-lg">
            <h4 className="text-primary text-sm font-bold mb-1">Billboard (970×250)</h4>
            <p className="text-white/80 text-xs">Format premium hautement visible. Idéal pour les campagnes à fort impact et la notoriété de marque.</p>
          </div>
        </div>
      </div>
      
      {/* Troisième point */}
      <div ref={addToRefs} className="absolute bottom-28 left-1/3 flex flex-col items-start pointer-events-auto">
        <div 
          className="relative bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-primary/40 mb-2 cursor-pointer"
          onMouseEnter={() => showTooltip(3)}
          onMouseLeave={() => hideTooltip(3)}
          style={{ 
            fontFamily: "'Valorant', sans-serif",
            fontSize: '12px',
            color: '#D7C6AF',
          }}
        >
          Habillage
          
          {/* Tooltip */}
          <div className="tooltip-3 absolute left-0 top-full mt-2 bg-black/90 backdrop-blur-md p-3 rounded-md border border-primary/30 w-60 opacity-0 translate-y-3 transition-opacity shadow-lg">
            <h4 className="text-primary text-sm font-bold mb-1">Habillage complet</h4>
            <p className="text-white/80 text-xs">Personnalisation complète du fond de la page hero. Maximum d'impact visuel et mémorisation exceptionnelle.</p>
          </div>
        </div>
      </div>
      
      {/* Advertorial corner */}
      <div ref={addToRefs}
        className="absolute top-5 right-5 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md border border-primary/20 pointer-events-auto cursor-pointer"
        onMouseEnter={() => showTooltip(4)}
        onMouseLeave={() => hideTooltip(4)}
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '12px',
          color: '#D7C6AF',
        }}
      >
        Publicité ➔ Sponsorisé
        
        {/* Tooltip */}
        <div className="tooltip-4 absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md p-3 rounded-md border border-primary/30 w-60 opacity-0 translate-y-3 transition-opacity shadow-lg">
          <h4 className="text-primary text-sm font-bold mb-1">Indication obligatoire</h4>
          <p className="text-white/80 text-xs">Toute publicité doit être clairement identifiée selon la réglementation en vigueur pour la transparence envers les utilisateurs.</p>
        </div>
      </div>
      
      {/* Bandeau horizontal bas */}
      <div ref={addToRefs}
        className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-sm bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center pointer-events-auto"
        onMouseEnter={() => showTooltip(5)}
        onMouseLeave={() => hideTooltip(5)}
      >
        <div
          className="h-16 w-full max-w-5xl mx-4 border-2 border-dashed border-primary/40 rounded flex items-center justify-center relative cursor-pointer"
          style={{
            background: 'rgba(20, 20, 30, 0.7)',
            fontFamily: "'Valorant', sans-serif",
            color: '#D7C6AF',
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-lg">Emplacement Publicitaire Premium</div>
            <div className="text-xs">Bandeau Hero (1200×120)</div>
          </div>
          
          {/* Tooltip */}
          <div className="tooltip-5 absolute left-1/2 -translate-x-1/2 bottom-full mb-4 bg-black/90 backdrop-blur-md p-3 rounded-md border border-primary/30 w-72 opacity-0 translate-y-3 transition-opacity shadow-lg">
            <h4 className="text-primary text-sm font-bold mb-1">Bandeau Héro Premium</h4>
            <p className="text-white/80 text-xs mb-2">Emplacement à très haute visibilité avec un taux d'engagement exceptionnel.</p>
            <div className="flex justify-between text-xs">
              <span className="text-white/60">Tarif: 3500-5000 DH/mois</span>
              <span className="text-primary">CTR moyen: 1.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAdOverlay; 