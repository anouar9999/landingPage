import React from 'react';
import './Event.scss';

const Event = () => {
  // Détails fictifs de l'événement (à remplacer par vos données)
  const eventDetails = {
    name: "Morocco Gaming Expo 2024",
    date: "15-17 Septembre 2024",
    location: "Casablanca, Maroc",
    venueAddress: "Office des Foires et Expositions de Casablanca (OFEC)",
    description: "Le plus grand salon du jeu vidéo et des technologies numériques au Maroc. Une opportunité unique de découvrir les dernières tendances du gaming, rencontrer des développeurs, participer à des compétitions et bien plus encore.",
    highlights: [
      "Plus de 100 exposants",
      "Tournois de esports avec plus de 50 000 MAD de prix",
      "Conférences et ateliers par des experts internationaux",
      "Zone de démonstration des derniers jeux et technologies",
      "Espace networking pour les professionnels"
    ]
  };

  return (
    <section className="event-section" id="event">
      <div className="container">
        <div className="event-header">
          <h2>L'Événement</h2>
          <div className="event-meta">
            <div className="event-meta-item">
              <span className="meta-label">Date</span>
              <span className="meta-value">{eventDetails.date}</span>
            </div>
            <div className="event-meta-item">
              <span className="meta-label">Lieu</span>
              <span className="meta-value">{eventDetails.location}</span>
            </div>
          </div>
        </div>

        <div className="event-content">
          <div className="event-description">
            <h3>{eventDetails.name}</h3>
            <p>{eventDetails.description}</p>
            <div className="event-address">
              <strong>Adresse:</strong> {eventDetails.venueAddress}
            </div>
          </div>

          <div className="event-features">
            <h3>Points forts</h3>
            <ul className="features-list">
              {eventDetails.highlights.map((highlight, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="event-cta">
          <a href="https://ticket.mge.ma" className="primary-button">
            Réserver mes billets
          </a>
          <a href="#contact" className="secondary-button">
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
};

export default Event; 