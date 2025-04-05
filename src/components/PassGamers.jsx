import React, { useRef, useEffect } from 'react';
import { Check, Users, Ticket, BadgeCheck, Gift, Medal, Award, Shield, ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Download } from 'lucide-react';
import InlineAd from './InlineAd';

gsap.registerPlugin(ScrollTrigger);

// Version modernisée avec carte animée en code
const PassGamers = () => {
  const { t, isRtl, language } = useTranslation();
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Fonction locale pour déterminer la classe de texte
  const getTextClass = () => {
    if (language === 'tz') return 'tamazight-text';
    if (language === 'fr') return 'french-text';
    return '';
  };
  
  // Animation de la carte
  useEffect(() => {
    if (cardRef.current) {
      // Animation de brillance
      gsap.to(cardRef.current.querySelector('.card-shine'), {
        x: '150%',
        duration: 2.5,
        repeat: -1,
        repeatDelay: 4,
        ease: "power1.inOut",
      });
      
      // Animation des éléments holographiques
      gsap.to('.holo-element', {
        opacity: 0.4,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
      
      // Animation 3D au survol
      const card = cardRef.current;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
          rotationY: x * 10,
          rotationX: -y * 10,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
    
    // Animation d'entrée des avantages
    if (sectionRef.current) {
      gsap.fromTo('.benefit-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: "top 80%"
          }
        }
      );
    }
  }, []);
  
  // Avantages du Pass Gamer (gratuit)
  const passAdvantages = [
    {
      icon: <Ticket size={24} />,
      title: t('passGamers.benefits.tickets.title', "Accès Prioritaire"),
      description: t('passGamers.benefits.tickets.description', "Accès prioritaire aux tournois nationaux et événements gaming")
    },
    {
      icon: <Gift size={24} />,
      title: t('passGamers.benefits.offers.title', "Offres Exclusives"),
      description: t('passGamers.benefits.offers.description', "Réductions sur les produits gaming chez nos partenaires")
    },
    {
      icon: <BadgeCheck size={24} />,
      title: t('passGamers.benefits.status.title', "Reconnaissance Officielle"),
      description: t('passGamers.benefits.status.description', "Statut reconnu de joueur esport par le Ministère")
    },
    {
      icon: <Award size={24} />,
      title: t('passGamers.benefits.tournaments.title', "Compétitions"),
      description: t('passGamers.benefits.tournaments.description', "Participation aux tournois régionaux et nationaux")
    }
  ];

  return (
    <section 
      id="pass-gamers-section" 
      className="relative min-h-screen w-full bg-black py-16 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
        <div className="absolute left-5 top-10 w-20 h-20 rounded-full bg-yellow-500/10 blur-2xl"></div>
        <div className="absolute right-10 bottom-20 w-32 h-32 rounded-full bg-yellow-500/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Colonne de gauche: Contenu et Pass */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block bg-yellow-500/10 px-4 py-1 rounded-full mb-4">
              <span className={`text-yellow-500 text-sm uppercase tracking-wider ${getTextClass()}`}>
                {t('passGamers.officialInitiative', "Initiative Officielle du Ministère")}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl text-yellow-500 mb-6 font-nightWarrior">
              {t('passGamers.title', "Pass Gamer Officiel")}
            </h2>
            
            <p className={`text-white/80 text-xl mb-6 ${getTextClass()}`}>
              {t('passGamers.subtitle', "Obtenez votre pass gamer gratuit et bénéficiez d'un accès privilégié à l'écosystème gaming national")}
            </p>
            
            <div className="inline-block bg-green-500/20 px-4 py-2 rounded-lg mb-8">
              <span className={`text-green-400 font-bold ${getTextClass()}`}>
                {t('passGamers.freeOfCharge', "100% Gratuit - Service Public")}
              </span>
            </div>
            
            {/* Carte du Pass animée */}
            <div className="max-w-xs mx-auto lg:mx-0">
              <div 
                ref={cardRef} 
                className="card-3d-container w-full h-56 mt-8 perspective-1000 cursor-pointer transform hover:scale-105 transition-transform duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="card-3d relative w-full h-full rounded-xl bg-gradient-to-br from-[#1a1c2e] to-[#121320] shadow-2xl overflow-hidden border border-yellow-500/30">
                  {/* Effet de brillance */}
                  <div className="card-shine absolute inset-0 w-1/3 -left-full skew-x-12 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Texture holographique */}
                  <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-yellow-500 uppercase tracking-wider mb-1">Ministère de la Jeunesse</div>
                        <div className="text-lg font-bold text-white">Pass Gamer Officiel</div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                        <Award size={24} className="text-black" />
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-xs text-white/60 mb-1">ID Membre</div>
                      <div className="text-lg text-white font-mono tracking-wider mb-3">MGE-••••••-2025</div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-white/60">Validité</div>
                          <div className="text-sm text-white">Permanente</div>
                        </div>
                        
                        <div className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-400 font-bold">
                          OFFICIEL
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Éléments holographiques */}
                  <div className="holo-element absolute top-5 right-10 w-8 h-8 rounded-full bg-yellow-500/10"></div>
                  <div className="holo-element absolute bottom-10 left-5 w-6 h-6 rounded-full bg-yellow-500/10"></div>
                  <div className="holo-element absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-yellow-500/10"></div>
                </div>
              </div>
            </div>
            
            {/* Appel à l'action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#inscription" 
                className="group inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                <span>{t('passGamers.getYourPass', "Obtenir votre Pass")}</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              
              <div className="flex items-center gap-2 text-white/70">
                <Shield size={16} />
                <span className="text-sm">{t('passGamers.securityNote', "Aucun paiement requis")}</span>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite: Avantages */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <h3 className="text-white text-2xl font-bold text-center lg:text-left mb-6">
              {t('passGamers.advantages', "Avantages du Pass Gamer")}
            </h3>
            
            <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {passAdvantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="benefit-card bg-black/30 backdrop-blur-sm rounded-lg border border-yellow-500/20 p-4 hover:border-yellow-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                      {advantage.icon}
                    </div>
                    <h3 className="text-white text-lg font-bold">{advantage.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm ml-13">{advantage.description}</p>
                </div>
              ))}
            </div>
            
            {/* Comment obtenir le Pass - Version compacte */}
            <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-5">
              <h3 className="text-white text-xl mb-4 font-bold">{t('passGamers.howToGet', "Comment obtenir votre Pass")}</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="text-white font-bold">{t('passGamers.step1', "Inscription")}</h4>
                      <p className="text-white/70 text-xs">{t('passGamers.step1Desc', "Formulaire en ligne")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="text-white font-bold">{t('passGamers.step2', "Vérification")}</h4>
                      <p className="text-white/70 text-xs">{t('passGamers.step2Desc', "Validation d'identité")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="text-white font-bold">{t('passGamers.step3', "Obtention")}</h4>
                      <p className="text-white/70 text-xs">{t('passGamers.step3Desc', "Pass numérique par email")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emplacement publicitaire intégré au contenu */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-10">
        <div className="w-full relative">
          {/* Indicateur publicitaire */}
          <div className="flex justify-center mb-2">
            <div className="inline-block px-3 py-1 bg-primary/20 rounded-full">
              <span className={`text-primary text-xs font-bold ${getTextClass()}`}>
                {t('passGamers.sponsoredContent')}
              </span>
            </div>
          </div>
          
          {/* Publicité intégrée */}
          <InlineAd 
            className="inline-ad-integrated rounded-xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform duration-300" 
            onClose={() => {
              // Animation spéciale pour la fermeture intégrée dans le contenu
              const adElement = document.querySelector('.inline-ad-integrated');
              if (adElement) {
                gsap.to(adElement, {
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  padding: 0,
                  duration: 0.5,
                  onComplete: () => {
                    adElement.style.display = 'none';
                  }
                });
              }
            }}
          />
        </div>
      </div>
      
      {/* Styles pour les effets visuels */}
      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255, 215, 0, 0.2) 1px, transparent 1px);
          background-size: 10px 10px;
        }
      `}</style>
    </section>
  );
};

export default PassGamers; 