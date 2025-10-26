import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';

const MaintenancePage = () => {
  const { t, language, getTextClass } = useTranslation();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particules 3D morphing
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = `hsla(${Math.random() * 60 + 250}, 80%, ${Math.random() * 30 + 50}%, `;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Effet de morphing 3D
        const time = Date.now() * 0.001;
        this.x += Math.sin(time + this.z * 0.01) * 0.5;
        this.y += Math.cos(time + this.z * 0.01) * 0.5;

        if (this.z > 1000 || this.z < 0 || 
            this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw(ctx) {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size2d = this.size * scale;
        const opacity = this.opacity * (1 - this.z / 1000);

        ctx.fillStyle = this.color + opacity + ')';
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();

        // Effet de traînée
        ctx.strokeStyle = this.color + (opacity * 0.3) + ')';
        ctx.lineWidth = size2d * 0.5;
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d - this.vx * 5 * scale, y2d - this.vy * 5 * scale);
        ctx.stroke();
      }
    }

    // Créer les particules
    const particleArray = [];
    for (let i = 0; i < 150; i++) {
      particleArray.push(new Particle());
    }

    // Animation
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // Lignes de connexion morphing
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particleArray.length; i++) {
        for (let j = i + 1; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(particleArray[j].x, particleArray[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Animations GSAP
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from('.maintenance-logo', {
      scale: 0,
      rotation: 360,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    })
    .from('.maintenance-title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .from('.maintenance-message', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.maintenance-info', {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    // Animation de pulsation continue du logo
    gsap.to('.maintenance-logo', {
      scale: 1.1,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Effet de morphing sur le titre
    gsap.to('.maintenance-title', {
      textShadow: '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(138, 43, 226, 0.6)',
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Canvas 3D Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138, 43, 226, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Logo avec effet 3D morphing */}
        <div className="maintenance-logo relative mb-8">
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            {/* Cercles concentriques animés */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary"
                style={{
                  animation: `ping ${2 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
            
            {/* Logo central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-primary via-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                  <svg
                    className="w-16 h-16 md:w-24 md:h-24 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.41 0-8-3.59-8-8V8.3l8-4.53 8 4.53V12c0 4.41-3.59 8-8 8zm-1-13v6l4.25 2.52.77-1.28-3.52-2.09V7H11z"/>
                  </svg>
                </div>
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Titre */}
        <h1 className={`maintenance-title special-font text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 ${getTextClass()}`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
            {language === 'fr' ? 'EN MAINTENANCE' : 
             language === 'ar' ? 'قيد الصيانة' : 
             language === 'tz' ? 'ⴷⴳ ⵓⵙⵎⴰⵜⵜⴰⵢ' : 
             'UNDER MAINTENANCE'}
          </span>
        </h1>

        {/* Message */}
        <div className="maintenance-message max-w-2xl mx-auto mb-12">
          <p className={`text-lg md:text-xl lg:text-2xl text-white/90 mb-4 ${getTextClass()}`}>
            {language === 'fr' ? 'Nous améliorons votre expérience de jeu' :
             language === 'ar' ? 'نحن نحسن تجربة اللعب الخاصة بك' :
             language === 'tz' ? 'ⵏⵙⵙⴼⵔⵓ ⵜⵉⵔⵎⵉⵜ ⵏⵏⴽ ⵏ ⵓⵔⴰⵔ' :
             'We\'re upgrading your gaming experience'}
          </p>
          <p className={`text-base md:text-lg text-white/70 ${getTextClass()}`}>
            {language === 'fr' ? 'Notre plateforme sera bientôt de retour avec des fonctionnalités extraordinaires' :
             language === 'ar' ? 'ستعود منصتنا قريبًا مع ميزات استثنائية' :
             language === 'tz' ? 'ⴰⴷ ⴷ-ⵜⵓⵖⴰⵍ ⵜⵎⴰⴳⴳⴰⵔⵜ ⵏⵏⵖ ⴰⵙⴰⴽⵓⴷ ⵙ ⵜⵎⵀⵍⴰ ⵜⵓⵙⵍⵉⴳⵉⵏ' :
             'Our platform will be back soon with extraordinary features'}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {/* Card 1 */}
          <div className="maintenance-info group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-white font-bold text-lg mb-2 ${getTextClass()}`}>
                {language === 'fr' ? 'Performances Améliorées' :
                 language === 'ar' ? 'أداء محسّن' :
                 language === 'tz' ? 'ⴰⵙⵙⴼⵔⵓ ⵏ ⵜⵡⵓⵔⵉⵡⵉⵏ' :
                 'Enhanced Performance'}
              </h3>
              <p className={`text-white/70 text-sm ${getTextClass()}`}>
                {language === 'fr' ? 'Optimisation complète du système' :
                 language === 'ar' ? 'تحسين كامل للنظام' :
                 language === 'tz' ? 'ⴰⵙⵙⴼⵔⵓ ⴰⵎⵥⵥⴰⵏ ⵏ ⵓⵏⴰⴳⵔⴰⵡ' :
                 'Complete system optimization'}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="maintenance-info group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-white font-bold text-lg mb-2 ${getTextClass()}`}>
                {language === 'fr' ? 'Nouvelles Fonctionnalités' :
                 language === 'ar' ? 'ميزات جديدة' :
                 language === 'tz' ? 'ⵜⵉⵎⵀⵍⴰ ⵜⵉⵎⴰⵢⵏⵓⵜⵉⵏ' :
                 'New Features'}
              </h3>
              <p className={`text-white/70 text-sm ${getTextClass()}`}>
                {language === 'fr' ? 'Expérience de jeu révolutionnaire' :
                 language === 'ar' ? 'تجربة لعب ثورية' :
                 language === 'tz' ? 'ⵜⵉⵔⵎⵉⵜ ⵏ ⵓⵔⴰⵔ ⵜⴰⵎⴰⵢⵏⵓⵜ' :
                 'Revolutionary gaming experience'}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="maintenance-info group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-white font-bold text-lg mb-2 ${getTextClass()}`}>
                {language === 'fr' ? 'Retour Imminent' :
                 language === 'ar' ? 'عودة وشيكة' :
                 language === 'tz' ? 'ⴰⵖⵓⵍ ⴰⵙⴰⴽⵓⴷ' :
                 'Coming Soon'}
              </h3>
              <p className={`text-white/70 text-sm ${getTextClass()}`}>
                {language === 'fr' ? 'Merci de votre patience' :
                 language === 'ar' ? 'شكرا لصبرك' :
                 language === 'tz' ? 'ⵜⴰⵏⵎⵎⵉⵔⵜ ⵅⴼ ⵓⵙⴱⴷⴰⴷ' :
                 'Thank you for your patience'}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex gap-6">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-24" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-primary/20"
          />
        </svg>
      </div>

      {/* Animated CSS for ping effect */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
