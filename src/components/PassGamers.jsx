import React, { useState, useEffect, useRef } from 'react';

const PassGamers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('conditions');
  const modalContentRef = useRef(null);
  
  // Ouvrir le modal d'inscription
  const openModal = () => {
    document.body.classList.add('modal-open');
    setIsModalOpen(true);
  };

  // Fermer le modal d'inscription
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setIsModalOpen(false);
  };

  // Changer l'onglet du modal
  const changeTab = (tab) => {
    setModalTab(tab);
  };
  
  // Gérer le défilement à l'intérieur du modal
  useEffect(() => {
    const handleWheel = (e) => {
      if (!modalContentRef.current || !modalContentRef.current.contains(e.target)) return;
      
      const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      // Si on est en haut et qu'on défile vers le haut OU en bas et qu'on défile vers le bas
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      }
    };

    // Ajouter les gestionnaires d'événements
    const content = modalContentRef.current;
    if (content && isModalOpen) {
      content.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (content) {
        content.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isModalOpen]);
  
  // Injecter les styles globaux pour la modale
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .modal-open {
        overflow: hidden !important;
        position: fixed;
        width: 100%;
        height: 100%;
      }
      
      .modal-content::-webkit-scrollbar {
        width: 6px;
      }
      
      .modal-content::-webkit-scrollbar-track {
        background: rgba(10, 10, 20, 0.2);
        border-radius: 10px;
      }
      
      .modal-content::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #ff3d08 0%, rgba(255, 61, 8, 0.5) 100%);
        border-radius: 10px;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section 
      className="relative py-16 md:py-24 bg-gradient-to-br from-[#0a0a20] to-[#1a0a2e] overflow-hidden"
      id="pass-gamers"
      style={{ position: 'relative', zIndex: 10 }}
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
            <h5 className="font-valorant text-primary text-sm md:text-base mb-3 tracking-wider">
              Pass Gamers – Votre Passeport vers l'Élite
            </h5>
            
            <div className="mb-8">
              <h2 className="text-white font-nightWarrior text-3xl sm:text-4xl md:text-5xl mb-6">
                Devenez un Gamer <span className="text-primary">V.I.P.</span> – <span className="text-primary">Décuplez</span> Votre Expérience !
              </h2>
              
              <p className="text-gray-300 text-lg mb-6">
                Rejoignez un cercle privilégié et profitez d'avantages exclusifs, de récompenses uniques… et bien plus encore !
              </p>
            </div>

            {/* Liste des avantages */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="text-3xl text-primary">🏆</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Badges Édition Limitée</h3>
                  <p className="text-gray-300">Collectionnez des récompenses uniques et montrez votre statut.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-3xl text-primary">💎</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Avantages Concrets</h3>
                  <p className="text-gray-300">Réductions sur du matériel pro, accès early aux tournois, coaching VIP.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-3xl text-primary">🚀</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Level Up Permanent</h3>
                  <p className="text-gray-300">Gagnez des points à chaque action et débloquez des paliers légendaires.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-3xl text-primary">🎁</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Contenu Exclusif</h3>
                  <p className="text-gray-300">Guides stratégiques et cadeaux surprises chaque mois.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
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
              className="relative max-w-md transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image de la carte */}
              <img 
                src="/img/pass-gamers-card.png" 
                alt="Pass Gamer Card" 
                className="w-full h-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250" fill="none"%3E%3Crect width="400" height="250" fill="%23ff3d08"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle"%3EPass Gamer Card%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Overlay d'effet holographique */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-primary/20 rounded-lg mix-blend-overlay pointer-events-none"
              ></div>
              
              {/* Points lumineux sur la carte */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
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
              <h2 className="text-2xl font-bold text-white">Pass Gamer V.I.P.</h2>
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
            <div 
              className="p-6 text-white max-h-[70vh] overflow-y-auto modal-content"
              style={{ overscrollBehavior: 'contain' }}
              ref={modalContentRef}
            >
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
                      <span className="text-primary">⚠️</span> Importantes conditions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      <li>Le Pass Gamer est strictement personnel et non-transférable</li>
                      <li>L'activité du compte est requise pour maintenir les avantages</li>
                      <li>Tout comportement antisportif peut entraîner la suspension des privilèges</li>
                      <li>Le programme Pass Gamer peut être modifié avec un préavis de 30 jours</li>
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