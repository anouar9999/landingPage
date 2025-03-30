import { useContext } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from '../translations';
import { convertLatinToTifinagh, isTifinaghText } from '../utils/latinToTifinagh';

/**
 * Hook personnalisé pour gérer les traductions avec support spécial pour Tifinagh
 * @returns {Object} Fonctions et propriétés pour la traduction
 */
export const useTranslation = () => {
  // Utiliser le hook de i18next
  const { t, i18n } = useI18nTranslation();
  
  // Récupérer le contexte de langue
  const { 
    language, 
    setLanguage, 
    isTamazight, 
    isRtl, 
    getTextClass, 
    applyTifinaghToElements,
    forceTifinaghFont
  } = useContext(LanguageContext);

  /**
   * Fonction pour traduire une clé avec des variables
   * @param {string} key - Clé de traduction
   * @param {Object} options - Options de traduction
   * @returns {string} Texte traduit
   */
  const translate = (key, options = {}) => {
    try {
      return t(key, options);
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key; // Fallback à la clé en cas d'erreur
    }
  };

  // Changer la langue de l'application
  const changeLanguage = (newLang) => {
    if (newLang === language) return;
    
    // Changer la langue dans i18next et dans le contexte
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  /**
   * Fonction de traduction de base
   * @param {string} key - Clé de traduction
   * @param {Object} params - Paramètres de remplacement
   * @returns {string} Texte traduit
   */
  const t_original = (key, params = {}) => {
    // Si la clé n'existe pas, retourner la clé elle-même
    if (!key) return '';

    try {
      // Diviser la clé par des points pour naviguer dans l'objet
      const parts = key.split('.');
      let result = translations[language];
      
      // Si on a une langue et un objet de traduction valide
      if (result) {
        // Parcourir les parties de la clé
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (result[part] !== undefined) {
            result = result[part];
          } else {
            // Partie non trouvée, retourner la clé d'origine
            return key;
          }
        }
        
        // Si on arrive ici, on a trouvé une traduction
        if (typeof result === 'string') {
          // Remplacer les paramètres (si présents)
          if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
              result = result.replace(`{{${param}}}`, params[param]);
            });
          }
          return result;
        }
        
        // Si le résultat n'est pas une chaîne (par exemple un objet), retourner la clé
        return key;
      }
      
      // Aucune traduction trouvée, retourner la clé
      return key;
    } catch (error) {
      console.error(`Erreur lors de la traduction de "${key}":`, error);
      return key;
    }
  };

  /**
   * Fonction de traduction avec conversion automatique en Tifinagh
   * @param {string} key - Clé de traduction
   * @param {Object} params - Paramètres de remplacement
   * @returns {string} Texte traduit et converti si nécessaire
   */
  const tTifinagh = (key, params = {}) => {
    // Obtenir la traduction originale
    const text = t_original(key, params);
    
    // Convertir en Tifinagh si la langue est tamazight et le texte n'est pas déjà en Tifinagh
    if (language === 'tz' && !isTifinaghText(text)) {
      return convertLatinToTifinagh(text);
    }
    
    return text;
  };

  // Retourner les fonctions et propriétés utiles
  return {
    // Fonction de traduction améliorée
    t: translate,
    
    // Informations sur la langue actuelle
    language,
    isRtl,
    isTamazight,
    
    // Fonctions pour changer la langue
    setLanguage: changeLanguage,
    changeLanguage,
    
    // Fonctions utilitaires pour gérer le style et la police
    getTextClass,
    applyTifinaghToElements,
    forceTifinaghFont,
    
    // Accès à l'instance i18n pour les cas avancés
    i18n,
    
    // Exposer aussi la fonction originale sans conversion
    t_original,
    
    // Utilitaires de conversion
    convertToTifinagh: convertLatinToTifinagh,
    isTifinaghText
  };
};

export default useTranslation; 