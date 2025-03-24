import React, { useState, useEffect } from 'react';

/**
 * Composant de contrôle des emplacements publicitaires
 * Ajoute un bouton en bas de l'écran pour montrer/cacher les emplacements
 */
const AdController = () => {
  const [showAds, setShowAds] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Fonction pour basculer l'affichage des publicités
  const toggleAds = () => {
    setShowAds(prev => !prev);
    // Stocker la préférence dans le localStorage
    localStorage.setItem('mge_show_ads', (!showAds).toString());
  };
  
  // Effet pour récupérer la préférence utilisateur
  useEffect(() => {
    const storedPref = localStorage.getItem('mge_show_ads');
    if (storedPref !== null) {
      setShowAds(storedPref === 'true');
    }
  }, []);
  
  // Permet d'émettre un événement personnalisé pour notifier les changements
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('adsVisibilityChanged', { detail: { showAds } }));
  }, [showAds]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Panel d'informations */}
      {isExpanded && (
        <div 
          className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 text-white max-w-xs"
          style={{ 
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <h4 className="font-valorant text-primary text-sm mb-2">Mode Démonstration</h4>
          <p className="text-xs mb-2">
            Les emplacements publicitaires affichent les zones réservées aux annonces. Utilisez ce mode pour présenter les opportunités marketing à vos clients.
          </p>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Status: {showAds ? 'Visible' : 'Masqué'}</span>
            <span className="text-primary cursor-pointer" onClick={() => setIsExpanded(false)}>Fermer</span>
          </div>
        </div>
      )}
      
      {/* Bouton de contrôle */}
      <button
        onClick={toggleAds}
        onMouseEnter={() => !isExpanded && setIsExpanded(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
          showAds 
            ? 'bg-primary text-black hover:bg-primary/90' 
            : 'bg-black/70 backdrop-blur-sm text-white border border-primary/30 hover:bg-black/90'
        }`}
      >
        <span className="font-valorant text-xs">
          {showAds ? 'Masquer Pub' : 'Afficher Pub'}
        </span>
        <span className={`w-3 h-3 rounded-full ${showAds ? 'bg-black' : 'bg-primary'}`}></span>
      </button>
    </div>
  );
};

export default AdController;

// Ajouter des keyframes pour l'animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style); 