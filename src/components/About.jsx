import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
    });

    // Tablet animation with stacked layout
    mm.add("(max-width: 1023px)", () => {
      gsap.to(".mask-clip-path-mobile", {
        width: "100vw",
        height: "100vh",
        paddingRight:"0px",
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    });
  });

  return (
    <div id="Discover" className="relative min-h-screen w-full overflow-x-hidden bg-[#F0F0FF]  sm:px-0 md:px-0 lg:px-0">
      <div className="relative text-center mt-8 sm:mt-12 md:mt-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        <p className="font-valorant text-xs sm:text-sm md:text-base lg:text-lg uppercase px-2 md:px-4 max-w-2xl mx-auto">
          Marhba bikom f akbar tournoi dyal e-sport f lMaghrib. Werriw lina chno 3andkom f Valorant.
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="my-2 sm:my-3 md:my-5 !text-black text-center font-nightWarrior text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        />
      </div>

      <div className="relative lg:h-screen" id="clip">
        {/* Mobile and Tablet Layout */}
        <div className="flex flex-col gap-6 lg:hidden mt-8">
          <div className="px-4">
            <p className="font-zentry text-lg md:text-2xl font-extrabold leading-relaxed text-brand-valorant-second tracking-wide">
              <span className="text-brand-valorant">5V5 3LA PC.</span> <br />
              Khasek tkoun mzyan f <span className="text-purple-500">l'aim</span>{" "}
              w <span className="text-teal-500">strategy</span>. 
              Ghadi t9dar tfahem w tchouf les meilleurs joueurs fi l'
              <span className="text-yellow-400">Maghrib</span>.
              <br className="hidden md:block" />
              <span className="hidden md:inline">
                Dir l'effort f coordination m3a l'equipe dyalek w{" "}
                <span className="text-pink-500">3rf</span> tariq l'adversaire bash t'koun fi l'awwal fi kol duel.
              </span>
            </p>
          </div>
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl mask-clip-path-mobile transform-gpu">
            <img
              src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/c30d7b14a6969df89073245b66eb702141299add-1920x1080.jpg"
              alt="Background"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative  left-24 top-20 w-full max-w-xl px-2">
            <p className="font-zentry text-4xl font-extrabold leading-relaxed text-brand-valorant-second mb-6 tracking-wide">
              <span className="text-brand-valorant">5V5 3LA PC.</span> <br />
              Khasek tkoun mzyan f <span className="text-purple-500">l'aim</span>{" "}
              w <span className="text-teal-500">strategy</span>. 
              Ghadi t9dar tfahem w tchouf les meilleurs joueurs fi l'
              <span className="text-yellow-400">Maghrib</span>.
              <br /> 
              Dir l'effort f coordination m3a l'equipe dyalek w{" "}
              <span className="text-pink-500">3rf</span> tariq l'adversaire bash t'koun fi l'awwal fi kol duel.
            </p>
          </div>

          <div className="mask-clip-path absolute right-0 top-0 h-screen w-[500px] overflow-hidden z-10">
            <img
              src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/c30d7b14a6969df89073245b66eb702141299add-1920x1080.jpg"
              alt="Background"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-b from-transparent to-[#14141f]" />

    </div>
  );
};

export default About;