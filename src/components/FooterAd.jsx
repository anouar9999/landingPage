import React, { useEffect, useRef } from 'react';
import { useAdContext } from '../contexts/AdContext';
import gsap from 'gsap';
import './FooterAd.scss';

/**
 * Composant pour un emplacement publicitaire dans le footer
 */
const FooterAd = () => {
  const { adsVisible } = useAdContext();
  const adRef = useRef(null);
  
  useEffect(() => {
    if (adRef.current) {
      if (adsVisible) {
        // Animation d'entrée
        gsap.fromTo(
          adRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        // Animation de sortie
        gsap.to(
          adRef.current,
          { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [adsVisible]);
  
  // Si les publicités ne sont pas visibles, ne rien rendre
  if (!adsVisible) return null;
  
  return (
    <div className="footer-ad-container" ref={adRef}>
      <div className="footer-ad-content">
        <div className="ad-label">Publicité</div>
        
        <div className="ad-banner">
          <div className="ad-info">
            <h3>Emplacement Publicitaire Premium</h3>
            <p>Format Leaderboard (728×90) - Idéal pour une visibilité optimale avant le pied de page</p>
          </div>
          
          <div className="ad-metrics">
            <div className="metric">
              <span className="metric-value">+95%</span>
              <span className="metric-label">Visibilité</span>
            </div>
            <div className="metric">
              <span className="metric-value">+80%</span>
              <span className="metric-label">Taux de complétion</span>
            </div>
          </div>
          
          <a href="mailto:contact@mge.ma" className="ad-cta">
            Réserver
          </a>
        </div>
        
        <div className="ad-dimensions">728 × 90</div>
      </div>
    </div>
  );
};

export default FooterAd; 