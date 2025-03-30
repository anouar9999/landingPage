import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Target, TrendingUp, Award, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../hooks/useTranslation';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProPath = () => {
  const { t, isRtl, language } = useTranslation();
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const progressBarRef = useRef(null);
  
  // Fonction utilitaire pour ajouter la classe tamazight-text si la langue est Tamazight
  const getTextClass = () => {
    return language === 'tz' ? 'tamazight-text' : '';
  };
  
  // Données des étapes du programme
  const steps = [
    {
      id: 'aim',
      icon: <Target size={24} className="text-primary" />,
      title: "Participez à des matchs équilibrés",
      description: "Rejoignez notre système de mise en relation avancé pour participer à des matchs équilibrés et faire monter votre Elo tout en perfectionnant vos compétences avec d'autres joueurs de votre niveau.",
      image: "/img/aim-players.jpg"
    },
    {
      id: 'ladder',
      icon: <TrendingUp size={24} className="text-primary" />,
      title: "Grimpez dans les classements",
      description: "Progressez dans nos classements compétitifs, gagnez des récompenses à chaque palier et construisez votre réputation au sein de l'écosystème esport marocain avec vos performances.",
      image: "/img/climb-leaderboard.jpg"
    },
    {
      id: 'rank',
      icon: <Award size={24} className="text-primary" />,
      title: "Atteignez le sommet des classements",
      description: "Les joueurs d'élite qui atteignent les plus hauts rangs se qualifient pour les FPL Challenger, un tremplin exclusif vers la ligue professionnelle où vous pourrez prouver votre valeur.",
      image: "/img/top-ranked.jpg"
    },
    {
      id: 'fpl',
      icon: <Users size={24} className="text-primary" />,
      title: "Affrontez les meilleurs professionnels",
      description: "Dans le FPL (Faceit Pro League), affrontez quotidiennement les joueurs professionnels, attirez l'attention des équipes et des recruteurs, et lancez votre carrière dans l'esport professionnel.",
      image: "/img/pro-players.jpg"
    }
  ];
  
  // Animations lors du défilement
  useEffect(() => {
    if (sectionRef.current && typeof window !== 'undefined') {
      // Animation du titre de section
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
      
      // Animation de la description
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
          tl.fromTo(
            step.querySelector('.step-image'),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
            "-=0.3"
          );
          
          // Animation de l'icône et du titre
          tl.fromTo(
            [step.querySelector('.step-icon'), step.querySelector('.step-title')],
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
            "-=0.2"
          );
          
          // Animation du texte de description
          tl.fromTo(
            step.querySelector('.step-description'),
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            "-=0.1"
          );
        }
      });
      
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
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5
            }
          }
        );
      }
    }
  }, []);

  return (
    <div 
      id="pro-path" 
      className="relative py-20 min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#0a0a14] to-[#0a0a14] border-t border-primary/20"
      ref={sectionRef}
      dir={isRtl() ? 'rtl' : 'ltr'}
    >
      {/* Debug message - visible only during development */}
      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md text-sm font-bold z-50">
        Section Nouvelle Voie vers les Pros
      </div>
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(215, 198, 175, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
            <span className={`text-primary font-valorant text-sm uppercase tracking-wider ${getTextClass()}`}>Propulsé par le Ministère de la Jeunesse, de la Culture et de la Communication</span>
          </div>
          
          <h2 className="pro-path-title text-4xl md:text-5xl font-nightWarrior text-primary mb-4">
            Nouvelle Voie vers les Pros
          </h2>
          
          <p className={`pro-path-description text-white/80 text-lg max-w-3xl mx-auto ${getTextClass()}`}>
            Le Morocco Gaming Expo ouvre une voie structurée vers le professionnalisme pour les talents esport marocains. Débute ta carrière de joueur professionnel grâce à notre programme en 4 étapes.
          </p>

          <div className="mt-8">
            <a 
              href="#"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Débute ta carrière de joueur pro
              <ArrowUpRight className="ml-2" size={18} />
            </a>
          </div>

          <div className="mt-4 text-white/60 text-sm">
            Programme disponible pour les jeux Free Fire, Valorant, Street Fighter et FC 25
          </div>
        </div>
        
        {/* Timeline avec les étapes */}
        <div className="relative">
          {/* Barre de progression verticale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-primary/20 hidden md:block">
            <div 
              ref={progressBarRef}
              className="absolute top-0 w-full bg-primary"
              style={{ height: '100%', transformOrigin: 'top', transform: 'scaleY(0)' }}
            ></div>
          </div>
          
          {/* Étapes alternées */}
          <div className="space-y-16 md:space-y-32 relative">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                ref={el => stepsRef.current[index] = el}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 relative`}
              >
                {/* Point sur la timeline (visible seulement sur desktop) */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10 relative border-2 border-[#0a0a14]">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
                
                {/* Image */}
                <div className="w-full md:w-5/12 step-image">
                  <div className="relative rounded-lg overflow-hidden aspect-video border border-primary/30 shadow-lg shadow-primary/10">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23111122'/%3E%3Ctext x='50%25' y='50%25' font-size='38' text-anchor='middle' fill='%23d7c6af' dominant-baseline='middle'%3E${step.id.toUpperCase()}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    
                    {/* Étiquette de l'étape */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-center">
                      <span className="text-primary font-valorant text-sm uppercase tracking-wider">{step.id.toUpperCase()}</span>
                    </div>
                    
                    {/* Overlay avec effet de gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  </div>
                </div>
                
                {/* Contenu de l'étape */}
                <div className="w-full md:w-5/12 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-primary/20">
                  <div className="flex items-center mb-4">
                    <div className="step-icon w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {step.icon}
                    </div>
                    <h3 className="step-title text-2xl font-valorant text-white">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="step-description text-white/80 mb-4">
                    {step.description}
                  </p>
                  
                  {/* CTA pour chaque étape */}
                  <div className={`text-right ${index === steps.length - 1 ? 'block' : 'hidden md:block'}`}>
                    <a 
                      href="#"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <span className="mr-1">En savoir plus</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPath; 