import React, { useState, useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

/**
 * Composant pour une publicité interactive sous forme de mini-jeu
 * Ce format publicitaire encourage l'engagement utilisateur avec un jeu simple
 */
const GameAd = ({ width = 300, height = 250, className = "" }) => {
  const { showAds, adOptions, isAdTypeEnabled } = useAds();
  const { t, getTextClass } = useTranslation();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    // Récupérer le meilleur score du localStorage s'il existe
    try {
      const saved = localStorage.getItem('advergame_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [timeLeft, setTimeLeft] = useState(15); // 15 secondes de jeu
  const [targets, setTargets] = useState([]);
  const [comboMultiplier, setComboMultiplier] = useState(1); // Multiplicateur de combo
  const [lastClickTime, setLastClickTime] = useState(0); // Temps du dernier clic
  const [showTutorial, setShowTutorial] = useState(true); // Afficher le tutoriel
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);
  const adRef = useRef(null);
  const ctaRef = useRef(null);
  const comboTimerRef = useRef(null);
  
  // Sauvegarder le meilleur score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('advergame_highscore', score.toString());
      } catch (e) {
        console.warn('Impossible de sauvegarder le meilleur score dans localStorage');
      }
    }
  }, [score, highScore]);

  // Gestion des combos
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      // Réduire le combo s'il n'y a pas de clic pendant 1.5 secondes
      comboTimerRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastClickTime > 1500 && comboMultiplier > 1) {
          setComboMultiplier(prev => Math.max(1, prev - 0.5));
        }
      }, 500);
    }
    
    return () => {
      if (comboTimerRef.current) {
        clearInterval(comboTimerRef.current);
      }
    };
  }, [gameStarted, gameEnded, lastClickTime, comboMultiplier]);
  
  // Détecter les changements d'orientation pour adapter l'interface
  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Générer une cible avec position et taille aléatoires adaptée à l'orientation
  const generateTarget = () => {
    if (!gameAreaRef.current) return null;
    
    const areaWidth = gameAreaRef.current.offsetWidth;
    const areaHeight = gameAreaRef.current.offsetHeight;
    
    // Ajuster la taille des cibles en fonction de la difficulté et de l'orientation
    let minSize, maxSize;
    
    switch(difficulty) {
      case 'easy':
        minSize = 25;
        maxSize = 40;
        break;
      case 'hard':
        minSize = 15;
        maxSize = 25;
        break;
      case 'medium':
      default:
        minSize = 20;
        maxSize = 35;
        break;
    }
    
    // Ajuster pour les petits écrans
    if (areaWidth < 250 || areaHeight < 200) {
      minSize = Math.max(15, minSize - 5);
      maxSize = Math.max(20, maxSize - 10);
    }
    
    const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
    const x = Math.floor(Math.random() * (areaWidth - size));
    const y = Math.floor(Math.random() * (areaHeight - size));
    const hue = Math.floor(Math.random() * 60) + 240; // Bleu/violet
    
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      color: `hsl(${hue}, 70%, 60%)`,
      points: Math.floor(30 / size * 10) // Les plus petites cibles valent plus de points
    };
  };
  
  // Ajouter une nouvelle cible périodiquement, adapté à la difficulté
  useEffect(() => {
    let targetInterval;
    
    if (gameStarted && !gameEnded) {
      // Ajouter une première cible
      setTargets([generateTarget()]);
      
      // Déterminer la fréquence d'apparition des cibles en fonction de la difficulté
      let spawnInterval = 800; // par défaut (medium)
      let maxTargets = 5; // par défaut
      
      switch(difficulty) {
        case 'easy':
          spawnInterval = 1000;
          maxTargets = 4;
          break;
        case 'hard':
          spawnInterval = 600;
          maxTargets = 7;
          break;
      }
      
      // Ajouter de nouvelles cibles à intervalles réguliers
      targetInterval = setInterval(() => {
        if (targets.length < maxTargets) {
          setTargets(prev => [...prev, generateTarget()]);
        }
      }, spawnInterval);
      
      // Démarrer le timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            clearInterval(targetInterval);
            setGameEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(targetInterval);
      clearInterval(timerRef.current);
    };
  }, [gameStarted, gameEnded, difficulty]);
  
  // Animation d'entrée
  useEffect(() => {
    if (isAdTypeEnabled('game') && adRef.current) {
      gsap.fromTo(
        adRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
      );
    }
  }, [isAdTypeEnabled]);
  
  // Animation de fin de jeu
  useEffect(() => {
    if (gameEnded && ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [gameEnded]);
  
  // Cliquer sur une cible
  const handleTargetClick = (targetId, points) => {
    // Mettre à jour le temps du dernier clic
    setLastClickTime(Date.now());
    
    // Gérer le combo
    setComboMultiplier(prev => Math.min(3, prev + 0.2));
    
    // Calculer les points avec le multiplicateur
    const earnedPoints = Math.floor(points * comboMultiplier);
    
    // Mettre à jour le score
    setScore(prev => prev + earnedPoints);
    
    // Retirer la cible cliquée
    setTargets(prev => prev.filter(target => target.id !== targetId));
    
    // Effet visuel pour le score
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
      gsap.fromTo(
        scoreElement,
        { scale: 1.2, color: '#6a5acd' },
        { scale: 1, color: 'white', duration: 0.3 }
      );
    }
    
    // Afficher un indicateur de points gagnés
    if (gameAreaRef.current) {
      const indicator = document.createElement('div');
      indicator.className = 'absolute z-40 font-bold text-[10px] text-white';
      indicator.style.left = `${event.clientX - gameAreaRef.current.getBoundingClientRect().left}px`;
      indicator.style.top = `${event.clientY - gameAreaRef.current.getBoundingClientRect().top - 20}px`;
      indicator.textContent = `+${earnedPoints}`;
      
      // Appliquer une couleur en fonction du multiplicateur
      if (comboMultiplier >= 2.5) {
        indicator.style.color = '#ff4500'; // Orange vif pour les gros combos
        indicator.style.textShadow = '0 0 5px rgba(255, 69, 0, 0.7)';
      } else if (comboMultiplier >= 1.5) {
        indicator.style.color = '#ffd700'; // Or pour les combos moyens
        indicator.style.textShadow = '0 0 5px rgba(255, 215, 0, 0.7)';
      }
      
      gameAreaRef.current.appendChild(indicator);
      
      gsap.to(indicator, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => {
          if (gameAreaRef.current && gameAreaRef.current.contains(indicator)) {
            gameAreaRef.current.removeChild(indicator);
          }
        }
      });
    }
  };
  
  // Démarrer le jeu
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(15);
    setGameEnded(false);
  };
  
  // Recommencer le jeu
  const restartGame = () => {
    setTargets([]);
    setGameStarted(false);
    setGameEnded(false);
    setTimeout(startGame, 100);
  };
  
  // Créer les keyframes pour les animations de cibles
  const createKeyframes = () => {
    return targets.map(target => `
      @keyframes pulse-${target.id} {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
      }
    `).join('\n');
  };
  
  // Styles adaptatifs en fonction de la taille réelle du conteneur
  const getAdaptiveStyles = () => {
    const isSmall = width < 250 || height < 200;
    const isMedium = (width >= 250 && width < 400) || (height >= 200 && height < 350);
    
    return {
      labelClass: isSmall ? 'text-[8px]' : 'text-xs',
      titleClass: isSmall ? 'text-sm' : isMedium ? 'text-lg' : 'text-xl',
      textClass: isSmall ? 'text-[10px]' : 'text-sm',
      buttonClass: isSmall ? 'text-[10px] px-3 py-1' : 'text-sm px-5 py-2',
      scoreClass: isSmall ? 'text-[8px]' : 'text-xs',
      padding: isSmall ? 'p-2' : isMedium ? 'p-3' : 'p-4'
    };
  };
  
  const styles = getAdaptiveStyles();
  
  // Ne pas afficher si les publicités sont désactivées
  // ou si l'option spécifique du jeu est désactivée
  if (!isAdTypeEnabled('game')) return null;
  
  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-[#0a0a14] to-[#16213e] ad-container ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(106, 90, 205, 0.15) inset',
        zIndex: 900, // Assurer qu'il est visible mais sous le mode démonstration
        maxWidth: '100vw', // Éviter le débordement sur petits écrans
        maxHeight: '80vh' // Éviter le débordement sur petits écrans
      }}
    >
      {/* Style block for animations */}
      <style>{createKeyframes()}</style>
      
      {/* Label Pub amélioré */}
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm z-30 border-l-2 border-primary">
        <span className={`text-white text-xs font-valorant ${getTextClass()}`}>ADVERGAME</span>
      </div>
      
      {/* Compteur de meilleur score persistant */}
      {highScore > 0 && !gameStarted && !gameEnded && (
        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm z-30">
          <div className={`text-primary ${styles.scoreClass} font-bold ${getTextClass()}`}>
            {t('gameAd.highScore')}: <span>{highScore}</span>
          </div>
        </div>
      )}
      
      {/* Bouton de fermeture amélioré */}
      <button 
        className="absolute top-2 right-2 bg-black/60 hover:bg-primary text-white/90 hover:text-black rounded-full p-1.5 z-30 transition-all duration-300 transform hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          if (adRef.current && adRef.current.parentNode) {
            gsap.to(adRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              onComplete: () => {
                // Vous pourriez utiliser un état ou une fonction de rappel ici
                // pour informer le parent que la publicité est fermée
                if (adRef.current && adRef.current.parentNode) {
                  adRef.current.parentNode.style.display = 'none';
                }
              }
            });
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Fond amélioré avec animation */}
      <div className="absolute inset-0 opacity-10 animate-pulse-slow" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(106, 90, 205, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, transparent, rgba(106, 90, 205, 0.3), transparent)',
          backgroundSize: '200% 100%',
          animation: 'gradientMove 8s linear infinite'
        }}
      ></div>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      {/* Écran d'accueil avec sélection de difficulté */}
      {!gameStarted && !gameEnded && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${styles.padding} z-20`}>
          <h3 className={`text-primary font-valorant ${styles.titleClass} mb-2 drop-shadow-glow ${getTextClass()}`}>{t('gameAd.title')}</h3>
          <p className={`text-white ${styles.textClass} text-center mb-3 ${getTextClass()}`}>{t('gameAd.instructions')}</p>
          
          {/* Sélecteur de difficulté */}
          <div className="w-full max-w-[200px] mb-3">
            <p className={`text-white/80 ${styles.textClass} text-center mb-1`}>{t('gameAd.selectDifficulty')}:</p>
            <div className="flex justify-between gap-1">
              <button 
                onClick={() => setDifficulty('easy')}
                className={`flex-1 py-1 rounded text-[10px] font-valorant transition-colors duration-200 ${difficulty === 'easy' ? 'bg-green-500 text-black' : 'bg-black/30 text-green-400 hover:bg-black/50'}`}
              >
                {t('gameAd.easy')}
              </button>
              <button 
                onClick={() => setDifficulty('medium')}
                className={`flex-1 py-1 rounded text-[10px] font-valorant transition-colors duration-200 ${difficulty === 'medium' ? 'bg-primary text-black' : 'bg-black/30 text-primary/80 hover:bg-black/50'}`}
              >
                {t('gameAd.medium')}
              </button>
              <button 
                onClick={() => setDifficulty('hard')}
                className={`flex-1 py-1 rounded text-[10px] font-valorant transition-colors duration-200 ${difficulty === 'hard' ? 'bg-red-500 text-black' : 'bg-black/30 text-red-400 hover:bg-black/50'}`}
              >
                {t('gameAd.hard')}
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setShowTutorial(false);
              startGame();
            }}
            className={`bg-primary hover:bg-primary/80 text-black font-valorant ${styles.buttonClass} rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-glow ${getTextClass()}`}
            style={{
              boxShadow: '0 0 15px rgba(106, 90, 205, 0.4)'
            }}
          >
            {t('gameAd.play')}
          </button>
          
          <div className={`mt-2 text-white/50 text-[10px] text-center ${getTextClass()}`}>
            {t('gameAd.sponsored')}
          </div>
        </div>
      )}
      
      {/* Tutoriel rapide - affiché brièvement au début du jeu */}
      {gameStarted && showTutorial && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-40">
          <div className="text-center p-4">
            <h3 className={`text-primary ${styles.titleClass} mb-3`}>{t('gameAd.howToPlay')}</h3>
            <p className={`text-white ${styles.textClass} mb-2`}>{t('gameAd.clickTargets')}</p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-white text-[10px]">{t('gameAd.smallerTargets')}</span>
            </div>
            <p className={`text-primary ${styles.textClass} mb-3`}>{t('gameAd.combosIncrease')}</p>
          </div>
          <button
            className="bg-primary text-black px-4 py-2 rounded-md text-sm mt-2"
            onClick={() => setShowTutorial(false)}
          >
            {t('gameAd.gotIt')}
          </button>
        </div>
      )}
      
      {/* Zone de jeu */}
      {gameStarted && !showTutorial && (
        <div 
          ref={gameAreaRef}
          className="absolute inset-0 overflow-hidden z-10"
          style={{ cursor: 'crosshair' }}
        >
          {/* Affichage du score et du temps */}
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded z-30">
            <div className={`text-white ${styles.scoreClass} ${getTextClass()}`}>
              {t('gameAd.score')}: <span id="score-display" className="font-bold">{score}</span>
            </div>
            <div className={`text-white ${styles.scoreClass} ${getTextClass()}`}>
              {t('gameAd.time')}: <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
            </div>
          </div>
          
          {/* Indicateur de combo */}
          <div className="absolute top-2 left-28 bg-black/70 backdrop-blur-sm px-2 py-1 rounded z-30">
            <div className={`${styles.scoreClass} ${
              comboMultiplier >= 2.5 ? 'text-red-400' : 
              comboMultiplier >= 1.5 ? 'text-yellow-400' : 
              'text-white/70'
            }`}>
              {t('gameAd.combo')}: <span className="font-bold">{comboMultiplier.toFixed(1)}x</span>
            </div>
          </div>
          
          {/* Difficulté actuelle */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded z-30">
            <div className={`${styles.scoreClass} ${getTextClass()} ${
              difficulty === 'easy' ? 'text-green-400' : 
              difficulty === 'hard' ? 'text-red-400' : 
              'text-primary'
            }`}>
              {difficulty === 'easy' ? t('gameAd.easy') : 
               difficulty === 'hard' ? t('gameAd.hard') : 
               t('gameAd.medium')}
            </div>
          </div>
          
          {/* Cibles à cliquer avec adaptation tactile pour les écrans mobiles */}
          {targets.map(target => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id, target.points)}
              className="absolute rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110 touch-manipulation"
              style={{
                left: `${target.x}px`,
                top: `${target.y}px`,
                width: `${target.size}px`,
                height: `${target.size}px`,
                backgroundColor: target.color,
                boxShadow: `0 0 10px ${target.color}`,
                animation: `pulse-${target.id} 0.8s infinite alternate`,
                WebkitTapHighlightColor: 'transparent' // Supprime le surlignage au tap sur mobile
              }}
            >
              <span className={`text-white text-[8px] font-bold ${target.size < 20 ? 'opacity-0' : ''}`}>+{target.points}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Écran de fin de jeu avec animations et options */}
      {gameEnded && (
        <div 
          ref={ctaRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 z-30"
        >
          <h3 className={`text-primary font-valorant ${styles.titleClass} mb-2 ${getTextClass()}`}>{t('gameAd.gameOver')}</h3>
          <p className={`text-white text-center mb-2 ${styles.textClass} ${getTextClass()}`}>
            {t('gameAd.finalScore')}: <span className="text-primary font-bold text-xl">{score}</span>
          </p>
          
          {/* Indication nouveau record */}
          {score > highScore && (
            <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-md mb-2 animate-pulse">
              {t('gameAd.newHighScore')}!
            </div>
          )}
          
          {/* Badge de difficulté */}
          <div className={`mb-3 px-3 py-1 rounded-full ${
            difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : 
            difficulty === 'hard' ? 'bg-red-500/20 text-red-400' : 
            'bg-primary/20 text-primary'
          }`}>
            <span className={`${styles.textClass} font-bold`}>
              {difficulty === 'easy' ? t('gameAd.easyMode') : 
               difficulty === 'hard' ? t('gameAd.hardMode') : 
               t('gameAd.mediumMode')}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <button 
              onClick={restartGame}
              className={`bg-primary hover:bg-primary/80 text-black font-valorant ${styles.buttonClass} rounded-md transition-all duration-300 transform hover:scale-105 ${getTextClass()}`}
            >
              {t('gameAd.playAgain')}
            </button>
            
            <a 
              href="https://mgexpo.ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`bg-white hover:bg-white/80 text-black font-valorant ${styles.buttonClass} rounded-md transition-all duration-300 transform hover:scale-105 ${getTextClass()}`}
            >
              {t('gameAd.visitSite')}
            </a>
          </div>
          
          {/* Recommandation pour partager le score */}
          <div className="mt-3 text-white/60 text-[10px] text-center">
            {t('gameAd.shareScore')}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameAd; 