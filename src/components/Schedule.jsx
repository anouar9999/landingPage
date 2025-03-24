import React, { useState } from 'react';
import './Schedule.scss';

const Schedule = () => {
  // État pour le jour actif
  const [activeDay, setActiveDay] = useState(1);
  
  // Données fictives du programme
  const schedule = {
    1: [
      { 
        time: '09:00 - 10:00', 
        title: 'Ouverture des portes', 
        location: 'Hall principal',
        type: 'general'
      },
      { 
        time: '10:00 - 11:30', 
        title: 'Conférence d\'ouverture: L\'avenir du gaming au Maroc', 
        speaker: 'Mohammed Alami',
        location: 'Auditorium A',
        type: 'conference'
      },
      { 
        time: '12:00 - 14:00', 
        title: 'Tournoi FIFA 24 - Qualifications', 
        location: 'Zone eSports',
        type: 'tournament'
      },
      { 
        time: '14:30 - 16:00', 
        title: 'Panel: Développement de jeux indépendants', 
        speaker: 'Panel d\'experts',
        location: 'Salle B',
        type: 'panel'
      },
      { 
        time: '16:30 - 18:00', 
        title: 'Démonstration: Réalité Virtuelle & Augmentée', 
        location: 'Zone Tech',
        type: 'demo'
      },
      { 
        time: '18:30 - 20:00', 
        title: 'Finale Fortnite - Solo', 
        location: 'Scène principale',
        type: 'tournament'
      }
    ],
    2: [
      { 
        time: '09:00 - 10:00', 
        title: 'Ouverture des portes', 
        location: 'Hall principal',
        type: 'general'
      },
      { 
        time: '10:00 - 11:30', 
        title: 'Workshop: Creation de personnages 3D', 
        speaker: 'Sarah Bennani',
        location: 'Atelier C',
        type: 'workshop'
      },
      { 
        time: '12:00 - 14:00', 
        title: 'Tournoi Call of Duty - Équipes', 
        location: 'Zone eSports',
        type: 'tournament'
      },
      { 
        time: '14:30 - 16:00', 
        title: 'Conférence: Le gaming comme outil éducatif', 
        speaker: 'Dr. Karim Fassi',
        location: 'Auditorium A',
        type: 'conference'
      },
      { 
        time: '16:30 - 18:00', 
        title: 'Cosplay Contest', 
        location: 'Scène principale',
        type: 'event'
      },
      { 
        time: '18:30 - 20:00', 
        title: 'Concert: Gaming Music Orchestra', 
        location: 'Scène principale',
        type: 'event'
      }
    ],
    3: [
      { 
        time: '09:00 - 10:00', 
        title: 'Ouverture des portes', 
        location: 'Hall principal',
        type: 'general'
      },
      { 
        time: '10:00 - 12:00', 
        title: 'Finale Tournoi League of Legends', 
        location: 'Scène principale',
        type: 'tournament'
      },
      { 
        time: '12:30 - 14:00', 
        title: 'Meet & Greet avec les Streamers', 
        location: 'Zone Influenceurs',
        type: 'meet'
      },
      { 
        time: '14:30 - 16:00', 
        title: 'Panel: Carrières dans l\'industrie du jeu vidéo', 
        speaker: 'Panel d\'experts',
        location: 'Salle B',
        type: 'panel'
      },
      { 
        time: '16:30 - 18:00', 
        title: 'Remise des prix', 
        location: 'Scène principale',
        type: 'event'
      },
      { 
        time: '18:30 - 20:00', 
        title: 'Cérémonie de clôture', 
        location: 'Auditorium A',
        type: 'general'
      }
    ]
  };

  // Fonction pour changer de jour
  const changeDay = (day) => {
    setActiveDay(day);
  };

  return (
    <section className="schedule-section" id="schedule">
      <div className="container">
        <div className="section-header">
          <h2>Programme</h2>
          <p>Découvrez toutes les activités prévues pendant l'événement</p>
        </div>

        <div className="schedule-tabs">
          <button 
            className={`tab-button ${activeDay === 1 ? 'active' : ''}`}
            onClick={() => changeDay(1)}
          >
            Jour 1
          </button>
          <button 
            className={`tab-button ${activeDay === 2 ? 'active' : ''}`}
            onClick={() => changeDay(2)}
          >
            Jour 2
          </button>
          <button 
            className={`tab-button ${activeDay === 3 ? 'active' : ''}`}
            onClick={() => changeDay(3)}
          >
            Jour 3
          </button>
        </div>

        <div className="schedule-timeline">
          {schedule[activeDay].map((item, index) => (
            <div key={index} className={`timeline-item ${item.type}`}>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-content">
                <h3 className="timeline-title">{item.title}</h3>
                {item.speaker && (
                  <div className="timeline-speaker">
                    <span className="label">Intervenant:</span> {item.speaker}
                  </div>
                )}
                <div className="timeline-location">
                  <span className="label">Lieu:</span> {item.location}
                </div>
                <div className="timeline-type">
                  <span className={`type-tag ${item.type}`}>
                    {item.type === 'conference' && 'Conférence'}
                    {item.type === 'panel' && 'Panel'}
                    {item.type === 'workshop' && 'Atelier'}
                    {item.type === 'tournament' && 'Tournoi'}
                    {item.type === 'demo' && 'Démo'}
                    {item.type === 'event' && 'Événement'}
                    {item.type === 'meet' && 'Rencontre'}
                    {item.type === 'general' && 'Général'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-download">
          <p>Téléchargez le programme complet en PDF</p>
          <a href="/downloads/programme-mge-2024.pdf" className="download-button">
            Télécharger le PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default Schedule; 