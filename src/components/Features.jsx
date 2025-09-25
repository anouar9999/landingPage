import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";

export const BentoTilt = ({ children, className = "" }) => {
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
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
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
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-3 sm:p-4 md:p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{title}</h1>
          {description && (
            <p className="mt-2 sm:mt-3 max-w-full sm:max-w-64 text-xs sm:text-sm md:text-base leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  return (
    <section className="bg-black mb-2  sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="px-2 xs:px-3 sm:px-4 md:px-5 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 xl:py-32">
          <h1 className="special-font tracking-wide text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight">
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

          <p className="max-w-full xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl font-circular-web text-xs xs:text-sm sm:text-base md:text-lg text-blue-50 opacity-50 leading-relaxed">
            {t(
              "documentationCenter.description",
              "Consultez notre centre de documentation pour télécharger les règlements, guides de participation et ressources officielles du programme GAMIUS."
            )}
          </p>
        </div>

        {/* Fixed 2-Column Grid for All Screen Sizes Including Laptops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
          {/* Row 1 - Regulations */}
          <BentoTilt className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-60 2xl:h-72 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=rules" className="block h-full w-full">
              <BentoCard
                src="videos/feature-3.mp4"
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
          <BentoTilt className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=guides" className="block h-full w-full">
              <BentoCard
                src="videos/feature-4.mp4"
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
          <BentoTilt className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=calendar" className="block h-full w-full">
              <BentoCard
                src="videos/feature-4.mp4"
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

          {/* Row 2 - Media */}
          <BentoTilt className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]">
            <Link to="/downloads?filter=media" className="block h-full w-full">
              <BentoCard
                src="videos/feature-2.mp4"
                title={
                  <>
                    {language === "fr" ? (
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white tracking-tight leading-tight">
                        Médias
                      </span>
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-white tracking-tight leading-tight">
                        Media
                      </span>
                    )}
                  </>
                }
                description="Access multimedia resources and promotional materials for GAMIUS events."
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