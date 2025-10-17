import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';
import DownloadZone from '../components/DownloadZone';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const Documentation = () => {
  const { t, language, getTextClass, isTamazight } = useTranslation();
  const heroRef = useRef(null);
  const [initialFilter, setInitialFilter] = useState(null);

  // Extraire le filtre des paramètres d'URL s'il existe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      setInitialFilter(filterParam);
      
      // Faire défiler vers la section de téléchargement après un court délai
      setTimeout(() => {
        const downloadsSection = document.getElementById('downloads');
        if (downloadsSection) {
          downloadsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // Animation au chargement de la page
  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        heroRef.current.querySelector('.hero-title'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      
      tl.fromTo(
        heroRef.current.querySelector('.hero-description'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.4"
      );
      
      tl.fromTo(
        heroRef.current.querySelectorAll('.hero-card'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
        "-=0.2"
      );
    }
  }, []);

  useEffect(() => {
    // Défiler vers le haut quand la page est chargée
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      
      {/* Hero section */}
      <div 
        ref={heroRef}
        className="pt-32 pb-16 bg-gradient-to-b from-[#0a0a14] to-[#0c0c18] border-b border-primary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Link 
              to="/"
              className="flex items-center gap-1 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className={getTextClass()}>{t('documentationCenter.backHome')}</span>
            </Link>
            
            <h1 className={`hero-title text-4xl md:text-5xl lg:text-6xl font-nightWarrior text-primary mb-6 ${isTamazight ? 'tamazight-text' : ''}`}>
              {t('documentationCenter.title', 'Centre de Documentation')}
            </h1>
            
            <p className={`hero-description max-w-3xl text-white/80 text-lg mb-12 ${getTextClass()}`}>
              {t('documentationCenter.description', "Accédez à notre centre de documentation complet pour télécharger les règlements officiels, guides participant et tickets d'or pour les concours.")}
            </p>
            
            <div className="flex justify-center w-full max-w-4xl">
              <Link to="/guides" className="hero-card bg-gradient-to-br from-[#111122] to-[#0c0c18] p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center w-full max-w-md hover:scale-105 transform">
                <FileText size={48} className="text-primary mb-4" />
                <h3 className={`text-white text-2xl font-bold mb-3 ${getTextClass()}`}>{t('documentationCenter.cards.strategyGuides')}</h3>
                <p className={`text-white/60 text-base mb-6 ${getTextClass()}`}>{t('documentationCenter.cards.guidesDesc')}</p>
                <div className="mt-auto inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  <span className={getTextClass()}>{t('documentationCenter.downloadZone.viewGuides')}</span>
                  <ArrowLeft size={16} className="rotate-180" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Intégration du composant DownloadZone */}
      {/* <div id="downloads-section">
        <DownloadZone initialFilter={initialFilter} />
      </div> */}
      
      <Footer />
    </>
  );
};

export default Documentation; 