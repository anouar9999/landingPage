import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
        proPath: "Pro Path",
      },
      // Hero
      hero: {
        title: "GAMIUS",
        subtitle: {
          part1: "Where legends are born. ",
          part2: "Your arena awaits!",
          part3: "Dive into the action, join a community of champions",
          part4: "and forge your own story. The game starts now!",
        },
        bottomTitle: "Where legends are born.",
        getStarted: "Get Started",
        playNow: "PLAY NOW",
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "ROAD TO GLORY",
        description:
          "From rookie to pro, every win forges your legacy. Your ascent starts here.",
        steps: {
          step1Title: "BEGINNER",
          step2Title: "CHALLENGER",
          step3Title: "CHAMPION",
          step1:
            " SIGN UP: Create your player profile in seconds. Joining the arena is fast, easy, and free!",
          step2:
            " COMPETE: Jump into online qualifiers. Prove your skills and dominate the leaderboard against the community.",
          step3:
            "RISE: Crush the qualifiers to reach the grand finals. Seize your chance to become a legend.",
        },
      },
      // PrizePool section
      prizePool: {
        title: "PRIZE POOL",
        description:
          "More than glory awaits. Compete for epic prizes and prove you're the best!",
        totalPrizePool: "Total Prize Pool",
        seasonRewards: "Official 2025 Season Rewards",
        additionalInfo:
          "Additional prizes may be awarded throughout the competition including gaming gear, merchandise, and exclusive opportunities.",
        places: {
          first: "1st Place",
          second: "2nd Place",
          third: "3rd Place",
        },
      },
      // About
      about: {
        title: "Join the legend!",
        subtitle:
          "Morocco's biggest esports tournaments are waiting for you. Show your skills, dominate the competition, and experience the most intense shared adventure. Ready to shake the arena?",
        clickPrompt: "CLICK",
        description:
          "GAMIUS is the premier gaming event in Morocco, showcasing the latest in video game technology, esports competitions, and gaming culture.",
      },
      // Features
      features: {
        title: "What We Offer",
        tournaments: "Tournaments",
        tournamentsDesc:
          "Compete in high-stakes tournaments with amazing prizes",
        community: "Community",
        communityDesc: "Join a thriving community of passionate gamers",
        experience: "Experience",
        experienceDesc:
          "Experience the latest games and cutting-edge technology",
      },
      // Events
      events: {
        title: "Upcoming Events",
        viewAll: "View All Events",
      },
      // Footer
      footer: {
        description:
          "GAMIUS is the premier gaming event in Morocco, showcasing the latest in video gaming, esports competitions, and creating opportunities for talented gamers.",
        quickLinks: "Quick Links",
        links: {
          home: "Home",
          tournaments: "Tournaments",
          prizes: "Prizes",
          contact: "Contact",
        },
        followUs: "Follow Us",
        sponsoredBy: "Under the patronage of",
        copyright: "© {year} GAMIUS. All rights reserved.",
        legal: {
          privacy: "Privacy Policy",
          terms: "Terms of Service",
        },
        dashboard: "User Dashboard",
      },
      // PassGamers
      passGamers: {
        title: "GAMIUS PASS",
        subtitle:
          "Your VIP access to the GAMIUS universe. Join the club of privileged players and unlock: Early access to tournaments, Unique rewards, Offers from our partner brands 🚀",
        officialInitiative: "100% FREE & EXCLUSIVE",
        howItWorks: "How to Get Your Gamius Pass",
        step1: "Sign Up",
        step1Desc:
          "Create your GAMIUS account and complete your player profile.",
        step2: "Activate",
        step2Desc:
          "Activate your Pass for free from your dashboard. It's instant!",
        step3: "Enjoy",
        step3Desc:
          "Explore your benefits and get ready for the next competition.",
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
        securePayment:
          "Secure payment and terms of use in accordance with ministerial guidelines",
        // Benefits
        benefits: {
          tickets: {
            title: "Early Access",
            description:
              "Sign up for tournaments before anyone else and secure your spot.",
          },
          offers: {
            title: "Unique Rewards",
            description:
              "Receive exclusive loot, gifts, and VIP tickets for the biggest events.",
          },
          status: {
            title: "Partner Offers",
            description:
              "Enjoy exclusive discounts from our partner brands, just for you.",
          },
          community: {
            title: "Premium Status",
            description:
              "Display a unique badge on your profile and get recognized by the entire community.",
          },
        },
      },
      // Documentation Center
      documentationCenter: {
        title: "THE RULEBOOK",
        description:
          "Everything you need to master the competition is right here. Prepare your strategy and secure your victory.",
        cards: {
          regulations: "Regulations",
          strategyGuides: "Strategy Guides",
          mediaKit: "Media Kit",
        },
        strategyHub: {
          title: "THE STRATEGY HUB",
          description:
            "All the knowledge you need, instantly accessible. Explore, learn, and prepare for your next victory.",
          subtitle:
            "Your Interactive Game Guide - Easily navigate our tutorials, find answers to your questions, and never miss an important GAMIUS circuit update.",
          features: {
            tutorials: "Tutorials to master every aspect of the game",
            faq: "FAQ for immediate answers",
            updates: "Real-time updates",
          },
        },
        downloadZone: {
          title: "DOWNLOAD ZONE",
          description:
            "Ready to get prepared? Download all the official regulations, strategy guides, and resources for the GAMIUS tournaments right here.",
        },
      },
      // ProPath
      proPath: {
        title: "YOUR PATH TO PRO GAMING",
        tagline: "THE OFFICIAL NATIONAL CIRCUIT",
        description:
          "The GAMIUS GROUP opens your path to becoming a pro. Dominate the qualifiers in your region to reach the grand national final and prove you're the best.",
        cta: "Start your pro journey",
        nextEvent: "Next qualifications: March 2025",
        supportedGames: "Supported games:",
        formatFeatures: "Competition format",
        learnMore: "Learn more",
        statsTitle: "THE GAMIUS CIRCUIT IN NUMBERS",
        stats: {
          regions: "12 Regions in Competition",
          regionsDesc: "Your chance to shine, wherever you are.",
          games: "4 Featured Games",
          gamesDesc: "Prove your talent in your favorite games.",
          players: "400+ Community of Champions",
          playersDesc: "And the adventure is just beginning!",
          finale: "1 Final Destination",
          finaleDesc: "One single event to crown the best in Morocco.",
        },
        regionalQualifiers: {
          title: "REGIONAL QUALIFIERS",
          description:
            "Represent your city, dominate your region! The competition starts right at your doorstep. Battle the best local players and secure your spot on the national stage.",
        },
        nationalChampionships: {
          title: "NATIONAL CHAMPIONSHIPS",
          description:
            "You've conquered your region. Now, the nation is watching. Wear your colors with pride and battle the national elite for the ultimate champion title.",
        },
        eliteLeague: {
          title: "MOROCCAN ELITE LEAGUE",
          description:
            "Welcome to the summit. This is where champions become legends. Face the absolute elite of Morocco and prepare to shine on the international stage.",
          link: "Discover the league ↗",
        },
        grandFinal: {
          title: "GRAND NATIONAL LAN FINAL",
          description:
            "This is where history is made! After dominating the qualifiers, face the best on stage, in front of an electrified crowd and under the media spotlight. Become the champion you're destined to be.",
        },
        newSeason: {
          title: "MARCH 2026: LAUNCH OF THE NEW GAMIUS SEASON",
          description:
            "The GAMIUS competition is leveling up! Expect innovative formats, even bigger prizes, and a structured professional path designed to help you become a Moroccan esports legend.",
        },
      },
      organizerBanner: {
        subTitle: "join us",
        title: "Host legendary tournaments and shape the future of esports!",
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
            detail: "It's quick, easy, and free!",
          },
          step2: {
            number: "02",
            title: "CHALLENGER",
            action: "COMPETE",
            description: "Participate in tournaments and qualifiers.",
            detail: "Show your skills!",
          },
          step3: {
            number: "03",
            title: "CHAMPION",
            action: "RISE",
            description: "Reach the finals and become a champion.",
            detail: "Glory awaits!",
          },
        },
      },
    },
  },
  fr: {
    translation: {
      // Navigation
      nav: {
        discover: "Découvrir",
        passGamers: "Pass Gamers",
        documentation: "Documentation",
        faq: "FAQ",
        tri9lGlory: "Voie de la Gloire",
        prizePool: "Prix",
        playFree: "Jouer Gratuitement",
        login: "Connexion",
        proPath: "Parcours Pro",
        language: "Langue",
        followUs: "Suivez-nous",
        mainNav: "Navigation principale",
        backToTop: "Retour en haut",
        closeMenu: "Fermer le menu",
        openMenu: "Ouvrir le menu",
      },
      // Hero
      hero: {
        title: "GAMIUS",
        bottomTitle: "Là où les légendes naissent.",
        playNow: "JOUER MAINTENANT",
        subtitle: {
          part1: "Plonge dans l'action, ",
          part2: "rejoins une communauté de champions ",
          part3: "et forge ta propre histoire. ",
          part4: "Le jeu commence maintenant !",
        },
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "LA VOIE DE LA GLOIRE",
        description:
          "D'amateur à pro, chaque victoire te rapproche de la légende. Ton ascension commence ici.",
        steps: {
          step1Title: "DÉBUTANT",
          step2Title: "CHALLENGER",
          step3Title: "CHAMPION",
          step1:
            "INSCRIS-TOI : Crée ton profil en quelques clics. Rejoindre l'arène est simple, rapide et gratuit !",
          step2:
            "AFFRONTE : Plonge dans les qualifications en ligne. Montre ton skill et impose ton style face à la communauté.",
          step3:
            "TRIOMPHE : Qualifie-toi pour la grande finale et grave ton nom parmi les légendes. La gloire est à ta portée.",
        },
      },
      // PrizePool section
      prizePool: {
        title: "PRIZE POOL",
        description:
          "Ton talent mérite une récompense. Battez-vous pour la gloire et le butin !",
        totalPrizePool: "Cagnotte Totale",
        seasonRewards: "Récompenses Officielles Saison 2025",
        additionalInfo:
          "Des prix supplémentaires peuvent être attribués tout au long de la compétition, notamment du matériel gaming, des produits dérivés et des opportunités exclusives.",
        places: {
          first: "1ère Place",
          second: "2ème Place",
          third: "3ème Place",
        },
      },
      // About
      about: {
        title: "Rejoins la légende !",
        subtitle:
          "Les plus grands tournois e-sport du Maroc t'attendent. Montre ton talent, domine la compétition et vis l'aventure partagée la plus intense. Prêt à faire trembler l'arène ?",
        clickPrompt: "CLIQUEZ",
        description:
          "GAMIUS GROUP est le principal événement de jeux vidéo au Maroc, présentant les dernières technologies, des compétitions d'esport et la culture du gaming.",
      },
      // Features
      features: {
        title: "Ce Que Nous Offrons",
        tournaments: "Tournois",
        tournamentsDesc:
          "Participez à des tournois à forts enjeux avec des prix incroyables",
        community: "Communauté",
        communityDesc:
          "Rejoignez une communauté dynamique de joueurs passionnés",
        experience: "Expérience",
        experienceDesc: "Découvrez les derniers jeux et technologies de pointe",
      },
      // Events
      events: {
        title: "Événements à Venir",
        viewAll: "Voir Tous les Événements",
      },
      // Footer
      footer: {
        description:
          "GAMIUS GROUP est l'événement gaming premier au Maroc, présentant les dernières nouveautés en matière de jeux vidéo, de compétitions esport, et créant des opportunités pour les joueurs talentueux.",
        quickLinks: "Liens Rapides",
        links: {
          home: "Accueil",
          tournaments: "Tournois",
          prizes: "Prix",
          contact: "Contact",
        },
        followUs: "Suivez-nous",
        sponsoredBy: "Sous le patronage du",
        copyright: "© {year} GAMIUS GROUP. Tous droits réservés.",
        legal: {
          privacy: "Politique de Confidentialité",
          terms: "Conditions d'Utilisation",
        },
        dashboard: "Espace Utilisateur",
      },
      // PassGamers
      passGamers: {
        title: "PASS GAMIUS",
        subtitle:
          "Ton accès VIP à l'univers GAMIUS. Rejoins le club des joueurs privilégiés et débloque : Accès anticipé aux tournois, Récompenses uniques, Offres de nos marques partenaires 🚀",
        officialInitiative: "100% GRATUIT & EXCLUSIF",
        howItWorks: "Comment obtenir ton Pass Gamius",
        step1: "S'inscrire",
        step1Desc: "Crée ton compte GAMIUS et finalise ton profil de joueur.",
        step2: "Activer",
        step2Desc:
          "Active ton Pass gratuitement depuis ton tableau de bord. C'est instantané !",
        step3: "Profiter",
        step3Desc:
          "Explore tes avantages et prépare-toi pour la prochaine compétition.",
        selectPlan: "Sélectionnez votre formule",
        monthlyPlan: "Mensuel",
        quarterlyPlan: "Trimestriel",
        annualPlan: "Annuel",
        advantages: "Avantages du Pass",
        recommended: "RECOMMANDÉ",
        choose: "Choisir",
        selected: "Sélectionné:",
        noCommitment: "Sans engagement",
        quarterlyCommitment: "Engagement 3 mois",
        annualCommitment: "Engagement annuel",
        passActive:
          "Votre pass devient actif immédiatement après l'inscription",
        securePayment:
          "Paiement sécurisé et conditions d'utilisation conformes aux directives ministérielles",
        // Benefits
        benefits: {
          tickets: {
            title: "Accès Anticipé",
            description:
              "Inscris-toi aux tournois avant tout le monde et garantis ta place.",
          },
          offers: {
            title: "Récompenses Uniques",
            description:
              "Reçois du loot exclusif, des cadeaux et des tickets VIP pour les plus grands événements.",
          },
          status: {
            title: "Offres Partenaires",
            description:
              "Profite de réductions exclusives de nos marques partenaires, juste pour toi.",
          },
          community: {
            title: "Statut Premium",
            description:
              "Affiche un badge unique sur ton profil et sois reconnu par toute la communauté.",
          },
        },
      },
      // Documentation Center
      documentationCenter: {
        title: "LES RÈGLES DU JEU",
        description:
          "Tout ce qu'il te faut pour maîtriser la compétition est ici. Prépare ta stratégie et assure ta victoire.",
        cards: {
          regulations: "Règlements",
          strategyGuides: "Guides Stratégiques",
          mediaKit: "Kit Média",
        },
        strategyHub: {
          title: "LE HUB STRATÉGIQUE",
          description:
            "Toutes les connaissances dont tu as besoin, accessibles instantanément. Explore, apprends et prépare ta prochaine victoire.",
          subtitle:
            "Ton guide de jeu interactif - Navigue facilement dans nos tutos, trouve les réponses à tes questions et ne manque aucune mise à jour importante du circuit GAMIUS.",
          features: {
            tutorials: "Tutoriels pour maîtriser chaque aspect du jeu",
            faq: "FAQ pour des réponses immédiates",
            updates: "Mises à jour en temps réel",
          },
        },
        downloadZone: {
          title: "ZONE DE TÉLÉCHARGEMENT",
          description:
            "Prêt à te préparer ? Télécharge ici tous les règlements, guides stratégiques et ressources officielles des tournois GAMIUS.",
        },
      },
      // ProPath
      proPath: {
        title: "TA VOIE VERS LE PRO-GAMING",
        tagline: "LE CIRCUIT NATIONAL OFFICIEL",
        description:
          "Le GAMIUS GROUP t'ouvre la voie vers le professionnalisme. Domine les qualifications dans ta région pour atteindre la grande finale nationale et prouver que tu es le meilleur.",
        cta: "Débuter ton parcours pro",
        nextEvent: "Prochaines qualifications: Mars 2025",
        supportedGames: "Jeux supportés:",
        formatFeatures: "Format de compétition",
        learnMore: "En savoir plus",
        statsTitle: "LE CIRCUIT GAMIUS EN CHIFFRES",
        stats: {
          regions: "12 Régions en compétition",
          regionsDesc: "Ta chance de briller, où que tu sois.",
          games: "4 Jeux à l'honneur",
          gamesDesc: "Prouve ton talent sur tes jeux préférés.",
          players: "400+ Communauté de champions",
          playersDesc: "Et l'aventure ne fait que commencer !",
          finale: "1 Destination finale",
          finaleDesc: "Un seul événement pour sacrer le meilleur du Maroc.",
        },
        regionalQualifiers: {
          title: "QUALIFICATIONS RÉGIONALES",
          description:
            "Représente ta ville, domine ta région ! La compétition commence près de chez toi. Affronte les meilleurs joueurs locaux et impose-toi pour atteindre l'étape nationale.",
        },
        nationalChampionships: {
          title: "CHAMPIONNATS NATIONAUX",
          description:
            "Tu as conquis ta région. Maintenant, le Maroc t'attend. Porte fièrement tes couleurs et affronte l'élite nationale pour le titre de champion suprême.",
        },
        eliteLeague: {
          title: "LIGUE ÉLITE MAROCAINE",
          description:
            "Bienvenue au sommet. Ici, les champions deviennent des légendes. Affronte l'élite absolue du Maroc et prépare-toi à briller sur la scène internationale.",
          link: "Découvrir la ligue ↗",
        },
        grandFinal: {
          title: "GRANDE FINALE LAN NATIONALE",
          description:
            "C'est ici que l'histoire s'écrit ! Après avoir dominé les qualifications, affronte les meilleurs sur scène, devant un public enflammé et sous les projecteurs des médias. Deviens le champion que tu es destiné à être.",
        },
        newSeason: {
          title: "MARS 2026 : LANCEMENT DE LA NOUVELLE SAISON GAMIUS",
          description:
            "La compétition GAMIUS passe au niveau supérieur ! Attends-toi à des formats inédits, des prix encore plus importants et un parcours professionnel structuré pour t'aider à devenir une légende marocaine de l'e-sport.",
        },
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
            detail: "C'est rapide, facile et gratuit !",
          },
          step2: {
            number: "02",
            title: "CHALLENGER",
            action: "PARTICIPEZ",
            description: "Participez aux tournois et qualifications.",
            detail: "Montrez vos compétences !",
          },
          step3: {
            number: "03",
            title: "CHAMPION",
            action: "ÉVOLUEZ",
            description: "Accédez aux finales et devenez champion.",
            detail: "La gloire vous attend !",
          },
        },
      },
    },
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
        openMenu: "فتح القائمة",
      },
      // Hero
      hero: {
        title: "GAMIUS",
        subtitle: {
          part1: "حيث تولد الأساطير. ",
          part2: "حلبتك تنتظرك!",
          part3: "انغمس في الإثارة، انضم إلى مجتمع الأبطال ",
          part4: "واصنع قصتك الخاصة. اللعبة تبدأ الآن!",
        },
        bottomTitle: "حيث تولد الأساطير. حلبتك تنتظرك!",
        getStarted: "ابدأ الآن",
        playNow: "العب الآن",
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "طريق المجد",
        description:
          "من لاعب هاوٍ إلى محترف، كل انتصار يصنع أسطورتك. صعودك يبدأ هنا.",
        steps: {
          step1Title: "مبتدئ",
          step2Title: "متحدٍ",
          step3Title: "بطل",
          step1:
            "  - سجّل: أنشئ ملفك كلاعب في ثوانٍ. الانضمام إلى الحلبة سريع وسهل ومجاني!",
          step2:
            " - نافس: اقتحم التصفيات عبر الإنترنت. أثبت مهاراتك وهيمن على المنافسة أمام الجميع.",
          step3:
            "  - ارتقِ: اسحق التصفيات للوصل إلى النهائيات الكبرى. اغتنم فرصتك لتصبح أسطورة.",
        },
      },
      // PrizePool section
      prizePool: {
        title: "PRIZE POOL",
        description: "موهبتك تستحق مكافأة. تنافس على المجد ونصيبك من الكنز!",
        totalPrizePool: "إجمالي الجوائز",
        places: {
          first: "المركز الأول",
          second: "المركز الثاني",
          third: "المركز الثالث",
        },
      },
      // About
      about: {
        title: "انضم إلى الأسطورة!",
        subtitle:
          "أكبر بطولات الرياضات الإلكترونية في المغرب في انتظارك. أظهر موهبتك، سيطر على المنافسة وعش المغامرة المشتركة الأكثر إثارة. مستعد لتهز الحلبة؟",
        clickPrompt: "انقر",
        description:
          "GAMIUS هو الحدث الرئيسي للألعاب في المغرب، يعرض أحدث تقنيات ألعاب الفيديو ومسابقات الرياضات الإلكترونية وثقافة الألعاب.",
      },
      // Features
      features: {
        title: "ما نقدمه",
        tournaments: "البطولات",
        tournamentsDesc: "نافس في بطولات عالية المخاطر مع جوائز مذهلة",
        community: "المجتمع",
        communityDesc: "انضم إلى مجتمع مزدهر من اللاعبين المتحمسين",
        experience: "تجربة",
        experienceDesc: "اختبر أحدث الألعاب والتكنولوجيا المتطورة",
      },
      // Events
      events: {
        title: "الأحداث القادمة",
        viewAll: "عرض جميع الأحداث",
      },
      // Footer
      footer: {
        description:
          "GAMIUS هو الحدث الرئيسي للألعاب في المغرب، حيث يعرض أحدث التطورات في مجال ألعاب الفيديو ومسابقات الرياضات الإلكترونية، ويخلق فرصاً للاعبين الموهوبين.",
        quickLinks: "روابط سريعة",
        links: {
          home: "الرئيسية",
          tournaments: "البطولات",
          prizes: "الجوائز",
          contact: "اتصل بنا",
        },
        followUs: "تابعنا",
        sponsoredBy: "تحت رعاية",
        copyright: "© {year} GAMIUS. جميع الحقوق محفوظة.",
        legal: {
          privacy: "سياسة الخصوصية",
          terms: "شروط الخدمة",
        },
        dashboard: "لوحة تحكم المستخدم",
      },
      // PassGamers
      passGamers: {
        title: "GAMIUS PASS",
        subtitle:
          "بوابتك الخاصة لعالم GAMIUS. انضم إلى نادي اللاعبين المميزين واحصل على: وصول مبكر للبطولات، مكافآت حصرية، عروض من شركائنا 🚀",
        officialInitiative: "100% مجاني وحصري",
        howItWorks: "كيف تحصل على Gamius Pass الخاص بك",
        step1: "التسجيل",
        step1Desc: "أنشئ حسابك على GAMIUS وأكمل ملفك الشخصي كلاعب.",
        step2: "التفعيل",
        step2Desc: "فعّل بطاقتك مجاناً من لوحة التحكم الخاصة بك. الأمر فوري!",
        step3: "الاستمتاع",
        step3Desc: "اكتشف مزاياك واستعد للمنافسة القادمة.",
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
        passActive: "يصبح باسك نشطاً على الفور بعد التسجيل",
        securePayment: "دفع آمن وشروط استخدام وفقاً للإرشادات الوزارية",
        // Benefits
        benefits: {
          tickets: {
            title: "وصول مبكر",
            description: "سجّل في البطولات قبل الجميع واضمن مكانك.",
          },
          offers: {
            title: "مكافآت حصرية",
            description:
              "احصل على غنائم حصرية، هدايا، وتذاكر VIP للأحداث الأكبر.",
          },
          status: {
            title: "عروض الشركاء",
            description: "استفد من خصومات حصرية من شركائنا، خصيصاً لك.",
          },
          community: {
            title: "وضع متميز",
            description:
              "أظهر شارة فريدة في ملفك الشخصي واحصل على تقدير المجتمع بأكمله.",
          },
        },
      },
      // Documentation Center
      documentationCenter: {
        title: "قوانين اللعبة",
        description:
          "كل ما تحتاجه لإتقان المنافسة موجود هنا. حضّر استراتيجيتك واضمن انتصارك.",
        cards: {
          regulations: "القوانين",
          strategyGuides: "أدلة الاستراتيجيات",
          mediaKit: "الملف الإعلامي",
        },
        strategyHub: {
          title: "مركز الاستراتيجيات",
          description:
            "كل المعرفة التي تحتاجها، في متناول يدك فوراً. اكتشف، تعلم واستعد للانتصار القادم.",
          subtitle:
            "دليلك التفاعلي للعبة - تصفح بسهولة دروسنا، اعثر على إجابات لأسئلتك ولا تفوت أي تحديث مهم في بطولة GAMIUS.",
          features: {
            tutorials: "دروس لإتقان كل جانب من اللعبة",
            faq: "أسئلة مجاوبة للحصول على إجابات فورية",
            updates: "تحديثات في الوقت الفعلي",
          },
        },
        downloadZone: {
          title: "منطقة التحميل",
          description:
            "مستعد للتجهيز؟ حمّل من هنا كل القوانين، الأدلة الاستراتيجية والموارد الرسمية لبطولات GAMIUS.",
        },
      },
      // ProPath
      proPath: {
        title: "طريقك نحو الاحتراف",
        tagline: "البطولة الوطنية الرسمية",
        description:
          "مجموعة GAMIUS GROUP تفتح لك الطريق نحو الاحتراف. سيطر على التصفيات في منطقتك للوصل إلى النهائي الوطني الكبير وأثبت أنك الأفضل.",
        cta: "ابدأ رحلتك المهنية",
        nextEvent: "التصفيات القادمة: مارس 2025",
        supportedGames: "الألعاب المدعومة:",
        formatFeatures: "تنسيق المنافسة",
        learnMore: "اعرف المزيد",
        statsTitle: "بطولة GAMIUS بالأرقام",
        stats: {
          regions: "12 منطقة في المنافسة",
          regionsDesc: "فرصتك للتألق، أينما كنت.",
          games: "4 ألعاب رسمية",
          gamesDesc: "أثبت موهبتك في ألعابك المفضلة.",
          players: "400+ مجتمع الأبطال",
          playersDesc: "والمغامرة في بدايتها فقط!",
          finale: "1 الوجهة النهائية",
          finaleDesc: "حدث واحد لتتويج أفضل لاعب في المغرب.",
        },
        regionalQualifiers: {
          title: "التصفيات الجهوية",
          description:
            "مثّل مدينتك، سيطر على منطقتك! المنافسة تبدأ بالقرب منك. واجه أفضل اللاعبين المحليين واحجز مكانك في المرحلة الوطنية.",
        },
        nationalChampionships: {
          title: "البطولات الوطنية",
          description:
            "لقد سيطرت على منطقتك. الآن، المغرب كله يترقبك. ارفع ألوانك بفخر وواجه نخبة اللاعبين على لقب البطل الأوحد.",
        },
        eliteLeague: {
          title: "الدوري المغربي للنخبة",
          description:
            "مرحباً بك في القمة. هنا، يصبح الأبطال أساطير. واجه نخبة النخبة في المغرب واستعد للتألق على الساحة الدولية.",
          link: "اكتشف الدوري ↗",
        },
        grandFinal: {
          title: "النهائي الوطني الكبير (LAN)",
          description:
            "هنا تُصنع الأساطير! بعد سيطرتك على التصفيات، واجه الأفضل على المسرح، أمام جمهور متحمس وتحت أضواء الإعلام. كن البطل المقدّر له أن تكون.",
        },
        newSeason: {
          title: "مارس 2026: إطلاق موسم GAMIUS الجديد",
          description:
            "منافسات GAMIUS تنتقل إلى مستوى أعلى! توقع أنظمة لعب مبتكرة، جوائز أكبر بكثير ومسار احترافي منظم لمساعدتك أن تصبح أسطورة الرياضات الإلكترونية المغربية.",
        },
      },
      // Join The Adventure section
      joinAdventure: {
        title: "انضم إلى المغامرة",
        steps: {
          step1: {
            number: "01",
            title: "مبتدئ",
            action: "سجّل",
            description: "أنشئ حسابك على منصتنا الرسمية.",
            detail: "إنه سريع وسهل ومجاني!",
          },
          step2: {
            number: "02",
            title: "متحدٍ",
            action: "نافس",
            description: "شارك في البطولات والتصفيات.",
            detail: "أظهر مهاراتك!",
          },
          step3: {
            number: "03",
            title: "بطل",
            action: "ارتقِ",
            description: "تأهل للنهائيات وكن بطلاً.",
            detail: "المجد ينتظرك!",
          },
        },
      },
      // FAQ
      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "احصل على إجابات سريعة لأسئلتك حول بطولات GAMIUS والمشاركة",
        searchPlaceholder: "ابحث عن سؤال...",
        noResults: 'لا توجد نتائج لـ "{searchTerm}"',
        tryAgain: "جرب مصطلحاً آخر أو تصفح جميع الأسئلة أدناه",
        resultsCount:
          '{count} {count, plural, one {نتيجة} few {نتائج} many {نتيجة} other {نتيجة}} لـ "{searchTerm}"',
        category: "الفئة",
        noAnswerFound: "لم تجد إجابة لسؤالك؟",
        contactUs: "اتصل بنا مباشرة",
        categories: {
          registration: {
            title: "التسجيل في البطولات",
            questions: {
              0: {
                question: "كيف أسجل في بطولة GAMIUS؟",
                answer:
                  "للتسجيل في بطولة GAMIUS، قم بتسجيل الدخول إلى حسابك على المنصة، واختر البطولة التي تهتم بها، واتبع تعليمات التسجيل. تأكد من استيفاء جميع معايير الأهلية وتقديم تسجيلك قبل الموعد النهائي.",
              },
            },
          },
        },
      },
    },
  },
};

// Configuration i18n
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "fr", // Langue par défaut
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false, // Pas besoin d'échapper les valeurs avec React
  },
  react: {
    useSuspense: false, // Désactiver Suspense pour éviter les erreurs
  },
});

export default i18n;
