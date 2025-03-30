import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Target, TrendingUp, Award, Users, Trophy, Medal, Calendar, Star, Download, ExternalLink, FileText, Gamepad, Image } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

// Référencer les images depuis le dossier public
const IMAGES = {
  mobile: "/img/mobile-mge.webp",
  booster: "/img/booster.webp",
  pcBg: "/img/pc-bg.svg"
};

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fonction pour générer une image SVG de remplacement pour les étapes
const generatePlaceholderSVG = (id, title, color = '#d7c6af', bgColor = '#111122') => {
  const safeTitle = title.replace(/[<>&"']/g, '');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='${bgColor}'/%3E%3Ctext x='50%25' y='50%25' font-size='38' text-anchor='middle' fill='${color}' dominant-baseline='middle'%3E${id.toUpperCase()}%3C/text%3E%3C/svg%3E`;
};

// Fonction pour générer une image de secours pour les images manquantes
const generateFallbackImage = (imageName, text = "Image non disponible") => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23181830'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' fill='%23d7c6af' dominant-baseline='middle'%3E${text}%3C/text%3E%3Ctext x='50%25' y='60%25' font-size='18' text-anchor='middle' fill='%23d7c6af' dominant-baseline='middle'%3E${imageName}%3C/text%3E%3C/svg%3E`;
};

const ProPath = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } = useTranslation();
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);
  const proPathRef = useRef(null);
  const pathHeadingRef = useRef(null);
  const pathListRef = useRef(null);
  const timelineRef = useRef(null);
  
  const defaultOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };
  
  // Fonction pour garantir l'application de tamazight-text sur les éléments importants
  const getTamazightClass = () => {
    if (language === 'tz') return 'tamazight-text font-tifinagh';
    return '';
  };
  
  // Données des étapes du programme - Version actualisée pour le Ministère
  const steps = [
    {
      id: 'qualifications',
      icon: <Target size={24} className="text-primary" />,
      title: "Qualifications Régionales",
      description: "Débutez votre parcours par les tournois de qualification régionaux organisés dans 12 régions du Royaume. Affrontez les meilleurs talents locaux dans un format de brackets à double élimination.",
      image: "/img/qualifications.jpg", // Cette image sera générée dynamiquement si elle n'existe pas
      features: [
        "Brackets à double élimination",
        "Groupes de 8 à 16 participants",
        "Qualifications en présentiel et en ligne"
      ]
    },
    {
      id: 'national',
      icon: <TrendingUp size={24} className="text-primary" />,
      title: "Championnats Nationaux",
      description: "Les meilleurs joueurs régionaux avancent vers les tournois nationaux où ils représentent leur région et affrontent l'élite marocaine dans un format de championnat régulier avec montées et descentes.",
      image: "/img/national-championship.jpg",
      features: [
        "Compétition en format championnat",
        "Système de points saisonnier",
        "Couverture médiatique nationale"
      ]
    },
    {
      id: 'elite',
      icon: <Trophy size={24} className="text-primary" />,
      title: "Ligue Élite Marocaine",
      description: "Les champions nationaux rejoignent la Ligue Élite, où les meilleurs talents du pays s'affrontent régulièrement sous l'égide du Ministère, avec un encadrement professionnel et une visibilité internationale.",
      image: "/img/elite-league.jpg",
      features: [
        "Encadrement technique professionnel",
        "Format de ligue avec phases éliminatoires",
        "Accompagnement médiatique complet"
      ]
    },
    {
      id: 'lan-finale',
      icon: <Medal size={24} className="text-primary" />,
      title: "Grande Finale LAN Nationale",
      description: "L'apogée de la saison compétitive avec un événement LAN prestigieux où les meilleurs joueurs du pays s'affrontent sur scène devant un public, avec des commentateurs professionnels et une production TV.",
      image: "/img/lan-finals.jpg",
      features: [
        "Finales en présentiel sur scène",
        "Diffusion TV et plateformes streaming",
        "Prix et reconnaissance officiels"
      ]
    }
  ];
  
  // Jeux officiels du programme
  const officialGames = [
    { id: 'valorant', name: 'Valorant', icon: '/img/games/valorant-icon.svg' },
    { id: 'free-fire', name: 'Free Fire', icon: '/img/games/free-fire-icon.svg' },
    { id: 'street-fighter-6', name: 'Street Fighter 6', icon: '/img/games/sf6-icon.svg' },
    { id: 'fc-24', name: 'FC 24', icon: '/img/games/fc24-icon.svg' }
  ];
  
  // S'assurer que la section est visible
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
      
      // Debug message en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('ProPath section visible, langue:', language);
      }
    }
  }, [language]);
  
  // Animations lors du défilement
  useEffect(() => {
    if (sectionRef.current && typeof window !== 'undefined') {
      // Animation du titre de section
      const titleElement = document.querySelector(".pro-path-title");
      if (titleElement) {
        gsap.fromTo(
          ".pro-path-title",
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
      
      // Animation de la description
      const descriptionElement = document.querySelector(".pro-path-description");
      if (descriptionElement) {
        gsap.fromTo(
          ".pro-path-description",
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
      
      // Animation des étapes
      stepsRef.current.forEach((step, index) => {
        if (step) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            }
          });
          
          tl.fromTo(
            step,
            { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }
          );
          
          // Animation de l'image dans l'étape
          const stepImage = step.querySelector('.step-image');
          if (stepImage) {
            tl.fromTo(
              stepImage,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
              "-=0.3"
            );
          }
          
          // Animation de l'icône et du titre
          const iconElement = step.querySelector('.step-icon');
          const titleElement = step.querySelector('.step-title');
          if (iconElement && titleElement) {
            tl.fromTo(
              [iconElement, titleElement],
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
              "-=0.2"
            );
          }
          
          // Animation du texte de description
          const descriptionElement = step.querySelector('.step-description');
          if (descriptionElement) {
            tl.fromTo(
              descriptionElement,
              { opacity: 0 },
              { opacity: 1, duration: 0.4 },
              "-=0.1"
            );
          }
          
          // Animation des caractéristiques
          const featureItems = step.querySelectorAll('.feature-item');
          if (featureItems && featureItems.length > 0) {
            tl.fromTo(
              featureItems,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
              "-=0.2"
            );
          }
        }
      });
      
      // Amélioration de l'animation de la timeline
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%"
            }
          }
        );
      }
      
      // Animation de la barre de progression
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 10%",
              scrub: 0.3,
              onUpdate: (self) => {
                // Cela garantit que la barre s'anime proportionnellement au défilement
                progressBarRef.current.style.transform = `scaleY(${self.progress})`;
              }
            }
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    if (proPathRef.current && isTamazight) {
      // Force la police sur tout le composant et ses éléments clés
      forceTifinaghFont(proPathRef);
      forceTifinaghFont(pathHeadingRef);
      forceTifinaghFont(pathListRef);
      
      // Appliquer à tous les textes, même dynamiquement générés
      setTimeout(() => {
        try {
          const textElements = proPathRef.current.querySelectorAll(
            'p, h1:not(.font-nightWarrior), h2:not(.font-nightWarrior), h3:not(.font-nightWarrior), h4, span, button, li'
          );
          
          textElements.forEach(el => {
            if (!el.classList.contains('font-nightWarrior') && !el.classList.contains('nightWarrior')) {
              el.classList.add('tamazight-text');
              el.style.fontFamily = '"Noto Sans Tifinagh", "TifinaghFallback", Arial, sans-serif';
              el.style.fontSize = '1.05em';
              el.style.fontWeight = '400';
              el.style.fontDisplay = 'swap';
            }
          });
        } catch (error) {
          console.warn('Erreur non critique lors de l\'application de la police dans ProPath:', error);
          // Continuer l'exécution malgré l'erreur
        }
      }, 200);
      
      // Log en mode développement
      if (process.env.NODE_ENV === 'development') {
        console.log('ProPath: Tifinagh font applied', language);
      }
    }
  }, [language, forceTifinaghFont, isTamazight]);

  useEffect(() => {
    // S'assurer que les références existent avant d'appliquer les animations
    if (pathHeadingRef?.current && containerRef?.current) {
      // Heading animation
      gsap.from(pathHeadingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }

    // Path list animation - vérifier que la ref et ses enfants existent
    if (pathListRef?.current?.children && pathListRef.current.children.length > 0 && containerRef?.current) {
      gsap.from(pathListRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }
  }, []);

  return (
    <div 
      id="pro-path" 
      className="relative py-24 min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#0a0a14] to-[#0a0a14] border-t border-primary/20"
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ 
        position: 'relative',
        visibility: 'visible', 
        opacity: 1,
        zIndex: 1,
        scrollMarginTop: '80px',
        marginTop: '0'
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(215, 198, 175, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
            <span className={`text-primary font-valorant text-sm uppercase tracking-wider ${getTamazightClass()}`}>
              {t('proPath.tagline', "Programme Officiel du Ministère de la Jeunesse et des Sports")}
            </span>
          </div>
          
          <h2 className={`pro-path-title text-4xl md:text-5xl font-nightWarrior text-primary mb-4 ${language === 'tz' ? 'tamazight-text' : ''}`}>
            {t('proPath.title', "Nouvelle Voie vers les Pros")}
          </h2>
          
          <p className={`pro-path-description text-white/80 text-lg max-w-3xl mx-auto ${getTextClass()}`}>
            {t('proPath.description', "Le Morocco Gaming Expo ouvre une voie structurée vers le professionnalisme pour les talents esport marocains. Progressez des qualifications régionales jusqu'aux finales LAN nationales.")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a 
              href="#inscription"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <span className={getTextClass()}>{t('proPath.cta', "Débuter votre parcours pro")}</span>
              <ArrowUpRight className="ml-2" size={18} />
            </a>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-lg">
              <Calendar size={18} />
              <span className={getTextClass()}>{t('proPath.nextEvent', "Prochaines qualifications: Mars 2025")}</span>
            </div>
          </div>

          {/* Jeux officiels avec style amélioré */}
          <div className="mt-8">
            <span className={`text-white/70 text-sm mb-3 block ${getTextClass()}`}>
              {t('proPath.supportedGames', "Jeux officiels du programme:")}
            </span>
            <div className="flex flex-wrap gap-4 justify-center items-center mt-2">
              {officialGames.map(game => (
                <div key={game.id} className="group">
                  <div className="relative overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 p-2 rounded-lg border border-primary/20 hover:border-primary/40 cursor-pointer flex items-center gap-2">
                    <img 
                      src={game.icon} 
                      alt={game.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' font-size='10' text-anchor='middle' fill='%23fff' dominant-baseline='middle'%3E${game.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <span className={`text-white/90 text-sm ${getTextClass()}`}>{game.name}</span>
                    
                    {/* Animation de l'indicateur au survol */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Timeline avec les étapes - Version améliorée */}
        <div className="relative mt-16" ref={timelineRef}>
          {/* Barre de progression verticale avec style amélioré */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 hidden md:block rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="absolute top-0 w-full bg-gradient-to-b from-primary to-primary/70"
              style={{ height: '100%', transformOrigin: 'top', transform: 'scaleY(0)' }}
            ></div>
          </div>
          
          {/* Étapes alternées avec amélioration visuelle */}
          <div className="space-y-20 md:space-y-32 relative">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                ref={el => stepsRef.current[index] = el}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 relative`}
              >
                {/* Point sur la timeline (visible seulement sur desktop) */}
                <div className="absolute left-1/2 top-20 transform -translate-x-1/2 hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center z-10 relative border-2 border-[#0a0a14] shadow-lg shadow-primary/20">
                    <span className="text-black font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
                
                {/* Image */}
                <div className="w-full md:w-5/12 step-image">
                  <div className="relative rounded-lg overflow-hidden aspect-video border border-primary/30 group shadow-xl shadow-primary/10 transform transition-transform duration-500 hover:scale-[1.02]">
                    <img 
                      src={step.image} 
                      alt={t(`proPath.steps.${step.id}.title`, step.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        // Utiliser l'image de remplacement générée dynamiquement
                        e.target.src = generatePlaceholderSVG(step.id, t(`proPath.steps.${step.id}.title`, step.title));
                      }}
                    />
                    
                    {/* Étiquette de l'étape */}
                    <div className="absolute top-0 left-0 bg-primary/90 text-black py-1 px-3 flex items-center gap-1.5 rounded-br-lg">
                      <div className="step-icon">{step.icon}</div>
                      <span className={`font-bold uppercase text-sm tracking-wider ${getTextClass()}`}>
                        {t(`proPath.steps.${step.id}.label`, step.id)}
                      </span>
                    </div>
                    
                    {/* Overlay avec effet de gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Numéro de l'étape visible sur mobile */}
                    <div className="absolute top-3 right-3 md:hidden w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm">{index + 1}</div>
                  </div>
                </div>
                
                {/* Contenu de l'étape */}
                <div className="w-full md:w-7/12 bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-lg">
                  <h3 className={`step-title text-2xl font-nightWarrior text-primary mb-3 ${language === 'tz' ? 'tamazight-text' : ''}`}>
                    {t(`proPath.steps.${step.id}.title`, step.title)}
                  </h3>
                  
                  <p className={`step-description text-white/80 mb-5 ${getTextClass()}`}>
                    {t(`proPath.steps.${step.id}.description`, step.description)}
                  </p>
                  
                  {/* Caractéristiques du format de compétition */}
                  <div className="mt-4 space-y-2.5">
                    <h4 className={`text-white text-sm uppercase tracking-wider font-bold ${getTextClass()}`}>
                      {t('proPath.formatFeatures', "Format de compétition")}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="feature-item flex items-center gap-2">
                          <Star size={15} className="text-primary flex-shrink-0" />
                          <span className={`text-white/90 text-sm ${getTextClass()}`}>
                            {t(`proPath.steps.${step.id}.features.${idx}`, feature)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bouton d'en savoir plus */}
                  <div className="mt-6">
                    <a 
                      href={`#${step.id}-details`}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
                    >
                      <span className={getTextClass()}>
                        {t('proPath.learnMore', "En savoir plus")}
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section statistiques */}
        <div className="mt-24 bg-primary/5 backdrop-blur-sm rounded-2xl border border-primary/20 p-8">
          <h3 className={`text-center text-2xl font-nightWarrior text-primary mb-8 ${language === 'tz' ? 'tamazight-text' : ''}`}>
            {t('proPath.statsTitle', "L'engagement du Ministère pour l'Esport Marocain")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className={`text-4xl font-bold text-white mb-2 ${language === 'tz' ? 'tamazight-text' : ''}`}>12</div>
              <div className={`text-primary font-medium mb-1 ${getTextClass()}`}>{t('proPath.stats.regions', "Régions couvertes")}</div>
              <p className={`text-white/60 text-sm ${getTextClass()}`}>{t('proPath.stats.regionsDesc', "Tournois qualificatifs dans tout le Royaume")}</p>
            </div>
            
            <div className="p-4">
              <div className={`text-4xl font-bold text-white mb-2 ${language === 'tz' ? 'tamazight-text' : ''}`}>4</div>
              <div className={`text-primary font-medium mb-1 ${getTextClass()}`}>{t('proPath.stats.games', "Jeux officiels")}</div>
              <p className={`text-white/60 text-sm ${getTextClass()}`}>{t('proPath.stats.gamesDesc', "Diversité des disciplines esportives")}</p>
            </div>
            
            <div className="p-4">
              <div className={`text-4xl font-bold text-white mb-2 ${language === 'tz' ? 'tamazight-text' : ''}`}>400+</div>
              <div className={`text-primary font-medium mb-1 ${getTextClass()}`}>{t('proPath.stats.players', "Joueurs participants")}</div>
              <p className={`text-white/60 text-sm ${getTextClass()}`}>{t('proPath.stats.playersDesc', "À la première saison nationale")}</p>
            </div>
            
            <div className="p-4">
              <div className={`text-4xl font-bold text-white mb-2 ${language === 'tz' ? 'tamazight-text' : ''}`}>1</div>
              <div className={`text-primary font-medium mb-1 ${getTextClass()}`}>{t('proPath.stats.finale', "Grande finale LAN")}</div>
              <p className={`text-white/60 text-sm ${getTextClass()}`}>{t('proPath.stats.finaleDesc', "Événement national annuel")}</p>
            </div>
          </div>
        </div>
        
        {/* Section Nouvelle Saison Mars 2025 - Redesign complet */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-primary/30 shadow-xl">
              <div className="inline-block bg-primary/20 px-3 py-1 rounded-full mb-4">
                <span className={`text-primary text-sm font-semibold ${getTextClass()}`}>Nouveau</span>
              </div>
              
              <h3 className={`text-3xl font-nightWarrior text-white mb-4 ${language === 'tz' ? 'tamazight-text' : ''}`}>
                <span className="text-primary">Mars 2025:</span> Lancement de la nouvelle saison
              </h3>
              
              <p className={`text-white/80 mb-6 ${getTextClass()}`}>
                La nouvelle saison de compétitions MGE s'annonce avec des formats innovants, des prix plus importants et un parcours professionnel structuré pour les champions marocains.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Trophy size={14} className="text-primary" />
                  </div>
                  <div>
                    <h4 className={`text-white font-semibold mb-1 ${getTextClass()}`}>Prix total augmenté</h4>
                    <p className={`text-white/70 text-sm ${getTextClass()}`}>Récompenses et prize pools revus à la hausse</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users size={14} className="text-primary" />
                  </div>
                  <div>
                    <h4 className={`text-white font-semibold mb-1 ${getTextClass()}`}>Encadrement professionnel</h4>
                    <p className={`text-white/70 text-sm ${getTextClass()}`}>Coaching et bootcamps pour les finalistes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar size={14} className="text-primary" />
                  </div>
                  <div>
                    <h4 className={`text-white font-semibold mb-1 ${getTextClass()}`}>Calendrier étendu</h4>
                    <p className={`text-white/70 text-sm ${getTextClass()}`}>Saison complète avec phases régulières et playoffs</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="#inscription"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-2.5 px-5 rounded-lg transition-all duration-300"
                >
                  <span className={getTextClass()}>S'inscrire maintenant</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/img/Logo-MGE-2025-white.svg"
                  alt="MGE 2025"
                  className="w-4/5 h-4/5 object-contain opacity-10"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden h-full">
                <img
                  src="/img/season-2025.jpg"
                  alt="Saison 2025"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = generatePlaceholderSVG('2025', 'Saison 2025');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Nouvelle section Documentation */}
        <div 
          className="mt-20 p-8 rounded-xl bg-gradient-to-r from-[#111122] to-[#0a0a14] border border-primary/20 shadow-lg relative z-20 hover:shadow-xl hover:border-primary/30 transition-all duration-300 documentation-section"
          style={{ position: 'relative', isolation: 'isolate' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Couche d'isolation pour garantir l'interactivité */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className={`text-2xl font-nightWarrior text-primary mb-3 ${language === 'tz' ? 'tamazight-text' : ''}`}>
                {t('proPath.docs.title', "Documentation complète")}
              </h3>
              
              <p className={`text-white/80 max-w-xl ${getTextClass()}`}>
                {t('proPath.docs.description', "Consultez notre centre de documentation pour télécharger les règlements, guides de participation et ressources officielles du programme MGE.")}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3 z-10 relative">
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-2.5 px-5 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95 group relative overflow-hidden"
                  style={{ zIndex: 30 }}
                  onClick={(e) => {
                    // Garantit que le clic fonctionne même en cas d'overlay
                    e.stopPropagation();
                    window.location.href = "/downloads";
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <span className={`${getTextClass()} relative z-10`}>Accéder à la documentation</span>
                  <FileText size={16} className="relative z-10" />
                </Link>
                
                <a
                  href="https://docs.moroccogamingexpo.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-primary py-2.5 px-5 rounded-lg transition-all duration-300 border border-primary/30 hover:scale-105 cursor-pointer active:scale-95 group relative overflow-hidden"
                  style={{ zIndex: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <span className={`${getTextClass()} relative z-10`}>Documentation en ligne</span>
                  <ExternalLink size={16} className="relative z-10" />
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-auto z-10 relative">
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <Link
                  to="/downloads?filter=rules"
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden group"
                  style={{ zIndex: 30 }}
                >
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <FileText size={24} className="text-primary mb-2 relative z-10" />
                  <span className={`text-white text-sm ${getTextClass()} relative z-10`}>Règlements</span>
                </Link>
                
                <Link
                  to="/downloads?filter=guides"
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden group"
                  style={{ zIndex: 30 }}
                >
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <Gamepad size={24} className="text-primary mb-2 relative z-10" />
                  <span className={`text-white text-sm ${getTextClass()} relative z-10`}>Guides</span>
                </Link>
                
                <Link
                  to="/downloads?filter=calendar"
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden group"
                  style={{ zIndex: 30 }}
                >
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <Calendar size={24} className="text-primary mb-2 relative z-10" />
                  <span className={`text-white text-sm ${getTextClass()} relative z-10`}>Calendrier</span>
                </Link>
                
                <Link
                  to="/downloads?filter=media"
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden group"
                  style={{ zIndex: 30 }}
                >
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                  <Image size={24} className="text-primary mb-2 relative z-10" />
                  <span className={`text-white text-sm ${getTextClass()} relative z-10`}>Médias</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPath; 