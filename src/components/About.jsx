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
      tournamentPlayers: "4 vs 4 vs 4",
      prizePool: "50 000 DH",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 2,
      name: "street fighter",
      image: "https://i.pinimg.com/474x/75/83/a6/7583a628590046beff3b5086ce60ed81.jpg",
      fontClass: "font-street-fighter",
      size: "text-xl",
      tournamentMode: "1v1 Élimination",
      tournamentPlayers: "Solo",
      prizePool: "40 000 DH",
      color: "from-red-600 to-purple-700"
    },
    {
      id: 3,
      name: "valorant",
      image: "https://4kwallpapers.com/images/wallpapers/valorant-harbor-1280x1280-8910.png",
      fontClass: "font-valorant",
      tournamentMode: "Compétitif",
      tournamentPlayers: "5 vs 5",
      prizePool: "60 000 DH",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 4,
      name: "FC 25",
      image: "/img/EGS_EASPORT.jpeg",
      fontClass: "font-nightWarrior",
      tournamentMode: "1v1 Swiss System",
      tournamentPlayers: "Solo",
      prizePool: "30 000 DH",
      color: "from-green-500 to-blue-600"
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
        <div className="hidden md:flex w-full h-[600px] px-4 md:px-8 lg:px-16 gap-6 lg:gap-10 justify-center items-start">
          {Games.map((game, index) => (
            <div
              key={game.id}
              className={`desktop-game-panel game-panel-clickable relative flex-1 ${
                index % 2 === 0 ? "mt-0" : "mt-16"
              } h-[450px] lg:h-[500px] max-w-[270px] lg:max-w-[350px] overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 group`}
              onClick={() => handleGameClick(game)}
            >
              {/* Background image */}
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Bottom gradient overlay with game-specific colors */}
              <div 
                className={`absolute left-0 right-0 bottom-0 pointer-events-none h-2/3 bg-gradient-to-t ${game.color}`}
                style={{
                  opacity: 0.9,
                  background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)`
                }}
              ></div>
              
              {/* Game name badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                <h2 className={`text-white uppercase ${game.fontClass} text-sm lg:text-base`}>{game.name}</h2>
              </div>
              
              {/* Tournament info */}
              <div className="absolute bottom-0 left-0 w-full px-6 pb-8 text-center">
                <div className="flex flex-col gap-2">
                  <p className="text-white text-sm lg:text-base opacity-90 bg-black/30 rounded-full px-4 py-1 backdrop-blur-sm inline-block mx-auto">{game.tournamentPlayers}</p>
                  <p className="text-primary font-bold text-base lg:text-lg bg-white/10 rounded-full px-4 py-1 backdrop-blur-sm inline-block mx-auto">{game.prizePool}</p>
                </div>
                
                {/* Call to action button */}
                <div className="mt-4 transition-transform duration-300 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <button className="bg-primary text-white text-sm px-6 py-2 rounded-full hover:bg-primary/80 transition-all">Détails</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Version - Pinned section with horizontal scrolling */}
        <div ref={sectionRef} className="md:hidden relative w-full h-[520px]">
          <div ref={trackRef} className="absolute top-0 left-0 flex pl-4 pr-16">
            {Games.map((game, index) => (
              <div
                key={game.id}
                className={`mobile-game-panel game-panel-clickable relative ${
                  index % 2 === 0 ? "mt-0" : "mt-16"
                } w-[280px] h-[420px] mr-5 flex-shrink-0 overflow-hidden rounded-xl cursor-pointer hover:shadow-lg hover:shadow-primary/10 group`}
                onClick={() => handleGameClick(game)}
              >
                {/* Background image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Game name badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <h2 className={`text-white uppercase ${game.fontClass} text-sm`}>{game.name}</h2>
                </div>
                
                {/* Bottom gradient overlay with game-specific colors */}
                <div 
                  className="absolute left-0 right-0 bottom-0 pointer-events-none" 
                  style={{
                    height: "60%",
                    background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)`
                  }}
                ></div>
                
                {/* Tournament info */}
                <div className="absolute bottom-0 left-0 w-full px-4 pb-6 text-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-white text-sm opacity-90 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm inline-block mx-auto">{game.tournamentPlayers}</p>
                    <p className="text-primary font-bold text-sm bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm inline-block mx-auto">{game.prizePool}</p>
                  </div>
                  
                  {/* Mobile CTA indicator */}
                  <div className="mt-3">
                    <span className="inline-block text-white text-xs bg-primary/70 px-3 py-1 rounded-full">Appuyez pour plus d'infos</span>
                  </div>
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