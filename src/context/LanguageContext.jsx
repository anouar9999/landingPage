import React, { createContext, useState, useContext, useEffect } from 'react';

// Définir les langues disponibles
export const languages = [
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇲🇦' },
  { code: 'tz', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr', flag: '🇲🇦' },
  { code: 'of', name: 'Officiel', dir: 'ltr', flag: '🇲🇦' }
];

// Créer le contexte
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // État pour stocker la langue actuelle
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Essayer de récupérer la langue enregistrée dans localStorage
    const savedLanguage = localStorage.getItem('mge-language');
    
    // Vérifier si la langue est valide
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      return savedLanguage;
    }
    
    // Essayer de détecter la langue du navigateur
    const browserLang = navigator.language.split('-')[0];
    if (languages.some(lang => lang.code === browserLang)) {
      return browserLang;
    }
    
    // Par défaut: français
    return 'fr';
  });

  // Mettre à jour la direction du document basée sur la langue
  useEffect(() => {
    const selectedLang = languages.find(lang => lang.code === currentLanguage);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.dir;
      document.documentElement.lang = currentLanguage;
      localStorage.setItem('mge-language', currentLanguage);
    }
  }, [currentLanguage]);

  // Fonction pour changer de langue
  const changeLanguage = (langCode) => {
    if (languages.some(lang => lang.code === langCode)) {
      setCurrentLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage,
      languages,
      currentLangInfo: languages.find(lang => lang.code === currentLanguage) 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider');
  }
  return context;
};

export default LanguageContext; 