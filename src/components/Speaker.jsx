import React from 'react';
import './Speaker.scss';

const Speaker = ({ openGameDetailPopup }) => {
  // Données fictives pour les intervenants
  const speakers = [
    {
      id: 1,
      name: 'Karim El Mansouri',
      role: 'Game Designer',
      company: 'Ubisoft',
      image: '/img/speakers/speaker1.jpg',
      bio: "Karim est un Game Designer senior avec plus de 10 ans d'expérience dans l'industrie du jeu vidéo. Il a travaillé sur plusieurs titres AAA et partage sa passion pour la création de mécaniques de jeu innovantes.",
      socials: {
        twitter: 'https://twitter.com/karimmansouri',
        linkedin: 'https://linkedin.com/in/karimmansouri'
      }
    },
    {
      id: 2,
      name: 'Salma Kabbaj',
      role: 'Développeuse Indépendante',
      company: 'Moroccan Game Collective',
      image: '/img/speakers/speaker2.jpg',
      bio: "Salma est une développeuse indépendante qui a créé plusieurs jeux primés. Elle est passionnée par la narration interactive et l'utilisation des jeux comme moyen d'expression culturelle.",
      socials: {
        twitter: 'https://twitter.com/salmakabbaj',
        linkedin: 'https://linkedin.com/in/salmakabbaj'
      }
    },
    {
      id: 3,
      name: 'Ahmed Bensouda',
      role: 'Directeur eSports',
      company: 'MGE Tournament',
      image: '/img/speakers/speaker3.jpg',
      bio: "Ahmed est le directeur des tournois eSports pour MGE. Avec son expertise dans l'organisation d'événements compétitifs, il a contribué à développer la scène eSports marocaine au niveau international.",
      socials: {
        twitter: 'https://twitter.com/ahmedbensouda',
        linkedin: 'https://linkedin.com/in/ahmedbensouda'
      }
    },
    {
      id: 4,
      name: 'Fatima Zahra El Idrissi',
      role: 'UI/UX Designer',
      company: 'Gaming Studio',
      image: '/img/speakers/speaker4.jpg',
      bio: "Fatima est spécialisée dans la conception d'interfaces utilisateur pour les jeux vidéo. Son approche centrée sur l'utilisateur a permis d'améliorer l'expérience de jeu de nombreux titres populaires.",
      socials: {
        twitter: 'https://twitter.com/fzelidrissi',
        linkedin: 'https://linkedin.com/in/fzelidrissi'
      }
    }
  ];

  // Fonction pour afficher les détails d'un intervenant
  const handleSpeakerClick = (speaker) => {
    openGameDetailPopup({
      title: speaker.name,
      description: speaker.bio,
      image: speaker.image,
      details: {
        role: speaker.role,
        company: speaker.company,
        socials: speaker.socials
      }
    });
  };

  return (
    <section className="speakers-section" id="speakers">
      <div className="container">
        <div className="section-header">
          <h2>Nos Intervenants</h2>
          <p>Découvrez les experts qui partageront leur expérience lors de l'événement</p>
        </div>

        <div className="speakers-grid">
          {speakers.map(speaker => (
            <div 
              key={speaker.id} 
              className="speaker-card"
              onClick={() => handleSpeakerClick(speaker)}
            >
              <div className="speaker-image">
                <img 
                  src={speaker.image || '/img/speakers/default.jpg'} 
                  alt={speaker.name}
                  onError={(e) => {
                    e.target.src = '/img/speakers/default.jpg';
                    e.target.onerror = null;
                  }}
                />
                <div className="speaker-socials">
                  {speaker.socials.twitter && (
                    <a 
                      href={speaker.socials.twitter} 
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      T
                    </a>
                  )}
                  {speaker.socials.linkedin && (
                    <a 
                      href={speaker.socials.linkedin} 
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      L
                    </a>
                  )}
                </div>
              </div>
              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <div className="speaker-role">{speaker.role}</div>
                <div className="speaker-company">{speaker.company}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="speakers-cta">
          <button className="view-all-button">
            Voir tous les intervenants
          </button>
        </div>
      </div>
    </section>
  );
};

export default Speaker; 