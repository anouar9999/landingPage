import React, { useState, useEffect } from 'react';
import { XMarkIcon, AdjustmentsHorizontalIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import adLoader from '../utils/adLoader';

// Composant pour contrôler et suivre les publicités sur le site
const AdController = ({ 
  onToggleSmallBanner, 
  onToggleLeftSidebar, 
  onToggleRightSidebar,
  onToggleFloatingAd,
  onActivateAll,
  onDeactivateAll,
  showSmallBanner,
  showLeftSidebar,
  showRightSidebar,
  showFloatingAd,
  showAllAds,
  adControllerExpanded,
  setAdControllerExpanded
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Toujours visible pour résoudre le problème
  const [adBlocked, setAdBlocked] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [adMetrics, setAdMetrics] = useState({
    loaded: 0,
    displayed: 0,
    clicked: 0
  });
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Utiliser l'état externe si disponible
  useEffect(() => {
    if (adControllerExpanded !== undefined) {
      setIsExpanded(adControllerExpanded);
    }
  }, [adControllerExpanded]);
  
  // Vérifier si un bloqueur de publicités est actif
  useEffect(() => {
    const checkAdBlocker = async () => {
      const isBlocked = await adLoader.detectAdBlocker();
      setAdBlocked(isBlocked);
    };
    
    checkAdBlocker();
  }, []);
  
  // Récupérer le score de performance pour les publicités
  useEffect(() => {
    const score = adLoader.optimizeAdLoad();
    setPerformanceScore(score);
    
    // Simulation des métriques pour démo
    const mockMetrics = {
      loaded: Math.floor(Math.random() * 10) + 5,
      displayed: Math.floor(Math.random() * 8) + 3,
      clicked: Math.floor(Math.random() * 3)
    };
    
    setAdMetrics(mockMetrics);
  }, []);
  
  // Afficher le tooltip d'invitation à cliquer sur le panneau
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isExpanded) {
        setShowTooltip(true);
        
        // Auto-masquer le tooltip après 5 secondes
        const hideTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isExpanded]);
  
  // Gérer l'affichage/masquage du panneau
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
    setShowTooltip(false);
    
    // Mettre à jour l'état externe si disponible
    if (setAdControllerExpanded) {
      setAdControllerExpanded(!isExpanded);
    }
  };

  // Animation d'attention pour le contrôleur
  useEffect(() => {
    if (!isExpanded) {
      const intervalId = setInterval(() => {
        const controller = document.querySelector('.ad-controller-handle');
        if (controller) {
          controller.classList.add('pulse-attention');
          setTimeout(() => {
            controller.classList.remove('pulse-attention');
          }, 1000);
        }
      }, 5000);
      
      return () => clearInterval(intervalId);
    }
  }, [isExpanded]);

  return (
    <div className={`fixed bottom-16 left-4 z-50 transition-all duration-500 ad-controller ${isExpanded ? 'w-80 md:w-96' : 'w-12'}`}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden relative">
        {/* Tooltip d'invitation */}
        {showTooltip && !isExpanded && (
          <div className="absolute -top-16 left-0 bg-yellow-500 text-black text-xs font-bold px-3 py-2 rounded shadow-lg animate-bounce pointer-events-none">
            Cliquez pour activer les publicités de démo
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-yellow-500 transform rotate-45"></div>
          </div>
        )}
        
        {/* Bouton de toggle */}
        <button 
          onClick={togglePanel}
          className="absolute right-2 top-2 bg-slate-700 hover:bg-slate-600 p-1 rounded-full text-slate-300 hover:text-white transition-colors z-10"
          aria-label={isExpanded ? "Réduire le panneau" : "Agrandir le panneau"}
        >
          {isExpanded ? (
            <ArrowsPointingInIcon className="h-4 w-4" />
          ) : (
            <ArrowsPointingOutIcon className="h-4 w-4" />
          )}
        </button>

        {isExpanded ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="text-white font-semibold text-sm">Panneau de démo</h3>
              </div>
              
              {/* Actions globales */}
              <div className="flex space-x-2">
                <button 
                  onClick={onActivateAll}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded flex items-center space-x-1 transition-colors"
                  title="Activer toutes les publicités"
                >
                  <EyeIcon className="h-3 w-3" />
                  <span>Tout</span>
                </button>
                <button 
                  onClick={onDeactivateAll}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded flex items-center space-x-1 transition-colors"
                  title="Désactiver toutes les publicités"
                >
                  <EyeSlashIcon className="h-3 w-3" />
                  <span>Aucune</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Information sur le mode démo */}
              <div className="bg-blue-500/20 border border-blue-500/40 rounded-md p-3 text-xs text-blue-200 mb-4 flex items-start space-x-2">
                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>
                  Ce panneau permet de contrôler l'affichage des publicités en mode démonstration. 
                  Utilisez les boutons ci-dessous pour activer ou désactiver les différents emplacements publicitaires.
                </p>
              </div>
              
              {/* État du bloqueur de publicités */}
              <div className="bg-slate-700 rounded-md p-2 text-xs text-white">
                <div className="flex justify-between">
                  <span>Bloqueur de publicités</span>
                  <span className={adBlocked ? "text-red-400" : "text-green-400"}>
                    {adBlocked ? "Détecté" : "Non détecté"}
                  </span>
                </div>
              </div>
              
              {/* Score de performance */}
              <div className="bg-slate-700 rounded-md p-2 text-xs">
                <div className="flex justify-between text-white mb-1">
                  <span>Score de performance</span>
                  <span className={performanceScore > 7 ? "text-green-400" : performanceScore > 4 ? "text-yellow-400" : "text-red-400"}>
                    {performanceScore.toFixed(1)}/10
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      performanceScore > 7 ? "bg-green-500" : performanceScore > 4 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${performanceScore * 10}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Statistiques des annonces */}
              <div className="bg-slate-700 rounded-md p-2 text-xs text-white">
                <div className="mb-1 font-semibold">Statistiques</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-800 p-2 rounded">
                    <div className="text-purple-400 font-semibold">{adMetrics.loaded}</div>
                    <div className="text-slate-400">Chargées</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <div className="text-blue-400 font-semibold">{adMetrics.displayed}</div>
                    <div className="text-slate-400">Affichées</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <div className="text-green-400 font-semibold">{adMetrics.clicked}</div>
                    <div className="text-slate-400">Cliquées</div>
                  </div>
                </div>
              </div>
              
              {/* Séparateur */}
              <div className="border-t border-slate-700 my-3"></div>
              
              {/* Contrôles des emplacements publicitaires */}
              <div className="space-y-3">
                <h4 className="text-white text-xs font-semibold mb-1">Emplacements publicitaires</h4>
                
                <div className="bg-slate-700 rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="smallBanner" className="text-xs text-white flex items-center cursor-pointer">
                      <span className="w-3 h-3 inline-block bg-purple-500/20 rounded-full mr-2"></span>
                      Bannière supérieure
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        id="smallBanner" 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={showSmallBanner}
                        onChange={onToggleSmallBanner}
                      />
                      <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-slate-700 rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="leftSidebar" className="text-xs text-white flex items-center cursor-pointer">
                      <span className="w-3 h-3 inline-block bg-blue-500/20 rounded-full mr-2"></span>
                      Sidebar gauche
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        id="leftSidebar" 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={showLeftSidebar}
                        onChange={onToggleLeftSidebar}
                      />
                      <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-slate-700 rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="rightSidebar" className="text-xs text-white flex items-center cursor-pointer">
                      <span className="w-3 h-3 inline-block bg-blue-500/20 rounded-full mr-2"></span>
                      Sidebar droite
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        id="rightSidebar" 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={showRightSidebar}
                        onChange={onToggleRightSidebar}
                      />
                      <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-slate-700 rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="floatingAd" className="text-xs text-white flex items-center cursor-pointer">
                      <span className="w-3 h-3 inline-block bg-green-500/20 rounded-full mr-2"></span>
                      Annonce flottante
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        id="floatingAd" 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={showFloatingAd}
                        onChange={onToggleFloatingAd}
                      />
                      <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 mt-3 italic">
                Ce panneau est uniquement disponible en mode démonstration.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 flex flex-col items-center justify-center min-h-[120px] cursor-pointer ad-controller-handle" onClick={togglePanel}>
            <span className="transform -rotate-90 text-xs text-slate-400 whitespace-nowrap">Panneau démo</span>
          </div>
        )}
      </div>
      
      {/* Styles pour l'animation d'attention */}
      <style jsx>{`
        @keyframes pulseAttention {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(106, 90, 205, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(106, 90, 205, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(106, 90, 205, 0); }
        }
        
        .pulse-attention {
          animation: pulseAttention 1s ease-in-out;
        }
        
        @media (max-width: 640px) {
          .ad-controller {
            bottom: 4rem;
            left: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdController; 