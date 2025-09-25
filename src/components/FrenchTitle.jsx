import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { color } from 'framer-motion';

const FrenchTitle = ({ 
  children, 
  textKey, 
  bottomTitleKey2,
  bottomTitleKey1,
  className = '', 
  as: Component = 'h1',
  ...rest 
}) => {
  const { t, language } = useTranslation();
  const titleRef = useRef(null);
  
  // Définir les classes CSS spécifiques au style de titre
  const titleClass = `${className} ${language === 'fr' ? 'french-title flex ' : ''}`.trim();
  
  // Contenu à afficher (soit la traduction, soit les enfants directs)
  const content = textKey ? t(textKey) : children;
  
  // Style pour assurer l'affichage horizontal du texte
  const style = {
    display: 'block',
    whiteSpace: 'normal',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',

  };
  
  return (
    <>
     <Component 
      ref={titleRef}
      className={titleClass}
      data-lang={language}
      style={style}
      
      {...rest}
    >
     <b className='font-zentry '> {content} </b>
      <br />

                    {bottomTitleKey1 && <span className='font-zentry text-white'>{t(bottomTitleKey1)}</span>}
<br />
                    {bottomTitleKey2 && <span className='font-zentry text-white'>{t(bottomTitleKey2)}</span>}
    </Component>
    </>
   
  );
};

export default FrenchTitle; 