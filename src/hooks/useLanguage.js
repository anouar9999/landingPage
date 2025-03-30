import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Vérifier si le contexte existe
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  // Extraction des valeurs du contexte
  const { 
    language, 
    setLanguage, 
    isTamazight, 
    getTextClass,
    applyTifinaghToElements,
    forceTifinaghFont
  } = context;

  // Surveiller le chargement de la police Tifinagh
  useEffect(() => {
    // Fonction pour vérifier si la police est chargée
    const checkFontLoaded = () => {
      const isLoaded = document.documentElement.classList.contains('tifinagh-font-loaded');
      setFontLoaded(isLoaded);
      
      if (isLoaded && isLoading) {
        setIsLoading(false);
      }
    };

    // Observer les changements sur l'élément HTML pour détecter le chargement de la police
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkFontLoaded();
        }
      });
    });

    // Vérifier l'état initial
    checkFontLoaded();

    // Commencer l'observation
    observer.observe(document.documentElement, { attributes: true });

    // Indique un chargement en cours lorsque la langue est Tamazight
    if (isTamazight && !fontLoaded) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    // Nettoyer l'observateur lors du démontage
    return () => observer.disconnect();
  }, [isTamazight, fontLoaded, isLoading]);

  // Fonction pour changer la langue et gérer l'état de chargement
  const changeLanguage = (newLang) => {
    // Si on passe à Tamazight, indiquer le chargement
    if (newLang === 'tz' && !fontLoaded) {
      setIsLoading(true);
    }
    
    // Appeler la fonction de changement de langue du contexte
    setLanguage(newLang);
  };

  return {
    language,
    setLanguage: changeLanguage,
    isTamazight,
    fontLoaded,
    isLoading,
    getTextClass,
    applyTifinaghToElements,
    forceTifinaghFont
  };
};

export default useLanguage; 