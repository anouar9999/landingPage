import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Arena = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate content from left - optimized
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      }

      // Animate video from right - optimized
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gray-200/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Left Content - CTA */}
          <div ref={contentRef} className="lg:w-1/2 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                {t('arena.badge', 'Arena')}
              </span>
            </div>

            {/* Title */}
            <h2 className="special-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight">
              {t('arena.title', 'ELEVATE YOUR BRAND IN THE GAMING ARENA')}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-circular-web max-w-xl">
              {t('arena.description', "Transform your presence in the esports ecosystem. Connect with passionate audiences and create lasting impressions through dynamic brand experiences.")}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/organizer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
              >
                <span>{t('arena.cta', 'Explore Opportunities')}</span>
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Content - Video */}
          <div ref={videoRef} className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300 border-2 border-gray-200 group">
              {/* Video */}
              <video
                src="/videos/arena-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ willChange: 'transform' }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arena;
