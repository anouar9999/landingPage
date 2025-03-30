import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Composant pour afficher correctement le texte en Tamazight avec la police Tifinagh
 * Ce composant peut être utilisé pour envelopper du texte qui doit s'afficher en Tifinagh
 * lorsque la langue Tamazight est sélectionnée.
 */
const TamazightText = ({ children, className, as: Component = 'span', ...props }) => {
  const { i18n } = useTranslation();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  
  useEffect(() => {
    // Vérifier si la police Tifinagh est chargée
    const checkFontLoaded = async () => {
      try {
        const fontLoaded = await document.fonts.load('16px "Noto Sans Tifinagh"');
        setIsFontLoaded(fontLoaded.length > 0);
      } catch (error) {
        console.error("Erreur lors de la vérification de la police Tifinagh:", error);
        setIsFontLoaded(false);
      }
    };
    
    checkFontLoaded();
  }, []);
  
  // Appliquer la classe font-tifinagh seulement si la langue est Tamazight et que la police est chargée
  const shouldUseTifinagh = i18n.language === 'tz' && isFontLoaded;
  const combinedClassName = `${className || ''} ${shouldUseTifinagh ? 'font-tifinagh tamazight-text' : ''}`.trim();
  
  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

TamazightText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default TamazightText; 