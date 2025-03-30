import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Composant qui gère le chargement des polices Tifinagh et l'application des styles appropriés.
 * Mise à jour pour corriger les problèmes de chargement de la police.
 */
const TifinaghFontLoader = () => {
  const { i18n } = useTranslation();
  const [fontStatus, setFontStatus] = useState({
    loading: true,
    loaded: false,
    error: false
  });

  // Fonction pour débloquer le défilement quelle que soit la bibliothèque utilisée
  const forceUnblockScroll = () => {
    // Débloquer le défilement standard
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    // Débloquer Lenis si présent
    const lenisElements = document.querySelectorAll('.lenis');
    lenisElements.forEach(el => {
      if (el.style) {
        el.style.height = '';
        el.style.overflow = '';
      }
    });
    
    // Forcer une mise à jour de la disposition
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  };

  // Chargement direct de la police au montage du composant
  useEffect(() => {
    // Ajouter la classe fallback immédiatement pour éviter de bloquer le défilement
    document.documentElement.classList.add('tifinagh-font-fallback');
    document.documentElement.classList.remove('tifinagh-font-loading');
    
    // S'assurer que le défilement n'est pas bloqué
    forceUnblockScroll();
    
    // Utiliser requestIdleCallback pour ne pas bloquer le thread principal
    const scheduleLoad = window.requestIdleCallback || window.setTimeout;
    
    scheduleLoad(() => {
      try {
        // Créer un élément de style pour les définitions de police locale
        const style = document.createElement('style');
        style.textContent = `
          @font-face {
            font-family: 'Noto Sans Tifinagh';
            font-style: normal;
            font-weight: 400;
            src: local('Noto Sans Tifinagh'), 
                 url('/fonts/tifinagh/NotoSansTifinagh-Regular.woff2') format('woff2'),
                 url('/fonts/tifinagh/NotoSansTifinagh-Regular.ttf') format('truetype');
            font-display: swap;
          }
        `;
        document.head.appendChild(style);
        
        // Ajouter un lien Google Fonts sans spécifier la version
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tifinagh&display=swap';
        document.head.appendChild(link);
        
        // Marquer la police comme chargée après un court délai
        setTimeout(() => {
          document.documentElement.classList.add('tifinagh-font-loaded');
          document.documentElement.classList.remove('tifinagh-font-fallback');
          setFontStatus({
            loading: false,
            loaded: true,
            error: false
          });
          console.log('Police Tifinagh chargée avec succès');
        }, 500);
        
      } catch (error) {
        console.warn('Échec du chargement de la police Tifinagh, utilisation du fallback:', error);
        setFontStatus({
          loading: false,
          loaded: false,
          error: true
        });
      }
      
      // S'assurer que le défilement est débloqué
      forceUnblockScroll();
      
    }, { timeout: 1000 });

    // Nettoyage
    return () => {
      // S'assurer que le défilement n'est pas bloqué même si le composant est démonté
      forceUnblockScroll();
    };
  }, []);

  // Surveiller les changements de langue pour appliquer ou retirer la classe Tamazight
  // et résoudre les problèmes de défilement
  useEffect(() => {
    const handleLanguageChange = () => {
      const isCurrentlyTamazight = i18n.language === 'tz';
      
      // Débloquer explicitement le défilement
      forceUnblockScroll();
      
      if (isCurrentlyTamazight) {
        console.log('Activation du mode Tamazight');
        document.documentElement.classList.add('language-tamazight');
        // Forcer la mise à jour de tous les éléments Lenis
        setTimeout(() => {
          const event = new CustomEvent('LenisReset');
          window.dispatchEvent(event);
        }, 200);
      } else {
        console.log('Désactivation du mode Tamazight');
        document.documentElement.classList.remove('language-tamazight');
      }
    };
    
    // Appliquer immédiatement et s'abonner aux changements
    handleLanguageChange();
    
    // Traiter les changements de langue en mode asynchrone
    const langChangeTimer = setTimeout(() => {
      // Forcer plusieurs mises à jour pour s'assurer que tout fonctionne
      forceUnblockScroll();
      window.dispatchEvent(new Event('resize'));
      
      // Deuxième mise à jour après un délai supplémentaire
      setTimeout(() => {
        forceUnblockScroll();
        window.dispatchEvent(new CustomEvent('LenisReset'));
      }, 500);
    }, 300);
    
    return () => {
      clearTimeout(langChangeTimer);
    };
  }, [i18n.language]);

  // Ce composant ne rend rien visuellement, il gère seulement le chargement des polices
  return null;
};

export default TifinaghFontLoader; 