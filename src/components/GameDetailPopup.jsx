import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar, Users, Gamepad2, ScrollText, Trophy, Medal } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';
import tournamentInfo from '../data/tournamentInfo';

// Styles CSS pour la scrollbar personnalisée
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(10, 10, 20, 0.2);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #D7C6AF 0%, rgba(215, 198, 175, 0.5) 100%);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #D7C6AF 20%, rgba(215, 198, 175, 0.8) 100%);
    background-clip: content-box;
  }
  
  .modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  
  .popup-content {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #D7C6AF rgba(10, 10, 20, 0.2);
    max-height: 85vh;
    position: relative;
    overscroll-behavior: contain;
  }
  
  .backdrop-blur-effect {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  .prize-card {
    transition: all 0.3s ease;
  }
  
  .prize-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px -10px rgba(215, 198, 175, 0.4);
  }
  
  .game-popup-icon {
    font-size: 2.5rem;
    text-shadow: 0 0 15px rgba(215, 198, 175, 0.6);
    animation: pulse-glow 2s infinite alternate;
  }
  
  @keyframes pulse-glow {
    from {
      opacity: 0.8;
      text-shadow: 0 0 10px rgba(215, 198, 175, 0.4);
    }
    to {
      opacity: 1;
      text-shadow: 0 0 20px rgba(215, 198, 175, 0.8);
    }
  }
  
  .close-button {
    transition: all 0.3s ease;
  }
  
  .close-button:hover {
    background-color: rgba(215, 198, 175, 0.3);
    transform: rotate(90deg);
  }
  
  .timeline-dot {
    transition: all 0.3s ease;
  }
  
  .timeline-dot:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(215, 198, 175, 0.4);
  }
  
  .phase-item {
    transition: all 0.3s ease;
  }
  
  .phase-item:hover {
    background-color: rgba(215, 198, 175, 0.05);
    transform: translateX(5px);
  }
`;

const GameDetailPopup = ({ game, onClose }) => {
  // Vérifier si le composant est appelé sans données de jeu
  if (!game) {
    console.warn('GameDetailPopup a été appelé sans données de jeu valides');
    return null;
  }

  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const formatRef = useRef(null);
  const descriptionRef = useRef(null);
  const requirementsRef = useRef(null);
  const prizeRef = useRef(null);
  const prizesRef = useRef(null);
  const rulesRef = useRef(null);
  
  const { t, language } = useTranslation();
  const [showBackdropBlur, setShowBackdropBlur] = useState(false);
  
  // Fonction pour obtenir la classe de texte basée sur la langue
  const getTextClass = () => {
    if (language === 'ar') return 'text-right';
    if (language === 'tz') return 'tamazight-text';
    return '';
  };
  
  // Ajouter une classe pour bloquer le scroll du body
  useEffect(() => {
    // Ajouter la classe au body au mount
    document.body.classList.add('modal-open');
    
    // Effet de flou progressif
    setTimeout(() => {
      setShowBackdropBlur(true);
    }, 100);
    
    // Nettoyer en enlevant la classe au unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);
  
  // Animations à l'ouverture
  useEffect(() => {
    if (overlayRef.current && contentRef.current) {
      // Animation d'entrée
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.2 }
      );
      
      // Animations staggered des sections de contenu
      const sections = [
        formatRef.current,
        descriptionRef.current,
        requirementsRef.current,
        prizeRef.current,
        prizesRef.current,
        rulesRef.current
      ].filter(Boolean);
      
      gsap.fromTo(sections, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.4 }
      );
    }
  }, []);
  
  // Gérer le clic à l'extérieur pour fermer
  const handleOverlayClick = (e) => {
    // S'assurer que le clic est sur l'overlay et non sur son contenu
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };
  
  // Fermeture avec animation
  const handleClose = () => {
    if (typeof onClose === 'function') {
      if (overlayRef.current && contentRef.current) {
        // Désactiver le flou
        setShowBackdropBlur(false);
        
        // Animation de fermeture
        const tl = gsap.timeline({
          onComplete: onClose
        });
        
        // Animation du contenu
        tl.to(contentRef.current, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in"
        });
        
        // Animation de l'overlay
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.2");
      } else {
        // Si les refs ne sont pas disponibles, appeler directement onClose
        onClose();
      }
    }
  };
  
  // Ajouter le support de la touche Escape pour fermer
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
  
  // Vérifier si le jeu est défini et récupérer les informations
  const getGameInfo = () => {
    if (!game) {
      console.warn('GameDetailPopup - getGameInfo: game is null or undefined');
      // Retourner les informations par défaut
      return {
        format: t('gameDetails.unavailable'),
        description: t('gameDetails.comingSoon'),
        requirements: [],
        rounds: [],
        prizes: [],
        prize: t('gameDetails.tbd'),
        rules: t('gameDetails.rulesComingSoon'),
        color: "from-blue-500 to-purple-500",
        icon: "🎮"
      };
    }
    
    try {
      // Utiliser le nom du jeu comme clé pour récupérer les infos s'il existe
      if (game.name && tournamentInfo[game.name]) {
        return tournamentInfo[game.name];
      }
      
      // Fallback: essayer de trouver une correspondance basée sur l'ID
      if (game.id) {
        const gameNames = Object.keys(tournamentInfo);
        for (const gameName of gameNames) {
          if (gameName.toLowerCase().includes(game.id.toString().toLowerCase())) {
            return tournamentInfo[gameName];
          }
        }
      }
      
      // Si aucune correspondance n'est trouvée, retourner les infos par défaut
      return {
        format: t('gameDetails.unavailable'),
        description: t('gameDetails.comingSoon'),
        requirements: [],
        rounds: [],
        prizes: [],
        prize: t('gameDetails.tbd'),
        rules: t('gameDetails.rulesComingSoon'),
        color: "from-blue-500 to-purple-500",
        icon: "🎮"
      };
    } catch (error) {
      console.error('Error in getGameInfo:', error);
      // En cas d'erreur, retourner les infos par défaut
      return {
        format: t('gameDetails.unavailable'),
        description: t('gameDetails.comingSoon'),
        requirements: [],
        rounds: [],
        prizes: [],
        prize: t('gameDetails.tbd'),
        rules: t('gameDetails.rulesComingSoon'),
        color: "from-blue-500 to-purple-500",
        icon: "🎮"
      };
    }
  };
  
  // Récupérer les infos du tournoi pour ce jeu
  const gameInfo = getGameInfo();
  
  // Si aucun jeu n'est défini ou si gameInfo est null, ne rien afficher
  if (!game || !gameInfo) {
    return null;
  }

  return (
    <>
      {/* Style pour la scrollbar et les animations */}
      <style>{scrollbarStyles}</style>
      
      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 opacity-0 transition-all duration-300 ${showBackdropBlur ? 'backdrop-blur-effect' : ''}`}
        onClick={handleOverlayClick}
      >
        <div 
          ref={contentRef}
          className="relative w-full max-w-5xl overflow-hidden custom-scrollbar popup-content bg-[#0a0a14] border border-primary/30 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            overscrollBehavior: 'contain',
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(215, 198, 175, 0.2)' 
          }}
        >
          {/* Header avec image et titre */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <div className={`absolute inset-0 bg-gradient-to-br ${gameInfo.color || 'from-blue-500 to-purple-500'} opacity-20`}></div>
            <img 
              src={game.image || '/img/placeholder-game.jpg'} 
              alt="" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a14]"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
              <div>
                <span className={`text-xs text-primary font-valorant uppercase tracking-wider ${getTextClass()}`}>{t('gameDetails.championship')}</span>
                <h2 className={`${game.fontClass || "font-nightWarrior"} text-4xl text-white uppercase flex items-center gap-2`}>
                  <span className="game-popup-icon">{gameInfo.icon}</span>
                </h2>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-black/40 hover:bg-primary/30 text-white transition-all duration-300 hover:scale-110 close-button"
                aria-label={t('gameDetails.close')}
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Contenu */}
          <div className="p-6 pt-2">
            {/* Format du tournoi */}
            <div className="mb-8" ref={formatRef}>
              <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                <Calendar className="h-5 w-5" /> {t('gameDetails.tournamentFormat')}
              </h3>
              <p className={`text-white/90 leading-relaxed ${getTextClass()}`}>{gameInfo.format}</p>
            </div>
            
            {/* Description et détails */}
            <div className="mb-8" ref={descriptionRef}>
              <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                <Gamepad2 className="h-5 w-5" /> {t('gameDetails.description')}
              </h3>
              <p className={`text-white/90 leading-relaxed ${getTextClass()}`}>{gameInfo.description}</p>
            </div>
            
            {/* Exigences */}
            {gameInfo.requirements && gameInfo.requirements.length > 0 && (
              <div className="mb-8" ref={requirementsRef}>
                <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                  <Users className="h-5 w-5" /> {t('gameDetails.requirements')}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-white/90 ml-2">
                  {gameInfo.requirements.map((req, index) => (
                    <li key={index} className={`${getTextClass()} hover:text-white transition-colors duration-200`}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Phases et rounds */}
            {gameInfo.rounds && gameInfo.rounds.length > 0 && (
              <div className="mb-8" ref={prizeRef}>
                <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                  <ScrollText className="h-5 w-5" /> {t('gameDetails.phases')}
                </h3>
                
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
                  {gameInfo.rounds.map((round, index) => (
                    <div key={index} className="flex mb-6 phase-item p-2 rounded-lg relative">
                      <div className="mr-6 flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center timeline-dot ${index === 0 ? 'bg-primary/20 animate-pulse' : 'bg-black/40'} border ${index === 0 ? 'border-primary' : 'border-primary/30'}`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className={`text-white font-valorant mb-1 ${getTextClass()}`}>{round.name || ''}</h4>
                        <p className={`text-white/70 text-sm ${getTextClass()}`}>{round.date || ''}</p>
                        <p className={`text-white/90 mt-2 ${getTextClass()}`}>{round.description || ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Prize pool */}
            <div className="mb-8" ref={prizesRef}>
              <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                <Trophy className="h-5 w-5" /> {t('gameDetails.prizePool')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {gameInfo.prizes && gameInfo.prizes.length > 0 ? (
                  gameInfo.prizes.map((prize, index) => (
                    <div 
                      key={index} 
                      className={`prize-card relative overflow-hidden rounded-lg p-4 bg-black/40 backdrop-blur-sm border border-white/10 ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                    >
                      <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full bg-gradient-to-br ${index === 0 ? 'from-yellow-400 to-amber-600' : index === 1 ? 'from-gray-300 to-gray-500' : index === 2 ? 'from-amber-700 to-amber-900' : 'from-blue-400 to-blue-600'} opacity-50`}></div>
                      
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : index === 1 ? 'bg-gray-500/20 text-gray-300' : index === 2 ? 'bg-amber-800/20 text-amber-700' : 'bg-blue-600/20 text-blue-400'} transition-transform duration-300 hover:scale-110`}>
                          <Medal size={index === 0 ? 22 : 18} />
                        </div>
                        <div>
                          <p className={`text-white/60 text-sm ${getTextClass()}`}>{prize.position || ''}</p>
                          <p className={`text-white text-xl font-nightWarrior mt-1 ${getTextClass()}`}>{prize.amount || ''}</p>
                          {prize.extra && (
                            <p className={`text-primary/80 text-xs mt-2 ${getTextClass()}`}>{prize.extra}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2 lg:col-span-4 p-4 bg-black/40 rounded-lg border border-white/10">
                    <p className={`text-white/70 text-center ${getTextClass()}`}>{t('gameDetails.prizePoolTBA')}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Conditions et règles */}
            <div className="mb-4" ref={rulesRef}>
              <h3 className={`text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2 ${getTextClass()}`}>
                <ScrollText className="h-5 w-5" /> {t('gameDetails.rules')}
              </h3>
              <div className={`text-white/90 leading-relaxed p-4 bg-black/40 rounded-lg border border-white/10 ${getTextClass()} whitespace-pre-line`}>
                {gameInfo.rules}
              </div>
            </div>
            
            {/* Bouton de fermeture */}
            <div className="text-center mt-8">
              <button
                onClick={handleClose}
                className={`bg-primary text-white font-valorant px-6 py-2 rounded-md hover:bg-primary/80 transition-all hover:scale-105 ${getTextClass()}`}
              >
                {t('gameDetails.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPopup; 