import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Activities data for the panels
  const activities = [
    {
      id: 1,
      name: "Free fire",
      image:
        "https://wallpapers.com/images/hd/garena-free-fire-nulla-poster-5mjqiwdfn0enjq8f.jpg",
      fontClass: "font-free-fire",
      size: "text-9xl",
    },
    {
      id: 2,
      name: "street fighter",
      image:
        "https://i.pinimg.com/474x/75/83/a6/7583a628590046beff3b5086ce60ed81.jpg",
      fontClass: "font-street-fighter",
      size: "text-7xl",
    },
    {
      id: 3,
      name: "valorant",
      image:
        "https://4kwallpapers.com/images/wallpapers/valorant-harbor-1280x1280-8910.png",
      fontClass: "font-valorant",
      size: "text-9xl",
    },
    {
      id: 4,
      name: "fc football",
      image:
        "https://4kwallpapers.com/images/wallpapers/ea-sports-fc-25-720x1280-17732.jpg",
      fontClass: "font-ea-football",
      size: "text-9xl",
    },
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop animation with text and image side by side
    mm.add("(min-width: 1024px)", () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        right: 0,
        borderRadius: 0,
      });

      // Title 360 rotation animation
      gsap.to(".rotate-title", {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#activities-section",
          start: "top 80%",
        },
      });

      // Staggered appearance of panels
      gsap.fromTo(
        ".activity-panel",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: "#activities-section",
            start: "top 80%",
          },
        }
      );
    });

    // Tablet animation with stacked layout
    mm.add("(max-width: 1023px)", () => {
      gsap.to(".mask-clip-path-mobile", {
        width: "100vw",
        height: "100vh",
        paddingRight: "0px",
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Title 360 rotation animation for mobile
      gsap.to(".rotate-title", {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#activities-section",
          start: "top 90%",
        },
      });

      // Mobile animation for activity panels
      gsap.fromTo(
        ".activity-panel",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#activities-section",
            start: "top 90%",
            end: "center center",
          },
        }
      );
    });
  });

  return (
    <div
      id="Discover"
      className="relative min-h-screen w-full overflow-x-hidden bg-[#F0F0FF] sm:px-0 md:px-0 lg:px-0"
    >
      <div className="relative text-center mt-8 sm:mt-12 md:mt-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-valorant text-xs sm:text-sm md:text-base lg:text-lg uppercase px-2 md:px-4 max-w-2xl mx-auto">
          Marhba bikom f akbar tournoi dyal e-sport f lMaghrib. Werriw lina chno
          3andkom f Valorant.
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="my-2 sm:my-3 md:my-5 !text-black text-center font-nightWarrior text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        />
      </div>

      {/* Activities Section - Horizontal Panels */}
      <div id="activities-section" className="relative bg-black w-full py-8">
        {/* Desktop Version - Horizontal Strip with Gaps */}
        <div className="hidden md:flex w-full h-[110dvh] px-4 gap-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-panel relative flex-1 h-full overflow-hidden cursor-pointer transition-all duration-300 group"
            >
              {/* Background Image */}
              <img
                src={activity.image}
                alt={activity.name}
                className="size-full object-cover object-center transition-transform duration-500"
              />

              {/* Left Side Light Overlay - gradient that fades from left to right */}
              <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>

              {/* Vertical Text - Top Left, reading top to bottom */}
              <div className="absolute top-0 left-1 h-full flex items-start z-10">
                <div className="writing-vertical">
                  <h3
                    className={`activity-name ${activity.fontClass} ${activity.size} text-[#D7C6AF] uppercase`}
                  >
                    {activity.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Version - Vertical Stack with Gaps */}
        <div className="md:hidden w-full px-4 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-panel relative w-full h-[150px] overflow-hidden flex justify-center items-center"
            >
              <h3
                className={`activity-name ${activity.fontClass} text-center text-6xl text-[#D7C6AF] uppercase`}
              >
                {activity.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Add this style to your CSS or as a style tag */}
      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-lr;
          text-orientation: mixed;
        }
      `}</style>

      <div className="absolute bottom-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-b from-transparent to-[#14141f]" />
    </div>
  );
};

export default About;
