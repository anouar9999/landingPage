import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass, color, isAboutTitle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass, color, isAboutTitle && "about-animated-title")}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className={clsx(
            "flex-center max-w-full flex-wrap gap-2 px-4 sm:px-6 md:px-10 md:gap-3",
            isAboutTitle && "about-title-line"
          )}
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className={clsx(
                "animated-word",
                isAboutTitle && "about-animated-word"
              )}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
