import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Tri9lGlory from "./components/Tri9lGlory";
import PrizePool from "./components/PrizePool";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      
      <Hero />

      {/* About Section */}
      <div style={{ marginBottom: "-2px" }}>
        <div className="relative">
          <About />
          <div 
            className="absolute bottom-0 left-0 right-0" 
            style={{ 
              height: "150px",
              background: "linear-gradient(to bottom, rgba(20, 20, 31, 0), rgb(20, 20, 31))",
              transform: "translateY(2px)"
            }} 
          />
        </div>
      </div>

      {/* Tri9lGlory Section */}
      <div style={{ marginBottom: "-2px" }}>
        <div className="relative">
          <Tri9lGlory />
          <div 
            className="absolute bottom-0 left-0 right-0" 
            style={{ 
              height: "150px",
              background: "linear-gradient(to bottom, rgba(20, 20, 31, 0), rgb(0, 0, 0))",
              transform: "translateY(2px)"
            }} 
          />
        </div>
      </div>

      {/* PrizePool Section */}
      <div style={{ marginBottom: "-2px" }}>
        <div className="relative">
          <PrizePool />
          <div 
            className="absolute bottom-0 left-0 right-0" 
            style={{ 
              height: "150px",
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(10, 10, 10))",
              transform: "translateY(2px)"
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