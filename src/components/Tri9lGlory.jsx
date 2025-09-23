import { t } from "i18next";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import LanguageContext from "../contexts/LanguageContext";
import FrenchTitle from "./FrenchTitle";
import useTranslation from "../hooks/useTranslation";

const BentoTilt = forwardRef(({ children, className = "" }, ref) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
 
  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 3;
    const tiltY = (relativeX - 0.5) * -3;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={(el) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(el);
          } else {
            ref.current = el;
          }
        }
        itemRef.current = el;
      }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
});

BentoTilt.displayName = "BentoTilt";

const ProvidenceGameShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const cursorRef = useRef(null);
const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  // Mock translation function
  // const t = (key) => {
  //   const translations = {
  //     'tri9lGlory.steps.step2': 'Participate in online qualifiers and show your skills against other players.',
  //     'tri9lGlory.steps.step3': 'The best players will advance to the finals and have a chance to become champions.'
  //   };
  //   return translations[key] || key;
  // };

  // Initialize particles effect from GamingBanner
  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speed) % 100,
        }))
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Handle mouse movement for both cursor and mouse position tracking
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    // Add listeners for interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Animate cursor
  useEffect(() => {
    if (cursorRef.current) {
      const cursor = cursorRef.current;
      cursor.style.left = `${mousePosition.x - 32}px`;
      cursor.style.top = `${mousePosition.y - 32}px`;
    }
  }, [mousePosition]);

  // Handle mouse move for mouse position tracking (for potential glow effect)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Animated particles background from GamingBanner */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: "0 0 6px rgba(251, 191, 36, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Mouse glow effect */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
        }}
      />

      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-16 h-16 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ position: 'fixed' }}
      >
        <div className="w-full h-full rounded-full border-2 border-red-500 flex items-center justify-center">
          <div className="w-2/3 h-2/3 rounded-full border border-red-500 animate-pulse"></div>
          <div className="absolute text-red-500 text-xs font-bold">ROAD TO GLORY</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Game Information */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          {/* Small Title */}
          <div className="mb-8">
            {/* <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">
              FEATURED GAMES
            </p> */}
            <div className="w-12 h-px bg-red-500"></div>
          </div>

          {/* Main Title */}
          <h1 className="special-font  upp text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            {
              language === 'fr' ? (
                <FrenchTitle textKey="tri9lGlory.title" className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight" as="div" />
              ):(
                t('tri9lGlory.title')
              )
            }
          </h1>

          {/* Description */}
          <p className="text-gray-200  text-sm text-start  font-circular-web lg:text-lg xl:text-xl max-w-xl mb-1 lg:mb-2 leading-relaxed line-clamp-2">
            {t('tri9lGlory.description')}
            </p>

          {/* Game Details - BentoTilt Cards */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 my-12">
            <BentoTilt className="w-full md:w-1/3 transform-gpu transition-transform duration-300 interactive-element">
              <div className="group relative backdrop-blur-lg  hover:border-red-500 transition-colors duration-300">
                <span className="mb-3 md:mb-4 block font-zentry text-4xl md:text-5xl font-black text-red-500">
                  01
                </span>
                <h3 className="text-white text-xl font-bold mb-2">{t('tri9lGlory.steps.step1Title')}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
  {t('tri9lGlory.steps.step1')}                </p>
              </div>
            </BentoTilt>

            <BentoTilt className="w-full md:w-1/3 transform-gpu transition-transform duration-300 interactive-element">
              <div className="group relative backdrop-blur-lg  hover:border-red-500 transition-colors duration-300">
                <span className="mb-3 md:mb-4 block font-zentry text-4xl md:text-5xl font-black text-red-500">
                  02
                </span>
                <h3 className="text-white text-xl font-bold mb-2">{t('tri9lGlory.steps.step2Title')}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {t('tri9lGlory.steps.step2')}
                </p>
              </div>
            </BentoTilt>

            <BentoTilt className="w-full md:w-1/3 transform-gpu transition-transform duration-300 interactive-element">
              <div className="group relative backdrop-blur-lg hover:border-red-500 transition-colors duration-300">
                <span className="mb-3 md:mb-4 font-zentry block text-4xl md:text-5xl font-black text-red-500">
                  03
                </span>
                <h3 className="text-white text-xl font-bold mb-2">{t('tri9lGlory.steps.step3Title')}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {t('tri9lGlory.steps.step3')}
                </p>
              </div>
            </BentoTilt>
          </div>
        </div>
      </div>

      {/* Background decorative elements from GamingBanner */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-yellow-400 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-orange-500 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-red-500 rounded-full" />
      </div>

      {/* Additional Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-px h-16 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default ProvidenceGameShowcase;