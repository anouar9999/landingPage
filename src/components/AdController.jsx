import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Composant de contrôle des emplacements publicitaires
 * Ajoute un bouton en bas de l'écran pour montrer/cacher les emplacements
 */
const AdController = () => {
  const [showAds, setShowAds] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Fonction pour basculer l'affichage des publicités
  const toggleAds = () => {
    // Animation flash pour indiquer le changement d'état
    if (isFirstLoad) {
      // Montrer une animation explicative lors de la première activation
      const tl = gsap.timeline();
      tl.to('body', { 
        backgroundColor: 'rgba(215, 198, 175, 0.08)', 
        duration: 0.3, 
        ease: 'power2.inOut' 
      })
      .to('body', { 
        backgroundColor: 'transparent', 
        duration: 0.3, 
        ease: 'power2.inOut' 
      });
      
      // Montrer un indicateur bref expliquant la fonctionnalité
      gsap.set('.ad-indicator', { autoAlpha: 0, scale: 0.8 });
      gsap.to('.ad-indicator', { 
        autoAlpha: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: 'back.out(1.7)'
      });
      gsap.to('.ad-indicator', { 
        autoAlpha: 0, 
        scale: 1.1, 
        delay: 3, 
        duration: 0.5
      });
      
      setIsFirstLoad(false);
    } else {
      // Animation flash simple pour les activations suivantes
      gsap.to('.ad-spot', { 
        scale: showAds ? 0.9 : 1.05, 
        duration: 0.2, 
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to('.ad-spot', { 
            scale: 1, 
            duration: 0.3, 
            ease: 'elastic.out(1, 0.5)' 
          });
        }
      });
    }
    
    // Inverser l'état
    setShowAds(prev => !prev);
    
    // Stocker la préférence dans le localStorage
    localStorage.setItem('mge_show_ads', (!showAds).toString());
  };
  
  // Effet pour récupérer la préférence utilisateur
  useEffect(() => {
    const storedPref = localStorage.getItem('mge_show_ads');
    if (storedPref !== null) {
      setShowAds(storedPref === 'true');
      setIsFirstLoad(false);
    }
    
    // Ajouter l'animation d'aide visuelle pour le mode démo
    if (storedPref === 'true') {
      gsap.set('.ad-spot', { scale: 0 });
      gsap.to('.ad-spot', {
        scale: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: 0.5
      });
    }
  }, []);
  
  // Permet d'émettre un événement personnalisé pour notifier les changements
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('adsVisibilityChanged', { detail: { showAds } }));
  }, [showAds]);
  
  return (
    <>
      {/* Indicateur temporaire à la première activation */}
      {isFirstLoad && (
        <div className="ad-indicator fixed inset-0 pointer-events-none z-[1001] flex items-center justify-center invisible">
          <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-primary/40 max-w-md text-center">
            <h3 className="text-primary font-valorant text-xl mb-2">Mode Démonstration Publicité</h3>
            <p className="text-white/90 mb-4">
              Tous les emplacements publicitaires sont maintenant visibles. 
              Utilisez le bouton pour les afficher ou masquer.
            </p>
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-lg text-white font-valorant text-sm">
              Animation en cours...
            </div>
          </div>
        </div>
      )}
    
      <div className="fixed bottom-8 right-8 z-[1002] flex flex-col items-end gap-3">
        {/* Panel d'informations */}
        {isExpanded && (
          <div 
            className="bg-black/90 backdrop-blur-md p-6 rounded-lg border border-primary/30 text-white max-w-sm shadow-xl"
            style={{ 
              transition: 'all 0.3s ease',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <h4 className="font-valorant text-primary text-lg mb-3">Mode Démonstration Publicitaire</h4>
            
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <div className="text-primary text-3xl font-bold">
                  {showAds ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Statut actuel: {showAds ? 'Activé' : 'Désactivé'}</div>
                  <p className="text-white/80 text-sm">
                    {showAds 
                      ? 'Les emplacements publicitaires sont visibles. Idéal pour montrer les opportunités de placement.' 
                      : 'Les emplacements sont masqués. Mode expérience utilisateur standard.'}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-white/80 mb-4">
              Les emplacements publicitaires affichent les zones réservées aux annonces. Utilisez ce mode pour présenter les opportunités marketing à vos clients.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={toggleAds}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                  showAds ? 'bg-white text-black hover:bg-white/90' : 'bg-primary text-black hover:bg-primary/90'
                }`}
              >
                <span className="font-valorant text-xs">
                  {showAds ? 'Masquer' : 'Afficher'}
                </span>
              </button>
              
              <button 
                onClick={() => window.open('mailto:contact@mge.ma?subject=Demande%20de%20tarifs%20publicitaires', '_blank')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm bg-black/60 hover:bg-black/40 transition-all duration-300 border border-primary/30"
              >
                <span className="font-valorant text-xs text-white">
                  Tarifs & Info
                </span>
              </button>
            </div>
          </div>
        )}
        
        {/* Bouton de contrôle avec animation d'apparition */}
        <button
          onClick={toggleAds}
          onMouseEnter={() => !isExpanded && setIsExpanded(true)}
          className={`flex items-center gap-3 px-5 py-3 rounded-full text-sm transition-all duration-300 shadow-lg ${
            showAds 
              ? 'bg-primary text-black hover:bg-primary/90 shadow-primary/20' 
              : 'bg-black/80 backdrop-blur-sm text-white border border-primary/30 hover:bg-black/90'
          }`}
          style={{
            transform: 'translateZ(0)', // Pour activation GPU
            backfaceVisibility: 'hidden'
          }}
        >
          <span className="font-valorant">
            {showAds ? 'Masquer Publicités' : 'Afficher Publicités'}
          </span>
          
          <div className="relative">
            <span className={`w-4 h-4 rounded-full block relative z-10 ${showAds ? 'bg-black' : 'bg-primary'}`}></span>
            {showAds && (
              <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50 z-0"></span>
            )}
          </div>
        </button>
      </div>
    </>
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

@keyframes highlight {
  0%, 100% { border-color: rgba(215, 198, 175, 0.3); }
  50% { border-color: rgba(215, 198, 175, 0.9); box-shadow: 0 0 15px rgba(215, 198, 175, 0.5); }
}
`;
document.head.appendChild(style); 