import React, { useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import { Award, ExternalLink, Send } from 'lucide-react';
import gsap from 'gsap';

/**
 * Composant pour un emplacement publicitaire dans le footer, amélioré avec des animations
 * et un design plus adapté à l'univers gaming avec des effets visuels modernes
 */
const FooterAd = () => {
  const { isAdTypeEnabled } = useAds();
  const adContainerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Animer l'apparition de la publicité
  useEffect(() => {
    if (isAdTypeEnabled('footer') && adContainerRef.current) {
      // Animation d'entrée avec un léger délai
      gsap.fromTo(
        adContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
      
      // Animation du contenu avec un effet d'élasticité
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.5)" }
      );
      
      // Animation des boutons avec un stagger
      gsap.fromTo(
        buttonRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5, stagger: 0.1, ease: "power3.out" }
      );
      
      // Animation des particules
      if (particlesRef.current) {
        gsap.fromTo(
          particlesRef.current.children,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.8, stagger: 0.2 }
        );
      }
      
      // Animation de la brillance
      gsap.to(".shimmer-effect", {
        x: "100%",
        duration: 2.5,
        repeat: -1,
        ease: "power1.inOut",
        delay: 1
      });
    }
  }, [isAdTypeEnabled]);
  
  // Ne pas afficher si les publicités du footer sont désactivées
  if (!isAdTypeEnabled('footer')) return null;
  
  return (
    <div 
      ref={adContainerRef} 
      className="w-full py-8 bg-gradient-to-r from-[#0a0a14] via-primary/5 to-[#0a0a14] relative overflow-hidden"
    >
      {/* Effet de particules en arrière-plan - amélioré et plus réactif */}
      <div ref={particlesRef} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary/80 rounded-full animate-ping" style={{ animationDuration: '3.5s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary/70 rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
      </div>
      
      {/* Grille décorative en arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(215, 198, 175, 0.4) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef}
          className="relative w-full rounded-xl border border-primary/30 py-5 px-6 flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.9), rgba(30, 25, 50, 0.7))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(215, 198, 175, 0.1) inset'
          }}
        >
          {/* Effet de brillance qui traverse avec une meilleure animation */}
          <div 
            className="shimmer-effect absolute top-0 -left-full w-1/3 h-full"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              transform: 'skewX(-15deg)'
            }}
          ></div>
          
          <div className="mb-5 md:mb-0 text-center md:text-left">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse"></div>
              <p className="text-primary font-valorant text-sm uppercase tracking-wider">Emplacement Sponsorisé</p>
            </div>
            <h3 className="text-white text-xl md:text-2xl mt-1 font-bold">Votre marque gaming mise en avant</h3>
            <p className="text-white/70 text-sm mt-1 max-w-md">Format billboard premium (970×250) · Haute visibilité · Meilleur taux de conversion</p>
            
            {/* Tags indiquant les bénéfices */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary/90">
                <Award size={10} className="mr-1" /> Premium
              </span>
              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary/90">
                Placement exclusif
              </span>
              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary/90">
                Grande visibilité
              </span>
            </div>
          </div>
          
          <div ref={buttonRef} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-primary/30 rounded-md blur-sm group-hover:bg-primary/40 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-sm px-5 py-2.5 rounded-md border border-primary/30 text-white text-sm transition-all duration-300 hover:border-primary/60 flex items-center justify-center">
                <span className="font-valorant tracking-wide">RÉSERVER</span>
                <Send size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="relative group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-white/5 rounded-md blur-sm group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-md border border-white/20 text-white text-sm transition-all duration-300 hover:border-white/30 flex items-center justify-center">
                <span className="font-valorant tracking-wide">TARIFS & INFO</span>
                <ExternalLink size={14} className="ml-2 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          {/* Accents décoratifs améliorés */}
          <div className="absolute top-0 left-0 h-[2px] w-[60px] bg-gradient-to-r from-primary to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-[2px] w-[60px] bg-gradient-to-l from-primary to-transparent"></div>
          <div className="absolute top-0 right-0 h-[60px] w-[2px] bg-gradient-to-b from-primary to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-[60px] w-[2px] bg-gradient-to-t from-primary to-transparent"></div>
          
          {/* Signe "AD" décoratif en fond */}
          <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 text-[120px] font-valorant opacity-5 text-primary pointer-events-none select-none">
            AD
          </div>
        </div>
        
        {/* Bandeau d'informations complémentaires */}
        <div className="mt-2 text-center">
          <p className="text-white/40 text-xs">Les publicités affichées sont uniquement à titre de démonstration.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterAd; 