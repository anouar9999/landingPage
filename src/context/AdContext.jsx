import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const AdContext = createContext();

// Données de configuration des emplacements publicitaires
const AD_SPOTS_CONFIG = {
  hero: {
    name: "Hero Banner",
    dimensions: "1200×120",
    ctr: 1.2,
    price: "3500-5000 DH",
    priority: 10
  },
  heroOverlay: {
    name: "Hero Overlay",
    dimensions: "Custom",
    ctr: 3.5,
    price: "4000-6000 DH",
    priority: 9
  },
  sidebar: {
    name: "Sidebar",
    dimensions: "300×600",
    ctr: 0.8,
    price: "2500-3500 DH",
    priority: 7
  },
  inContent: {
    name: "In-content",
    dimensions: "728×90",
    ctr: 0.9,
    price: "2000-3000 DH",
    priority: 8
  },
  footer: {
    name: "Footer Banner",
    dimensions: "970×250",
    ctr: 0.6,
    price: "1500-2500 DH",
    priority: 6
  },
  popup: {
    name: "Popup Ad",
    dimensions: "Various",
    ctr: 2.8,
    price: "3000-4500 DH",
    priority: 8
  },
};

/**
 * Provider pour le contexte de gestion des publicités
 */
export const AdContextProvider = ({ children }) => {
  // État pour gérer l'affichage des publicités
  const [showAds, setShowAds] = useState(false);
  
  // État pour les statistiques (simulées) des publicités
  const [adStats, setAdStats] = useState({
    impressions: {},
    clicks: {},
    lastUpdated: null
  });
  
  // État pour le statut de chargement des publicités
  const [adLoadStatus, setAdLoadStatus] = useState({});
  
  // État pour les emplacements de publicités actifs
  const [activeAdSpots, setActiveAdSpots] = useState({});
  
  // Charger les préférences de l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedPreference = localStorage.getItem('showAds');
    if (savedPreference !== null) {
      setShowAds(savedPreference === 'true');
    }
    
    // Simuler le chargement des statistiques
    const timer = setTimeout(() => {
      initializeAdStats();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sauvegarder les préférences de l'utilisateur dans localStorage
  useEffect(() => {
    localStorage.setItem('showAds', showAds);
    
    // Simulation de chargement des publicités
    if (showAds) {
      Object.keys(AD_SPOTS_CONFIG).forEach(spotId => {
        setAdLoadStatus(prev => ({
          ...prev,
          [spotId]: 'loading'
        }));
        
        // Simuler un temps de chargement variable selon la priorité
        const loadTime = Math.max(500, 2000 - (AD_SPOTS_CONFIG[spotId].priority * 100));
        setTimeout(() => {
          setAdLoadStatus(prev => ({
            ...prev,
            [spotId]: 'loaded'
          }));
          
          // Activer l'emplacement
          setActiveAdSpots(prev => ({
            ...prev,
            [spotId]: true
          }));
          
          // Enregistrer une impression
          recordImpression(spotId);
        }, loadTime);
      });
    } else {
      // Réinitialiser le statut si les publicités sont désactivées
      setAdLoadStatus({});
      setActiveAdSpots({});
    }
  }, [showAds]);
  
  // Initialiser les statistiques des publicités
  const initializeAdStats = () => {
    const impressions = {};
    const clicks = {};
    
    Object.keys(AD_SPOTS_CONFIG).forEach(spotId => {
      // Générer des chiffres aléatoires
      impressions[spotId] = Math.floor(Math.random() * 2000) + 500;
      clicks[spotId] = Math.floor(impressions[spotId] * (AD_SPOTS_CONFIG[spotId].ctr / 100));
    });
    
    setAdStats({
      impressions,
      clicks,
      lastUpdated: new Date().toISOString()
    });
  };
  
  // Enregistrer une impression (simulée)
  const recordImpression = (spotId) => {
    if (!adStats.impressions[spotId]) return;
    
    setAdStats(prev => ({
      ...prev,
      impressions: {
        ...prev.impressions,
        [spotId]: prev.impressions[spotId] + 1
      },
      lastUpdated: new Date().toISOString()
    }));
  };
  
  // Enregistrer un clic (simulé)
  const recordClick = (spotId) => {
    if (!adStats.clicks[spotId]) return;
    
    setAdStats(prev => ({
      ...prev,
      clicks: {
        ...prev.clicks,
        [spotId]: prev.clicks[spotId] + 1
      },
      lastUpdated: new Date().toISOString()
    }));
  };
  
  // Basculer l'affichage des publicités
  const toggleAds = () => {
    setShowAds(prev => !prev);
  };
  
  // Obtenir le CTR (Click-Through Rate) pour un emplacement
  const getCTR = (spotId) => {
    if (!adStats.impressions[spotId] || adStats.impressions[spotId] === 0) return 0;
    return ((adStats.clicks[spotId] / adStats.impressions[spotId]) * 100).toFixed(2);
  };
  
  // Obtenir la configuration d'un emplacement publicitaire
  const getAdSpotConfig = (spotId) => {
    return AD_SPOTS_CONFIG[spotId] || null;
  };
  
  // Obtenir tous les emplacements publicitaires disponibles
  const getAllAdSpots = () => {
    return AD_SPOTS_CONFIG;
  };
  
  return (
    <AdContext.Provider
      value={{
        showAds,
        toggleAds,
        adStats,
        adLoadStatus,
        activeAdSpots,
        recordImpression,
        recordClick,
        getCTR,
        getAdSpotConfig,
        getAllAdSpots
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds doit être utilisé dans un AdContextProvider');
  }
  return context;
};

export default AdContext; 