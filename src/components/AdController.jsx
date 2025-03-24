import React, { useState, useEffect, useRef } from 'react';
import { useAdContext } from '../contexts/AdContext';
import gsap from 'gsap';
import './AdController.scss';

/**
 * Composant de contrôle des emplacements publicitaires
 * Ajoute un bouton en bas de l'écran pour montrer/cacher les emplacements
 */
const AdController = () => {
  const { adsVisible, isFirstLoad, toggleAdsVisibility } = useAdContext();
  const [showTip, setShowTip] = useState(false);
  const buttonRef = useRef(null);
  const tipRef = useRef(null);
  const iconRef = useRef(null);
  
  // Effet pour animer le bouton lors du premier chargement ou changement d'état
  useEffect(() => {
    if (buttonRef.current) {
      // Animation initiale du bouton
      gsap.fromTo(
        buttonRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 1 }
      );
      
      // Animation de l'icône en fonction de l'état
      gsap.to(iconRef.current, {
        rotate: adsVisible ? 180 : 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  }, [adsVisible]);
  
  // Gérer l'affichage du tooltip
  const handleMouseEnter = () => {
    setShowTip(true);
    
    if (tipRef.current) {
      gsap.fromTo(
        tipRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };
  
  const handleMouseLeave = () => {
    if (tipRef.current) {
      gsap.to(
        tipRef.current,
        { 
          opacity: 0, 
          y: 10, 
          duration: 0.2, 
          ease: "power2.in",
          onComplete: () => setShowTip(false)
        }
      );
    } else {
      setShowTip(false);
    }
  };
  
  // Gérer le clic sur le bouton
  const handleToggleClick = () => {
    // Animation du clic
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power1.in",
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        
        // Animation de rotation de l'icône
        gsap.to(iconRef.current, {
          rotate: !adsVisible ? 180 : 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
        
        // Animation de pulsation si c'est la première activation
        if (isFirstLoad && !adsVisible) {
          gsap.to(buttonRef.current, {
            boxShadow: '0 0 0 6px rgba(109, 40, 217, 0.3)',
            repeat: 2,
            duration: 0.5,
            yoyo: true
          });
        }
        
        // Basculer la visibilité
        toggleAdsVisibility();
      }
    });
  };
  
  return (
    <div className="ad-controller-container">
      <button 
        ref={buttonRef}
        className={`ad-toggle-button ${adsVisible ? 'active' : ''}`}
        onClick={handleToggleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Basculer l'affichage des publicités"
      >
        <span className="ad-toggle-icon" ref={iconRef}>
          {adsVisible ? "✓" : "✗"}
        </span>
        <span className="ad-toggle-text">
          {adsVisible ? "Masquer les pubs" : "Voir les pubs"}
        </span>
      </button>
      
      {showTip && (
        <div className="ad-tooltip" ref={tipRef}>
          {adsVisible 
            ? "Cliquez pour masquer les emplacements publicitaires" 
            : "Cliquez pour voir les emplacements publicitaires disponibles"}
        </div>
      )}
    </div>
  );
};

export default AdController;

// Ajouter des keyframes pour l'animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes highlight {
  0%, 100% { border-color: rgba(215, 198, 175, 0.3); }
  50% { border-color: rgba(215, 198, 175, 0.9); box-shadow: 0 0 15px rgba(215, 198, 175, 0.5); }
}
`;
document.head.appendChild(style); 