import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Composant pour afficher des titres en français avec le bon style
 * et un bon support des caractères accentués
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu du titre
 * @param {string} props.textKey - Clé de traduction optionnelle
 * @param {string} props.className - Classes CSS additionnelles
 * @param {string} props.as - Élément HTML à utiliser (h1, h2, etc.)
 * @param {object} props.rest - Autres propriétés à passer à l'élément
 */
const FrenchTitle = ({ 
  children, 
  textKey, 
  className = '', 
  as: Component = 'h1',
  ...rest 
}) => {
  const { t, language } = useTranslation();
  const titleRef = useRef(null);
  
  // Définir les classes CSS spécifiques au style de titre
  const titleClass = `${className} ${language === 'fr' ? 'french-title' : ''}`.trim();
  
  // Contenu à afficher (soit la traduction, soit les enfants directs)
  const content = textKey ? t(textKey) : children;
  
  // Style pour assurer l'affichage horizontal du texte
  const style = {
    display: 'block',
    whiteSpace: 'normal',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed'
  };
  
  return (
    <Component 
      ref={titleRef}
      className={titleClass}
      data-lang={language}
      style={style}
      {...rest}
    >
      {content}
    </Component>
  );
};

export default FrenchTitle; 