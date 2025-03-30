import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import i18n from '../i18n.jsx';
import { convertLatinToTifinagh, isTifinaghText } from '../utils/latinToTifinagh';
import { initTifinaghInjection, convertExistingTexts } from '../utils/domTifinaghInjector';

// Création du contexte
const LanguageContext = createContext();

// Exporter également le contexte de manière nommée pour éviter des problèmes d'importation
export { LanguageContext };

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Une version simplifiée qui ne bloque pas le défilement
const applyTifinaghToElements = (selector = '[data-tamazight="true"], .needs-tifinagh', timestamp = Date.now()) => {
  try {
    if (typeof document === 'undefined') {
      return;
    }
    
    console.log(`[${timestamp}] applyTifinaghToElements: Application légère de Tifinagh`);
    
    // Utiliser requestAnimationFrame pour éviter de bloquer le thread principal
    requestAnimationFrame(() => {
      try {
        // Sélectionner les éléments à traiter, limiter à un nombre raisonnable
        const elements = document.querySelectorAll(selector);
        const maxElements = 20; // Limiter le nombre d'éléments traités en une fois
        
        // Traiter par lots pour éviter de bloquer le thread principal
        const processElementsBatch = (startIndex, batchSize) => {
          const endIndex = Math.min(startIndex + batchSize, elements.length);
          
          for (let i = startIndex; i < endIndex; i++) {
            const el = elements[i];
            
            // Vérifier que l'élément est valide et n'a pas déjà les classes spécifiques à ignorer
            if (el && el.classList && 
                !el.classList.contains('font-nightWarrior') && 
                !el.classList.contains('nightWarrior') &&
                !el.closest('.font-nightWarrior')) {
              
              // Simplement ajouter la classe sans appliquer de styles directement
              if (!el.classList.contains('tamazight-text')) {
                el.classList.add('tamazight-text');
              }
            }
          }
          
          // S'il reste des éléments à traiter, programmer le prochain lot
          if (endIndex < elements.length) {
            setTimeout(() => {
              processElementsBatch(endIndex, batchSize);
            }, 0);
          }
        };
        
        // Démarrer le traitement par lots
        processElementsBatch(0, maxElements);
      } catch (error) {
        console.warn(`[${timestamp}] applyTifinaghToElements: Erreur lors du traitement`, error);
      }
    });
  } catch (error) {
    console.error(`[${timestamp}] applyTifinaghToElements: Erreur générale`, error);
  }
};

// Fonction pour convertir automatiquement un texte en Tifinagh
const autoConvertToTifinagh = (text) => {
  if (!text) return '';
  
  // Si le texte est déjà en Tifinagh, le retourner tel quel
  if (isTifinaghText(text)) {
    return text;
  }
  
  // Sinon, convertir le texte en Tifinagh
  return convertLatinToTifinagh(text);
};

// Provider du contexte
export const LanguageProvider = ({ children }) => {
  // État pour stocker la langue actuelle
  const [language, setLanguage] = useState(() => {
    // Obtenir la langue sauvegardée si on est côté client
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'fr';
    }
    return 'fr';
  });

  // État pour suivre si Tamazight est forcé
  const [forceTamazight, setForceTamazight] = useState(false);
  
  // Référence pour suivre si le changement est en cours
  const isChangingRef = useRef(false);
  
  // Vérifier si Tamazight doit être forcé
  useEffect(() => {
    try {
      // Option 1: Forcer via le mode développement (mettre à true pour activer)
      const forceDev = process.env.NODE_ENV === 'development' && false;
      
      // Option 2: Forcer via l'URL (par exemple, ?lang=tz)
      const urlParams = new URLSearchParams(window.location.search);
      const forceUrl = urlParams.get('lang') === 'tz';
      
      setForceTamazight(forceDev || forceUrl);
    } catch (error) {
      console.error('Erreur lors de la vérification du forceTamazight:', error);
    }
  }, []);

  // État pour suivre l'injection Tifinagh
  const tifinaghInjectorRef = useRef(null);

  // Fonction pour précharger la police Tifinagh
  const preloadTifinaghFont = useCallback(() => {
    try {
      // Vérifier si on est côté client
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      
      // Déléguer le chargement de la police au TifinaghFontLoader
      console.log('Délégation du chargement des polices Tifinagh au TifinaghFontLoader');
      
      // Initialiser l'injecteur Tifinagh
      if (typeof window !== 'undefined' && !tifinaghInjectorRef.current) {
        console.log('Initialisation de l\'injection Tifinagh via le contexte');
        tifinaghInjectorRef.current = initTifinaghInjection(() => {
          return i18n.language === 'tz';
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'injecteur Tifinagh:', error);
    }
  }, []);

  // Fonction simplifiée pour forcer l'application de la police Tifinagh 
  const forceTifinaghFont = (ref, timestamp = Date.now()) => {
    try {
      // Vérifier si le ref existe et est monté dans le DOM
      if (!ref || !ref.current) {
        console.warn(`[${timestamp}] forceTifinaghFont: Référence invalide`);
        return;
      }

      // Ajouter la classe de manière légère sans bloquer
      requestAnimationFrame(() => {
        try {
          // Appliquer une classe simple et laisser le CSS gérer le style
          const el = ref.current;
          if (el && !el.classList.contains('tamazight-text')) {
            el.classList.add('tamazight-text');
          }
        } catch (error) {
          console.warn(`[${timestamp}] forceTifinaghFont: Erreur RAF`, error);
        }
      });
    } catch (error) {
      console.error(`[${timestamp}] forceTifinaghFont: Erreur générale`, error);
    }
  };

  // Précharger la police Tifinagh dès le montage du composant
  useEffect(() => {
    preloadTifinaghFont();
  }, [preloadTifinaghFont]);

  // Lorsque la langue change, démarrer ou arrêter l'injection Tifinagh
  useEffect(() => {
    if (typeof window === 'undefined' || isChangingRef.current) return;
    
    // Marquer le début du changement
    isChangingRef.current = true;
    
    // Vérifier que document.documentElement est disponible
    if (!document || !document.documentElement) {
      console.warn('document.documentElement n\'est pas disponible');
      isChangingRef.current = false;
      return;
    }
    
    // Programmer le changement de langue pour éviter de bloquer le thread principal
    requestAnimationFrame(() => {
      try {
        // S'assurer que le défilement est toujours actif
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Stocker la langue dans le localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('language', language);
        }
        
        // Changer la langue dans i18n
        i18n.changeLanguage(language);
        
        // Mettre à jour la direction du document selon la langue
        const isRtlLang = language === 'ar';
        document.documentElement.dir = isRtlLang ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        
        // Appliquer/retirer les classes selon la langue
        const htmlClassList = document.documentElement.classList;
        
        if (language === 'tz') {
          // Ajouter les classes pour Tamazight
          htmlClassList.add('tamazight-active');
          htmlClassList.add('tifinagh-needed');
        } else {
          // Retirer les classes pour Tamazight
          htmlClassList.remove('tamazight-active');
          htmlClassList.remove('tifinagh-needed');
        }
        
        if (isRtlLang) {
          htmlClassList.add('rtl');
        } else {
          htmlClassList.remove('rtl');
        }
        
        // Marquer que le français est actif
        if (language === 'fr') {
          htmlClassList.add('french-active');
        } else {
          htmlClassList.remove('french-active');
        }
        
        // Marquer la fin du changement
        isChangingRef.current = false;
      } catch (error) {
        console.error('Erreur lors du changement de langue:', error);
        isChangingRef.current = false;
      }
    });
  }, [language]);

  // Détecter si la langue est Tamazight
  const isTamazight = language === 'tz';
  
  // Déterminer la direction du texte
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  
  // Utilitaire pour obtenir la classe CSS appropriée selon la langue
  const getTextClass = useCallback((baseClass = '') => {
    let langClass = '';
    
    if (language === 'tz') {
      langClass = 'tamazight-text';
    } else if (language === 'ar') {
      langClass = 'arabic-text';
    } else if (language === 'fr') {
      langClass = 'french-text';
    }
    
    return baseClass ? `${baseClass} ${langClass}`.trim() : langClass;
  }, [language]);

  // Memoize the context value to avoid unnecessary renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    direction,
    isRtl: direction === 'rtl',
    isTamazight,
    forceTamazight,
    convertToTifinagh: autoConvertToTifinagh,
    applyTifinaghToElements,
    forceTifinaghFont,
    getTextClass
  }), [language, direction, isTamazight, forceTamazight, getTextClass]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export par défaut du contexte pour compatibilité
export default LanguageContext; 