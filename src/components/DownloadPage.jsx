import React, { useRef, useEffect, useState } from 'react';
import { Download, FileText, Image, Gamepad, Filter, Search, ExternalLink, Trophy, Award, FileArchive } from 'lucide-react';
import gsap from 'gsap';
import DownloadZone from './DownloadZone';
import NavBar from './Navbar';
import Footer from './Footer';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const DownloadPage = () => {
  // Utiliser le hook de traduction
  const { t, isRtl, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState('all');
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  
  // Catégories principales avec traductions
  const tabs = [
    { id: 'all', name: t('downloadZone.tabs.all'), icon: <FileArchive size={18} /> },
    { id: 'rules', name: t('downloadZone.tabs.rules'), icon: <FileText size={18} /> },
    { id: 'guides', name: t('downloadZone.tabs.guides'), icon: <Gamepad size={18} /> },
  ];
  
  // Documents mis en avant avec traductions
  const featuredDocuments = [
    {
      id: 'rulebook',
      title: t('downloadZone.documents.rulebook.title'),
      description: t('downloadZone.documents.rulebook.description'),
      category: 'rules',
      icon: <FileText size={40} className="text-yellow-500" />,
      downloadUrl: '#',
      isNew: true
    },
    {
      id: 'participation-guide',
      title: t('downloadZone.documents.participationGuide.title'),
      description: t('downloadZone.documents.participationGuide.description'),
      category: 'guides',
      icon: <Gamepad size={40} className="text-yellow-500" />,
      downloadUrl: '#'
    }
  ];
  
  // Filtrage des documents mis en avant
  const filteredDocuments = activeTab === 'all' 
    ? featuredDocuments 
    : featuredDocuments.filter(doc => doc.category === activeTab);
  
  // Animation de la page
  useEffect(() => {
    if (heroRef.current && titleRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      
      tl.fromTo(
        ".tab-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );
      
      tl.fromTo(
        ".featured-doc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
    }
  }, []);
  
  // Animation lors du changement d'onglet
  useEffect(() => {
    gsap.fromTo(
      ".featured-doc",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);
  
  // Gestion du téléchargement
  const handleDownload = (document) => {
    console.log(`Téléchargement: ${document.title}`);
    window.open(document.downloadUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]" dir={isRtl ? 'rtl' : 'ltr'}>
      <NavBar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative pt-48 pb-16 bg-gradient-to-b from-[#101022] to-[#0a0a14]"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-500/5 rounded-full filter blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-yellow-500/5 rounded-full filter blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={titleRef} className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-nightWarrior text-yellow-500 mb-4">
              {t('downloadZone.title')}
            </h1>
            <p className="text-white/80 text-xl">
              {t('downloadZone.subtitle')}
            </p>
          </div>
          
          {/* Tabs de navigation */}
          <div className="flex justify-center mt-12 mb-8 overflow-x-auto pb-4 space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-item flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-black/30 text-white hover:bg-black/50 border border-yellow-500/20'
                  }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          
          {/* Documents mis en avant */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="featured-doc bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/10 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-black/30 rounded-lg">{doc.icon}</div>
                    {doc.isNew && (
                      <span className="bg-yellow-500 text-black text-xs font-bold py-1 px-2 rounded">{t('downloadZone.new')}</span>
                    )}
                  </div>
                  
                  <h3 className="text-white text-xl font-bold mb-2">{doc.title}</h3>
                  <p className="text-white/70 mb-6">{doc.description}</p>
                  
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center justify-center gap-2 w-full bg-yellow-500/90 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded transition-all duration-300"
                  >
                    <Download size={18} />
                    <span>{t('downloadZone.downloadButton')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Inclusion du composant DownloadZone existant */}
      {/* <div className="bg-[#080810]">
        <DownloadZone />
      </div> */}
      
      {/* Bannière "Besoin d'aide" */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('downloadZone.helpBanner.title')}</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-6">
            {t('downloadZone.helpBanner.description')}
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            <span>{t('downloadZone.helpBanner.contactButton')}</span>
            <ExternalLink size={18} />
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DownloadPage; 