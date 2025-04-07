import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Menu, X, Instagram, MessageSquare, Facebook, Youtube, ChevronDown, ChevronUp, Linkedin, Settings, ArrowUpRight, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
// Remplacer l'importation du logo par le chemin public
// import Logo from '../assets/images/logo.png';

const socialLinks = [
  { Icon: Facebook, link: "https://www.facebook.com/mgex.ma" },
  { Icon: Instagram, link: "https://www.instagram.com/mgex.ma/" },
  { Icon: Youtube, link: "https://www.youtube.com/channel/UCN-qYwRN2RABWRTenM1WTSg" },
  { Icon: Linkedin, link: "https://www.linkedin.com/company/102805036/" }
];

// Composant personnalisé pour l'icône X (anciennement Twitter)
const XIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    width={props.size || 24} 
    height={props.size || 24} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
  >
    <path d="M 2.9921094 3 L 9.7089844 12.861328 L 2.8867188 21 L 5.3886719 21 L 10.773438 14.488281 L 15.212891 21 L 21.214844 21 L 14.078125 10.511719 L 20.53125 3 L 18.03125 3 L 13.017578 9.015625 L 8.9375 3 L 2.9921094 3 z" fill="currentColor"></path>
  </svg>
);

// Ajout de X aux liens sociaux
socialLinks.push({
  Icon: XIcon,
  link: "https://twitter.com/mgexma"
});

const NavBar = () => {
  // Utiliser le hook de traduction
  const { t, isRtl, isTamazight, getTextClass, applyTifinaghToElements } = useTranslation();
  
  // Items de navigation principaux avec traductions
  const mainNavItems = [
    { name: t('nav.passGamers'), link: "#PassGamers" },
    { name: t('nav.documentation'), link: "/downloads" },
    { name: t('nav.faq'), link: "#faq" }
  ];
  
  // Items du sous-menu Découvrir
  const discoverSubItems = [
    { name: t('nav.discover'), link: "#about" },
    { name: t('nav.tri9lGlory'), link: "#Tri9lGlory" },
    { name: t('nav.prizePool'), link: "#PrizePool" },
    { name: t('nav.proPath'), link: "#pro-path" }
  ];
  
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  
  // Refs
  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const discoverBtnRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Appliquer les traductions en Tifinagh si nécessaire
  useEffect(() => {
    if (isTamazight) {
      // Sélectionner tous les éléments de navigation pour appliquer les conversions Tifinagh
      setTimeout(() => {
        applyTifinaghToElements('nav a, nav button, .discover-trigger, .mobile-menu a, .mobile-menu button');
      }, 100);
    }
  }, [isTamazight, applyTifinaghToElements]);

  // Screen size detection with detailed breakpoints
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024
      });
      
      // Close mobile menu when resizing to larger screens
      if (width >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Initial check
    updateScreenSize();
    
    // Add event listener
    window.addEventListener("resize", updateScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isMenuOpen]);

  // Enhanced scroll behavior with screen size consideration
  useEffect(() => {
    const handleScroll = () => {
      // At the top - always show expanded header
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        setIsHeaderCompact(false);
        setShowScrollUpButton(false);
        navContainerRef.current?.classList.remove("bg-black/95");
        navContainerRef.current?.classList.remove("shadow-md");
        navContainerRef.current?.classList.add("bg-black/30");
      } 
      // Scrolling down - hide on mobile and tablet, compact on desktop
      else if (currentScrollY > lastScrollY) {
        if (screenSize.isDesktop) {
          setIsHeaderCompact(true);
          setIsNavVisible(true);
        } else {
          setIsNavVisible(false);
        }
        setShowScrollUpButton(currentScrollY > 500);
        navContainerRef.current?.classList.add("bg-black/95");
        navContainerRef.current?.classList.add("shadow-md");
        navContainerRef.current?.classList.remove("bg-black/30");
      } 
      // Scrolling up - compact or visible with background
      else {
        setIsNavVisible(true);
        setIsHeaderCompact(screenSize.isDesktop && currentScrollY > 200);
        navContainerRef.current?.classList.add("bg-black/95");
        navContainerRef.current?.classList.add("shadow-md");
        navContainerRef.current?.classList.remove("bg-black/30");
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentScrollY, lastScrollY, screenSize.isDesktop]);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Improved mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      // Utiliser GSAP pour une animation plus fluide
      gsap.to(menuRef.current, {
        opacity: isMenuOpen ? 1 : 0,
        x: isMenuOpen ? 0 : -window.innerWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, [isMenuOpen]);

  // Sous-menu animation - Améliorée avec des effets plus fluides
  useEffect(() => {
    if (subMenuRef.current && screenSize.isDesktop) {
      gsap.to(subMenuRef.current, {
        maxHeight: isSubMenuOpen ? 300 : 0,
        opacity: isSubMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top center",
        y: isSubMenuOpen ? 0 : -10,
        scale: isSubMenuOpen ? 1 : 0.98
      });
    }
  }, [isSubMenuOpen, screenSize.isDesktop]);

  // Fermer sous-menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (subMenuRef.current && !subMenuRef.current.contains(e.target) && 
          !e.target.classList.contains('discover-trigger')) {
        setIsSubMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Améliorations de l'animation du sélecteur de langue
  useEffect(() => {
    if (languageSelectorRef.current) {
      // Ajouter une légère animation au survol
      const element = languageSelectorRef.current;
      
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.2,
          ease: "power1.in"
        });
      };
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Helper function for smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.substring(1)); // Remove the #
    if (section) {
      // Scroll to the section with a smooth animation
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close menus after navigating
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
    } else {
      console.warn(`Section with ID ${sectionId.substring(1)} not found`);
    }
  };

  // Close mobile menu on link click
  const handleLinkClick = (e, link) => {
    if (link.startsWith('#')) {
      e.preventDefault(); // Prevent default anchor behavior
      scrollToSection(link);
    } else if (link.includes('user.mgexpo.ma')) {
      // Redirect to login page in the same tab
      window.location.href = link;
      e.preventDefault();
    } else {
      // For other non-anchor links, just close the menus
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
    }
  };

  // Classe commune pour les liens de navigation - Améliorée
  const navLinkClass = "text-white hover:text-primary transition-all duration-200 text-sm uppercase whitespace-nowrap font-medium tracking-wide hover:scale-105 transform";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Background Overlay - Full Width avec transition améliorée */}
      <div 
        ref={navContainerRef}
        className={`header-overlay transition-all duration-300 ${isHeaderCompact ? 'header-compact py-1' : 'header-expanded py-2'} ${
          currentScrollY > 0 ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-black/30 backdrop-blur-[2px]'
        }`}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex items-center justify-between ${isHeaderCompact ? 'py-1' : 'py-2'} transition-all duration-300`}>
          {/* Logo à gauche - Centrer uniquement sur mobile */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/img/Logo-MGE-2025-white.svg" 
                alt="MGE Logo" 
                className={`transition-all duration-300 ${isHeaderCompact ? 'h-8 md:h-10' : 'h-10 md:h-14'}`} 
              />
            </Link>
          </div>
          
          {/* Navigation centrale - Desktop uniquement - AMÉLIORÉE */}
          <div className="hidden lg:flex items-center space-x-8 justify-center flex-grow">
            {/* Discover menu with dropdown - AMÉLIORÉ */}
            <div className="relative">
              <button 
                ref={discoverBtnRef}
                className={`${navLinkClass} flex items-center gap-1.5 discover-trigger group p-2 rounded-md hover:bg-white/5 ${getTextClass()}`}
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                aria-expanded={isSubMenuOpen}
              >
                {t('nav.discover')}
                <span className="transition-transform duration-200 group-hover:translate-y-0.5">
                  {isSubMenuOpen ? 
                    <ChevronUp size={16} className="mt-0.5 text-primary" /> : 
                    <ChevronDown size={16} className="mt-0.5" />
                  }
                </span>
              </button>
              
              {/* Dropdown menu - Complètement redesigné */}
              <div 
                ref={subMenuRef}
                className={`absolute left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl bg-[#0A0E13]/95 backdrop-blur-md origin-top-left border border-white/10
                  transition-all duration-300 ease-out
                  ${isSubMenuOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                aria-hidden={!isSubMenuOpen}
              >
                <div className="py-1.5">
                  {discoverSubItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className={`group flex items-center px-4 py-2.5 text-white hover:bg-primary/10 transition-colors text-sm uppercase ${getTextClass()}
                        ${index === 0 ? 'border-t-0' : 'border-t border-white/5'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5 group-hover:scale-125 transition-transform"></span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular nav links - AMÉLIORÉS */}
            {mainNavItems.map((item) => (
              item.link.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleLinkClick(e, item.link)}
                  className={`${navLinkClass} p-2 rounded-md hover:bg-white/5 ${getTextClass()}`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`${navLinkClass} p-2 rounded-md hover:bg-white/5 flex items-center gap-1 ${getTextClass()}`}
                >
                  {item.name}
                  <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100" />
                </Link>
              )
            ))}
          </div>

          {/* Right side - Auth buttons, Language selector */}
          <div className="flex items-center gap-4">
            {/* Réseaux sociaux sur desktop - AMÉLIORÉS */}
            <div className="hidden lg:flex items-center space-x-3 mr-4">
              {socialLinks.map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-all p-1.5 hover:scale-110 hover:bg-white/10 rounded-full"
                  aria-label={`Visit our ${Icon.name || 'social media'}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Language selector - Complètement redesigné */}
            <div 
              ref={languageSelectorRef}
              className="relative z-20 flex items-center transform-gpu"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 hover:bg-black/50 transition-all duration-200 relative">
                  <LanguageSelector />
                </div>
              </div>
            </div>

            {/* Auth button - Style complètement amélioré */}
            <a 
              href="https://user.mgexpo.ma/auth/auth1/login"
              onClick={(e) => handleLinkClick(e, "https://user.mgexpo.ma/auth/auth1/login")}
              className={`relative group overflow-hidden bg-[#e10000] hover:bg-[#c00] text-white text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-md uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#e10000]/20 hover:-translate-y-0.5 whitespace-nowrap font-bold ${getTextClass()}`}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/40 to-red-600/0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <div className="relative flex items-center justify-center gap-2">
                {t('nav.login')}
                <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Mobile menu button - visually improved */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 ml-1 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={screenSize.isMobile ? 20 : 24} />
              ) : (
                <Menu size={screenSize.isMobile ? 20 : 24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Complètement redesigné */}
        <div 
          ref={menuRef}
          className={`lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-lg
            transition-opacity duration-400 ease-in-out ${isMenuOpen ? 'visible' : 'invisible'}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="container mx-auto px-4 py-4 sm:py-5 pt-20 h-full overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={t('nav.closeMenu')}
            >
              <X size={24} />
            </button>
            
            {/* Navigation links - REFACTOR DESIGN */}
            <div className="space-y-7">
              {/* Section Découvrir */}
              <div className="border-b border-white/10 pb-6">
                <div className={`text-white/70 text-xs uppercase mb-4 pl-2 flex items-center gap-2 ${getTextClass()}`}>
                  <Globe size={14} className="text-primary" />
                  {t('nav.discover')}
                </div>
                <div className="space-y-4 ml-2">
                  {discoverSubItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className={`block text-white hover:text-primary transition-colors py-1.5 text-sm uppercase ${getTextClass()} flex items-center group`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5 group-hover:scale-125 transition-transform"></span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Items principaux */}
              <div className="border-b border-white/10 pb-6 pt-1">
                <div className={`text-white/70 text-xs uppercase mb-4 pl-2 ${getTextClass()}`}>{t('nav.mainNav')}</div>
                <div className="space-y-4 ml-2">
                  {mainNavItems.map((item) => (
                    <div key={item.name}>
                      {item.link.startsWith('#') ? (
                        <a
                          href={item.link}
                          onClick={(e) => handleLinkClick(e, item.link)}
                          className={`block text-white hover:text-primary transition-colors py-1.5 text-sm uppercase ${getTextClass()} flex items-center group`}
                        >
                          {item.name}
                          <ChevronDown className="ml-1 w-4 h-4 opacity-60 group-hover:opacity-100 -rotate-90" />
                        </a>
                      ) : (
                        <Link
                          to={item.link}
                          className={`block text-white hover:text-primary transition-colors py-1.5 text-sm uppercase ${getTextClass()} flex items-center group`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                          <ArrowUpRight className="ml-1 w-4 h-4 opacity-60 group-hover:opacity-100" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Language selector in mobile menu */}
            <div className="pt-7 mt-2 border-b border-white/10 pb-6">
              <div className={`text-white/70 text-sm uppercase mb-4 pl-2 flex items-center gap-2 ${getTextClass()}`}>
                <Globe size={14} className="text-primary" />
                {t('nav.language')}
              </div>
              <div className="bg-black/40 backdrop-blur-sm inline-block rounded-md p-1.5 ml-2">
                <LanguageSelector />
              </div>
            </div>
            
            {/* Social links - plus spacieux et mieux organisé */}
            <div className="pt-7 mt-2 border-b border-white/10 pb-6">
              <div className={`text-white/70 text-sm uppercase mb-4 pl-2 flex items-center gap-2 ${getTextClass()}`}>
                <MessageSquare size={14} className="text-primary" />
                {t('nav.followUs')}
              </div>
              <div className="flex flex-wrap items-center gap-4 ml-2">
                {socialLinks.map(({ Icon, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white bg-white/5 hover:bg-white/15 transition-all duration-200 p-3 rounded-full relative group"
                    aria-label={`Visit our ${Icon.name || 'social media'}`}
                  >
                    <span className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                    <Icon size={screenSize.isMobile ? 18 : 20} className="relative" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* CTA button - style amélioré */}
            <div className="mt-8">
              <a 
                href="https://user.mgexpo.ma/auth/auth1/login"
                onClick={(e) => handleLinkClick(e, "https://user.mgexpo.ma/auth/auth1/login")}
                className={`group relative block w-full text-center bg-[#e10000] overflow-hidden py-4 text-white font-bold text-sm uppercase hover:bg-[#c00] transition-all duration-300 rounded-md shadow-lg ${getTextClass()}`}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/40 to-red-600/0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <div className="relative flex items-center justify-center gap-2">
                  {t('nav.login')}
                  <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
              
              {/* Version indicator with improved styling */}
              <div className="text-center text-white/40 text-xs mt-6 font-mono">v2.1.0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton pour remonter - Amélioré avec meilleure animation */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-primary hover:bg-primary/80 text-white rounded-full p-3 shadow-lg
          transition-all duration-300 z-50 group ${showScrollUpButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label={t('nav.backToTop')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </header>
  );
};

export default NavBar;