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
  const [timeLeft, setTimeLeft] = useState(15); // 15 secondes de jeu
  const [targets, setTargets] = useState([]);
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);
  const adRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Générer une cible avec position et taille aléatoires
  const generateTarget = () => {
    if (!gameAreaRef.current) return null;
    
    const areaWidth = gameAreaRef.current.offsetWidth;
    const areaHeight = gameAreaRef.current.offsetHeight;
    
    const size = Math.floor(Math.random() * 20) + 20; // Taille entre 20 et 40px
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
  
  // Ajouter une nouvelle cible périodiquement
  useEffect(() => {
    let targetInterval;
    
    if (gameStarted && !gameEnded) {
      // Ajouter une première cible
      setTargets([generateTarget()]);
      
      // Ajouter de nouvelles cibles à intervalles réguliers
      targetInterval = setInterval(() => {
        if (targets.length < 5) { // Limiter à 5 cibles simultanées
          setTargets(prev => [...prev, generateTarget()]);
        }
      }, 800);
      
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
  }, [gameStarted, gameEnded]);
  
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
    // Mettre à jour le score
    setScore(prev => prev + points);
    
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
  
  // Ne pas afficher si les publicités sont désactivées
  // ou si l'option spécifique du jeu est désactivée
  if (!isAdTypeEnabled('game')) return null;
  
  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-[#0a0a14] to-[#16213e] ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(106, 90, 205, 0.15) inset',
        zIndex: 900 // Assurer qu'il est visible mais sous le mode démonstration
      }}
    >
      {/* Style block for animations */}
      <style>{createKeyframes()}</style>
      
      {/* Label Pub */}
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm z-30">
        <span className={`text-white text-xs font-valorant ${getTextClass()}`}>ADVERGAME</span>
      </div>
      
      {/* Bouton de fermeture */}
      <button 
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1 z-30 text-white/70 hover:text-white transition-colors"
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
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Fond grille */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(106, 90, 205, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      
      {/* Écran d'accueil */}
      {!gameStarted && !gameEnded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20">
          <h3 className={`text-primary font-valorant text-lg mb-2 ${getTextClass()}`}>{t('gameAd.title')}</h3>
          <p className={`text-white text-sm text-center mb-4 ${getTextClass()}`}>{t('gameAd.instructions')}</p>
          
          <button 
            onClick={startGame}
            className={`bg-primary text-white font-valorant text-sm px-5 py-2 rounded-md hover:bg-primary/80 transition-all ${getTextClass()}`}
          >
            {t('gameAd.play')}
          </button>
          
          <div className={`mt-4 text-white/50 text-xs text-center ${getTextClass()}`}>
            {t('gameAd.sponsored')}
          </div>
        </div>
      )}
      
      {/* Zone de jeu */}
      {gameStarted && (
        <div 
          ref={gameAreaRef}
          className="absolute inset-0 overflow-hidden z-10"
          style={{ cursor: 'crosshair' }}
        >
          {/* Affichage du score et du temps */}
          <div className="absolute top-2 right-2 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md z-30">
            <div className={`text-white text-xs ${getTextClass()}`}>
              {t('gameAd.score')}: <span id="score-display" className="font-bold">{score}</span>
            </div>
            <div className={`text-white text-xs ${getTextClass()}`}>
              {t('gameAd.time')}: <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}>{timeLeft}s</span>
            </div>
          </div>
          
          {/* Cibles à cliquer */}
          {targets.map(target => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id, target.points)}
              className="absolute rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
              style={{
                left: `${target.x}px`,
                top: `${target.y}px`,
                width: `${target.size}px`,
                height: `${target.size}px`,
                backgroundColor: target.color,
                boxShadow: `0 0 10px ${target.color}`,
                animation: `pulse-${target.id} 0.8s infinite alternate`
              }}
            >
              <span className="text-white text-[8px] font-bold">+{target.points}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Écran de fin de jeu */}
      {gameEnded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 bg-black/70 backdrop-blur-sm">
          <h3 className={`text-primary font-valorant text-lg mb-2 ${getTextClass()}`}>{t('gameAd.gameOver')}</h3>
          <p className={`text-white text-md mb-1 ${getTextClass()}`}>{t('gameAd.yourScore')}:</p>
          <div className="text-primary font-valorant text-3xl mb-3">{score}</div>
          
          <div ref={ctaRef} className="flex flex-col items-center">
            <button 
              onClick={restartGame}
              className={`bg-primary/70 text-white font-valorant text-sm px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all mb-3 ${getTextClass()}`}
            >
              {t('gameAd.playAgain')}
            </button>
            
            <a 
              href="#" 
              className={`bg-white text-primary font-valorant text-sm px-5 py-2 rounded-md hover:bg-white/90 transition-all ${getTextClass()}`}
            >
              {t('gameAd.viewOffer')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameAd; 