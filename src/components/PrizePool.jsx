import gsap from "gsap";
import { useRef, useEffect } from "react";
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
  const { t, isRtl, language } = useTranslation();
  const frameRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  // Fonction locale pour déterminer la classe de texte
  const getTextClass = () => {
    if (language === 'tz') return 'tamazight-text';
    if (language === 'fr') return 'french-text';
    return '';
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -5;
    const rotateY = ((xPos - centerX) / centerX) * 5;

    gsap.to(element, {
      duration: 0.5,
      rotateX,
      rotateY,
      transformPerspective: 800,
      ease: "power2.out",
    });
  };
  
  useGSAP(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
    }
    
    // Effet parallaxe pour le fond
    if (sectionRef.current) {
      gsap.to(".prize-background-glow", {
        y: "-20%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });
  
  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
      });
    }
  };

  return (
    <div 
      id="PrizePool" 
      ref={sectionRef}
      className="min-h-dvh w-screen bg-black text-blue-50 relative overflow-hidden py-16" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Effet de fond et décoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="prize-background-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px] opacity-70"></div>
      <div className="prize-background-glow absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[80px] opacity-50"></div>
      
      {/* Élément décoratif */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
        <Trophy className="w-full h-full text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Titre et description */}
          <div ref={titleRef} className="mb-20 text-center max-w-2xl mx-auto">
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <span className={`text-primary font-valorant text-sm uppercase tracking-wider ${getTextClass()}`}>
                {t('prizePool.description')}
              </span>
            </div>
            
            <h2 className="mt-4 font-nightWarrior text-7xl md:text-8xl text-center text-primary relative">
              {t('prizePool.title')}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </h2>
          </div>
          
          {/* Main Prize avec animation sur hover */}
          <div 
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative p-10 flex flex-col items-center justify-center transform-gpu bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 mb-24 hover:border-primary/30 transition-all duration-300"
          >
            <div className="text-center relative z-10">
              <span className={`font-valorant text-2xl uppercase text-gray-300 ${getTextClass()}`}>
                {t('prizePool.totalPrizePool')}
              </span>
              
              <div className="relative mt-4">
                <h2 className="font-nightWarrior text-8xl font-bold text-primary">
                  250 000 <small className="text-3xl">DH</small>
                </h2>
                
                {/* Animation de brillance */}
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full animate-pulse-slow opacity-70"></div>
              </div>
              
              <div className="mt-4 px-4 py-2 rounded-full bg-primary/10 inline-block">
                <span className={`text-white/80 text-sm ${getTextClass()}`}>
                  {t('prizePool.seasonRewards')}
                </span>
              </div>
            </div>
            
            {/* Effet de lumière radiale */}
            <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl animate-pulse-slow" />
          </div>

          {/* Prize Distribution avec animation séquentielle */}
          <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
              <PrizeCard 
                place={t('prizePool.places.first')} 
                amount="100 000 "
                index={0}
                className="transform transition-all duration-500 hover:scale-105 z-30"
              />
              <PrizeCard 
                place={t('prizePool.places.second')} 
                amount="30 000 "
                index={1}
                className="transform transition-all duration-500 hover:scale-105 z-20"
              />
              <PrizeCard 
                place={t('prizePool.places.third')} 
                amount="20 000 "
                index={2}
                className="transform transition-all duration-500 hover:scale-105 z-10"
              />
            </div>
            
            {/* Informations supplémentaires */}
            <div className="mt-12 text-center">
              <p className={`text-white/70 max-w-lg mx-auto ${getTextClass()}`}>
                {t('prizePool.additionalInfo')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient de transition en bas */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/50 to-[#0A0A0A] pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  );
};

export default PrizePool;