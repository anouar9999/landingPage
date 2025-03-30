import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import gsap from 'gsap';
import { Info, X } from 'lucide-react';

/**
 * Composant pour un popup publicitaire modal avec design gaming avancé
 * Intégré avec le mode de démonstration
 */
const PopupAd = () => {
  const { showAds } = useAds();
  const [isVisible, setIsVisible] = useState(false);
  const [adOptions, setAdOptions] = useState({ popups: true });
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const adContainerRef = useRef(null);
  
  // Écouter les changements d'options de publicité
  useEffect(() => {
    const handleOptionsChange = (event) => {
      setAdOptions(event.detail.options);
    };
    
    window.addEventListener('adOptionsChanged', handleOptionsChange);
    
    // Charger les options au montage
    const storedOptions = localStorage.getItem('mge_ad_options');
    if (storedOptions) {
      try {
        setAdOptions(JSON.parse(storedOptions));
      } catch (e) {
        console.error('Erreur lors du chargement des options de publicité:', e);
      }
    }
    
    return () => {
      window.removeEventListener('adOptionsChanged', handleOptionsChange);
    };
  }, []);
  
  // Animation d'entrée et sortie
  useEffect(() => {
    if (isVisible && popupRef.current && contentRef.current) {
      // Fond avec flou progressif
      gsap.to(popupRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        duration: 0.6,
        ease: "power2.out"
      });
      
      // Animation du contenu
      gsap.fromTo(contentRef.current, 
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      // Animation des bordures
      gsap.fromTo(".border-glow", 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "elastic.out(1, 0.8)" }
      );
      
      // Animation des particules
      gsap.to(".particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        opacity: "random(0.3, 0.8)",
        scale: "random(0.8, 1.2)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      });
      
      // Animation du contenu publicitaire
      gsap.fromTo(adContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power3.out" }
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
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };
  
  // Ouvrir manuellement le popup via le contexte global
  useEffect(() => {
    const handleOpenPopup = () => {
      if (showAds && adOptions.popups) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('openDemoPopup', handleOpenPopup);
    
    return () => {
      window.removeEventListener('openDemoPopup', handleOpenPopup);
    };
  }, [showAds, adOptions.popups]);
  
  // Si publicités désactivées ou popups spécifiquement désactivés, ne rien afficher
  if (!showAds || !adOptions.popups || !isVisible) return null;
  
  return (
    <div 
      ref={popupRef}
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={(e) => {
        if (e.target === popupRef.current) closePopup();
      }}
    >
      {/* Particules d'ambiance en fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="particle absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50 + 50}, ${Math.random() * 200 + 55}, ${Math.random() * 0.3 + 0.2})`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      <div 
        ref={contentRef}
        className="relative bg-gradient-to-br from-[#0a0a14] to-[#1a1a2e] rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(106, 90, 205, 0.15)' }}
      >
        {/* Bannière mode démo */}
        <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-1 z-50">
          Mode Démonstration - Exemple de Popup
        </div>
        
        {/* Bouton de fermeture */}
        <button 
          onClick={closePopup}
          className="absolute top-8 right-3 text-gray-400 hover:text-white p-1 z-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-600/30"
        >
          <X size={20} />
        </button>
        
        {/* En-tête */}
        <div className="relative p-4 mt-6 border-b border-blue-500/20">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <h2 className="text-blue-500 font-bold text-lg uppercase tracking-wider">Espace Publicitaire</h2>
          </div>
          <div className="text-white/60 text-xs mt-1">Exemple de popup pour démonstration</div>
        </div>
        
        {/* Contenu */}
        <div className="p-6 relative">
          <div 
            ref={adContainerRef}
            className="bg-gradient-to-br from-black/60 to-blue-500/10 p-6 rounded-lg flex flex-col items-center mb-4 relative overflow-hidden"
          >
            {/* Effet de scan light */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'skewX(-20deg) translateX(-100%)',
                animation: 'scanlight 3s ease-in-out infinite'
              }}
            ></div>
            
            <div className="relative h-[220px] w-full border border-blue-500/30 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.8), rgba(25, 40, 90, 0.4))',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3) inset'
              }}
            >
              <div className="text-center p-4 relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Info size={40} className="text-blue-400" />
                </div>
                
                <h3 className="text-white font-bold text-xl mb-2">DÉMONSTRATION</h3>
                <p className="text-white/80 text-sm mb-4">
                  Cet espace est prévu pour les communications importantes du Ministère.
                  <br /><br />
                  Pas de publicités commerciales sur ce site.
                </p>
                
                <div className="inline-block bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded text-white text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-300 cursor-pointer">
                  <span className="text-xs font-bold">FERMER</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={closePopup}
              className="text-white/70 text-sm hover:text-white bg-black/30 px-3 py-1 rounded-md transition-colors duration-300 hover:bg-black/50"
            >
              Fermer la démo
            </button>
            <p className="text-xs text-gray-500">Mode démonstration uniquement</p>
          </div>
        </div>
      </div>
      
      {/* Styles globaux pour les animations */}
      <style jsx="true">{`
        @keyframes scanlight {
          0% { transform: skewX(-20deg) translateX(-100%); }
          100% { transform: skewX(-20deg) translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default PopupAd; 