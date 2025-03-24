import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const AdContext = createContext();

// Configuration des emplacements publicitaires
export const AD_SPOTS_CONFIG = {
  topBanner: { id: 'topBanner', name: 'Top Banner', impressions: 2450, clicks: 52, ctr: 2.12 },
  sidebar: { id: 'sidebar', name: 'Sidebar Skyscraper', impressions: 1820, clicks: 24, ctr: 1.32 },
  inContent: { id: 'inContent', name: 'In-Content Banner', impressions: 2150, clicks: 47, ctr: 2.19 },
  footer: { id: 'footer', name: 'Footer Ad', impressions: 1650, clicks: 31, ctr: 1.88 },
  heroOverlay: { id: 'heroOverlay', name: 'Hero Overlay', impressions: 980, clicks: 35, ctr: 3.57 },
  popup: { id: 'popup', name: 'Popup Ad', impressions: 750, clicks: 42, ctr: 5.60 },
};

// Les formats d'annonces disponibles
export const AD_FORMATS = [
  { 
    id: 'rectangle', 
    name: 'Medium Rectangle', 
    width: 300, 
    height: 250,
    description: 'Format standard très polyvalent',
    engagement: 'Moyen à élevé',
    bestFor: 'Contenu riche, appels à l\'action'
  },
  { 
    id: 'leaderboard', 
    name: 'Leaderboard', 
    width: 728, 
    height: 90,
    description: 'Format horizontal pour le haut ou bas de page',
    engagement: 'Modéré',
    bestFor: 'Notoriété de marque, présence constante'
  },
  { 
    id: 'skyscraper', 
    name: 'Skyscraper', 
    width: 160, 
    height: 600,
    description: 'Format vertical pour les côtés de page',
    engagement: 'Modéré à élevé',
    bestFor: 'Visibilité persistante pendant le défilement'
  },
  { 
    id: 'billboard', 
    name: 'Billboard', 
    width: 970, 
    height: 250,
    description: 'Grand format à fort impact',
    engagement: 'Très élevé',
    bestFor: 'Campagnes premium, impact maximum'
  },
];

/**
 * Provider pour le contexte de gestion des publicités
 */
export const AdContextProvider = ({ children }) => {
  // État des publicités (activées/désactivées)
  const [showAds, setShowAds] = useState(true);
  // Mode admin pour gérer les emplacements
  const [isAdminMode, setIsAdminMode] = useState(false);
  // Spot surligné dans l'admin panel
  const [highlightedSpot, setHighlightedSpot] = useState(null);
  // Statistiques des spots publicitaires
  const [adStats, setAdStats] = useState(AD_SPOTS_CONFIG);
  
  // État pour le statut de chargement des publicités
  const [adLoadStatus, setAdLoadStatus] = useState({});
  
  // État pour les emplacements de publicités actifs
  const [activeAdSpots, setActiveAdSpots] = useState({});
  
  // Charger les préférences de l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedPreference = localStorage.getItem('mge_showAds');
      if (savedPreference !== null) {
        setShowAds(savedPreference === 'true');
      }
      
      // Afficher un message de debug
      console.log('[AdContext] Initialized with showAds:', showAds);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);
  
  // Sauvegarder les préférences de l'utilisateur dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mge_showAds', showAds);
      
      // Afficher un message de debug
      console.log('[AdContext] Preference updated, showAds:', showAds);
    } catch (error) {
      console.error('Error storing in localStorage:', error);
    }
  }, [showAds]);
  
  // Mise à jour simulée des statistiques
  useEffect(() => {
    if (isAdminMode) {
      const interval = setInterval(() => {
        setAdStats(prev => {
          const updated = { ...prev };
          
          // Simuler des impressions et clics aléatoires
          Object.keys(updated).forEach(key => {
            const spot = updated[key];
            
            // Entre 1 et 5 nouvelles impressions
            const newImpressions = Math.floor(Math.random() * 5) + 1;
            // Entre 0 et 2 nouveaux clics
            const newClicks = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0;
            
            spot.impressions += newImpressions;
            spot.clicks += newClicks;
            spot.ctr = parseFloat(((spot.clicks / spot.impressions) * 100).toFixed(2));
          });
          
          return updated;
        });
      }, 5000); // Mise à jour toutes les 5 secondes
      
      return () => clearInterval(interval);
    }
  }, [isAdminMode]);
  
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
  
  // Toggle pour le mode admin
  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };
  
  // Sélectionner un spot pour le surligner
  const highlightSpot = (spotId) => {
    setHighlightedSpot(spotId);
    
    // Supprimer le surlignage après 3 secondes
    setTimeout(() => {
      setHighlightedSpot(null);
    }, 3000);
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
  
  // Valeur exposée par le contexte
  const value = {
    showAds,
    toggleAds,
    isAdminMode,
    toggleAdminMode,
    highlightedSpot,
    highlightSpot,
    adStats,
    adLoadStatus,
    activeAdSpots,
    recordImpression,
    recordClick,
    getCTR,
    getAdSpotConfig,
    getAllAdSpots
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds doit être utilisé à l\'intérieur d\'un AdContextProvider');
  }
  return context;
};

export default AdContext; 