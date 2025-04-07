import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import HeroAdOverlay from "./HeroAdOverlay";
import clsx from "clsx";
import { useTranslation } from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } = useTranslation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const heroContentRef = useRef(null);
  const playNowRef = useRef(null);
  const bottomTitleRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const heroSectionRef = useRef(null);
  
  // S'assurer que la section est visible et que la police est correctement appliquée
  useEffect(() => {
    if (heroSectionRef.current) {
      heroSectionRef.current.style.visibility = 'visible';
      heroSectionRef.current.style.opacity = '1';
      
      // Forcer l'application de la police Tifinagh sur les éléments clés
      if (isTamazight) {
        forceTifinaghFont(heroSectionRef);
        forceTifinaghFont(mainTitleRef);
        forceTifinaghFont(subTitleRef);
        forceTifinaghFont(heroContentRef);
        forceTifinaghFont(playNowRef);
        forceTifinaghFont(bottomTitleRef);
        
        // Appliquer manuellement la classe aux éléments qui pourraient être générés dynamiquement
        setTimeout(() => {
          const textElements = heroSectionRef.current.querySelectorAll('p, span, div > span, a, button, h1:not(.font-nightWarrior), h2:not(.font-nightWarrior), h3:not(.font-nightWarrior)');
          textElements.forEach(el => {
            if (!el.classList.contains('font-nightWarrior') && 
                !el.classList.contains('nightWarrior')) {
              el.classList.add('tamazight-text');
              el.style.fontFamily = 'Tifinagh, "Noto Sans Tifinagh", sans-serif';
              el.style.fontWeight = '600';
            }
          });
        }, 100);
      }
      
      // Debug message en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('Hero section visible, langue:', language);
      }
    }
  }, [language, forceTifinaghFont, isTamazight]);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

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

    if (logoWrapperRef.current) {
      gsap.from(logoWrapperRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1,
      });
    }

    if (hasClicked) {
      const nextVideo = document.querySelector("#next-video");
      const currentVideo = document.querySelector("#current-video");
      
      if (nextVideo) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current && nextVdRef.current.play(),
        });
      }
      
      if (currentVideo) {
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    }
  }, [hasClicked]);

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

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const worldToMorocco = t('hero.worldToMorocco', "au Maroc");

  return (
    <div 
      id="hero" 
      className="relative h-screen w-full overflow-hidden pt-32" 
      dir={isRtl ? 'rtl' : 'ltr'}
      ref={heroSectionRef}
    >
      {/* Suppression de l'indicateur de débogage */}

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
          
          {/* Video Preview Container */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="aspect-video cursor-pointer overflow-hidden rounded-lg">
              <VideoPreview>
                <div
                  onClick={handleMiniVdClick}
                  className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                >
                  <video
                    ref={nextVdRef}
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    loop
                    muted
                    id="current-video"
                    className="h-full w-full object-cover"
                    onLoadedData={handleVideoLoad}
                    onError={(e) => {
                      console.error("Video failed to load:", e);
                      setLoading(false);
                    }}
                  />
                </div>
              </VideoPreview>
            </div>
          </div>

          {/* Main Video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 invisible z-20 h-full w-full object-cover"
            onLoadedData={handleVideoLoad}
            onError={(e) => {
              console.error("Video failed to load:", e);
              setLoading(false);
            }}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 h-full w-full object-cover"
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

        {/* HeroAdOverlay - Composant pour afficher les emplacements publicitaires */}
        <HeroAdOverlay />

        {/* Content */}
        <div 
          className="absolute left-0 top-0 z-40 h-full w-full"
          ref={heroContentRef}
        >
          <div className="flex h-full flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div ref={subTitleRef} className="relative text-white">
              {language === 'fr' ? (
                <FrenchTitle 
                  className="font-nightWarrior text-center text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-9xl"
                  textKey="hero.title"
                />
              ) : (
                <h1 
                  ref={mainTitleRef} 
                  className={`font-nightWarrior text-center text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-9xl ${isTamazight ? 'tamazight-text' : ''}`}
                >
                  {t('hero.title')}
                </h1>
              )}
              <div className="absolute -bottom-2 left-0 h-0.5 w-16 bg-gradient-to-r from-purple-500 to-transparent sm:h-1 sm:w-20 md:w-24 lg:-bottom-3 lg:w-32"></div>
            </div>

            <div className="mt-6 text-center font-general sm:mt-8 md:mt-10">
              <p className={`mx-auto max-w-lg text-sm leading-relaxed text-blue-100 sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:max-w-3xl ${getTextClass()}`}>
                <span className={`text-brand-valorant ${getTextClass()}`}>
                  {t('hero.subtitle.part1')}
                </span>{" "}
                <span className={`text-white/90 ${getTextClass()}`}>
                  {t('hero.subtitle.part2')}
                </span>{" "}
                <span className={`text-primary ${getTextClass()}`}>{t('hero.subtitle.part3')}</span>.{" "}
                <span className={`text-white/80 ${getTextClass()}`}>
                  {t('hero.subtitle.part4')}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Title */}
      <h1 
        ref={bottomTitleRef}
        className={`absolute bottom-4 right-4 text-4xl text-black opacity-20 transition-opacity duration-300 hover:opacity-40 sm:bottom-5 sm:right-5 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nightWarrior ${isTamazight ? 'tamazight-text' : ''}`}
      >
        {t('hero.bottomTitle')}
      </h1>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 z-10 mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-center w-full px-4 md:px-16">
          <div className="h-px flex-1 bg-gradient-to-r from-[#FF4757]/30 to-[#AE2085]/30"></div>

          <div className="mx-2 sm:mx-4">
            <a
              href="https://user.mgexpo.ma/auth/auth1/login"
              className="group relative"
              ref={playNowRef}
            >
              <div className="absolute inset-0 -skew-x-12 bg-white"></div>
              <span className="relative flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8">
                <div className="absolute inset-0 -skew-x-12 border border-white"></div>
                <span className={`relative z-10 text-xs sm:text-sm md:text-base text-black font-valorant uppercase ${getTextClass()}`}>
                  {t('hero.playNow')}
                </span>
              </span>
            </a>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-[#AE2085]/30 to-[#FF4757]/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
