import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAds } from '../context/AdContext';

/**
 * Composant AdSpot pour afficher un emplacement publicitaire avec des animations et des informations supplémentaires
 */
const AdSpot = ({ 
  width = '300', 
  height = '250', 
  position = 'relative',
  top, 
  right, 
  bottom, 
  left,
  className = '', 
  type = 'Rectangle',
  isVisible = true,
  spotId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { showAds, highlightedSpot, isAdminMode } = useAds();
  const adRef = useRef(null);
  
  // Ne rien afficher si les annonces sont désactivées ou si explicitement indiqué
  if (!showAds || !isVisible) return null;
  
  // Fonction pour obtenir un nom standardisé du format selon les dimensions
  const getFormatName = (w, h) => {
    if (w === '728' && h === '90') return 'Leaderboard';
    if (w === '300' && h === '250') return 'Medium Rectangle';
    if (w === '300' && h === '600') return 'Half Page';
    if (w === '160' && h === '600') return 'Skyscraper';
    if (w === '970' && h === '90') return 'Large Leaderboard';
    if (w === '970' && h === '250') return 'Billboard';
    if (w === '320' && h === '50') return 'Mobile Banner';
    return 'Custom Format';
  };
  
  // Fonction pour estimer la fourchette de prix selon les dimensions
  const getPriceRange = (w, h) => {
    const size = parseInt(w) * parseInt(h);
    if (size > 100000) return '$150-$300 CPM';
    if (size > 50000) return '$100-$180 CPM';
    if (size > 20000) return '$70-$120 CPM';
    return '$30-$80 CPM';
  };
  
  // Animation d'apparition
  useEffect(() => {
    if (adRef.current) {
      gsap.fromTo(
        adRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power2.out",
          onComplete: () => setAnimationComplete(true)
        }
      );
    }
  }, []);
  
  // Animation quand le spot est surligné depuis l'admin panel
  useEffect(() => {
    if (spotId && highlightedSpot === spotId && adRef.current) {
      gsap.fromTo(
        adRef.current,
        { boxShadow: '0 0 0 rgba(234, 76, 137, 0)' },
        { 
          boxShadow: '0 0 20px rgba(234, 76, 137, 0.8), 0 0 40px rgba(234, 76, 137, 0.4)', 
          duration: 0.6,
          yoyo: true,
          repeat: 3,
          ease: "power2.inOut"
        }
      );
    }
  }, [highlightedSpot, spotId]);

  // Style de base pour l'emplacement publicitaire
  const adStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position,
    top,
    right, 
    bottom,
    left,
    background: 'linear-gradient(135deg, rgba(234, 76, 137, 0.1) 0%, rgba(101, 78, 163, 0.1) 100%)',
    border: '1px dashed rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    transition: 'background 0.3s, border 0.3s',
    overflow: 'hidden',
    backdropFilter: 'blur(5px)',
    zIndex: 10, // Z-index réduit pour éviter les conflits avec le Hero
  };

  // Style amélioré au survol
  const hoverStyle = isHovered ? {
    background: 'linear-gradient(135deg, rgba(234, 76, 137, 0.15) 0%, rgba(101, 78, 163, 0.15) 100%)',
    border: '1px dashed rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    color: 'rgba(255, 255, 255, 0.9)',
  } : {};

  // Style quand surligné depuis l'admin panel
  const highlightStyle = (spotId && highlightedSpot === spotId) ? {
    border: '2px solid rgba(234, 76, 137, 0.8)',
    background: 'linear-gradient(135deg, rgba(234, 76, 137, 0.2) 0%, rgba(101, 78, 163, 0.2) 100%)',
  } : {};

  // Calcul du format et du prix
  const formatName = getFormatName(width, height);
  const priceRange = getPriceRange(width, height);

  return (
    <div 
      ref={adRef}
      id={spotId}
      className={`ad-spot ${className}`}
      style={{ ...adStyle, ...hoverStyle, ...highlightStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-ad-spot={spotId}
    >
      {/* Contenu de base visible */}
      <div style={{ 
        opacity: isHovered ? 0 : 1, 
        transition: 'opacity 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>
        <div style={{ fontSize: parseInt(height) > 100 ? '16px' : '12px' }}>
          {formatName}
        </div>
        <div style={{ fontSize: parseInt(height) > 100 ? '14px' : '10px', marginTop: '4px' }}>
          {width} × {height}
        </div>
      </div>

      {/* Information supplémentaire au survol */}
      <div style={{ 
        position: 'absolute',
        inset: 0,
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.3s',
        backdropFilter: 'blur(8px)',
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#ea4c89' }}>
          {formatName}
        </div>
        <div style={{ marginBottom: '4px', fontSize: '12px' }}>
          Dimensions: {width} × {height}
        </div>
        <div style={{ marginBottom: '8px', fontSize: '12px' }}>
          Estimated: {priceRange}
        </div>
        <div style={{ 
          fontSize: '10px', 
          maxWidth: '80%', 
          color: 'rgba(255, 255, 255, 0.7)',
          display: parseInt(height) > 90 ? 'block' : 'none'
        }}>
          {type && `Position: ${type}`}
        </div>
      </div>
    </div>
  );
};

export default AdSpot; 