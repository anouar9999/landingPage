import React, { useState, useEffect, useRef } from 'react';
import { useAdContext } from '../contexts/AdContext';
import gsap from 'gsap';
import './PopupAd.scss';

/**
 * Composant pour un popup publicitaire modal avec des animations avancées
 */
const PopupAd = () => {
  const { adsVisible } = useAdContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState('rectangle');
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const adDemoRef = useRef(null);
  
  // Format d'annonce avec leurs détails
  const adFormats = {
    rectangle: {
      name: 'Rectangle',
      dimensions: '300 × 250',
      price: '800-1000 MAD',
      engagement: '2.4%',
      description: 'Format polyvalent très répandu, idéal pour les annonces visuelles en milieu de contenu.'
    },
    leaderboard: {
      name: 'Leaderboard',
      dimensions: '728 × 90',
      price: '1000-1200 MAD',
      engagement: '1.8%',
      description: 'Idéal pour l\'affichage en haut ou bas de page, offre une visibilité optimale sur tous les appareils.'
    },
    skyscraper: {
      name: 'Skyscraper',
      dimensions: '160 × 600',
      price: '900-1100 MAD',
      engagement: '1.6%',
      description: 'Format vertical qui accompagne le contenu lors du défilement, maximisant le temps d\'exposition.'
    },
    interstitial: {
      name: 'Interstitiel',
      dimensions: '640 × 480',
      price: '1200-1500 MAD',
      engagement: '3.2%',
      description: 'Annonce plein écran affichée lors des transitions, offrant une visibilité maximale et un impact fort.'
    }
  };
  
  // Effet pour ouvrir le popup après un délai si les publicités sont activées
  useEffect(() => {
    if (adsVisible) {
      // Afficher le popup après 15 secondes
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [adsVisible]);
  
  // Effet pour animer l'ouverture/fermeture du popup
  useEffect(() => {
    if (popupRef.current && contentRef.current) {
      if (isOpen) {
        // Animation d'ouverture
        gsap.set(popupRef.current, { 
          display: 'flex',
          opacity: 0
        });
        
        const tl = gsap.timeline();
        
        tl.to(popupRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        tl.fromTo(
          contentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.2"
        );
        
        // Animation de l'aperçu d'annonce active
        changeDemo(activeDemo, false);
      } else if (popupRef.current.style.display === 'flex') {
        // Animation de fermeture
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(popupRef.current, { display: 'none' });
          }
        });
        
        tl.to(contentRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
        
        tl.to(popupRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.1");
      }
    }
  }, [isOpen, activeDemo]);
  
  // Fonction pour fermer le popup
  const closePopup = () => {
    setIsOpen(false);
  };
  
  // Fonction pour changer la démo d'annonce active
  const changeDemo = (format, animate = true) => {
    setActiveDemo(format);
    
    if (adDemoRef.current && animate) {
      // Animation pour changer de format
      gsap.fromTo(
        adDemoRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };
  
  // Si les publicités ne sont pas activées, ne rien afficher
  if (!adsVisible) return null;
  
  return (
    <div 
      className="popup-ad-overlay"
      ref={popupRef}
      style={{ display: 'none' }}
    >
      <div className="popup-ad-content" ref={contentRef}>
        <div className="popup-ad-header">
          <h2>Espaces Publicitaires MGE</h2>
          <button 
            className="close-button" 
            onClick={closePopup}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        
        <div className="popup-ad-body">
          <div className="ad-info-section">
            <h3>Les formats disponibles</h3>
            <p>Découvrez les différents formats publicitaires disponibles sur notre plateforme.</p>
            
            <div className="ad-formats-tabs">
              {Object.keys(adFormats).map(format => (
                <button 
                  key={format}
                  className={`format-tab ${activeDemo === format ? 'active' : ''}`}
                  onClick={() => changeDemo(format)}
                >
                  {adFormats[format].name}
                </button>
              ))}
            </div>
            
            <div className="ad-demo-info" ref={adDemoRef}>
              <div className="format-header">
                <div className="format-name">
                  {adFormats[activeDemo].name}
                  <span className="format-dimensions">{adFormats[activeDemo].dimensions}</span>
                </div>
                <div className="format-price">{adFormats[activeDemo].price} / mois</div>
              </div>
              
              <p className="format-description">{adFormats[activeDemo].description}</p>
              
              <div className="format-metrics">
                <div className="metric">
                  <span className="metric-label">CTR moyen</span>
                  <span className="metric-value">{adFormats[activeDemo].engagement}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Visibilité</span>
                  <span className="metric-value">94%</span>
                </div>
              </div>
            </div>
            
            <div className="ad-demo-actions">
              <a 
                href="mailto:contact@mge.ma?subject=Demande%20de%20r%C3%A9servation%20d%27espace%20publicitaire" 
                className="primary-button"
              >
                Réserver un espace
              </a>
              <button 
                className="secondary-button"
                onClick={closePopup}
              >
                Continuer la navigation
              </button>
            </div>
          </div>
          
          <div className={`ad-preview ${activeDemo}`}>
            <div className="ad-placeholder">
              <div className="ad-tag">Visualisation</div>
              <div className="ad-size">{adFormats[activeDemo].dimensions}</div>
              <div className="ad-content">
                <div className="ad-logo">MGE</div>
                <div className="ad-message">Votre contenu publicitaire ici</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="popup-ad-footer">
          <p>Les espaces publicitaires apparaissent uniquement lorsque le mode démo est activé.</p>
          <p>Contactez-nous pour plus d'informations et tarifs personnalisés.</p>
        </div>
      </div>
    </div>
  );
};

export default PopupAd; 