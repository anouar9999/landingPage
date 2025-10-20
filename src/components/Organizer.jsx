import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Check, Sparkles, Trophy, Target, Zap, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import AnimatedTitle from './AnimatedTitle';
import RequestAccessForm from './RequestAccessForm';
import Footer from './Footer';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);


export default function OrganizerPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const { t } = useTranslation();
  
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = async (formData) => {
    // Here you would send the data to your backend API
    console.log('Form submitted:', formData);
    
    // Example: Send to your API endpoint
    // const response = await fetch('/api/access-requests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    
    // For now, just log it
    return Promise.resolve();
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Animate hero section on load
      if (heroRef.current && heroRef.current.children.length > 0) {
        gsap.fromTo(heroRef.current.children,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      }

      // Animate cards on scroll
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.fromTo(cardsRef.current.children,
          {
            y: 30,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
          }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0D0D0D] to-black text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs - Primary color themed */}
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-r from-primary/15 via-gray-700/10 to-transparent blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-gradient-to-r from-gray-800/20 via-primary/10 to-transparent blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-gradient-to-r from-primary/15 to-gray-900/10 blur-3xl animate-spin-slow"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
        
        {/* Floating particles - Primary themed */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <NavBar />

        {/* Hero Section */}
         <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 font-circular-web relative z-10">
           <div className="max-w-5xl mx-auto text-center" ref={heroRef}>
             <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-primary/30">
               <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
               <span>{t('organizer.hero.badge')}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 !font-zentry special-font bg-gradient-to-r from-white via-gray-200 to-primary bg-clip-text text-transparent drop-shadow-2xl px-2">
               {t('organizer.hero.title1')}<br />
            <span className='bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent'>{t('organizer.hero.title2')}</span>    <br />
               {t('organizer.hero.title3')}
             </h1>
             <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
               {t('organizer.hero.subtitle')}
             </p>
            
           {/* Pricing Cards Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12" ref={cardsRef}>
              {/* Community Plan */}
              <div className="relative angular-cut p-6 sm:p-8 text-left overflow-hidden h-full flex flex-col group hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/85 to-black/90"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/50 border border-gray-600">
                      <svg className="w-7 h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping"></div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-zentry mb-2 text-white">{t('organizer.plans.community.name')}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.description')}</p>
                  </div>
                  
                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-700/50">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-zentry bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{t('organizer.plans.community.price')}</span>
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">{t('organizer.plans.community.priceDetail')}</p>
                  </div>

                  <div className="flex-grow space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.features.participants')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.features.formats')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.features.brackets')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.features.profiles')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.community.features.support')}</span>
                    </div>
                  </div>
                   <button 
                    onClick={() => setShowAccessForm(true)}
                    className="group relative w-full mt-6 sm:mt-8 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-700/20 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"></div>
                    <div className="relative flex flex-col items-center justify-center gap-1 border border-gray-600/50 text-white rounded-xl py-3 sm:py-3.5 text-xs sm:text-sm font-semibold hover:border-primary transition-all backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <span>{t('organizer.plans.community.cta')}</span>
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] opacity-80">{t('organizer.plans.community.ctaSubtext')}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* White-label Plan */}
              <div className="relative angular-cut p-6 sm:p-8 text-left overflow-hidden h-full flex flex-col group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-2 border-primary/40">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/85 to-black/90"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-primary/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/50 border border-gray-600">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping"></div>
                      {/* Crown badge for premium */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-zentry mb-2 text-white">{t('organizer.plans.whiteLabel.name')}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.description')}</p>
                  </div>
                  
                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-primary/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-zentry bg-gradient-to-r from-primary via-primary/90 to-white bg-clip-text text-transparent">{t('organizer.plans.whiteLabel.price')}</span>
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">{t('organizer.plans.whiteLabel.priceDetail')}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 flex-grow">
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300 font-medium">{t('organizer.plans.whiteLabel.everythingPlus')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.participants')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.solution')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.types')}</span>
                    </div>
                     <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.stats')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.manager')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.whiteLabel.features.support')}</span>
                    </div>
                  </div>
                  <a href='/contact' className="group relative w-full mt-6 sm:mt-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary rounded-xl animate-gradient-x"></div>
                    <div className="relative flex items-center justify-center gap-2 text-white rounded-xl py-3 sm:py-3.5 text-xs sm:text-sm font-semibold shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                      <span>{t('organizer.plans.whiteLabel.cta')}</span>
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Esport Events Plan */}
              <div className="relative angular-cut p-6 sm:p-8 text-left overflow-hidden h-full flex flex-col group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-2 border-yellow-600/40">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/85 to-black/90"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-yellow-600/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-600/50 border border-gray-600">
                      <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 relative z-10" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl bg-yellow-600/30 animate-ping"></div>
                      {/* Star badge for premium */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-zentry mb-2 text-white">{t('organizer.plans.esportEvents.name')}</h3>
                    <p className="text-xs sm:text-sm text-yellow-400 font-semibold mb-2">{t('organizer.plans.esportEvents.subtitle')}</p>
                    <p className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.description')}</p>
                  </div>
                  
                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-yellow-600/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-zentry bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">{t('organizer.plans.esportEvents.price')}</span>
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">{t('organizer.plans.esportEvents.priceDetail')}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 flex-grow">
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.projectManagement')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.scenography')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.lanSetup')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.liveProduction')}</span>
                    </div>
                     <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.formats')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.sponsorActivations')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.ticketing')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.security')}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300">{t('organizer.plans.esportEvents.features.postEvent')}</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 space-y-3">
                    <div className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                      <p className="text-xs text-yellow-400 font-semibold mb-1">{t('organizer.plans.esportEvents.idealFor')}</p>
                      <p className="text-xs text-gray-300">{t('organizer.plans.esportEvents.idealForText')}</p>
                    </div>
                    
                    <a href='https://gamiusgroup.com/' target='_blank' rel='noopener noreferrer' className="group relative w-full overflow-hidden block">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-xl animate-gradient-x"></div>
                      <div className="relative flex flex-col items-center justify-center gap-1 text-white rounded-xl py-3 sm:py-3.5 text-xs sm:text-sm font-semibold shadow-lg shadow-yellow-600/30 group-hover:shadow-yellow-600/50 transition-all">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                          <span>{t('organizer.plans.esportEvents.cta')}</span>
                          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[10px] opacity-80">{t('organizer.plans.esportEvents.ctaSubtext')}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>          

            
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="plans" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] via-gray-900/50 to-[#0A0A0A] relative">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-gray-700/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-primary/30">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{t('organizer.comparison.choosePlan')}</span>
              </div>
              <AnimatedTitle 
              title={t('organizer.comparison.title')}
              description={t('organizer.comparison.subtitle')}
              className="!mb-8"

              />
              <p className="text-gray-300 font-circular-web text-lg">{t('organizer.comparison.subtitle')}</p>
            </div>

            {/* Comparison Table */}
            <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gradient-to-r from-slate-800/50 to-gray-900/50">
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 sm:p-6 font-semibold text-gray-300 text-xs sm:text-sm w-1/3 uppercase tracking-wider">{t('organizer.comparison.features')}</th>
                      <th className="p-4 sm:p-6 text-center w-1/3">
                        <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2 uppercase tracking-wider">{t('organizer.comparison.community')}</div>
                        <div className="text-lg sm:text-2xl font-bold text-white font-zentry">{t('organizer.comparison.free')}</div>
                      </th>
                      <th className="p-4 sm:p-6 text-center w-1/3 relative">
                        {/* Premium badge */}
                        <div className="absolute top-2 right-2 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/30">
                          {t('organizer.comparison.premium')}
                        </div>
                        <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{t('organizer.comparison.whiteLabel')}</div>
                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-zentry">{t('organizer.comparison.custom')}</div>
                        <div className="text-xs text-gray-500 mt-1">{t('organizer.comparison.contactUs')}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: t('organizer.comparison.rows.maxParticipants'), free: '64', ent: t('organizer.comparison.rows.unlimited') },
                      { feature: t('organizer.comparison.rows.formats'), free: t('organizer.comparison.rows.standard'), ent: t('organizer.comparison.rows.allCustom') },
                      { feature: t('organizer.comparison.rows.brackets'), free: true, ent: true },
                      { feature: t('organizer.comparison.rows.stats'), free: false, ent: true },
                      { feature: t('organizer.comparison.rows.sponsorIntegration'), free: false, ent: true },
                      { feature: t('organizer.comparison.rows.customBranding'), free: false, ent: true },
                      { feature: t('organizer.comparison.rows.whiteLabelSolution'), free: false, ent: true },
                      { feature: t('organizer.comparison.rows.dedicatedSupport'), free: false, ent: true }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors duration-200 group">
                        <td className="p-4 sm:p-6 text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{row.feature}</td>
                        <td className="p-4 sm:p-6 text-center">
                          {typeof row.free === 'boolean' ? (
                            row.free ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-500/20">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                              </div>
                            ) : (
                              <span className="text-gray-700">—</span>
                            )
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-300 font-semibold">{row.free}</span>
                          )}
                        </td>
                        <td className="p-4 sm:p-6 text-center">
                          {typeof row.ent === 'boolean' ? (
                            row.ent ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/20">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                              </div>
                            ) : (
                              <span className="text-gray-700">—</span>
                            )
                          ) : (
                            <span className="text-xs sm:text-sm text-primary font-semibold">{row.ent}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-primary/30">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                  {t('organizer.features.badge')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-zentry bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {t('organizer.features.title')}
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {t('organizer.features.subtitle')}
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t('organizer.features.flexibility.title')}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">{t('organizer.features.flexibility.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t('organizer.features.engagement.title')}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">{t('organizer.features.engagement.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t('organizer.features.monetization.title')}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">{t('organizer.features.monetization.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative angular-cut bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 sm:p-8 h-72 sm:h-96 flex items-center justify-center overflow-hidden group">
                {/* Animated background video/image */}
                <video
                  src="videos/feature-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/40"></div>
                
                {/* Animated decorative elements */}
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-2xl animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-gray-900/30 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gray-700/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-primary/30">
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{t('organizer.faq.gotQuestions')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-zentry bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t('organizer.faq.title')}</h2>
              <p className="text-gray-300 text-lg">{t('organizer.faq.subtitle')}</p>
            </div>

            <div className="space-y-4 px-2">
              {[
                {
                  q: t('organizer.faq.questions.games.q'),
                  a: t('organizer.faq.questions.games.a')
                },
                {
                  q: t('organizer.faq.questions.technical.q'),
                  a: t('organizer.faq.questions.technical.a')
                },
                {
                  q: t('organizer.faq.questions.paid.q'),
                  a: t('organizer.faq.questions.paid.a')
                },
                {
                  q: t('organizer.faq.questions.payment.q'),
                  a: t('organizer.faq.questions.payment.a')
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Skewed background */}
                  <div className="absolute inset-0 -skew-x-6 bg-[#0A0A0A] border-2 border-gray-800 group-hover:border-primary/40 transition-all duration-300"></div>
                  
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 -skew-x-6 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <button
                    onClick={() => toggleFaq(index)}
                    className="relative w-full p-4 sm:p-6 text-left flex justify-between items-center z-10"
                  >
                    <span className="font-semibold text-sm sm:text-base text-gray-200 group-hover:text-white transition-colors pr-2">{faq.q}</span>
                    <div className={`flex-shrink-0 ml-2 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all ${openFaq === index ? 'rotate-180' : ''}`}>
                      <ChevronDown 
                        className={`text-primary transition-transform`}
                        size={18}
                      />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="relative px-4 sm:px-6 pb-4 sm:pb-6 text-gray-300 text-xs sm:text-sm border-t border-gray-700 pt-3 sm:pt-4 animate-fadeIn z-10">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
          {/* Background accent */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-[600px] h-72 sm:h-96 md:h-[600px] bg-gradient-to-r from-primary/20 to-gray-700/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="relative angular-cut bg-gradient-to-r from-primary/90 via-primary/95 to-primary/90 p-8 sm:p-12 text-center overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gray-900/20 rounded-full blur-2xl"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500 ease-in-out"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-primary/30">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white font-semibold text-xs sm:text-sm">{t('organizer.cta.startJourney')}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white special-font drop-shadow-lg px-2">{t('organizer.cta.title')}</h2>
                <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-circular-web text-base sm:text-lg leading-relaxed px-2">
                  {t('organizer.cta.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <a href='https://user.gnews.ma/login' className="relative inline-block">
                    <div className="absolute inset-0 -skew-x-12 bg-primary"></div>
                    <span className="relative flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold text-sm sm:text-base">
                      <div className="absolute inset-0 -skew-x-12 border-2 border-primary/50"></div>
                      <span className="relative z-10">{t('organizer.cta.button')}</span>
                      <Sparkles className="relative z-10 w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .angular-cut {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%);
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 61, 8, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 61, 8, 0.08) 1px, transparent 1px);
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>

      {/* Request Access Form Modal */}
      {showAccessForm && (
        <RequestAccessForm
          onClose={() => setShowAccessForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
