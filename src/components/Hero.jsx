import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t, isRtl, language, getTextClass } =
    useTranslation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // S'assurer que la section est visible et que la police est correctement appliquée
  useEffect(() => {
    if (heroSectionRef.current) {
      heroSectionRef.current.style.visibility = "visible";
      heroSectionRef.current.style.opacity = "1";

      // Debug message en développement
      if (process.env.NODE_ENV === "development") {
        console.log("Hero section visible, langue:", language);
      }
    }
  }, [language]);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useGSAP(() => {
    // Vérifier que les éléments existent avant de les animer
    if (mainTitleRef.current) {
      gsap.from(mainTitleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    if (subTitleRef.current) {
      gsap.from(subTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
      });
    }
  });

  useGSAP(() => {
    const videoFrame = document.querySelector("#video-frame");
    if (videoFrame) {
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    }
  });


  return (
    <div
      id="hero"
      className="relative h-screen w-full overflow-hidden pt-32"
      dir={isRtl ? "rtl" : "ltr"}
      ref={heroSectionRef}
    >
      

     

      {loading && (
        <div className="absolute z-50 flex h-screen w-full items-center justify-center bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-screen w-full overflow-hidden rounded-lg bg-blue-75"
        style={{ marginTop: "-8rem" }}
      >
        <div className="relative h-full">
          {/* Fallback background in case video doesn't load */}
          <div className="absolute inset-0 bg-[#0a0a14] z-0"></div>

          {/* Single Background Video */}
          <video
            src="videos/hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 h-full w-full object-cover z-10"
            onLoadedData={handleVideoLoad}
            onError={(e) => {
              console.error("Video failed to load:", e);
              setLoading(false);
            }}
          />
        </div>

        {/* Audio Controls */}
        <button
          onClick={toggleAudioIndicator}
          className="absolute bottom-12 left-3 z-[9999999] flex items-center space-x-0.5 sm:bottom-10 sm:left-6 md:bottom-28 md:left-8 lg:bottom-24 lg:left-10"
        >
          <audio
            ref={audioElementRef}
            className="hidden"
            src="/audio/loop.mp3"
            loop
            preload="auto"
            autoPlay
          />
          {[1, 2, 3, 4, 5].map((bar) => (
            <div
              key={bar}
              className={clsx("indicator-line", { active: isIndicatorActive })}
              style={{ animationDelay: `${bar * 0.1}s` }}
            />
          ))}
        </button>

        {/* Content */}
        <div
          className="absolute left-0 top-0 z-40 h-full w-full"
        >
          <div className="flex h-full flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div ref={subTitleRef} className="relative text-white">
              {language === "fr" ? (
                <FrenchTitle
                  className=" !special-font text-primary hero-heading text-center text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-9xl"
                  textKey="hero.title"
                  bottomTitleKey1={t("hero.bottomTitle.part1") }
                  bottomTitleKey2={t("hero.bottomTitle.part2")}
                />
              ) : (
                <h1
                  ref={mainTitleRef}
                  className={` special-font hero-heading text-center text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-9xl `}
                >
                  <b className="text-primary ">{t("hero.title")}</b> <br />
                  <b>{t("hero.bottomTitle.part1")}</b>
                  <br />
                         <b>{t("hero.bottomTitle.part2")} </b>
                </h1>
              )}
              <div className="absolute -bottom-2 left-0 h-0.5 w-16 bg-gradient-to-r from-purple-500 to-transparent sm:h-1 sm:w-20 md:w-24 lg:-bottom-3 lg:w-32"></div>
            </div>

            <div className="mt-6 text-center font-circular-web sm:mt-8 md:mt-10">
              <p
                className={`mx-auto max-w-lg text-sm leading-relaxed text-blue-100 sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:max-w-3xl ${getTextClass()}`}
              >
                <span className={`text-brand-valorant ${getTextClass()}`}>
                  {t("hero.subtitle.part1")}
                </span>{" "}
                <span className={`text-white/90 ${getTextClass()}`}>
                  {t("hero.subtitle.part2")}
                </span>{" "}
                <span className={`text-primary ${getTextClass()}`}>
                  {t("hero.subtitle.part3")}
                </span>
                .{" "}
                <span className={`text-white/80 ${getTextClass()}`}>
                  {t("hero.subtitle.part4")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 z-10 mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-center w-full px-4 md:px-16">
          <div className="h-px flex-1 bg-gradient-to-r from-white to-white/30"></div>

          <div className="mx-2 sm:mx-4">
            <a
              href="https://user.gnews.ma/login "
              className="group relative"
            >
              <div className="absolute inset-0 -skew-x-12 bg-white"></div>
              <span className="relative flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8">
                <div className="absolute inset-0 -skew-x-12 border border-white"></div>
                <span
                  className={`relative special-font z-10 text-sm sm:text-md md:text-xl text-black uppercase`}
                >
                  {t("hero.playNow")}
                </span>
              </span>
            </a>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;