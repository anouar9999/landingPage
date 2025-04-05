/**
 * Utilitaire pour le chargement intelligent et la gestion des publicités
 * Optimise les performances et l'expérience utilisateur
 */

// Détecte si l'utilisateur utilise un bloqueur de publicités
export const detectAdBlocker = () => {
  return new Promise((resolve) => {
    // Créer un élément div avec une classe souvent bloquée par les ad blockers
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.cssText = 'position: absolute; top: -999px; left: -999px; width: 1px; height: 1px;';
    document.body.appendChild(testAd);
    
    // Vérifier après un court délai si l'élément est toujours présent ou a été masqué/supprimé
    setTimeout(() => {
      const isBlocked = testAd.offsetHeight === 0 || 
                       testAd.offsetParent === null || 
                       window.getComputedStyle(testAd).display === 'none';
      document.body.removeChild(testAd);
      resolve(isBlocked);
    }, 100);
  });
};

// Optimise le chargement des publicités en fonction des performances de l'appareil
export const optimizeAdLoad = () => {
  // Récupérer ou initialiser les métriques de performance de l'appareil
  let devicePerformanceScore = parseFloat(localStorage.getItem('devicePerformanceScore')) || 0;
  
  // Mesurer les performances de l'appareil (FPS et temps de chargement)
  const startTime = performance.now();
  let frames = 0;
  let animationId;
  
  const countFrames = () => {
    frames++;
    animationId = requestAnimationFrame(countFrames);
  };
  
  animationId = requestAnimationFrame(countFrames);
  
  // Arrêter la mesure après 1 seconde
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    const endTime = performance.now();
    const fps = Math.round(frames / ((endTime - startTime) / 1000));
    const loadTime = endTime - startTime;
    
    // Calculer un score de performance simple (0 à 10)
    // Plus le FPS est élevé et le temps de chargement court, meilleur est le score
    const newScore = Math.min(10, (fps / 60) * 5 + (1000 / loadTime) * 5);
    
    // Moyenne pondérée avec le score précédent pour éviter les fluctuations
    devicePerformanceScore = devicePerformanceScore > 0 
      ? (devicePerformanceScore * 0.7 + newScore * 0.3) 
      : newScore;
    
    // Sauvegarder le score pour les prochaines visites
    localStorage.setItem('devicePerformanceScore', devicePerformanceScore.toString());
  }, 1000);
  
  return devicePerformanceScore;
};

// Détermine la densité d'annonces à afficher en fonction des performances
export const getOptimalAdDensity = () => {
  const performanceScore = optimizeAdLoad();
  
  // Adapter la densité des annonces en fonction du score de performance
  if (performanceScore >= 8) {
    return 'high'; // Tous les emplacements d'annonces sont activés
  } else if (performanceScore >= 5) {
    return 'medium'; // Certaines annonces animées ou lourdes sont désactivées
  } else {
    return 'low'; // Seulement les annonces essentielles et légères sont affichées
  }
};

// Détermine si une annonce doit être affichée maintenant ou chargée en différé
export const shouldLoadAd = (adType) => {
  const adDensity = getOptimalAdDensity();
  const connectionType = navigator.connection ? navigator.connection.effectiveType : '4g';
  
  // Règles de chargement basées sur le type de connexion et la densité d'annonces
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    return adType === 'essential'; // Uniquement les annonces essentielles sur connexion lente
  }
  
  switch (adDensity) {
    case 'high':
      return true; // Tout charger
    case 'medium':
      return adType !== 'heavy'; // Ne pas charger les annonces lourdes
    case 'low':
      return ['essential', 'light'].includes(adType); // Uniquement les annonces légères et essentielles
    default:
      return true;
  }
};

// Gère la fréquence d'affichage des annonces pour éviter la fatigue publicitaire
export const shouldShowAdToUser = (adId, frequencyInHours = 4) => {
  const lastShownKey = `ad_${adId}_last_shown`;
  const lastShown = localStorage.getItem(lastShownKey);
  
  if (!lastShown) {
    localStorage.setItem(lastShownKey, Date.now().toString());
    return true;
  }
  
  const hoursSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
  
  if (hoursSinceLastShown >= frequencyInHours) {
    localStorage.setItem(lastShownKey, Date.now().toString());
    return true;
  }
  
  return false;
};

// Charge une annonce de manière différée
export const lazyLoadAd = (adElementId, threshold = 0.5) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback pour les navigateurs ne supportant pas IntersectionObserver
    return setTimeout(() => {
      const adElement = document.getElementById(adElementId);
      if (adElement) {
        adElement.classList.add('visible');
        adElement.dataset.loaded = 'true';
      }
    }, 2000);
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const adElement = entry.target;
          adElement.classList.add('visible');
          adElement.dataset.loaded = 'true';
          observer.unobserve(adElement);
        }
      });
    },
    { threshold }
  );
  
  const adElement = document.getElementById(adElementId);
  if (adElement) {
    observer.observe(adElement);
  }
  
  return observer;
};

// Génère un identifiant publicitaire basé sur l'usage
export const generateAdViewId = () => {
  const sessionId = sessionStorage.getItem('adSessionId') || 
                    Math.random().toString(36).substring(2, 15);
  
  if (!sessionStorage.getItem('adSessionId')) {
    sessionStorage.setItem('adSessionId', sessionId);
  }
  
  return `${sessionId}_${Date.now()}`;
};

// Export de l'API complète
export default {
  detectAdBlocker,
  optimizeAdLoad,
  getOptimalAdDensity,
  shouldLoadAd,
  shouldShowAdToUser,
  lazyLoadAd,
  generateAdViewId
}; 