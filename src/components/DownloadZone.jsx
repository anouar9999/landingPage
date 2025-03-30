import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Image, Gamepad, Filter, Search, ExternalLink, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const DownloadZone = ({ initialFilter = null }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  
  // Appliquer le filtre initial s'il est fourni
  useEffect(() => {
    if (initialFilter) {
      // Mapper les filtres d'URL vers les catégories
      const filterMap = {
        'rules': 'rules',
        'guides': 'guides',
        'media': 'media',
        'calendar': 'guides' // Rediriger calendar vers guides pour l'instant
      };
      
      const categoryToActivate = filterMap[initialFilter] || 'all';
      setActiveCategory(categoryToActivate);
      
      // Mettre en évidence visuellement le bouton de filtre correspondant
      setTimeout(() => {
        const filterButton = document.querySelector(`button[data-filter="${categoryToActivate}"]`);
        if (filterButton) {
          gsap.to(filterButton, {
            scale: 1.05,
            backgroundColor: 'rgba(215, 198, 175, 0.3)',
            duration: 0.3,
            yoyo: true,
            repeat: 2
          });
        }
      }, 800);
    }
  }, [initialFilter]);
  
  // Catégories de ressources
  const categories = [
    { id: 'all', name: 'Tous', icon: <Filter size={16} /> },
    { id: 'rules', name: 'Règlements', icon: <FileText size={16} /> },
    { id: 'guides', name: 'Guides', icon: <Gamepad size={16} /> },
    { id: 'media', name: 'Médias', icon: <Image size={16} /> }
  ];
  
  // Données des ressources téléchargeables
  const resources = [
    {
      id: 1,
      title: "Règlement Officiel MGE 2025",
      description: "Règlement général des compétitions du Morocco Gaming Expo 2025",
      type: "PDF",
      category: "rules",
      size: "2.4 MB",
      date: "01/03/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/rule-thumbnail.jpg"
    },
    {
      id: 2,
      title: "Règles Spécifiques Free Fire",
      description: "Format détaillé, points et classement pour le tournoi Free Fire",
      type: "PDF",
      category: "rules",
      size: "1.8 MB",
      date: "05/03/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/free-fire-rules.jpg"
    },
    {
      id: 3,
      title: "Guide d'Inscription aux Tournois",
      description: "Tutoriel pas-à-pas pour s'inscrire aux tournois et valider son équipe",
      type: "PDF",
      category: "guides",
      size: "3.5 MB",
      date: "15/02/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/guide-thumbnail.jpg"
    },
    {
      id: 4,
      title: "Checklist Préparation Tournoi",
      description: "Liste des éléments à préparer avant votre participation",
      type: "PDF",
      category: "guides",
      size: "1.2 MB",
      date: "10/03/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/checklist-thumbnail.jpg"
    },
    {
      id: 5,
      title: "Pack Logos MGE 2025",
      description: "Logos officiels en haute résolution pour les créateurs de contenu",
      type: "ZIP",
      category: "media",
      size: "15.6 MB",
      date: "01/01/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/logos-thumbnail.jpg"
    },
    {
      id: 6,
      title: "Fond d'écran MGE 2025",
      description: "Collection de fonds d'écran officiels pour PC et mobile",
      type: "ZIP",
      category: "media",
      size: "28.2 MB",
      date: "20/02/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/wallpaper-thumbnail.jpg"
    },
    {
      id: 7,
      title: "Planning des Tournois",
      description: "Calendrier détaillé de tous les tournois et événements",
      type: "PDF",
      category: "guides",
      size: "1.5 MB",
      date: "15/03/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/calendar-thumbnail.jpg"
    },
    {
      id: 8,
      title: "Guide Technique Setup PC",
      description: "Recommandations et configurations PC pour les tournois",
      type: "PDF",
      category: "guides",
      size: "4.2 MB",
      date: "05/02/2025",
      downloadUrl: "#",
      thumbnailUrl: "/img/setup-thumbnail.jpg"
    }
  ];
  
  // Filtrer les ressources en fonction de la catégorie et du terme de recherche
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Animation de la section
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);
  
  // Animation des filtres et de la grille lors des changements
  useEffect(() => {
    if (gridRef.current) {
      // Animation de sortie
      gsap.to(gridRef.current.children, {
        opacity: 0,
        y: 10,
        stagger: 0.03,
        duration: 0.2,
        onComplete: () => {
          // Animation d'entrée après le changement de filtre
          gsap.fromTo(
            gridRef.current.children,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.05, 
              duration: 0.3, 
              delay: 0.1,
              ease: "power2.out" 
            }
          );
        }
      });
    }
  }, [activeCategory, searchTerm]);
  
  // Téléchargement avec suivi analytics (simulé)
  const handleDownload = (resource) => {
    console.log(`Téléchargement: ${resource.title}`);
    // Ici, vous pourriez implémenter un suivi analytics
    window.open(resource.downloadUrl, '_blank');
  };
  
  return (
    <div id="downloads" className="py-16 bg-[#0a0a14]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-nightWarrior text-primary mb-3">Zone de Téléchargement</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Téléchargez les règlements, guides et ressources pour préparer votre participation aux tournois MGE
          </p>
        </div>
        
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                data-filter={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 
                  ${activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto min-w-[240px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-black/20 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none text-white placeholder-white/50"
            />
          </div>
        </div>
        
        {/* Grille des ressources */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-10">
            <Download size={48} className="mx-auto text-white/30 mb-4" />
            <p className="text-white/70 text-lg">Aucune ressource ne correspond à votre recherche</p>
            <p className="text-white/50 mt-2">Essayez un autre terme ou catégorie</p>
          </div>
        ) : (
          <div 
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-black/30 border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 group"
              >
                {/* Thumbnail */}
                <div className="h-36 overflow-hidden relative">
                  <img 
                    src={resource.thumbnailUrl} 
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23111122'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' fill='%23d7c6af' dominant-baseline='middle'%3E${resource.type}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  
                  {/* Type badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-primary text-xs font-bold py-1 px-2 rounded backdrop-blur-sm">
                    {resource.type}
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute bottom-2 left-2 bg-primary/80 text-black text-xs font-medium py-1 px-2 rounded-full backdrop-blur-sm">
                    {categories.find(cat => cat.id === resource.category)?.name || 'Autre'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{resource.title}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{resource.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                    <span>Taille: {resource.size}</span>
                    <span>Mis à jour: {resource.date}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-primary/80 text-white py-2 px-4 rounded transition-all duration-300 group-hover:bg-primary/70"
                  >
                    <Download size={16} />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Bannière d'aide */}
        <div className="mt-12 mb-12 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">Besoin d'aide avec les documents ?</h3>
              <p className="text-white/70">
                Si vous avez des questions concernant les documents ou besoin d'assistance, notre équipe est là pour vous aider.
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-2.5 px-5 rounded-lg transition-all duration-300"
              >
                <span>Contactez-nous</span>
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Lien externe vers plus de ressources */}
        <div className="mt-12 text-center">
          <a 
            href="https://docs.moroccogamingexpo.ma" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-primary/80 text-white py-2 px-6 rounded-full transition-all duration-300"
          >
            <span>Accéder à la Documentation Complète</span>
            <ExternalLink size={16} />
          </a>
          <p className="text-white/50 text-sm mt-2">
            Consultez notre centre de documentation pour des tutoriels et ressources additionnelles
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadZone; 