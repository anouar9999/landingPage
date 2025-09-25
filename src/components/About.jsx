import {
  AppWindow,
  Dices,
  Sword,
  Gamepad2,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ProvidenceGameShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isArrowNavigation, setIsArrowNavigation] = useState(false);
  const cursorRef = useRef(null);
  const sliderRef = useRef(null);
  
  // Mock translation function since the original hook isn't available
  const t = (key) => {
    const translations = {
      "about.subtitle": "REDEFINING GAMING EXPERIENCES",
      "about.title": "FEATURED GAMES",
      "about.clickPrompt": "CLICK",
      "about.genre": "GENRE",
      "about.platforms": "PLATFORMS"
    };
    return translations[key] || key;
  };

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

  // Touch and swipe handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    
    // Limit drag offset to prevent over-dragging
    const maxOffset = 200;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    setDragOffset(limitedOffset);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setIsDragging(true);
    setTouchEnd(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !touchStart) return;
    
    const diff = touchStart - e.clientX;
    const maxOffset = 200;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    setDragOffset(limitedOffset);
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, touchStart, touchEnd]);

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

  // Navigation functions for custom slider with slide animation
  const goToNext = () => {
    const nextIndex = (activeGameIndex + 1) % games.length;
    
    // Trigger slide animation
    setIsArrowNavigation(true);
    setSlideOffset(-300); // Slide left
    
    setTimeout(() => {
      handleGameChange(nextIndex);
      setSlideOffset(300); // Position for slide in from right
    }, 150);
    
    setTimeout(() => {
      setSlideOffset(0); // Slide back to center
      setTimeout(() => {
        setIsArrowNavigation(false);
      }, 300);
    }, 200);
  };

  const goToPrev = () => {
    const prevIndex = activeGameIndex === 0 ? games.length - 1 : activeGameIndex - 1;
    
    // Trigger slide animation
    setIsArrowNavigation(true);
    setSlideOffset(300); // Slide right
    
    setTimeout(() => {
      handleGameChange(prevIndex);
      setSlideOffset(-300); // Position for slide in from left
    }, 150);
    
    setTimeout(() => {
      setSlideOffset(0); // Slide back to center
      setTimeout(() => {
        setIsArrowNavigation(false);
      }, 300);
    }, 200);
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

  // Get visible games for the slider (center game + 2 on each side for better visibility)
  const getVisibleGames = () => {
    const visibleGames = [];
    const totalGames = games.length;
    
    // Show 5 games: 2 left + center + 2 right
    for (let i = -2; i <= 2; i++) {
      let index = (activeGameIndex + i + totalGames) % totalGames;
      visibleGames.push({
        ...games[index],
        originalIndex: index,
        isActive: i === 0,
        position: i
      });
    }
    
    return visibleGames;
  };

  return (
    <div
      style={{
        clipPath:
          "polygon(91% 0, 100% 0, 100% 35%, 98% 99%, 60% 100%, 46% 94%, 0 100%, 0% 70%, 0% 35%, 0 0)",
      }}
      className="relative min-h-screen w-full text-center flex-col items-center justify-center p-2 lg:p-4 overflow-hidden"
    >
      <div className="relative text-center my-8 sm:my-12 md:my-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-bold text-red-500 text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4">
          {t("about.title")}
        </h1>
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
      <div className="w-full max-w-7xl mx-auto h-[80vh] relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl">
        {/* Inner Background Image with Overlay - Dynamic */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
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
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-12 py-8 lg:py-12">
          {/* Small Header */}
          <div className="mb-4 lg:mb-6">
            <p className="text-gray-300 text-xs lg:text-sm tracking-[0.3em] uppercase">
              FEATURED GAMES
            </p>
          </div>

          {/* Main Game Title - Dynamic */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"}`}
          >
            <h1 className="text-4xl lg:text-6xl xl:text-8xl font-black text-white mb-4 lg:mb-6 tracking-tight leading-none text-center">
              {activeGame.name.toUpperCase()}
            </h1>
          </div>

          {/* Game Description - Dynamic */}
          <div
            className={`transition-all duration-500 delay-100 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}
          >
            <p className="text-gray-200 text-sm lg:text-lg xl:text-xl max-w-3xl mb-6 lg:mb-8 leading-relaxed text-center">
              {activeGame.subtitle}
            </p>
          </div>

          {/* Game Details Row - Dynamic */}
          <div
            className={`flex flex-col items-center sm:flex-row gap-6 lg:gap-12 mb-8 lg:mb-12 transition-all duration-500 delay-200 ease-in-out transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}
          >
            {/* Genre - Dynamic */}
            <div className="text-center">
              <p className="text-gray-400 text-xs lg:text-sm uppercase tracking-widest mb-2">
                {t("about.genre")}:
              </p>
              <p className="text-red-500 text-lg lg:text-2xl font-bold">
                {activeGame.genre}
              </p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-white/45"></div>

            {/* Platforms - Dynamic */}
            <div className="text-center">
              <p className="text-gray-400 text-xs lg:text-sm uppercase tracking-widest mb-2">
                {t("about.platforms")}:
              </p>
              <div className="flex gap-3 justify-center">
                {renderPlatformIcons(activeGame.platforms)}
              </div>
            </div>
          </div>

          {/* Custom Slider Section */}
          <div className="w-full max-w-4xl">
            {/* Game Slides Container */}
            <div
  ref={sliderRef}
  className="relative overflow-hidden cursor-grab active:cursor-grabbing"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onMouseDown={handleMouseDown}
>

              <div 
                className={`flex justify-center items-center gap-4 px-4 transition-transform duration-300 ease-out ${
                  isDragging ? 'transition-none' : ''
                } ${isArrowNavigation ? 'duration-300 ease-in-out' : ''}`}
                style={{
                  transform: `translateX(${isDragging ? -dragOffset : slideOffset}px)`
                }}
              >
                {getVisibleGames().map((game, index) => (
                  <div
                    key={`${game.id}-${index}`}
                    style={{
                      clipPath:
                        "polygon(91% 0, 100% 0, 100% 35%, 98% 99%, 60% 100%, 46% 94%, 0 93%, 0% 70%, 0% 35%, 0 0)",
                    }}
                    className={`game-slide relative flex items-end justify-center overflow-clip pb-4 cursor-pointer select-none
                      ${isArrowNavigation ? 'transition-all duration-300 ease-in-out' : 'transition-all duration-500'}
                      ${game.isActive ? 
                        'h-[200px] w-[170px] lg:h-[220px] lg:w-[200px] scale-110 z-10 opacity-100' : 
                        game.position === -1 || game.position === 1 ?
                        'h-[160px] w-[130px] lg:h-[180px] lg:w-[160px] scale-90 opacity-80' :
                        'h-[120px] w-[100px] lg:h-[140px] lg:w-[120px] scale-75 opacity-50'
                      } ${isDragging ? 'pointer-events-none' : ''}`}
                    onClick={() => handleGameChange(game.originalIndex)}
                  >
                    {/* Background Image */}
                    <img
                      src={game.img}
                      alt={`Game ${game.name}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable="false"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Game Title */}
                    <div className="relative mb-2 text-white text-xs font-bold px-2 text-center">
                      {game.name}
                    </div>

                    {/* Active Outline only on center slide */}
                    {game.isActive && (
                      <div className="absolute inset-0 border-2 border-red-500 pointer-events-none animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Side Navigation Arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
              <button 
                onClick={goToPrev}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-white/30 text-white hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 backdrop-blur-sm group"
              >
                <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
              <button 
                onClick={goToNext}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-white/30 text-white hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 backdrop-blur-sm group"
              >
                <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Custom Bottom Navigation */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button 
                onClick={goToPrev}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:border-red-500"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Pagination dots */}
              <div className="flex gap-2">
                {games.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleGameChange(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeGameIndex ? 'bg-red-500' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={goToNext}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:border-red-500"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
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