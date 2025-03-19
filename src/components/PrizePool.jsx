import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { useGSAP } from "@gsap/react";

const PrizeCard = ({ place, amount, className = "" }) => {
  return (
    <div className={`w-full bg-black/20 backdrop-blur-sm rounded-xl p-8 ${className}`}>
      <div className="text-center">
      <p className="font-nightWarrior text-5xl font-bold text-[#D7C6AF] mt-4">{amount}<small className=" text-2xl">DH</small></p>

        <p className="font-valorant text-md uppercase text-gray-400">{place}</p>
      </div>
    </div>
  );
};

const PrizePool = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  useGSAP(() => {
    gsap.to("#prize-transition", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#prize-transition",
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  });
  
  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="PrizePool" className="min-h-dvh w-screen bg-black text-blue-50 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-10 pb-24">
          <p className="font-valorant text-center text-primary text-sm uppercase md:text-[15px]">
          250,000 dh f l'jeu, ghir werrina chno 3andek. Rbe7 w welli une légende m3roufa f lblad kamla.
          </p>

          <div className="relative w-full">
            <AnimatedTitle 
              title="Rbe7 w welli  mchhor<b>m</b>"
              color={"text-primary"}
              containerClass=" bento-title mt-5 pointer-events-none mix-blend-difference relative z-10 font-nightWarrior text-7xl md:text-8xl text-center"
            />
            
            {/* Main Prize */}
            <div 
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mt-20 flex flex-col items-center justify-center transform-gpu"
            >
              <div className="text-center">
                <span className="font-valorant text-2xl uppercase text-gray-400">Total Prize Pool</span>
                <h2 className="bento-title font-nightWarrior text-8xl font-bold text-primary mt-4">
                250 000 <small className=" text-3xl">DH</small>
                </h2>
              </div>
              
              <div className="absolute -z-10 size-[500px] rounded-full bg-gradient-to-r from-primary/10 to-primary/10 blur-3xl" />
            </div>

            {/* Prize Distribution */}
            <div className="mt-32 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
              <PrizeCard 
                place="first place" 
                amount="100,000 "
                className=" transition-all duration-300 hover:scale-105"
              />
              <PrizeCard 
                place="second place" 
                amount="30,000 "
                className=" transition-all duration-300 hover:scale-105"
              />
              <PrizeCard 
                place="third place" 
                amount="20,000 "
                className=" transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/50 to-[#0A0A0A] pointer-events-none" style={{ zIndex: 50 }} />
    </div>
  );
};

export default PrizePool;