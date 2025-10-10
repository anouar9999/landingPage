import React, { useRef, useEffect, useState } from "react";
import {
  Check,
  Users,
  Ticket,
  BadgeCheck,
  Gift,
  Medal,
  Award,
  Shield,
  ChevronRight,
  Sparkles,
  Trophy,
  Star,
  Zap,
} from "lucide-react";
import { t } from "i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock translation hook for demo
import { useTranslation } from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";

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
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate title
    gsap.fromTo(
      ".pass-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8, rotateY: -15 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Animate advantages
    gsap.fromTo(
      ".advantage-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".advantages-section",
          start: "top 75%",
        }
      }
    );

    // Animate steps
    gsap.fromTo(
      ".step-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 75%",
        }
      }
    );
  }, []);

  const passAdvantages = [
    {
      icon: <Ticket size={24} />,
      title: t("passGamers.benefits.tickets.title", "Accès Anticipé"),
      description: t(
        "passGamers.benefits.tickets.description",
        "Inscris-toi aux tournois avant tout le monde et garantis ta place."
      ),
    },
    {
      icon: <Gift size={24} />,
      title: t("passGamers.benefits.offers.title", "Récompenses Uniques"),
      description: t(
        "passGamers.benefits.offers.description",
        "Reçois du loot exclusif, des cadeaux et des tickets VIP pour les plus grands événements."
      ),
    },
    {
      icon: <BadgeCheck size={24} />,
      title: t("passGamers.benefits.status.title", "Offres Partenaires"),
      description: t(
        "passGamers.benefits.status.description",
        "Profite de réductions exclusives de nos marques partenaires, juste pour toi."
      ),
    },
    {
      icon: <Trophy size={24} />,
      title: t("passGamers.benefits.tournaments.title", "Compétitions"),
      description: t(
        "passGamers.benefits.tournaments.description",
        "Participation aux tournois régionaux et nationaux"
      ),
    },
  ];

  const steps = [
    {
      title: t("passGamers.step1"),
      description: t("passGamers.step1Desc"),
      icon: <Zap size={20} />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: t("passGamers.step2"),
      description: t("passGamers.step2Desc"),
      icon: <Shield size={20} />,
      color: "from-blue-400 to-purple-500",
    },
    {
      title: t("passGamers.step3"),
      description: t("passGamers.step3Desc"),
      icon: <Sparkles size={20} />,
      color: "from-green-400 to-cyan-500",
    },
  ];

  return (
    <section
      id="pass-gamers-section"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-black py-16 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
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
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column - Enhanced */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            {/* Main Title */}
            <div>
              <div className="relative inline-block pass-title">
                {language === "fr" ? (
                  <div className="relative">
                    <FrenchTitle 
                      textKey="passGamers.title" 
                      as="h1" 
                      className="special-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl relative z-10"
                    />
                    {/* Glowing effect behind text */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-500/20 blur-3xl -z-10 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <h1 className="special-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl relative z-10">
                      {t("passGamers.title", "Pass Gamius")}
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-500/20 blur-3xl -z-10 animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {/* Subtitle */}
              <p className="text-white/90 text-lg md:text-xl font-circular-web leading-relaxed max-w-lg mx-auto lg:mx-0 mt-2">
                {t("passGamers.subtitle", "Ton accès VIP à l'univers GAMIUS. Rejoins le club des joueurs privilégiés et débloque : Accès anticipé aux tournois, Récompenses uniques, Offres de nos marques partenaires 🚀")}
              </p>
            </div>

            {/* Enhanced 3D Card */}
            <div className="max-w-sm mx-auto lg:mx-0 mt-8">
              <div 
                ref={cardRef} 
                className="group relative w-full h-72 perspective-1000 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-2xl shadow-yellow-400/20 transform-gpu transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/40 border-2 border-yellow-400/60 overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  
                  {/* Card Pattern Background */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,215,0,0.2)_0%,_transparent_50%)]"></div>
                  
                  <div className="relative p-6 h-full flex flex-col justify-between z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-2xl font-black text-white drop-shadow-lg font-zentry tracking-wide uppercase">
                          Pass Gamer
                        </div>
                        <div className="text-xs text-yellow-400 font-semibold mt-1 uppercase tracking-widest">
                          Officiel • Maroc 2025
                        </div>
                      </div>
                      
                      {/* Badge Icon */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-400/50 border-2 border-yellow-300/50 group-hover:rotate-12 transition-transform duration-300">
                          <Award size={32} className="text-black" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Center Content */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="text-5xl animate-bounce-slow">🎮</div>
                        <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                          <div className="text-sm text-white font-bold uppercase tracking-wide">
                            Membre Actif
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">ID Membre</div>
                        <div className="text-base font-mono text-white font-bold tracking-wider">
                          GAM-****-2025
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Statut</div>
                        <div className="inline-flex items-center gap-1.5 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-400/40 backdrop-blur-sm">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400 font-bold uppercase tracking-wide">Actif</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400/20 animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-cyan-400/20 animate-pulse"></div>
                  <div className="absolute top-1/2 left-4 w-6 h-6 rounded-full bg-orange-400/20 animate-ping" style={{animationDelay: "1s"}}></div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mt-10">
              <a
                href="https://user.gnews.ma/login"
                className="group relative inline-block"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                
                {/* Button */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 px-8 py-4 rounded-lg transition-all duration-300 group-hover:scale-105">
                    <span className="flex items-center gap-3 special-font text-xl text-black font-black uppercase tracking-wider">
                      <Sparkles
                        size={24}
                        className="group-hover:rotate-180 transition-transform duration-500"
                      />
                      Join us now
                      <ChevronRight
                        size={24}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </div>
              </a>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <Shield size={20} className="text-green-400" />
                <span className="text-sm font-semibold text-white/90 font-circular-web">
                  Aucun frais • Instantané
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-yellow-400 font-zentry mb-1 group-hover:text-yellow-300 transition-colors">
                  50K+
                </div>
                <div className="text-sm text-white/70 font-circular-web uppercase tracking-wide">
                  Membres actifs
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-green-400 font-zentry mb-1 group-hover:text-green-300 transition-colors">
                  24h
                </div>
                <div className="text-sm text-white/70 font-circular-web uppercase tracking-wide">
                  Traitement
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-cyan-400 font-zentry mb-1 group-hover:text-cyan-300 transition-colors">
                  100%
                </div>
                <div className="text-sm text-white/70 font-circular-web uppercase tracking-wide">
                  Gratuit
                </div>
              </div>
            </div>

            {/* Enhanced Steps */}
            <div className="steps-section bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mt-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-yellow-400" size={28} />
                  <h3 className="text-3xl font-black text-white uppercase tracking-wide font-zentry">
                    {t("passGamers.howItWorks", "Comment Obtenir Ton Pass Gamius")}
                  </h3>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`step-card group relative flex items-start gap-5 p-5 rounded-xl transition-all duration-500 cursor-pointer overflow-hidden ${
                      activeStep === idx
                        ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-2 border-yellow-400/50 shadow-lg shadow-yellow-400/20"
                        : "bg-white/5 border-2 border-transparent hover:border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveStep(idx)}
                  >
                    {/* Animated background on active */}
                    {activeStep === idx && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-500/5 to-yellow-400/5 animate-pulse"></div>
                    )}

                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                          activeStep === idx ? "scale-110 rotate-3" : "group-hover:scale-105"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="absolute left-1/2 top-full w-1 h-4 bg-gradient-to-b from-white/30 to-transparent -translate-x-1/2"></div>
                      )}
                    </div>

                    <div className="flex-1 relative z-10">
                      <h4 className={`font-black text-xl mb-2 font-zentry uppercase tracking-wide transition-colors ${
                        activeStep === idx ? "text-yellow-400" : "text-white group-hover:text-yellow-400"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-white/80 text-sm font-circular-web leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow indicator for active step */}
                    {activeStep === idx && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ChevronRight className="text-yellow-400 animate-pulse" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced */}
          <div className="lg:w-1/2 space-y-8">
            {/* Advantages Grid - Redesigned */}
            <div className="space-y-6 advantages-section">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="text-yellow-400" size={28} />
                  <h3 className="text-3xl font-black text-white uppercase tracking-wide font-zentry">
                    {t("passGamers.advantages", "Avantages du Pass")}
                  </h3>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {passAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="advantage-card group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden border border-white/10 hover:border-yellow-400/50 bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-slate-900/80"
                    style={{
                      minHeight: "140px"
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative z-10 flex items-start justify-between h-full">
                      {/* Left side - Icon and Title */}
                      <div className="flex-1 pr-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
                            {advantage.icon}
                          </div>
                        </div>
                        
                        <h4 className="text-white font-black text-xl mb-2 font-zentry uppercase tracking-wide group-hover:text-yellow-400 transition-colors">
                          {advantage.title}
                        </h4>
                        
                        <p className="text-white/80 text-sm font-circular-web leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>

                      {/* Right side - Decorative element */}
                      <div className="flex-shrink-0">
                        <div className="w-2 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full group-hover:h-20 transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
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
          background-image: radial-gradient(
              circle at 25px 25px,
              rgba(255, 255, 255, 0.1) 2px,
              transparent 0
            ),
            radial-gradient(
              circle at 75px 75px,
              rgba(255, 215, 0, 0.1) 2px,
              transparent 0
            );
          background-size: 50px 50px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
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
