import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour un popup publicitaire modal
 */
const PopupAd = () => {
  const { showAds } = useAds();
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  
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
      // Animation d'entrée
      gsap.to(popupRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(5px)',
        duration: 0.5
      });
      
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
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
        y: 30,
        opacity: 0,
        duration: 0.3,
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
    >
      <div 
        ref={contentRef}
        className="relative bg-[#0a0a14] border border-primary/30 rounded-lg shadow-2xl max-w-md w-full mx-4"
      >
        {/* Bouton de fermeture */}
        <button 
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Contenu */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-6 rounded-lg flex flex-col items-center mb-4">
            <span className="text-primary text-xs font-valorant uppercase mb-2">Publicité</span>
            <div className="h-[250px] w-full border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
              style={{ background: 'rgba(20, 20, 30, 0.7)' }}
            >
              <div className="text-center p-4">
                <h3 className="text-primary font-valorant text-xl mb-2">EMPLACEMENT PUBLICITAIRE</h3>
                <p className="text-white/80 text-sm">Fenêtre Modal (300×250)</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={closePopup}
              className="text-white/70 text-sm hover:text-white"
            >
              Fermer
            </button>
            <p className="text-xs text-gray-500">Ce message apparaît après 15s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAd; 