import React, { useState, useEffect } from 'react';
import { useAds } from '../context/AdContext';
import gsap from 'gsap';

/**
 * Composant d'administration des publicités - pour visualiser et gérer les emplacements publicitaires
 */
const AdAdmin = () => {
  const { 
    showAds, 
    toggleAds, 
    adStats, 
    adLoadStatus, 
    activeAdSpots, 
    getCTR,
    getAdSpotConfig,
    getAllAdSpots
  } = useAds();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [highlightedSpot, setHighlightedSpot] = useState(null);
  
  // Effet pour animer l'ouverture et la fermeture
  useEffect(() => {
    if (isOpen) {
      gsap.to(".ad-admin-panel", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(".ad-admin-panel", {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);
  
  // Effet pour mettre en évidence un emplacement publicitaire
  useEffect(() => {
    if (highlightedSpot) {
      // Ajouter une classe aux emplacements correspondants sur la page
      const adSpots = document.querySelectorAll(`[data-ad-spot="${highlightedSpot}"]`);
      adSpots.forEach(spot => {
        gsap.to(spot, {
          boxShadow: "0 0 0 3px rgba(215, 198, 175, 0.8), 0 0 20px rgba(215, 198, 175, 0.4)",
          scale: 1.02,
          duration: 0.3
        });
      });
      
      return () => {
        // Supprimer la mise en évidence
        adSpots.forEach(spot => {
          gsap.to(spot, {
            boxShadow: "none",
            scale: 1,
            duration: 0.2
          });
        });
      };
    }
  }, [highlightedSpot]);
  
  // Obtenir tous les emplacements publicitaires configurés
  const allAdSpots = getAllAdSpots();
  
  // Calculer les totaux
  const getTotalImpressions = () => {
    if (!adStats.impressions) return 0;
    return Object.values(adStats.impressions).reduce((sum, count) => sum + count, 0);
  };
  
  const getTotalClicks = () => {
    if (!adStats.clicks) return 0;
    return Object.values(adStats.clicks).reduce((sum, count) => sum + count, 0);
  };
  
  const getAverageCtrl = () => {
    const totalImpressions = getTotalImpressions();
    const totalClicks = getTotalClicks();
    if (totalImpressions === 0) return 0;
    return ((totalClicks / totalImpressions) * 100).toFixed(2);
  };
  
  return (
    <>
      {/* Bouton flottant d'administration */}
      <button 
        className="fixed bottom-24 right-5 z-50 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-primary/40 cursor-pointer shadow-lg"
        onClick={() => setIsOpen(prev => !prev)}
        style={{ 
          fontFamily: "'Valorant', sans-serif",
          fontSize: '12px',
          color: '#D7C6AF',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
      >
        {isOpen ? "Fermer Admin" : "Admin Publicités"}
      </button>
      
      {/* Panneau d'administration */}
      <div className="ad-admin-panel fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-primary/30"
        style={{ 
          transform: 'translateY(100%)',
          opacity: 0,
          height: '400px',
          overflowY: 'auto'
        }}
      >
        {/* En-tête du panneau */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <h2 
            style={{ 
              fontFamily: "'Valorant', sans-serif",
              color: '#D7C6AF',
            }}
            className="text-lg"
          >
            Administration des publicités
          </h2>
          
          {/* Tabs */}
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded ${activeTab === 'stats' ? 'bg-primary/20 border border-primary/50' : 'bg-black/40 border border-primary/10'}`}
              onClick={() => setActiveTab('stats')}
              style={{ 
                fontFamily: "'Valorant', sans-serif",
                fontSize: '12px',
                color: '#D7C6AF',
              }}
            >
              Statistiques
            </button>
            <button 
              className={`px-3 py-1 rounded ${activeTab === 'manage' ? 'bg-primary/20 border border-primary/50' : 'bg-black/40 border border-primary/10'}`}
              onClick={() => setActiveTab('manage')}
              style={{ 
                fontFamily: "'Valorant', sans-serif",
                fontSize: '12px',
                color: '#D7C6AF',
              }}
            >
              Gestion
            </button>
            <button 
              className={`px-3 py-1 rounded ${activeTab === 'preview' ? 'bg-primary/20 border border-primary/50' : 'bg-black/40 border border-primary/10'}`}
              onClick={() => setActiveTab('preview')}
              style={{ 
                fontFamily: "'Valorant', sans-serif",
                fontSize: '12px',
                color: '#D7C6AF',
              }}
            >
              Aperçu
            </button>
          </div>
          
          {/* Interrupteur global */}
          <div className="flex items-center space-x-3">
            <span 
              style={{ 
                fontFamily: "'Valorant', sans-serif",
                fontSize: '12px',
                color: '#D7C6AF',
              }}
            >
              Publicités: {showAds ? 'Activées' : 'Désactivées'}
            </span>
            <button 
              className={`w-14 h-6 rounded-full relative ${showAds ? 'bg-green-500/50' : 'bg-red-500/50'}`}
              onClick={toggleAds}
            >
              <div 
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300 ${showAds ? 'right-0.5' : 'left-0.5'}`}
              ></div>
            </button>
          </div>
        </div>
        
        {/* Contenu du panneau */}
        <div className="p-4">
          {/* Onglet Statistiques */}
          {activeTab === 'stats' && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-black/50 rounded-md p-4 border border-primary/10">
                  <h3 className="text-primary/70 text-sm mb-1">Total Impressions</h3>
                  <div className="text-2xl text-white font-bold">{getTotalImpressions().toLocaleString()}</div>
                </div>
                <div className="bg-black/50 rounded-md p-4 border border-primary/10">
                  <h3 className="text-primary/70 text-sm mb-1">Total Clics</h3>
                  <div className="text-2xl text-white font-bold">{getTotalClicks().toLocaleString()}</div>
                </div>
                <div className="bg-black/50 rounded-md p-4 border border-primary/10">
                  <h3 className="text-primary/70 text-sm mb-1">CTR Moyen</h3>
                  <div className="text-2xl text-white font-bold">{getAverageCtrl()}%</div>
                </div>
              </div>
              
              <h3 
                className="text-primary mb-3 pb-2 border-b border-primary/20"
                style={{ 
                  fontFamily: "'Valorant', sans-serif",
                  fontSize: '14px',
                }}
              >
                Performance par emplacement
              </h3>
              
              <div className="space-y-3">
                {Object.keys(allAdSpots).map(spotId => (
                  <div 
                    key={spotId}
                    className="flex items-center justify-between bg-black/30 p-3 rounded border border-primary/10 hover:bg-black/40 transition-colors"
                    onMouseEnter={() => setHighlightedSpot(spotId)}
                    onMouseLeave={() => setHighlightedSpot(null)}
                  >
                    <div className="flex-1">
                      <h4 className="text-white text-sm">{allAdSpots[spotId].name}</h4>
                      <div className="text-white/50 text-xs">{allAdSpots[spotId].dimensions}</div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="text-center">
                        <div className="text-white/70 text-xs">Impressions</div>
                        <div className="text-white text-sm font-bold">{adStats.impressions[spotId] || 0}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="text-center">
                        <div className="text-white/70 text-xs">Clics</div>
                        <div className="text-white text-sm font-bold">{adStats.clicks[spotId] || 0}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                      <div className="text-center">
                        <div className="text-white/70 text-xs">CTR</div>
                        <div className="text-white text-sm font-bold">{getCTR(spotId)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Onglet Gestion */}
          {activeTab === 'manage' && (
            <div>
              <div className="mb-4">
                <h3 
                  className="text-primary mb-3 pb-2 border-b border-primary/20"
                  style={{ 
                    fontFamily: "'Valorant', sans-serif",
                    fontSize: '14px',
                  }}
                >
                  Gestion des emplacements
                </h3>
                
                <div className="space-y-2">
                  {Object.keys(allAdSpots).map(spotId => {
                    const spotConfig = allAdSpots[spotId];
                    const isLoading = adLoadStatus[spotId] === 'loading';
                    const isActive = activeAdSpots[spotId];
                    
                    return (
                      <div key={spotId} className="flex items-center justify-between bg-black/30 p-3 rounded border border-primary/10">
                        <div className="flex-1">
                          <h4 className="text-white text-sm">{spotConfig.name}</h4>
                          <div className="text-white/50 text-xs">{spotConfig.dimensions}</div>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-white/70">Tarif:</span>
                            <span className="text-xs text-white">{spotConfig.price}</span>
                          </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="text-xs px-2 py-1 rounded" style={{
                            backgroundColor: isActive ? 'rgba(34, 197, 94, 0.2)' : isLoading ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: isActive ? 'rgb(134, 239, 172)' : isLoading ? 'rgb(253, 224, 71)' : 'rgb(252, 165, 165)'
                          }}>
                            {isActive ? 'Actif' : isLoading ? 'Chargement...' : 'Inactif'}
                          </div>
                        </div>
                        <div className="flex-1 flex justify-end">
                          <button
                            className="text-xs px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                            onClick={() => setHighlightedSpot(highlightedSpot === spotId ? null : spotId)}
                          >
                            {highlightedSpot === spotId ? 'Cacher' : 'Afficher'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Aperçu */}
          {activeTab === 'preview' && (
            <div>
              <h3 
                className="text-primary mb-3 pb-2 border-b border-primary/20"
                style={{ 
                  fontFamily: "'Valorant', sans-serif",
                  fontSize: '14px',
                }}
              >
                Aperçus des formats
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(allAdSpots).map(spotId => {
                  const spotConfig = allAdSpots[spotId];
                  
                  return (
                    <div 
                      key={spotId} 
                      className="bg-black/30 rounded-md border border-primary/10 overflow-hidden"
                      onMouseEnter={() => setHighlightedSpot(spotId)}
                      onMouseLeave={() => setHighlightedSpot(null)}
                    >
                      <div 
                        className="bg-gradient-to-br from-primary/10 to-black/50 aspect-video flex items-center justify-center"
                        style={{
                          backgroundImage: `url("https://via.placeholder.com/300x200/1a1a2e/D7C6AF?text=${spotConfig.name.replace(' ', '+')}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      <div className="p-3">
                        <h4 className="text-white text-sm mb-1">{spotConfig.name}</h4>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-xs">{spotConfig.dimensions}</span>
                          <span className="text-primary text-xs">CTR: {spotConfig.ctr}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdAdmin; 