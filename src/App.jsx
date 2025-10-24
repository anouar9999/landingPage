import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
import { AdProvider } from "./contexts/AdContext";
import Hero from "./components/Hero";
import About from "./components/About";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import ProPath from "./components/ProPath";
import FAQ from "./components/FAQ";
import FooterAd from "./components/FooterAd";
import Footer from "./components/Footer";
import GameAd from "./components/GameAd";
import AdController from "./components/AdController";
import Documentation from "./pages/Documentation";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PassGamersPage from "./pages/PassGamersPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import adLoader from './utils/adLoader';
import Features from "./components/Features";
import Arena from "./components/Arena";

// Importation des nouveaux composants publicitaires
import SmallBannerAd from './components/SmallBannerAd';
import SidebarAd from './components/SidebarAd';
import InlineAd from './components/InlineAd';
import NavBar from "./components/Navbar";
import OrganizerPage from "./components/Organizer";

import OrganizerBanner from "./components/OrganizerBanner";
// import FloatingAd from './components/FloatingAd';

// Composant principal de l'application
function MainPage() {
  const lenisRef = useRef();
  const { language } = useLanguage(); // Accéder à la langue actuelle
  const lastLanguageRef = useRef(language); // Référence pour suivre la dernière langue
  const rafIdRef = useRef(null); // Référence pour l'animation frame
  const [adVisible, setAdVisible] = useState(false); // État pour contrôler la visibilité de l'annonce - désactivé par défaut
  const [showDomainNotice, setShowDomainNotice] = useState(true); // État pour la notification de domaine
  const [showAds, setShowAds] = useState(false); // État pour contrôler la visibilité des annonces globalement - désactivé par défaut
  const [showSmallBanner, setShowSmallBanner] = useState(false); // État pour le petit bandeau - désactivé par défaut
  const [showLeftSidebar, setShowLeftSidebar] = useState(false); // État pour la sidebar gauche - désactivé par défaut
  const [showRightSidebar, setShowRightSidebar] = useState(false); // État pour la sidebar droite - désactivé par défaut
  const [showFloatingAd, setShowFloatingAd] = useState(false); // État pour l'annonce flottante - désactivé par défaut
  const [hasSeenFloatingAd, setHasSeenFloatingAd] = useState(false);
  const scrollRef = useRef(null);
  // const [performanceScore, setPerformanceScore] = useState(0);
  // const [adBlocked, setAdBlocked] = useState(false);
  const [adControllerExpanded, setAdControllerExpanded] = useState(false); // État pour contrôler l'expansion du panneau de contrôle
  
  // Fonction pour initialiser ou réinitialiser Lenis
  const initLenis = () => {
    // Nettoyer l'instance précédente si elle existe
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    
    // Débloquer explicitement le défilement avant d'initialiser Lenis
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    // Configuration de Lenis - Optimized for responsive, smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,  // Smooth animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Smooth easing
      direction: "vertical", 
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,  // Standard mouse wheel responsiveness
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,  // Balanced smoothing - responsive but smooth
    });

    lenisRef.current = lenis;

    // Intégrer Lenis avec GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // CRITICAL: Configure ScrollTrigger for better performance
    ScrollTrigger.defaults({
      markers: false,
    });
    
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
    
    gsap.ticker.lagSmoothing(1000, 16);
    
    // Refresh ScrollTrigger after Lenis is ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    
    // Animation loop pour Lenis
    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    
    rafIdRef.current = requestAnimationFrame(raf);
  };
  
  // Initialiser Lenis au montage du composant
  useEffect(() => {
    // DISABLED: Using native scroll for instant responsiveness like Organizer page
    // initLenis();
    
    // Ajouter un écouteur pour l'événement LenisReset
    const handleLenisReset = () => {
      // initLenis();
    };
    
    window.addEventListener('LenisReset', handleLenisReset);
    
    // Cleanup lors du démontage
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      window.removeEventListener('LenisReset', handleLenisReset);
    };
  }, []);
  
  // Réinitialiser Lenis lors des changements de langue
  useEffect(() => {
    // Vérifier si la langue a changé
    if (language !== lastLanguageRef.current) {
      
      // Mettre à jour la référence de la dernière langue
      lastLanguageRef.current = language;
      
      // Débloquer explicitement le défilement
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Attendre que les changements de DOM soient appliqués avant de réinitialiser
      setTimeout(() => {
        // DISABLED: Using native scroll
        // initLenis();
        
        // Forcer une mise à jour de ScrollTrigger
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [language]);
  
  // Effet pour masquer automatiquement la notification de domaine après 15 secondes
  useEffect(() => {
    if (showDomainNotice) {
      const timer = setTimeout(() => {
        setShowDomainNotice(false);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [showDomainNotice]);
  
  // Effet pour gérer la classe du body
  useEffect(() => {
    if (showSmallBanner) {
      document.body.classList.add('has-top-ad');
    } else {
      document.body.classList.remove('has-top-ad');
    }
    
    // Initialiser ScrollTrigger une seule fois
    if (scrollRef.current === null) {
      scrollRef.current = true;
    }
    
    return () => {
      document.body.classList.remove('has-top-ad');
    };
  }, [showSmallBanner]);
  
  // Méthode optimisée pour fermer la petite bannière
  const handleCloseSmallBanner = () => {
    const bannerElement = document.querySelector('.small-banner-ad');
    if (bannerElement) {
      bannerElement.style.opacity = '0';
      bannerElement.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        setShowSmallBanner(false);
      }, 300);
    } else {
      setShowSmallBanner(false);
    }
  };
  
  // Gestion de la fermeture de l'annonce flottante avec mémoire
  // const handleCloseFloatingAd = () => {
  //   setShowFloatingAd(false);
  //   setHasSeenFloatingAd(true);
    
  //   // Sauvegarder dans localStorage pour 24h
  //   const now = new Date();
  //   localStorage.setItem('floatingAdClosed', now.toString());
  // };
  
  // Vérifier si l'annonce flottante a déjà été fermée récemment
  useEffect(() => {
    const lastClosed = localStorage.getItem('floatingAdClosed');
    if (lastClosed) {
      const closedTime = new Date(lastClosed);
      const now = new Date();
      const hoursSinceClosed = (now - closedTime) / (1000 * 60 * 60);
      
      // Si fermée depuis moins de 24h, ne pas afficher
      if (hoursSinceClosed < 24) {
        setShowFloatingAd(false);
        setHasSeenFloatingAd(true);
      }
    }
  }, []);
  
  // Gestion optimisée des publicités basée sur les performances de l'appareil
  useEffect(() => {
    const initializeAds = async () => {
      // Vérifier si l'utilisateur a un bloqueur de publicités
      const isBlocked = await adLoader.detectAdBlocker();
      // setAdBlocked(isBlocked);
      
      // Optimiser la densité des publicités en fonction des performances de l'appareil
      const score = adLoader.optimizeAdLoad();
      // setPerformanceScore(score);
      
      const adDensity = adLoader.getOptimalAdDensity();
      
      // Ne pas ajuster automatiquement les publicités au chargement - utilisateur doit les activer manuellement
      // Les commentaires ci-dessous sont conservés pour référence sur le comportement précédent
      /*
      if (adDensity === 'low') {
        // En cas de performances faibles, réduire le nombre de publicités
        setShowLeftSidebar(false);
        setShowRightSidebar(false);
        setShowFloatingAd(false);
      } else if (adDensity === 'medium') {
        // Réduire légèrement
        setShowFloatingAd(false);
      }
      */
      
      if (isBlocked) {
        // Message discret pour les utilisateurs avec bloqueur de pub
      }
    };
    
    initializeAds();
  }, []);
  
  // Fonction pour activer toutes les publicités
  const activateAllAds = () => {
    setShowAds(true);
    setShowSmallBanner(true);
    setShowLeftSidebar(true);
    setShowRightSidebar(true);
    setShowFloatingAd(true);
    setAdVisible(true);
  };
  
  // Fonction pour désactiver toutes les publicités
  const deactivateAllAds = () => {
    setShowAds(false);
    setShowSmallBanner(false);
    setShowLeftSidebar(false);
    setShowRightSidebar(false);
    setShowFloatingAd(false);
    setAdVisible(false);
  };

  return (
    <main className="relative min-h-screen w-screen bg-black">
      {/* Notification de changement de domaine */}
      {/* {showDomainNotice && (
        <div className="fixed top-0 left-0 w-full bg-primary text-black z-[1001] shadow-md">
          <div className="container mx-auto py-2 px-4 flex items-center justify-between">
            <p className="text-sm md:text-base font-medium">
              Notre plateforme est désormais accessible via <strong>mgexpo.ma</strong>! 
              Les dashboards sont disponibles sur <strong>user.mgexpo.ma</strong> et <strong>admin.mgexpo.ma</strong>
            </p>
            <button 
              onClick={() => setShowDomainNotice(false)}
              className="ml-2 text-black hover:text-black/70 transition-colors"
              aria-label="Fermer la notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )} */}
      
      <NavBar />
      
      {/* Petit bandeau publicitaire sous le header - format 300x60 avec meilleur positionnement */}
      {showSmallBanner && (
        <div className="fixed top-[80px] left-0 right-0 mt-4 z-50 small-banner-ad ad-fade-in">
          <SmallBannerAd onClose={handleCloseSmallBanner} />
        </div>
      )}
      
      {/* Sidebar publicitaire de gauche */}
      {showLeftSidebar && (
        <div className="fixed left-2 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
          <SidebarAd position="left" onClose={() => setShowLeftSidebar(false)} />
        </div>
      )}
      
      {/* Sidebar publicitaire de droite */}
      {showRightSidebar && (
        <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
          <SidebarAd position="right" onClose={() => setShowRightSidebar(false)} />
        </div>
      )}
      
      {/* Section Hero */}
      <Hero />
      
      {/* Section À propos */}
      {/* <About /> */}
      
      {/* Publicité en ligne entre les sections */}
      {/* <div className="container mx-auto px-4">
        <InlineAd />
      </div>
       */}
      {/* Section Road to Glory */}
      <Tri9lGlory />
      
      {/* Section Prize Pool */}
      {/* <PrizePool /> */}
      
      {/* Section ProPath */}
      <div id="pro-path">
        <ProPath />
      </div>
            <Features />

      {/* Arena Section */}
      <Arena />

      {/* Publicité en ligne entre les sections */}
      {/* <div className="container mx-auto px-4">
        <InlineAd />
      </div> */}

      {/* <OrganizerBanner/> */}
      {/* Section FAQ */}
      <div id="faq">
        <FAQ />
      </div>
      
      {/* Bannière de footer */}
      {/* <FooterAd /> */}
      
      {/* Footer */}
      <Footer />
      
      {/* Panneau publicitaire flottant - amélioré avec position et animation */}
      {adVisible && (
        <div className="fixed right-4 top-[40%] transform -translate-y-1/2 z-50 transition-all duration-500 hover:scale-105 floating-ad">
          <div className="relative">
            {/* Étiquette */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs px-3 py-1 rounded-t-md font-bold shadow-lg">
              Publicité
            </div>
            {/* Bouton de fermeture personnalisé */}
            <button 
              onClick={() => setAdVisible(false)}
              className="absolute -top-8 -right-2 bg-black/80 hover:bg-primary text-white hover:text-black rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Fermer la publicité"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {/* Annonce avec effet d'ombre amélioré */}
            <div className="transform transition-transform duration-700 hover:rotate-1 ad-container">
              <GameAd width={280} height={230} className="shadow-2xl ring-1 ring-primary/30" />
            </div>
            
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
          </div>
        </div>
      )}
      
      {/* Nouvelle bannière publicitaire fixe en bas */}
      {showAds && (
        <div className="fixed bottom-0 left-0 w-full z-40 bg-black/70 backdrop-blur-md border-t border-primary/30 py-2 fixed-bottom-ad">
          <div className="container mx-auto flex items-center justify-center relative">
            {/* Label */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs px-3 py-1 rounded-t-md font-bold">
              Publicité
            </div>
            
            {/* Annonce */}
            <div className="ad-container">
              <img 
                src="/ads/banner-wide.jpg" 
                alt="Publicité" 
                className="h-16 md:h-20 w-auto object-contain rounded shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/728x90?text=MGExpo";
                  e.target.alt = "Publicité MGExpo";
                }}
              />
            </div>
            
            {/* Bouton de fermeture */}
            <button 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/60 hover:bg-primary text-white hover:text-black rounded-full p-1.5 transition-all duration-300"
              aria-label="Fermer la publicité"
              onClick={() => {
                const adElement = document.querySelector('.fixed-bottom-ad');
                if (adElement) {
                  adElement.classList.add('hidden');
                  setTimeout(() => {
                    adElement.style.display = 'none';
                  }, 500);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Floating Ad avec suppression intelligente */}
      {showFloatingAd && !hasSeenFloatingAd && (
        // <FloatingAd onClose={handleCloseFloatingAd} autoHideTime={20000} />
        <div></div>
      )}
      
      {/* Contrôleur de publicités amélioré pour la démonstration */}
      {/* <AdController 
        onToggleSmallBanner={() => setShowSmallBanner(!showSmallBanner)}
        onToggleLeftSidebar={() => setShowLeftSidebar(!showLeftSidebar)}
        onToggleRightSidebar={() => setShowRightSidebar(!showRightSidebar)}
        onToggleFloatingAd={() => setShowFloatingAd(!showFloatingAd)}
        onActivateAll={activateAllAds}
        onDeactivateAll={deactivateAllAds}
        showSmallBanner={showSmallBanner}
        showLeftSidebar={showLeftSidebar}
        showRightSidebar={showRightSidebar}
        showFloatingAd={showFloatingAd}
        showAllAds={showAds}
        setAdControllerExpanded={setAdControllerExpanded}
        adControllerExpanded={adControllerExpanded}
      /> */}
    </main>
  );
}

// Wrapper pour initialiser les fonctionnalités après le chargement de l'application
const AppInitializer = ({ children }) => {
  const { language, isRtl } = useLanguage();
  
  // Effect pour mettre à jour la direction du document et les classes
  useEffect(() => {
    if (document) {
      document.dir = isRtl ? 'rtl' : 'ltr';
      
      // Mise à jour des classes sur l'élément HTML
      const htmlElement = document.documentElement;
      
      // Gestion RTL
      if (isRtl) {
        htmlElement.classList.add('rtl');
      } else {
        htmlElement.classList.remove('rtl');
      }
    }
  }, [language, isRtl]);
  
  return (
    <>
      {/* <TifinaghFontLoader /> */}
      {children}
    </>
  );
};

// Composant App principal avec les providers nécessaires
function App() {
  return (
    <AdProvider>
      <LanguageProvider>
        <AppInitializer>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/downloads" element={<Documentation />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/organizer" element={<OrganizerPage />} />
            <Route path="/pass-gamers" element={<PassGamersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfService />} />
          </Routes>
        </AppInitializer>
      </LanguageProvider>
    </AdProvider>
  );
}

export default App;
