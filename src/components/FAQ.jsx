import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Info, Trophy, Users, Calendar, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const accordionRefs = useRef([]);
  const sectionRef = useRef(null);
  const faqRef = useRef(null);
  const itemRefs = useRef([]);
  
  const faqItems = [1, 2, 3, 4, 5, 6];
  
  // Fonction pour obtenir le texte de version
  const getVersionText = () => {
    if (language === 'ar') return 'الإصدار الرسمي 2025';
    return 'Version officielle 2025';
  };
  
  // Effet pour appliquer la police Tifinagh à tous les textes en tamazight
  useEffect(() => {
    if (faqRef.current && isTamazight) {
      // Force la police sur tout le composant FAQ
      forceTifinaghFont(faqRef);
      
      // Parcourir tous les éléments de question/réponse
      itemRefs.current.forEach(ref => {
        if (ref) {
          forceTifinaghFont(ref);
        }
      });
      
      // Appliquer à tous les textes, même dynamiquement générés
      setTimeout(() => {
        const textElements = faqRef.current.querySelectorAll('p, h1, h2, h3, h4, span, button, div.faq-question, div.faq-answer');
        textElements.forEach(el => {
          if (!el.classList.contains('font-nightWarrior') && !el.classList.contains('nightWarrior')) {
            el.classList.add('tamazight-text');
            el.style.fontFamily = 'Tifinagh, "Noto Sans Tifinagh", sans-serif';
            el.style.fontSize = '1.05em';
            el.style.fontWeight = '600';
          }
        });
      }, 200);
    }
  }, [language, forceTifinaghFont, isTamazight]);

  useGSAP(() => {
    const faqTitle = document.querySelector("#faq .faq-title");
    const faqImg = document.querySelector("#faq .faq-img");
    const faqList = document.querySelector("#faq .faq-list");

    if (faqTitle) {
      gsap.from("#faq .faq-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#faq",
          start: "top 80%",
        },
      });
    }

    if (faqImg) {
      gsap.from("#faq .faq-img", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: "#faq",
          start: "top 80%",
        },
      });
    }

    if (faqList) {
      gsap.from("#faq .faq-list", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: "#faq",
          start: "top 80%",
        },
      });
    }
  });
  
  // S'assurer que la section est visible
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
      
      // Debug message en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('FAQ section visible, langue:', language);
      }
    }
  }, [language]);
  
  // FAQ data - questions adaptées aux tournois esport
  const faqData = [
    {
      category: t('faq.categories.registration.title'),
      icon: <Trophy size={20} />,
      questions: [
        {
          question: t('faq.categories.registration.questions.0.question'),
          answer: t('faq.categories.registration.questions.0.answer')
        },
        {
          question: t('faq.categories.registration.questions.1.question'),
          answer: t('faq.categories.registration.questions.1.answer')
        },
        {
          question: t('faq.categories.registration.questions.2.question'),
          answer: t('faq.categories.registration.questions.2.answer')
        }
      ]
    },
    {
      category: t('faq.categories.format.title'),
      icon: <Calendar size={20} />,
      questions: [
        {
          question: t('faq.categories.format.questions.0.question'),
          answer: t('faq.categories.format.questions.0.answer')
        },
        {
          question: t('faq.categories.format.questions.1.question'),
          answer: t('faq.categories.format.questions.1.answer')
        },
        {
          question: t('faq.categories.format.questions.2.question'),
          answer: t('faq.categories.format.questions.2.answer')
        }
      ]
    },
    // {
    //   category: t('faq.categories.prizes.title'),
    //   icon: <Trophy size={20} />,
    //   questions: [
    //     {
    //       question: t('faq.categories.prizes.questions.0.question'),
    //       answer: t('faq.categories.prizes.questions.0.answer')
    //     },
    //     {
    //       question: t('faq.categories.prizes.questions.1.question'),
    //       answer: t('faq.categories.prizes.questions.1.answer')
    //     },
    //     {
    //       question: t('faq.categories.prizes.questions.2.question'),
    //       answer: t('faq.categories.prizes.questions.2.answer')
    //     }
    //   ]
    // },
    {
      category: t('faq.categories.rules.title'),
      icon: <Info size={20} />,
      questions: [
        {
          question: t('faq.categories.rules.questions.0.question'),
          answer: t('faq.categories.rules.questions.0.answer')
        },
        {
          question: t('faq.categories.rules.questions.1.question'),
          answer: t('faq.categories.rules.questions.1.answer')
        },
        {
          question: t('faq.categories.rules.questions.2.question'),
          answer: t('faq.categories.rules.questions.2.answer')
        }
      ]
    },
    {
      category: t('faq.categories.logistics.title'),
      icon: <Users size={20} />,
      questions: [
        {
          question: t('faq.categories.logistics.questions.0.question'),
          answer: t('faq.categories.logistics.questions.0.answer')
        },
        {
          question: t('faq.categories.logistics.questions.1.question'),
          answer: t('faq.categories.logistics.questions.1.answer')
        },
        {
          question: t('faq.categories.logistics.questions.2.question'),
          answer: t('faq.categories.logistics.questions.2.answer')
        }
      ]
    }
  ];
  
  // Initialiser les questions filtrées
  useEffect(() => {
    // Aplatir toutes les questions pour la recherche
    const allQuestions = faqData.flatMap(category => 
      category.questions.map(q => ({
        ...q,
        category: category.category,
        icon: category.icon
      }))
    );
    setFilteredQuestions(allQuestions);
  }, []);
  
  // Filtrer les questions en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si la recherche est vide, afficher toutes les questions
      const allQuestions = faqData.flatMap(category => 
        category.questions.map(q => ({
          ...q,
          category: category.category,
          icon: category.icon
        }))
      );
      setFilteredQuestions(allQuestions);
      return;
    }
    
    // Filtrer les questions qui contiennent le terme de recherche
    const term = searchTerm.toLowerCase();
    const filtered = faqData.flatMap(category => 
      category.questions
        .filter(q => 
          q.question.toLowerCase().includes(term) || 
          q.answer.toLowerCase().includes(term)
        )
        .map(q => ({
          ...q,
          category: category.category,
          icon: category.icon
        }))
    );
    
    setFilteredQuestions(filtered);
    // Réinitialiser l'accordéon actif lors d'une nouvelle recherche
    setActiveIndex(null);
  }, [searchTerm]);
  
  // Animation d'entrée de la section
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);
  
  // Gérer l'ouverture/fermeture de l'accordéon
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Animation de l'accordéon - simplified since we use conditional rendering
  useEffect(() => {
    // Animations handled via CSS transitions
  }, [activeIndex]);
  
  return (
    <div id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a14] to-[#090914]" 
      ref={sectionRef} 
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ 
        position: 'relative',
        visibility: 'visible', 
        opacity: 1,
        zIndex: 1,
        scrollMarginTop: '80px',
        marginTop: '0',
        paddingBottom: '8rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl special-font font-black text-white mb-4 tracking-tight uppercase ${language === 'tz' ? 'tamazight-text' : ''}`}>
            {t('faq.title')}
          </h2>
          <p className={`text-white/70 text-lg max-w-2xl mx-auto leading-relaxed ${getTextClass()}`}>
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="space-y-10 px-2">
          {/* Affichage par catégories */}
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="text-primary">{category.icon}</span>
                </div>
                <h3 className={`text-white font-semibold text-xl uppercase tracking-wide ${getTextClass()}`}>{category.category}</h3>
              </div>
              
              {category.questions.map((item, questionIndex) => {
                const globalIndex = categoryIndex * 10 + questionIndex;
                const isActive = activeIndex === globalIndex;
                return (
                  <div 
                    key={questionIndex}
                    className="relative group"
                  >
                    {/* Skewed background */}
                    <div className={`absolute inset-0 -skew-x-6 bg-[#0A0A0A] border-2 transition-all duration-300 ${
                      isActive ? 'border-primary/60' : 'border-gray-800 group-hover:border-primary/40'
                    }`}></div>
                    
                    {/* Subtle gradient on hover/active */}
                    <div className={`absolute inset-0 -skew-x-6 bg-gradient-to-r from-primary/5 to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    <button
                      className="relative w-full p-5 sm:p-6 text-left flex justify-between items-center z-10"
                      onClick={() => toggleAccordion(globalIndex)}
                    >
                      <span className={`font-semibold text-sm sm:text-base text-white pr-8 ${getTextClass()}`}>
                        {item.question}
                      </span>
                      <div className={`flex-shrink-0 ml-2 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all ${
                        isActive ? 'rotate-180 bg-primary/20' : ''
                      }`}>
                        <ChevronDown 
                          className="text-primary transition-transform"
                          size={18}
                        />
                      </div>
                    </button>
                    
                    {isActive && (
                      <div
                        ref={(el) => (accordionRefs.current[globalIndex] = el)}
                        className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6 text-white/80 border-t border-gray-700 pt-4 animate-fadeIn"
                      >
                        <p className={`leading-relaxed ${getTextClass()}`}>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Appel à l'action */}
        <div className="mt-12 text-center">
          <p className={`text-white font-semibold mb-2 ${getTextClass()}`}>
            {t('faq.noAnswerFound')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className={getTextClass()}>
              {t('faq.contactUs')}
            </span>
            <ChevronDown size={16} className="transform -rotate-90" />
          </Link>
        </div>
        
        {/* Badge version officielle */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-primary/10 rounded-full px-3 py-1">
            <span className={`text-primary text-xs ${getTextClass()}`}>
              {getVersionText()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 