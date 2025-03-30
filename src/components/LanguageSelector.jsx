import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Flags des langues (SVG pour une qualité optimale)
const FLAGS = {
  fr: "/img/flags/fr.svg",
  en: "/img/flags/en.svg",
  ar: "/img/flags/ar.svg",
  tz: "/img/flags/ma.svg", // Amazigh (Maroc)
};

// Noms des langues
const LANGUAGES = {
  fr: "Français",
  en: "English",
  ar: "العربية",
  tz: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
};

const LanguageSelector = () => {
  const { language, setLanguage, isLoading, fontLoaded, isTamazight } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(language);
  const dropdownRef = useRef(null);

  // Fermer le menu quand on clique en-dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mettre à jour la langue sélectionnée quand la langue change
  useEffect(() => {
    setSelectedOption(language);
  }, [language]);

  // Gérer le changement de langue
  const handleLanguageChange = (lang) => {
    setIsOpen(false);
    
    // Ne rien faire si on clique sur la même langue
    if (lang === language) return;
    
    // Visualiser le changement immédiatement
    setSelectedOption(lang);
    
    // Animation de chargement pendant le changement de langue
    setLanguage(lang);
  };

  // Détermine si la langue sélectionnée est Tamazight et si la police est en cours de chargement
  const isLoadingTamazightFont = isTamazight && !fontLoaded && isLoading;

  // Classes de style pour les éléments
  const buttonClass = `flex items-center transition-all duration-300 rounded-full ${
    isOpen ? "bg-white/15" : isHovered ? "bg-white/10" : ""
  }`;

  const flagClass = `w-6 h-6 rounded-full object-cover shadow-sm transition-transform duration-200 ${
    isOpen || isHovered ? "scale-105" : ""
  }`;

  // Animations pour Framer Motion
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.05, 
        duration: 0.2
      } 
    }),
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative text-sm z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bouton principal du sélecteur de langue */}
      <button
        aria-label="Changer de langue"
        aria-expanded={isOpen}
        className={buttonClass}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 p-1.5 px-2">
          {/* Indicateur de chargement pour la police Tifinagh */}
          {isLoadingTamazightFont ? (
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <img
              src={FLAGS[selectedOption]}
              alt={`${LANGUAGES[selectedOption]} flag`}
              className={flagClass}
            />
          )}

          {/* Petite icône de globe qui tourne lentement quand isHovered ou isOpen */}
          <Globe 
            size={14} 
            className={`text-white/70 ml-1 transition-transform duration-700 ${
              (isHovered || isOpen) ? "rotate-180" : ""
            }`} 
            strokeWidth={2.5}
          />
        </div>
      </button>

      {/* Liste déroulante des langues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 right-0 min-w-[10rem] p-1.5 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            <div className="flex flex-col space-y-1">
              {Object.keys(LANGUAGES).map((lang, index) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center px-3 py-2.5 space-x-3 rounded-lg transition-colors
                    ${lang === language 
                      ? "bg-primary/20 text-white" 
                      : "text-white/80 hover:bg-white/10 hover:text-white"}
                    ${lang === 'tz' && isLoading && !fontLoaded ? "relative" : ""}
                  `}
                  disabled={isLoading && lang === 'tz' && !fontLoaded}
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  whileTap="tap"
                  custom={index}
                >
                  <div className="relative">
                    <img
                      src={FLAGS[lang]}
                      alt={`${LANGUAGES[lang]} flag`}
                      className="w-6 h-6 rounded-full shadow"
                    />
                    
                    {/* Indicateur de chargement pour Tamazight */}
                    {lang === 'tz' && isLoading && !fontLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  <span className={lang === 'tz' ? "tifinagh-font" : ""}>
                    {LANGUAGES[lang]}
                  </span>
                  
                  {/* Indicateur de sélection */}
                  {lang === language && (
                    <span className="ml-auto">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M5 13L9 17L19 7" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector; 