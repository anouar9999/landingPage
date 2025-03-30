import React, { useState, useEffect } from 'react';
import { useAds } from '../contexts/AdContext';
import { Settings, X, Eye, EyeOff, Info, Monitor, Layers, Layout, LayoutDashboard, Palette, Zap, AlertCircle, Command, Flag, Gamepad, Sparkle, Gem, Trophy, Target, Award, Crown } from 'lucide-react';

/**
 * Composant de contrôle des emplacements publicitaires amélioré
 * Offre un panneau de démonstration plus complet pour contrôler l'affichage des publicités
 */
const AdController = () => {
  const { showAds, setShowAds, adOptions, updateAdOptions } = useAds();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('general');
  
  // Effet pour récupérer les préférences utilisateur
  useEffect(() => {
    const storedPref = localStorage.getItem('mge_show_ads');
    if (storedPref !== null) {
      setShowAds(storedPref === 'true');
    }
    
    // Charger les options individuelles
    const storedOptions = localStorage.getItem('mge_ad_options');
    if (storedOptions) {
      try {
        const parsedOptions = JSON.parse(storedOptions);
        if (parsedOptions && typeof parsedOptions === 'object') {
          updateAdOptions(parsedOptions);
        }
      } catch (e) {
        console.error('Erreur lors du chargement des options de publicité:', e);
      }
    }
  }, [setShowAds, updateAdOptions]);
  
  // Fonction pour basculer l'affichage des publicités
  const toggleAds = () => {
    const newValue = !showAds;
    setShowAds(newValue);
    localStorage.setItem('mge_show_ads', newValue.toString());
  };
  
  // Fonction pour réinitialiser toutes les options
  const resetOptions = () => {
    const defaultOptions = { 
      banners: true, 
      popups: true, 
      sidebar: true,
      hero: true,
      footer: true,
      game: true
    };
    updateAdOptions(defaultOptions);
    localStorage.setItem('mge_ad_options', JSON.stringify(defaultOptions));
  };
  
  return (
    <>
      {/* Bouton flottant pour ouvrir le panneau - redesigné pour plus de visibilité */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[1000] bg-gradient-to-r from-primary/90 to-primary/80 hover:from-primary hover:to-primary/90 text-black rounded-l-md p-3 shadow-xl flex items-center justify-center transition-all duration-300 group"
        title="Mode démonstration"
        style={{ boxShadow: '0 0 20px rgba(215, 198, 175, 0.3)' }}
      >
        <div className="flex items-center">
          <Trophy size={20} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 group-hover:ml-2 text-xs font-bold">
            Mode&nbsp;démo
          </span>
        </div>
      </button>
      
      {/* Panneau de contrôle */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="bg-[#0a0a14] border border-primary/30 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-primary/30 to-primary/10 px-6 py-4 flex justify-between items-center border-b border-primary/30">
              <div className="flex items-center gap-2 text-white">
                <Trophy size={20} className="text-primary" />
                <h3 className="font-bold">Mode Démonstration</h3>
              </div>
              <button 
                onClick={() => setIsPanelOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Navigation par onglets */}
            <div className="flex border-b border-primary/20">
              <button 
                onClick={() => setCurrentTab('general')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  currentTab === 'general' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Général</span>
              </button>
              <button 
                onClick={() => setCurrentTab('placements')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  currentTab === 'placements' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Layout size={16} />
                <span>Emplacements</span>
              </button>
              <button 
                onClick={() => setCurrentTab('about')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  currentTab === 'about' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Info size={16} />
                <span>À propos</span>
              </button>
            </div>
            
            {/* Contenu des onglets */}
            <div className="p-6">
              {/* Onglet Général */}
              {currentTab === 'general' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Eye size={18} className={showAds ? "text-primary" : "text-gray-500"} />
                        <span className="text-white font-medium">Mode démo global</span>
                      </div>
                      <button
                        onClick={toggleAds}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                          showAds ? 'bg-primary' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                            showAds ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-white/60 text-sm">
                      {showAds 
                        ? "Les zones publicitaires sont visibles pour démonstration" 
                        : "Les zones publicitaires sont masquées"}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Sparkle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-white text-sm font-medium mb-1">Suggestions rapides</h5>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <button 
                            onClick={() => {
                              setShowAds(true);
                              resetOptions();
                            }}
                            className="bg-primary/30 hover:bg-primary/50 text-white text-xs px-3 py-2 rounded transition-colors"
                          >
                            Tout afficher
                          </button>
                          <button 
                            onClick={() => setShowAds(false)}
                            className="bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-2 rounded transition-colors border border-white/10"
                          >
                            Tout masquer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-primary/20 pt-4">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <Palette size={16} className="text-primary" />
                      <span>Thème préféré</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-white text-xs py-2 rounded transition-colors">
                        Standard
                      </button>
                      <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs py-2 rounded transition-colors">
                        Discret
                      </button>
                      <button className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-white text-xs py-2 rounded transition-colors">
                        Créatif
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Emplacements */}
              {currentTab === 'placements' && (
                <div className="space-y-5">
                  <h4 className="text-white font-medium mb-4">Contrôle des emplacements</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Flag size={16} className="text-primary" />
                        <span>Bannières</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ banners: !adOptions.banners })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.banners ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.banners ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Command size={16} className="text-primary" />
                        <span>Popups</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ popups: !adOptions.popups })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.popups ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.popups ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Layers size={16} className="text-primary" />
                        <span>Latérales</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ sidebar: !adOptions.sidebar })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.sidebar ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.sidebar ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Crown size={16} className="text-primary" />
                        <span>Hero</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ hero: !adOptions.hero })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.hero ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.hero ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Award size={16} className="text-primary" />
                        <span>Footer</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ footer: !adOptions.footer })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.footer ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.footer ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <Gamepad size={16} className="text-primary" />
                        <span>Mini-jeu</span>
                      </label>
                      <button
                        onClick={() => updateAdOptions({ game: !adOptions.game })}
                        className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none ${
                          adOptions.game ? 'bg-primary' : 'bg-gray-700'
                        }`}
                        disabled={!showAds}
                      >
                        <span
                          className={`inline-block w-3 h-3 transform transition-transform bg-white rounded-full ${
                            adOptions.game ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet À propos */}
              {currentTab === 'about' && (
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-white text-sm font-medium mb-1">Mode démonstration uniquement</h5>
                        <p className="text-white/60 text-xs">
                          Les zones publicitaires sont affichées uniquement pour démontrer les opportunités marketing. 
                          Dans la version publique, ce site est sans publicité car financé par le ministère.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-white font-medium">Pourquoi ce mode?</h4>
                  <p className="text-white/60 text-sm">
                    Le mode démonstration permet aux partenaires potentiels de visualiser les différents 
                    emplacements publicitaires disponibles sur la plateforme MGE pour leurs campagnes.
                  </p>
                  
                  <h4 className="text-white font-medium mt-4">Formats supportés</h4>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 
                      <span>Bannières (728×90, 970×90)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 
                      <span>Rectangles (300×250, 336×280)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 
                      <span>Skyscraper (120×600, 160×600)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 
                      <span>Mobile (320×50, 300×50)</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Actions */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={resetOptions}
                  className="px-4 py-2 text-sm text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded transition-colors"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="px-4 py-2 text-sm text-black bg-primary hover:bg-primary/90 rounded transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Styles pour l'animation */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default AdController; 