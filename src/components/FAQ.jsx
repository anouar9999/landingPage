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
    {
      category: t('faq.categories.prizes.title'),
      icon: <Trophy size={20} />,
      questions: [
        {
          question: t('faq.categories.prizes.questions.0.question'),
          answer: t('faq.categories.prizes.questions.0.answer')
        },
        {
          question: t('faq.categories.prizes.questions.1.question'),
          answer: t('faq.categories.prizes.questions.1.answer')
        },
        {
          question: t('faq.categories.prizes.questions.2.question'),
          answer: t('faq.categories.prizes.questions.2.answer')
        }
      ]
    },
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
  
  // Animation de l'accordéon
  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === activeIndex) {
          gsap.to(ref, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          gsap.to(ref, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }, [activeIndex, filteredQuestions]);
  
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
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-nightWarrior text-primary mb-3 ${language === 'tz' ? 'tamazight-text' : ''}`}>
            {t('faq.title')}
          </h2>
          <p className={`text-white/80 max-w-2xl mx-auto ${getTextClass()}`}>
            {t('faq.subtitle')}
          </p>
          
          {/* Barre de recherche */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-white/50" />
              </div>
              <input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none text-white placeholder-white/50 ${getTextClass()}`}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
        
        {searchTerm && filteredQuestions.length === 0 ? (
          <div className="text-center py-10">
            <HelpCircle size={48} className="mx-auto text-white/30 mb-4" />
            <p className={`text-white/70 text-lg ${getTextClass()}`}>
              {t('faq.noResults') + ` "${searchTerm}"`}
            </p>
            <p className={`text-white/50 mt-2 ${getTextClass()}`}>
              {t('faq.tryAgain')}
            </p>
          </div>
        ) : (
          <>
            {/* Résultats de recherche OU questions par catégorie */}
            {searchTerm ? (
              <div className="space-y-6 mb-6">
                <h3 className={`text-white/70 text-lg font-valorant ${getTextClass()}`}>
                  {`${filteredQuestions.length} ${filteredQuestions.length > 1 ? t('faq.resultsPlural') : t('faq.resultsSingular')} pour "${searchTerm}"`}
                </h3>
                
                {/* Affichage des résultats de recherche */}
                <div className="space-y-4">
                  {filteredQuestions.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-[#0c0c18] border border-primary/10 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full px-5 py-4 flex justify-between items-center text-left text-white hover:bg-black/30 transition-colors"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className={`font-semibold pr-8 ${getTextClass()}`}>{item.question}</span>
                        <ChevronDown
                          size={20}
                          className={`text-primary transition-transform duration-200 ${
                            activeIndex === index ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        ref={(el) => (accordionRefs.current[index] = el)}
                        className="overflow-hidden"
                        style={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-5 py-4 text-white/80">
                          <p className={getTextClass()}>{item.answer}</p>
                          <div className={`mt-3 text-xs text-primary/70 italic ${getTextClass()}`}>
                            {t('faq.category')}: {item.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Affichage par catégories */}
                {faqData.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary">{category.icon}</span>
                      <h3 className={`text-white font-valorant text-xl ${getTextClass()}`}>{category.category}</h3>
                    </div>
                    
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * 10 + questionIndex;
                      return (
                        <div 
                          key={questionIndex}
                          className="bg-[#0c0c18] border border-primary/10 rounded-lg overflow-hidden"
                        >
                          <button
                            className="w-full px-5 py-4 flex justify-between items-center text-left text-white hover:bg-black/30 transition-colors"
                            onClick={() => toggleAccordion(globalIndex)}
                          >
                            <span className={`font-semibold pr-8 ${getTextClass()}`}>{item.question}</span>
                            <ChevronDown
                              size={20}
                              className={`text-primary transition-transform duration-200 ${
                                activeIndex === globalIndex ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            ref={(el) => (accordionRefs.current[globalIndex] = el)}
                            className="overflow-hidden"
                            style={{ height: 0, opacity: 0 }}
                          >
                            <div className="px-5 py-4 text-white/80">
                              <p className={getTextClass()}>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
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