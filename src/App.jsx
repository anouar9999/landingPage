import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PassGamers from "./components/PassGamers";
import AdController from "./components/AdController";
import AdSpot from "./components/AdSpot";
import FooterAd from "./components/FooterAd";
import PopupAd from "./components/PopupAd";
import { AdProvider, useAds } from "./context/AdContext";

// Composant qui utilise le contexte pour les emplacements publicitaires
const AdSpots = () => {
  const { showAds } = useAds();
  
  return (
    <>
      {/* Bannière haut de page */}
      <AdSpot 
        position="absolute" 
        top="80px" 
        left="50%" 
        width="970px" 
        height="90px" 
        type="Top Banner"
        className="transform -translate-x-1/2"
        isVisible={showAds}
      />
      
      {/* Panneau latéral gauche */}
      <AdSpot 
        position="fixed" 
        top="50%" 
        left="20px" 
        width="160px" 
        height="600px" 
        type="Left Skyscraper"
        className="transform -translate-y-1/2"
        isVisible={showAds}
      />
      
      {/* Panneau latéral droit */}
      <AdSpot 
        position="fixed" 
        top="50%" 
        right="20px" 
        width="160px" 
        height="600px" 
        type="Right Skyscraper"
        className="transform -translate-y-1/2"
        isVisible={showAds}
      />
      
      {/* Rect après le hero */}
      <AdSpot 
        position="relative" 
        width="728px" 
        height="90px" 
        type="After Hero"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect après About */}
      <AdSpot 
        position="relative" 
        width="300px" 
        height="250px" 
        type="After About"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect après PassGamers */}
      <AdSpot 
        position="relative" 
        width="728px" 
        height="90px" 
        type="After PassGamers"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect après Tri9lGlory */}
      <AdSpot 
        position="relative" 
        width="300px" 
        height="250px" 
        type="After Tri9lGlory"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect après PrizePool */}
      <AdSpot 
        position="relative" 
        width="728px" 
        height="90px" 
        type="After PrizePool"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect après Contact */}
      <AdSpot 
        position="relative" 
        width="970px" 
        height="90px" 
        type="After Contact"
        className="mx-auto my-5"
        isVisible={showAds}
      />
      
      {/* Rect avant Footer */}
      <AdSpot 
        position="relative" 
        width="970px" 
        height="90px" 
        type="Before Footer"
        className="mx-auto my-5"
        isVisible={showAds}
      />
    </>
  );
};

// Composant pour un emplacement publicitaire individuel entre les sections
const SectionAdSpot = ({ type, width, height, className }) => {
  const { showAds } = useAds();
  
  return (
    <AdSpot 
      position="relative" 
      width={width} 
      height={height} 
      type={type}
      className={className}
      isVisible={showAds}
    />
  );
};

function AppContent() {
  const lenisRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour détecter si un modal est ouvert
  const checkModalState = () => {
    const modalOpenElements = document.querySelectorAll('.modal-open');
    setIsModalOpen(modalOpenElements.length > 0);
  };

  useEffect(() => {
    // Observer le DOM pour détecter quand des modaux sont ouverts/fermés
    const observer = new MutationObserver(() => {
      checkModalState();
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'], 
      childList: false, 
      subtree: false 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Link lenis to requestAnimationFrame
    function raf(time) {
      if (lenisRef.current && !isModalOpen) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup function to destroy Lenis instance when component unmounts
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [isModalOpen]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      
      {/* Emplacements publicitaires fixes */}
      <AdSpots />
      
      <Hero />
      {/* Séparateur subtil au lieu d'une bande visible */}
      <div className="w-full h-px bg-gray-300/10" />
      
      <SectionAdSpot 
        type="After Hero"
        width="728px"
        height="90px"
        className="mx-auto my-5"
      />
      
      <About />
      <div className="w-full h-px bg-gray-300/10" />
      
      <SectionAdSpot 
        type="After About"
        width="300px"
        height="250px"
        className="mx-auto my-5"
      />
      
      <PassGamers />
      <div className="w-full h-px bg-gray-300/10" />
      
      <SectionAdSpot 
        type="After PassGamers"
        width="728px"
        height="90px"
        className="mx-auto my-5"
      />
      
      <Tri9lGlory />

      <SectionAdSpot 
        type="After Tri9lGlory"
        width="300px"
        height="250px"
        className="mx-auto my-5"
      />

      {/* PrizePool Section */}
      <div style={{ marginBottom: "-2px" }}>
        <div className="relative">
          <PrizePool />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "150px",
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(10, 10, 10))",
              transform: "translateY(2px)",
            }}
          />
        </div>
      </div>

      <SectionAdSpot 
        type="After PrizePool"
        width="728px"
        height="90px"
        className="mx-auto my-5"
      />

      {/* Contact Section */}
      <div>
        <Contact />
      </div>

      <SectionAdSpot 
        type="After Contact"
        width="970px"
        height="90px"
        className="mx-auto my-5"
      />

      {/* Footer Ad Section */}
      <FooterAd />

      <Footer />
      
      {/* Popup publicitaire après délai */}
      <PopupAd />
      
      {/* Contrôleur des publicités */}
      <AdController />
    </main>
  );
}

// Composant App avec le provider
function App() {
  return (
    <AdProvider>
      <AppContent />
    </AdProvider>
  );
}

export default App;
