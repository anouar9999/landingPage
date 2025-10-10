import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";
import { Book, Lightbulb, Calendar, FileText, Zap, Download, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BentoTilt = ({ children, className = "", innerRef }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={(el) => {
        itemRef.current = el;
        if (innerRef) innerRef(el);
      }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, icon: Icon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full group">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-[1]"></div>
      
      <div className="relative z-10 flex size-full flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 text-blue-50">
        <div>
          {/* Icon */}
          {Icon && (
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
              <Icon className="text-primary w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </div>
          )}
          
          <h1 className="bento-title special-font text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">{title}</h1>
          {description && (
            <p className="mt-2 sm:mt-3 max-w-full sm:max-w-64 text-xs sm:text-sm md:text-base leading-relaxed text-white/80">{description}</p>
          )}
        </div>
        
        {/* Hover action */}
        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
          <span className="text-sm font-semibold">Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* Coming soon badge */}
      {isComingSoon && (
        <div className="absolute top-3 right-3 z-20 bg-primary/90 text-black text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          Bientôt
        </div>
      )}
    </div>
  );
};

const Features = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
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
    }
    
    // Description animation
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
    
    // Cards stagger animation
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }
  }, []);
  
  return (
    <section ref={sectionRef} className="bg-black mb-2  sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="px-2 xs:px-3 sm:px-4 md:px-5 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 xl:py-32">
          <h1 ref={titleRef} className="special-font tracking-wide text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight">
            {language === "fr" ? (
              <FrenchTitle
                textKey="documentationCenter.title"
                className="!text-xl !xs:text-2xl !sm:text-3xl !md:text-4xl !lg:text-5xl !xl:text-6xl !2xl:text-7xl font-black text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight"
                as="h1"
              />
            ) : (
              
<h1 className="special-font font-9xl bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
                {t("documentationCenter.title")}
                  </h1>
            )}
          </h1>

          <p ref={descriptionRef} className="max-w-full xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl font-circular-web text-xs xs:text-sm sm:text-base md:text-lg text-blue-50 opacity-50 leading-relaxed">
            {t(
              "documentationCenter.description",
              "Consultez notre centre de documentation pour télécharger les règlements, guides de participation et ressources officielles du programme GAMIUS."
            )}
          </p>
        </div>

        {/* Fixed 2-Column Grid for All Screen Sizes Including Laptops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
          {/* Row 1 - Regulations */}
          <BentoTilt innerRef={el => cardsRef.current[0] = el} className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-60 2xl:h-72 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=rules" className="block h-full w-full">
              <BentoCard
                src="videos/feature-3.mp4"
                icon={Book}
                title={
                  <>
                    {language === "fr" ? (
                      <FrenchTitle
                        textKey="documentationCenter.cards.regulations"
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white mb-1 sm:mb-2 lg:mb-3 tracking-tight leading-tight"
                        as="div"
                      />
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white tracking-tight leading-tight">
                        {t("documentationCenter.cards.regulations")}
                      </span>
                    )}
                  </>
                }
                description={t(
                  "documentationCenter.description",
                  "Find the official rules and regulations for all GAMIUS events and activities."
                )}
                isComingSoon
              />
            </Link>
          </BentoTilt>

          {/* Row 1 - Strategy Hub */}
          <BentoTilt innerRef={el => cardsRef.current[1] = el} className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=guides" className="block h-full w-full">
              <BentoCard
                src="videos/feature-4.mp4"
                icon={Lightbulb}
                title={
                  <>
                    {language === "fr" ? (
                      <FrenchTitle
                        textKey="documentationCenter.strategyHub.title"
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white mb-1 sm:mb-2 lg:mb-3 tracking-tight leading-tight"
                        as="div"
                      />
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white tracking-tight leading-tight">
                        {t("documentationCenter.strategyHub.title")}
                      </span>
                    )}
                  </>
                }
                description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                isComingSoon
              />
            </Link>
          </BentoTilt>

          {/* Row 2 - Calendar */}
          <BentoTilt innerRef={el => cardsRef.current[2] = el} className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=calendar" className="block h-full w-full">
              <BentoCard
                src="videos/feature-4.mp4"
                icon={Calendar}
                title={
                  language === "fr" ? (
                    <FrenchTitle
                      textKey="documentationCenter.downloadZone.title"
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white mb-1 sm:mb-2 lg:mb-3 tracking-tight leading-tight"
                      as="div"
                    />
                  ) : (
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white tracking-tight leading-tight">
                      {t("documentationCenter.downloadZone.title")}
                    </span>
                  )
                }
                description={t(
                  "documentationCenter.description",
                  "Access the official GAMIUS event calendar to stay updated on all upcoming activities and deadlines."
                )}
                isComingSoon
              />
            </Link>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;