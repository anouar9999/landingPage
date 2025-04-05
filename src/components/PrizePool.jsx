import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "../hooks/useTranslation";
import { Trophy, Medal, Award, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PrizeCard = ({ place, amount, index, className = "" }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          delay: index * 0.2,
          ease: "power2.out"
        }
      );
    }
  }, [index]);
  
  // Déterminer les couleurs et icônes en fonction du placement
  const getBadgeColors = () => {
    if (index === 0) return { 
      bg: "bg-gradient-to-br from-yellow-500 to-amber-600", 
      text: "text-amber-900",
      shadow: "shadow-lg shadow-amber-500/30",
      icon: <Trophy className="h-6 w-6" />
    };
    if (index === 1) return { 
      bg: "bg-gradient-to-br from-gray-300 to-gray-500", 
      text: "text-gray-800",
      shadow: "shadow-lg shadow-gray-400/30",
      icon: <Medal className="h-6 w-6" />
    };
    if (index === 2) return { 
      bg: "bg-gradient-to-br from-amber-700 to-amber-900", 
      text: "text-amber-100",
      shadow: "shadow-lg shadow-amber-800/30",
      icon: <Award className="h-6 w-6" />
    };
    return { 
      bg: "bg-gradient-to-br from-blue-500 to-blue-700", 
      text: "text-white",
      shadow: "shadow-lg shadow-blue-500/20",
      icon: <Star className="h-6 w-6" />
    };
  };
  
  const { bg, text, shadow, icon } = getBadgeColors();
  
  return (
    <div 
      ref={cardRef}
      className={`relative w-full bg-black/30 backdrop-blur-sm rounded-xl border border-white/5 p-8 overflow-hidden group ${className} ${shadow} hover:border-primary/30 transition-all duration-300`}
    >
      {/* Badge de placement */}
      <div className={`absolute -top-10 -right-10 w-20 h-20 ${bg} rounded-full flex items-center justify-center transform -rotate-12 group-hover:scale-110 transition-transform duration-300`}>
        <div className="absolute bottom-3 right-3">
          {icon}
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <p className={`font-valorant text-md uppercase text-gray-400 mb-4`}>{place}</p>
        
        <div className="relative">
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <p className="font-nightWarrior text-6xl font-bold text-[#D7C6AF] mt-4">
            {amount}<small className="text-2xl">DH</small>
          </p>
        </div>
      </div>
      
      {/* Effet de rayonnement sur hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
    </div>
  );
};

const PrizePool = () => {
  const { t, language, isRtl } = useTranslation();
  const [anim, setAnim] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const containerRef = useRef(null);
  
  // Vérifier la taille d'écran pour adaptation
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Vérifier au chargement
    checkScreenSize();
    
    // Vérifier au redimensionnement
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Créer un nouveau contexte d'animation GSAP pour faciliter le nettoyage
          const animContext = gsap.context(() => {
            // Animation des titres
            gsap.fromTo('.prize-title',
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }
            );
    
            // Animation des prix
            gsap.fromTo('.prize-item',
              { scale: 0.8, opacity: 0 },
              { 
                scale: 1, 
                opacity: 1, 
                duration: 0.6, 
                stagger: isSmallScreen ? 0.2 : 0.3,
                ease: 'back.out(1.7)',
                delay: 0.4
              }
            );
    
            // Animation des étiquettes
            gsap.fromTo('.prize-label',
              { y: 30, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                stagger: 0.15, 
                ease: 'power3.out',
                delay: 0.6
              }
            );
          }, containerRef);
    
          setAnim(animContext);
          
          // Arrêter d'observer une fois que l'animation est déclenchée
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (anim) {
        anim.revert();
      }
      observer.disconnect();
    };
  }, [isSmallScreen]);
  
  // Format de monnaie adapté
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };
  
  // Données des prix - montants adaptés pour l'affichage
  const prizes = [
    { rank: "1", amount: 250000, label: "DH" },
    { rank: "2", amount: 100000, label: "DH" },
    { rank: "3", amount: 50000, label: "DH" }
  ];
  
  return (
    <section id="PrizePool">
      <div className="relative min-h-screen w-full py-16 md:py-24 lg:py-32 bg-slate-800 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'} ref={containerRef}>
        {/* Arrière-plan et décoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* En-tête */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="prize-title text-primary text-4xl md:text-5xl lg:text-6xl font-nightWarrior mb-4">
              {t('prizePool.title', "Prize Pool")}
            </h2>
            <p className={`prize-title text-white/70 text-lg md:text-xl max-w-2xl mx-auto ${isRtl ? 'tamazight-text' : ''}`}>
              {t('prizePool.subtitle', "Compétition à la hauteur du talent marocain avec des prix exceptionnels pour les meilleurs joueurs")}
            </p>
          </div>
          
          {/* Conteneur de prix - adapté pour mobile */}
          <div className="prize-container flex flex-col md:flex-row justify-center items-center md:items-end gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-16">
            {prizes.map((prize, index) => {
              const isFirst = index === 0;
              const displayAmount = formatCurrency(prize.amount);
              
              return (
                <div 
                  key={index} 
                  className={`prize-item flex flex-col items-center ${
                    isFirst 
                      ? 'order-1 md:order-2' 
                      : index === 1 
                        ? 'order-2 md:order-1' 
                        : 'order-3 md:order-3'
                  }`}
                >
                  {/* Trophée */}
                  <div className={`relative ${
                    isFirst
                      ? 'w-32 h-32 md:w-40 md:h-40'
                      : 'w-24 h-24 md:w-32 md:h-32'
                  }`}>
                    <div className={`absolute inset-0 rounded-full ${
                      isFirst 
                        ? 'bg-yellow-500' 
                        : index === 1 
                          ? 'bg-gray-300' 
                          : 'bg-yellow-700'
                    } opacity-20 animate-pulse`}></div>
                    <div className={`flex items-center justify-center w-full h-full rounded-full border-2 ${
                      isFirst 
                        ? 'border-yellow-500 bg-yellow-500/10' 
                        : index === 1 
                          ? 'border-gray-300 bg-gray-300/10' 
                          : 'border-yellow-700 bg-yellow-700/10'
                    }`}>
                      <span className={`text-2xl md:text-3xl font-bold ${
                        isFirst 
                          ? 'text-yellow-500' 
                          : index === 1 
                            ? 'text-gray-300' 
                            : 'text-yellow-700'
                      }`}>
                        {prize.rank}
                      </span>
                    </div>
                  </div>
                  
                  {/* Montant */}
                  <div className={`text-center mt-4 ${isFirst ? 'mt-6' : ''}`}>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-white font-bold ${
                        isFirst 
                          ? 'text-4xl md:text-6xl lg:text-8xl' 
                          : index === 1 
                            ? 'text-3xl md:text-5xl lg:text-6xl'
                            : 'text-2xl md:text-4xl lg:text-5xl'
                      }`}>
                        {displayAmount}
                      </span>
                      <span className={`prize-label text-primary ml-1 ${
                        isFirst 
                          ? 'text-xl md:text-2xl' 
                          : 'text-lg md:text-xl'
                      }`}>
                        {prize.label}
                      </span>
                    </div>
                    
                    {/* Étiquette du rang */}
                    <div className={`prize-label mt-2 px-4 py-1 rounded-full ${
                      isFirst 
                        ? 'bg-yellow-500/20 text-yellow-500' 
                        : index === 1 
                          ? 'bg-gray-500/20 text-gray-300' 
                          : 'bg-yellow-700/20 text-yellow-700'
                    }`}>
                      <span className="text-sm font-medium">
                        {index === 0 
                          ? t('prizePool.champion', "Champion") 
                          : index === 1 
                            ? t('prizePool.runnerUp', "Finaliste") 
                            : t('prizePool.thirdPlace', "3ᵉ Place")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Prix additionnels - format accordéon pour mobile */}
          <div className="text-center mt-8 md:mt-12">
            <h3 className={`prize-title text-2xl md:text-3xl text-white font-bold mb-4 ${isRtl ? 'tamazight-text' : ''}`}>
              {t('prizePool.additionalPrizes', "Prix Additionnels")}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              <div className="prize-label bg-slate-700 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="text-primary text-xl md:text-2xl font-bold">10K</div>
                <div className="text-white text-sm mt-1">{t('prizePool.bestNewcomer', "Meilleur Espoir")}</div>
              </div>
              
              <div className="prize-label bg-slate-700 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="text-primary text-xl md:text-2xl font-bold">15K</div>
                <div className="text-white text-sm mt-1">{t('prizePool.mvp', "MVP du Tournoi")}</div>
              </div>
              
              <div className="prize-label bg-slate-700 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="text-primary text-xl md:text-2xl font-bold">5K</div>
                <div className="text-white text-sm mt-1">{t('prizePool.bestPlay', "Meilleure Action")}</div>
              </div>
              
              <div className="prize-label bg-slate-700 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="text-primary text-xl md:text-2xl font-bold">20K</div>
                <div className="text-white text-sm mt-1">{t('prizePool.teamAward', "Prix d'Équipe")}</div>
              </div>
            </div>
          </div>
          
          {/* Appel à l'action - adapté pour mobile */}
          <div className="text-center mt-12 md:mt-20">
            <a 
              href="#inscription" 
              className="prize-label inline-block px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-base md:text-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('prizePool.registerNow', "Inscrivez-vous maintenant")}
            </a>
            <p className="text-white/50 text-xs md:text-sm mt-4">
              {t('prizePool.registrationInfo', "Les inscriptions sont ouvertes jusqu'au 15 juin 2023")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizePool;