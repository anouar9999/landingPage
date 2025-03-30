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
  const [adOptions, setAdOptions] = useState({
    banners: true,
    popups: true,
    sidebar: true,
    hero: true,
    footer: true,
    game: true
  });
  
  // Écouter les changements d'événements
  useEffect(() => {
    const handleOptionsChange = (event) => {
      setAdOptions(event.detail.options);
    };
    
    window.addEventListener('adOptionsChanged', handleOptionsChange);
    
    // Initialiser depuis le localStorage
    const storedPref = localStorage.getItem('mge_show_ads');
    if (storedPref !== null) {
      setShowAds(storedPref === 'true');
    }
    
    // Récupérer les options d'affichage
    const storedOptions = localStorage.getItem('mge_ad_options');
    if (storedOptions) {
      try {
        const parsedOptions = JSON.parse(storedOptions);
        if (parsedOptions && typeof parsedOptions === 'object') {
          // Fusionner avec les options par défaut pour s'assurer que toutes les propriétés existent
          setAdOptions(prev => ({
            ...prev,
            ...parsedOptions
          }));
        }
      } catch (e) {
        console.error('Erreur lors du chargement des options de publicité:', e);
      }
    }
    
    return () => {
      window.removeEventListener('adOptionsChanged', handleOptionsChange);
    };
  }, []);
  
  // Méthode pour ouvrir manuellement la popup de démonstration
  const openDemoPopup = () => {
    if (showAds && adOptions.popups) {
      window.dispatchEvent(new CustomEvent('openDemoPopup'));
    } else {
      console.warn('Les popups sont désactivées dans le mode démonstration');
    }
  };
  
  // Vérifier si un type spécifique de publicité est activé
  const isAdTypeEnabled = (type) => {
    return showAds && adOptions[type];
  };
  
  // Mettre à jour les options
  const updateAdOptions = (newOptions) => {
    const updatedOptions = { ...adOptions, ...newOptions };
    setAdOptions(updatedOptions);
    localStorage.setItem('mge_ad_options', JSON.stringify(updatedOptions));
    
    window.dispatchEvent(new CustomEvent('adOptionsChanged', { 
      detail: { options: updatedOptions } 
    }));
  };
  
  return (
    <AdContext.Provider value={{ 
      showAds, 
      setShowAds, 
      adOptions, 
      updateAdOptions,
      openDemoPopup,
      isAdTypeEnabled,
      isDemo: true // Indiquer que ce site est en mode démonstration
    }}>
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