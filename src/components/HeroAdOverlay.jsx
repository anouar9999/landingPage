import React from 'react';
import { useAds } from '../context/AdContext';

/**
 * Composant pour afficher une publicité en fond ou en overlay sur le Hero
 */
const HeroAdOverlay = () => {
  const { showAds } = useAds();
  
  if (!showAds) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Watermark en fond */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-15"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '120px',
          color: '#D7C6AF',
          textTransform: 'uppercase',
          letterSpacing: '10px',
          transform: 'rotate(-5deg)',
          mixBlendMode: 'overlay',
          userSelect: 'none'
        }}
      >
        <span>Publicité</span>
      </div>
      
      {/* Advertorial corner */}
      <div 
        className="absolute top-5 right-5 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md border border-primary/20"
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '12px',
          color: '#D7C6AF',
        }}
      >
        Publicité ➔ Sponsorisé
      </div>
      
      {/* Bandeau horizontal bas */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-sm bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center z-[25]"
      >
        <div
          className="h-16 w-full max-w-5xl mx-4 border-2 border-dashed border-primary/40 rounded flex items-center justify-center"
          style={{
            background: 'rgba(20, 20, 30, 0.7)',
            fontFamily: "'Valorant', sans-serif",
            color: '#D7C6AF',
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-lg">Emplacement Publicitaire Premium</div>
            <div className="text-xs">Bandeau Hero (1200×120)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAdOverlay; 