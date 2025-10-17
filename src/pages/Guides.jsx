import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, UserPlus, LogIn, Users, Trophy, ChevronDown, ChevronUp, Download } from 'lucide-react';
import gsap from 'gsap';
import html2pdf from 'html2pdf.js';

const GuideSection = ({ icon: Icon, title, steps, index, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  return (
    <div className="bg-gradient-to-br from-[#111122] to-[#0c0c18] rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255, 61, 8, 0.2)' }}>
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 61, 8, 0.2)' }}>
            <Icon size={24} style={{ color: '#ff3d08' }} />
          </div>
          <h3 className="text-white text-xl font-bold text-left">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp size={24} style={{ color: '#ff3d08' }} />
        ) : (
          <ChevronDown size={24} style={{ color: '#ff3d08' }} />
        )}
      </button>
      
      <div 
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: 'rgba(255, 61, 8, 0.3)', color: '#ff3d08' }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                  {step.note && (
                    <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 61, 8, 0.1)', border: '1px solid rgba(255, 61, 8, 0.2)' }}>
                      <p className="text-sm" style={{ color: '#ff3d08' }}>💡 {step.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Guides = () => {
  const { t, getTextClass, isTamazight } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const heroRef = useRef(null);
  const pdfContentRef = useRef(null);
  const [openSection, setOpenSection] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleFAQClick = (e) => {
    e.preventDefault();
    const hash = 'faq';
    if (location.pathname !== '/') {
      // Navigate to home page first
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleDownloadPDF = async () => {
    setIsPrinting(true);
    
    // Wait for all sections to expand
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const element = pdfContentRef.current;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'GAMIUS_Tournament_Guides.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a14',
        windowWidth: 1200,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  const guides = [
    {
      icon: UserPlus,
      title: t('guides.register.title', 'How to Register'),
      steps: [
        {
          title: t('guides.register.step1.title', 'Visit the Website'),
          description: t('guides.register.step1.desc', 'Navigate to the GAMIUS official website and click on the "Sign Up" or "Register" button in the top navigation bar.'),
        },
        {
          title: t('guides.register.step2.title', 'Fill in Your Information'),
          description: t('guides.register.step2.desc', 'Enter your personal details including your full name, email address, phone number, and create a secure password.'),
          note: t('guides.register.step2.note', 'Make sure to use a valid email address as you will need to verify it.'),
        },
        {
          title: t('guides.register.step3.title', 'Verify Your Email'),
          description: t('guides.register.step3.desc', 'Check your email inbox for a verification link sent by GAMIUS. Click the link to activate your account.'),
        },
        {
          title: t('guides.register.step4.title', 'Complete Your Profile'),
          description: t('guides.register.step4.desc', 'Once verified, log in and complete your profile by adding additional information such as your gaming IDs, preferred games, and bio.'),
        },
      ],
    },
    {
      icon: LogIn,
      title: t('guides.login.title', 'How to Login'),
      steps: [
        {
          title: t('guides.login.step1.title', 'Go to Login Page'),
          description: t('guides.login.step1.desc', 'Click on the "Login" or "Sign In" button on the homepage navigation bar.'),
        },
        {
          title: t('guides.login.step2.title', 'Enter Your Credentials'),
          description: t('guides.login.step2.desc', 'Type in the email address and password you used during registration.'),
          note: t('guides.login.step2.note', 'If you forgot your password, click "Forgot Password" to reset it via email.'),
        },
        {
          title: t('guides.login.step3.title', 'Access Your Dashboard'),
          description: t('guides.login.step3.desc', 'After successful login, you will be redirected to your personal dashboard where you can manage your profile, teams, and tournament registrations.'),
        },
      ],
    },
    {
      icon: Users,
      title: t('guides.createTeam.title', 'How to Create a Team'),
      steps: [
        {
          title: t('guides.createTeam.step1.title', 'Navigate to Teams Section'),
          description: t('guides.createTeam.step1.desc', 'From your dashboard, click on "Teams" in the navigation menu, then select "Create New Team".'),
        },
        {
          title: t('guides.createTeam.step2.title', 'Set Team Details'),
          description: t('guides.createTeam.step2.desc', 'Enter your team name, tag (abbreviation), and upload a team logo. Choose the game your team will compete in.'),
          note: t('guides.createTeam.step2.note', 'Team names must be unique and follow GAMIUS naming guidelines. No offensive language is allowed.'),
        },
        {
          title: t('guides.createTeam.step3.title', 'Invite Team Members'),
          description: t('guides.createTeam.step3.desc', 'Add team members by entering their email addresses or GAMIUS usernames. They will receive an invitation to join your team.'),
        },
        {
          title: t('guides.createTeam.step4.title', 'Complete Team Roster'),
          description: t('guides.createTeam.step4.desc', 'Ensure your team has the minimum required number of players for the tournament. Each member must accept the invitation and complete their profile.'),
        },
        {
          title: t('guides.createTeam.step5.title', 'Verify Team Status'),
          description: t('guides.createTeam.step5.desc', 'Once all members have joined and the team meets tournament requirements, your team status will show as "Ready". You can now register for tournaments.'),
        },
      ],
    },
    {
      icon: Users,
      title: t('guides.joinTeam.title', 'How to Join a Team'),
      steps: [
        {
          title: t('guides.joinTeam.step1.title', 'Receive Team Invitation'),
          description: t('guides.joinTeam.step1.desc', 'You will receive an email notification and in-app notification when a team captain invites you to join their team.'),
        },
        {
          title: t('guides.joinTeam.step2.title', 'Review Team Information'),
          description: t('guides.joinTeam.step2.desc', 'Click on the invitation to view team details including team name, members, game, and upcoming tournaments.'),
        },
        {
          title: t('guides.joinTeam.step3.title', 'Accept or Decline'),
          description: t('guides.joinTeam.step3.desc', 'If you want to join, click "Accept Invitation". If not interested, you can decline politely. You can only be part of one team per game at a time.'),
          note: t('guides.joinTeam.step3.note', 'Make sure you are committed to participate before accepting, as leaving teams frequently may affect your reputation.'),
        },
        {
          title: t('guides.joinTeam.step4.title', 'Complete Team Requirements'),
          description: t('guides.joinTeam.step4.desc', 'Ensure your profile has all required information and your game IDs are up to date. Some teams may require additional verification.'),
        },
      ],
    },
    {
      icon: Trophy,
      title: t('guides.joinTournament.title', 'How to Join Tournaments'),
      steps: [
        {
          title: t('guides.joinTournament.step1.title', 'Browse Tournaments'),
          description: t('guides.joinTournament.step1.desc', 'Go to the "Tournaments" section from the main menu. Browse available tournaments by game, date, or prize pool.'),
        },
        {
          title: t('guides.joinTournament.step2.title', 'Check Requirements'),
          description: t('guides.joinTournament.step2.desc', 'Click on a tournament to view details including format, rules, schedule, and eligibility requirements. Make sure you meet all criteria.'),
          note: t('guides.joinTournament.step2.note', 'Some tournaments require team registration while others allow solo players. Check the format before registering.'),
        },
        {
          title: t('guides.joinTournament.step3.title', 'Register Your Team'),
          description: t('guides.joinTournament.step3.desc', 'For team tournaments, select your team from the dropdown and click "Register Team". All team members will be notified of the registration.'),
        },
        {
          title: t('guides.joinTournament.step4.title', 'Pay Registration Fee (If Required)'),
          description: t('guides.joinTournament.step4.desc', 'Some tournaments may have entry fees. Follow the payment instructions if applicable. Free tournaments will confirm your registration immediately.'),
        },
        {
          title: t('guides.joinTournament.step5.title', 'Confirm Registration'),
          description: t('guides.joinTournament.step5.desc', 'After payment confirmation (if required), your team will appear in the registered participants list. You will receive tournament bracket details and schedule via email.'),
        },
        {
          title: t('guides.joinTournament.step6.title', 'Prepare for Competition'),
          description: t('guides.joinTournament.step6.desc', 'Check the tournament schedule, read the rules carefully, and make sure all team members are available for match times. Join the official tournament Discord/communication channel if provided.'),
        },
      ],
    },
  ];

  useEffect(() => {
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
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .max-h-0 {
            max-height: none !important;
            opacity: 1 !important;
          }
          /* Ensure backgrounds and colors are preserved */
          .bg-gradient-to-br, .bg-gradient-to-b, .bg-\\[\\#0a0a14\\], .bg-\\[\\#0c0c18\\] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide collapse/expand buttons but show content */
          button.w-full {
            pointer-events: none;
          }
          button.w-full svg {
            display: none;
          }
          /* Prevent page breaks inside guide sections */
          .bg-gradient-to-br {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
      <div className="no-print">
        <NavBar />
      </div>
      
      {/* Hero section */}
      <div 
        ref={heroRef}
        className="pt-32 pb-8 bg-gradient-to-b from-[#0a0a14] to-[#0c0c18]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              to="/documentation"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className={getTextClass()}>{t('guides.backToDocumentation', 'Back to Documentation')}</span>
            </Link>
            
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <Download size={20} />
              <span>{t('guides.downloadPDF', 'Download as PDF')}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* PDF Content Wrapper - includes title, description and guides */}
      <div ref={pdfContentRef} className="bg-[#0a0a14]">
        {/* Title and Description for PDF */}
        <div className="pt-16 pb-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-nightWarrior mb-6 ${isTamazight ? 'tamazight-text' : ''}`}
                style={{ color: '#ff3d08' }}
              >
                {t('guides.title', 'Tournament Guides')}
              </h1>
              
              <p className={`max-w-3xl text-white/80 text-lg mb-8 ${getTextClass()}`}>
                {t('guides.description', 'Step-by-step guides to help you navigate registration, team creation, and tournament participation on the GAMIUS platform.')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Guides section */}
        <div className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {guides.map((guide, index) => (
                <GuideSection
                  key={index}
                  icon={guide.icon}
                  title={guide.title}
                  steps={guide.steps}
                  index={index}
                  isOpen={isPrinting || openSection === index}
                  onToggle={() => setOpenSection(openSection === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* End PDF Content Wrapper */}
      
      {/* Help section - not included in PDF */}
      <div className="py-8 bg-[#0a0a14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-xl border border-primary/20">
            <h3 className="text-white text-2xl font-bold mb-4">{t('guides.needHelp.title', 'Need More Help?')}</h3>
            <p className="text-white/70 mb-6">
              {t('guides.needHelp.description', "If you have any questions or encounter issues, our support team is here to help you. Contact us at")}{' '}
              <a href="mailto:contact@gamiusgroup.ma" className="text-primary hover:underline font-semibold">
                contact@gamiusgroup.ma
              </a>
            </p>
            <button
              onClick={handleFAQClick}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <span>{t('guides.needHelp.faq', 'View FAQ')}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
};

export default Guides;
