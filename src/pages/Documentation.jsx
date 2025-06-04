import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';
import DownloadZone from '../components/DownloadZone';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, File, Download, ExternalLink, FileText, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const Documentation = () => {
  const { t, language, getTextClass, isTamazight } = useTranslation();
  const sectionRef = useRef(null);
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
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

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
              <span className={getTextClass()}>Retour à l'accueil</span>
            </Link>
            
            <h1 className={`hero-title text-4xl md:text-5xl lg:text-6xl font-nightWarrior text-primary mb-6 ${isTamazight ? 'tamazight-text' : ''}`}>
              {t('documentationCenter.title', 'Centre de Documentation')}
            </h1>
            
            <p className={`hero-description max-w-3xl text-white/80 text-lg mb-12 ${getTextClass()}`}>
              {t('documentationCenter.description', "Accédez à notre centre de documentation complet pour télécharger les règlements officiels, guides participant et tickets d'or pour les concours.")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="hero-card bg-gradient-to-br from-[#111122] to-[#0c0c18] p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
                <Book size={36} className="text-primary mb-4" />
                <h3 className={`text-white text-xl font-bold mb-2 ${getTextClass()}`}>Règlements</h3>
                <p className={`text-white/60 text-sm mb-4 ${getTextClass()}`}>Téléchargez les règlements officiels de nos compétitions</p>
                <a 
                  href="#reglements" 
                  className="mt-auto inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                >
                  <span className={getTextClass()}>Voir les documents</span>
                  <Download size={16} />
                </a>
              </div>
              
              <div className="hero-card bg-gradient-to-br from-[#111122] to-[#0c0c18] p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
                <FileText size={36} className="text-primary mb-4" />
                <h3 className={`text-white text-xl font-bold mb-2 ${getTextClass()}`}>Guides</h3>
                <p className={`text-white/60 text-sm mb-4 ${getTextClass()}`}>Consultez nos guides pratiques pour bien vous préparer</p>
                <a 
                  href="#guides" 
                  className="mt-auto inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                >
                  <span className={getTextClass()}>Voir les guides</span>
                  <Download size={16} />
                </a>
              </div>
              
              <div className="hero-card bg-gradient-to-br from-[#111122] to-[#0c0c18] p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
                <File size={36} className="text-primary mb-4" />
                <h3 className={`text-white text-xl font-bold mb-2 ${getTextClass()}`}>Ressources</h3>
                <p className={`text-white/60 text-sm mb-4 ${getTextClass()}`}>Accédez aux ressources médias et modèles officiels</p>
                <a 
                  href="#ressources" 
                  className="mt-auto inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                >
                  <span className={getTextClass()}>Voir les ressources</span>
                  <Download size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Documentation en ligne */}
      <div className="py-16 bg-[#0a0a14]" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-nightWarrior text-primary mb-3 ${isTamazight ? 'tamazight-text' : ''}`}>
              Documentation en ligne
            </h2>
            <p className={`text-white/80 max-w-2xl mx-auto ${getTextClass()}`}>
              Consultez notre documentation en ligne pour accéder à l'ensemble des informations sur les compétitions
            </p>
          </div>
          
          <div className="bg-black/30 border border-primary/20 rounded-lg p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className={`text-2xl font-bold text-white mb-3 ${getTextClass()}`}>Documentation interactive</h3>
                <p className={`text-white/70 max-w-xl mb-4 ${getTextClass()}`}>
                  Notre plateforme de documentation en ligne contient l'ensemble des informations, tutoriels et ressources pour vous aider à participer aux compétitions GAMIUS.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className={`text-white/80 ${getTextClass()}`}>Tutoriels interactifs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className={`text-white/80 ${getTextClass()}`}>FAQ détaillée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className={`text-white/80 ${getTextClass()}`}>Mises à jour régulières</span>
                  </div>
                </div>
                <a
                  href="https://docs.gamiusgroup.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black py-2.5 px-5 rounded-lg transition-all duration-300"
                >
                  <span className={`font-bold ${getTextClass()}`}>Accéder à la documentation</span>
                  <ExternalLink size={16} />
                </a>
              </div>
              
              <div className="w-full md:w-auto flex items-center justify-center">
                <img 
                  src="/img/documentation-preview.jpg" 
                  alt="Documentation Preview" 
                  className="max-w-sm rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23111122'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' fill='%23d7c6af' dominant-baseline='middle'%3EDocumentation%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Intégration du composant DownloadZone */}
      <div id="downloads-section">
        <DownloadZone initialFilter={initialFilter} />
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation; 