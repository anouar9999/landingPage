import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Ressources de traduction
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        discover: "Discover",
        passGamers: "Pass Gamius",
        documentation: "Documentation",
        faq: "FAQ",
        tri9lGlory: "Road to Glory",
        prizePool: "Prize Pool",
        playFree: "Play Free",
        login: "Log In",
        proPath: "Pro Path",
        organizer: "Organizer",
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
        bottomTitle: {
          part1: "Where legends",
          part2: "are born.",
        },
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
            "SIGN UP: Create your player profile in seconds. Joining the arena is fast, easy, and free!",
          step2:
            "COMPETE: Jump into online qualifiers. Prove your skills and dominate the leaderboard against the community.",
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
        seasonRewards: "Official 2026 Season Rewards",
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
      // Organizer Page
      organizer: {
        hero: {
          badge: "Professional Tournament Management",
          title1: "Create and Manage",
          title2: "Unforgettable",
          title3: "Competitions",
          subtitle: "From local events to global circuits, our platform gives you the keys to success. You focus on the show, we'll handle the technology."
        },
        plans: {
          community: {
            name: "Community",
            description: "Perfect for small local tournaments and getting started",
            price: "FREE",
            priceDetail: "Free access: manage your community tournaments — request access and earn compensation for each tournament created and completed.",
            priceDetailShort: "Free access — request access and earn a reward for each completed tournament.",
            cta: "Request Access",
            ctaSubtext: "Response within 24 business hours.",
            features: {
              participants: "Up to 64 participants",
              formats: "Standard tournament formats",
              brackets: "Automated bracket generation",
              profiles: "Basic participant profiles",
              support: "Community support"
            }
          },
          whiteLabel: {
            name: "White-label",
            description: "Custom solutions for large-scale operations",
            price: "Custom",
            priceDetail: "Tailored to your needs",
            cta: "Contact us",
            everythingPlus: "Everything in Community, plus:",
            features: {
              participants: "Unlimited participants",
              solution: "White-label solution",
              types: "Custom tournament types",
              stats: "Real-time statistics & analytics",
              manager: "Dedicated account manager",
              support: "24/7 premium support"
            }
          },
          esportEvents: {
            name: "Esport Events",
            subtitle: "Design, Production & Management",
            description: "Turnkey solution for LAN, online, or hybrid shows.",
            price: "Custom",
            priceDetail: "Your event, our expertise: from concept to final show. We handle the stage, technical setup, and operations so you can focus on the experience.",
            cta: "Learn More",
            ctaSubtext: "Response within 24 business hours.",
            idealFor: "Ideal for",
            idealForText: "National finals, student leagues, brand roadshows, showmatches, trade shows & conferences.",
            features: {
              projectManagement: "Project management & global planning",
              scenography: "Scenography & brand design (sets, LED, signage)",
              lanSetup: "Hardware & LAN network setup (PC/console) + anti-cheat",
              liveProduction: "Live production & streaming (broadcast, overlays, casters)",
              formats: "Formats, rulebook, refereeing & on-site staff",
              sponsorActivations: "Sponsor activations & partner booths",
              ticketing: "Ticketing & public reception",
              security: "Security, insurance & compliance",
              postEvent: "Stats, highlights & post-event reporting"
            }
          }
        },
        requestAccessForm: {
          title: "Request Access",
          subtitle: "Fill out the form below to join our community",
          pseudo: {
            label: "Username",
            placeholder: "Ex. MrWire",
            required: "Username is required"
          },
          contact: {
            label: "Contact",
            subtitle: "At least one is required",
            email: {
              label: "Email",
              placeholder: "example@domain.com"
            },
            whatsapp: {
              label: "WhatsApp",
              placeholder: "+212 6 …"
            },
            required: "Email or WhatsApp is required"
          },
          socialNetworks: {
            label: "Social Networks",
            subtitle: "Select at least one and provide the link",
            platforms: {
              twitch: "Twitch",
              youtube: "YouTube",
              kick: "Kick",
              tiktok: "TikTok Live",
              facebook: "Facebook Gaming",
              instagram: "Instagram",
              twitter: "X / Twitter",
              discord: "Discord",
              linktree: "Linktree / Beacons"
            },
            placeholders: {
              twitch: "https://twitch.tv/yourchannel",
              youtube: "https://youtube.com/@yourusername",
              kick: "https://kick.com/yourusername",
              tiktok: "https://tiktok.com/@yourusername",
              facebook: "https://www.facebook.com/gaming/yourusername",
              instagram: "https://instagram.com/yourusername",
              twitter: "https://twitter.com/yourusername",
              discord: "https://discord.gg/XXXXXX",
              linktree: "https://linktr.ee/yourusername"
            },
            required: "At least one social network with a valid URL is required",
            invalidUrl: "Invalid link — paste the complete URL"
          },
          consent: {
            label: "I agree to be contacted regarding my request",
            required: "You must accept to be contacted"
          },
          submit: "Submit Request",
          submitSubtext: "Response within 24 business hours.",
          success: "Your request has been submitted successfully!",
          error: "An error occurred. Please try again."
        },
        comparison: {
          title: "Compare Plans",
          subtitle: "Choose the perfect plan for your esports ambitions",
          choosePlan: "Choose Your Plan",
          features: "Features",
          community: "Community",
          whiteLabel: "White-label",
          free: "Free",
          custom: "Custom",
          contactUs: "Contact Us",
          premium: "PREMIUM",
          rows: {
            maxParticipants: "Max participants",
            formats: "Tournament formats",
            brackets: "Automated brackets",
            stats: "Real-time stats",
            sponsorIntegration: "Sponsor integration",
            customBranding: "Custom branding",
            whiteLabelSolution: "White-label solution",
            dedicatedSupport: "Dedicated support",
            standard: "Standard",
            allCustom: "All + Custom",
            unlimited: "Unlimited"
          }
        },
        features: {
          badge: "ORGANIZERS",
          title: "The Power of a Pro Tool, Made Simple",
          subtitle: "Managing an esports event shouldn't be complicated. We've designed an intuitive interface that automates complex tasks.",
          flexibility: {
            title: "Total Flexibility",
            description: "No matter the game or format, our platform adapts to your vision."
          },
          engagement: {
            title: "Player Engagement",
            description: "Professional experience with profiles, stats, and real-time leaderboards."
          },
          monetization: {
            title: "Simplified Monetization",
            description: "Easily integrate your sponsors and manage ticketing."
          },
          setupTime: "Average Setup Time",
          setupTimeLabel: "Average Setup Time"
        },
        faq: {
          title: "Frequently Asked Questions",
          subtitle: "Everything you need to know about our platform",
          gotQuestions: "Got Questions?",
          questions: {
            games: {
              q: "Which games are supported?",
              a: "Absolutely all of them! You define the rules."
            },
            technical: {
              q: "Do I need technical skills?",
              a: "Not at all. Our interface is designed to be simple and intuitive."
            },
            paid: {
              q: "What's the difference between Community and White-label plans?",
              a: "The Community plan is free and perfect for small tournaments (up to 64 participants) with standard formats. The White-label plan offers unlimited participants, custom branding, advanced analytics, and dedicated support for professional operations."
            },
            payment: {
              q: "Can I upgrade from Community to White-label plan?",
              a: "Absolutely! You can upgrade anytime to unlock advanced features. Contact our sales team to discuss your needs and get a custom quote tailored to your event scale and requirements."
            }
          }
        },
        cta: {
          title: "Ready to Launch Your Next Big Event?",
          subtitle: "Join hundreds of organizers who trust us. Create your first tournament in minutes.",
          button: "Start for Free →",
          startJourney: "Start Your Journey",
          freeToStart: "Free to get started"
        }
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
        cardTitle: "Pass Gamius",
        cardSubtitle: "Official • Morocco 2025",
        cardMemberStatus: "Active Member",
        cardMemberId: "Member ID",
        cardStatus: "Status",
        cardActive: "Active",
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
        advantages: "Pass Benefits",
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
          tournaments: {
            title: "Competitions",
            description:
              "Participation in regional and national tournaments",
          },
        },
        ctaButton: "Join us now",
        noFees: "No fees • Instant",
        statsActiveMembers: "Active members",
        statsProcessing: "Processing",
        statsFree: "Free",
      },
      // Documentation Center
      documentationCenter: {
        title: "OFFICIAL DOCUMENTATION",
        description:
          "Access comprehensive tournament information, regulations, and resources to prepare for GAMIUS competitions.",
        backHome: "Back to Home",
        cards: {
          regulations: "Regulations",
          regulationsDesc: "Download official regulations for our competitions",
          strategyGuides: "Guides",
          guidesDesc: "View our practical guides to prepare yourself",
          mediaKit: "Resources",
          resourcesDesc: "Access media resources and official templates",
        },
        downloadZone: {
          title: "DOWNLOAD CENTER",
          subtitle: "Download official regulations, guides, and resources to prepare for GAMIUS tournaments",
          description:
            "Access and download official tournament regulations, practical guides, and all necessary resources to prepare for your participation.",
          new: "NEW",
          downloadButton: "Download",
          accessButton: "Access Documentation",
          viewDocuments: "View Documents",
          viewGuides: "View Guides",
          viewResources: "View Resources",
          searchPlaceholder: "Search...",
          noResults: "No resources match your search",
          tryAnother: "Try another term or category",
          size: "Size:",
          updated: "Updated:",
          tabs: {
            all: "All",
            rules: "Regulations",
            guides: "Guides"
          },
          documents: {
            rulebook: {
              title: "Official GAMIUS 2025 Rulebook",
              description: "General regulations for GAMIUS 2025 competitions"
            },
            participationGuide: {
              title: "Tournament Registration Guide",
              description: "Step-by-step tutorial to register for tournaments and validate your team"
            }
          },
          helpBanner: {
            title: "Need help with documents?",
            description: "If you have questions about documents or need assistance, our team is here to help.",
            contactButton: "Contact Us"
          }
        },
      },
      // ProPath
      proPath: {
        title: "YOUR PATH TO PRO GAMING",
        tagline: "ESPORTS START HERE",
        description:
          "Whether you're a player or an organizer, our platform is the meeting point for the gaming community. Find, create, and compete in events made for you.",
        cta: "Find your competition",
        nextEvent: "Next qualifications: March 2026",
        supportedGames: "Supported games:",
        formatFeatures: "KEY FEATURES",
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
          title: "JOIN THE COMPETITION",
          description:
            " Your next adventure awaits. Browse hundreds of community-run tournaments, find teammates, and make a name for yourself. Whatever your skill level, there's a place for you here.",
          keyFeatures: {
            title: "KEY FEATURES:",
            format: "All games, all platforms",
            groups: "Filter by skill level, format, and prize pool",
            type: "Player profiles and stat tracking",
          },
        },
        nationalChampionships: {
          title: "CREATE MEMORABLE EVENTS",
          description:
            " Bring your ideas to life. Our toolset allows you to create, manage, and promote tournaments from start to finish. From a friendly competition to a professional league, we have the solution.",
          keyFeatures: {
            title: "KEY FEATURES:",
            format: "Automated bracket and score management",
            points: "Easy sponsor integration",
            coverage: "Built-in communication tools for your participants",
          },
        },
        eliteLeague: {
          title: "A CENTRAL HUB FOR ESPORTS",
          description:
            "More than just a tournament website, we are a complete ecosystem where the passion for gaming comes alive. This is where legends are born, communities grow stronger, and esports thrive.",
          link: "Discover the league ↗",
          keyFeatures: {
            title: "KEY FEATURES:",
            training: "News and rankings from the local scene",
            coverage: "Resources for content creators",
            format: "A network of trusted partners",
          },
        },
        // grandFinal: {
        //   title: "GRAND NATIONAL LAN FINAL",
        //   description:
        //     "This is where history is made! After dominating the qualifiers, face the best on stage, in front of an electrified crowd and under the media spotlight. Become the champion you're destined to be.",
        //   keyFeatures: {
        //     title: "Competition Format",
        //     format: "Live finals on stage",
        //     prizes: "Official prizes and recognition",
        //     broadcast: "Television broadcast and streaming platforms",
        //   },
        // },
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
      // Complete Documentation section
      completeDocumentation: {
        title: "COMPLETE DOCUMENTATION",
        description:
          "Everything you need to master the competition is right here. Download the regulations, guides, and all official GAMIUS resources to prepare for your victory.",
        buttons: {
          download: "Download Resources 📄",
          viewOnline: "View Online ↗",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle:
          "Get quick answers to your questions about GAMIUS tournaments and participation",
        searchPlaceholder: "Search for a question...",
        noResults: 'No results found for "{searchTerm}"',
        tryAgain: "Try another term or browse all questions below",
        resultsCount:
          '{count} {count, plural, one {result} other {results}} for "{searchTerm}"',
        category: "Category",
        noAnswerFound: "Didn't find the answer to your question?",
        contactUs: "Contact us directly",
        categories: {
          registration: {
            title: "Registration & Account",
            questions: {
              0: {
                question: "How can I register for Gamius tournaments?",
                answer:
                  'Registration is simple! Create an account on our platform, complete your player profile, and then you can sign up for your region\'s qualifiers directly from the "Tournaments" page.',
              },
              1: {
                question: "Is registration free?",
                answer:
                  "Yes, creating your account and participating in standard qualifiers is 100% free. Our goal is to make competition accessible to all Moroccan talents.",
              },
              2: {
                question: "What is the Gamius Pass and how do I get it?",
                answer:
                  "The Gamius Pass is your free VIP access to exclusive benefits like early access to tournaments and offers from our partners. You can activate it instantly from your dashboard once your profile is complete.",
              },
            },
          },
          format: {
            title: "Competition Format",
            questions: {
              0: {
                question: "How does the competitive circuit work?",
                answer:
                  "The circuit is a progressive journey: you start with the qualifiers in your region. If you stand out, you advance to the national championships, then to the Elite League, with the ultimate goal being the Grand National LAN Final.",
              },
              1: {
                question: "What types of game formats are used?",
                answer:
                  "We use standard competitive formats to ensure fairness. This includes group stages and double-elimination brackets for qualifiers, and a seasonal league system for the national championships.",
              },
              2: {
                question: "How do I qualify for the next stage?",
                answer:
                  "Qualification is based on your performance. In the early stages, you must finish at the top of your tournament's bracket. For the championships, a seasonal points system determines who moves forward.",
              },
            },
          },
          rules: {
            title: "Rules & Conduct",
            questions: {
              0: {
                question: "Where can I find the full tournament rulebook?",
                answer:
                  'All detailed regulations, per game and competition stage, are available in our "Download Zone." We strongly advise you to read them carefully.',
              },
              1: {
                question: "What is your policy on cheating?",
                answer:
                  "We have a zero-tolerance policy towards cheating in any form (software, bug exploits, etc.). Any violation will result in immediate disqualification and potentially a permanent ban from our competitions.",
              },
              2: {
                question: "Are there any age restrictions to participate?",
                answer:
                  "Yes, the minimum age to participate is generally 16, but this may vary depending on the game and its PEGI rating. Specific requirements are always listed in each tournament's rulebook.",
              },
            },
          },
          logistics: {
            title: "Logistics & Events",
            questions: {
              0: {
                question: "Are tournaments online or in-person?",
                answer:
                  "It's a mix of both! The initial qualifier stages are mostly online to be accessible to everyone. The regional finals and national stages are physical (LAN) events for an unforgettable experience.",
              },
              1: {
                question:
                  "Do I need to bring my own equipment (PC, controller, etc.)?",
                answer:
                  "For online events, you use your own setup. For LAN events, we provide the PCs and monitors. However, you are encouraged to bring your own peripherals (keyboard, mouse, controller, headset) to be as comfortable as possible.",
              },
              2: {
                question: "How are prizes distributed?",
                answer:
                  "Cash prizes are typically distributed via bank transfer within 30 to 60 days after the competition ends. Physical prizes are awarded in person at the event's closing ceremony.",
              },
            },
          },
        },
      },
      // Guides
      guides: {
        title: "Tournament Guides",
        description: "Step-by-step guides to help you navigate registration, team creation, and tournament participation on the GAMIUS platform.",
        backToDocumentation: "Back to Documentation",
        downloadPDF: "Download as PDF",
        needHelp: {
          title: "Need More Help?",
          description: "If you have any questions or encounter issues, our support team is here to help you. Contact us at",
          faq: "View FAQ"
        },
        register: {
          title: "How to Register",
          step1: {
            title: "Visit the Website",
            desc: "Navigate to the GAMIUS official website and click on the \"Sign Up\" or \"Register\" button in the top navigation bar.",
          },
          step2: {
            title: "Fill in Your Information",
            desc: "Enter your personal details including your full name, email address, phone number, and create a secure password.",
            note: "Make sure to use a valid email address as you will need to verify it."
          },
          step3: {
            title: "Verify Your Email",
            desc: "Check your email inbox for a verification link sent by GAMIUS. Click the link to activate your account."
          },
          step4: {
            title: "Complete Your Profile",
            desc: "Once verified, log in and complete your profile by adding additional information such as your gaming IDs, preferred games, and bio."
          }
        },
        login: {
          title: "How to Login",
          step1: {
            title: "Go to Login Page",
            desc: "Click on the \"Login\" or \"Sign In\" button on the homepage navigation bar."
          },
          step2: {
            title: "Enter Your Credentials",
            desc: "Type in the email address and password you used during registration.",
            note: "If you forgot your password, click \"Forgot Password\" to reset it via email."
          },
          step3: {
            title: "Access Your Dashboard",
            desc: "After successful login, you will be redirected to your personal dashboard where you can manage your profile, teams, and tournament registrations."
          }
        },
        createTeam: {
          title: "How to Create a Team",
          step1: {
            title: "Navigate to Teams Section",
            desc: "From your dashboard, click on \"Teams\" in the navigation menu, then select \"Create New Team\"."
          },
          step2: {
            title: "Set Team Details",
            desc: "Enter your team name, tag (abbreviation), and upload a team logo. Choose the game your team will compete in.",
            note: "Team names must be unique and follow GAMIUS naming guidelines. No offensive language is allowed."
          },
          step3: {
            title: "Invite Team Members",
            desc: "Add team members by entering their email addresses or GAMIUS usernames. They will receive an invitation to join your team."
          },
          step4: {
            title: "Complete Team Roster",
            desc: "Ensure your team has the minimum required number of players for the tournament. Each member must accept the invitation and complete their profile."
          },
          step5: {
            title: "Verify Team Status",
            desc: "Once all members have joined and the team meets tournament requirements, your team status will show as \"Ready\". You can now register for tournaments."
          }
        },
        joinTeam: {
          title: "How to Join a Team",
          step1: {
            title: "Receive Team Invitation",
            desc: "You will receive an email notification and in-app notification when a team captain invites you to join their team."
          },
          step2: {
            title: "Review Team Information",
            desc: "Click on the invitation to view team details including team name, members, game, and upcoming tournaments."
          },
          step3: {
            title: "Accept or Decline",
            desc: "If you want to join, click \"Accept Invitation\". If not interested, you can decline politely. You can only be part of one team per game at a time.",
            note: "Make sure you are committed to participate before accepting, as leaving teams frequently may affect your reputation."
          },
          step4: {
            title: "Complete Team Requirements",
            desc: "Ensure your profile has all required information and your game IDs are up to date. Some teams may require additional verification."
          }
        },
        joinTournament: {
          title: "How to Join Tournaments",
          step1: {
            title: "Browse Tournaments",
            desc: "Go to the \"Tournaments\" section from the main menu. Browse available tournaments by game, date, or prize pool."
          },
          step2: {
            title: "Check Requirements",
            desc: "Click on a tournament to view details including format, rules, schedule, and eligibility requirements. Make sure you meet all criteria.",
            note: "Some tournaments require team registration while others allow solo players. Check the format before registering."
          },
          step3: {
            title: "Register Your Team",
            desc: "For team tournaments, select your team from the dropdown and click \"Register Team\". All team members will be notified of the registration."
          },
          step4: {
            title: "Pay Registration Fee (If Required)",
            desc: "Some tournaments may have entry fees. Follow the payment instructions if applicable. Free tournaments will confirm your registration immediately."
          },
          step5: {
            title: "Confirm Registration",
            desc: "After payment confirmation (if required), your team will appear in the registered participants list. You will receive tournament bracket details and schedule via email."
          },
          step6: {
            title: "Prepare for Competition",
            desc: "Check the tournament schedule, read the rules carefully, and make sure all team members are available for match times. Join the official tournament Discord/communication channel if provided."
          }
        }
      },
      // Privacy Policy
      privacyPolicy: {
        title: "Privacy Policy",
        backHome: "Back to Home",
        lastUpdated: "Last Updated",
        intro: {
          title: "Introduction",
          content: "GAMIUS GROUP is committed to protecting your personal data and respecting your privacy. This privacy policy explains how we collect, use, and protect your personal information in accordance with applicable laws.",
          moroccanLaw: "This policy complies with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data and the regulations of the National Commission for the Control of Personal Data Protection (CNDP)."
        },
        dataCollection: {
          title: "Data Collection",
          intro: "We collect the following types of information:",
          items: {
            personal: "Personal information (name, date of birth, gender)",
            contact: "Contact information (email, phone number)",
            gaming: "Gaming profile data (username, game statistics, tournament history)",
            technical: "Technical data (IP address, browser type, device information)"
          }
        },
        dataUsage: {
          title: "Use of Data",
          intro: "We use your data for the following purposes:",
          items: {
            tournaments: "Managing your participation in tournaments and competitions",
            communication: "Sending notifications about events and updates",
            improvement: "Improving our services and user experience",
            security: "Ensuring platform security and preventing fraud"
          }
        },
        dataProtection: {
          title: "Data Protection",
          content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and only accessible to authorized personnel."
        },
        userRights: {
          title: "Your Rights",
          intro: "In accordance with Moroccan Law No. 09-08 and CNDP regulations, you have the following rights:",
          items: {
            access: "Right to access your personal data",
            correction: "Right to correct inaccurate or incomplete data",
            deletion: "Right to request deletion of your data",
            objection: "Right to object to data processing",
            portability: "Right to data portability"
          },
          contact: "To exercise these rights, please contact us at the address provided below."
        },
        cookies: {
          title: "Cookies",
          content: "We use cookies to enhance your browsing experience and analyze site traffic. You can disable cookies in your browser settings, but this may affect certain features of our platform."
        },
        dataSharing: {
          title: "Data Sharing",
          content: "We do not sell or rent your personal data to third parties. We may share your information with trusted partners only when necessary to provide our services or comply with legal obligations."
        },
        contact: {
          title: "Contact",
          content: "For any questions regarding this privacy policy or to exercise your rights:",
          cndp: "You may also file a complaint with the National Commission for the Control of Personal Data Protection (CNDP) - www.cndp.ma"
        }
      },
      // Terms of Service
      termsOfService: {
        title: "Terms of Service",
        backHome: "Back to Home",
        lastUpdated: "Last Updated",
        acceptance: {
          title: "Acceptance of Terms",
          content: "By accessing and using the GAMIUS platform, you accept and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you should not use our services."
        },
        services: {
          title: "Description of Services",
          content: "GAMIUS provides an online platform for esports competitions and tournaments. We offer tournament management tools, player profiles, leaderboards, and community features for gamers in Morocco."
        },
        userAccount: {
          title: "User Account",
          intro: "To participate in tournaments, you must create an account. You agree to:",
          items: {
            accurate: "Provide accurate and complete information",
            confidential: "Keep your password confidential",
            responsible: "Be responsible for all activities under your account",
            notify: "Notify us immediately of any unauthorized access"
          }
        },
        conduct: {
          title: "Code of Conduct",
          intro: "You agree not to:",
          items: {
            cheating: "Use cheating software, hacks, or exploits",
            harassment: "Engage in harassment, hate speech, or toxic behavior",
            impersonation: "Impersonate other users or organizations",
            illegal: "Post illegal or harmful content",
            spam: "Send spam or unsolicited messages"
          }
        },
        tournaments: {
          title: "Tournament Rules",
          content: "All tournament participants must comply with the specific rules and regulations of each competition. Violations may result in disqualification and account suspension."
        },
        intellectualProperty: {
          title: "Intellectual Property",
          content: "All content on the GAMIUS platform, including logos, graphics, and text, is the property of GAMIUS GROUP and protected by Moroccan and international intellectual property laws."
        },
        liability: {
          title: "Limitation of Liability",
          content: "GAMIUS GROUP is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. We do not guarantee uninterrupted or error-free service."
        },
        termination: {
          title: "Termination",
          content: "We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our sole discretion."
        },
        applicableLaw: {
          title: "Applicable Law",
          content: "These terms are governed by Moroccan law. Any disputes will be subject to the exclusive jurisdiction of Moroccan courts."
        },
        modifications: {
          title: "Modifications",
          content: "We reserve the right to modify these terms at any time. Changes will be effective upon posting to the platform. Continued use of our services constitutes acceptance of the modified terms."
        },
        contact: {
          title: "Contact",
          content: "For any questions regarding these terms of service:"
        }
      },
    },
  },
  fr: {
    translation: {
      // Navigation
      nav: {
        discover: "Decouvrir",
        passGamers: "Pass Gamius",
        documentation: "Documentation",
        faq: "FAQ",
        tri9lGlory: "Voie de la Gloire",
        prizePool: "Prix",
        playFree: "Jouer Gratuitement",
        login: "Connexion",
        proPath: "Parcours Pro",
        organizer: "Organisateur",
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
        subtitle: {
          part1: "La ou les legendes naissent. ",
          part2: "Ton arene t'attend!",
          part3: "Plonge dans l'action, rejoins une communaute de champions ",
          part4: "et forge ta propre histoire. Le jeu commence maintenant !",
        },
        bottomTitle: {
          part1: "La ou les legendes",
          part2: "naissent.",
        },
        playNow: "JOUER MAINTENANT",
      },
      // tri9lGlory section
      tri9lGlory: {
        title: "LA VOIE DE LA GLOIRE",
        description:
          "D'amateur a pro, chaque victoire te rapproche de la legende. Ton ascension commence ici.",
        steps: {
          step1Title: "DeBUTANT",
          step2Title: "CHALLENGER",
          step3Title: "CHAMPION",
          step1:
            "INSCRIS-TOI : Cree ton profil en quelques clics. Rejoindre l'arene est simple, rapide et gratuit !",
          step2:
            "AFFRONTE : Plonge dans les qualifications en ligne. Montre ton skill et impose ton style face a la communaute.",
          step3:
            "TRIOMPHE : Qualifie-toi pour la grande finale et grave ton nom parmi les legendes. La gloire est a ta portee.",
        },
      },
      // PrizePool section
      prizePool: {
        title: "PRIZE POOL",
        description:
          "Ton talent merite une recompense. Battez-vous pour la gloire et le butin !",
        totalPrizePool: "Cagnotte Totale",
        seasonRewards: "Recompenses Officielles Saison 2026",
        additionalInfo:
          "Des prix supplementaires peuvent être attribues tout au long de la competition, notamment du materiel gaming, des produits derives et des opportunites exclusives.",
        places: {
          first: "1ere Place",
          second: "2eme Place",
          third: "3eme Place",
        },
      },
      // About
      about: {
        title: "Rejoins la legende !",
        subtitle:
          "Les plus grands tournois e-sport du Maroc t'attendent. Montre ton talent, domine la competition et vis l'aventure partagee la plus intense. Prêt a faire trembler l'arene ?",
        clickPrompt: "CLIQUEZ",
        description:
          "GAMIUS GROUP est le principal evenement de jeux video au Maroc, presentant les dernieres technologies, des competitions d'esport et la culture du gaming.",
      },
      // Features
      features: {
        title: "Ce Que Nous Offrons",
        tournaments: "Tournois",
        tournamentsDesc:
          "Participez a des tournois a forts enjeux avec des prix incroyables",
        community: "Communaute",
        communityDesc:
          "Rejoignez une communaute dynamique de joueurs passionnes",
        experience: "Experience",
        experienceDesc: "Decouvrez les derniers jeux et technologies de pointe",
      },
      // Events
      events: {
        title: "evenements a Venir",
        viewAll: "Voir Tous les evenements",
      },
      // Organizer Page
      organizer: {
        hero: {
          badge: "Gestion Professionnelle de Tournois",
          title1: "Creez et Gerez des",
          title2: "Competitions",
          title3: "Inoubliables",
          subtitle: "Des événements locaux aux circuits mondiaux, notre plateforme vous donne les clés du succès. Concentrez-vous sur le spectacle, nous gérons la technologie."
        },
        plans: {
          community: {
            name: "Communaute",
            description: "Parfait pour les petits tournois locaux et pour débuter",
            price: "GRATUIT",
            priceDetail: "Accès gratuit : gérez vos tournois communautaires — demandez votre accès et gagnez une rémunération pour chaque tournoi créé et finalisé.",
            priceDetailShort: "Accès gratuit — demandez votre accès et touchez une prime pour chaque tournoi finalisé.",
            cta: "Demander un accès",
            ctaSubtext: "Réponse sous 24 h ouvrées.",
            features: {
              participants: "Jusqu'à 64 participants",
              formats: "Formats de tournoi standards",
              brackets: "Génération automatique des brackets",
              profiles: "Profils de participants basiques",
              support: "Support communautaire"
            }
          },
          whiteLabel: {
            name: "Marque blanche",
            description: "Solutions personnalisées pour les opérations à grande échelle",
            price: "Sur mesure",
            priceDetail: "Adapté à vos besoins",
            cta: "Contactez-nous",
            everythingPlus: "Tout ce qui est dans Communauté, plus:",
            features: {
              participants: "Participants illimités",
              solution: "Solution marque blanche",
              types: "Types de tournoi personnalisés",
              stats: "Statistiques et analyses en temps réel",
              manager: "Gestionnaire de compte dédié",
              support: "Support premium 24/7"
            }
          },
          esportEvents: {
            name: "Evenements Esport",
            subtitle: "Conception, Production & Gestion",
            description: "Clé en main, pour des shows LAN, online ou hybrides.",
            price: "Sur mesure",
            priceDetail: "Votre événement, notre expertise : de l'idée au show final. Nous pilotons la scène, la technique et les opérations pour que vous restiez focalisé sur l'expérience.",
            cta: "En savoir plus",
            ctaSubtext: "Réponse sous 24 h ouvrées.",
            idealFor: "Idéal pour",
            idealForText: "Finales nationales, ligues étudiantes, roadshows de marque, showmatches, salons & conférences.",
            features: {
              projectManagement: "Direction de projet & planning global",
              scenography: "Scénographie & habillage de marque (décors, LED, signalétique)",
              lanSetup: "Setup matériel & réseau LAN (PC/console) + anti-cheat",
              liveProduction: "Production live & streaming (régie, overlays, casters)",
              formats: "Formats, règlebook, arbitrage & staff terrain",
              sponsorActivations: "Activations sponsors & stands partenaires",
              ticketing: "Billetterie & accueil public",
              security: "Sécurité, assurance & conformité",
              postEvent: "Stats, highlights & reporting post-event"
            }
          }
        },
        requestAccessForm: {
          title: "Demander un acces",
          subtitle: "Remplissez le formulaire ci-dessous pour rejoindre notre communauté",
          pseudo: {
            label: "Pseudo",
            placeholder: "Ex. MrWire",
            required: "Le pseudo est obligatoire"
          },
          contact: {
            label: "Contact",
            subtitle: "Au moins un des deux est requis",
            email: {
              label: "Email",
              placeholder: "exemple@domaine.com"
            },
            whatsapp: {
              label: "WhatsApp",
              placeholder: "+212 6 …"
            },
            required: "Email ou WhatsApp est obligatoire"
          },
          socialNetworks: {
            label: "Réseaux sociaux",
            subtitle: "Sélectionnez au moins un réseau et fournissez le lien",
            platforms: {
              twitch: "Twitch",
              youtube: "YouTube",
              kick: "Kick",
              tiktok: "TikTok Live",
              facebook: "Facebook Gaming",
              instagram: "Instagram",
              twitter: "X / Twitter",
              discord: "Discord",
              linktree: "Linktree / Beacons"
            },
            placeholders: {
              twitch: "https://twitch.tv/votrechaîne",
              youtube: "https://youtube.com/@votrepseudo",
              kick: "https://kick.com/votrepseudo",
              tiktok: "https://tiktok.com/@votrepseudo",
              facebook: "https://www.facebook.com/gaming/votrepseudo",
              instagram: "https://instagram.com/votrepseudo",
              twitter: "https://twitter.com/votrepseudo",
              discord: "https://discord.gg/XXXXXX",
              linktree: "https://linktr.ee/votrepseudo"
            },
            required: "Au moins un réseau social avec une URL valide est requis",
            invalidUrl: "Lien invalide — collez l'URL complète"
          },
          consent: {
            label: "J'accepte d'être contacté(e) au sujet de ma demande",
            required: "Vous devez accepter d'être contacté"
          },
          submit: "Envoyer la demande",
          submitSubtext: "Réponse sous 24 h ouvrées.",
          success: "Votre demande a été envoyée avec succès !",
          error: "Une erreur s'est produite. Veuillez réessayer."
        },
        comparison: {
          title: "Comparer les Plans",
          subtitle: "Choisissez le plan parfait pour vos ambitions esport",
          choosePlan: "Choisissez Votre Plan",
          features: "Fonctionnalités",
          community: "Communauté",
          whiteLabel: "Marque blanche",
          free: "Gratuit",
          custom: "Sur mesure",
          contactUs: "Contactez-nous",
          premium: "PREMIUM",
          rows: {
            maxParticipants: "Participants maximum",
            formats: "Formats de tournoi",
            brackets: "Brackets automatisés",
            stats: "Statistiques en temps réel",
            sponsorIntegration: "Intégration des sponsors",
            customBranding: "Image de marque personnalisée",
            whiteLabelSolution: "Solution marque blanche",
            dedicatedSupport: "Support dédié",
            standard: "Standard",
            allCustom: "Tout + Personnalisé",
            unlimited: "Illimité"
          }
        },
        features: {
          badge: "ORGANISATEURS",
          title: "La Puissance d'un Outil Pro, en Toute Simplicite",
          subtitle: "Gérer un événement esport ne devrait pas être compliqué. Nous avons conçu une interface intuitive qui automatise les tâches complexes.",
          flexibility: {
            title: "Flexibilité Totale",
            description: "Peu importe le jeu ou le format, notre plateforme s'adapte à votre vision."
          },
          engagement: {
            title: "Engagement des Joueurs",
            description: "Expérience professionnelle avec profils, statistiques et classements en temps réel."
          },
          monetization: {
            title: "Monétisation Simplifiée",
            description: "Intégrez facilement vos sponsors et gérez la billetterie."
          },
          setupTime: "Temps de Configuration Moyen",
          setupTimeLabel: "Temps de Configuration Moyen"
        },
        faq: {
          title: "Questions Frequemment Posees",
          subtitle: "Tout ce que vous devez savoir sur notre plateforme",
          gotQuestions: "Des Questions?",
          questions: {
            games: {
              q: "Quels jeux sont pris en charge?",
              a: "Absolument tous! Vous définissez les règles."
            },
            technical: {
              q: "Ai-je besoin de compétences techniques?",
              a: "Pas du tout. Notre interface est conçue pour être simple et intuitive."
            },
            paid: {
              q: "Quelle est la différence entre les plans Communauté et Marque blanche?",
              a: "Le plan Communauté est gratuit et parfait pour les petits tournois (jusqu'à 64 participants) avec des formats standards. Le plan Marque blanche offre des participants illimités, un branding personnalisé, des analyses avancées et un support dédié pour les opérations professionnelles."
            },
            payment: {
              q: "Puis-je passer du plan Communauté au plan Marque blanche?",
              a: "Absolument ! Vous pouvez upgrader à tout moment pour débloquer des fonctionnalités avancées. Contactez notre équipe commerciale pour discuter de vos besoins et obtenir un devis personnalisé adapté à l'échelle et aux exigences de votre événement."
            }
          }
        },
        cta: {
          title: "Pret a Lancer Votre Prochain Grand evenement?",
          subtitle: "Rejoignez des centaines d'organisateurs qui nous font confiance. Créez votre premier tournoi en quelques minutes.",
          button: "Commencer Gratuitement →",
          startJourney: "Commencez Votre Aventure",
          freeToStart: "Gratuit pour commencer"
        }
      },
      // Footer
      footer: {
        description:
          "GAMIUS GROUP est l'evenement gaming premier au Maroc, presentant les dernieres nouveautes en matiere de jeux video, de competitions esport, et creant des opportunites pour les joueurs talentueux.",
        quickLinks: "Liens Rapides",
        links: {
          home: "Accueil",
          tournaments: "Tournois",
          prizes: "Prix",
          contact: "Contact",
        },
        followUs: "Suivez-nous",
        sponsoredBy: "Sous le patronage du",
        copyright: "© {year} GAMIUS GROUP. Tous droits reserves.",
        legal: {
          privacy: "Politique de Confidentialite",
          terms: "Conditions d'Utilisation",
        },
        dashboard: "Espace Utilisateur",
      },
      // PassGamers
      passGamers: {
        title: "PASS GAMIUS",
        cardTitle: "Pass Gamius",
        cardSubtitle: "Officiel • Maroc 2025",
        cardMemberStatus: "Membre Actif",
        cardMemberId: "ID Membre",
        cardStatus: "Statut",
        cardActive: "Actif",
        subtitle:
          "Ton acces VIP a l'univers GAMIUS. Rejoins le club des joueurs privilegies et debloque : Acces anticipe aux tournois, Recompenses uniques, Offres de nos marques partenaires 🚀",
        officialInitiative: "100% GRATUIT & EXCLUSIF",
        howItWorks: "Comment obtenir ton Pass Gamius",
        step1: "S'inscrire",
        step1Desc: "Cree ton compte GAMIUS et finalise ton profil de joueur.",
        step2: "Activer",
        step2Desc:
          "Active ton Pass gratuitement depuis ton tableau de bord. C'est instantane !",
        step3: "Profiter",
        step3Desc:
          "Explore tes avantages et prepare-toi pour la prochaine competition.",
        selectPlan: "Selectionnez votre formule",
        monthlyPlan: "Mensuel",
        quarterlyPlan: "Trimestriel",
        annualPlan: "Annuel",
        advantages: "Avantages du Pass",
        recommended: "RECOMMANDe",
        choose: "Choisir",
        selected: "Selectionne:",
        noCommitment: "Sans engagement",
        quarterlyCommitment: "Engagement 3 mois",
        annualCommitment: "Engagement annuel",
        passActive:
          "Votre pass devient actif immediatement apres l'inscription",
        securePayment:
          "Paiement securise et conditions d'utilisation conformes aux directives ministerielles",
        // Benefits
        benefits: {
          tickets: {
            title: "Acces Anticipe",
            description:
              "Inscris-toi aux tournois avant tout le monde et garantis ta place.",
          },
          offers: {
            title: "Recompenses Uniques",
            description:
              "Reçois du loot exclusif, des cadeaux et des tickets VIP pour les plus grands evenements.",
          },
          status: {
            title: "Offres Partenaires",
            description:
              "Profite de reductions exclusives de nos marques partenaires, juste pour toi.",
          },
          community: {
            title: "Statut Premium",
            description:
              "Affiche un badge unique sur ton profil et sois reconnu par toute la communaute.",
          },
          tournaments: {
            title: "Competitions",
            description:
              "Participation aux tournois regionaux et nationaux",
          },
        },
        ctaButton: "Rejoins-nous maintenant",
        noFees: "Aucun frais • Instantane",
        statsActiveMembers: "Membres actifs",
        statsProcessing: "Traitement",
        statsFree: "Gratuit",
      },
      // Documentation Center
      documentationCenter: {
        title: "DOCUMENTATION OFFICIELLE",
        description:
          "Accedez aux informations completes sur les tournois, reglements et ressources pour preparer votre participation aux competitions GAMIUS.",
        backHome: "Retour a l'accueil",
        cards: {
          regulations: "Reglements",
          regulationsDesc: "Telechargez les reglements officiels de nos competitions",
          strategyGuides: "Guides",
          guidesDesc: "Consultez nos guides pratiques pour bien vous preparer",
          mediaKit: "Ressources",
          resourcesDesc: "Accedez aux ressources medias et modeles officiels",
        },
        downloadZone: {
          title: "CENTRE DE TELECHARGEMENT",
          subtitle: "Telechargez les reglements, guides et ressources officiels pour preparer votre participation aux tournois GAMIUS",
          description:
            "Consultez et telechargez les reglements officiels des tournois, les guides pratiques et toutes les ressources necessaires pour preparer votre participation.",
          new: "NOUVEAU",
          downloadButton: "Télécharger",
          accessButton: "Acceder a la documentation",
          viewDocuments: "Voir les documents",
          viewGuides: "Voir les guides",
          viewResources: "Voir les ressources",
          searchPlaceholder: "Rechercher...",
          noResults: "Aucune ressource ne correspond à votre recherche",
          tryAnother: "Essayez un autre terme ou catégorie",
          size: "Taille:",
          updated: "Mis à jour:",
          tabs: {
            all: "Tous",
            rules: "Règlements",
            guides: "Guides"
          },
          documents: {
            rulebook: {
              title: "Règlement Officiel GAMIUS 2025",
              description: "Règlement général des compétitions du GAMIUS 2025"
            },
            participationGuide: {
              title: "Guide d'Inscription aux Tournois",
              description: "Tutoriel pas-à-pas pour s'inscrire aux tournois et valider son équipe"
            }
          },
          helpBanner: {
            title: "Besoin d'aide avec les documents ?",
            description: "Si vous avez des questions concernant les documents ou besoin d'assistance, notre équipe est là pour vous aider.",
            contactButton: "Contactez-nous"
          }
        },
      },
      // ProPath
      proPath: {
        title: "TA VOIE VERS LE PRO-GAMING",
        tagline: "L'ESPORT COMMENCE ICI",
        description:
          "Que vous soyez joueur ou organisateur, notre plateforme est le point de rencontre de la communauté gaming. Trouvez, créez et participez à des compétitions à votre mesure.",
        cta: "Trouver une compétition",
        // cta: "Organiser un tournoi",
        nextEvent: "Prochaines qualifications : Mars 2026",
        supportedGames: "Jeux supportes:",
        formatFeatures: "POINTS CLÉS :",
        learnMore: "En savoir plus",
        statsTitle: "LE CIRCUIT GAMIUS EN CHIFFRES",
        stats: {
          regions: "12 Regions en competition",
          regionsDesc: "Ta chance de briller, ou que tu sois.",
          games: "4 Jeux a l'honneur",
          gamesDesc: "Prouve ton talent sur tes jeux preferes.",
          players: "400+ Communaute de champions",
          playersDesc: "Et l'aventure ne fait que commencer !",
          finale: "1 Destination finale",
          finaleDesc: "Un seul evenement pour sacrer le meilleur du Maroc.",
        },
        regionalQualifiers: {
          title: "REJOIGNEZ LA COMPETITION",
          description:
            "Votre prochaine aventure vous attend. Parcourez des centaines de tournois organisés par la communauté, trouvez des coéquipiers et faites-vous un nom. Quel que soit votre niveau, il y a une place pour vous.",
          keyFeatures: {
            title: "POINTS CLÉS",
            format: "Tous les jeux, toutes les plateformes",
            groups: "Filtrez par niveau, format et jeu",
            type: "Profils de joueurs et suivi des statistiques",
          },
        },
        nationalChampionships: {
          title: "CREEZ DES EVENEMENTS MEMORABLES",
          description:
            " Donnez vie à vos idées. Notre suite d'outils vous permet de créer, gérer et promouvoir des tournois de A à Z. De la simple compétition entre amis à la ligue professionnelle, nous avons la solution.",
          keyFeatures: {
            title: "POINTS CLÉS",
            format: "Gestion automatisée des brackets et des scores",
            points: "Intégration facile de vos sponsors",
            coverage: "Outils de communication intégrés pour vos participants",
          },
        },
        eliteLeague: {
          title: "UN HUB CENTRAL POUR L'ESPORT",
          description:
            " Plus qu'un simple site de tournois, nous sommes un écosystème complet où la passion du jeu prend vie. C'est ici que les légendes naissent, que les communautés se renforcent et que l'esport grandit.",
          keyFeatures: {
            title: "POINTS CLÉS",
            training: "Actualités et classements de la scène locale",
            coverage: "Ressources pour les créateurs de contenu",
            format: "Un réseau de partenaires de confiance",
          },
        },
        // grandFinal: {
        //   title: "GRANDE FINALE LAN NATIONALE",
        //   description:
        //     "C'est ici que l'histoire s'ecrit ! Apres avoir domine les qualifications, affronte les meilleurs sur scene, devant un public enflamme et sous les projecteurs des medias. Deviens le champion que tu es destine a être.",
        //   keyFeatures: {
        //     title: "POINTS CLÉS",
        //     format: "Finales presentielles sur scene",
        //     prizes: "Prix et reconnaissance officielle",
        //     broadcast: "Diffusion televisee et plateformes de streaming",
        //   },
        // },
        newSeason: {
          title: "MARS 2026 : LANCEMENT DE LA NOUVELLE SAISON GAMIUS",
          description:
            "La competition GAMIUS passe au niveau superieur ! Attends-toi a des formats inedits, des prix encore plus importants et un parcours professionnel structure pour t'aider a devenir une legende marocaine de l'e-sport.",
        },
      },
      // Join The Adventure section
      joinAdventure: {
        title: "REJOIGNEZ L'AVENTURE",
        steps: {
          step1: {
            number: "01",
            title: "DeBUTANT",
            action: "INSCRIVEZ-VOUS",
            description: "Creez votre compte sur notre plateforme officielle.",
            detail: "C'est rapide, facile et gratuit !",
          },
          step2: {
            number: "02",
            title: "CHALLENGER",
            action: "PARTICIPEZ",
            description: "Participez aux tournois et qualifications.",
            detail: "Montrez vos competences !",
          },
          step3: {
            number: "03",
            title: "CHAMPION",
            action: "eVOLUEZ",
            description: "Accedez aux finales et devenez champion.",
            detail: "La gloire vous attend !",
          },
        },
      },
      // Complete Documentation section
      completeDocumentation: {
        title: "DOCUMENTATION COMPLeTE",
        description:
          "Toutes les infos pour maîtriser la competition sont ici. Telecharge les reglements, les guides et toutes les ressources GAMIUS pour preparer ta victoire.",
        buttons: {
          download: "Telecharger les ressources 📄",
          viewOnline: "Consulter en ligne ↗",
        },
      },
      faq: {
        title: "Foire Aux Questions",
        subtitle:
          "Obtenez des reponses rapides a vos questions sur les tournois GAMIUS et la participation",
        searchPlaceholder: "Rechercher une question...",
        noResults: 'Aucun resultat trouve pour "{searchTerm}"',
        tryAgain:
          "Essayez un autre terme ou parcourez toutes les questions ci-dessous",
        resultsCount:
          '{count} {count, plural, one {resultat} other {resultats}} pour "{searchTerm}"',
        category: "Categorie",
        noAnswerFound: "Vous n'avez pas trouve la reponse a votre question ?",
        contactUs: "Contactez-nous directement",
        categories: {
          registration: {
            title: "Inscription & Compte",
            questions: {
              0: {
                question: "Comment puis-je m'inscrire aux tournois Gamius ?",
                answer:
                  "L'inscription est simple ! Cree un compte sur notre plateforme, complete ton profil de joueur, et tu pourras ensuite t'inscrire aux qualifications de ta region directement depuis la page \"Tournois\".",
              },
              1: {
                question: "L'inscription est-elle gratuite ?",
                answer:
                  "Oui, la creation de ton compte et la participation aux qualifications standards sont 100% gratuites. Notre objectif est de rendre la competition accessible a tous les talents marocains.",
              },
              2: {
                question: "Qu'est-ce que le Pass Gamius et comment l'obtenir ?",
                answer:
                  "Le Pass Gamius est ton acces VIP gratuit a des avantages exclusifs comme l'acces anticipe aux tournois et des offres de nos partenaires. Tu peux l'activer instantanement depuis ton tableau de bord une fois ton profil complete.",
              },
            },
          },
          format: {
            title: "Format de la Competition",
            questions: {
              0: {
                question: "Comment fonctionne le circuit competitif ?",
                answer:
                  "Le circuit est un parcours progressif : tu commences par les qualifications dans ta region. Si tu te distingues, tu accedes aux championnats nationaux, puis a la Ligue elite, avec pour objectif final la Grande Finale LAN Nationale.",
              },
              1: {
                question: "Quels types de formats de jeu sont utilises ?",
                answer:
                  "Nous utilisons des formats competitifs standards pour garantir l'equite. Cela inclut des phases de groupes et des brackets a double elimination pour les qualifications, et un systeme de ligue saisonnier pour les championnats nationaux.",
              },
              2: {
                question: "Comment se qualifier pour l'etape suivante ?",
                answer:
                  "La qualification depend de tes performances. Dans les premieres etapes, tu dois finir en haut du classement de ton tournoi. Pour les championnats, un systeme de points saisonnier determine qui avance.",
              },
            },
          },
          rules: {
            title: "Regles et Conduite",
            questions: {
              0: {
                question:
                  "Ou puis-je trouver le reglement complet des tournois ?",
                answer:
                  'Tous les reglements detailles, par jeu et par etape de la competition, sont disponibles dans notre "Zone de Telechargement". Nous te conseillons de les lire attentivement.',
              },
              1: {
                question: "Quelle est votre politique sur la triche ?",
                answer:
                  "Nous avons une politique de tolerance zero envers la triche sous toutes ses formes (logiciels, exploitation de bugs, etc.). Toute infraction entraînera une disqualification immediate et potentiellement un bannissement permanent de nos competitions.",
              },
              2: {
                question: "Y a-t-il des restrictions d'âge pour participer ?",
                answer:
                  "Oui, l'âge minimum pour participer est generalement de 16 ans, mais cela peut varier selon le jeu et ses restrictions PEGI. Les conditions specifiques sont toujours indiquees dans le reglement de chaque tournoi.",
              },
            },
          },
          logistics: {
            title: "Logistique et evenements",
            questions: {
              0: {
                question: "Les tournois sont-ils en ligne ou en personne ?",
                answer:
                  "C'est un melange des deux ! Les premieres phases de qualification se deroulent principalement en ligne pour être accessibles a tous. Les finales regionales et les etapes nationales sont des evenements physiques (LAN) pour une experience inoubliable.",
              },
              1: {
                question:
                  "Dois-je apporter mon propre equipement (PC, manette, etc.) ?",
                answer:
                  "Pour les evenements en ligne, tu utilises ton propre materiel. Pour les evenements LAN, nous fournissons les PC et les ecrans. Cependant, tu es encourage a apporter tes propres peripheriques (clavier, souris, manette, casque) pour être le plus a l'aise possible.",
              },
              2: {
                question: "Comment les prix sont-ils distribues ?",
                answer:
                  "Les prix en argent (cashprizes) sont generalement distribues par virement bancaire dans les 30 a 60 jours suivant la fin de la competition. Les prix materiels sont remis en main propre lors de la ceremonie de clôture de l'evenement.",
              },
            },
          },
        },
      },
      // Guides
      guides: {
        title: "Guides des Tournois",
        description: "Guides etape par etape pour vous aider a naviguer l'inscription, la creation d'equipes et la participation aux tournois sur la plateforme GAMIUS.",
        backToDocumentation: "Retour a la Documentation",
        downloadPDF: "Telecharger en PDF",
        needHelp: {
          title: "Besoin d'aide supplementaire ?",
          description: "Si vous avez des questions ou rencontrez des problemes, notre equipe d'assistance est la pour vous aider. Contactez-nous a",
          faq: "Voir la FAQ"
        },
        register: {
          title: "Comment s'inscrire",
          step1: {
            title: "Visitez le site Web",
            desc: "Accedez au site officiel GAMIUS et cliquez sur le bouton \"S'inscrire\" ou \"Creer un compte\" dans la barre de navigation superieure.",
          },
          step2: {
            title: "Remplissez vos informations",
            desc: "Entrez vos donnees personnelles, y compris votre nom complet, votre adresse e-mail, votre numero de telephone et creez un mot de passe securise.",
            note: "Assurez-vous d'utiliser une adresse e-mail valide car vous devrez la verifier."
          },
          step3: {
            title: "Verifiez votre e-mail",
            desc: "Consultez votre boîte de reception pour un lien de verification envoye par GAMIUS. Cliquez sur le lien pour activer votre compte."
          },
          step4: {
            title: "Completez votre profil",
            desc: "Une fois verifie, connectez-vous et completez votre profil en ajoutant des informations supplementaires telles que vos identifiants de jeu, vos jeux preferes et votre biographie."
          }
        },
        login: {
          title: "Comment se connecter",
          step1: {
            title: "Accedez a la page de connexion",
            desc: "Cliquez sur le bouton \"Connexion\" ou \"Se connecter\" dans la barre de navigation de la page d'accueil."
          },
          step2: {
            title: "Entrez vos identifiants",
            desc: "Saisissez l'adresse e-mail et le mot de passe que vous avez utilises lors de l'inscription.",
            note: "Si vous avez oublie votre mot de passe, cliquez sur \"Mot de passe oublie\" pour le reinitialiser par e-mail."
          },
          step3: {
            title: "Accedez a votre tableau de bord",
            desc: "Apres une connexion reussie, vous serez redirige vers votre tableau de bord personnel où vous pourrez gerer votre profil, vos equipes et vos inscriptions aux tournois."
          }
        },
        createTeam: {
          title: "Comment creer une equipe",
          step1: {
            title: "Accedez a la section Equipes",
            desc: "Depuis votre tableau de bord, cliquez sur \"Equipes\" dans le menu de navigation, puis selectionnez \"Creer une nouvelle equipe\"."
          },
          step2: {
            title: "Definissez les details de l'equipe",
            desc: "Entrez le nom de votre equipe, le tag (abreviation) et telechargez un logo d'equipe. Choisissez le jeu dans lequel votre equipe va concourir.",
            note: "Les noms d'equipe doivent etre uniques et suivre les directives de denomination GAMIUS. Aucun langage offensant n'est autorise."
          },
          step3: {
            title: "Invitez des membres de l'equipe",
            desc: "Ajoutez des membres de l'equipe en entrant leurs adresses e-mail ou leurs noms d'utilisateur GAMIUS. Ils recevront une invitation a rejoindre votre equipe."
          },
          step4: {
            title: "Completez la liste de l'equipe",
            desc: "Assurez-vous que votre equipe compte le nombre minimum de joueurs requis pour le tournoi. Chaque membre doit accepter l'invitation et completer son profil."
          },
          step5: {
            title: "Verifiez le statut de l'equipe",
            desc: "Une fois que tous les membres ont rejoint et que l'equipe repond aux exigences du tournoi, le statut de votre equipe s'affichera comme \"Pret\". Vous pouvez maintenant vous inscrire aux tournois."
          }
        },
        joinTeam: {
          title: "Comment rejoindre une equipe",
          step1: {
            title: "Recevez une invitation d'equipe",
            desc: "Vous recevrez une notification par e-mail et dans l'application lorsqu'un capitaine d'equipe vous invite a rejoindre son equipe."
          },
          step2: {
            title: "Consultez les informations de l'equipe",
            desc: "Cliquez sur l'invitation pour afficher les details de l'equipe, y compris le nom de l'equipe, les membres, le jeu et les tournois a venir."
          },
          step3: {
            title: "Accepter ou refuser",
            desc: "Si vous souhaitez rejoindre, cliquez sur \"Accepter l'invitation\". Si vous n'etes pas interesse, vous pouvez refuser poliment. Vous ne pouvez faire partie que d'une equipe par jeu a la fois.",
            note: "Assurez-vous d'etre engage a participer avant d'accepter, car quitter frequemment des equipes peut affecter votre reputation."
          },
          step4: {
            title: "Completez les exigences de l'equipe",
            desc: "Assurez-vous que votre profil contient toutes les informations requises et que vos identifiants de jeu sont a jour. Certaines equipes peuvent necessiter une verification supplementaire."
          }
        },
        joinTournament: {
          title: "Comment participer aux tournois",
          step1: {
            title: "Parcourir les tournois",
            desc: "Accedez a la section \"Tournois\" depuis le menu principal. Parcourez les tournois disponibles par jeu, date ou cagnotte."
          },
          step2: {
            title: "Verifier les exigences",
            desc: "Cliquez sur un tournoi pour afficher les details, y compris le format, les regles, le calendrier et les conditions d'eligibilite. Assurez-vous de repondre a tous les criteres.",
            note: "Certains tournois necessitent une inscription d'equipe tandis que d'autres autorisent les joueurs solo. Verifiez le format avant de vous inscrire."
          },
          step3: {
            title: "Inscrire votre equipe",
            desc: "Pour les tournois par equipe, selectionnez votre equipe dans la liste deroulante et cliquez sur \"Inscrire l'equipe\". Tous les membres de l'equipe seront avertis de l'inscription."
          },
          step4: {
            title: "Payer les frais d'inscription (si requis)",
            desc: "Certains tournois peuvent avoir des frais d'inscription. Suivez les instructions de paiement si applicable. Les tournois gratuits confirmeront votre inscription immediatement."
          },
          step5: {
            title: "Confirmer l'inscription",
            desc: "Apres confirmation du paiement (si requis), votre equipe apparaîtra dans la liste des participants inscrits. Vous recevrez les details du tableau et le calendrier du tournoi par e-mail."
          },
          step6: {
            title: "Preparez-vous pour la competition",
            desc: "Verifiez le calendrier du tournoi, lisez attentivement les regles et assurez-vous que tous les membres de l'equipe sont disponibles pour les heures de match. Rejoignez le canal de communication officiel du tournoi Discord s'il est fourni."
          }
        }
      },
      // Privacy Policy
      privacyPolicy: {
        title: "Politique de Confidentialite",
        backHome: "Retour a l'accueil",
        lastUpdated: "Derniere mise a jour",
        intro: {
          title: "Introduction",
          content: "GAMIUS GROUP s'engage à protéger vos données personnelles et à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément aux lois en vigueur.",
          moroccanLaw: "Cette politique est conforme à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et aux règlements de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)."
        },
        dataCollection: {
          title: "Collecte des Donnees",
          intro: "Nous collectons les types d'informations suivants :",
          items: {
            personal: "Informations personnelles (nom, date de naissance, sexe)",
            contact: "Coordonnées (email, numéro de téléphone)",
            gaming: "Données de profil joueur (pseudo, statistiques de jeu, historique des tournois)",
            technical: "Données techniques (adresse IP, type de navigateur, informations sur l'appareil)"
          }
        },
        dataUsage: {
          title: "Utilisation des Donnees",
          intro: "Nous utilisons vos données aux fins suivantes :",
          items: {
            tournaments: "Gestion de votre participation aux tournois et compétitions",
            communication: "Envoi de notifications sur les événements et mises à jour",
            improvement: "Amélioration de nos services et de l'expérience utilisateur",
            security: "Assurer la sécurité de la plateforme et prévenir la fraude"
          }
        },
        dataProtection: {
          title: "Protection des Donnees",
          content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés. Vos données sont stockées de manière sécurisée et accessibles uniquement au personnel autorisé."
        },
        userRights: {
          title: "Vos Droits",
          intro: "Conformément à la loi marocaine n° 09-08 et aux règlements de la CNDP, vous disposez des droits suivants :",
          items: {
            access: "Droit d'accès à vos données personnelles",
            correction: "Droit de rectification des données inexactes ou incomplètes",
            deletion: "Droit de demander la suppression de vos données",
            objection: "Droit d'opposition au traitement des données",
            portability: "Droit à la portabilité des données"
          },
          contact: "Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée ci-dessous."
        },
        cookies: {
          title: "Cookies",
          content: "Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic du site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités de notre plateforme."
        },
        dataSharing: {
          title: "Partage des Donnees",
          content: "Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations avec des partenaires de confiance uniquement lorsque cela est nécessaire pour fournir nos services ou nous conformer aux obligations légales."
        },
        contact: {
          title: "Contact",
          content: "Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits :",
          cndp: "Vous pouvez également déposer une plainte auprès de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) - www.cndp.ma"
        }
      },
      // Terms of Service
      termsOfService: {
        title: "Conditions d'Utilisation",
        backHome: "Retour a l'accueil",
        lastUpdated: "Derniere mise a jour",
        acceptance: {
          title: "Acceptation des Conditions",
          content: "En accédant et en utilisant la plateforme GAMIUS, vous acceptez et vous engagez à respecter ces termes et conditions. Si vous n'acceptez pas une partie de ces conditions, vous ne devez pas utiliser nos services."
        },
        services: {
          title: "Description des Services",
          content: "GAMIUS fournit une plateforme en ligne pour les compétitions et tournois d'esports. Nous offrons des outils de gestion de tournois, des profils de joueurs, des classements et des fonctionnalités communautaires pour les joueurs au Maroc."
        },
        userAccount: {
          title: "Compte Utilisateur",
          intro: "Pour participer aux tournois, vous devez créer un compte. Vous vous engagez à :",
          items: {
            accurate: "Fournir des informations exactes et complètes",
            confidential: "Garder votre mot de passe confidentiel",
            responsible: "Être responsable de toutes les activités sous votre compte",
            notify: "Nous informer immédiatement de tout accès non autorisé"
          }
        },
        conduct: {
          title: "Code de Conduite",
          intro: "Vous vous engagez à ne pas :",
          items: {
            cheating: "Utiliser des logiciels de triche, hacks ou exploits",
            harassment: "Vous engager dans le harcèlement, les discours de haine ou les comportements toxiques",
            impersonation: "Usurper l'identité d'autres utilisateurs ou organisations",
            illegal: "Publier du contenu illégal ou nuisible",
            spam: "Envoyer du spam ou des messages non sollicités"
          }
        },
        tournaments: {
          title: "Regles des Tournois",
          content: "Tous les participants aux tournois doivent se conformer aux règles et règlements spécifiques de chaque compétition. Les violations peuvent entraîner une disqualification et une suspension du compte."
        },
        intellectualProperty: {
          title: "Propriete Intellectuelle",
          content: "Tout le contenu de la plateforme GAMIUS, y compris les logos, graphiques et textes, est la propriété de GAMIUS GROUP et protégé par les lois marocaines et internationales sur la propriété intellectuelle."
        },
        liability: {
          title: "Limitation de Responsabilite",
          content: "GAMIUS GROUP n'est pas responsable des dommages indirects, accessoires ou consécutifs résultant de votre utilisation de la plateforme. Nous ne garantissons pas un service ininterrompu ou sans erreur."
        },
        termination: {
          title: "Resiliation",
          content: "Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment pour violation de ces conditions ou pour toute autre raison à notre seule discrétion."
        },
        applicableLaw: {
          title: "Loi Applicable",
          content: "Ces conditions sont régies par la loi marocaine. Tout litige sera soumis à la compétence exclusive des tribunaux marocains."
        },
        modifications: {
          title: "Modifications",
          content: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur la plateforme. L'utilisation continue de nos services constitue l'acceptation des conditions modifiées."
        },
        contact: {
          title: "Contact",
          content: "Pour toute question concernant ces conditions d'utilisation :"
        }
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        discover: "اكتشف",
        passGamers: "باس غاميوس",
        documentation: "التوثيق",
        faq: "الأسئلة الشائعة",
        tri9lGlory: "الطريق إلى المجد",
        prizePool: "جوائز البطولة",
        playFree: "العب مجانا",
        login: "تسجيل الدخول",
        proPath: "طريق المحترفين",
        organizer: "المنظم",
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
        bottomTitle: {
          part1: "حيث تولد الأساطير.",
          part2: "حلبتك تنتظرك!",
        },
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
            "سجِّل: أنشئ ملفك كلاعب في ثوانٍ. الانضمام إلى الحلبة سريع وسهل ومجاني!",
          step2:
            "نافس: اقتحم التصفيات عبر الإنترنت. أثبت مهاراتك وهيمن على المنافسة أمام الجميع.",
          step3:
            "ارتقِ: اسحق التصفيات للوصول إلى النهائيات الكبرى. اغتنم فرصتك لتصبح أسطورة.",
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
      // Organizer Page
      organizer: {
        hero: {
          badge: "إدارة احترافية للبطولات",
          title1: "أنشئ وأدر",
          title2: "لا تُنسى",
          title3: "منافسات",
          subtitle: "من الأحداث المحلية إلى الدوائر العالمية، منصتنا تمنحك مفاتيح النجاح. ركز على العرض، ونحن نتولى التكنولوجيا."
        },
        plans: {
          community: {
            name: "المجتمع",
            description: "مثالي للبطولات المحلية الصغيرة وللبدء",
            price: "مجاني",
            priceDetail: "وصول مجاني: أدِر بطولاتك المجتمعية — اطلب الوصول واحصل على تعويض عن كل بطولة تنشئها وتكملها.",
            priceDetailShort: "وصول مجاني — اطلب الوصول واحصل على مكافأة عن كل بطولة مكتملة.",
            cta: "طلب الوصول",
            ctaSubtext: "الرد خلال 24 ساعة عمل.",
            features: {
              participants: "حتى 64 مشاركاً",
              formats: "تنسيقات بطولات قياسية",
              brackets: "إنشاء جداول تلقائي",
              profiles: "ملفات تعريف أساسية للمشاركين",
              support: "دعم المجتمع"
            }
          },
          whiteLabel: {
            name: "العلامة البيضاء",
            description: "حلول مخصصة للعمليات واسعة النطاق",
            price: "مخصص",
            priceDetail: "مصمم حسب احتياجاتك",
            cta: "اتصل بنا",
            everythingPlus: "كل ما في المجتمع، بالإضافة إلى:",
            features: {
              participants: "مشاركون غير محدودين",
              solution: "حل العلامة البيضاء",
              types: "أنواع بطولات مخصصة",
              stats: "إحصائيات وتحليلات في الوقت الفعلي",
              manager: "مدير حساب مخصص",
              support: "دعم متميز 24/7"
            }
          },
          esportEvents: {
            name: "فعاليات الرياضات الإلكترونية",
            subtitle: "التصميم، الإنتاج والإدارة",
            description: "حل شامل لعروض LAN أو عبر الإنترنت أو هجينة.",
            price: "مخصص",
            priceDetail: "حدثك، خبرتنا: من الفكرة إلى العرض النهائي. نحن ندير المسرح والإعداد الفني والعمليات حتى تتمكن من التركيز على التجربة.",
            cta: "معرفة المزيد",
            ctaSubtext: "الرد خلال 24 ساعة عمل.",
            idealFor: "مثالي لـ",
            idealForText: "النهائيات الوطنية، دوريات الطلاب، عروض العلامات التجارية، المباريات الاستعراضية، المعارض والمؤتمرات.",
            features: {
              projectManagement: "إدارة المشاريع والتخطيط الشامل",
              scenography: "التصميم المشهدي وهوية العلامة التجارية (الديكور، LED، اللافتات)",
              lanSetup: "إعداد الأجهزة وشبكة LAN (PC/console) + مكافحة الغش",
              liveProduction: "الإنتاج المباشر والبث (البث، التراكبات، المعلقين)",
              formats: "الصيغ، كتاب القواعد، التحكيم والموظفين في الموقع",
              sponsorActivations: "تفعيلات الرعاة وأجنحة الشركاء",
              ticketing: "التذاكر واستقبال الجمهور",
              security: "الأمن والتأمين والامتثال",
              postEvent: "الإحصائيات، أبرز الأحداث وتقارير ما بعد الحدث"
            }
          }
        },
        requestAccessForm: {
          title: "طلب الوصول",
          subtitle: "املأ النموذج أدناه للانضمام إلى مجتمعنا",
          pseudo: {
            label: "اسم المستخدم",
            placeholder: "مثال: MrWire",
            required: "اسم المستخدم مطلوب"
          },
          contact: {
            label: "جهة الاتصال",
            subtitle: "واحد على الأقل مطلوب",
            email: {
              label: "البريد الإلكتروني",
              placeholder: "example@domain.com"
            },
            whatsapp: {
              label: "واتساب",
              placeholder: "6 … 212+"
            },
            required: "البريد الإلكتروني أو واتساب مطلوب"
          },
          socialNetworks: {
            label: "الشبكات الاجتماعية",
            subtitle: "اختر شبكة واحدة على الأقل وقدم الرابط",
            platforms: {
              twitch: "Twitch",
              youtube: "YouTube",
              kick: "Kick",
              tiktok: "TikTok Live",
              facebook: "Facebook Gaming",
              instagram: "Instagram",
              twitter: "X / Twitter",
              discord: "Discord",
              linktree: "Linktree / Beacons"
            },
            placeholders: {
              twitch: "https://twitch.tv/yourchannel",
              youtube: "https://youtube.com/@yourusername",
              kick: "https://kick.com/yourusername",
              tiktok: "https://tiktok.com/@yourusername",
              facebook: "https://www.facebook.com/gaming/yourusername",
              instagram: "https://instagram.com/yourusername",
              twitter: "https://twitter.com/yourusername",
              discord: "https://discord.gg/XXXXXX",
              linktree: "https://linktr.ee/yourusername"
            },
            required: "شبكة اجتماعية واحدة على الأقل مع عنوان URL صالح مطلوب",
            invalidUrl: "رابط غير صالح — الصق عنوان URL الكامل"
          },
          consent: {
            label: "أوافق على الاتصال بي بشأن طلبي",
            required: "يجب عليك الموافقة على الاتصال بك"
          },
          submit: "إرسال الطلب",
          submitSubtext: "الرد خلال 24 ساعة عمل.",
          success: "تم إرسال طلبك بنجاح!",
          error: "حدث خطأ. يرجى المحاولة مرة أخرى."
        },
        comparison: {
          title: "قارن الخطط",
          subtitle: "اختر الخطة المثالية لطموحاتك في الرياضات الإلكترونية",
          choosePlan: "اختر خطتك",
          features: "الميزات",
          community: "المجتمع",
          whiteLabel: "العلامة البيضاء",
          free: "مجاني",
          custom: "مخصص",
          contactUs: "اتصل بنا",
          premium: "مميز",
          rows: {
            maxParticipants: "الحد الأقصى للمشاركين",
            formats: "تنسيقات البطولات",
            brackets: "جداول تلقائية",
            stats: "إحصائيات في الوقت الفعلي",
            sponsorIntegration: "تكامل الرعاة",
            customBranding: "علامة تجارية مخصصة",
            whiteLabelSolution: "حل العلامة البيضاء",
            dedicatedSupport: "دعم مخصص",
            standard: "قياسي",
            allCustom: "الكل + مخصص",
            unlimited: "غير محدود"
          }
        },
        features: {
          badge: "المنظمين",
          title: "قوة أداة احترافية، بكل بساطة",
          subtitle: "إدارة حدث رياضي إلكتروني لا ينبغي أن تكون معقدة. لقد صممنا واجهة بديهية تقوم بأتمتة المهام المعقدة.",
          flexibility: {
            title: "مرونة كاملة",
            description: "بغض النظر عن اللعبة أو التنسيق، منصتنا تتكيف مع رؤيتك."
          },
          engagement: {
            title: "مشاركة اللاعبين",
            description: "تجربة احترافية مع ملفات التعريف والإحصائيات ولوحات الصدارة في الوقت الفعلي."
          },
          monetization: {
            title: "تحقيق الدخل المبسط",
            description: "دمج الرعاة بسهولة وإدارة بيع التذاكر."
          },
          setupTime: "متوسط وقت الإعداد",
          setupTimeLabel: "متوسط وقت الإعداد"
        },
        faq: {
          title: "الأسئلة الشائعة",
          subtitle: "كل ما تحتاج معرفته عن منصتنا",
          gotQuestions: "لديك أسئلة؟",
          questions: {
            games: {
              q: "ما الألعاب المدعومة؟",
              a: "جميعها تماماً! أنت تحدد القواعد."
            },
            technical: {
              q: "هل أحتاج إلى مهارات تقنية؟",
              a: "ليس على الإطلاق. واجهتنا مصممة لتكون بسيطة وبديهية."
            },
            paid: {
              q: "ما الفرق بين خطة المجتمع وخطة العلامة البيضاء؟",
              a: "خطة المجتمع مجانية ومثالية للبطولات الصغيرة (حتى 64 مشاركًا) مع تنسيقات قياسية. خطة العلامة البيضاء توفر مشاركين غير محدودين، علامة تجارية مخصصة، تحليلات متقدمة ودعم مخصص للعمليات الاحترافية."
            },
            payment: {
              q: "هل يمكنني الترقية من خطة المجتمع إلى خطة العلامة البيضاء؟",
              a: "بالتأكيد! يمكنك الترقية في أي وقت لفتح الميزات المتقدمة. اتصل بفريق المبيعات لدينا لمناقشة احتياجاتك والحصول على عرض سعر مخصص يتناسب مع حجم ومتطلبات حدثك."
            }
          }
        },
        cta: {
          title: "هل أنت مستعد لإطلاق حدثك الكبير القادم؟",
          subtitle: "انضم إلى مئات المنظمين الذين يثقون بنا. أنشئ بطولتك الأولى في دقائق.",
          button: "ابدأ مجاناً ←",
          startJourney: "ابدأ رحلتك",
          freeToStart: "مجاني للبدء"
        }
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
        cardTitle: "باس غاميوس",
        cardSubtitle: "رسمي • المغرب 2025",
        cardMemberStatus: "عضو نشط",
        cardMemberId: "رقم العضوية",
        cardStatus: "الحالة",
        cardActive: "نشط",
        subtitle:
          "بوابتك الخاصة لعالم GAMIUS. انضم إلى نادي اللاعبين المميزين واحصل على: وصول مبكر للبطولات، مكافآت حصرية، عروض من شركائنا 🚀",
        officialInitiative: "100% مجاني وحصري",
        howItWorks: "كيف تحصل على Gamius Pass الخاص بك",
        step1: "التسجيل",
        step1Desc: "أنشئ حسابك على GAMIUS وأكمل ملفك الشخصي كلاعب.",
        step2: "التفعيل",
        step2Desc: "فعِّل بطاقتك مجاناً من لوحة التحكم الخاصة بك. الأمر فوري!",
        step3: "الاستمتاع",
        step3Desc: "اكتشف مزاياك واستعد للمنافسة القادمة.",
        advantages: "مزايا الباس",
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
            description: "سجِّل في البطولات قبل الجميع واضمن مكانك.",
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
          tournaments: {
            title: "المسابقات",
            description:
              "المشاركة في البطولات الإقليمية والوطنية",
          },
        },
        ctaButton: "انضم إلينا الآن",
        noFees: "بدون رسوم • فوري",
        statsActiveMembers: "أعضاء نشطون",
        statsProcessing: "المعالجة",
        statsFree: "مجاني",
      },
      // Documentation Center
      documentationCenter: {
        title: "الوثائق الرسمية",
        description:
          "الوصول إلى معلومات شاملة حول البطولات واللوائح والموارد للتحضير للمشاركة في منافسات GAMIUS.",
        backHome: "العودة إلى الصفحة الرئيسية",
        cards: {
          regulations: "اللوائح",
          regulationsDesc: "قم بتنزيل اللوائح الرسمية لمسابقاتنا",
          strategyGuides: "الأدلة",
          guidesDesc: "اطلع على أدلتنا العملية للتحضير بشكل جيد",
          mediaKit: "الموارد",
          resourcesDesc: "الوصول إلى موارد الوسائط والنماذج الرسمية",
        },
        downloadZone: {
          title: "مركز التحميل",
          subtitle: "قم بتنزيل اللوائح والأدلة والموارد الرسمية للتحضير لمشاركتك في بطولات GAMIUS",
          description:
            "استعرض وقم بتنزيل اللوائح الرسمية للبطولات والأدلة العملية وجميع الموارد اللازمة للتحضير لمشاركتك.",
          new: "جديد",
          downloadButton: "تحميل",
          accessButton: "الوصول إلى الوثائق",
          viewDocuments: "عرض المستندات",
          viewGuides: "عرض الأدلة",
          viewResources: "عرض الموارد",
          searchPlaceholder: "بحث...",
          noResults: "لا توجد موارد تطابق بحثك",
          tryAnother: "جرب مصطلح أو فئة أخرى",
          size: "الحجم:",
          updated: "تم التحديث:",
          tabs: {
            all: "الكل",
            rules: "اللوائح",
            guides: "الأدلة"
          },
          documents: {
            rulebook: {
              title: "اللائحة الرسمية GAMIUS 2025",
              description: "اللوائح العامة لمسابقات GAMIUS 2025"
            },
            participationGuide: {
              title: "دليل التسجيل في البطولات",
              description: "دليل خطوة بخطوة للتسجيل في البطولات والتحقق من فريقك"
            }
          },
          helpBanner: {
            title: "هل تحتاج مساعدة بشأن المستندات؟",
            description: "إذا كان لديك أسئلة حول المستندات أو تحتاج إلى مساعدة، فريقنا هنا لمساعدتك.",
            contactButton: "اتصل بنا"
          }
        },
      },
      // ProPath
      proPath: {
        title: "طريقك نحو الاحتراف",
        tagline: "البطولة الوطنية الرسمية",
        description:
          "مجموعة GAMIUS GROUP تفتح لك الطريق نحو الاحتراف. سيطر على التصفيات في منطقتك للوصول إلى النهائي الوطني الكبير وأثبت أنك الأفضل.",
        cta: "ابدأ رحلتك المهنية",
        nextEvent: "التصفيات القادمة: مارس 2026",
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
          keyFeatures: {
            title: "نظام المنافسة",
            format: "نظام الإقصاء المزدوج",
            groups: "مجموعات من 8 إلى 16 مشاركاً",
            type: "تصفيات حضورية وعبر الإنترنت",
          },
        },
        nationalChampionships: {
          title: "البطولات الوطنية",
          description:
            "لقد سيطرت على منطقتك. الآن، المغرب كله يترقبك. ارفع ألوانك بفخر وواجه نخبة اللاعبين على لقب البطل الأوحد.",
          keyFeatures: {
            title: "نظام المنافسة",
            format: "منافسة بنظام البطولة",
            points: "نظام نقاط موسمي",
            coverage: "تغطية إعلامية وطنية",
          },
        },
        eliteLeague: {
          title: "الدوري المغربي للنخبة",
          description:
            "مرحباً بك في القمة. هنا، يصبح الأبطال أساطير. واجه نخبة النخبة في المغرب واستعد للتألق على الساحة الدولية.",
          link: "اكتشف الدوري ↗",
          keyFeatures: {
            title: "نظام المنافسة",
            training: "تأطير تقني محترف",
            coverage: "مواكبة إعلامية كاملة",
            format: "نظام دوري مع مراحل إقصائية",
          },
        },
        grandFinal: {
          title: "النهائي الوطني الكبير (LAN)",
          description:
            "هنا تُصنع الأساطير! بعد سيطرتك على التصفيات، واجه الأفضل على المسرح، أمام جمهور متحمس وتحت أضواء الإعلام. كن البطل المقدّر له أن تكون.",
          keyFeatures: {
            title: "نظام المنافسة",
            format: "نهائيات حضورية على المسرح",
            prizes: "جوائز وتقدير رسمي",
            broadcast: "بث تلفزيوني ومنصات البث المباشر",
          },
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
            action: "سجِّل",
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
            title: "التسجيل والحساب",
            questions: {
              0: {
                question: "كيف يمكنني التسجيل في بطولات Gamius؟",
                answer:
                  'التسجيل بسيط! أنشئ حساباً على منصتنا، أكمل ملفك الشخصي كلاعب، وبعدها يمكنك التسجيل في تصفيات منطقتك مباشرة من صفحة "البطولات".',
              },
              1: {
                question: "هل التسجيل مجاني؟",
                answer:
                  "نعم، إنشاء حسابك والمشاركة في التصفيات العادية مجاني 100%. هدفنا هو جعل المنافسة متاحة لجميع المواهب المغربية.",
              },
              2: {
                question: "ما هو Gamius Pass وكيف أحصل عليه؟",
                answer:
                  "Gamius Pass هو بوابتك المجانية للحصول على مزايا حصرية مثل الوصول المبكر للبطولات وعروض من شركائنا. يمكنك تفعيله فوراً من لوحة التحكم الخاصة بك بمجرد إكمال ملفك الشخصي.",
              },
            },
          },
          format: {
            title: "نظام المنافسة",
            questions: {
              0: {
                question: "كيف تعمل الدورة التنافسية؟",
                answer:
                  "الدورة هي مسار تدريجي: تبدأ بالتصفيات في منطقتك. إذا تميزت، تنتقل إلى البطولات الوطنية، ثم إلى دوري النخبة، والهدف النهائي هو النهائي الوطني الكبير (LAN).",
              },
              1: {
                question: "ما هي أنظمة اللعب المستخدمة؟",
                answer:
                  "نستخدم أنظمة تنافسية معيارية لضمان العدالة. يشمل ذلك مراحل المجموعات ونظام الإقصاء المزدوج للتصفيات، ونظام دوري موسمي للبطولات الوطنية.",
              },
              2: {
                question: "كيف أتأهل للمرحلة التالية؟",
                answer:
                  "التأهل يعتمد على أدائك. في المراحل الأولى، يجب أن تنهي في صدارة ترتيب بطولتك. بالنسبة للبطولات، نظام نقاط موسمي يحدد من يتقدم.",
              },
            },
          },
          rules: {
            title: "القوانين والسلوك",
            questions: {
              0: {
                question:
                  "أين يمكنني العثور على كتاب القوانين الكامل للبطولات؟",
                answer:
                  'جميع القوانين المفصلة، لكل لعبة ومرحلة من المنافسة، متاحة في "منطقة التحميل" الخاصة بنا. ننصحك بشدة بقراءتها بعناية.',
              },
              1: {
                question: "ما هي سياستكم بشأن الغش؟",
                answer:
                  "لدينا سياسة عدم التسامح مطلقاً مع الغش بأي شكل من الأشكال (برامج، استغلال أخطاء اللعبة، إلخ). أي انتهاك سيؤدي إلى استبعاد فوري وقد يؤدي إلى حظر دائم من منافساتنا.",
              },
              2: {
                question: "هل هناك قيود على العمر للمشاركة؟",
                answer:
                  "نعم، الحد الأدنى للعمر للمشاركة هو 16 عاماً عام بشكل عام، لكن هذا قد يختلف حسب اللعبة وتصنيفها (PEGI). المتطلبات المحددة مذكورة دائماً في كتاب قوانين كل بطولة.",
              },
            },
          },
          logistics: {
            title: "الخدمات اللوجستية والفعاليات",
            questions: {
              0: {
                question: "هل البطولات عبر الإنترنت أم حضورية؟",
                answer:
                  "هي مزيج من الاثنين! مراحل التصفيات الأولى تكون في الغالب عبر الإنترنت لتكون متاحة للجميع. النهائيات الإقليمية والمراحل الوطنية هي فعاليات حضورية (LAN) لتجربة لا تُنسى.",
              },
              1: {
                question:
                  "هل يجب أن أحضر معداتي الخاصة (كمبيوتر، وحدة تحكم، إلخ)؟",
                answer:
                  "للفعاليات عبر الإنترنت، تستخدم أجهزتك الخاصة. للفعاليات الحضورية (LAN)، نحن نوفر أجهزة الكمبيوتر والشاشات. ومع ذلك، نشجعك على إحضار ملحقاتك الطرفية (لوحة مفاتيح، فأرة، وحدة تحكم، سماعة رأس) لتكون مرتاحاً قدر الإمكان.",
              },
              2: {
                question: "كيف يتم توزيع الجوائز؟",
                answer:
                  "الجوائز النقدية توزع عادة عبر التحويل البنكي في غضون 30 إلى 60 يوماً بعد انتهاء المنافسة. الجوائز المادية تُمنح شخصياً في حفل ختام الفعالية.",
              },
            },
          },
        },
      },
      // Complete Documentation section
      completeDocumentation: {
        title: "الوثائق الكاملة",
        description:
          "كل ما تحتاجه لإتقان المنافسة موجود هنا. حمِّل القوانين، الأدلة وجميع موارد GAMIUS الرسمية لتحضير انتصارك.",
        buttons: {
          download: "تحميل الموارد 📄",
          viewOnline: "تصفح أونلاين ↗",
        },
      },
      // Guides
      guides: {
        title: "أدلة البطولات",
        description: "أدلة خطوة بخطوة لمساعدتك في التسجيل، إنشاء الفرق، والمشاركة في البطولات على منصة GAMIUS.",
        backToDocumentation: "العودة إلى التوثيق",
        downloadPDF: "تحميل كملف PDF",
        needHelp: {
          title: "هل تحتاج مساعدة إضافية؟",
          description: "إذا كان لديك أي أسئلة أو واجهت مشاكل، فريق الدعم لدينا هنا لمساعدتك. تواصل معنا على",
          faq: "عرض الأسئلة الشائعة"
        },
        register: {
          title: "كيفية التسجيل",
          step1: {
            title: "زيارة الموقع",
            desc: "انتقل إلى موقع GAMIUS الرسمي وانقر على زر \"التسجيل\" أو \"إنشاء حساب\" في شريط التنقل العلوي.",
          },
          step2: {
            title: "أدخل معلوماتك",
            desc: "أدخل بياناتك الشخصية بما في ذلك اسمك الكامل وعنوان بريدك الإلكتروني ورقم هاتفك وأنشئ كلمة مرور آمنة.",
            note: "تأكد من استخدام عنوان بريد إلكتروني صالح لأنك ستحتاج إلى التحقق منه."
          },
          step3: {
            title: "تحقق من بريدك الإلكتروني",
            desc: "تحقق من صندوق الوارد الخاص بك للحصول على رابط التحقق المرسل من GAMIUS. انقر على الرابط لتفعيل حسابك."
          },
          step4: {
            title: "أكمل ملفك الشخصي",
            desc: "بمجرد التحقق، قم بتسجيل الدخول وأكمل ملفك الشخصي بإضافة معلومات إضافية مثل معرفات الألعاب الخاصة بك والألعاب المفضلة والسيرة الذاتية."
          }
        },
        login: {
          title: "كيفية تسجيل الدخول",
          step1: {
            title: "انتقل إلى صفحة تسجيل الدخول",
            desc: "انقر على زر \"تسجيل الدخول\" في شريط التنقل بالصفحة الرئيسية."
          },
          step2: {
            title: "أدخل بيانات الاعتماد",
            desc: "اكتب عنوان البريد الإلكتروني وكلمة المرور التي استخدمتها أثناء التسجيل.",
            note: "إذا نسيت كلمة المرور، انقر على \"نسيت كلمة المرور\" لإعادة تعيينها عبر البريد الإلكتروني."
          },
          step3: {
            title: "الوصول إلى لوحة التحكم",
            desc: "بعد تسجيل الدخول بنجاح، سيتم توجيهك إلى لوحة التحكم الشخصية حيث يمكنك إدارة ملفك الشخصي والفرق وتسجيلات البطولات."
          }
        },
        createTeam: {
          title: "كيفية إنشاء فريق",
          step1: {
            title: "انتقل إلى قسم الفرق",
            desc: "من لوحة التحكم، انقر على \"الفرق\" في قائمة التنقل، ثم حدد \"إنشاء فريق جديد\"."
          },
          step2: {
            title: "حدد تفاصيل الفريق",
            desc: "أدخل اسم فريقك، الاختصار، وقم بتحميل شعار الفريق. اختر اللعبة التي سيتنافس فيها فريقك.",
            note: "يجب أن تكون أسماء الفرق فريدة وتتبع إرشادات تسمية GAMIUS. لا يُسمح باللغة المسيئة."
          },
          step3: {
            title: "دعوة أعضاء الفريق",
            desc: "أضف أعضاء الفريق بإدخال عناوين بريدهم الإلكتروني أو أسماء مستخدمي GAMIUS. سيتلقون دعوة للانضمام إلى فريقك."
          },
          step4: {
            title: "أكمل قائمة الفريق",
            desc: "تأكد من أن فريقك لديه الحد الأدنى المطلوب من اللاعبين للبطولة. يجب على كل عضو قبول الدعوة وإكمال ملفه الشخصي."
          },
          step5: {
            title: "تحقق من حالة الفريق",
            desc: "بمجرد انضمام جميع الأعضاء واستيفاء الفريق لمتطلبات البطولة، ستظهر حالة فريقك كـ \"جاهز\". يمكنك الآن التسجيل في البطولات."
          }
        },
        joinTeam: {
          title: "كيفية الانضمام إلى فريق",
          step1: {
            title: "استلام دعوة الفريق",
            desc: "ستتلقى إشعارًا عبر البريد الإلكتروني وفي التطبيق عندما يدعوك قائد الفريق للانضمام إلى فريقه."
          },
          step2: {
            title: "مراجعة معلومات الفريق",
            desc: "انقر على الدعوة لعرض تفاصيل الفريق بما في ذلك اسم الفريق والأعضاء واللعبة والبطولات القادمة."
          },
          step3: {
            title: "قبول أو رفض",
            desc: "إذا كنت تريد الانضمام، انقر على \"قبول الدعوة\". إذا لم تكن مهتمًا، يمكنك الرفض بأدب. يمكنك أن تكون جزءًا من فريق واحد لكل لعبة في وقت واحد.",
            note: "تأكد من التزامك بالمشاركة قبل القبول، لأن مغادرة الفرق بشكل متكرر قد يؤثر على سمعتك."
          },
          step4: {
            title: "أكمل متطلبات الفريق",
            desc: "تأكد من أن ملفك الشخصي يحتوي على جميع المعلومات المطلوبة وأن معرفات الألعاب الخاصة بك محدثة. قد تتطلب بعض الفرق التحقق الإضافي."
          }
        },
        joinTournament: {
          title: "كيفية الانضمام إلى البطولات",
          step1: {
            title: "تصفح البطولات",
            desc: "انتقل إلى قسم \"البطولات\" من القائمة الرئيسية. تصفح البطولات المتاحة حسب اللعبة أو التاريخ أو الجوائز."
          },
          step2: {
            title: "تحقق من المتطلبات",
            desc: "انقر على بطولة لعرض التفاصيل بما في ذلك الصيغة والقواعد والجدول الزمني ومتطلبات الأهلية. تأكد من استيفاء جميع المعايير.",
            note: "تتطلب بعض البطولات تسجيل الفريق بينما تسمح أخرى للاعبين الفرديين. تحقق من الصيغة قبل التسجيل."
          },
          step3: {
            title: "سجل فريقك",
            desc: "بالنسبة لبطولات الفرق، حدد فريقك من القائمة المنسدلة وانقر على \"تسجيل الفريق\". سيتم إخطار جميع أعضاء الفريق بالتسجيل."
          },
          step4: {
            title: "دفع رسوم التسجيل (إن وجدت)",
            desc: "قد يكون لبعض البطولات رسوم دخول. اتبع تعليمات الدفع إذا كان ذلك ممكنًا. ستؤكد البطولات المجانية تسجيلك فورًا."
          },
          step5: {
            title: "تأكيد التسجيل",
            desc: "بعد تأكيد الدفع (إذا لزم الأمر)، سيظهر فريقك في قائمة المشاركين المسجلين. ستتلقى تفاصيل الجدول والجدول الزمني للبطولة عبر البريد الإلكتروني."
          },
          step6: {
            title: "استعد للمنافسة",
            desc: "تحقق من جدول البطولة، اقرأ القواعد بعناية، وتأكد من أن جميع أعضاء الفريق متاحون لأوقات المباراة. انضم إلى قناة الاتصال الرسمية للبطولة Discord إذا تم توفيرها."
          }
        }
      },
      // Privacy Policy
      privacyPolicy: {
        title: "سياسة الخصوصية",
        backHome: "العودة للصفحة الرئيسية",
        lastUpdated: "آخر تحديث",
        intro: {
          title: "مقدمة",
          content: "تلتزم GAMIUS GROUP بحماية بياناتك الشخصية واحترام خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها وفقاً للقوانين المعمول بها.",
          moroccanLaw: "تتوافق هذه السياسة مع القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين تجاه معالجة البيانات ذات الطابع الشخصي ولوائح اللجنة الوطنية لمراقبة حماية البيانات ذات الطابع الشخصي (CNDP)."
        },
        dataCollection: {
          title: "جمع البيانات",
          intro: "نقوم بجمع الأنواع التالية من المعلومات:",
          items: {
            personal: "المعلومات الشخصية (الاسم، تاريخ الميلاد، الجنس)",
            contact: "معلومات الاتصال (البريد الإلكتروني، رقم الهاتف)",
            gaming: "بيانات ملف اللاعب (اسم المستخدم، إحصائيات اللعبة، تاريخ البطولات)",
            technical: "البيانات التقنية (عنوان IP، نوع المتصفح، معلومات الجهاز)"
          }
        },
        dataUsage: {
          title: "استخدام البيانات",
          intro: "نستخدم بياناتك للأغراض التالية:",
          items: {
            tournaments: "إدارة مشاركتك في البطولات والمنافسات",
            communication: "إرسال إشعارات حول الفعاليات والتحديثات",
            improvement: "تحسين خدماتنا وتجربة المستخدم",
            security: "ضمان أمن المنصة ومنع الاحتيال"
          }
        },
        dataProtection: {
          title: "حماية البيانات",
          content: "نطبق تدابير تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية ضد الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. يتم تخزين بياناتك بشكل آمن ولا يمكن الوصول إليها إلا من قبل الموظفين المصرح لهم."
        },
        userRights: {
          title: "حقوقك",
          intro: "وفقاً للقانون المغربي رقم 09-08 ولوائح CNDP، لديك الحقوق التالية:",
          items: {
            access: "الحق في الوصول إلى بياناتك الشخصية",
            correction: "الحق في تصحيح البيانات غير الدقيقة أو غير الكاملة",
            deletion: "الحق في طلب حذف بياناتك",
            objection: "الحق في الاعتراض على معالجة البيانات",
            portability: "الحق في نقل البيانات"
          },
          contact: "لممارسة هذه الحقوق، يرجى الاتصال بنا على العنوان المذكور أدناه."
        },
        cookies: {
          title: "ملفات تعريف الارتباط",
          content: "نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح الخاصة بك وتحليل حركة المرور على الموقع. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات المتصفح الخاص بك، ولكن قد يؤثر ذلك على بعض ميزات منصتنا."
        },
        dataSharing: {
          title: "مشاركة البيانات",
          content: "نحن لا نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع شركاء موثوقين فقط عند الضرورة لتقديم خدماتنا أو الامتثال للالتزامات القانونية."
        },
        contact: {
          title: "اتصل بنا",
          content: "لأي أسئلة بخصوص سياسة الخصوصية هذه أو لممارسة حقوقك:",
          cndp: "يمكنك أيضاً تقديم شكوى إلى اللجنة الوطنية لمراقبة حماية البيانات ذات الطابع الشخصي (CNDP) - www.cndp.ma"
        }
      },
      // Terms of Service
      termsOfService: {
        title: "شروط الخدمة",
        backHome: "العودة للصفحة الرئيسية",
        lastUpdated: "آخر تحديث",
        acceptance: {
          title: "قبول الشروط",
          content: "من خلال الوصول إلى منصة GAMIUS واستخدامها، فإنك توافق وتلتزم بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجب عليك استخدام خدماتنا."
        },
        services: {
          title: "وصف الخدمات",
          content: "تقدم GAMIUS منصة عبر الإنترنت لمنافسات وبطولات الرياضات الإلكترونية. نحن نقدم أدوات إدارة البطولات، ملفات اللاعبين، الجداول، وميزات المجتمع للاعبين في المغرب."
        },
        userAccount: {
          title: "حساب المستخدم",
          intro: "للمشاركة في البطولات، يجب عليك إنشاء حساب. أنت توافق على:",
          items: {
            accurate: "تقديم معلومات دقيقة وكاملة",
            confidential: "الحفاظ على سرية كلمة المرور الخاصة بك",
            responsible: "أن تكون مسؤولاً عن جميع الأنشطة تحت حسابك",
            notify: "إخطارنا فوراً بأي وصول غير مصرح به"
          }
        },
        conduct: {
          title: "قواعد السلوك",
          intro: "أنت توافق على عدم:",
          items: {
            cheating: "استخدام برامج الغش أو الاختراقات أو الثغرات",
            harassment: "الانخراط في المضايقة أو خطاب الكراهية أو السلوك السام",
            impersonation: "انتحال شخصية مستخدمين أو منظمات أخرى",
            illegal: "نشر محتوى غير قانوني أو ضار",
            spam: "إرسال رسائل غير مرغوب فيها أو رسائل مزعجة"
          }
        },
        tournaments: {
          title: "قواعد البطولات",
          content: "يجب على جميع المشاركين في البطولة الالتزام بالقواعد واللوائح المحددة لكل منافسة. قد تؤدي الانتهاكات إلى الاستبعاد وتعليق الحساب."
        },
        intellectualProperty: {
          title: "الملكية الفكرية",
          content: "جميع المحتويات على منصة GAMIUS، بما في ذلك الشعارات والرسومات والنصوص، هي ملك لـ GAMIUS GROUP ومحمية بموجب قوانين الملكية الفكرية المغربية والدولية."
        },
        liability: {
          title: "تحديد المسؤولية",
          content: "GAMIUS GROUP ليست مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدامك للمنصة. نحن لا نضمن خدمة غير منقطعة أو خالية من الأخطاء."
        },
        termination: {
          title: "الإنهاء",
          content: "نحتفظ بالحق في تعليق أو إنهاء حسابك في أي وقت بسبب انتهاك هذه الشروط أو لأي سبب آخر وفق تقديرنا الخاص."
        },
        applicableLaw: {
          title: "القانون المطبق",
          content: "تخضع هذه الشروط للقانون المغربي. أي نزاعات ستخضع للاختصاص الحصري للمحاكم المغربية."
        },
        modifications: {
          title: "التعديلات",
          content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التغييرات سارية المفعول عند نشرها على المنصة. استمرارك في استخدام خدماتنا يشكل قبولاً للشروط المعدلة."
        },
        contact: {
          title: "اتصل بنا",
          content: "لأي أسئلة بخصوص شروط الخدمة هذه:"
        }
      },
    },
  },
};

// Configuration i18n
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "fr", // Langue par defaut
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false, // Pas besoin d'echapper les valeurs avec React
  },
  react: {
    useSuspense: false, // Desactiver Suspense pour eviter les erreurs
  },
});

export default i18n;
