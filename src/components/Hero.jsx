import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Hero.scss';
import { FaAngleDown } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import HeroAdOverlay from './HeroAdOverlay';
import { useAdContext } from '../contexts/AdContext';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const { adsVisible } = useAdContext();
  const videoRef = useRef(null);

  useEffect(() => {
    // Gestion du chargement de la vidéo
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleLoadedData = () => {
        console.log("✅ Vidéo chargée avec succès");
        setIsLoaded(true);
      };
      
      const handleError = (error) => {
        console.error("❌ Erreur de chargement de la vidéo:", error);
        setLoadError(true);
        setIsLoaded(true); // Considérer comme "chargé" pour afficher le fallback
      };
      
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      
      // Timeout de sécurité - arrêter le chargement après 3 secondes
      const timeoutId = setTimeout(() => {
        if (!isLoaded) {
          console.warn("⚠️ Timeout de chargement de la vidéo");
          setLoadError(true);
          setIsLoaded(true);
        }
      }, 3000);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
        clearTimeout(timeoutId);
      };
    }
  }, [isLoaded]);

  // Générer l'URL de la vidéo
  const videoSrc = '/videos/hero-1.mp4';
  const fallbackImageSrc = '/img/hero-fallback.jpg';

  return (
    <section className="hero-section" id="hero">
      <div className="hero-background">
        {!loadError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={isLoaded ? 'visible' : 'hidden'}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="fallback-background">
            {fallbackImageSrc && <img src={fallbackImageSrc} alt="Morocco Gaming Expo" />}
            <div className="fallback-overlay"></div>
          </div>
        )}
      </div>

      <CSSTransition
        in={isLoaded}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <div className="hero-content">
          <div className="hero-text-container">
            <h1>MOROCCO GAMING EXPO</h1>
            <p>Le premier événement gaming du Maroc</p>
            <div className="hero-buttons">
              <ScrollLink 
                to="about" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="btn-primary"
              >
                Découvrir
              </ScrollLink>
              <a 
                href="https://ticket.mge.ma/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Acheter des billets
              </a>
            </div>
          </div>
          
          <div className="scroll-indicator">
            <ScrollLink 
              to="about" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="scroll-down"
            >
              <div className="scroll-text">Scroll</div>
              <div className="scroll-icon"><FaAngleDown /></div>
            </ScrollLink>
          </div>

          {/* Ad Overlay */}
          {adsVisible && <HeroAdOverlay />}
        </div>
      </CSSTransition>

      {/* Loader */}
      {!isLoaded && (
        <div className="hero-loader">
          <div className="loader-spinner"></div>
          <p>Chargement...</p>
        </div>
      )}
    </section>
  );
};

export default Hero;
