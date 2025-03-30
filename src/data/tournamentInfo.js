// Informations des tournois par jeu
// Ce fichier contient toutes les données pour les tournois des différents jeux

const tournamentInfo = {
  "Free fire": {
    format: "Battle Royale - Équipes de 4 joueurs",
    description: "Affrontez les meilleurs joueurs du Maroc dans Free Fire, le battle royale mobile le plus populaire. Formez votre escouade d'élite et démontrez votre maîtrise tactique, vos compétences de tir et votre esprit d'équipe pour devenir les champions incontestés de cette compétition nationale de haut niveau !",
    requirements: [
      "Âge minimum: 16 ans",
      "Compte Free Fire niveau 40+",
      "Équipe de 4 joueurs + 1 remplaçant (optionnel)",
      "Résidence marocaine obligatoire",
      "Smartphone compatible avec la dernière version du jeu"
    ],
    rounds: [
      { name: "Qualifications Online", date: "15-20 Juin 2025", description: "64 équipes s'affrontent en 8 groupes. Les 4 meilleures équipes de chaque groupe se qualifient pour la phase suivante. Les matchs se jouent sur toutes les cartes du jeu." },
      { name: "Quarts de finale", date: "27-28 Juin 2025", description: "32 équipes réparties en 4 groupes. Format points sur 5 matchs consécutifs avec rotation des cartes. Top 4 de chaque groupe qualifié pour les demi-finales." },
      { name: "Demi-finales (LAN)", date: "4 Juillet 2025", description: "16 équipes en compétition sur scène au Morocco Gaming Expo. Six matchs intenses avec système de points cumulatifs. Les 8 meilleures équipes au classement accèdent à la grande finale." },
      { name: "Grande Finale (LAN)", date: "10 Juillet 2025", description: "8 équipes finalistes s'affrontent en 6 matchs sur différentes cartes pour le titre de champion national. Diffusion en direct avec commentateurs professionnels et analyse après chaque match." }
    ],
    prizes: [
      { position: "1ère place", amount: "25 000 DH", extra: "+ Qualification directe pour la MENA Cup" },
      { position: "2ème place", amount: "15 000 DH", extra: "+ 4 Gaming Phones dernière génération" },
      { position: "3ème place", amount: "8 000 DH", extra: "+ Équipement gaming complet" },
      { position: "4ème place", amount: "2 000 DH", extra: "+ Bonus Free Fire exclusifs" }
    ],
    rules: "• Chaque équipe doit avoir 4 joueurs titulaires et peut inclure 1 remplaçant optionnel.\n• Les joueurs doivent arriver 1h avant le début des matchs en phase LAN.\n• Utilisation de tout logiciel de triche = disqualification immédiate et bannissement des futures compétitions.\n• Streaming autorisé avec délai de 5 minutes minimum.\n• En cas d'égalité de points, le départage se fait sur le nombre d'éliminations totales.\n• Le système de points inclut les placements et les éliminations.",
    color: "from-orange-500 to-red-600",
    icon: "🔥"
  },
  "street fighter": {
    format: "1v1 Double Élimination",
    description: "Le tournoi Street Fighter rassemblera les meilleurs combattants du royaume dans une compétition de haut niveau. Maîtrisez vos combos, perfectionnez vos stratégies et démontrez votre talent dans des duels spectaculaires qui détermineront qui est le véritable champion des arts martiaux virtuels du Maroc !",
    requirements: [
      "Âge minimum: 16 ans",
      "Apporter sa propre manette/stick arcade (PS5/PC)",
      "Connaissance du règlement EVO officiel",
      "Résidence marocaine obligatoire",
      "Inscription préalable sur la plateforme du tournoi"
    ],
    rounds: [
      { name: "Qualifications Online", date: "22-25 Juin 2025", description: "128 joueurs répartis en brackets online. Double élimination, matchs en FT2 (premier à 2 victoires). Tous les personnages sont autorisés." },
      { name: "Phase Intermédiaire", date: "30 Juin 2025", description: "64 joueurs qualifiés continuent en double élimination. Matchs en FT2, diffusés en streaming officiel avec commentateurs. Le bracket sera dévoilé 24h avant le début." },
      { name: "Top 32 (LAN)", date: "6 Juillet 2025", description: "32 joueurs s'affrontent en présentiel au Morocco Gaming Expo. Format FT3 pour le winner bracket, FT2 pour le loser bracket. Setup test disponible 1h avant le début." },
      { name: "Top 8 (LAN)", date: "11 Juillet 2025", description: "La grande finale avec les 8 meilleurs joueurs sur la scène principale. Format FT3, avec grande finale en FT5. Présentation des joueurs et analyse technique entre les matchs." }
    ],
    prizes: [
      { position: "1ère place", amount: "20 000 DH", extra: "+ Stick Arcade Pro édition limitée MGE" },
      { position: "2ème place", amount: "10 000 DH", extra: "+ Fightstick premium personnalisé" },
      { position: "3ème place", amount: "6 000 DH", extra: "+ Manette Pro + Pass VIP pour les tournois 2026" },
      { position: "4ème place", amount: "4 000 DH", extra: "+ Merchandising exclusif Street Fighter" }
    ],
    rules: "• Tous les personnages et stages sont autorisés.\n• Temps par round: 99 secondes.\n• Pause non autorisée sauf urgence (validation par un arbitre obligatoire).\n• Les macros et turbo fonctions sont interdits.\n• En cas d'égalité, un match décisif sera joué.\n• Les joueurs disposent de 60 secondes pour choisir leur personnage.\n• Le winner du match précédent doit garder le même personnage, le loser peut changer.",
    color: "from-red-600 to-purple-700",
    icon: "👊"
  },
  "valorant": {
    format: "5v5 Double Élimination",
    description: "VALORANT MGE Championship est la compétition esport la plus prestigieuse du Maroc pour ce FPS tactique. Formez votre équipe d'élite, développez des stratégies innovantes et affrontez les meilleures formations du pays dans des matchs intenses où chaque round peut faire la différence entre la victoire et la défaite !",
    requirements: [
      "Âge minimum: 16 ans",
      "Compte VALORANT rang minimum Diamant 1",
      "Équipe de 5 joueurs + 1 coach (optionnel)",
      "Anti-cheat obligatoire durant toutes les phases",
      "Résidence marocaine obligatoire",
      "Chaque joueur doit posséder au moins 15 agents débloqués"
    ],
    rounds: [
      { name: "Open Qualifiers", date: "17-22 Juin 2025", description: "32 équipes en double élimination. Matchs en BO1 jusqu'aux quarts, puis BO3. Les 16 meilleures équipes se qualifient. Toutes les cartes officielles du circuit compétitif sont jouables." },
      { name: "Closed Qualifiers", date: "29 Juin 2025", description: "16 équipes s'affrontent en BO3. Double élimination complète avec système de veto des cartes. Les 8 meilleures équipes avancent à la phase LAN avec un seeding déterminé par leur performance." },
      { name: "Playoffs (LAN)", date: "5-6 Juillet 2025", description: "8 équipes en compétition au Morocco Gaming Expo. Double élimination en BO3, avec veto de cartes supervisé par les arbitres. Équipement standardisé fourni avec possibilité d'utiliser ses périphériques personnels." },
      { name: "Grand Final (LAN)", date: "12 Juillet 2025", description: "Finale épique en BO5 sur la scène principale, avec show d'ouverture et analyse des experts. L'équipe venant du winner bracket bénéficie d'une carte d'avance. Diffusion nationale et internationale." }
    ],
    prizes: [
      { position: "1ère place", amount: "50 000 DH", extra: "+ Invitation au VALORANT MENA Challengers" },
      { position: "2ème place", amount: "25 000 DH", extra: "+ Setup gaming complet pour l'équipe (PC + périphériques)" },
      { position: "3ème place", amount: "15 000 DH", extra: "+ Périphériques gaming premium et points VALORANT" },
      { position: "4ème place", amount: "10 000 DH", extra: "+ Abonnements premium et merchandising" }
    ],
    rules: "• Les équipes doivent arriver 90 minutes avant leur match en LAN.\n• Les joueurs doivent utiliser leurs propres périphériques (clavier, souris, tapis, écouteurs).\n• PC et écrans fournis par l'organisation avec configurations identiques.\n• Communication vocale surveillée durant les matchs LAN.\n• Pause technique limitée à 10 minutes par équipe et par match.\n• Tout comportement antisportif entraînera des sanctions immédiates.\n• Les règles complètes sont disponibles sur le site officiel du tournoi.",
    color: "from-red-500 to-blue-700",
    icon: "🎯"
  },
  "FC 25": {
    format: "1v1 Swiss System + Playoffs",
    description: "Le tournoi FC 25 est LA référence pour les fans de football virtuel au Maroc. Démontrez votre maîtrise tactique, votre vision du jeu et vos compétences techniques dans ce championnat prestigieux qui rassemble les meilleurs joueurs du pays pour une compétition où chaque passe, chaque tir et chaque match compte !",
    requirements: [
      "Âge minimum: 16 ans",
      "Posséder le jeu FC 25 sur PlayStation 5 ou Xbox Series X",
      "Apporter sa propre manette compatible (filaire de préférence)",
      "Connaissance du règlement officiel",
      "Résidence marocaine obligatoire",
      "Inscription confirmée sur la plateforme du tournoi"
    ],
    rounds: [
      { name: "Phase de groupes", date: "16-21 Juin 2025", description: "64 joueurs répartis en 16 groupes de 4. Chaque joueur affronte tous les adversaires de son groupe. Les 2 premiers de chaque groupe se qualifient pour les playoffs. Matchs en format aller simple." },
      { name: "Seizièmes & Huitièmes", date: "28-29 Juin 2025", description: "32 joueurs qualifiés s'affrontent en matchs à élimination directe (BO3). Les 8 vainqueurs avancent à la phase LAN. Le bracket sera établi selon le classement des groupes pour éviter que les premiers ne se rencontrent trop tôt." },
      { name: "Quarts & Demi-finales (LAN)", date: "7 Juillet 2025", description: "8 joueurs s'affrontent sur scène en format BO3 avec règle du but en or en cas d'égalité après prolongations. Commentaires en direct et analyse des experts entre chaque match." },
      { name: "Grande Finale (LAN)", date: "14 Juillet 2025", description: "Finale spectaculaire en BO5 sur la scène principale du MGE. Présentation spéciale des finalistes avec leur parcours et statistiques. Diffusion nationale avec commentaires multilingues." }
    ],
    prizes: [
      { position: "1ère place", amount: "15 000 DH", extra: "+ PS5 Pro + Qualification pour le tournoi international" },
      { position: "2ème place", amount: "8 000 DH", extra: "+ Manette Pro Elite personnalisée + jeux édition collector" },
      { position: "3ème place", amount: "5 000 DH", extra: "+ Abonnement Ultimate 1 an + merchandising officiel" },
      { position: "4ème place", amount: "2 000 DH", extra: "+ Cartes FUT premium et points de jeu" }
    ],
    rules: "• Tous les clubs et équipes nationales sont autorisés.\n• Mode de jeu: Matchs amicaux 1v1 en ligne (Online) ou sur PS5/Xbox (LAN).\n• Durée des mi-temps: 6 minutes, avec prolongations et tirs au but si nécessaire.\n• Pause autorisée uniquement entre mi-temps (max 2 minutes).\n• Niveau de difficulté: Légendaire.\n• Caméra: Diffusion TV obligatoire.\n• Comportement anti-sportif sanctionné par disqualification immédiate.\n• Contrôleurs de jeu vérifiés avant chaque match en phase finale.",
    color: "from-green-500 to-blue-600",
    icon: "⚽"
  },
  "fc football": {
    format: "1v1 Swiss System + Playoffs",
    description: "Le FC Championship est la compétition ultime de football virtuel au Maroc. Que vous préfériez un jeu de possession, des contre-attaques rapides ou une défense solide, c'est le moment de prouver que vous êtes le meilleur stratège sur le terrain virtuel et de remporter le prestigieux titre de champion national !",
    requirements: [
      "Âge minimum: 16 ans",
      "Posséder le jeu sur PlayStation 5 ou Xbox Series X (dernière mise à jour)",
      "Apporter sa propre manette (testée avant le tournoi)",
      "Résidence marocaine obligatoire",
      "Présenter une pièce d'identité valide lors de l'inscription"
    ],
    rounds: [
      { name: "Swiss Stage", date: "20-24 Juin 2025", description: "64 joueurs en système suisse sur 5 rondes. Chaque joueur affronte des adversaires ayant un score similaire. Les 16 meilleurs au classement avancent. Points bonus pour les victoires avec plus de 2 buts d'écart." },
      { name: "Top 16 (Bracket)", date: "1-2 Juillet 2025", description: "Élimination directe en BO3 (meilleur des 3 matchs). Les 8 gagnants se qualifient pour la phase LAN. Les matchs seront programmés avec suffisamment de temps de repos entre chaque rencontre." },
      { name: "Quarts & Demi-finales (LAN)", date: "7-8 Juillet 2025", description: "Matchs à élimination directe en BO3 sur la scène secondaire du MGE. Statistiques complètes analysées en direct. Zone d'échauffement disponible 45 minutes avant chaque match." },
      { name: "Finale (LAN)", date: "13 Juillet 2025", description: "Grande finale en BO5 sur la scène principale avec système d'avantage pour le joueur issu du winner bracket. Cérémonie spéciale avec invités surprise et présentation des trophées par des personnalités du football marocain." }
    ],
    prizes: [
      { position: "1ère place", amount: "30 000 DH", extra: "+ PS5 Pro + Qualification pour la eWorld Cup Qualifiers + contrat d'ambassadeur MGE" },
      { position: "2ème place", amount: "15 000 DH", extra: "+ Manettes pro premium + setup de streaming complet" },
      { position: "3ème place", amount: "10 000 DH", extra: "+ Abonnement Game Pass 1 an + équipement gaming" },
      { position: "4ème place", amount: "5 000 DH", extra: "+ Merchandising exclusif et crédits de jeu premium" }
    ],
    rules: "• Tous les clubs et équipes nationales sont autorisés, pas de restrictions sur les transferts.\n• Les transferts personnalisés sont interdits, seuls les effectifs officiels peuvent être utilisés.\n• Durée des mi-temps: 6 minutes, avec prolongations et tirs au but si nécessaire.\n• En phase LAN, les joueurs doivent rester assis jusqu'à la fin du match et respecter le protocole post-match.\n• Les célébrations prolongées et comportements antisportifs peuvent entraîner des sanctions allant jusqu'à la disqualification.\n• Chaque joueur a droit à 3 pauses tactiques de 30 secondes par match.\n• Assistance vidéo disponible en cas de contestation sur décision d'arbitrage électronique.",
    color: "from-green-500 to-blue-600",
    icon: "⚽"
  }
};

export default tournamentInfo; 