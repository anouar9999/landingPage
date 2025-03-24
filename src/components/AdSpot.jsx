import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Composant représentant un emplacement publicitaire
 * @param {object} props - Les propriétés du composant
 * @param {string} props.position - Position CSS (absolute, relative, etc.)
 * @param {string} props.top - Position top en CSS
 * @param {string} props.left - Position left en CSS
 * @param {string} props.bottom - Position bottom en CSS
 * @param {string} props.right - Position right en CSS
 * @param {string} props.width - Largeur de l'emplacement
 * @param {string} props.height - Hauteur de l'emplacement
 * @param {string} props.className - Classes CSS additionnelles
 * @param {string} props.type - Type d'emplacement publicitaire (banner, sidebar, etc.)
 */
const AdSpot = ({ 
  position = "relative", 
  top, 
  left, 
  bottom, 
  right, 
  width = "300px", 
  height = "250px", 
  className = "", 
  type = "banner",
  isVisible = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const adRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Format standardisé d'après IAB (Interactive Advertising Bureau)
  const getFormatName = () => {
    const standardFormats = {
      '970x90': 'Billboard',
      '970x250': 'Super Leaderboard',
      '728x90': 'Leaderboard',
      '300x250': 'Medium Rectangle',
      '300x600': 'Half Page',
      '160x600': 'Skyscraper',
      '320x50': 'Mobile Banner',
      '320x100': 'Mobile Large Banner'
    };
    
    const dimensions = `${width.replace('px', '')}x${height.replace('px', '')}`;
    return standardFormats[dimensions] || 'Format personnalisé';
  };
  
  // Animation sur apparition
  useEffect(() => {
    if (isVisible && adRef.current) {
      // Animation d'entrée
      gsap.fromTo(adRef.current, 
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: "back.out(1.4)",
          onComplete: () => {
            // Animation de mise en évidence
            timelineRef.current = gsap.timeline({ repeat: 1 });
            timelineRef.current.to(adRef.current, {
              boxShadow: '0 0 15px rgba(215, 198, 175, 0.5)',
              borderColor: 'rgba(215, 198, 175, 0.9)',
              duration: 0.8,
              ease: "power1.inOut"
            })
            .to(adRef.current, {
              boxShadow: '0 0 10px rgba(215, 198, 175, 0.3)',
              borderColor: 'rgba(215, 198, 175, 0.5)',
              duration: 0.8,
              ease: "power1.inOut",
              onComplete: () => setAnimationComplete(true)
            });
          }
        }
      );
    }
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isVisible]);
  
  // Si l'emplacement n'est pas visible, ne rien rendre
  if (!isVisible) return null;
  
  // Déterminer le format standardisé pour affichage
  const formatName = getFormatName();
  
  // Prix factices pour démo
  const getPriceRange = () => {
    const widthNum = parseInt(width);
    const heightNum = parseInt(height);
    const size = widthNum * heightNum;
    
    if (size > 200000) return '2500-4000 DH';
    if (size > 100000) return '1500-2500 DH';
    if (size > 50000) return '900-1500 DH';
    return '500-900 DH';
  };

  return (
    <div 
      ref={adRef}
      className={`ad-spot ${className} ${isHovered ? 'z-50' : 'z-20'}`}
      style={{
        position,
        top,
        left,
        bottom,
        right,
        width,
        height,
        background: 'rgba(20, 20, 30, 0.7)',
        border: '2px dashed #D7C6AF',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#D7C6AF',
        fontFamily: "'Valorant', sans-serif",
        fontSize: '14px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        textTransform: 'uppercase',
        padding: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 10px rgba(215, 198, 175, 0.3)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenu normal */}
      <div 
        className={`transition-all duration-300 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '10px'
        }}
      >
        <div className="font-bold">Emplacement Publicitaire</div>
        <div className="text-xs mt-2">{type}</div>
        <div className="text-xs mt-1">{width} × {height}</div>
        {animationComplete && (
          <div className="mt-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs opacity-80">Cliquez pour info</span>
          </div>
        )}
      </div>
      
      {/* Informations au survol */}
      <div 
        className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          background: 'rgba(20, 20, 30, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '4px',
          padding: '10px'
        }}
      >
        <div className="font-bold text-primary mb-2">{formatName}</div>
        <div className="text-xs mb-1 text-white/90">{width} × {height}</div>
        <div className="text-xs mb-3 opacity-70">Format {type}</div>
        
        <div className="w-full max-w-xs bg-gradient-to-r from-primary/20 to-primary/5 rounded p-2 mb-2">
          <div className="text-xs mb-1 opacity-80">Tarif estimé</div>
          <div className="font-bold text-white">{getPriceRange()} <span className="text-xs font-normal opacity-70">/mois</span></div>
        </div>
        
        <div className="text-[10px] opacity-60 mt-1">
          Contactez-nous pour personnaliser
        </div>
      </div>
    </div>
  );
};

export default AdSpot; 