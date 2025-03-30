import { useRef, useState, forwardRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "../hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

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

  // Combine les transformations si nécessaire
  const finalTransform = transformStyle 
    ? `${transformStyle} translateX(-10px)`
    : "translateX(-10px)";

  return (
    <div
      ref={(el) => {
        // Assurez-vous que la ref est correctement transmise
        if (ref) {
          if (typeof ref === 'function') {
            ref(el);
          } else {
            ref.current = el;
          }
        }
        itemRef.current = el;
      }}
      className={"font-valorant " + className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: finalTransform,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
});

BentoTilt.displayName = "BentoTilt";

const Tri9lGlory = () => {
  const { t, isRtl, language } = useTranslation();
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Effet pour s'assurer que la section est visible
  useEffect(() => {
    // Force la section à être visible après le montage
    if (sectionRef.current) {
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
    }
  }, []);

  // Fonction locale pour déterminer la classe de texte
  const getTextClass = () => {
    if (language === 'tz') return 'tamazight-text';
    if (language === 'fr') return 'french-text';
    return '';
  };

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });
    }

    // Assurez-vous que les cartes sont rendues avec animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current || document.body,
            start: `top+=${200 + index * 100} center`,
            end: `top+=${250 + index * 100} center`,
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  });

  return (
    <section
      id="Tri9lGlory"
      className="bg-brand-valorant-second min-h-[80vh] relative z-10"
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ 
        marginTop: '30px',
        paddingTop: '60px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="absolute top-0 pb-10 w-full h-24 bg-gradient-to-t from-transparent to-[#14141f]" />
      <div className="container mx-auto px-4 pt-5 md:px-10">
        <div className="px-4 md:px-5 pb-10 md:pb-16" ref={headerRef}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-nightWarrior text-primary ${getTextClass()}`}>
            {t('tri9lGlory.title')}
          </h1>
          <p className={`max-w-2xl tracking-wide text-base md:text-lg text-blue-50 opacity-80 mt-3 ${getTextClass()}`}>
            {t('tri9lGlory.description')}
          </p>
        </div>

        <main className="relative w-full pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <BentoTilt
              ref={(el) => (cardsRef.current[0] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className={`mb-3 md:mb-4 block text-4xl md:text-5xl font-nightWarrior text-primary ${getTextClass()}`}>
                  01
                </span>
                <p className={`text-gray-300 text-sm md:text-base leading-relaxed ${getTextClass()}`}>
                  {t('tri9lGlory.steps.step1')}
                </p>
              </div>
            </BentoTilt>

            <BentoTilt
              ref={(el) => (cardsRef.current[1] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className={`mb-3 md:mb-4 block text-4xl md:text-5xl font-nightWarrior text-primary ${getTextClass()}`}>
                  02
                </span>
                <p className={`text-gray-300 text-sm md:text-base leading-relaxed ${getTextClass()}`}>
                  {t('tri9lGlory.steps.step2')}
                </p>
              </div>
            </BentoTilt>

            <BentoTilt
              ref={(el) => (cardsRef.current[2] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className={`mb-3 md:mb-4 block text-4xl md:text-5xl font-nightWarrior text-primary ${getTextClass()}`}>
                  03
                </span>
                <p className={`text-gray-300 text-sm md:text-base leading-relaxed ${getTextClass()}`}>
                  {t('tri9lGlory.steps.step3')}
                </p>
              </div>
            </BentoTilt>
          </div>
        </main>
      </div>
      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
};

export default Tri9lGlory;
