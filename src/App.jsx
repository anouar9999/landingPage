import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const lenisRef = useRef();

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
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup function to destroy Lenis instance when component unmounts
      lenisRef.current.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />

      <Hero />
      <About />
      <Tri9lGlory />

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

      {/* Contact Section */}
      <div>
        <Contact />
      </div>

      <Footer />
    </main>
  );
}

export default App;
