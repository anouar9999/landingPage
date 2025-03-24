import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroAdOverlay.scss';

/**
 * Composant affichant une zone publicitaire en overlay sur le Hero
 */
const HeroAdOverlay = () => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation d'entrée
    const tl = gsap.timeline();
    
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    
    tl.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3" // Légèrement avant la fin de l'animation précédente
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={overlayRef} className="hero-ad-overlay">
      <div ref={contentRef} className="hero-ad-content">
        <div className="ad-header">
          <div className="ad-tag">Premium Ad Space</div>
          <div className="ad-info">1920×1080 Hero Format</div>
        </div>
        
        <div className="ad-placeholder">
          <div className="ad-message">
            <h3>Place votre publicité ici</h3>
            <p>Cet espace publicitaire premium touche 100% des visiteurs du site</p>
            <ul className="ad-benefits">
              <li>Engagement élevé</li>
              <li>Visibilité maximale</li>
              <li>Format plein écran</li>
            </ul>
          </div>
          <div className="ad-price">
            <div className="price-tag">Premium</div>
            <div className="price-value">1200-1500 MAD</div>
            <div className="price-period">par jour</div>
          </div>
        </div>
        
        <div className="ad-footer">
          <div className="ad-metrics">
            <div className="metric">
              <span className="metric-value">100%</span>
              <span className="metric-label">Visibilité</span>
            </div>
            <div className="metric">
              <span className="metric-value">~8s</span>
              <span className="metric-label">Temps visible</span>
            </div>
            <div className="metric">
              <span className="metric-value">+70%</span>
              <span className="metric-label">Engagement</span>
            </div>
          </div>
          <a href="mailto:contact@mge.ma" className="ad-cta">Réserver cet espace</a>
        </div>
      </div>
    </div>
  );
};

export default HeroAdOverlay; 