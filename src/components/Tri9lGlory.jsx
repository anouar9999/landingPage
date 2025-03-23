import { useRef, useState, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const BentoTilt = forwardRef(({ children, className = "" }, ref) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  // Combine les transformations si nécessaire
  const finalTransform = transformStyle 
    ? `${transformStyle} translateX(-20px)` 
    : "translateX(-20px)";

  return (
    <div
      ref={ref}
      className={"font-valorant " + className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: finalTransform,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
});

BentoTilt.displayName = "BentoTilt";

const Tri9lGlory = () => {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      },
    });

    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${300 + index * 200} center`,
          end: `top+=${400 + index * 200} center`,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <section
      id="Tri9Lglory"
      className="bg-brand-valorant-second min-h-screen relative"
      ref={sectionRef}
    >
      <div className="absolute top-0 pb-20 w-full h-32 bg-gradient-to-t from-transparent to-[#14141f]" />
      <div className="container mx-auto px-4 pt-9 md:px-10">
        <div className="px-4 md:px-5 pb-16 md:pb-32" ref={headerRef}>
          <h1 className="text-7xl md:text-8xl lg:text-8xl font-nightWarrior text-primary">
            TrI9 l glory
          </h1>
          <p className="max-w-md tracking-wide font-zentry text-lg md:text-2xl text-blue-50 opacity-50 mt-4">
            Had tri9 machi sahla, walakin fiha l'honneur w l'gloire. Ghadi
            tel3bo m3a ahsan les joueurs f lMaghrib, w twerriw lblad kamla chno
            3andkom.
          </p>
        </div>

        <main className="relative w-full pb-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <BentoTilt
              ref={(el) => (cardsRef.current[0] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className="mb-4 md:mb-6 block text-6xl md:text-8xl font-nightWarrior text-primary">
                  01
                </span>
                <p className="text-gray-300 text-base md:text-xl leading-relaxed">
                  L3ba tactique 3la PC, khasek tkoun mzian f l'aim w strategy.
                  Ghadi twa9ef ahsan les joueurs f lMaghrib f des duels.
                </p>
              </div>
            </BentoTilt>

            <BentoTilt
              ref={(el) => (cardsRef.current[1] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className="mb-4 md:mb-6 block text-6xl md:text-8xl font-nightWarrior text-primary">
                  02
                </span>
                <p className="text-gray-300 text-base md:text-xl leading-relaxed">
                  Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t
                  tdi3o hit les places mahdoudin.
                </p>
              </div>
            </BentoTilt>

            <BentoTilt
              ref={(el) => (cardsRef.current[2] = el)}
              className="w-full md:w-1/3 transform-gpu transition-transform duration-300"
            >
              <div className="group relative">
                <span className="mb-4 md:mb-6 block text-6xl md:text-8xl font-nightWarrior text-primary">
                  03
                </span>
                <p className="text-gray-300 text-base md:text-xl leading-relaxed">
                  Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t
                  tdi3o hit les places mahdoudin.
                </p>
              </div>
            </BentoTilt>
          </div>
        </main>
      </div>
      <div className="absolute bottom-0 w-full h-14 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
};

export default Tri9lGlory;
