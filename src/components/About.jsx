import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import GameDetailPopup from "./GameDetailPopup";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GamingShowcase = () => {
  // État pour gérer le popup
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // État pour la position du curseur personnalisé
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef(null);

  // Fonction pour ouvrir le popup
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsPopupOpen(true);
  };

  // Fonction pour fermer le popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Games data for the panels
  const Games = [
    {
      id: 1,
      name: "Free fire",
      image: "https://wallpapers.com/images/hd/garena-free-fire-nulla-poster-5mjqiwdfn0enjq8f.jpg",
      fontClass: "font-free-fire",
      tournamentMode: "Battle Royale",
      tournamentPlayers: "4 vs 4 vs 4"
    },
    {
      id: 2,
      name: "street fighter",
      image: "https://i.pinimg.com/474x/75/83/a6/7583a628590046beff3b5086ce60ed81.jpg",
      fontClass: "font-street-fighter",
      size: "text-xl",
      tournamentMode: "1v1 Élimination",
      tournamentPlayers: "Solo"
    },
    {
      id: 3,
      name: "valorant",
      image: "https://4kwallpapers.com/images/wallpapers/valorant-harbor-1280x1280-8910.png",
      fontClass: "font-valorant",
      tournamentMode: "Compétitif",
      tournamentPlayers: "5 vs 5"
    },
    {
      id: 4,
      name: "pes 2024",
      image: "https://pbs.twimg.com/media/Fy-EOI_XgAAWBLO?format=jpg&name=4096x4096",
      fontClass: "font-pes",
      tournamentMode: "Ligue & Knockout",
      tournamentPlayers: "1 vs 1"
    },
    {
      id: 5,
      name: "tekken 8",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/ss_6b3c0f3236b5d84fd7e62a67cdee2638104cb616.1920x1080.jpg?t=1700738972",
      fontClass: "font-tekken",
      size: "text-lg",
      tournamentMode: "Double Élimination",
      tournamentPlayers: "Solo"
    }
  ];
  
  // Référence pour le conteneur de la section et la piste de défilement horizontal
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Gérer la position du curseur personnalisé
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

    // Ajouter des écouteurs pour les éléments cliquables
    const gameElements = document.querySelectorAll('.game-panel-clickable');
    gameElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      gameElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Animation du curseur
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [mousePosition]);

  // Animation de défilement horizontal pour la version mobile
  useGSAP(() => {
    if (sectionRef.current && trackRef.current) {
      const section = sectionRef.current;
      const track = trackRef.current;

      // Get the total width of all panels
      const totalPanelsWidth = Games.length * (200 + 12); // panel width + gap

      // Set up the scroll animation
      const horizontalScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "center center",
          end: `+=${totalPanelsWidth}px`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate the track from starting position to end
      horizontalScroll.to(track, {
        x: -totalPanelsWidth + window.innerWidth - 32, // Adjust for viewport width and padding
        ease: "none",
        duration: 1,
      });

      // Fade in panels as they enter the viewport
      gsap.fromTo(
        ".mobile-game-panel",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.4,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      id="Discover"
      className="relative min-h-screen w-full overflow-x-hidden bg-[#F0F0FF]"
    >
      {/* Curseur personnalisé */}
      <div 
        ref={cursorRef}
        className={`fixed w-16 h-16 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: -32, 
          top: -32,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-2/3 h-2/3 rounded-full border border-primary animate-pulse"></div>
          <div className="absolute text-primary text-xs font-bold">CLIQUEZ</div>
        </div>
      </div>

      <div className="relative text-center mt-8 sm:mt-12 md:mt-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-valorant text-primary text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
          Marhba bikom f akbar tournoi dyal e-sport f lMaghrib. Werriw lina chno
          3andkom fl Game likinasbkum.
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="my-2 sm:my-3 md:my-5 !text-black text-center font-nightWarrior text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        />
      </div>

      {/* Games Section */}
      <div id="games-section" className="relative w-full py-8">
        {/* Desktop/Tablet Version - Fixed layout with alternating margins */}
        <div className="hidden md:flex w-full h-[600px] px-4 gap-4 justify-center items-start">
          {Games.map((game, index) => (
            <div
              key={game.id}
              className={`desktop-game-panel game-panel-clickable relative flex-1 ${
                index % 2 === 0 ? "mt-0" : "mt-16"
              } h-[450px] lg:h-[500px] max-w-[180px] lg:max-w-[200px] overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105`}
              onClick={() => handleGameClick(game)}
            >
              {/* Background image */}
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover object-center transition-transform duration-500"
              />
              
              {/* Bottom gradient overlay using absolute positioning and specific height */}
              <div 
                className="absolute left-0 right-0 pointer-events-none" 
                style={{
                  bottom: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
                }}
              ></div>
              
              {/* Tournament mode instead of game logo */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-6 text-center">
                <h3 className="text-white font-bold text-base lg:text-lg mb-1">{game.tournamentMode}</h3>
                <p className="text-white text-xs lg:text-sm opacity-80">{game.tournamentPlayers}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Version - Pinned section with horizontal scrolling */}
        <div ref={sectionRef} className="md:hidden relative w-full h-[500px]">
          <div ref={trackRef} className="absolute top-0 left-0 flex pl-4 pr-16">
            {Games.map((game, index) => (
              <div
                key={game.id}
                className={`mobile-game-panel game-panel-clickable relative ${
                  index % 2 === 0 ? "mt-0" : "mt-16"
                } w-[200px] h-[350px] mr-3 flex-shrink-0 overflow-hidden rounded-xl cursor-pointer hover:shadow-lg hover:shadow-primary/10`}
                onClick={() => handleGameClick(game)}
              >
                {/* Background image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Bottom gradient overlay using inline styles for more control */}
                <div 
                  className="absolute left-0 right-0 pointer-events-none" 
                  style={{
                    bottom: 0,
                    height: "40%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
                  }}
                ></div>
                
                {/* Tournament mode instead of game logo for mobile */}
                <div className="absolute bottom-0 left-0 w-full px-2 pb-4 text-center">
                  <h3 className="text-white font-bold text-sm mb-1">{game.tournamentMode}</h3>
                  <p className="text-white text-xs opacity-80">{game.tournamentPlayers}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Popup pour les détails du tournoi */}
      <GameDetailPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        game={selectedGame}
      />
    </div>
  );
};

export default GamingShowcase;