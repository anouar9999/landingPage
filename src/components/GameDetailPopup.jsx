import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

// Informations des tournois par jeu
const tournamentInfo = {
  "Free fire": {
    format: "Battle Royale - Équipes de 4",
    rounds: [
      { name: "Qualifications", date: "15-20 Juin 2025", description: "64 équipes s'affrontent en ligne" },
      { name: "Quarts de finale", date: "27-28 Juin 2025", description: "32 équipes qualifiées" },
      { name: "Demi-finales", date: "4 Juillet 2025", description: "16 équipes s'affrontent en LAN" },
      { name: "Finale", date: "10 Juillet 2025", description: "8 équipes finalistes" }
    ],
    prize: "50 000 DH",
    rules: "Chaque équipe doit compter 4 joueurs + 1 remplaçant. Les joueurs doivent être âgés de plus de 16 ans."
  },
  "street \t fighter": {
    format: "1v1 Double Élimination",
    rounds: [
      { name: "Qualifications", date: "22-25 Juin 2025", description: "128 joueurs en brackets online" },
      { name: "Tier 2", date: "30 Juin 2025", description: "64 joueurs qualifiés" },
      { name: "Tier 1", date: "6 Juillet 2025", description: "32 joueurs en LAN" },
      { name: "Finale", date: "11 Juillet 2025", description: "8 finalistes" }
    ],
    prize: "40 000 DH",
    rules: "Tournoi individuel, format FT3 (First To 3) jusqu'aux quarts, puis FT5."
  },
  "valorant": {
    format: "5v5 Double Élimination",
    rounds: [
      { name: "Open Qualifiers", date: "17-22 Juin 2025", description: "32 équipes s'affrontent en ligne" },
      { name: "Closed Qualifiers", date: "29 Juin 2025", description: "16 équipes qualifiées" },
      { name: "Playoffs", date: "5 Juillet 2025", description: "8 équipes en LAN" },
      { name: "Grand Finale", date: "12 Juillet 2025", description: "Match en BO5" }
    ],
    prize: "100 000 DH",
    rules: "Les équipes doivent compter 5 joueurs + 1 coach. Tous les matchs se jouent en BO3 sauf la finale (BO5)."
  },
  "fc football": {
    format: "1v1 Swiss System + Playoffs",
    rounds: [
      { name: "Swiss Stage", date: "20-24 Juin 2025", description: "64 joueurs, 5 rondes" },
      { name: "Top 16", date: "1 Juillet 2025", description: "Élimination directe" },
      { name: "Quarts et Demi", date: "7 Juillet 2025", description: "En LAN" },
      { name: "Finale", date: "13 Juillet 2025", description: "Match en BO5" }
    ],
    prize: "60 000 DH",
    rules: "Les joueurs doivent venir avec leur propre manette. Les packs d'équipes sont standardisés pour tous les participants."
  }
};

const GameDetailPopup = ({ isOpen, onClose, game }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  // Animation à l'ouverture et fermeture
  useEffect(() => {
    if (isOpen && contentRef.current && overlayRef.current) {
      // Animation d'entrée
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
      });
      
      gsap.fromTo(contentRef.current, 
        { 
          y: 50,
          scale: 0.95,
          opacity: 0
        }, 
        { 
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.1
        }
      );
    }
  }, [isOpen]);

  // Gestion de la fermeture avec animation
  const handleClose = () => {
    if (contentRef.current && overlayRef.current) {
      gsap.to(contentRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in"
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  // Si popup fermé ou pas de jeu sélectionné
  if (!isOpen || !game) return null;
  
  // Récupérer les infos du tournoi pour ce jeu
  const gameInfo = tournamentInfo[game.name] || {
    format: "Information non disponible",
    rounds: [],
    prize: "À déterminer",
    rules: "Règles à venir"
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-[#0a0a14] border border-primary/30 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec image et titre */}
        <div className="relative h-40 overflow-hidden rounded-t-lg">
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a14]"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={game.game} 
                alt={`${game.name} logo`}
                className="h-16 object-contain"
              />
              <h2 className={`${game.fontClass || "font-nightWarrior"} text-3xl text-white uppercase`}>
                {game.name}
              </h2>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Contenu */}
        <div className="p-6">
          {/* Format du tournoi */}
          <div className="mb-6">
            <h3 className="text-primary font-valorant text-lg uppercase mb-2">Format du Tournoi</h3>
            <p className="text-white/90">{gameInfo.format}</p>
          </div>
          
          {/* Timeline des étapes */}
          <div className="mb-8">
            <h3 className="text-primary font-valorant text-lg uppercase mb-4">Déroulement</h3>
            
            <div className="relative ml-4">
              {/* Ligne verticale */}
              <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
              
              {/* Étapes */}
              {gameInfo.rounds.map((round, index) => (
                <div key={index} className="relative pl-10 pb-8">
                  {/* Point sur la timeline */}
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-[#0a0a14] border-2 border-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  
                  {/* Contenu de l'étape */}
                  <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/30 transition-colors group">
                    <h4 className="font-valorant text-white text-md uppercase group-hover:text-primary transition-colors">
                      {round.name}
                    </h4>
                    <p className="text-primary/80 text-sm mt-1">{round.date}</p>
                    <p className="text-white/70 mt-2">{round.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Prix et règles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <h3 className="text-primary font-valorant text-lg uppercase mb-2">Prize Pool</h3>
              <p className="text-white text-2xl font-nightWarrior">{gameInfo.prize}</p>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <h3 className="text-primary font-valorant text-lg uppercase mb-2">Règlement</h3>
              <p className="text-white/90">{gameInfo.rules}</p>
            </div>
          </div>
          
          {/* Bouton d'inscription */}
          <div className="mt-8 text-center">
            <a 
              href="http://109.120.179.6:3001/auth/auth1/login"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-valorant px-8 py-3 uppercase transition-colors"
            >
              S'inscrire maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPopup; 