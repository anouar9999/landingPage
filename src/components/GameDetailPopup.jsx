import { useEffect, useRef } from "react";
import { X, Trophy, Users, Calendar, Book, Sparkles, Gamepad2, Medal } from "lucide-react";
import gsap from "gsap";

// Informations des tournois par jeu
const tournamentInfo = {
  "Free fire": {
    format: "Battle Royale - Équipes de 4",
    description: "Affrontez les meilleurs joueurs du Maroc dans une compétition intense où stratégie d'équipe et skills individuels détermineront les vainqueurs. Chaque match est une nouvelle chance de prouver votre valeur!",
    requirements: [
      "Âge minimum: 16 ans",
      "Compte Free Fire niveau 40+",
      "Équipe de 4 joueurs + 1 remplaçant (optionnel)",
      "Résidence marocaine obligatoire"
    ],
    rounds: [
      { name: "Qualifications Online", date: "15-20 Juin 2025", description: "64 équipes s'affrontent en 8 groupes. Les 4 meilleures équipes de chaque groupe se qualifient pour la phase suivante." },
      { name: "Quarts de finale", date: "27-28 Juin 2025", description: "32 équipes réparties en 4 groupes. Format points sur 5 matchs. Top 4 de chaque groupe qualifié." },
      { name: "Demi-finales (LAN)", date: "4 Juillet 2025", description: "16 équipes en compétition sur scène au Morocco Gaming Expo. Les 8 meilleures équipes avancent à la finale." },
      { name: "Grande Finale (LAN)", date: "10 Juillet 2025", description: "8 équipes finalistes s'affrontent en 6 matchs sur différentes cartes pour le titre de champion national." }
    ],
    prizes: [
      { position: "1ère place", amount: "25 000 DH", extra: "+ Qualification directe pour la MENA Cup" },
      { position: "2ème place", amount: "15 000 DH", extra: "+ 4 Gaming Phones" },
      { position: "3ème place", amount: "8 000 DH", extra: "+ Équipement gaming" },
      { position: "4ème place", amount: "2 000 DH", extra: "" }
    ],
    rules: "• Chaque équipe doit avoir 4 joueurs titulaires et peut inclure 1 remplaçant optionnel.\n• Les joueurs doivent arriver 1h avant le début des matchs en phase LAN.\n• Utilisation de tout logiciel de triche = disqualification immédiate et bannissement des futures compétitions.\n• Streaming autorisé avec délai de 5 minutes minimum.",
    color: "from-orange-500 to-red-600",
    icon: "🔥"
  },
  "street \t fighter": {
    format: "1v1 Double Élimination",
    description: "Le tournoi Street Fighter rassemblera les meilleurs combattants du royaume dans une compétition de haut niveau. Que vous soyez un vétéran des jeux de combat ou un talent émergent, c'est l'occasion de montrer vos combos et votre maîtrise technique!",
    requirements: [
      "Âge minimum: 16 ans",
      "Apporter sa propre manette/stick arcade (PS5/PC)",
      "Connaissance du règlement EVO",
      "Résidence marocaine obligatoire"
    ],
    rounds: [
      { name: "Qualifications Online", date: "22-25 Juin 2025", description: "128 joueurs répartis en brackets online. Double élimination, matchs en FT2 (premier à 2 victoires)." },
      { name: "Phase Intermédiaire", date: "30 Juin 2025", description: "64 joueurs qualifiés continuent en double élimination. Matchs en FT2, diffusés en streaming officiel." },
      { name: "Top 32 (LAN)", date: "6 Juillet 2025", description: "32 joueurs s'affrontent en présentiel. Format FT3 pour le winner bracket, FT2 pour le loser bracket." },
      { name: "Top 8 (LAN)", date: "11 Juillet 2025", description: "La grande finale avec les 8 meilleurs joueurs. Format FT3, finale en FT5 sur la scène principale du MGE." }
    ],
    prizes: [
      { position: "1ère place", amount: "20 000 DH", extra: "+ Stick Arcade Pro édition limitée" },
      { position: "2ème place", amount: "10 000 DH", extra: "+ Fightstick premium" },
      { position: "3ème place", amount: "6 000 DH", extra: "+ Manette Pro" },
      { position: "4ème place", amount: "4 000 DH", extra: "" }
    ],
    rules: "• Tous les personnages et stages sont autorisés.\n• Temps par round: 99 secondes.\n• Pause non autorisée sauf urgence (validation par un arbitre obligatoire).\n• Les macros et turbo fonctions sont interdits.\n• En cas d'égalité, un match décisif sera joué.",
    color: "from-red-600 to-purple-700",
    icon: "👊"
  },
  "valorant": {
    format: "5v5 Double Élimination",
    description: "VALORANT MGE Championship est la compétition esport la plus prestigieuse du Maroc pour ce FPS tactique. Les équipes s'affronteront dans des matchs intenses où précision, stratégie et coordination seront les clés de la victoire!",
    requirements: [
      "Âge minimum: 16 ans",
      "Compte VALORANT rang minimum Diamant 1",
      "Équipe de 5 joueurs + 1 coach (optionnel)",
      "Anti-cheat obligatoire durant les qualifications",
      "Résidence marocaine obligatoire"
    ],
    rounds: [
      { name: "Open Qualifiers", date: "17-22 Juin 2025", description: "32 équipes en double élimination. Matchs en BO1 jusqu'aux quarts, puis BO3. Les 16 meilleures équipes se qualifient." },
      { name: "Closed Qualifiers", date: "29 Juin 2025", description: "16 équipes s'affrontent en BO3. Double élimination complète. Les 8 meilleures équipes avancent à la phase LAN." },
      { name: "Playoffs (LAN)", date: "5-6 Juillet 2025", description: "8 équipes en compétition au Morocco Gaming Expo. Double élimination en BO3, avec veto de cartes." },
      { name: "Grand Final (LAN)", date: "12 Juillet 2025", description: "Finale épique en BO5 sur la scène principale, avec show d'ouverture et analyse des experts." }
    ],
    prizes: [
      { position: "1ère place", amount: "50 000 DH", extra: "+ Invitation au VALORANT MENA Challengers" },
      { position: "2ème place", amount: "25 000 DH", extra: "+ Setup gaming complet pour l'équipe" },
      { position: "3ème place", amount: "15 000 DH", extra: "+ Périphériques gaming" },
      { position: "4ème place", amount: "10 000 DH", extra: "" }
    ],
    rules: "• Les équipes doivent arriver 90 minutes avant leur match en LAN.\n• Les joueurs doivent utiliser leurs propres périphériques (clavier, souris, tapis, écouteurs).\n• PC et écrans fournis par l'organisation.\n• Communication vocale surveillée durant les matchs LAN.\n• Pause technique limitée à 10 minutes par équipe et par match.",
    color: "from-red-500 to-blue-700",
    icon: "🎯"
  },
  "fc football": {
    format: "1v1 Swiss System + Playoffs",
    description: "Le FC Championship est LA référence des tournois de simulation de football au Maroc. Montrez votre maîtrise tactique, votre talent technique et votre sang-froid pour être couronné champion national!",
    requirements: [
      "Âge minimum: 16 ans",
      "Posséder le jeu sur PlayStation 5 ou Xbox Series X",
      "Apporter sa propre manette",
      "Résidence marocaine obligatoire"
    ],
    rounds: [
      { name: "Swiss Stage", date: "20-24 Juin 2025", description: "64 joueurs en système suisse sur 5 rondes. Chaque joueur affronte des adversaires ayant un score similaire. Les 16 meilleurs au classement avancent." },
      { name: "Top 16 (Bracket)", date: "1-2 Juillet 2025", description: "Élimination directe en BO3 (meilleur des 3 matchs). Les 8 gagnants se qualifient pour la phase LAN." },
      { name: "Quarts & Demi-finales (LAN)", date: "7-8 Juillet 2025", description: "Matchs à élimination directe en BO3 sur la scène secondaire du MGE, avec commentaires en direct." },
      { name: "Finale (LAN)", date: "13 Juillet 2025", description: "Grande finale en BO5 sur la scène principale. Une cérémonie spéciale et des invités surprises seront présents!" }
    ],
    prizes: [
      { position: "1ère place", amount: "30 000 DH", extra: "+ PS5 Pro + Qualification pour la eWorld Cup Qualifiers" },
      { position: "2ème place", amount: "15 000 DH", extra: "+ Manettes pro premium" },
      { position: "3ème place", amount: "10 000 DH", extra: "+ Abonnement Game Pass 1 an" },
      { position: "4ème place", amount: "5 000 DH", extra: "" }
    ],
    rules: "• Tous les clubs et équipes nationales sont autorisés.\n• Les transferts personnalisés sont interdits, seuls les effectifs officiels peuvent être utilisés.\n• Durée des mi-temps: 6 minutes.\n• En phase LAN, les joueurs doivent rester assis jusqu'à la fin du match.\n• Les célébrations prolongées et comportements antisportifs peuvent entraîner des sanctions.",
    color: "from-green-500 to-blue-600",
    icon: "⚽"
  }
};

const GameDetailPopup = ({ isOpen, onClose, game }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  
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
      
      // Animation des éléments internes
      if (progressRef.current) {
        gsap.fromTo(progressRef.current.children,
          {
            width: 0
          },
          {
            width: "100%",
            duration: 0.8,
            stagger: 0.2,
            delay: 0.5,
            ease: "power2.inOut"
          }
        );
      }
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
    description: "Détails à venir prochainement.",
    requirements: [],
    rounds: [],
    prizes: [],
    prize: "À déterminer",
    rules: "Règles à venir",
    color: "from-blue-500 to-purple-500",
    icon: "🎮"
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 opacity-0"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-[#0a0a14] border border-primary/30 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec image et titre */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <div className={`absolute inset-0 bg-gradient-to-br ${gameInfo.color} opacity-20`}></div>
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a14]"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <img 
                  src={game.game} 
                  alt={`${game.name} logo`}
                  className="h-20 relative z-10 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <span className="text-xs text-primary font-valorant uppercase tracking-wider">MGE Championship 2025</span>
                <h2 className={`${game.fontClass || "font-nightWarrior"} text-4xl text-white uppercase flex items-center gap-2`}>
                  {game.name} <span className="text-2xl">{gameInfo.icon}</span>
                </h2>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/40 hover:bg-primary/30 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Contenu */}
        <div className="p-6">
          {/* Description et format du tournoi */}
          <div className="mb-8 bg-black/30 p-5 rounded-lg backdrop-blur-sm border-l-4 border-primary">
            <p className="text-white/90 italic leading-relaxed">{gameInfo.description}</p>
            
            <div className="mt-4 flex items-center gap-2">
              <Gamepad2 size={18} className="text-primary" />
              <span className="text-primary font-valorant text-sm uppercase">Format:</span>
              <span className="text-white/90">{gameInfo.format}</span>
            </div>
          </div>
          
          {/* Progress bar de progression du tournoi */}
          <div className="mb-8" ref={progressRef}>
            <h3 className="text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Progression du tournoi
            </h3>
            
            {/* Barre de progression */}
            <div className="relative h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
              <div className={`h-full ${gameInfo.color} rounded-full w-0`}></div>
            </div>
            
            {/* Timeline des étapes */}
            <div className="relative ml-4">
              {/* Ligne verticale */}
              <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
              
              {/* Étapes */}
              {gameInfo.rounds.map((round, index) => (
                <div key={index} className="relative pl-10 pb-10">
                  {/* Point sur la timeline */}
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-[#0a0a14] border-2 border-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  
                  {/* Contenu de l'étape */}
                  <div className="bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-white/10 hover:border-primary/30 transition-colors group">
                    <h4 className="font-valorant text-white text-md uppercase group-hover:text-primary transition-colors flex items-center gap-2">
                      <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-primary to-primary/60 text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      {round.name}
                    </h4>
                    <p className="text-primary/80 text-sm mt-2 flex items-center gap-1">
                      <Calendar size={14} /> {round.date}
                    </p>
                    <p className="text-white/70 mt-3">{round.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Section des prix */}
          <div className="mb-8">
            <h3 className="text-primary font-valorant text-lg uppercase mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5" /> Prize Pool
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gameInfo.prizes && gameInfo.prizes.map((prize, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-lg p-4 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className={`absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 rounded-full bg-gradient-to-br ${index === 0 ? 'from-yellow-400 to-amber-600' : index === 1 ? 'from-gray-300 to-gray-500' : index === 2 ? 'from-amber-700 to-amber-900' : 'from-blue-400 to-blue-600'} opacity-50`}></div>
                  
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : index === 1 ? 'bg-gray-500/20 text-gray-300' : index === 2 ? 'bg-amber-800/20 text-amber-700' : 'bg-blue-600/20 text-blue-400'}`}>
                      <Medal size={index === 0 ? 22 : 18} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{prize.position}</p>
                      <p className="text-white text-xl font-nightWarrior mt-1">{prize.amount}</p>
                      {prize.extra && (
                        <p className="text-primary/80 text-xs mt-2">{prize.extra}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Conditions et règles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Conditions de participation */}
            <div className="bg-black/20 backdrop-blur-sm p-5 rounded-lg border border-white/10">
              <h3 className="text-primary font-valorant text-lg uppercase mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" /> Conditions de participation
              </h3>
              <ul className="space-y-2">
                {gameInfo.requirements && gameInfo.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Règlement */}
            <div className="bg-black/20 backdrop-blur-sm p-5 rounded-lg border border-white/10">
              <h3 className="text-primary font-valorant text-lg uppercase mb-3 flex items-center gap-2">
                <Book className="h-5 w-5" /> Règlement
              </h3>
              <div className="text-white/80 whitespace-pre-line">{gameInfo.rules}</div>
            </div>
          </div>
          
          {/* Bouton d'inscription */}
          <div className="mt-10 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-primary opacity-70 blur-lg group-hover:opacity-100 transition-all duration-300"></div>
              <a 
                href="http://109.120.179.6:3001/auth/auth1/login"
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-valorant px-8 py-3 uppercase transition-colors rounded-lg"
              >
                <Sparkles size={18} />
                S'inscrire au tournoi
              </a>
            </div>
            <p className="text-white/50 text-sm mt-3">Date limite d'inscription: 10 juin 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPopup; 