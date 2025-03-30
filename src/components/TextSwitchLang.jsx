import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Composant pour afficher du texte multilingue avec gestion spéciale 
 * de la police Tifinagh pour la langue tamazight
 *
 * @param {Object} props Les propriétés du composant
 * @param {string} props.textKey La clé de traduction à utiliser
 * @param {any} props.fallback Contenu alternatif si la traduction n'est pas disponible
 * @param {Object} props.options Options supplémentaires pour la traduction
 * @param {string} props.className Classes CSS additionnelles
 */
const TextSwitchLang = ({ 
  textKey, 
  fallback = '', 
  options = {}, 
  className = '',
  ...props 
}) => {
  const { t, language, forceTifinaghFont, isTamazight } = useTranslation();
  const textRef = useRef(null);
  
  // Effet pour appliquer la police Tifinagh si nécessaire
  useEffect(() => {
    if (textRef.current && isTamazight) {
      forceTifinaghFont(textRef);
    }
  }, [language, forceTifinaghFont, isTamazight]);
  
  // Déterminer les classes à appliquer en fonction de la langue
  const getLanguageClass = () => {
    if (isTamazight) return 'tamazight-text';
    if (language === 'fr') return 'french-text';
    if (language === 'ar') return 'arabic-text';
    return '';
  };
  
  // Obtenir le texte traduit ou le fallback
  const translatedText = t(textKey, options) || fallback;
  
  // Si la traduction est la même que la clé (pas de traduction trouvée), utiliser le fallback
  const finalText = translatedText === textKey ? fallback : translatedText;
  
  return (
    <span 
      ref={textRef}
      className={`text-switch-lang ${getLanguageClass()} ${className}`}
      data-textkey={textKey}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      {...props}
    >
      {finalText}
    </span>
  );
};

export default TextSwitchLang; 