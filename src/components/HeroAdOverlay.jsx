import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAds } from '../context/AdContext';

/**
 * Composant d'overlay publicitaire pour la section Hero
 * Affiche des points d'information sur les positions publicitaires disponibles
 */
const HeroAdOverlay = () => {
  // État pour le point d'info actif
  const [activePoint, setActivePoint] = useState(null);
  // Référence pour l'animation
  const overlayRef = useRef(null);
  const pointsRef = useRef([]);
  const { isAdminMode } = useAds();
  
  // Points d'information sur les positions publicitaires
  const infoPoints = [
    { id: 'hero-top', x: '20%', y: '15%', label: 'Header Premium', desc: 'Visibilité maximale sur la partie supérieure' },
    { id: 'hero-center', x: '50%', y: '40%', label: 'Centre Vidéo', desc: 'Intégration à l\'expérience vidéo' },
    { id: 'hero-bottom', x: '65%', y: '85%', label: 'Footer Hero', desc: 'Position stratégique de fin de section' },
    { id: 'hero-side', x: '85%', y: '30%', label: 'Side Rail', desc: 'Accompagne le scrolling utilisateur' },
  ];

  // Initialisation des animations
  useEffect(() => {
    // Animation d'entrée du watermark
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.8, duration: 1.5, ease: 'power2.inOut' }
    );
    
    // Animation séquentielle des points d'information
    pointsRef.current.forEach((point, index) => {
      gsap.fromTo(
        point,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          delay: 1 + index * 0.2,
          ease: 'back.out(2)'
        }
      );
    });
  }, []);
  
  // Animation des tooltips au survol
  const handlePointHover = (id) => {
    setActivePoint(id);
  };
  
  const handlePointLeave = () => {
    setActivePoint(null);
  };
  
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Watermark */}
      <div 
        ref={overlayRef}
        className="absolute bottom-5 right-5 font-bold text-lg opacity-60 text-white/50"
        style={{ fontFamily: 'monospace' }}
      >
        MGE Ad Experience
      </div>
      
      {/* Points d'information */}
      {infoPoints.map((point, index) => (
        <div 
          key={point.id}
          ref={el => pointsRef.current[index] = el}
          className="absolute w-6 h-6 flex items-center justify-center pointer-events-auto cursor-pointer"
          style={{ 
            left: point.x, 
            top: point.y,
            zIndex: 25
          }}
          onMouseEnter={() => handlePointHover(point.id)}
          onMouseLeave={handlePointLeave}
        >
          {/* Point pulsant */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
            <div className="relative w-4 h-4 bg-white rounded-full border-2 border-primary"></div>
          </div>
          
          {/* Tooltip d'information */}
          {activePoint === point.id && (
            <div 
              className="absolute z-30 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg"
              style={{ 
                minWidth: '180px', 
                transform: 'translateX(-50%)',
                left: '50%',
                bottom: '150%'
              }}
            >
              <div className="font-bold text-primary mb-1">{point.label}</div>
              <div className="text-xs text-white/90">{point.desc}</div>
              <div className="text-[10px] mt-2 text-white/60">
                {isAdminMode ? 'Cliquez pour sélectionner' : 'Contactez-nous pour réserver'}
              </div>
              
              {/* Flèche du tooltip */}
              <div 
                className="absolute w-3 h-3 bg-black/80 rotate-45"
                style={{ 
                  bottom: '-6px', 
                  left: 'calc(50% - 6px)',
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroAdOverlay; 