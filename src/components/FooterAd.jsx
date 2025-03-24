import React from 'react';
import { useAds } from '../context/AdContext';

/**
 * Composant pour un emplacement publicitaire dans le footer
 */
const FooterAd = () => {
  const { showAds } = useAds();
  
  if (!showAds) return null;
  
  return (
    <div className="w-full py-6 bg-gradient-to-r from-black/80 via-primary/10 to-black/80">
      <div className="container mx-auto px-4">
        <div 
          className="w-full rounded-lg border-2 border-dashed border-primary/40 py-4 px-6 flex flex-col md:flex-row items-center justify-between"
          style={{
            background: 'rgba(20, 20, 30, 0.7)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-primary font-valorant text-sm uppercase mb-1">Emplacement sponsorisé</p>
            <h3 className="text-white text-lg md:text-xl">Votre message publicitaire peut apparaître ici</h3>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-primary/20 backdrop-blur-sm px-3 py-2 rounded text-white text-sm flex items-center justify-center">
              <span className="font-valorant">Réservez cet espace</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded text-white text-sm flex items-center justify-center">
              <span className="font-valorant">Tarifs & Info</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAd; 