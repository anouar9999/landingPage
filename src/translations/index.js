// Système de traduction simplifié
// Traductions pour les éléments communs dans l'application

const translations = {
  // Français
  fr: {
    // Navigation
    nav: {
      discover: "Découvrir",
      passGamers: "Pass Gamers",
      tri9lGlory: "Tri9 l glory",
      prizePool: "Prize Pool",
      proPath: "Voie vers les Pros",
      documentation: "Documentation",
      joinUs: "Rejoignez-nous",
      playFree: "Jouer Gratuitement",
      login: "Se connecter",
      language: "Langue",
      closeMenu: "Fermer le menu",
      openMenu: "Ouvrir le menu",
      backToTop: "Retour en haut"
    },
    // Sections
    common: {
      learnMore: "En savoir plus",
      downloadNow: "Télécharger maintenant",
      selectPlan: "Sélectionner",
      seeAll: "Voir tout",
      contactUs: "Contactez-nous",
      readMore: "Lire plus"
    },
    // About
    about: {
      title: "Jeux en compétition",
      subtitle: "Affrontez les meilleurs joueurs du Maroc dans 4 jeux phares de l'esport",
      details: "Détails",
      tapForInfo: "Appuyez pour plus d'infos",
      clickPrompt: "CLIQUEZ"
    },
    // PassGamers
    passGamers: {
      title: "PASS GAMERS",
      subtitle: "Réservé aux joueurs inscrits sur la plateforme MGE. Activez votre pass pour débloquer des avantages exclusifs.",
      sponsoredBy: "Initiative officielle du Ministère de la Jeunesse, de la Culture et de la Communication",
      benefits: {
        tickets: {
          title: "Tickets Événements",
          description: "Obtenez des tickets gratuits pour participer aux événements gaming exclusifs et tournois."
        },
        offers: {
          title: "Offres Exclusives",
          description: "Accédez à des promotions et réductions réservées uniquement aux détenteurs du Pass Gamers."
        },
        status: {
          title: "Statut Premium",
          description: "Bénéficiez d'un statut privilégié et d'une visibilité accrue dans la communauté gaming."
        },
        community: {
          title: "Communauté Dédiée",
          description: "Rejoignez un réseau exclusif de joueurs passionnés pour partager et progresser ensemble."
        }
      },
      howItWorks: {
        title: "Comment ça marche ?",
        step1: {
          title: "Inscrivez-vous",
          description: "Créez un compte sur la plateforme MGE et complétez votre profil"
        },
        step2: {
          title: "Choisissez votre pass",
          description: "Sélectionnez la formule qui correspond à vos besoins"
        },
        step3: {
          title: "Accédez aux avantages",
          description: "Consultez votre tableau de bord pour voir toutes vos offres disponibles"
        }
      },
      selectPlan: "Sélectionnez votre formule",
      recommended: "RECOMMANDÉ",
      selectedPlan: "Sélectionné: {name}",
      choosePlan: "Choisir {name}",
      activationInfo: "Votre pass devient actif immédiatement après l'inscription",
      securityInfo: "Paiement sécurisé et conditions d'utilisation conformes aux directives ministérielles",
      plans: {
        monthly: {
          name: "Mensuel",
          price: "29,99 €",
          commitment: "Sans engagement",
          features: {
            0: "Accès à tous les tournois MGE",
            1: "Matchmaking prioritaire",
            2: "2 tickets gratuits pour événements gaming",
            3: "Promotions exclusives sur la boutique MGE"
          }
        },
        quarterly: {
          name: "Trimestriel",
          price: "74,99 €",
          commitment: "Engagement 3 mois",
          features: {
            0: "Tous les avantages du plan Mensuel",
            1: "10 tickets VIP par mois pour événements",
            2: "Accès prioritaire aux nouveautés",
            3: "Réductions exclusives sur les produits partenaires"
          }
        },
        annual: {
          name: "Annuel",
          price: "249,99 €",
          commitment: "Engagement annuel",
          features: {
            0: "Tous les avantages du plan Trimestriel",
            1: "Accès illimité aux événements standards",
            2: "Rencontres avec les joueurs professionnels",
            3: "Badge Or sur votre profil",
            4: "Support dédié 24/7"
          }
        }
      }
    },
    // Download Page
    downloads: {
      title: "Centre de Documentation",
      subtitle: "Téléchargez tous les documents et ressources officiels pour les participants aux tournois",
      tabs: {
        all: "Tous les Documents",
        rules: "Règlements Officiels",
        tickets: "Golden Tickets & Concours",
        guides: "Guides Participant"
      },
      new: "NOUVEAU",
      downloadButton: "Télécharger",
      documents: {
        rulebook: {
          title: "Règlement Officiel MGE 2025",
          description: "Toutes les règles et conditions pour participer aux tournois et événements du Morocco Gaming Expo 2025."
        },
        goldenTicket: {
          title: "Golden Ticket Contest 2025",
          description: "Instructions pour participer au concours Golden Ticket et gagner un accès VIP à tous les événements MGE."
        },
        participationGuide: {
          title: "Guide du Participant",
          description: "Guide complet pour préparer votre participation aux compétitions et tirer le meilleur parti de l'expérience MGE."
        }
      },
      helpBanner: {
        title: "Besoin d'aide avec les documents ?",
        description: "Si vous avez des questions sur les règlements, les formats de tournoi ou tout autre document, notre équipe est là pour vous aider.",
        contactButton: "Contacter l'assistance"
      }
    },
    // Footer
    footer: {
      description: "Morocco Gaming Expo (MGE) est le plus grand événement de gaming et d'esport au Maroc, réunissant les meilleurs joueurs pour des compétitions de haut niveau et célébrant la passion du jeu vidéo.",
      quickLinks: "Liens Rapides",
      followUs: "Suivez-nous",
      links: {
        home: "Accueil",
        tournaments: "Tournois",
        prizes: "Prix",
        contact: "Contact"
      },
      legal: {
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation"
      },
      copyright: "© {year} Morocco Gaming Expo. Tous droits réservés. MGE et les logos associés sont des marques déposées."
    },
    // Pro Path
    proPath: {
      title: "Nouvelle Voie vers les Pros",
      description: "Le Morocco Gaming Expo ouvre une voie structurée vers le professionnalisme pour les talents esport marocains. Débute ta carrière de joueur professionnel grâce à notre programme en 4 étapes.",
      sponsoredBy: "Propulsé par le Ministère de la Jeunesse, de la Culture et de la Communication",
      ctaButton: "Lancer ma carrière pro",
      supportedGames: "Programme disponible pour les jeux Free Fire, Valorant, Street Fighter et FC 25",
      steps: {
        aim: {
          title: "Participez à des matchs équilibrés",
          description: "Rejoignez notre système de mise en relation avancé pour participer à des matchs équilibrés et faire monter votre Elo tout en perfectionnant vos compétences avec d'autres joueurs de votre niveau."
        },
        ladder: {
          title: "Grimpez dans les classements",
          description: "Progressez dans nos classements compétitifs, gagnez des récompenses à chaque palier et construisez votre réputation au sein de l'écosystème esport marocain avec vos performances."
        },
        rank: {
          title: "Atteignez le sommet des classements",
          description: "Les joueurs d'élite qui atteignent les plus hauts rangs se qualifient pour les FPL Challenger, un tremplin exclusif vers la ligue professionnelle où vous pourrez prouver votre valeur."
        },
        fpl: {
          title: "Affrontez les meilleurs professionnels",
          description: "Dans le FPL (Faceit Pro League), affrontez quotidiennement les joueurs professionnels, attirez l'attention des équipes et des recruteurs, et lancez votre carrière dans l'esport professionnel."
        }
      }
    },
    // FAQ
    faq: {
      title: "FAQ",
      subtitle: "Trouvez rapidement les réponses à vos questions concernant les tournois et la participation à MGE",
      searchPlaceholder: "Rechercher une question...",
      noResults: "Aucun résultat pour \"{searchTerm}\"",
      tryAgain: "Essayez un autre terme ou parcourez toutes les questions ci-dessous",
      resultsCount: "{count} {count, plural, one {résultat} other {résultats}} pour \"{searchTerm}\"",
      category: "Catégorie",
      noAnswerFound: "Vous ne trouvez pas la réponse à votre question ?",
      contactUs: "Contactez-nous directement",
      categories: {
        registration: {
          title: "Inscription aux Tournois",
          questions: {
            0: {
              question: "Comment s'inscrire à un tournoi MGE ?",
              answer: "Pour vous inscrire à un tournoi MGE, connectez-vous à votre compte sur la plateforme, sélectionnez le tournoi qui vous intéresse, et suivez les instructions d'inscription. Assurez-vous de remplir tous les critères d'éligibilité et de soumettre votre inscription avant la date limite."
            },
            1: {
              question: "Quels documents sont nécessaires pour l'inscription ?",
              answer: "Pour la plupart des tournois, vous aurez besoin de votre pièce d'identité (CIN ou passeport), vos identifiants de jeu, et dans certains cas une autorisation parentale si vous êtes mineur. Les tournois spécifiques peuvent avoir des exigences supplémentaires détaillées dans leurs règlements."
            },
            2: {
              question: "Peut-on s'inscrire en équipe ?",
              answer: "Oui, pour les jeux d'équipe comme Free Fire ou Valorant, vous devez inscrire l'ensemble de votre équipe. Un capitaine crée l'équipe sur la plateforme et invite les autres membres. Tous les membres doivent avoir un compte MGE actif et accepter l'invitation pour finaliser l'inscription."
            }
          }
        }
      }
    },
    // Hero
    hero: {
      title: "L3eb M3ana f Morocco gaming expo",
      subtitle: {
        part1: "Rejoignez l'elite",
        part2: "du gaming marocain dans une",
        part3: "competition epique",
        part4: "Affrontez les meilleurs joueurs, gagnez des prix exceptionnels et écrivez votre nom dans l'histoire de l'esport."
      },
      playNow: "Jouez Maintenant",
      bottomTitle: "ELEAGUE",
      worldToMorocco: "au Maroc"
    },
    // Tri9lGlory
    tri9lGlory: {
      title: "TrI9 l glory",
      description: "Had tri9 machi sahla, walakin fiha l'honneur w l'gloire. Ghadi tel3bo m3a ahsan les joueurs f lMaghrib, w twerriw lblad kamla chno 3andkom.",
      steps: {
        step1: "L3ba tactique 3la PC, khasek tkoun mzian f l'aim w strategy. Ghadi twa9ef ahsan les joueurs f lMaghrib f des duels.",
        step2: "Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t tdi3o hit les places mahdoudin.",
        step3: "Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t tdi3o hit les places mahdoudin."
      }
    },
    // PrizePool
    prizePool: {
      description: "250,000 dh f l'jeu, ghir werrina chno 3andek. Rbe7 w welli une légende m3roufa f lblad kamla.",
      title: "Rbe7 w welli mchhor",
      totalPrizePool: "Prix Total",
      places: {
        first: "Première place",
        second: "Deuxième place",
        third: "Troisième place"
      }
    },
    
    // Détails des jeux
    gameDetails: {
      championship: "Championnat",
      tournamentFormat: "Format du tournoi",
      description: "Description",
      requirements: "Exigences",
      phases: "Phases du tournoi",
      prizePool: "Prix",
      prizePoolTBA: "Prix à annoncer",
      rules: "Règlement",
      close: "Fermer",
      unavailable: "Information non disponible",
      comingSoon: "Détails à venir prochainement",
      tbd: "À déterminer",
      rulesComingSoon: "Les règles du tournoi seront annoncées prochainement"
    },
    
    // Game Ad
    gameAd: {
      title: "MINI-JEU",
      instructions: "Collectez les points avant la fin du temps!",
      play: "JOUER",
      sponsored: "Sponsorisé par NOS PARTENAIRES",
      score: "Score",
      time: "Temps",
      gameOver: "JEU TERMINÉ",
      yourScore: "Votre score",
      playAgain: "REJOUER",
      viewOffer: "VOIR L'OFFRE"
    }
  },
  
  // Anglais
  en: {
    // Navigation
    nav: {
      discover: "Discover",
      passGamers: "Gamers Pass",
      tri9lGlory: "Road to Glory",
      prizePool: "Prize Pool",
      proPath: "Path to Pro",
      documentation: "Documentation",
      joinUs: "Join Us",
      playFree: "Play For Free",
      login: "Login",
      language: "Language",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      backToTop: "Back to top"
    },
    // Sections
    common: {
      learnMore: "Learn more",
      downloadNow: "Download now",
      selectPlan: "Select",
      seeAll: "See all",
      contactUs: "Contact us",
      readMore: "Read more"
    },
    // About
    about: {
      title: "Tournament Games",
      subtitle: "Challenge the best players in Morocco across 4 flagship esports games",
      details: "Details",
      tapForInfo: "Tap for more info",
      clickPrompt: "CLICK"
    },
    // PassGamers
    passGamers: {
      title: "GAMERS PASS",
      subtitle: "Reserved for registered players on the MGE platform. Activate your pass to unlock exclusive benefits.",
      sponsoredBy: "Official initiative of the Ministry of Youth, Culture and Communication",
      benefits: {
        tickets: {
          title: "Event Tickets",
          description: "Get free tickets to participate in exclusive gaming events and tournaments."
        },
        offers: {
          title: "Exclusive Offers",
          description: "Access promotions and discounts reserved only for Gamers Pass holders."
        },
        status: {
          title: "Premium Status",
          description: "Enjoy privileged status and increased visibility in the gaming community."
        },
        community: {
          title: "Dedicated Community",
          description: "Join an exclusive network of passionate players to share and progress together."
        }
      },
      howItWorks: {
        title: "How does it work?",
        step1: {
          title: "Register",
          description: "Create an account on the MGE platform and complete your profile"
        },
        step2: {
          title: "Choose your pass",
          description: "Select the plan that suits your needs"
        },
        step3: {
          title: "Access benefits",
          description: "Check your dashboard to see all your available offers"
        }
      },
      selectPlan: "Select your plan",
      recommended: "RECOMMENDED",
      selectedPlan: "Selected: {name}",
      choosePlan: "Choose {name}",
      activationInfo: "Your pass becomes active immediately after registration",
      securityInfo: "Secure payment and terms of use in accordance with ministerial guidelines",
      plans: {
        monthly: {
          name: "Monthly",
          price: "€29.99",
          commitment: "No commitment",
          features: {
            0: "Access to all MGE tournaments",
            1: "Priority matchmaking",
            2: "2 free tickets for gaming events",
            3: "Exclusive promotions on the MGE store"
          }
        },
        quarterly: {
          name: "Quarterly",
          price: "€74.99",
          commitment: "3-month commitment",
          features: {
            0: "All benefits from the Monthly plan",
            1: "10 VIP tickets per month for events",
            2: "Priority access to new releases",
            3: "Exclusive discounts on partner products"
          }
        },
        annual: {
          name: "Annual",
          price: "€249.99",
          commitment: "Annual commitment",
          features: {
            0: "All benefits from the Quarterly plan",
            1: "Unlimited access to standard events",
            2: "Meet and greet with professional players",
            3: "Gold badge on your profile",
            4: "Dedicated 24/7 support"
          }
        }
      }
    },
    // Download Page
    downloads: {
      title: "Documentation Center",
      subtitle: "Download all official documents and resources for tournament participants",
      tabs: {
        all: "All Documents",
        rules: "Official Rules",
        tickets: "Golden Tickets & Contests",
        guides: "Participant Guides"
      },
      new: "NEW",
      downloadButton: "Download",
      documents: {
        rulebook: {
          title: "MGE 2025 Official Rules",
          description: "All rules and conditions for participating in Morocco Gaming Expo 2025 tournaments and events."
        },
        goldenTicket: {
          title: "Golden Ticket Contest 2025",
          description: "Instructions for participating in the Golden Ticket contest and winning VIP access to all MGE events."
        },
        participationGuide: {
          title: "Participant Guide",
          description: "Comprehensive guide to prepare your participation in competitions and make the most of the MGE experience."
        }
      },
      helpBanner: {
        title: "Need help with documents?",
        description: "If you have questions about regulations, tournament formats or any other document, our team is here to help.",
        contactButton: "Contact support"
      }
    },
    // Footer
    footer: {
      description: "Morocco Gaming Expo (MGE) is the largest gaming and esports event in Morocco, bringing together the best players for high-level competitions and celebrating the passion for video games.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      links: {
        home: "Home",
        tournaments: "Tournaments",
        prizes: "Prizes",
        contact: "Contact"
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Use"
      },
      copyright: "© {year} Morocco Gaming Expo. All rights reserved. MGE and associated logos are registered trademarks."
    },
    // Pro Path
    proPath: {
      title: "New Path to Pro",
      description: "Morocco Gaming Expo opens a structured path to professionalism for Moroccan esports talents. Start your professional player career with our 4-step program.",
      sponsoredBy: "Powered by the Ministry of Youth, Culture and Communication",
      ctaButton: "Launch my pro career",
      supportedGames: "Program available for Free Fire, Valorant, Street Fighter and FC 25 games",
      steps: {
        aim: {
          title: "Participate in balanced matches",
          description: "Join our advanced matchmaking system to participate in balanced matches and raise your Elo while perfecting your skills m3a players at your level."
        },
        ladder: {
          title: "Climb the rankings",
          description: "Progress through our competitive rankings, earn rewards at each tier, and build your reputation within the Moroccan esports ecosystem with your performances."
        },
        rank: {
          title: "Reach the top of the rankings",
          description: "Elite players who reach the highest ranks qualify for FPL Challenger, an exclusive stepping stone to the professional league where you can prove your worth."
        },
        fpl: {
          title: "Play against top professionals",
          description: "In FPL (Faceit Pro League), compete daily m3a professional players, attract the attention of teams and recruiters, and launch your career in professional esport."
        }
      }
    },
    // FAQ
    faq: {
      title: "FAQ",
      subtitle: "Quickly find answers to your questions about tournaments and participation in MGE",
      searchPlaceholder: "Search for a question...",
      noResults: "No results for \"{searchTerm}\"",
      tryAgain: "Try another term or browse all questions below",
      resultsCount: "{count} {count, plural, one {result} other {results}} for \"{searchTerm}\"",
      category: "Category",
      noAnswerFound: "Can't find the answer to your question?",
      contactUs: "Contact us directly",
      categories: {
        registration: {
          title: "Tournament Registration",
          questions: {
            0: {
              question: "How do I register for an MGE tournament?",
              answer: "To register for an MGE tournament, log in to your account on the platform, select the tournament you're interested in, and follow the registration instructions. Make sure you meet all eligibility criteria and submit your registration before the deadline."
            },
            1: {
              question: "What documents are required for registration?",
              answer: "For most tournaments, you will need your ID (national ID or passport), your game identifiers, and in some cases parental authorization if you are a minor. Specific tournaments may have additional requirements detailed in their regulations."
            },
            2: {
              question: "Can I register as a team?",
              answer: "Yes, for team games like Free Fire or Valorant, you must register your entire team. A captain creates the team on the platform and invite the other members. All members must have an active MGE account and accept the invitation to finalize registration."
            }
          }
        },
        format: {
          title: "Competition Format",
          questions: {
            0: {
              question: "How do qualification phases work?",
              answer: "Qualification phases generally take place online. Depending on the game, they may follow a group format, direct elimination, or Swiss system. The best players/teams then advance to the final phases which often take place in person at the MGE event."
            },
            1: {
              question: "What is the average duration of an MGE tournament?",
              answer: "MGE tournaments take place over several weeks. Online qualification phases generally last 1-2 weeks, followed by intermediate phases. The final phases take place during the main Morocco Gaming Expo event, over 2-3 days."
            },
            2: {
              question: "How are rankings and seeds determined?",
              answer: "Initial seeds are determined based on past performance, Elo ranking, or pre-qualification results. During the tournament, the ranking evolves according to the specific format of the tournament (points for group systems, progression in the bracket for elimination formats)."
            }
          }
        },
        prizes: {
          title: "Prizes and Rewards",
          questions: {
            0: {
              question: "How are tournament prizes distributed?",
              answer: "Prizes are distributed according to the final ranking of the tournament. The exact details of the distribution are specified in each tournament's rules. Generally, prizes are paid by bank transfer within 30 days after the end of the tournament, after verification of the winners' identity."
            },
            1: {
              question: "Are there other rewards besides cash prizes?",
              answer: "Yes, in addition to cash prizes, MGE tournaments often offer gaming equipment (peripherals, PC components), sponsorship opportunities, qualifications for international tournaments, and media visibility for the best players and teams."
            },
            2: {
              question: "Are rewards subject to taxes?",
              answer: "Cash prizes may be subject to Moroccan taxation. It is the responsibility of the winners to declare their earnings in accordance with current legislation. MGE will provide the necessary documents to certify the amounts paid."
            }
          }
        },
        rules: {
          title: "Rules and Arbitration",
          questions: {
            0: {
              question: "How are disputes handled during a match?",
              answer: "Each tournament has a team of referees. In case of a dispute during an online match, players must immediately report the problem via the tournament ticket system and provide evidence (screenshots, videos). For LAN phases, the referees present make real-time decisions."
            },
            1: {
              question: "What are the rules regarding disconnections?",
              answer: "In case of disconnection, rules vary by game. Generally, a short pause is granted to allow reconnection. If reconnection is impossible, the referees will decide if the match should be replayed or if the current result is maintained, depending on the progress of the match and the specific regulations."
            },
            2: {
              question: "Can players contest a referee's decision?",
              answer: "Yes, players can file a formal complaint with the main arbitration committee. This complaint must be made within a specified timeframe (generally 15 minutes after the end of the match). The committee will examine the situation and render a final decision that cannot be contested further."
            }
          }
        },
        logistics: {
          title: "Logistics and Organization",
          questions: {
            0: {
              question: "How do the LAN phases of the tournament take place?",
              answer: "The LAN phases take place in the dedicated space of the Morocco Gaming Expo. Qualified players must arrive at the indicated time for registration (generally 1-2 hours before their first match). The main equipment is provided, but players can bring certain personal peripherals according to the regulations."
            },
            1: {
              question: "Are travel expenses covered?",
              answer: "For the final phases of major tournaments, MGE may cover travel and accommodation expenses for qualified teams who do not reside in the host city. The exact conditions are specified in each tournament's rules and communicated to qualified teams."
            },
            2: {
              question: "How to prepare for first-time participation in an MGE tournament?",
              answer: "For your first participation, make sure to: read the rules entirely, prepare all required documents, test your equipment in advance, arrive early for in-person phases, and join the official communication channels (Discord, etc.) to receive important updates."
            }
          }
        }
      }
    },
    // Hero
    hero: {
      title: "Play With Us at Morocco Gaming Expo",
      subtitle: {
        part1: "Join the elite",
        part2: "of Moroccan gaming in an",
        part3: "epic competition",
        part4: "Challenge the best players, win exceptional prizes, and write your name in esports history."
      },
      playNow: "Play Now",
      bottomTitle: "ELEAGUE"
    },
    // Tri9lGlory
    tri9lGlory: {
      title: "Road to Glory",
      description: "This path is not easy, but it brings honor and glory. You will play with the best players in Morocco and show the whole country what you're capable of.",
      steps: {
        step1: "Tactical gameplay on PC, you need to excel in aim and strategy. You will face the best players in Morocco in intense duels.",
        step2: "You must be over 16 years old, Moroccan, and don't waste time as places are limited.",
        step3: "Prepare yourself for the challenge, train hard, and show everyone your gaming skills."
      }
    },
    // PrizePool
    prizePool: {
      description: "250,000 DH in prizes, just show us what you've got. Win and become a legend known throughout the country.",
      title: "Win and become famous",
      totalPrizePool: "Total Prize Pool",
      places: {
        first: "First place",
        second: "Second place",
        third: "Third place"
      }
    },
    // Game details
    gameDetails: {
      championship: "Championship",
      tournamentFormat: "Tournament Format",
      description: "Description", 
      requirements: "Requirements",
      phases: "Tournament Phases",
      prizePool: "Prize Pool",
      prizePoolTBA: "Prize Pool to be announced",
      rules: "Rules",
      close: "Close",
      unavailable: "Information unavailable",
      comingSoon: "Details coming soon",
      tbd: "To be determined",
      rulesComingSoon: "Tournament rules will be announced soon"
    },
    
    // Game Ad
    gameAd: {
      title: "MINI-GAME",
      instructions: "Collect points before time runs out!",
      play: "PLAY",
      sponsored: "Sponsored by OUR PARTNERS",
      score: "Score",
      time: "Time",
      gameOver: "GAME OVER",
      yourScore: "Your score",
      playAgain: "PLAY AGAIN",
      viewOffer: "VIEW OFFER"
    }
  },
  
  // Arabe
  ar: {
    // Navigation
    nav: {
      discover: "اكتشف",
      passGamers: "باس اللاعبين",
      tri9lGlory: "طريق المجد",
      prizePool: "الجوائز",
      proPath: "طريق الاحتراف",
      documentation: "الوثائق",
      joinUs: "انضم إلينا",
      playFree: "العب مجانًا",
      login: "تسجيل الدخول",
      language: "اللغة",
      closeMenu: "إغلاق القائمة",
      openMenu: "فتح القائمة",
      backToTop: "العودة إلى الأعلى"
    },
    // Sections
    common: {
      learnMore: "اعرف المزيد",
      downloadNow: "تحميل الآن",
      selectPlan: "اختر",
      seeAll: "رؤية الكل",
      contactUs: "اتصل بنا",
      readMore: "قراءة المزيد"
    },
    // About
    about: {
      title: "ألعاب البطولة",
      subtitle: "تحدى أفضل اللاعبين في المغرب عبر 4 ألعاب رائدة في الرياضات الإلكترونية",
      details: "التفاصيل",
      tapForInfo: "انقر لمزيد من المعلومات",
      clickPrompt: "انقر"
    },
    // PassGamers
    passGamers: {
      title: "باس اللاعبين",
      subtitle: "مخصص للاعبين المسجلين على منصة MGE. قم بتفعيل باس اللاعبين للحصول على مزايا حصرية.",
      ministry: "مبادرة رسمية من وزارة الشباب والثقافة والاتصال",
      benefits: {
        tickets: {
          title: "تذاكر الفعاليات",
          description: "احصل على تذاكر مجانية للمشاركة في فعاليات وبطولات الألعاب الحصرية."
        },
        offers: {
          title: "عروض حصرية",
          description: "الوصول إلى العروض والخصومات المخصصة فقط لحاملي باس اللاعبين."
        },
        status: {
          title: "وضع متميز",
          description: "تمتع بوضع متميز وزيادة الظهور في مجتمع الألعاب."
        },
        community: {
          title: "مجتمع مخصص",
          description: "انضم إلى شبكة حصرية من اللاعبين المتحمسين للمشاركة والتقدم معًا."
        }
      },
      howItWorks: "كيف يعمل؟",
      steps: {
        register: {
          title: "سجل",
          description: "أنشئ حسابًا على منصة MGE وأكمل ملفك الشخصي"
        },
        choosePlan: {
          title: "اختر الباس الخاص بك",
          description: "حدد الخطة التي تناسب احتياجاتك"
        },
        getAccess: {
          title: "الوصول إلى المزايا",
          description: "تحقق من لوحة المعلومات الخاصة بك لمشاهدة جميع العروض المتاحة"
        }
      },
      selectYourPlan: "اختر خطتك",
      recommended: "موصى به",
      activation: "يتم تنشيط الباس الخاص بك مباشرة بعد التسجيل",
      securePayment: "الدفع الآمن وشروط الاستخدام وفقًا للإرشادات الوزارية"
    },
    // Download Page
    downloads: {
      title: "مركز الوثائق",
      subtitle: "قم بتنزيل جميع المستندات والموارد الرسمية للمشاركين في البطولات",
      categories: {
        all: "جميع المستندات",
        rules: "القواعد الرسمية",
        tickets: "التذاكر الذهبية والمسابقات",
        guides: "أدلة المشاركين"
      },
      new: "جديد",
      download: "تحميل",
      helpBanner: {
        title: "هل تحتاج إلى مساعدة بخصوص المستندات؟",
        description: "إذا كانت لديك أسئلة حول اللوائح أو تنسيقات البطولة أو أي مستند آخر، فإن فريقنا هنا للمساعدة.",
        contactSupport: "الاتصال بالدعم"
      }
    },
    // Hero
    hero: {
      title: "العب معنا في معرض ألعاب المغرب",
      subtitle: {
        part1: "انضم إلى النخبة",
        part2: "من الألعاب المغربية في",
        part3: "منافسة ملحمية",
        part4: "تحدى أفضل اللاعبين، وافز بجوائز استثنائية، واكتب اسمك في تاريخ الرياضات الإلكترونية."
      },
      playNow: "العب الآن",
      bottomTitle: "الدوري الإلكتروني"
    },
    // Tri9lGlory
    tri9lGlory: {
      title: "طريق المجد",
      description: "هاد الطريق ماشي ساهلة، ولكن فيها الشرف والمجد. غادي تلعبو مع أحسن اللاعبين في المغرب، وتوريو البلاد كاملة شنو عندكم.",
      steps: {
        step1: "لعبة تكتيكية على الكمبيوتر، خاصك تكون مزيان في التصويب والاستراتيجية. غادي توقف أحسن اللاعبين في المغرب في مبارزات.",
        step2: "خاصك تكون فايق 16 عام، تكون مغربي، وما عندكش الوقت تضيعو حيت الأماكن محدودين.",
        step3: "خاصك تكون جاهز للتحدي، تدرب بجدية، وتوري للجميع مهاراتك في الألعاب."
      }
    },
    // PrizePool
    prizePool: {
      description: "250,000 درهم في الجائزة، فقط أرنا ما لديك. افز وكن أسطورة معروفة في البلاد كلها.",
      title: "افز وكن مشهورا",
      totalPrizePool: "مجموع الجوائز",
      places: {
        first: "المركز الأول",
        second: "المركز الثاني",
        third: "المركز الثالث"
      }
    },
    // تفاصيل اللعبة
    gameDetails: {
      championship: "البطولة",
      tournamentFormat: "شكل البطولة",
      description: "وصف",
      requirements: "متطلبات",
      phases: "مراحل البطولة",
      prizePool: "الجوائز",
      prizePoolTBA: "سيتم الإعلان عن الجوائز",
      rules: "قواعد",
      close: "إغلاق",
      unavailable: "المعلومات غير متوفرة",
      comingSoon: "التفاصيل قادمة قريبًا",
      tbd: "سيتم تحديدها",
      rulesComingSoon: "سيتم الإعلان عن قواعد البطولة قريبًا"
    },
    
    // Game Ad
    gameAd: {
      title: "لعبة مصغرة",
      instructions: "اجمع النقاط قبل انتهاء الوقت!",
      play: "العب",
      sponsored: "برعاية شركائنا",
      score: "النقاط",
      time: "الوقت",
      gameOver: "انتهت اللعبة",
      yourScore: "نتيجتك",
      playAgain: "العب مرة أخرى",
      viewOffer: "عرض العرض"
    }
  },
  
  // Tamazight
  tz: {
    // Navigation
    nav: {
      discover: "ⵙⵏⵓⴱⴱⵓ",
      passGamers: "ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏ ⵡⵓⵔⴰⵔⵏ",
      tri9lGlory: "ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵓⵖⵍ",
      prizePool: "ⵜⵓⵔⴰⵜ ⵏ ⵜⵓⵔⴰⵔⵉⵏ",
      proPath: "ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵡⵓⵔⵉ",
      documentation: "ⴰⵎⴰⵡⴰⵍ",
      joinUs: "ⴷⴷⵓⴽⵍⵜ ⴰⴽⴷ ⵏⴻⵖ",
      playFree: "ⵓⵔⴰⵔ ⴱⴰⵟⵍ",
      login: "ⴽⵛⵎ",
      language: "ⵜⵓⵜⵍⴰⵢⵜ",
      closeMenu: "ⵇⵇⵏ ⵓⵎⵓⵖ",
      openMenu: "ⵔⵥⵎ ⵓⵎⵓⵖ",
      backToTop: "ⴷⵡⵍ ⵙ ⵓⴼⵍⵍⴰ"
    },
    // Sections
    common: {
      learnMore: "ⵙⵙⵏ ⵓⴳⴳⴰⵔ",
      downloadNow: "ⵣⵓⴱⴱⴷ ⵉⵎⵉⵔⴰ",
      selectPlan: "ⴼⵔⵏ",
      seeAll: "ⵥⵔ ⵎⴰⵕⵕⴰ",
      contactUs: "ⵏⵎⵢⴰⵡⴰⴹ",
      readMore: "ⵖⵔ ⵓⴳⴳⴰⵔ"
    },
    // About
    about: {
      title: "ⵓⵔⴰⵔⵏ ⵏ ⵓⵎⵏⴰⵢ",
      subtitle: "ⵎⵥⵉ ⵓⴽⴰⵏ ⴰⴽⴷ ⵉⵏⵓⵔⴰⵔⵏ ⵉⴼⵓⵍⴽⵉⵏ ⴳ ⵍⵎⵖⵔⵉⴱ ⴳ 4 ⵓⵔⴰⵔⵏ ⵉⵎⵇⵔⴰⵏⵏ",
      details: "ⵜⴰⴷⵓⵍⵉⵏ",
      tapForInfo: "ⵙⴽⵙⵉ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⴼⵜ ⵓⴳⴳⴰⵔ",
      clickPrompt: "ⵙⴽⵙⵉ"
    },
    // PassGamers
    passGamers: {
      title: "ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏ ⵡⵓⵔⴰⵔⵏ",
      subtitle: "ⵉⵜⵜⵡⴰⵃⴱⵙ ⵉ ⵉⵏⵓⵔⴰⵔⵏ ⵉⴽⴻⵜⴱⴻⵏ ⴳ ⵜⵖⵉⵡⴰⵏⵜ MGE. ⵙⴽⵔ ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏⵏⴻⴽ ⴰⴽⴽⵯ ⴰⴷ ⴷ ⵜⴻⴽⴽⵙⴻⴷ ⵓⵟⵟⵓⵏⵏ ⴰⵣⴰⵣⴰⵏⵏ.",
      ministry: "ⵜⴰⵎⵓⴽⵔⵉⵙⵜ ⵜⵓⵏⵙⵉⴱⵜ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⵎⵥⵉ, ⴰⴷⵍⵙ ⴷ ⵓⵎⵢⴰⵡⴰⴹ",
      benefits: {
        tickets: {
          title: "ⵜⵉⴽⴰⵔⵜⵉⵡⵉⵏ ⵏ ⵓⵎⵏⵏⵉ",
          description: "ⴰⵡⵉ ⵜⵉⴽⴰⵔⵜⵉⵡⵉⵏ ⴱⴰⵟⵍ ⴰⴽⴽⵯ ⴰⴷ ⵜⴻⴷⴷⵓⴷ ⵖⵔ ⵉⵎⵏⵏⵉⵜⵏ ⴷ ⵜⵉⵔⴰⵔⵉⵏ ⵏ ⵡⵓⵔⴰⵔⵏ."
        },
        offers: {
          title: "ⵡⵉⵏ ⵉⵥⵍⵉⵏ",
          description: "ⴰⴽⵛⵛⵎ ⵖⵔ ⵡⵉⵏ ⵉⵥⵍⵉⵏ ⴷ ⵉⵙⵉⵖⵥⴰⵏ ⵉⵜⵜⵡⴰⵃⴱⵙⵏ ⵖⴰⵙ ⵉ ⵡⵉⴷ ⵉⵟⵟⴼⵏ ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏ ⵡⵓⵔⴰⵔⵏ."
        },
        status: {
          title: "ⴰⴷⴷⴰⴷ ⴰⵎⵇⵇⵓⵔ",
          description: "ⵙⵖⵍⵉ ⵙ ⵡⴰⴷⴷⴰⴷ ⴰⵎⵇⵇⵓⵔ ⴷ ⵓⵙⴽⵏ ⴰⵎⵇⵇⵓⵔ ⴳ ⵜⵎⵓⵏⵜ ⵏ ⵡⵓⵔⴰⵔⵏ."
        },
        community: {
          title: "ⵜⴰⵎⵓⵏⵜ ⵉⵥⵍⵉⵏ",
          description: "ⴷⴷⵓⴽⵍ ⴷ ⵜⵖⵡⵡⴰⵖⵜ ⵜⴰⵣⴰⵣⴰⵏⵜ ⵏ ⵉⵏⵓⵔⴰⵔⵏ ⵉⵎⵣⵡⴰⵖⵏ ⴰⴽⴽⵯ ⴰⴷ ⴽⵓⵏ ⵉⵄⴰⵡⵏ.",
          description: "ⴷⴷⵓⴽⵍ ⴷ ⵜⵖⵡⵡⴰⵖⵜ ⵜⴰⵣⴰⵣⴰⵏⵜ ⵏ ⵉⵏⵓⵔⴰⵔⵏ ⵉⵎⵣⵡⴰⵖⵏ ⴰⴽⴽⵯ ⴰⴷ ⴽⵓⵏ ⵉⵄⴰⵡⵏ."
        }
      },
      howItWorks: "ⵎⴰⵎⴻⵏⴽ ⵜⵜⵖⴰⵡⴰⵙ?",
      steps: {
        register: {
          title: "ⴽⵜⴻⴱ",
          description: "ⵙⴽⵔ ⴰⵎⵉⴹⴰⵏ ⴳ ⵜⵖⵉⵡⴰⵏⵜ MGE ⴷ ⵜⴰⵡⵙⴰⵔⵜ ⵏ ⵡⴰⵙⵉⵜ ⵏⵏⴻⴽ"
        },
        choosePlan: {
          title: "ⴼⵔⵏ ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏⵏⴻⴽ",
          description: "ⴼⵔⵏ ⴰⵙⵓⴳⵏ ⵉⴷ ⵉⵎⵎⴻⵏⴰⵡⵏ ⴷ ⵉⵙⴻⵡⵡⵓⵔⴰ ⵏⵏⴻⴽ"
        },
        getAccess: {
          title: "ⴰⴽⵛⵛⵎ ⵖⵔ ⵜⵏⴼⵍⵉⵙⵉⵏ",
          description: "ⵙⴻⴽⵙⵉⵡ ⵜⵓⴱⵍⵓⵜ ⵏⵏⴻⴽ ⴰⴽⴽⵯ ⴰⴷ ⵜⵥⵔⴻⴷ ⵎⴰⵕⵕⴰ ⵡⵉⵏ ⵉⵥⵍⵉⵏ"
        }
      },
      selectYourPlan: "ⴼⵔⵏ ⴰⵙⵓⴳⵏ ⵏⵏⴻⴽ",
      recommended: "ⵉⵜⵜⵡⴰⵡⴰⵚⴰⵏ",
      activation: "ⵜⴰⵎⵙⴻⴿⵊⵉⵡⵜ ⵏⵏⴻⴽ ⵜⵔⵎⵙ ⴷⵉⵖ ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⴽⵜⵜⴰⴱ",
      securePayment: "ⴰⴼⵔⵓ ⴰⵎⴻⴹⴼⴰⵔ ⴷ ⵜⵉⵖⴰⵔⵉⵡⵉⵏ ⵏ ⵓⵙⴻⵅⴷⴰⵎ ⵜⵎⵎⴻⵏⴰⵡⵏⵜ ⴷ ⵜⵉⵏⵎⴰⵍⵉⵏ ⵏ ⵜⵎⴰⵡⴰⵙⵜ"
    },
    // Download Page
    downloads: {
      title: "ⴰⵎⵎⴰⵙ ⵏ ⵡⵉⵔⵔⴰⵜⵏ",
      subtitle: "ⵣⵓⴱⴱⴷ ⵎⴰⵕⵕⴰ ⵜⵓⵔⴰⵇⵉⵏ ⴷ ⵜⵖⴰⵡⵙⵉⵡⵉⵏ ⵜⵓⵏⵙⵉⴱⵉⵏ ⵉ ⵡⵉⴷ ⵉⵜⵜⴻⴽⴽⴰⵏ ⴳ ⵜⵎⵖⵔⵉⵡⵉⵏ",
      categories: {
        all: "ⵎⴰⵕⵕⴰ ⵜⵓⵔⴰⵇⵉⵏ",
        rules: "ⵉⵎⵏⵣⴰⵖⵏ ⵉⵎⴰⴷⴷⵓⴷⵏ",
        tickets: "ⵜⵉⴽⴰⵔⵜⵉⵡⵉⵏ ⵜⵉⵡⵔⵖⵉⵏ ⴷ ⵜⵎⵖⵔⵉⵡⵉⵏ",
        guides: "ⵉⵎⴰⵍⴰⵏ ⵏ ⵉⵎⴷⵓⴽⴽⴰⵍ"
      },
      new: "ⴰⵎⴰⵢⵏⵓ",
      download: "ⵣⵓⴱⴱⴷ",
      helpBanner: {
        title: "ⵉⵙ ⵜⵔⵉⴷ ⵜⵉⵡⵉⵙⵉ ⵙ ⵜⵓⵔⴰⵇⵉⵏ?",
        description: "ⵎⴽ ⵜⵙⵄⵉⴷ ⵉⵙⵇⵙⵉⵜⵏ ⵅⴼ ⵉⵎⵏⵣⴰⵖⵏ, ⵉⵎⵓⵜⵜⴰ ⵏ ⵜⵎⵖⵔⵉⵡⵉⵏ ⵏⵉⵖ ⵜⵓⵔⴰⵇ ⵏⵏⵉⴹⵏ, ⴰⵙⵇⵇⵉⵎ ⵏⵏⴻⵖ ⴰⵇⵇⴰ ⴷⴰ ⴰⴽⴽⵯ ⴰⴷ ⴽⵓⵏ ⵉⵄⴰⵡⵏ.",
        contactSupport: "ⵏⵎⵢⴰⵡⴰⴹ ⴰⴽⴷ ⵓⵄⴰⵡⴰⵏ"
      }
    },
    // Hero
    hero: {
      title: "ⵓⵔⴰⵔ ⴰⵎⵥⵥⵢⴰⵏ",
      subtitle: {
        part1: "ⴷⴷⵓⴽⵍ ⴰⴽⴷ ⵉⵎⵥⵢⴰⵏⵏ",
        part2: "ⵏ ⵡⵓⵔⴰⵔⵏ ⵉⵎⵖⵔⵉⴱⵢⵏ ⴳ",
        part3: "ⵜⴰⵎⵥⵉⵢⵜ ⵉⵎⵇⵇⵓⵔⵏ",
        part4: "ⵎⵥⵉ ⵓⴽⴰⵏ ⴰⴽⴷ ⵉⵏⵓⵔⴰⵔⵏ ⵉⴼⵓⵍⴽⵉⵏ, ⵔⴱⴻⵃ ⵜⵉⵏⴼⵓⵍⵉⵏ ⵉⵥⵍⵉⵏ, ⵜⴰⵔⵉⴷ ⵉⵙⵎ ⵏⵏⴻⴽ ⴳ ⵓⵎⵣⵔⵓⵢ ⵏ ⵉⵙⴱⵉⵔⵜ."
      },
      playNow: "ⵓⵔⴰⵔ ⵉⵎⵉⵔⴰ",
      bottomTitle: "ⴻⵍⴻⴰⴳⵓⴻ",
      worldToMorocco: "au Maroc"
    },
    // Tri9lGlory
    tri9lGlory: {
      title: "ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵓⵖⵍ",
      description: "ⵡⴰ ⴰⴱⵔⵉⴷ ⵓⵔ ⵉⵀⵍⴰ, ⵎⴰⵛⴰ ⴳⵉⵙ ⴰⵙⵎⵖⵓⵔ ⴷ ⵓⵙⵓⵖⵍ. ⵔⴰⴷ ⵜⵓⵔⴰⵔⵎ ⴰⴽⴷ ⵉⵏⵓⵔⴰⵔⵏ ⵢⵓⴼⵏ ⴳ ⵍⵎⵖⵔⵉⴱ, ⵜⵎⵍⵎ ⵉ ⵜⵎⴰⵣⵉⵔⵜ ⵎⴰ ⴷⴰⵔⵓⵏ.",
      steps: {
        step1: "ⵓⵔⴰⵔ ⵏ ⵜⴰⴽⵜⵉⴽⵜ ⵅⴼ ⵓⵙⵍⴽⵉⵎ, ⵉⵅⵚⵚⴰ ⴽ ⴰⴷ ⵜⵉⵍⵉⴷ ⵢⵓⴼⵏ ⴳ ⵡⴰⵏⵏⴰⵢ ⴷ ⵜⵎⵏⵜⵉⵍⵜ. ⵔⴰⴷ ⵜⵎⵢⴰⴳⴰⵔⴷ ⵉⵏⵓⵔⴰⵔⵏ ⵢⵓⴼⵏ ⴳ ⵍⵎⵖⵔⵉⴱ ⴳ ⵉⵎⵏⵖⴰⵏ.",
        step2: "ⵉⵅⵚⵚⴰ ⴽ ⴰⴷ ⵜⵉⵍⵉⴷ ⴼⴰⵢⵇ 16 ⵉⵙⴳⴳⴰⵙⵏ, ⵜⵉⵍⵉⴷ ⴷ ⴰⵎⵖⵔⵉⴱⵉ, ⵓⵔ ⴷⴰⵔⴽ ⴰⴽⵓⴷ ⵜⵙⵔⵓⵏⵜ ⵎⵉⵏⵣⵉ ⵜⵓⵙⴽⵉⵡⵉⵏ ⵜⵜⵡⴰⴱⴷⴰⵔⵏⵜ.",
        step3: "ⵉⵅⵚⵚⴰ ⴽ ⴰⴷ ⵜⵉⵍⵉⴷ ⵢⵓⵊⴷⵏ ⵉ ⵓⵎⵏⵖⵉ, ⵜⵥⵓⵥⵥⴷ ⵙ ⵊⵊⵀⴷ, ⵜⵙⴽⵏⴷ ⵉ ⵎⴰⵕⵕⴰ ⵜⵓⵡⵡⵓⵔⴰ ⵏⵏⴽ ⴳ ⵡⵓⵔⴰⵔⵏ."
      }
    },
    // PrizePool
    prizePool: {
      description: "250,000 ⴷⵔⵀⵎ ⴳ ⵓⵔⴰⵔ, ⵖⴰⵙ ⵙⴽⵏⴰⵖ ⴷ ⵎⴰ ⴷⴰⵔⴽ. ⵔⴱⵃ ⴷ ⵜⵉⵍⵉⴷ ⵜⴰⵏⵙⵙⵉⵅⴼⵜ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ ⴳ ⵜⵎⴰⵣⵉⵔⵜ ⵎⴰⵕⵕⴰ.",
      title: "ⵔⴱⵃ ⴷ ⵜⵉⵍⵉⴷ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ",
      totalPrizePool: "ⴰⵙⵎⵓⵏ ⵏ ⵜⵏⴼⵓⵍⵉⵏ",
      places: {
        first: "ⴰⴷⵖⴰⵔ ⴰⵎⵣⵡⴰⵔⵓ",
        second: "ⴰⴷⵖⴰⵔ ⵡⵉⵙⵙ ⵙⵉⵏ",
        third: "ⴰⴷⵖⴰⵔ ⵡⵉⵙⵙ ⴽⵕⴰⴹ"
      }
    },
    // ⵜⴰⴷⵓⵍⵉⵏ ⵏ ⵓⵖⴰⵡⴰⵙ
    gameDetails: {
      championship: "ⴰⵎⵏⴰⵢ",
      tournamentFormat: "ⴰⵎⵙⴰⵔⵓⵜ ⵏ ⵓⵎⵏⴰⵢ",
      description: "ⴰⴳⵍⴰⵎ",
      requirements: "ⵉⵙⵓⵜⴰⵍ",
      phases: "ⵜⵉⵎⵏⴰⴹⵉⵏ ⵏ ⵓⵎⵏⴰⵢ",
      prizePool: "ⵜⵉⵍⴰⵍⵉⵏ",
      prizePoolTBA: "ⵜⵉⵍⴰⵍⵉⵏ ⴰⴷ ⵜⵜⵡⴰⴱⴰⵔⵔⵀⵏⵜ",
      rules: "ⵉⵏⴳⵔⴰⵡⵏ",
      close: "ⵔⴳⵍ",
      unavailable: "ⵜⴰⵍⵖⴰ ⵓⵔ ⵜⵍⵍⴰ",
      comingSoon: "ⵜⴰⴷⵓⵍⵉ ⴰⴷ ⴷ ⵜⴰⵙⴽ ⵎⴰⵢⴷ",
      tbd: "ⴰⴷ ⵉⵜⵜⵡⴰⵙⵡⵓⵔⵉ",
      rulesComingSoon: "ⵉⵏⴳⵔⴰⵡⵏ ⵏ ⵓⵎⵏⴰⵢ ⴰⴷ ⵜⵜⵡⴰⴱⴰⵔⵔⵀⵏ ⵎⴰⵢⴷ"
    },
    
    // Game Ad
    gameAd: {
      title: "ⵓⵔⴰⵔ ⴰⵎⵥⵥⵢⴰⵏ",
      instructions: "ⵙⵎⵓⵏ ⵜⵉⵏⵇⵉⴹⵉⵏ ⵇⴱⵍ ⴰⴷ ⵉⴼⴼⵖ ⵓⴽⵓⴷ!",
      play: "ⵓⵔⴰⵔ",
      sponsored: "ⵙ ⵜⴷⵍⵍⴰⵙⵜ ⵏ ⵉⵎⴷⵓⴽⴽⴰⵍ ⵏⵏⴻⵖ",
      score: "ⵜⵉⵏⵇⵉⴹⵉⵏ",
      time: "ⴰⴽⵓⴷ",
      gameOver: "ⵉⴽⵎⵎⵍ ⵓⵔⴰⵔ",
      yourScore: "ⵜⵉⵏⵇⵉⴹⵉⵏ ⵏⵏⴻⴽ",
      playAgain: "ⵓⵔⴰⵔ ⴷⴰⵖ",
      viewOffer: "ⵥⵔ ⴰⵙⵜⴰⵢ"
    }
  },
  
  // Officiel (mélange anglais et darija)
  of: {
    // Navigation
    nav: {
      discover: "Discover",
      passGamers: "Gamers Pass",
      tri9lGlory: "Tri9 l Glory",
      prizePool: "Prize Pool",
      proPath: "Path to Pro",
      documentation: "Documentation",
      joinUs: "Join Us",
      playFree: "Play Free",
      login: "Connecta",
      language: "Logha",
      closeMenu: "Sed l menu",
      openMenu: "7el l menu",
      backToTop: "Rja3 lfou9"
    },
    // Sections
    common: {
      learnMore: "3raf aktar",
      downloadNow: "Download daba",
      selectPlan: "Khtar",
      seeAll: "Chouf kolchi",
      contactUs: "Contact-ina",
      readMore: "9ra l mazid"
    },
    // About
    about: {
      title: "Tournament Games",
      subtitle: "Challenge the best players in Morocco across 4 flagship esports games",
      details: "Details",
      tapForInfo: "Tap for more info",
      clickPrompt: "CLICK"
    },
    // PassGamers
    passGamers: {
      title: "GAMERS PASS",
      subtitle: "Reserved ghir l players li msajlin f platform MGE. Activiw l pass dyalkom bash t7ello advantages exclusives.",
      sponsoredBy: "Official initiative men Ministry of Youth, Culture and Communication",
      benefits: {
        tickets: {
          title: "Event Tickets",
          description: "Get tickets b lash bash t participate f exclusive gaming events w tournaments."
        },
        offers: {
          title: "Exclusive Offers",
          description: "Access promotions w réductions reserved ghir l Gamers Pass holders."
        },
        status: {
          title: "Premium Status",
          description: "Profiter men privileged status w increased visibility f gaming community."
        },
        community: {
          title: "Dedicated Community",
          description: "Join network exclusive men passionate players bash t share w progress m3a b3diyatkom."
        }
      },
      howItWorks: {
        title: "Kifach kay khdm?",
        step1: {
          title: "Sign up",
          description: "Create account f platform MGE w complete profil dyalk"
        },
        step2: {
          title: "Khtar l pass dyalk",
          description: "Select formula li katnasb needs dyalk"
        },
        step3: {
          title: "Access advantages",
          description: "Check dashboard dyalk bash tchouf l offers available"
        }
      },
      selectPlan: "Select your formula",
      recommended: "RECOMMENDED",
      selectedPlan: "Selected: {name}",
      choosePlan: "Choose {name}",
      activationInfo: "L pass dyalk kay active immediately after inscription",
      securityInfo: "Secure payment w conditions d'utilisation conformes aux directives ministérielles",
      plans: {
        monthly: {
          name: "Monthly",
          price: "29,99 €",
          commitment: "Bla engagement",
          features: {
            0: "Access l all MGE tournaments",
            1: "Priority matchmaking",
            2: "2 free tickets l gaming events",
            3: "Exclusive promotions f MGE shop"
          }
        },
        quarterly: {
          name: "Quarterly",
          price: "74,99 €",
          commitment: "Engagement 3 months",
          features: {
            0: "All advantages men Monthly plan",
            1: "10 VIP tickets per month l events",
            2: "Priority access l nouveautés",
            3: "Exclusive réductions 3la products partenaires"
          }
        },
        annual: {
          name: "Annual",
          price: "249,99 €",
          commitment: "Annual engagement",
          features: {
            0: "All advantages men Quarterly plan",
            1: "Unlimited access l standard events",
            2: "Meetings m3a professional players",
            3: "Gold Badge 3la profil dyalk",
            4: "Support dédié 24/7"
          }
        }
      }
    },
    // Download Page
    downloads: {
      title: "Documentation Center",
      subtitle: "Download all official documents w resources l tournament participants",
      tabs: {
        all: "All Documents",
        rules: "Official Rules",
        tickets: "Golden Tickets & Contests",
        guides: "Participant Guides"
      },
      new: "NEW",
      downloadButton: "Download",
      documents: {
        rulebook: {
          title: "MGE 2025 Official Rulebook",
          description: "All rules w conditions bash t participate f tournaments w events d Morocco Gaming Expo 2025."
        },
        goldenTicket: {
          title: "Golden Ticket Contest 2025",
          description: "Instructions bash t participate f Golden Ticket contest w rbe7 VIP access l all MGE events."
        },
        participationGuide: {
          title: "Participant Guide",
          description: "Complete guide bash t prepare participation dyalk f competitions w get the most men MGE experience."
        }
      },
      helpBanner: {
        title: "Need help m3a documents?",
        description: "If you have questions 3la regulations, tournament formats or any other document, our team is here to help.",
        contactButton: "Contact support"
      }
    },
    // Footer
    footer: {
      description: "Morocco Gaming Expo (MGE) is the largest gaming w esport event f Morocco, bringing together best players l high-level competitions w celebrating the passion for video games.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      links: {
        home: "Home",
        tournaments: "Tournaments",
        prizes: "Prizes",
        contact: "Contact"
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Use"
      },
      copyright: "© {year} Morocco Gaming Expo. All rights reserved. MGE w associated logos are registered trademarks."
    },
    // Pro Path
    proPath: {
      title: "New Path to Pros",
      description: "Morocco Gaming Expo is opening structured path to professionalism l Moroccan esport talents. Start your career as professional player with our 4-step program.",
      sponsoredBy: "Powered by Ministry of Youth, Culture and Communication",
      ctaButton: "Start my pro career",
      supportedGames: "Program available l games Free Fire, Valorant, Street Fighter w FC 25",
      steps: {
        aim: {
          title: "L3eb f balanced matches",
          description: "Join our advanced matchmaking system bash t participate f balanced matches w raise your Elo while perfecting your skills m3a players at your level."
        },
        ladder: {
          title: "Climb the rankings",
          description: "Progress f our competitive rankings, win rewards at each level w build your reputation in Moroccan esport ecosystem with your performances."
        },
        rank: {
          title: "Reach top of rankings",
          description: "Elite players who reach the highest ranks qualify l FPL Challenger, exclusive springboard to professional league where you can prove your value."
        },
        fpl: {
          title: "Play against top professionals",
          description: "In FPL (Faceit Pro League), compete daily m3a professional players, attract the attention of teams w recruiters, w launch your career in professional esport."
        }
      }
    },
    // FAQ
    faq: {
      title: "FAQ",
      subtitle: "Find quickly answers l your questions about tournaments w participation f MGE",
      searchPlaceholder: "Search a question...",
      noResults: "No results l \"{searchTerm}\"",
      tryAgain: "Try another term or browse all questions below",
      resultsCount: "{count} {count, plural, one {result} other {results}} l \"{searchTerm}\"",
      category: "Category",
      noAnswerFound: "Ma l9itich l answer to your question?",
      contactUs: "Contact us directly",
      categories: {
        registration: {
          title: "Tournament Registration",
          questions: {
            0: {
              question: "Kifach n register l MGE tournament?",
              answer: "To register l MGE tournament, log in to your account on the platform, select the tournament you're interested in, and follow the registration instructions. Make sure to meet all eligibility criteria w submit your registration before deadline."
            },
            1: {
              question: "Which documents are necessary l registration?",
              answer: "For most tournaments, you'll need your ID (CIN or passport), your game identifiers, and in some cases parental authorization if you're a minor. Specific tournaments may have additional requirements detailed in their regulations."
            },
            2: {
              question: "Wach n9der n register as a team?",
              answer: "Yes, for team games like Free Fire or Valorant, you must register your entire team. A captain creates the team on the platform w invites other members. All members must have an active MGE account w accept the invitation to finalize registration."
            }
          }
        }
      }
    },
    // Hero
    hero: {
      title: "L3eb M3ana f Morocco Gaming Expo",
      subtitle: {
        part1: "Join the elite",
        part2: "of Moroccan gaming in an",
        part3: "epic competition",
        part4: "Face the best players, win exceptional prizes w write your name in esport history."
      },
      playNow: "Play Now",
      bottomTitle: "ELEAGUE",
      worldToMorocco: "au Maroc"
    },
    // Tri9lGlory
    tri9lGlory: {
      title: "TrI9 l glory",
      description: "Had tri9 machi sahla, walakin fiha l'honneur w l'gloire. Ghadi tel3bo m3a ahsan les joueurs f lMaghrib, w twerriw lblad kamla chno 3andkom.",
      steps: {
        step1: "L3ba tactique 3la PC, khasek tkoun mzian f l'aim w strategy. Ghadi twa9ef ahsan les joueurs f lMaghrib f des duels.",
        step2: "Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t tdi3o hit les places mahdoudin.",
        step3: "Khasek tkoun faye9 16 ans, tkoun maghribi, w ma3andekch lwe9t tdi3o hit les places mahdoudin."
      }
    },
    // PrizePool
    prizePool: {
      description: "250,000 dh f l'jeu, ghir werrina chno 3andek. Rbe7 w welli une légende m3roufa f lblad kamla.",
      title: "Win w become famous",
      totalPrizePool: "Total Prize Pool",
      places: {
        first: "First place",
        second: "Second place",
        third: "Third place"
      }
    },
    // English/Darija mix game details
    gameDetails: {
      championship: "Championship",
      tournamentFormat: "Format Dyal Tournament",
      description: "Description",
      requirements: "Requirements",
      phases: "Phases Dyal Tournament",
      prizePool: "Prizes",
      prizePoolTBA: "Prizes ghadi yetannounceaw",
      rules: "Rules",
      close: "Close",
      unavailable: "Information unavailable",
      comingSoon: "Details coming soon",
      tbd: "To be determined",
      rulesComingSoon: "Tournament rules will be announced soon"
    },
    
    // Game Ad
    gameAd: {
      title: "MINI-GAME",
      instructions: "Collect points before time runs out!",
      play: "PLAY",
      sponsored: "Sponsored by OUR PARTNERS",
      score: "Score",
      time: "Time",
      gameOver: "GAME OVER",
      yourScore: "Your score",
      playAgain: "PLAY AGAIN",
      viewOffer: "VIEW OFFER"
    }
  }
};

// Fonction pour récupérer une traduction spécifique
export const getTranslation = (language, key, defaultValue = '') => {
  try {
    // Diviser la clé par des points pour accéder aux propriétés imbriquées
    const keys = key.split('.');
    let result = translations[language];
    
    // Parcourir les niveaux de l'objet
    for (let i = 0; i < keys.length; i++) {
      if (result && result[keys[i]] !== undefined) {
        result = result[keys[i]];
      } else {
        // Clé non trouvée, retourner la valeur par défaut
        return defaultValue || key;
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Error getting translation for ${key}:`, error);
    return defaultValue || key;
  }
};

export default translations; 