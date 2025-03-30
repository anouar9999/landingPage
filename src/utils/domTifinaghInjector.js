/**
 * Utilitaire pour injecter automatiquement la conversion Tifinagh dans le DOM
 * Ces fonctions permettent de convertir les textes existants sur la page
 * de la transcription latine vers l'alphabet Tifinagh
 */

import { convertLatinToTifinagh, isTifinaghText } from './latinToTifinagh';

/**
 * Observer qui détecte les mutations du DOM et convertit automatiquement les textes
 * @param {Function} shouldConvert - Fonction qui détermine si la conversion doit être appliquée (ex: () => language === 'tz')
 * @returns {MutationObserver} L'observer créé
 */
export const createTifinaghMutationObserver = (shouldConvert) => {
  // Ne créer l'observer que si on est dans un environnement navigateur
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') {
    return null;
  }

  // Fonction pour déterminer si un élément doit être ignoré
  const shouldIgnoreElement = (element) => {
    // Ignorer les éléments non valides
    if (!element || !element.tagName) {
      return true;
    }
    
    // Ignorer les éléments qui ont déjà la classe font-nightWarrior ou nightWarrior
    if (element.classList && (
      element.classList.contains('font-nightWarrior') || 
      element.classList.contains('nightWarrior')
    )) {
      return true;
    }
    
    // Ignorer les éléments à l'intérieur d'éléments script, style, input, textarea...
    const tagName = element.tagName?.toLowerCase();
    if (['script', 'style', 'input', 'textarea', 'select', 'option'].includes(tagName)) {
      return true;
    }
    
    // Ignorer les éléments avec data-no-tifinagh
    if (element.getAttribute && element.getAttribute('data-no-tifinagh') === 'true') {
      return true;
    }
    
    return false;
  };
  
  // Function de traitement par lots
  let processingQueue = [];
  let isProcessingBatch = false;
  
  const processBatch = () => {
    if (isProcessingBatch || processingQueue.length === 0) {
      return;
    }
    
    isProcessingBatch = true;
    
    // Traiter un petit lot
    const batchSize = Math.min(20, processingQueue.length);
    const batch = processingQueue.splice(0, batchSize);
    
    // Traiter chaque nœud dans le lot actuel
    batch.forEach(node => {
      try {
        // Si c'est un nœud texte, le convertir de façon sécurisée
        if (node.nodeType === Node.TEXT_NODE && node.parentElement && !shouldIgnoreElement(node.parentElement)) {
          const text = node.nodeValue;
          if (text && text.trim() !== '' && !isTifinaghText(text)) {
            node.nodeValue = convertLatinToTifinagh(text);
          }
        }
      } catch (error) {
        console.warn("Erreur lors de la conversion d'un nœud texte", error);
      }
    });
    
    isProcessingBatch = false;
    
    // S'il reste des éléments dans la file, programmer le traitement suivant
    if (processingQueue.length > 0) {
      setTimeout(processBatch, 0);
    }
  };
  
  // Ajouter un nœud texte à la file de traitement
  const enqueueTextNode = (textNode) => {
    if (!textNode || !textNode.nodeValue || textNode.nodeValue.trim() === '') {
      return;
    }
    
    // Ignorer les nœuds texte dans les éléments à ignorer
    if (shouldIgnoreElement(textNode.parentElement)) {
      return;
    }
    
    // Ajouter à la file et démarrer le traitement si nécessaire
    processingQueue.push(textNode);
    
    if (!isProcessingBatch) {
      requestAnimationFrame(processBatch);
    }
  };
  
  // Fonction pour parcourir récursivement les nœuds texte d'un élément
  const processNode = (node) => {
    // Si on ne doit pas appliquer la conversion, sortir
    if (!shouldConvert()) {
      return;
    }
    
    // Si c'est un nœud texte, le convertir
    if (node.nodeType === Node.TEXT_NODE) {
      enqueueTextNode(node);
      return;
    }
    
    // Si c'est un élément, mais qu'il doit être ignoré, sortir
    if (node.nodeType === Node.ELEMENT_NODE && shouldIgnoreElement(node)) {
      return;
    }
    
    // Sinon, parcourir récursivement ses enfants, mais de façon limitée
    const childNodes = node.childNodes;
    if (childNodes && childNodes.length < 50) { // Limiter la récursion aux éléments avec peu d'enfants
      for (let i = 0; i < childNodes.length; i++) {
        processNode(childNodes[i]);
      }
    }
  };
  
  // Utiliser un throttle pour limiter la fréquence des traitements
  let pendingMutations = [];
  let mutationTimeout = null;
  
  const processMutations = () => {
    const mutations = [...pendingMutations];
    pendingMutations = [];
    mutationTimeout = null;
    
    // Pour chaque mutation
    mutations.forEach((mutation) => {
      // Si des nœuds ont été ajoutés
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Pour chaque nœud ajouté, limiter à un nombre raisonnable
        const nodesToProcess = Array.from(mutation.addedNodes).slice(0, 10);
        nodesToProcess.forEach(node => processNode(node));
      }
      
      // Si le contenu d'un nœud texte a changé
      if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
        enqueueTextNode(mutation.target);
      }
    });
  };
  
  // Créer l'observer MutationObserver
  const observer = new MutationObserver((mutations) => {
    pendingMutations.push(...mutations);
    
    if (!mutationTimeout) {
      mutationTimeout = setTimeout(processMutations, 100);
    }
  });
  
  return observer;
};

/**
 * Convertit tous les textes existants sur la page, de façon optimisée
 * @param {Function} shouldConvert - Fonction qui détermine si la conversion doit être appliquée
 * @param {NodeList} [targetElements] - Éléments spécifiques à convertir (facultatif)
 */
export const convertExistingTexts = (shouldConvert, targetElements = null) => {
  // Ne pas exécuter si on n'est pas dans un environnement navigateur
  if (typeof document === 'undefined') {
    return;
  }
  
  // Si on ne doit pas appliquer la conversion, sortir
  if (!shouldConvert()) {
    return;
  }
  
  // Éviter le blocage en utilisant requestIdleCallback ou setTimeout
  const scheduleConversion = window.requestIdleCallback || window.setTimeout;
  
  scheduleConversion(() => {
    const startTime = Date.now();
    console.log('Début de la conversion Tifinagh des textes existants');
    
    // Utiliser le targetElements s'il est fourni, sinon utiliser document.body
    const root = targetElements || document.body;
    
    // Créer une file de nœuds texte à traiter
    const textNodes = [];
    
    // Fonction de récursion simplifiée pour collecter les nœuds texte
    const collectTextNodes = (element) => {
      // Ignorer certains éléments
      if (!element || 
          (element.tagName && ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(element.tagName)) ||
          (element.classList && (element.classList.contains('font-nightWarrior') || element.classList.contains('nightWarrior'))) ||
          (element.getAttribute && element.getAttribute('data-no-tifinagh') === 'true')) {
        return;
      }
      
      // Si c'est un nœud texte avec du contenu, l'ajouter à la liste
      if (element.nodeType === Node.TEXT_NODE && element.nodeValue && element.nodeValue.trim() !== '') {
        textNodes.push(element);
        return;
      }
      
      // Si c'est un élément avec des enfants, parcourir récursivement
      if (element.childNodes && element.childNodes.length > 0) {
        // Limiter aux 100 premiers enfants pour éviter les boucles infinies
        const maxChildren = Math.min(element.childNodes.length, 100);
        for (let i = 0; i < maxChildren; i++) {
          collectTextNodes(element.childNodes[i]);
        }
      }
    };
    
    // Si targetElements est une NodeList, parcourir chaque élément
    if (targetElements && targetElements.length) {
      for (let i = 0; i < targetElements.length; i++) {
        collectTextNodes(targetElements[i]);
      }
    } else {
      // Sinon, parcourir à partir de la racine
      collectTextNodes(root);
    }
    
    // Limiter le nombre de nœuds texte à traiter pour éviter les blocages
    const maxNodesToProcess = Math.min(textNodes.length, 200);
    const nodesToProcess = textNodes.slice(0, maxNodesToProcess);
    
    console.log(`Conversion de ${nodesToProcess.length}/${textNodes.length} nœuds texte`);
    
    // Traiter les nœuds par lots
    const processTextNodesBatch = (startIndex, batchSize) => {
      const endIndex = Math.min(startIndex + batchSize, nodesToProcess.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        const textNode = nodesToProcess[i];
        try {
          // Vérifier si le texte est déjà en Tifinagh
          if (!isTifinaghText(textNode.nodeValue)) {
            textNode.nodeValue = convertLatinToTifinagh(textNode.nodeValue);
          }
        } catch (error) {
          console.warn("Erreur lors de la conversion d'un nœud texte", error);
        }
      }
      
      // S'il reste des nœuds à traiter, programmer le prochain lot
      if (endIndex < nodesToProcess.length) {
        setTimeout(() => {
          processTextNodesBatch(endIndex, batchSize);
        }, 0);
      } else {
        const elapsedTime = Date.now() - startTime;
        console.log(`Conversion Tifinagh terminée en ${elapsedTime}ms`);
      }
    };
    
    // Démarrer le traitement par lots (petits lots pour éviter de bloquer)
    processTextNodesBatch(0, 20);
  }, { timeout: 200 });
  
  console.log('Conversion Tifinagh appliquée aux textes existants');
};

/**
 * Initialise la conversion Tifinagh pour toute l'application
 * @param {Function} shouldConvert - Fonction qui détermine si la conversion doit être appliquée
 * @returns {Object} Objet contenant les fonctions start et stop pour démarrer/arrêter l'injection
 */
export const initTifinaghInjection = (shouldConvert) => {
  let observer = null;
  let isInjectionActive = false;
  
  return {
    // Démarre l'injection (à appeler au chargement de la page ou au changement de langue)
    start: () => {
      // Éviter de démarrer plusieurs fois
      if (isInjectionActive) {
        console.log('L\'injection Tifinagh est déjà active');
        return;
      }
      
      // Débloquer le défilement explicitement
      if (document && document.body) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
      
      isInjectionActive = true;
      
      // Convertir d'abord les textes existants, mais de façon asynchrone
      setTimeout(() => {
        convertExistingTexts(shouldConvert);
        
        // Puis créer et démarrer l'observer pour les changements futurs
        observer = createTifinaghMutationObserver(shouldConvert);
        if (observer) {
          observer.observe(document.body, {
            childList: true,       // Observer les changements d'enfants
            subtree: true,         // Observer l'arbre entier
            characterData: true,   // Observer les changements de texte
          });
          console.log('Observer Tifinagh démarré');
          
          // S'assurer que le défilement fonctionne après l'initialisation
          setTimeout(() => {
            if (document && document.body) {
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
              window.dispatchEvent(new Event('resize'));
            }
          }, 300);
        }
      }, 100);
    },
    
    // Arrête l'injection (à appeler en cas de changement de langue vers une autre langue)
    stop: () => {
      if (observer) {
        observer.disconnect();
        observer = null;
        console.log('Observer Tifinagh arrêté');
      }
      isInjectionActive = false;
      
      // S'assurer que le défilement est actif
      if (document && document.body) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
  };
};

export default {
  initTifinaghInjection,
  convertExistingTexts,
  createTifinaghMutationObserver
}; 