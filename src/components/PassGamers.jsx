import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './AnimatedTitle';

// Initialiser les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

const PassGamers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('conditions');
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Ajout d'un console.log pour débogage
  useEffect(() => {
    console.log('PassGamers component mounted! Debugging GSAP:', { 
      gsap: !!gsap, 
      ScrollTrigger: !!ScrollTrigger,
      sectionRef: !!sectionRef.current,
      cardRef: !!cardRef.current
    });
    
    // Animation de la carte et des éléments au scroll
    if (sectionRef.current && cardRef.current) {
      // Animation du titre et du texte
      try {
        gsap.fromTo(
          '.pass-text-content',
          { 
            opacity: 0,
            y: 50
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          }
        );

        // Animation de la carte
        gsap.fromTo(
          cardRef.current,
          { 
            opacity: 0,
            scale: 0.8,
            rotationY: -15
          },
          { 
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            }
          }
        );

        // Animation des avantages
        gsap.fromTo(
          '.pass-feature',
          { 
            opacity: 0,
            x: -30
          },
          { 
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            scrollTrigger: {
              trigger: '.pass-features',
              start: 'top 75%',
            }
          }
        );
      } catch (error) {
        console.error('Error in GSAP animations:', error);
      }
    }
  }, []);

  // Effet de survol sur la carte
  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformStyle: 'preserve-3d'
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Ouvrir le modal d'inscription
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Fermer le modal d'inscription
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Changer l'onglet du modal
  const changeTab = (tab) => {
    setModalTab(tab);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-[#0a0a20] to-[#1a0a2e] overflow-hidden"
      id="pass-gamers"
    >
      {/* Fond avec effets lumineux */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-primary/20 blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-indigo-500/20 blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-cyan-500/20 blur-[50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          {/* Colonne gauche - Texte */}
          <div className="w-full lg:w-1/2 text-white">
            <h5 className="pass-text-content font-valorant text-primary text-sm md:text-base mb-3 tracking-wider">
              Section 1 : Pass Gamers – Votre Passeport vers l'Élite
            </h5>
            
            <div className="pass-text-content mb-8">
              <AnimatedTitle 
                title="Devenez un Gamer <b>V.I.P.</b> – <b>Décuplez</b> Votre Expérience !"
                containerClass="text-white font-nightWarrior text-3xl sm:text-4xl md:text-5xl mb-6"
              />
              
              <p className="text-gray-300 text-lg mb-6">
                Rejoignez un cercle privilégié et profitez d'avantages exclusifs, de récompenses uniques… et bien plus encore !
              </p>
            </div>

            {/* Liste des avantages */}
            <div className="pass-features space-y-5 mb-10">
              <div className="pass-feature flex items-start gap-4">
                <div className="text-3xl text-primary">🏆</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Badges Édition Limitée</h3>
                  <p className="text-gray-300">Collectionnez des récompenses uniques et montrez votre statut.</p>
                </div>
              </div>
              
              <div className="pass-feature flex items-start gap-4">
                <div className="text-3xl text-primary">💎</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Avantages Concrets</h3>
                  <p className="text-gray-300">Réductions sur du matériel pro, accès early aux tournois, coaching VIP.</p>
                </div>
              </div>
              
              <div className="pass-feature flex items-start gap-4">
                <div className="text-3xl text-primary">🚀</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Level Up Permanent</h3>
                  <p className="text-gray-300">Gagnez des points à chaque action quand vous participez à un tournoi et débloquez des paliers légendaires.</p>
                </div>
              </div>
              
              <div className="pass-feature flex items-start gap-4">
                <div className="text-3xl text-primary">🎁</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Contenu Exclusif</h3>
                  <p className="text-gray-300">Guides stratégiques et cadeaux surprises chaque mois, des promotions bancaires et sur les produits gaming.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pass-text-content">
              <button 
                onClick={openModal}
                className="bg-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-primary/80 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                Devenir Membre gratuitement!
              </button>
            </div>
          </div>

          {/* Colonne droite - Carte */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div 
              ref={cardRef}
              className="relative max-w-md transform-gpu will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image de la main tenant la carte */}
              <img 
                src="/img/pass-gamers-card.png" 
                alt="Pass Gamer Card" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              
              {/* Overlay d'effet holographique */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-primary/20 rounded-lg mix-blend-overlay pointer-events-none"
                style={{ transform: 'translateZ(10px)' }}
              ></div>
              
              {/* Points lumineux sur la carte */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour les conditions et l'inscription */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Contenu du modal */}
          <div className="relative bg-[#0a0a20] border border-primary/30 rounded-2xl overflow-hidden w-full max-w-3xl mx-4 shadow-2xl shadow-primary/20 transform transition-all">
            {/* En-tête du modal */}
            <div className="flex justify-between items-center bg-gradient-to-r from-[#1a0a2e] to-[#0a0a20] px-6 py-4 border-b border-primary/20">
              <h2 className="text-2xl font-bold text-white font-nightWarrior">Pass Gamer V.I.P.</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Onglets */}
            <div className="flex border-b border-primary/20">
              <button
                className={`flex-1 px-4 py-3 text-lg ${modalTab === 'conditions' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => changeTab('conditions')}
              >
                Conditions
              </button>
              <button
                className={`flex-1 px-4 py-3 text-lg ${modalTab === 'avantages' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => changeTab('avantages')}
              >
                Avantages
              </button>
              <button
                className={`flex-1 px-4 py-3 text-lg ${modalTab === 'inscription' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => changeTab('inscription')}
              >
                Inscription
              </button>
            </div>
            
            {/* Contenu des onglets */}
            <div className="p-6 text-white max-h-[70vh] overflow-y-auto">
              {/* Conditions */}
              {modalTab === 'conditions' && (
                <div className="space-y-6">
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-primary">📋</span> Conditions d'éligibilité
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      <li><span className="text-white">Âge minimum :</span> Être âgé de 16 ans ou plus</li>
                      <li><span className="text-white">Résidence :</span> Être résident marocain ou disposer d'une adresse valide au Maroc</li>
                      <li><span className="text-white">Compte :</span> Avoir un compte actif sur la plateforme MGE</li>
                      <li><span className="text-white">Règlement :</span> Accepter les termes et conditions du programme Pass Gamer</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-primary">🔄</span> Procédure d'inscription
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                      <li>Remplir le formulaire d'inscription avec vos informations personnelles</li>
                      <li>Vérifier votre adresse email via le lien de confirmation</li>
                      <li>Compléter votre profil de gamer avec vos jeux préférés et niveau</li>
                      <li>Recevoir votre Pass Gamer numérique immédiatement</li>
                      <li>Votre carte physique sera livrée sous 7 à 10 jours ouvrables</li>
                    </ol>
                  </div>
                  
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-primary">⚠️</span> Importantes conditions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      <li>Le Pass Gamer est strictement personnel et non-transférable</li>
                      <li>L'activité du compte est requise pour maintenir les avantages (participation à au moins un tournoi tous les 3 mois)</li>
                      <li>Tout comportement antisportif ou non conforme à notre code de conduite peut entraîner la suspension ou révocation des privilèges</li>
                      <li>Le programme Pass Gamer peut être modifié ou discontinué avec un préavis de 30 jours</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Avantages */}
              {modalTab === 'avantages' && (
                <div className="space-y-6">
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">🏆</span> Badges & Récompenses Exclusives
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Badges numériques de prestige pour votre profil MGE</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Écussons de niveau avec animation spéciale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Trophées virtuels pour chaque tournoi terminé</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Médailles physiques pour les compétitions majeures</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">💎</span> Avantages Premium
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>15% de réduction chez nos partenaires gaming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Accès 48h en avance aux inscriptions pour tous les tournois</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>1 session de coaching gratuite par trimestre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Places VIP lors des événements physiques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Ligne d'assistance prioritaire</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">🚀</span> Système de Progression
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Points XP pour chaque participation à un tournoi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Bonus pour victoires et top 3</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>5 niveaux de progression avec avantages croissants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Statut légendaire après 1 an d'activité régulière</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">🎁</span> Contenu & Cadeaux Exclusifs
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Guide stratégique mensuel pour les jeux populaires</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Box surprise trimestrielle avec goodies gaming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Offres exclusives des banques partenaires (cartes bancaires gaming)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Accès prioritaire aux bêta-tests de jeux</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Inscription */}
              {modalTab === 'inscription' && (
                <div className="space-y-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1">Prénom</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1">Nom</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary"
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Téléphone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary"
                        placeholder="+212 XXXXXXXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Date de naissance</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Jeux préférés</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="game1" className="mr-2" />
                          <label htmlFor="game1">Valorant</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="game2" className="mr-2" />
                          <label htmlFor="game2">Free Fire</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="game3" className="mr-2" />
                          <label htmlFor="game3">Street Fighter</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="game4" className="mr-2" />
                          <label htmlFor="game4">Tekken 8</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="game5" className="mr-2" />
                          <label htmlFor="game5">PES 2024</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="game6" className="mr-2" />
                          <label htmlFor="game6">Autres</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-1">Niveau</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-[#1a0a2e] border border-primary/30 text-white focus:outline-none focus:border-primary">
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                        <option value="pro">Pro / Compétitif</option>
                      </select>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <input type="checkbox" id="terms" className="mt-1 mr-2" />
                      <label htmlFor="terms" className="text-sm text-gray-300">
                        J'accepte les <a href="#" className="text-primary hover:underline">termes et conditions</a> et la <a href="#" className="text-primary hover:underline">politique de confidentialité</a>. Je certifie avoir au moins 16 ans.
                      </label>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <button 
                        type="submit"
                        className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary/80 transition-all transform hover:scale-105"
                      >
                        S'inscrire au programme
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PassGamers; 