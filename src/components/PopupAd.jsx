import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant pour un popup publicitaire modal avec des animations avancées
 */
const PopupAd = () => {
  const { showAds } = useAds();
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const [activeDemo, setActiveDemo] = useState('rectangle');
  
  // Montrer le popup après un délai
  useEffect(() => {
    let timeoutId;
    
    if (showAds) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 15000); // 15 secondes
    } else {
      setIsVisible(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showAds]);
  
  // Animation d'entrée et sortie
  useEffect(() => {
    if (isVisible && popupRef.current && contentRef.current && overlayRef.current) {
      // Animation d'entrée
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(5px)',
        duration: 0.5,
        ease: 'power2.inOut'
      });
      
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
      
      // Animation des éléments intérieurs
      gsap.fromTo(
        contentRef.current.querySelectorAll('.anim-item'), 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.4, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isVisible]);
  
  // Fermer le popup
  const closePopup = () => {
    if (overlayRef.current && contentRef.current) {
      // Animation de sortie
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        delay: 0.2
      });
      
      gsap.to(contentRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };
  
  // Changer le type de démo publicitaire
  const changeDemo = (type) => {
    setActiveDemo(type);
    
    // Animation de changement
    gsap.fromTo(
      '.demo-container', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  };
  
  if (!showAds || !isVisible) return null;
  
  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      onClick={closePopup}
    >
      <div 
        ref={contentRef}
        className="relative bg-[#0a0a14] border border-primary/30 rounded-lg shadow-2xl max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="bg-gradient-to-r from-primary/30 to-primary/10 p-4 rounded-t-lg flex justify-between items-center border-b border-primary/30">
          <h3 className="font-valorant text-white text-lg anim-item">
            Types d'Emplacements Publicitaires
          </h3>
          
          {/* Bouton de fermeture */}
          <button 
            onClick={closePopup}
            className="text-gray-400 hover:text-white p-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenu */}
        <div className="p-6">
          <div className="text-white mb-4 anim-item">
            <p className="text-sm mb-2">
              Notre plateforme MGE offre de multiples formats publicitaires stratégiquement positionnés pour maximiser leur visibilité auprès d'une audience engagée et passionnée de gamers.
            </p>
          </div>
          
          {/* Onglets de formats */}
          <div className="flex flex-wrap gap-2 mb-6 anim-item">
            <button 
              onClick={() => changeDemo('rectangle')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeDemo === 'rectangle' 
                  ? 'bg-primary text-black font-bold' 
                  : 'bg-black/30 text-white/80 hover:bg-black/50'
              }`}
            >
              Rectangle
            </button>
            <button 
              onClick={() => changeDemo('leaderboard')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeDemo === 'leaderboard' 
                  ? 'bg-primary text-black font-bold' 
                  : 'bg-black/30 text-white/80 hover:bg-black/50'
              }`}
            >
              Bandeau
            </button>
            <button 
              onClick={() => changeDemo('skyscraper')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeDemo === 'skyscraper' 
                  ? 'bg-primary text-black font-bold' 
                  : 'bg-black/30 text-white/80 hover:bg-black/50'
              }`}
            >
              Skyscraper
            </button>
            <button 
              onClick={() => changeDemo('interstitial')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeDemo === 'interstitial' 
                  ? 'bg-primary text-black font-bold' 
                  : 'bg-black/30 text-white/80 hover:bg-black/50'
              }`}
            >
              Interstitiel
            </button>
          </div>
          
          {/* Conteneur de démo */}
          <div className="bg-black/20 p-5 rounded-lg mb-6 demo-container anim-item">
            {activeDemo === 'rectangle' && (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-[250px] w-[300px] border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
                  style={{ background: 'rgba(20, 20, 30, 0.7)' }}
                >
                  <div className="text-center p-4">
                    <h4 className="text-primary font-valorant text-lg mb-1">MEDIUM RECTANGLE</h4>
                    <p className="text-white/80 text-xs">300×250 px</p>
                  </div>
                </div>
                <div className="flex-1 text-white">
                  <h4 className="font-bold text-primary mb-2">Medium Rectangle</h4>
                  <p className="text-sm mb-3">Format standard très visible au milieu du contenu, excellent taux d'engagement.</p>
                  <ul className="text-xs space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Tarif: 900-1500 DH/mois
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      CTR moyen: 0.3% - 0.7%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Idéal pour: Produits gaming, promotions
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeDemo === 'leaderboard' && (
              <div className="flex flex-col items-center gap-6">
                <div className="h-[90px] w-[728px] max-w-full border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
                  style={{ background: 'rgba(20, 20, 30, 0.7)' }}
                >
                  <div className="text-center p-4">
                    <h4 className="text-primary font-valorant text-lg">LEADERBOARD</h4>
                    <p className="text-white/80 text-xs">728×90 px</p>
                  </div>
                </div>
                <div className="flex-1 text-white">
                  <h4 className="font-bold text-primary mb-2">Leaderboard (Bandeau)</h4>
                  <p className="text-sm mb-3">Format horizontal très visible, parfait pour la partie supérieure ou entre les sections.</p>
                  <ul className="text-xs space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Tarif: 1500-2500 DH/mois
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      CTR moyen: 0.2% - 0.5%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Idéal pour: Marques, événements, lancements
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeDemo === 'skyscraper' && (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-[600px] w-[160px] border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
                  style={{ background: 'rgba(20, 20, 30, 0.7)' }}
                >
                  <div className="text-center p-4 rotate-90 md:rotate-0">
                    <h4 className="text-primary font-valorant text-lg mb-1">SKYSCRAPER</h4>
                    <p className="text-white/80 text-xs">160×600 px</p>
                  </div>
                </div>
                <div className="flex-1 text-white">
                  <h4 className="font-bold text-primary mb-2">Skyscraper</h4>
                  <p className="text-sm mb-3">Format vertical fixe qui reste visible pendant le défilement, excellent pour la visibilité de marque.</p>
                  <ul className="text-xs space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Tarif: 1800-3000 DH/mois
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      CTR moyen: 0.3% - 0.6%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Idéal pour: Annonces longue durée, construction de marque
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeDemo === 'interstitial' && (
              <div className="flex flex-col items-center gap-6">
                <div className="h-[400px] w-[600px] max-w-full border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
                  style={{ background: 'rgba(20, 20, 30, 0.7)' }}
                >
                  <div className="text-center p-4">
                    <h4 className="text-primary font-valorant text-xl mb-2">INTERSTITIEL</h4>
                    <p className="text-white/80 text-sm">Plein écran / Modal</p>
                    <p className="text-primary/80 text-xs mt-4">Apparaît lors des transitions de page</p>
                  </div>
                </div>
                <div className="flex-1 text-white">
                  <h4 className="font-bold text-primary mb-2">Interstitiel / Modal</h4>
                  <p className="text-sm mb-3">Format premium à fort impact qui s'affiche temporairement, taux d'engagement maximal.</p>
                  <ul className="text-xs space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Tarif: 4000-6000 DH/mois
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      CTR moyen: 2% - 5%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                      Idéal pour: Promotions majeures, lancement de produits
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Pied de page */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-700/30 anim-item">
            <button 
              onClick={closePopup}
              className="px-4 py-1.5 bg-black/40 rounded-md text-white/70 text-sm hover:bg-black/60 hover:text-white transition-colors mb-2 sm:mb-0"
            >
              Fermer la fenêtre
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={() => window.open('mailto:contact@mge.ma?subject=Demande%20de%20tarifs%20publicitaires', '_blank')}
                className="px-4 py-1.5 bg-primary/20 rounded-md text-primary text-sm hover:bg-primary/30 transition-colors"
              >
                Demander les tarifs
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-4 py-1.5 bg-primary text-black text-sm hover:bg-primary/90 transition-colors rounded-md font-medium"
              >
                Masquer popup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAd; 