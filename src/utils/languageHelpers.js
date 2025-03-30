/**
 * Utilitaires pour améliorer la gestion des polices et l'affichage 
 * des caractères accentués en français
 */

/**
 * Détermine si un texte contient des caractères accentués français
 * @param {string} text - Le texte à vérifier
 * @returns {boolean} - True si le texte contient des accents français
 */
export const hasAccentedCharacters = (text) => {
  if (!text || typeof text !== 'string') return false;
  
  // Recherche les caractères accentués français courants
  const accentRegex = /[éèêëàâäôöùûüÿçîïÉÈÊËÀÂÄÔÖÙÛÜŸÇÎÏ]/;
  return accentRegex.test(text);
};

/**
 * Détermine si la police "nightWarrior" convient au texte
 * @param {string} text - Le texte à vérifier 
 * @param {string} language - La langue actuelle
 * @returns {boolean} - True si le texte peut utiliser nightWarrior
 */
export const canUseNightWarrior = (text, language) => {
  // Si ce n'est pas du français, nightWarrior est OK
  if (language !== 'fr') return true;
  
  // Si c'est du français mais sans accents, nightWarrior est OK
  return !hasAccentedCharacters(text);
};

/**
 * Retourne la police appropriée selon le contenu et la langue
 * @param {string} text - Le texte à afficher
 * @param {string} language - La langue actuelle
 * @returns {string} - La classe CSS de police à utiliser
 */
export const getAppropriateFont = (text, language) => {
  if (language === 'tz') return 'tamazight-text';
  if (language === 'ar') return 'arabic-text';
  
  // Pour le français, choisir selon le contenu
  if (language === 'fr') {
    if (hasAccentedCharacters(text)) {
      return 'french-text';
    }
    // Si pas d'accents, on peut rester sur la police par défaut
    return '';
  }
  
  return '';
};

/**
 * Obtient une classe de remplacement pour nightWarrior selon la langue
 * @param {string} language - La langue actuelle 
 * @returns {string} - La classe CSS à utiliser
 */
export const getNightWarriorAlternative = (language) => {
  if (language === 'fr') return 'french-title';
  if (language === 'ar') return 'arabic-title';
  return 'font-nightWarrior'; // Par défaut
};

export default {
  hasAccentedCharacters,
  canUseNightWarrior,
  getAppropriateFont,
  getNightWarriorAlternative
}; 