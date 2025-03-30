import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ressources de traduction
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        discover: "Discover",
        passGamers: "Pass Gamers",
        documentation: "Documentation",
        faq: "FAQ",
        tri9lGlory: "Road to Glory",
        prizePool: "Prize Pool",
        playFree: "Play Free",
        login: "Log In",
        proPath: "Pro Path"
      },
      // Hero 
      hero: {
        title: "Morocco Gaming Expo",
        subtitle: {
          part1: "Welcome to the ultimate gaming experience",
          part2: "where legends are born",
          part3: "and champions rise",
          part4: "Join us for an unforgettable journey into the world of gaming"
        },
        bottomTitle: "MGE 2025",
        getStarted: "Get Started",
        playNow: "PLAY NOW"
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "Road to Glory",
        description: "Follow the path that will take you from amateur to professional esports player",
        steps: {
          step1: "BEGINNER - SIGN UP: Create your account on our official platform. It's quick, easy, and free!",
          step2: "CHALLENGER - COMPETE: Participate in online qualifiers and show your skills against other players.",
          step3: "CHAMPION - RISE: The best players will advance to the finals and have a chance to become champions."
        }
      },
      // PrizePool section
      prizePool: {
        title: "Prize Pool",
        description: "Compete for prestigious prizes and recognition",
        totalPrizePool: "Total Prize Pool",
        seasonRewards: "Official 2025 Season Rewards",
        additionalInfo: "Additional prizes may be awarded throughout the competition including gaming gear, merchandise, and exclusive opportunities.",
        places: {
          first: "1st Place",
          second: "2nd Place",
          third: "3rd Place"
        }
      },
      // About
      about: {
        title: "Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure",
        subtitle: "Welcome to the largest esports tournament in Morocco. Show us what you've got in the games you excel at.",
        clickPrompt: "CLICK",
        description: "Morocco Gaming Expo is the premier gaming event in Morocco, showcasing the latest in video game technology, esports competitions, and gaming culture."
      },
      // Features
      features: {
        title: "What We Offer",
        tournaments: "Tournaments",
        tournamentsDesc: "Compete in high-stakes tournaments with amazing prizes",
        community: "Community",
        communityDesc: "Join a thriving community of passionate gamers",
        experience: "Experience",
        experienceDesc: "Experience the latest games and cutting-edge technology"
      },
      // Events
      events: {
        title: "Upcoming Events",
        viewAll: "View All Events"
      },
      // Footer
      footer: {
        description: "Morocco Gaming Expo is the premier gaming event in Morocco, showcasing the latest in video gaming, esports competitions, and creating opportunities for talented gamers.",
        quickLinks: "Quick Links",
        links: {
          home: "Home",
          tournaments: "Tournaments",
          prizes: "Prizes",
          contact: "Contact"
        },
        followUs: "Follow Us",
        sponsoredBy: "Under the patronage of",
        copyright: "© {year} Morocco Gaming Expo. All rights reserved.",
        legal: {
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        dashboard: "User Dashboard"
      },
      // PassGamers
      passGamers: {
        title: "PASS GAMERS",
        subtitle: "Reserved for players registered on the MGE platform. Activate your pass to unlock exclusive benefits.",
        officialInitiative: "Official initiative of the Ministry of Youth, Culture and Communication",
        howItWorks: "How it works?",
        step1: "Sign Up",
        step1Desc: "Create an account on the MGE platform and complete your profile",
        step2: "Choose your pass",
        step2Desc: "Select the plan that suits your needs",
        step3: "Access benefits",
        step3Desc: "Check your dashboard to see all available offers",
        selectPlan: "Select your plan",
        monthlyPlan: "Monthly",
        quarterlyPlan: "Quarterly",
        annualPlan: "Annual",
        recommended: "RECOMMENDED",
        choose: "Choose",
        selected: "Selected:",
        noCommitment: "No commitment",
        quarterlyCommitment: "3-month commitment",
        annualCommitment: "Annual commitment",
        passActive: "Your pass becomes active immediately after registration",
        securePayment: "Secure payment and terms of use in accordance with ministerial guidelines",
        // Benefits
        benefits: {
          tickets: {
            title: "Event Tickets",
            description: "Get free tickets to participate in exclusive gaming events and tournaments."
          },
          offers: {
            title: "Exclusive Offers",
            description: "Access promotions and discounts reserved only for Pass Gamers holders."
          },
          status: {
            title: "Premium Status",
            description: "Enjoy a privileged status and increased visibility in the gaming community."
          },
          community: {
            title: "Dedicated Community",
            description: "Join an exclusive network of passionate players to share and progress together."
          }
        },
        // FAQ
        faq: {
          title: "FAQ",
          subtitle: "Find quick answers to your questions about MGE tournaments and participation",
          searchPlaceholder: "Search a question...",
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
                  answer: "For most tournaments, you'll need your ID (national ID or passport), your game identifiers, and in some cases parental authorization if you're a minor. Specific tournaments may have additional requirements detailed in their regulations."
                },
                2: {
                  question: "Can I register as a team?",
                  answer: "Yes, for team games like Free Fire or Valorant, you need to register your entire team. A captain creates the team on the platform and invites other members. All members must have an active MGE account and accept the invitation to finalize registration."
                }
              }
            },
            format: {
              title: "Tournament Format",
              questions: {
                0: {
                  question: "What formats are used in MGE tournaments?",
                  answer: "MGE tournaments use various formats depending on the game and competition level. Most tournaments follow a group stage followed by single or double elimination brackets. The specific format for each tournament is detailed in the tournament information page."
                },
                1: {
                  question: "How are tournament groups determined?",
                  answer: "Tournament groups are typically determined through a seeding system based on player or team rankings, or through a random draw. For major tournaments, there may be qualification phases that determine seeding."
                },
                2: {
                  question: "What happens in case of a tie?",
                  answer: "Tiebreaker rules vary by game and tournament. Generally, we use head-to-head results, score differentials, or additional tiebreaker matches. The specific tiebreaker rules are outlined in each tournament's rulebook."
                }
              }
            },
            prizes: {
              title: "Prizes and Rewards",
              questions: {
                0: {
                  question: "What prizes can I win at MGE tournaments?",
                  answer: "Prizes vary by tournament and include cash prizes, gaming equipment, merchandise, and qualification spots for international tournaments. The total prize pool and distribution are always clearly stated on the tournament information page."
                },
                1: {
                  question: "How are prize payments processed?",
                  answer: "Cash prizes are typically paid via bank transfer within 30-60 days after the tournament ends. You'll need to provide valid banking information and may need to complete tax forms depending on the prize amount and your country of residence."
                },
                2: {
                  question: "Are there participation rewards even if I don't win?",
                  answer: "Yes, many MGE tournaments offer participation rewards such as digital items, game currency, or exclusive in-game cosmetics. Additionally, all participants receive a certificate of participation which may be valuable for future esports endeavors."
                }
              }
            },
            rules: {
              title: "Rules and Regulations",
              questions: {
                0: {
                  question: "Where can I find the official rules for tournaments?",
                  answer: "Official tournament rules can be found on the tournament information page, in the Documents section of our website, or directly emailed to registered participants. Make sure to read the rules thoroughly before competing."
                },
                1: {
                  question: "What happens if a player breaks the rules?",
                  answer: "Rule violations are taken seriously and can result in warnings, point deductions, match forfeitures, disqualification, or in severe cases, tournament bans. Our admin team reviews all reported violations and makes decisions based on the severity of the infraction."
                },
                2: {
                  question: "Can I use my own equipment at LAN tournaments?",
                  answer: "For most LAN tournaments, you can bring your own keyboard, mouse, headset, and mousepad. However, you'll typically need to use the computers, monitors, and consoles provided by the tournament organizers. Specific equipment rules are detailed in each tournament's rulebook."
                }
              }
            },
            logistics: {
              title: "Tournament Logistics",
              questions: {
                0: {
                  question: "When and where do MGE tournaments take place?",
                  answer: "MGE tournaments take place throughout the year, with online qualifiers leading to in-person finals at various venues in Morocco. The main MGE event is held annually, typically in Spring. All dates and locations are announced on our website and social media channels."
                },
                1: {
                  question: "Do I need to bring anything to in-person tournaments?",
                  answer: "For in-person tournaments, bring your ID, a copy of your registration confirmation, your personal peripherals (if allowed), and comfortable clothing. We recommend bringing a water bottle and snacks as well."
                },
                2: {
                  question: "Is there accommodation provided for participants?",
                  answer: "For major tournaments, we offer discounted hotel rates for registered participants. For some invitation-only events, accommodation may be provided. Check the tournament information page for details on accommodation arrangements."
                }
              }
            }
          }
        }
      },
      // FAQ
      faq: {
        title: "FAQ",
        subtitle: "Find quick answers to your questions about MGE tournaments and participation",
        searchPlaceholder: "Search a question...",
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
                answer: "For most tournaments, you'll need your ID (national ID or passport), your game identifiers, and in some cases parental authorization if you're a minor. Specific tournaments may have additional requirements detailed in their regulations."
              },
              2: {
                question: "Can I register as a team?",
                answer: "Yes, for team games like Free Fire or Valorant, you need to register your entire team. A captain creates the team on the platform and invites other members. All members must have an active MGE account and accept the invitation to finalize registration."
              }
            }
          },
          format: {
            title: "Tournament Format",
            questions: {
              0: {
                question: "What formats are used in MGE tournaments?",
                answer: "MGE tournaments use various formats depending on the game and competition level. Most tournaments follow a group stage followed by single or double elimination brackets. The specific format for each tournament is detailed in the tournament information page."
              },
              1: {
                question: "How are tournament groups determined?",
                answer: "Tournament groups are typically determined through a seeding system based on player or team rankings, or through a random draw. For major tournaments, there may be qualification phases that determine seeding."
              },
              2: {
                question: "What happens in case of a tie?",
                answer: "Tiebreaker rules vary by game and tournament. Generally, we use head-to-head results, score differentials, or additional tiebreaker matches. The specific tiebreaker rules are outlined in each tournament's rulebook."
              }
            }
          },
          prizes: {
            title: "Prizes and Rewards",
            questions: {
              0: {
                question: "What prizes can I win at MGE tournaments?",
                answer: "Prizes vary by tournament and include cash prizes, gaming equipment, merchandise, and qualification spots for international tournaments. The total prize pool and distribution are always clearly stated on the tournament information page."
              },
              1: {
                question: "How are prize payments processed?",
                answer: "Cash prizes are typically paid via bank transfer within 30-60 days after the tournament ends. You'll need to provide valid banking information and may need to complete tax forms depending on the prize amount and your country of residence."
              },
              2: {
                question: "Are there participation rewards even if I don't win?",
                answer: "Yes, many MGE tournaments offer participation rewards such as digital items, game currency, or exclusive in-game cosmetics. Additionally, all participants receive a certificate of participation which may be valuable for future esports endeavors."
              }
            }
          },
          rules: {
            title: "Rules and Regulations",
            questions: {
              0: {
                question: "Where can I find the official rules for tournaments?",
                answer: "Official tournament rules can be found on the tournament information page, in the Documents section of our website, or directly emailed to registered participants. Make sure to read the rules thoroughly before competing."
              },
              1: {
                question: "What happens if a player breaks the rules?",
                answer: "Rule violations are taken seriously and can result in warnings, point deductions, match forfeitures, disqualification, or in severe cases, tournament bans. Our admin team reviews all reported violations and makes decisions based on the severity of the infraction."
              },
              2: {
                question: "Can I use my own equipment at LAN tournaments?",
                answer: "For most LAN tournaments, you can bring your own keyboard, mouse, headset, and mousepad. However, you'll typically need to use the computers, monitors, and consoles provided by the tournament organizers. Specific equipment rules are detailed in each tournament's rulebook."
              }
            }
          },
          logistics: {
            title: "Tournament Logistics",
            questions: {
              0: {
                question: "When and where do MGE tournaments take place?",
                answer: "MGE tournaments take place throughout the year, with online qualifiers leading to in-person finals at various venues in Morocco. The main MGE event is held annually, typically in Spring. All dates and locations are announced on our website and social media channels."
              },
              1: {
                question: "Do I need to bring anything to in-person tournaments?",
                answer: "For in-person tournaments, bring your ID, a copy of your registration confirmation, your personal peripherals (if allowed), and comfortable clothing. We recommend bringing a water bottle and snacks as well."
              },
              2: {
                question: "Is there accommodation provided for participants?",
                answer: "For major tournaments, we offer discounted hotel rates for registered participants. For some invitation-only events, accommodation may be provided. Check the tournament information page for details on accommodation arrangements."
              }
            }
          }
        }
      },
      // Join The Adventure section
      joinAdventure: {
        title: "JOIN THE ADVENTURE",
        steps: {
          step1: {
            number: "01",
            title: "BEGINNER",
            action: "SIGN UP",
            description: "Create your account on our official platform.",
            detail: "It's quick, easy, and free!"
          },
          step2: {
            number: "02",
            title: "CHALLENGER",
            action: "COMPETE",
            description: "Participate in tournaments and qualifiers.",
            detail: "Show your skills!"
          },
          step3: {
            number: "03",
            title: "CHAMPION",
            action: "RISE",
            description: "Reach the finals and become a champion.",
            detail: "Glory awaits!"
          }
        }
      },
      // Documentation Center
      documentationCenter: {
        title: "Documentation Center",
        description: "Access our comprehensive documentation center to download official regulations, participant guides, and golden tickets for competitions."
      }
    }
  },
  fr: {
    translation: {
      // Navigation
      nav: {
        discover: "Découvrir",
        passGamers: "Pass Gamers",
        documentation: "Documentation",
        faq: "FAQ",
        tri9lGlory: "Route de la Gloire",
        prizePool: "Prix",
        playFree: "Jouer Gratuitement",
        login: "Connexion",
        proPath: "Parcours Pro",
        language: "Langue",
        followUs: "Suivez-nous",
        mainNav: "Navigation principale",
        backToTop: "Retour en haut",
        closeMenu: "Fermer le menu",
        openMenu: "Ouvrir le menu"
      },
      // Hero 
      hero: {
        title: "MGE 2025",
        bottomTitle: "GAMING",
        playNow: "JOUER MAINTENANT",
        subtitle: {
          part1: "UN TOURNOI OFFICIEL",
          part2: "POUR LES JEUNES TALENTS",
          part3: "DU MAROC",
          part4: "ORGANISEE PAR LE MINISTERE DE LA JEUNESSE, DE LA CULTURE ET DE LA COMMUNICATION DU ROYAUME DU MAROC"
        }
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "Chemin de Gloire",
        description: "Suivez le parcours qui vous mènera du statut d'amateur à celui de joueur professionnel d'esport",
        steps: {
          step1: "DÉBUTANT - INSCRIVEZ-VOUS : Créez votre compte sur notre plateforme officielle. C'est rapide, facile et gratuit !",
          step2: "CHALLENGER - PARTICIPEZ : Participez aux qualifications en ligne et montrez vos compétences face à d'autres joueurs.",
          step3: "CHAMPION - ÉVOLUEZ : Les meilleurs joueurs accéderont aux finales et auront une chance de devenir champions."
        }
      },
      // PrizePool section
      prizePool: {
        title: "Prix à Gagner",
        description: "Compétitionnez pour des prix prestigieux et la reconnaissance",
        totalPrizePool: "Cagnotte Totale",
        seasonRewards: "Récompenses Officielles Saison 2025",
        additionalInfo: "Des prix supplémentaires peuvent être attribués tout au long de la compétition, notamment du matériel gaming, des produits dérivés et des opportunités exclusives.",
        places: {
          first: "1ère Place",
          second: "2ème Place",
          third: "3ème Place"
        }
      },
      // About
      about: {
        title: "Déc<b>o</b>uvrez la plus grande <br /> aventure parta<b>g</b>ée au Maroc",
        subtitle: "Bienvenue au plus grand tournoi d'e-sport du Maroc. Montrez-nous ce que vous avez dans les jeux où vous excellez.",
        clickPrompt: "CLIQUEZ",
        description: "Morocco Gaming Expo est le principal événement de jeux vidéo au Maroc, présentant les dernières technologies, des compétitions d'esport et la culture du gaming."
      },
      // Features
      features: {
        title: "Ce Que Nous Offrons",
        tournaments: "Tournois",
        tournamentsDesc: "Participez à des tournois à forts enjeux avec des prix incroyables",
        community: "Communauté",
        communityDesc: "Rejoignez une communauté dynamique de joueurs passionnés",
        experience: "Expérience",
        experienceDesc: "Découvrez les derniers jeux et technologies de pointe"
      },
      // Events
      events: {
        title: "Événements à Venir",
        viewAll: "Voir Tous les Événements"
      },
      // Footer
      footer: {
        description: "Morocco Gaming Expo est l'événement gaming premier au Maroc, présentant les dernières nouveautés en matière de jeux vidéo, de compétitions esport, et créant des opportunités pour les joueurs talentueux.",
        quickLinks: "Liens Rapides",
        links: {
          home: "Accueil",
          tournaments: "Tournois",
          prizes: "Prix",
          contact: "Contact"
        },
        followUs: "Suivez-nous",
        sponsoredBy: "Sous le patronage du",
        copyright: "© {year} Morocco Gaming Expo. Tous droits réservés.",
        legal: {
          privacy: "Politique de Confidentialité",
          terms: "Conditions d'Utilisation"
        },
        dashboard: "Espace Utilisateur"
      },
      // PassGamers
      passGamers: {
        title: "PASS GAMERS",
        subtitle: "Réservé aux joueurs inscrits sur la plateforme MGE. Activez votre pass pour débloquer des avantages exclusifs.",
        officialInitiative: "Initiative officielle du Ministère de la Jeunesse, de la Culture et de la Communication",
        howItWorks: "Comment ça marche ?",
        step1: "Inscrivez-vous",
        step1Desc: "Créez un compte sur la plateforme MGE et complétez votre profil",
        step2: "Choisissez votre pass",
        step2Desc: "Sélectionnez la formule qui correspond à vos besoins",
        step3: "Accédez aux avantages",
        step3Desc: "Consultez votre tableau de bord pour voir toutes vos offres disponibles",
        selectPlan: "Sélectionnez votre formule",
        monthlyPlan: "Mensuel",
        quarterlyPlan: "Trimestriel",
        annualPlan: "Annuel",
        recommended: "RECOMMANDÉ",
        choose: "Choisir",
        selected: "Sélectionné:",
        noCommitment: "Sans engagement",
        quarterlyCommitment: "Engagement 3 mois",
        annualCommitment: "Engagement annuel",
        passActive: "Votre pass devient actif immédiatement après l'inscription",
        securePayment: "Paiement sécurisé et conditions d'utilisation conformes aux directives ministérielles",
        // Benefits
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
            },
            format: {
              title: "Format des Tournois",
              questions: {
                0: {
                  question: "Quels formats sont utilisés dans les tournois MGE ?",
                  answer: "Les tournois MGE utilisent différents formats selon le jeu et le niveau de compétition. La plupart des tournois suivent une phase de groupes suivie de brackets à élimination simple ou double. Le format spécifique de chaque tournoi est détaillé sur la page d'information du tournoi."
                },
                1: {
                  question: "Comment sont déterminés les groupes des tournois ?",
                  answer: "Les groupes sont généralement déterminés par un système de têtes de série basé sur le classement des joueurs ou des équipes, ou par tirage au sort. Pour les tournois majeurs, il peut y avoir des phases de qualification qui déterminent le classement."
                },
                2: {
                  question: "Que se passe-t-il en cas d'égalité ?",
                  answer: "Les règles de départage varient selon le jeu et le tournoi. En général, nous utilisons les résultats des confrontations directes, les différentiels de score ou des matchs de départage supplémentaires. Les règles spécifiques sont détaillées dans le règlement de chaque tournoi."
                }
              }
            },
            prizes: {
              title: "Prix et Récompenses",
              questions: {
                0: {
                  question: "Quels prix puis-je gagner aux tournois MGE ?",
                  answer: "Les prix varient selon le tournoi et comprennent des prix en espèces, du matériel de gaming, des produits dérivés et des places de qualification pour des tournois internationaux. La dotation totale et sa répartition sont toujours clairement indiquées sur la page d'information du tournoi."
                },
                1: {
                  question: "Comment sont traités les paiements des prix ?",
                  answer: "Les prix en espèces sont généralement payés par virement bancaire dans les 30 à 60 jours suivant la fin du tournoi. Vous devrez fournir des informations bancaires valides et pourrez avoir à remplir des formulaires fiscaux selon le montant du prix et votre pays de résidence."
                },
                2: {
                  question: "Y a-t-il des récompenses de participation même si je ne gagne pas ?",
                  answer: "Oui, de nombreux tournois MGE offrent des récompenses de participation telles que des objets numériques, de la monnaie de jeu ou des cosmétiques exclusifs en jeu. De plus, tous les participants reçoivent un certificat de participation qui peut être valorisant pour de futures carrières esportives."
                }
              }
            },
            rules: {
              title: "Règles et Règlements",
              questions: {
                0: {
                  question: "Où puis-je trouver les règles officielles des tournois ?",
                  answer: "Les règles officielles des tournois se trouvent sur la page d'information du tournoi, dans la section Documents de notre site web, ou sont directement envoyées par email aux participants inscrits. Assurez-vous de lire attentivement les règles avant de participer."
                },
                1: {
                  question: "Que se passe-t-il si un joueur enfreint les règles ?",
                  answer: "Les violations des règles sont prises au sérieux et peuvent entraîner des avertissements, des déductions de points, des forfaits de match, une disqualification ou, dans les cas graves, des interdictions de tournoi. Notre équipe d'administrateurs examine toutes les infractions signalées et prend des décisions basées sur la gravité de l'infraction."
                },
                2: {
                  question: "Puis-je utiliser mon propre équipement lors des tournois LAN ?",
                  answer: "Pour la plupart des tournois LAN, vous pouvez apporter votre propre clavier, souris, casque et tapis de souris. Cependant, vous devrez généralement utiliser les ordinateurs, moniteurs et consoles fournis par les organisateurs. Les règles spécifiques concernant l'équipement sont détaillées dans le règlement de chaque tournoi."
                }
              }
            },
            logistics: {
              title: "Logistique des Tournois",
              questions: {
                0: {
                  question: "Quand et où ont lieu les tournois MGE ?",
                  answer: "Les tournois MGE ont lieu tout au long de l'année, avec des qualifications en ligne menant à des finales en présentiel dans divers lieux au Maroc. L'événement principal MGE se tient annuellement, généralement au printemps. Toutes les dates et lieux sont annoncés sur notre site web et nos réseaux sociaux."
                },
                1: {
                  question: "Dois-je apporter quelque chose aux tournois en présentiel ?",
                  answer: "Pour les tournois en présentiel, apportez votre pièce d'identité, une copie de votre confirmation d'inscription, vos périphériques personnels (si autorisés) et des vêtements confortables. Nous vous recommandons également d'apporter une bouteille d'eau et des collations."
                },
                2: {
                  question: "Y a-t-il un hébergement prévu pour les participants ?",
                  answer: "Pour les tournois majeurs, nous offrons des tarifs d'hôtel réduits pour les participants inscrits. Pour certains événements sur invitation uniquement, l'hébergement peut être fourni. Consultez la page d'information du tournoi pour plus de détails sur les arrangements d'hébergement."
                }
              }
            }
          }
        }
      },
      // FAQ
      faq: {
        title: "FAQ",
        subtitle: "Comment pouvons-nous vous aider?",
        callToAction: "Vous ne trouvez pas de réponse ici? N'hésitez pas à nous contacter!",
        contact: "Contactez-nous",
        categories: {
          general: {
            title: "Général",
            questions: {
              0: {
                question: "Quand et où ont lieu les tournois MGE ?",
                answer: "Les tournois MGE ont lieu tout au long de l'année, avec des qualifications en ligne menant à des finales en présentiel dans divers lieux au Maroc. L'événement principal MGE se tient annuellement, généralement au printemps. Toutes les dates et lieux sont annoncés sur notre site web et nos réseaux sociaux."
              },
              1: {
                question: "Que dois-je apporter aux tournois en présentiel ?",
                answer: "Pour les tournois en présentiel, vous devez apporter une pièce d'identité valide, votre billet/confirmation d'inscription, et tout équipement spécifique mentionné dans les règles du tournoi. Pour les tournois de jeux de combat, nous recommandons d'apporter votre propre manette. Pour plus de détails, consultez les règlements spécifiques à chaque tournoi."
              },
              2: {
                question: "Y a-t-il des hébergements disponibles pour les participants des tournois majeurs ?",
                answer: "Pour les tournois majeurs comme le MGE, nous proposons généralement des partenariats avec des hôtels locaux offrant des tarifs préférentiels aux participants. Les informations sur les options d'hébergement sont communiquées aux participants qualifiés et sont également disponibles sur notre site web avant l'événement."
              }
            }
          },
          // ... reste du code existant ...
        }
      },
      // Join The Adventure section
      joinAdventure: {
        title: "REJOIGNEZ L'AVENTURE",
        steps: {
          step1: {
            number: "01",
            title: "DÉBUTANT",
            action: "INSCRIVEZ-VOUS",
            description: "Créez votre compte sur notre plateforme officielle.",
            detail: "C'est rapide, facile et gratuit !"
          },
          step2: {
            number: "02",
            title: "CHALLENGER",
            action: "PARTICIPEZ",
            description: "Participez aux tournois et qualifications.",
            detail: "Montrez vos compétences !"
          },
          step3: {
            number: "03",
            title: "CHAMPION",
            action: "ÉVOLUEZ",
            description: "Accédez aux finales et devenez champion.",
            detail: "La gloire vous attend !"
          }
        }
      },
      // Documentation Center
      documentationCenter: {
        title: "Centre de Documentation",
        description: "Accédez à notre centre de documentation complet pour télécharger les règlements officiels, guides participant et tickets d'or pour les concours."
      },
      // ProPath
      proPath: {
        title: "NOUVELLE VOIE VERS LES PROS",
        tagline: "Programme Officiel du Ministere de la Jeunesse et des Sports",
        description: "Le Morocco Gaming Expo ouvre une voie structuree vers le professionnalisme pour les talents esport marocains. Progressez des qualifications regionales jusqu'aux finales LAN nationales.",
        cta: "Debuter votre parcours pro",
        nextEvent: "Prochaines qualifications: Mars 2025",
        supportedGames: "Jeux supportes:",
        formatFeatures: "Format de competition",
        learnMore: "En savoir plus",
        statsTitle: "L'engagement du Ministere pour l'Esport Marocain",
        stats: {
          regions: "Regions couvertes",
          regionsDesc: "Tournois qualificatifs dans tout le Royaume",
          games: "Jeux officiels",
          gamesDesc: "Diversite des disciplines esportives",
          players: "Joueurs participants",
          playersDesc: "A la premiere saison nationale",
          finale: "Grande finale LAN",
          finaleDesc: "Evenement national annuel"
        },
        // ... conserver le reste du code existant ...
      }
    }
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        discover: "اكتشف",
        passGamers: "باس جيمرز",
        documentation: "التوثيق",
        faq: "الأسئلة الشائعة",
        tri9lGlory: "الطريق إلى المجد",
        prizePool: "جوائز البطولة",
        playFree: "العب مجانا",
        login: "تسجيل الدخول",
        proPath: "طريق المحترفين",
        language: "اللغة",
        followUs: "تابعنا",
        mainNav: "التنقل الرئيسي",
        backToTop: "العودة إلى الأعلى",
        closeMenu: "إغلاق القائمة",
        openMenu: "فتح القائمة"
      },
      // Hero 
      hero: {
        title: "معرض المغرب للألعاب",
        subtitle: {
          part1: "مرحبًا بكم في تجربة الألعاب المطلقة",
          part2: "حيث تولد الأساطير",
          part3: "ويرتقي الأبطال",
          part4: "انضم إلينا في رحلة لا تُنسى إلى عالم الألعاب"
        },
        bottomTitle: "إم جي إي 2025",
        getStarted: "ابدأ الآن",
        playNow: "العب الآن"
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "طريق المجد",
        description: "اتبع المسار الذي سيأخذك من لاعب هاوٍ إلى لاعب محترف في الرياضات الإلكترونية",
        steps: {
          step1: "مبتدئ - سجل: أنشئ حسابك على منصتنا الرسمية. إنه سريع وسهل ومجاني!",
          step2: "متحدي - نافس: شارك في التصفيات عبر الإنترنت وأظهر مهاراتك ضد لاعبين آخرين.",
          step3: "بطل - ارتقِ: سيتقدم أفضل اللاعبين إلى النهائيات وستتاح لهم فرصة ليصبحوا أبطالاً."
        }
      },
      // PrizePool section
      prizePool: {
        title: "الجوائز",
        description: "نافس على جوائز مرموقة والاعتراف",
        totalPrizePool: "إجمالي الجوائز",
        places: {
          first: "المركز الأول",
          second: "المركز الثاني",
          third: "المركز الثالث"
        }
      },
      // About
      about: {
        title: "اكت<b>ش</b>ف أكبر مغامرة <br /> م<b>ش</b>تركة في العالم",
        subtitle: "مرحبا بكم في أكبر بطولة للرياضات الإلكترونية في المغرب. أرونا ما لديكم في الألعاب التي تتفوقون فيها.",
        clickPrompt: "انقر",
        description: "معرض المغرب للألعاب هو الحدث الرئيسي للألعاب في المغرب، يعرض أحدث تقنيات ألعاب الفيديو ومسابقات الرياضات الإلكترونية وثقافة الألعاب."
      },
      // Features
      features: {
        title: "ما نقدمه",
        tournaments: "البطولات",
        tournamentsDesc: "نافس في بطولات عالية المخاطر مع جوائز مذهلة",
        community: "المجتمع",
        communityDesc: "انضم إلى مجتمع مزدهر من اللاعبين المتحمسين",
        experience: "تجربة",
        experienceDesc: "اختبر أحدث الألعاب والتكنولوجيا المتطورة"
      },
      // Events
      events: {
        title: "الأحداث القادمة",
        viewAll: "عرض جميع الأحداث"
      },
      // Footer
      footer: {
        description: "معرض المغرب للألعاب هو الحدث الرئيسي للألعاب في المغرب، حيث يعرض أحدث التطورات في مجال ألعاب الفيديو ومسابقات الرياضات الإلكترونية، ويخلق فرصًا للاعبين الموهوبين.",
        quickLinks: "روابط سريعة",
        links: {
          home: "الرئيسية",
          tournaments: "البطولات",
          prizes: "الجوائز",
          contact: "اتصل بنا"
        },
        followUs: "تابعنا",
        sponsoredBy: "تحت رعاية",
        copyright: "© {year} معرض المغرب للألعاب. جميع الحقوق محفوظة.",
        legal: {
          privacy: "سياسة الخصوصية",
          terms: "شروط الخدمة"
        },
        dashboard: "لوحة تحكم المستخدم"
      },
      // PassGamers
      passGamers: {
        title: "باس للاعبين",
        subtitle: "مخصص للاعبين المسجلين على منصة MGE. فعّل باسك لفتح المزايا الحصرية.",
        officialInitiative: "مبادرة رسمية من وزارة الشباب والثقافة والاتصال",
        howItWorks: "كيف يعمل؟",
        step1: "سجّل",
        step1Desc: "أنشئ حسابًا على منصة MGE وأكمل ملفك الشخصي",
        step2: "اختر باسك",
        step2Desc: "حدد الخطة التي تناسب احتياجاتك",
        step3: "الوصول إلى المزايا",
        step3Desc: "تحقق من لوحة التحكم الخاصة بك لرؤية جميع العروض المتاحة",
        selectPlan: "اختر خطتك",
        monthlyPlan: "شهري",
        quarterlyPlan: "ربع سنوي",
        annualPlan: "سنوي",
        recommended: "موصى به",
        choose: "اختيار",
        selected: "تم اختيار:",
        noCommitment: "بدون التزام",
        quarterlyCommitment: "التزام 3 أشهر",
        annualCommitment: "التزام سنوي",
        passActive: "يصبح باسك نشطًا على الفور بعد التسجيل",
        securePayment: "دفع آمن وشروط استخدام وفقًا للإرشادات الوزارية",
        // Benefits
        benefits: {
          tickets: {
            title: "تذاكر الفعاليات",
            description: "احصل على تذاكر مجانية للمشاركة في فعاليات الألعاب والبطولات الحصرية."
          },
          offers: {
            title: "عروض حصرية",
            description: "الوصول إلى العروض والخصومات المخصصة فقط لحاملي باس اللاعبين."
          },
          status: {
            title: "وضع متميز",
            description: "استمتع بوضع متميز وظهور أكبر في مجتمع الألعاب."
          },
          community: {
            title: "مجتمع مخصص",
            description: "انضم إلى شبكة حصرية من اللاعبين المتحمسين للمشاركة والتقدم معًا."
          }
        },
        // FAQ
        faq: {
          title: "الأسئلة الشائعة",
          subtitle: "احصل على إجابات سريعة لأسئلتك حول بطولات MGE والمشاركة",
          searchPlaceholder: "ابحث عن سؤال...",
          noResults: "لا توجد نتائج لـ \"{searchTerm}\"",
          tryAgain: "جرب مصطلحًا آخر أو تصفح جميع الأسئلة أدناه",
          resultsCount: "{count} {count, plural, one {نتيجة} few {نتائج} many {نتيجة} other {نتيجة}} لـ \"{searchTerm}\"",
          category: "الفئة",
          noAnswerFound: "لم تجد إجابة لسؤالك؟",
          contactUs: "اتصل بنا مباشرة",
          categories: {
            registration: {
              title: "التسجيل في البطولات",
              questions: {
                0: {
                  question: "كيف أسجل في بطولة MGE؟",
                  answer: "للتسجيل في بطولة MGE، قم بتسجيل الدخول إلى حسابك على المنصة، واختر البطولة التي تهتم بها، واتبع تعليمات التسجيل. تأكد من استيفاء جميع معايير الأهلية وتقديم تسجيلك قبل الموعد النهائي."
                },
                1: {
                  question: "ما هي الوثائق المطلوبة للتسجيل؟",
                  answer: "بالنسبة لمعظم البطولات، ستحتاج إلى بطاقة الهوية الخاصة بك (بطاقة الهوية الوطنية أو جواز السفر)، ومعرفات اللعبة الخاصة بك، وفي بعض الحالات إذن الوالدين إذا كنت قاصرًا. قد يكون للبطولات المحددة متطلبات إضافية مفصلة في لوائحها."
                },
                2: {
                  question: "هل يمكنني التسجيل كفريق؟",
                  answer: "نعم، بالنسبة لألعاب الفرق مثل Free Fire أو Valorant، تحتاج إلى تسجيل فريقك بالكامل. ينشئ القائد الفريق على المنصة ويدعو الأعضاء الآخرين. يجب أن يكون لدى جميع الأعضاء حساب MGE نشط وقبول الدعوة لإتمام التسجيل."
                }
              }
            },
            format: {
              title: "تنسيق البطولة",
              questions: {
                0: {
                  question: "ما هي التنسيقات المستخدمة في بطولات MGE؟",
                  answer: "تستخدم بطولات MGE تنسيقات متنوعة اعتمادًا على اللعبة ومستوى المنافسة. تتبع معظم البطولات مرحلة المجموعات متبوعة بأقواس إقصائية فردية أو مزدوجة. يتم تفصيل التنسيق المحدد لكل بطولة في صفحة معلومات البطولة."
                },
                1: {
                  question: "كيف يتم تحديد مجموعات البطولة؟",
                  answer: "يتم تحديد مجموعات البطولة عادةً من خلال نظام تصنيف يعتمد على تصنيفات اللاعبين أو الفرق، أو من خلال قرعة عشوائية. بالنسبة للبطولات الكبرى، قد تكون هناك مراحل تصفية تحدد التصنيف."
                },
                2: {
                  question: "ماذا يحدث في حالة التعادل؟",
                  answer: "تختلف قواعد كسر التعادل حسب اللعبة والبطولة. بشكل عام، نستخدم نتائج المواجهات المباشرة، أو فروق النقاط، أو مباريات كسر التعادل الإضافية. يتم توضيح قواعد كسر التعادل المحددة في كتيب قواعد كل بطولة."
                }
              }
            },
            prizes: {
              title: "الجوائز والمكافآت",
              questions: {
                0: {
                  question: "ما هي الجوائز التي يمكنني الفوز بها في بطولات MGE؟",
                  answer: "تختلف الجوائز حسب البطولة وتشمل الجوائز النقدية، ومعدات الألعاب، والبضائع، وأماكن التأهل للبطولات الدولية. يتم دائمًا توضيح إجمالي الجوائز وتوزيعها بوضوح في صفحة معلومات البطولة."
                },
                1: {
                  question: "كيف تتم معالجة مدفوعات الجوائز؟",
                  answer: "يتم دفع الجوائز النقدية عادةً عبر تحويل مصرفي في غضون 30-60 يومًا بعد انتهاء البطولة. ستحتاج إلى تقديم معلومات مصرفية صالحة وقد تحتاج إلى إكمال نماذج ضريبية اعتمادًا على مبلغ الجائزة وبلد إقامتك."
                },
                2: {
                  question: "هل هناك مكافآت للمشاركة حتى لو لم أفز؟",
                  answer: "نعم، تقدم العديد من بطولات MGE مكافآت للمشاركة مثل العناصر الرقمية، أو عملة اللعبة، أو مستحضرات التجميل الحصرية داخل اللعبة. بالإضافة إلى ذلك، يحصل جميع المشاركين على شهادة مشاركة قد تكون قيمة لمساعي الرياضات الإلكترونية المستقبلية."
                }
              }
            },
            rules: {
              title: "القواعد واللوائح",
              questions: {
                0: {
                  question: "أين يمكنني العثور على القواعد الرسمية للبطولات؟",
                  answer: "يمكن العثور على قواعد البطولة الرسمية في صفحة معلومات البطولة، أو في قسم المستندات بموقعنا الإلكتروني، أو يتم إرسالها مباشرة بالبريد الإلكتروني إلى المشاركين المسجلين. تأكد من قراءة القواعد جيدًا قبل المنافسة."
                },
                1: {
                  question: "ماذا يحدث إذا خالف لاعب القواعد؟",
                  answer: "يتم أخذ انتهاكات القواعد على محمل الجد ويمكن أن تؤدي إلى تحذيرات، أو خصم نقاط، أو خسارة المباراة، أو استبعاد، أو في الحالات الخطيرة، حظر من البطولة. يراجع فريق الإدارة لدينا جميع الانتهاكات المبلغ عنها ويتخذ قرارات بناءً على شدة المخالفة."
                },
                2: {
                  question: "هل يمكنني استخدام معداتي الخاصة في بطولات LAN؟",
                  answer: "بالنسبة لمعظم بطولات LAN، يمكنك إحضار لوحة المفاتيح والماوس وسماعة الرأس ولوحة الماوس الخاصة بك. ومع ذلك، ستحتاج عادةً إلى استخدام أجهزة الكمبيوتر والشاشات وأجهزة الألعاب التي يوفرها منظمو البطولة. يتم تفصيل قواعد المعدات المحددة في كتيب قواعد كل بطولة."
                }
              }
            },
            logistics: {
              title: "لوجستيات البطولة",
              questions: {
                0: {
                  question: "متى وأين تقام بطولات MGE؟",
                  answer: "تقام بطولات MGE على مدار العام، مع تصفيات عبر الإنترنت تؤدي إلى نهائيات شخصية في أماكن مختلفة في المغرب. يُقام حدث MGE الرئيسي سنويًا، عادةً في الربيع. يتم الإعلان عن جميع التواريخ والمواقع على موقعنا الإلكتروني وقنوات التواصل الاجتماعي."
                },
                1: {
                  question: "هل أحتاج إلى إحضار أي شيء للبطولات الشخصية؟",
                  answer: "بالنسبة للبطولات الشخصية، أحضر بطاقة هويتك، ونسخة من تأكيد التسجيل الخاص بك، والملحقات الشخصية الخاصة بك (إذا كان مسموحًا بها)، وملابس مريحة. نوصي أيضًا بإحضار زجاجة ماء ووجبات خفيفة."
                },
                2: {
                  question: "هل هناك إقامة مقدمة للمشاركين؟",
                  answer: "بالنسبة للبطولات الكبرى، نقدم أسعارًا مخفضة للفنادق للمشاركين المسجلين. بالنسبة لبعض الأحداث بدعوة فقط، قد يتم توفير الإقامة. تحقق من صفحة معلومات البطولة للحصول على تفاصيل حول ترتيبات الإقامة."
                }
              }
            }
          }
        }
      },
      // FAQ
      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "احصل على إجابات سريعة لأسئلتك حول بطولات MGE والمشاركة",
        searchPlaceholder: "ابحث عن سؤال...",
        noResults: "لا توجد نتائج لـ \"{searchTerm}\"",
        tryAgain: "جرب مصطلحًا آخر أو تصفح جميع الأسئلة أدناه",
        resultsCount: "{count} {count, plural, one {نتيجة} few {نتائج} many {نتيجة} other {نتيجة}} لـ \"{searchTerm}\"",
        category: "الفئة",
        noAnswerFound: "لم تجد إجابة لسؤالك؟",
        contactUs: "اتصل بنا مباشرة",
        categories: {
          registration: {
            title: "التسجيل في البطولات",
            questions: {
              0: {
                question: "كيف أسجل في بطولة MGE؟",
                answer: "للتسجيل في بطولة MGE، قم بتسجيل الدخول إلى حسابك على المنصة، واختر البطولة التي تهتم بها، واتبع تعليمات التسجيل. تأكد من استيفاء جميع معايير الأهلية وتقديم تسجيلك قبل الموعد النهائي."
              },
              1: {
                question: "ما هي الوثائق المطلوبة للتسجيل؟",
                answer: "بالنسبة لمعظم البطولات، ستحتاج إلى بطاقة الهوية الخاصة بك (بطاقة الهوية الوطنية أو جواز السفر)، ومعرفات اللعبة الخاصة بك، وفي بعض الحالات إذن الوالدين إذا كنت قاصرًا. قد يكون للبطولات المحددة متطلبات إضافية مفصلة في لوائحها."
              },
              2: {
                question: "هل يمكنني التسجيل كفريق؟",
                answer: "نعم، بالنسبة لألعاب الفرق مثل Free Fire أو Valorant، تحتاج إلى تسجيل فريقك بالكامل. ينشئ القائد الفريق على المنصة ويدعو الأعضاء الآخرين. يجب أن يكون لدى جميع الأعضاء حساب MGE نشط وقبول الدعوة لإتمام التسجيل."
              }
            }
          },
          format: {
            title: "تنسيق البطولة",
            questions: {
              0: {
                question: "ما هي التنسيقات المستخدمة في بطولات MGE؟",
                answer: "تستخدم بطولات MGE تنسيقات متنوعة اعتمادًا على اللعبة ومستوى المنافسة. تتبع معظم البطولات مرحلة المجموعات متبوعة بأقواس إقصائية فردية أو مزدوجة. يتم تفصيل التنسيق المحدد لكل بطولة في صفحة معلومات البطولة."
              },
              1: {
                question: "كيف يتم تحديد مجموعات البطولة؟",
                answer: "يتم تحديد مجموعات البطولة عادةً من خلال نظام تصنيف يعتمد على تصنيفات اللاعبين أو الفرق، أو من خلال قرعة عشوائية. بالنسبة للبطولات الكبرى، قد تكون هناك مراحل تصفية تحدد التصنيف."
              },
              2: {
                question: "ماذا يحدث في حالة التعادل؟",
                answer: "تختلف قواعد كسر التعادل حسب اللعبة والبطولة. بشكل عام، نستخدم نتائج المواجهات المباشرة، أو فروق النقاط، أو مباريات كسر التعادل الإضافية. يتم توضيح قواعد كسر التعادل المحددة في كتيب قواعد كل بطولة."
              }
            }
          },
          prizes: {
            title: "الجوائز والمكافآت",
            questions: {
              0: {
                question: "ما هي الجوائز التي يمكنني الفوز بها في بطولات MGE؟",
                answer: "تختلف الجوائز حسب البطولة وتشمل الجوائز النقدية، ومعدات الألعاب، والبضائع، وأماكن التأهل للبطولات الدولية. يتم دائمًا توضيح إجمالي الجوائز وتوزيعها بوضوح في صفحة معلومات البطولة."
              },
              1: {
                question: "كيف تتم معالجة مدفوعات الجوائز؟",
                answer: "يتم دفع الجوائز النقدية عادةً عبر تحويل مصرفي في غضون 30-60 يومًا بعد انتهاء البطولة. ستحتاج إلى تقديم معلومات مصرفية صالحة وقد تحتاج إلى إكمال نماذج ضريبية اعتمادًا على مبلغ الجائزة وبلد إقامتك."
              },
              2: {
                question: "هل هناك مكافآت للمشاركة حتى لو لم أفز؟",
                answer: "نعم، تقدم العديد من بطولات MGE مكافآت للمشاركة مثل العناصر الرقمية، أو عملة اللعبة، أو مستحضرات التجميل الحصرية داخل اللعبة. بالإضافة إلى ذلك، يحصل جميع المشاركين على شهادة مشاركة قد تكون قيمة لمساعي الرياضات الإلكترونية المستقبلية."
              }
            }
          },
          rules: {
            title: "القواعد واللوائح",
            questions: {
              0: {
                question: "أين يمكنني العثور على القواعد الرسمية للبطولات؟",
                answer: "يمكن العثور على قواعد البطولة الرسمية في صفحة معلومات البطولة، أو في قسم المستندات بموقعنا الإلكتروني، أو يتم إرسالها مباشرة بالبريد الإلكتروني إلى المشاركين المسجلين. تأكد من قراءة القواعد جيدًا قبل المنافسة."
              },
              1: {
                question: "ماذا يحدث إذا خالف لاعب القواعد؟",
                answer: "يتم أخذ انتهاكات القواعد على محمل الجد ويمكن أن تؤدي إلى تحذيرات، أو خصم نقاط، أو خسارة المباراة، أو استبعاد، أو في الحالات الخطيرة، حظر من البطولة. يراجع فريق الإدارة لدينا جميع الانتهاكات المبلغ عنها ويتخذ قرارات بناءً على شدة المخالفة."
              },
              2: {
                question: "هل يمكنني استخدام معداتي الخاصة في بطولات LAN؟",
                answer: "بالنسبة لمعظم بطولات LAN، يمكنك إحضار لوحة المفاتيح والماوس وسماعة الرأس ولوحة الماوس الخاصة بك. ومع ذلك، ستحتاج عادةً إلى استخدام أجهزة الكمبيوتر والشاشات وأجهزة الألعاب التي يوفرها منظمو البطولة. يتم تفصيل قواعد المعدات المحددة في كتيب قواعد كل بطولة."
              }
            }
          },
          logistics: {
            title: "لوجستيات البطولة",
            questions: {
              0: {
                question: "متى وأين تقام بطولات MGE؟",
                answer: "تقام بطولات MGE على مدار العام، مع تصفيات عبر الإنترنت تؤدي إلى نهائيات شخصية في أماكن مختلفة في المغرب. يُقام حدث MGE الرئيسي سنويًا، عادةً في الربيع. يتم الإعلان عن جميع التواريخ والمواقع على موقعنا الإلكتروني وقنوات التواصل الاجتماعي."
              },
              1: {
                question: "هل أحتاج إلى إحضار أي شيء للبطولات الشخصية؟",
                answer: "بالنسبة للبطولات الشخصية، أحضر بطاقة هويتك، ونسخة من تأكيد التسجيل الخاص بك، والملحقات الشخصية الخاصة بك (إذا كان مسموحًا بها)، وملابس مريحة. نوصي أيضًا بإحضار زجاجة ماء ووجبات خفيفة."
              },
              2: {
                question: "هل هناك إقامة مقدمة للمشاركين؟",
                answer: "بالنسبة للبطولات الكبرى، نقدم أسعارًا مخفضة للفنادق للمشاركين المسجلين. بالنسبة لبعض الأحداث بدعوة فقط، قد يتم توفير الإقامة. تحقق من صفحة معلومات البطولة للحصول على تفاصيل حول ترتيبات الإقامة."
              }
            }
          }
        }
      },
      // Join The Adventure section
      joinAdventure: {
        title: "انضم إلى المغامرة",
        steps: {
          step1: {
            number: "01",
            title: "مبتدئ",
            action: "سجل",
            description: "أنشئ حسابك على منصتنا الرسمية.",
            detail: "إنه سريع وسهل ومجاني!"
          },
          step2: {
            number: "02",
            title: "متحدي",
            action: "نافس",
            description: "شارك في البطولات والتصفيات.",
            detail: "أظهر مهاراتك!"
          },
          step3: {
            number: "03",
            title: "بطل",
            action: "ارتقِ",
            description: "تأهل للنهائيات وكن بطلاً.",
            detail: "المجد ينتظرك!"
          }
        }
      },
      // Documentation Center
      documentationCenter: {
        title: "مركز الوثائق",
        description: "اطلع على مركز الوثائق الشامل لدينا لتنزيل اللوائح الرسمية وأدلة المشاركين وتذاكر ذهبية للمسابقات."
      },
      // ProPath
      proPath: {
        title: "NOUVELLE VOIE VERS LES PROS",
        tagline: "Programme Officiel du Ministere de la Jeunesse et des Sports",
        description: "Le Morocco Gaming Expo ouvre une voie structuree vers le professionnalisme pour les talents esport marocains. Progressez des qualifications regionales jusqu'aux finales LAN nationales.",
        cta: "Debuter votre parcours pro",
        nextEvent: "Prochaines qualifications: Mars 2025",
        supportedGames: "Jeux supportes:",
        formatFeatures: "Format de competition",
        learnMore: "En savoir plus",
        statsTitle: "L'engagement du Ministere pour l'Esport Marocain",
        stats: {
          regions: "Regions couvertes",
          regionsDesc: "Tournois qualificatifs dans tout le Royaume",
          games: "Jeux officiels",
          gamesDesc: "Diversite des disciplines esportives",
          players: "Joueurs participants",
          playersDesc: "A la premiere saison nationale",
          finale: "Grande finale LAN",
          finaleDesc: "Evenement national annuel"
        },
        // ... conserver le reste du code existant ...
      }
    }
  },
  tz: {
    translation: {
      // Navigation
      nav: {
        discover: "ⴰⵙⵙⴻⵏ",
        passGamers: "ⵜⴰⵎⵎⴻⵔⵜ ⵏ ⵉⵎⵢⵓⵔⴰⵔⵏ",
        documentation: "ⵜⵉⵔⵔⴰ",
        faq: "ⵉⵙⴻⵇⵙⵉⵜⵏ",
        tri9lGlory: "ⴰⴱⵔⵉⴷ ⵏ ⵡⴰⴷⴷⴰⵍ",
        prizePool: "ⴰⵔⵔⴰⵣⵏ",
        playFree: "ⵓⵔⴰⵔ ⴱⴰⵟⵍ",
        login: "ⴽⵛⵎ",
        proPath: "ⴰⴱⵔⵉⴷ ⵏ ⵜⵎⵍⴷⴰ",
        language: "ⵜⵓⵜⵍⴰⵢⵜ",
        followUs: "ⴹⴼⴰⵔ ⴰⵖ",
        mainNav: "ⵉⵙⵖⵓⵏⵏ ⵉⴳⴻⵣⵣⵓⵎⵏ",
        backToTop: "ⴰⵍⵙ ⵙ ⵉⴳⴻⵏⵡⴰⵏ",
        closeMenu: "ⵔⴳⴻⵍ ⵓⵏⴻⵎⵓⵙⵓ",
        openMenu: "ⵕⵥⴻⵎ ⵓⵏⴻⵎⵓⵙⵓ"
      },
      // Hero 
      hero: {
        title: "ⵜⵉⵎⵍⵉⵍⵉⵜ ⵏ ⵓⵔⴰⵔⵏ ⵏ ⵎⴻⵔⵔⵓⴽ",
        subtitle: {
          part1: "ⴰⵏⵚⵓⴼ ⵖⴻⵔ ⵜⴰⵔⵎⵉⵜ ⵜⴰⴼⴻⵍⵍⴰⵢⵜ ⵏ ⵡⵓⵔⴰⵔⵏ",
          part2: "ⴰⵏⴷⴰ ⵜⵍⴰⵍⵉⵜ ⵏ ⵢⵉⵏⵓⵥⴰⵔ",
          part3: "ⴷ ⵓⵍⴰⵢ ⵏ ⵢⵉⵔⴱⴰⵃⴻⵏ",
          part4: "ⴷⴷⵓ-ⴷ ⵖⵓⵔ-ⵏⴻⵖ ⵉ ⵢⵉⵡⴻⵜ ⵏ ⵜⵙⴻⴼⵔⵉⵜ ⵓⵔ ⵏⴻⵜⵜⵓⵡⴻⵜⵜⵓ ⴷⴻⴳ ⵓⵎⴰⴹⴰⵍ ⵏ ⵡⵓⵔⴰⵔⵏ"
        },
        bottomTitle: "ⴻⵎⵊⵉⴻ 2025",
        getStarted: "ⴱⴷⵓ",
        playNow: "ⵓⵔⴰⵔ ⵜⵓⵔⴰ"
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "ⴰⴱⵔⵉⴷ ⵏ ⵍⵎⴻⵄⵏⴰ",
        description: "ⴹⴼⴻⵔ ⴰⴱⵔⵉⴷ ⴰⵔⴰ ⴽ-ⵢⴰⵡⵉⵏ ⵙⴻⴳ ⵓⵎⵢⵓⵔⴰⵔ ⴰⵖⴻⵔⴼⴰⵏ ⵖⴻⵔ ⵓⵎⵢⵓⵔⴰⵔ ⴰⵖⴻⵍⵏⴰⵡ ⵏ ⴻⵙⵒⵓⵔⵜ",
        steps: {
          step1: "ⴰⵎⴻⵣⵡⴰⵔⵓ - ⵊⴻⵔⵔⴻⴷ: ⵙⵏⵓⵍⴼⵓ ⴰⵎⵉⴹⴰⵏ-ⵉⵏⴻⴽ ⵖⴻⴼ ⵓⵏⵎⴰⵍⵓ-ⵏⵏⴻⵖ ⵓⵏⵚⵉⴱ. ⴷ ⴰⵔⵓⵔⴰⴷ, ⴷ ⵉⵙⴻⵀⵍⴻⵏ ⴷⴰⵖⴻⵏ ⴷ ⵉⵍⴻⵍⵍⵉ!",
          step2: "ⴰⵎⵇⴻⴷⴷⴰⵔ - ⵎⵎⴻⵙⴱⴰⵔⴰⵣ: ⵜⵜⴻⴽⴽⵉ ⴷⴻⴳ ⵜⴻⵎⵍⵉⵍⵉⵏ ⵓⵇⴱⴻⵍ ⴷⴰⵖⴻⵏ ⵙⴻⴽⵏ ⵜⵉⵣⵎⵎⴰⵔ-ⵉⵏⴻⴽ ⵎⴳⴰⵍ ⵉⵎⵢⵓⵔⴰⵔⵏ-ⵏⵏⵉⴹⴻⵏ.",
          step3: "ⴰⴱⴰⵜⴻⵍ - ⴰⵍⵉ: ⵉⵎⵢⵓⵔⴰⵔⵏ ⵉⴼⴰⵣⴻⵏ ⴰⴷ ⴷⵓⵏ ⵖⴻⵔ ⵜⵉⴳⴳⴰⵢⵉⵏ ⵜⴰⴳⴳⴰⵔⴰ ⴷⴰⵖⴻⵏ ⴰⴷ ⵙⵄⵓⵏ ⵜⴰⴳⵏⵉⵜ ⴰⴷ ⵓⵖⴰⵍⴻⵏ ⴷ ⵉⴱⴰⵜⴻⵍⴻⵏ."
        }
      }
    }
  }
}

// Configuration i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr', // Langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // Pas besoin d'échapper les valeurs avec React
    },
    react: {
      useSuspense: false // Désactiver Suspense pour éviter les erreurs
    }
  });

export default i18n; 
