import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook personnalisé pour gérer le chargement et l'application de la police Tifinagh
 * @returns {Object} État du chargement de la police et fonctions utilitaires
 */
const useTifinaghFont = () => {
  const { i18n } = useTranslation();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isFontError, setIsFontError] = useState(false);

  useEffect(() => {
    // Fonction pour charger la police Tifinagh
    const loadTifinaghFont = async () => {
      try {
        // Essayer de charger la police Tifinagh
        const fontFace = new FontFace(
          'Noto Sans Tifinagh',
          'url(/fonts/NotoSansTifinagh-Regular.woff2) format("woff2"), url(/fonts/NotoSansTifinagh-Regular.ttf) format("truetype")'
        );
        
        // Attendre que la police soit chargée
        const loadedFont = await fontFace.load();
        
        // Ajouter la police aux polices du document
        document.fonts.add(loadedFont);
        
        // Marquer la police comme chargée
        setIsFontLoaded(true);
        setIsFontError(false);
        
        console.log('Police Tifinagh chargée avec succès');
      } catch (error) {
        console.error('Erreur lors du chargement de la police Tifinagh:', error);
        setIsFontError(true);
      }
    };

    // Charger la police Tifinagh si la langue est définie sur Tamazight
    if (i18n.language === 'tz' && !isFontLoaded) {
      loadTifinaghFont();
    }

    // Appliquer la classe sur l'élément HTML pour les styles globaux
    if (i18n.language === 'tz') {
      document.documentElement.classList.add('language-tamazight');
    } else {
      document.documentElement.classList.remove('language-tamazight');
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (i18n.language !== 'tz') {
        document.documentElement.classList.remove('language-tamazight');
      }
    };
  }, [i18n.language, isFontLoaded]);

  // Vérifier si un texte doit utiliser la police Tifinagh
  const shouldUseTifinagh = (text) => {
    if (i18n.language !== 'tz') return false;
    if (!isFontLoaded) return false;
    
    // Vérifie si le texte contient des caractères Tifinagh
    const tifinaghPattern = /[\u2D30-\u2D7F]/;
    return tifinaghPattern.test(text);
  };

  // Appliquer la classe Tifinagh si nécessaire
  const getTifinaghClass = (text, baseClass = '') => {
    const needsTifinagh = shouldUseTifinagh(text);
    return `${baseClass} ${needsTifinagh ? 'font-tifinagh tamazight-text' : ''}`.trim();
  };

  return {
    isFontLoaded,
    isFontError,
    shouldUseTifinagh,
    getTifinaghClass,
    isTamazightActive: i18n.language === 'tz'
  };
};

export default useTifinaghFont; 