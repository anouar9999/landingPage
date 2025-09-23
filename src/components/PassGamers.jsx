import React, { useRef, useEffect, useState } from 'react';
import { Check, Users, Ticket, BadgeCheck, Gift, Medal, Award, Shield, ChevronRight, Sparkles, Trophy, Star, Zap } from 'lucide-react';
import { t } from 'i18next';

// Mock translation hook for demo
import { useTranslation } from '../hooks/useTranslation';
import FrenchTitle from './FrenchTitle';

const PassGamers = () => {
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

 

  const passAdvantages = [
    {
      icon: <Ticket size={24} />,
      title: t('passGamers.benefits.tickets.title', "Accès Prioritaire"),
      description: t('passGamers.benefits.tickets.description', "Accès prioritaire aux tournois nationaux et événements gaming"),
      backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&auto=format')"
    },
    {
      icon: <Gift size={24} />,
      title: t('passGamers.benefits.offers.title', "Offres Exclusives"),
      description: t('passGamers.benefits.offers.description', "Réductions sur les produits gaming chez nos partenaires"),
      backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop&auto=format')"
    },
    {
      icon: <BadgeCheck size={24} />,
      title: t('passGamers.benefits.status.title', "Reconnaissance Officielle"),
      description: t('passGamers.benefits.status.description', "Statut reconnu de joueur esport par le Ministère"),
      backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop&auto=format')"
    },
    {
      icon: <Trophy size={24} />,
      title: t('passGamers.benefits.tournaments.title', "Compétitions"),
      description: t('passGamers.benefits.tournaments.description', "Participation aux tournois régionaux et nationaux"),
      backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&auto=format')"
    }
  ];

  const steps = [
    {
      title: t('passGamers.step1'),
      description: t('passGamers.step1Desc'),
      icon: <Zap size={20} />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: t('passGamers.step2'), 
      description: t('passGamers.step2Desc'),
      icon: <Shield size={20} />,
      color: "from-blue-400 to-purple-500"
    },
    {
      title: t('passGamers.step3'),
      description: t('passGamers.step3Desc'),
      icon: <Sparkles size={20} />,
      color: "from-green-400 to-cyan-500"
    }
  ];

  return (
    <section 
      id="pass-gamers-section" 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-black py-16 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-500/10 to-transparent blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-transparent blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/10 blur-3xl animate-spin-slow"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid-enhanced"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column - Enhanced */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="special-font font-9xl bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              {
                language === 'fr' ? ( 
                  <FrenchTitle
                    textKey="passGamers.title"
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
                    as="h1"
                  />
                ) : (
                  t('passGamers.title', "Official Gamer Pass")
                )
              }
              </h1>
            </div>

            {/* Subtitle */}
            <p className={`text-white/90 text-lg font-circular-web leading-relaxed max-w-lg mx-auto lg:mx-0 `}>
              {t('passGamers.subtitle')}
            </p>

            {/* Enhanced 3D Card */}
            <div className="max-w-sm mx-auto lg:mx-0 mt-8">
              <div 
                ref={cardRef} 
                className="group relative w-full h-64 perspective-1000 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-2xl transform-gpu transition-all duration-500 hover:scale-105 hover:-rotate-1 border-2 border-yellow-400/50 overflow-hidden">
                  
                  {/* Holographic shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  
                  {/* Card Content */}
                  <div className="relative p-6 h-full flex flex-col justify-between z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-yellow-400 uppercase tracking-widest font-bold mb-1">
                          Ministère Jeunesse
                        </div>
                        <div className="text-xl font-black text-white drop-shadow-lg">
                          Pass Gamer Officiel
                        </div>
                        <div className="text-xs text-white/60 mt-1">
                          Maroc • 2025
                        </div>
                      </div>
                      
                      {/* Logo */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl border-2 border-yellow-300/50">
                          <Award size={32} className="text-black" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <Check size={12} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="text-4xl">🎮</div>
                        <div className="text-sm text-white/80 font-medium">
                          Membre Actif
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-white/60 mb-1">ID Membre</div>
                        <div className="text-sm font-mono text-white tracking-wider">
                          GAM-****-2025
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-white/60 mb-1">Statut</div>
                        <div className="inline-flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400 font-bold">ACTIF</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400/20 animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-cyan-400/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-8">
              <div className="mx-2 sm:mx-4">
                <a
                  href="https://user.mgexpo.ma/login"
                  className="group relative"
                >
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>
                  <span className="relative flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8">
                    <div className="absolute inset-0 -skew-x-12"></div>
                    <span className={`relative flex justify-between special-font z-10 text-sm sm:text-md md:text-xl text-black uppercase `}>
                      <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                      Join us now
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </span>
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Shield size={18} className="text-green-400" />
                <span className="text-sm font-medium">Aucun frais • Instantané</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 font-zentry">50K+</div>
                <div className="text-md text-white/60 font-circular-web">Membres actifs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 font-zentry">24h</div>
                <div className="text-md text-white/60 font-circular-web">Traitement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 font-zentry">100%</div>
                <div className="text-md text-white/60 font-circular-web">Gratuit</div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced */}
          <div className="lg:w-1/2 space-y-8">
            {/* Advantages Grid - Redesigned */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-general font-bold -tracking-wider text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
                  <Star className="text-yellow-400 animate-pulse" size={32} />
                  {t('passGamers.advantages', "Avantages du Pass Gamer")}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto lg:mx-0 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {passAdvantages.map((advantage, index) => (
                  <div 
                    key={index}
                    className="group relative  p-4 transition-all duration-500 angular-cut hover:-translate-y-2 cursor-pointer overflow-hidden h-32"
                    style={{
                      backgroundImage: advantage.backgroundImage,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Title in top right */}
                      <div className="flex justify-end mb-4">
                        <h4 className="text-white font-bold text-lg text-right max-w-[70%]">
                          {advantage.title}
                        </h4>
                      </div>
                      
                      {/* Icon in bottom left */}
                      <div className="mt-auto flex justify-between items-end">
                        
                        
                        {/* Description on hover */}
                        <div className="max-w-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white/90 text-xs leading-relaxed text-right">
                            {advantage.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
             
            </div>

            {/* Enhanced Steps */}
            <div className="rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="text-yellow-400" />
                {t('passGamers.howItWorks')}
              </h3>
              
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-4 p-4  transition-all duration-500 cursor-pointer ${
                      activeStep === idx 
                        ? 'bg-white/10 border border-white/20 scale-105' 
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-xl transition-all duration-300 ${
                        activeStep === idx ? 'scale-110' : ''
                      }`}>
                        {step.icon}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="absolute left-1/2 top-full w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent -translate-x-1/2"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-white/70 text-sm">{step.description}</p>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .bg-grid-enhanced {
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0),
            radial-gradient(circle at 75px 75px, rgba(255,215,0,0.1) 2px, transparent 0);
          background-size: 50px 50px;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px) scale(0.9);
          }
          50% {
            transform: translateY(-10px) scale(1);
          }
        }
        
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(0.8);
          }
          100% {
            transform: rotate(360deg) scale(1.2);
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PassGamers;