import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte
const AdContext = createContext();

/**
 * Provider pour le contexte des publicités
 * @param {object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les enfants du composant
 */
export const AdProvider = ({ children }) => {
  const [showAds, setShowAds] = useState(false);
  
  // Écouter les changements d'événements
  useEffect(() => {
    const handleAdsVisibilityChange = (event) => {
      setShowAds(event.detail.showAds);
    };
    
    window.addEventListener('adsVisibilityChanged', handleAdsVisibilityChange);
    
    // Initialiser depuis le localStorage
    const storedPref = localStorage.getItem('mge_show_ads');
    if (storedPref !== null) {
      setShowAds(storedPref === 'true');
    }
    
    return () => {
      window.removeEventListener('adsVisibilityChanged', handleAdsVisibilityChange);
    };
  }, []);
  
  return (
    <AdContext.Provider value={{ showAds, setShowAds }}>
      {children}
    </AdContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte des publicités
 * @returns {object} L'état et les fonctions du contexte des publicités
 */
export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error("useAds doit être utilisé à l'intérieur d'un AdProvider");
  }
  return context;
};

export default AdContext; 