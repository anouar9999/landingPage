import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const AdContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAdContext = () => useContext(AdContext);

// Fournisseur du contexte
export const AdProvider = ({ children }) => {
  // État pour savoir si les publicités sont visibles
  const [adsVisible, setAdsVisible] = useState(false);
  
  // État pour savoir si c'est la première fois que l'utilisateur charge la page
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Effet pour charger la préférence de l'utilisateur depuis localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('mge_ads_visible');
    
    // Si une préférence existe, on l'utilise
    if (savedPreference !== null) {
      setAdsVisible(savedPreference === 'true');
      setIsFirstLoad(false);
    } else {
      // Par défaut, on cache les publicités et on marque comme première visite
      setAdsVisible(false);
      setIsFirstLoad(true);
    }
  }, []);
  
  // Fonction pour basculer la visibilité des publicités
  const toggleAdsVisibility = () => {
    const newValue = !adsVisible;
    setAdsVisible(newValue);
    localStorage.setItem('mge_ads_visible', newValue.toString());
    
    // Si c'est la première fois, on marque que ce n'est plus le cas
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  };
  
  // Fonction pour définir la visibilité des publicités
  const setAdsVisibility = (value) => {
    setAdsVisible(value);
    localStorage.setItem('mge_ads_visible', value.toString());
    
    // Si c'est la première fois, on marque que ce n'est plus le cas
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  };
  
  // Valeurs exposées par le contexte
  const value = {
    adsVisible,
    isFirstLoad,
    toggleAdsVisibility,
    setAdsVisibility
  };
  
  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

export default AdProvider; 