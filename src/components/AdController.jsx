import React, { useState, useEffect } from 'react';
import { XMarkIcon, AdjustmentsHorizontalIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import adLoader from '../utils/adLoader';

// Composant pour contrôler et suivre les publicités sur le site
const AdController = ({ 
  onToggleSmallBanner, 
  onToggleLeftSidebar, 
  onToggleRightSidebar,
  onToggleFloatingAd,
  showSmallBanner,
  showLeftSidebar,
  showRightSidebar,
  showFloatingAd
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [adMetrics, setAdMetrics] = useState({
    loaded: 0,
    displayed: 0,
    clicked: 0
  });
  
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
  
  // Afficher le contrôleur après un court délai
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Gérer l'affichage/masquage du panneau
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-12'}`}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
        {/* Bouton de toggle */}
        <button 
          onClick={togglePanel}
          className="absolute right-2 top-2 bg-slate-700 hover:bg-slate-600 p-1 rounded-full text-slate-300 hover:text-white transition-colors"
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
            <div className="flex items-center">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-white font-semibold text-sm">Contrôleur de publicités</h3>
            </div>

            <div className="mt-4 space-y-3">
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
              
              {/* Contrôles des emplacements publicitaires */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="smallBanner" className="text-xs text-white flex items-center">
                    <span className="w-5 h-5 inline-block bg-purple-500/20 rounded mr-2"></span>
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
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="leftSidebar" className="text-xs text-white flex items-center">
                    <span className="w-5 h-5 inline-block bg-blue-500/20 rounded mr-2"></span>
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
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="rightSidebar" className="text-xs text-white flex items-center">
                    <span className="w-5 h-5 inline-block bg-blue-500/20 rounded mr-2"></span>
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
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="floatingAd" className="text-xs text-white flex items-center">
                    <span className="w-5 h-5 inline-block bg-green-500/20 rounded mr-2"></span>
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
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 mt-2 italic">
                Le contrôleur est uniquement disponible en mode démonstration.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 flex flex-col items-center justify-center h-96">
            <span className="transform -rotate-90 text-xs text-slate-400 whitespace-nowrap">Contrôleur de publicités</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdController; 