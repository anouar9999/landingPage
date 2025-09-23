import {
  AppWindow,
  Dices,
  Sword,
  Gamepad2,
  Monitor,
  Smartphone,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AnimatedTitle from "./AnimatedTitle";
import { t } from "i18next";
import useTranslation from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";

const ProvidenceGameShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cursorRef = useRef(null);
const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  // Mock translation function
  // const t = (key) => {
  //   const translations = {
  //     "about.subtitle": "FEATURED GAMES",
  //     "about.clickPrompt": "CLICK",
  //     "about.details": "VIEW PROJECT",
  //     "about.genre": "GENRE",
  //     "about.platforms": "PLATFORMS",
  //     "about.tapForInfo": "Tap for info",
  //     "about.title":
  //       "Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure",
  //   };
  //   return translations[key] || key;
  // };

  // Games data with full information
  const games = [
    {
      id: 1,
      name: "MapleStory Universe",
      subtitle:
        "EMBARK ON AN EPIC ADVENTURE IN A VAST FANTASY WORLD WITH ENDLESS POSSIBILITIES.",
      genre: "MMORPG",
      platforms: ["PC", "Mobile", "Console"],
      backgroundImage:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      img: "https://images.ctfassets.net/n9so4g0d0ob9/7LmyvY0lcUJqWPyEunWalf/8997c70fcf0fa7be4aa6001d15892e02/main_1.jpg",
      screenshots: [
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: 2,
      name: "Domi Online",
      subtitle:
        "STRATEGIC DOMINATION MEETS FAST-PACED ACTION IN THIS COMPETITIVE MULTIPLAYER EXPERIENCE.",
      genre: "STRATEGY",
      platforms: ["PC", "PlayStation", "Xbox"],
      backgroundImage:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      img: "https://images.ctfassets.net/n9so4g0d0ob9/5lhAvGfqQV6jEahE04uhkl/67df5faf610ad4e0d47f633a6c85c63c/jbjbj_1__1___1___1___1_.jpg",
      screenshots: [
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: 3,
      name: "RuneSeeker",
      subtitle:
        "DISCOVER ANCIENT MYSTERIES AND UNLOCK POWERFUL RUNES IN THIS MYSTICAL RPG ADVENTURE.",
      genre: "ACTION-RPG",
      platforms: ["PC", "Console"],
      backgroundImage:
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      img: "https://images.ctfassets.net/n9so4g0d0ob9/2BJEgMdwyoEPNpSwhXVOwC/a09098e575089008de74853711bbc5f8/Shrapnel4_1_1__1___1___1___1___1___1_.jpg",
      screenshots: [
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: 4,
      name: "Portal Fantasy",
      subtitle:
        "SURVIVE THE SINGULARITY! PROVIDENCE IS A GAME THAT OFFERS A UNIQUE SURVIVAL-ON-A-LOOP EXPERIENCE.",
      genre: "SURVIVAL-ON-A-LOOP",
      platforms: ["PC", "PlayStation", "Xbox"],
      backgroundImage:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      img: "https://images.ctfassets.net/n9so4g0d0ob9/5dEOCtlwjdyuYl732D91X8/5fe41d05034c26753dfc949b10485822/Providence2_1_1.jpg",
      screenshots: [
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  // Function to handle game change with transition
  const handleGameChange = (newIndex) => {
    if (newIndex !== activeGameIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveGameIndex(newIndex);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }
  };

  // Get current active game
  const activeGame = games[activeGameIndex];

  // Function to render platform icons
  const renderPlatformIcons = (platforms) => {
    return platforms.map((platform, index) => {
      let Icon;
      switch (platform.toLowerCase()) {
        case "pc":
          Icon = Monitor;
          break;
        case "mobile":
          Icon = Smartphone;
          break;
        case "playstation":
          Icon = Sword;
          break;
        case "xbox":
          Icon = Dices;
          break;
        case "console":
          Icon = Gamepad2;
          break;
        default:
          Icon = AppWindow;
      }

      return (
        <div
          key={index}
          className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <Icon color="#ffffff" className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      );
    });
  };

  // Handle mouse movement for custom cursor
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
    const interactiveElements = document.querySelectorAll(
      ".interactive-element"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
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

  return (
    <div
      style={{
        clipPath:
          "polygon(91% 0, 100% 0, 100% 35%, 98% 99%, 60% 100%, 46% 94%, 0 100%, 0% 70%, 0% 35%, 0 0)",
      }}
      className="relative min-h-screen w-full text-center flex-col items-center justify-center p-2 lg:p-4 overflow-hidden"
    >
      {" "}
      <div className="relative text-center my-8 sm:my-12 md:my-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-valorant text-primary text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
        <AnimatedTitle
          title={t("about.title")}
          containerClass="mt-5 !text-black text-center !text-primary"
        />
      </div>
      {/* Component Background Image - Changes with selected game */}
      <div className="absolute inset-0 -z-10">
        <div
          key={`bg-${activeGameIndex}`}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            isTransitioning ? "opacity-30 scale-105" : "opacity-60 scale-100"
          }`}
        >
          {/* <img
            src={activeGame.backgroundImage}
            alt={`${activeGame.name} Component Background`}
            className="w-full h-full object-cover"
          /> */}
        </div>
        {/* Component background overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>
        <div className="absolute inset-0 bg-black/20"></div> */}
      </div>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-16 h-16 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        style={{ position: "fixed" }}
      >
        <div className="w-full h-full rounded-full border-2 border-red-500 flex items-center justify-center">
          <div className="w-2/3 h-2/3 rounded-full border border-red-500 animate-pulse"></div>
          <div className="absolute text-red-500 text-xs font-bold">
            {t("about.clickPrompt")}
          </div>
        </div>
      </div>
      {/* Main Rounded Container */}
      <div className="w-[100vw] h-[100vh] lg:h-[100vh] relative overflow-hidden  bg-black/30 backdrop-blur-sm border border-white/10">
        {/* Inner Background Image with Overlay - Dynamic */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Inner Background for card effect */}
          <div
            key={`inner-${activeGameIndex}`}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
            }`}
          >
            <img
              src={activeGame.backgroundImage}
              alt={`${activeGame.name} Card Background`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay gradients for inner card */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
        </div>

        {/* Content Layout */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row mx-auto text-center">
          {/* Left Side - Game Information - Dynamic */}
          <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-12 py-8 lg:py-12">
            {/* Small Header */}
            <div className="mb-1 lg:mb-2">
              <p className="text-gray-300 text-xs lg:text-sm tracking-[0.3em] uppercase">
                FEATURED GAMES
              </p>
            </div>

            {/* Main Game Title - Dynamic */}
            <div
              className={`transition-all duration-500 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"}`}
            >
              <h1 className="text-6xl special-font lg:text-8xl xl:text-9xl font-black text-white mb-1 lg:mb-2 tracking-tight leading-none">
                {activeGame.name.toUpperCase()}
              </h1>
            </div>

            {/* Game Description - Dynamic */}
            <div
              className={`transition-all duration-500 delay-100 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}
            >
              <p className="text-gray-200 text-sm text-start -tracking-[0.1em] font-general lg:text-lg xl:text-xl max-w-xl mb-1 lg:mb-2 leading-relaxed line-clamp-2">
                {activeGame.subtitle}
              </p>
            </div>

            {/* Game Details Row - Dynamic */}
            <div
              className={`flex flex-col items-center sm:flex-row gap-6 lg:gap-12 mb-1 lg:mb-2 transition-all duration-500 delay-200 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}
            >
              {/* Genre - Dynamic */}
              <div>
                <p className="text-gray-400 font-general text-xs lg:text-sm uppercase tracking-widest mb-2">
                  {t("about.genre")}:
                </p>
                <p className="text-primary text-lg lg:text-2xl font-zentry">
                  {activeGame.genre}
                </p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-white/45"></div>

              {/* Platforms - Dynamic */}
              <div>
                <p className="text-gray-400 text-xs lg:text-sm uppercase tracking-widest mb-2">
                  {t("about.platforms")}:
                </p>
                <div className="flex gap-3">
                  {renderPlatformIcons(activeGame.platforms)}
                </div>
              </div>
            </div>

            {/* Slider Section */}
            <div className="w-full max-w-full ">
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                pagination={false}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                onSlideChange={(swiper) => {
                  // Update active game index when slide changes with transition
                  handleGameChange(swiper.realIndex);
                }}
                onSwiper={(swiper) => {
                  // Set initial active index
                  setActiveGameIndex(swiper.realIndex);
                }}
              >
                {games.map((game, index) => (
                  <SwiperSlide key={game.id} className="flex justify-center">
                    {({ isActive }) => (
                      <div
                        style={{
                          clipPath:
                            "polygon(91% 0, 100% 0, 100% 35%, 98% 99%, 60% 100%, 46% 94%, 0 93%, 0% 70%, 0% 35%, 0 0)",
                        }}
                        className={`game-slide relative flex h-[200px] w-[170px] items-end justify-center overflow-clip pb-8 
                          2xl:h-[220px] 2xl:w-[200px] transition-all duration-300 cursor-pointer
                          ${isActive ? "scale-110" : "scale-90 opacity-70"}`}
                        onClick={() => handleGameChange(index)}
                      >
                        {/* Background Image */}
                        <img
                          src={game.img}
                          alt={`Game ${game.name}`}
                          className="game-slide-image absolute inset-0 h-full w-full object-cover"
                          draggable="false"
                          loading="lazy"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Game Title */}
                        <div className="relative mb-1 sm:mb-0 text-white text-xs font-bold px-2 text-center">
                        {language === 'fr' ? (
                          <FrenchTitle textKey={game.name}
                           className="text-xs font-bold px-2 text-center" as="h1" />
                        ):(
                          game.name
                        )
                        }   {game.name}
                        </div>

                        {/* Active Outline only on center slide */}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-red-500 rounded-lg pointer-events-none animate-pulse"></div>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Bottom Navigation */}
              <div className="flex justify-center items-center gap-6 mt-6">
                <button className="custom-prev w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition">
                  ◀
                </button>
                <button className="custom-next w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition">
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-2xl"></div>
      </div>
    </div>
  );
};

export default ProvidenceGameShowcase;
