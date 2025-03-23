import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import GameDetailPopup from "./GameDetailPopup";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GamingShowcase = () => {
  // État pour gérer le popup
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      image:
        "https://wallpapers.com/images/hd/garena-free-fire-nulla-poster-5mjqiwdfn0enjq8f.jpg",
      fontClass: "font-free-fire",
      game: "public/img/images-removebg-preview (1).png",
    },
    {
      id: 2,
      name: "street \t fighter",
      image:
        "https://i.pinimg.com/474x/75/83/a6/7583a628590046beff3b5086ce60ed81.jpg",
      fontClass: "font-street-fighter",
      size: "text-xl",
      game: "public/img/street-fighter-fan-casting-poster-149631-medium-removebg-preview.png",
    },
    {
      id: 3,
      name: "valorant",
      image:
        "https://4kwallpapers.com/images/wallpapers/valorant-harbor-1280x1280-8910.png",
      fontClass: "font-valorant",
      size: "text-xl",
      game: "public/img/hd-valorant-white-official-logo-with-symbol-png-701751694788076hx3eqqqtmc-removebg-preview.png",
    },
    {
      id: 4,
      name: "fc football",
      image:
        "https://4kwallpapers.com/images/wallpapers/ea-sports-fc-25-720x1280-17732.jpg",
      fontClass: "font-ea-football",
      size: "text-xl",
      game: "public/img/uncommon_ea_sports_fc_visual_identity__8_-removebg-preview.png",
    },
  ];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop and tablet animations
    mm.add("(min-width: 768px)", () => {
      // Staggered appearance of panels
      gsap.fromTo(
        ".desktop-game-panel",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#games-section",
            start: "top 80%",
          },
        }
      );
    });

    // Mobile pinned scroll animations
    mm.add("(max-width: 767px)", () => {
      if (!sectionRef.current || !trackRef.current) return;

      // Get elements and calculate dimensions
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
    });
  }, []);

  return (
    <div
      id="Discover"
      className="relative min-h-screen w-full overflow-x-hidden bg-[#F0F0FF]"
    >
      <div className="relative text-center mt-8 sm:mt-12 md:mt-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-valorant text-primary text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
          Marhba bikom f akbar tournoi dyal e-sport f lMaghrib. Werriw lina chno
          3andkom f Valorant.
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
              className={`desktop-game-panel relative flex-1 ${
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
              
              {/* Game logo positioned at bottom */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-6 text-center">
                <img 
                  src={game.game} 
                  alt={`${game.name} logo`}
                  className="w-full h-auto max-h-20 object-contain mx-auto"
                />
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
                className={`mobile-game-panel relative ${
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
                
                {/* Game logo for mobile */}
                <div className="absolute bottom-0 left-0 w-full px-2 pb-4 text-center">
                  <img 
                    src={game.game} 
                    alt={`${game.name} logo`}
                    className="w-full h-auto max-h-20 object-contain mx-auto"
                  />
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