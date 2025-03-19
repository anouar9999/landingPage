import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionContainer = ({ children, className = '' }) => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Create overlay animation
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {children}
      {/* Overlay for transition */}
      <div 
        ref={overlayRef}
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95))',
          opacity: 0,
          zIndex: 40
        }}
      />
    </div>
  );
};

export default SectionContainer;