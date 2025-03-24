import React from 'react';
import './Tickets.scss';

const Tickets = ({ openPassGamersPopup }) => {
  // Types de billets disponibles
  const tickets = [
    {
      id: 1,
      name: 'Passe Journée',
      price: '150 MAD',
      description: 'Accès à l\'événement pour une journée',
      features: [
        'Accès à toutes les zones d\'exposition',
        'Participation aux conférences du jour',
        'Badge visiteur standard',
        'Goodies de bienvenue'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Passe Complet',
      price: '350 MAD',
      description: 'Accès à l\'événement pour les 3 jours',
      features: [
        'Accès à toutes les zones d\'exposition',
        'Participation à toutes les conférences',
        'Badge visiteur premium',
        'Goodies exclusifs',
        'Accès prioritaire aux files d\'attente'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Passe Gamer',
      price: '500 MAD',
      description: 'Pour les joueurs qui veulent participer aux tournois',
      features: [
        'Tout ce qu\'inclut le Passe Complet',
        'Participation aux tournois eSports',
        'T-shirt officiel MGE',
        'Accès aux zones joueurs exclusives',
        'Rencontre avec les streamers'
      ],
      popular: false,
      special: true
    }
  ];

  return (
    <section className="tickets-section" id="tickets">
      <div className="container">
        <div className="section-header">
          <h2>Billets</h2>
          <p>Réservez vos places pour Morocco Gaming Expo 2024</p>
        </div>

        <div className="tickets-grid">
          {tickets.map(ticket => (
            <div 
              key={ticket.id} 
              className={`ticket-card ${ticket.popular ? 'popular' : ''} ${ticket.special ? 'special' : ''}`}
            >
              {ticket.popular && <div className="popular-tag">Populaire</div>}
              {ticket.special && <div className="special-tag">Spécial</div>}
              
              <div className="ticket-header">
                <h3 className="ticket-name">{ticket.name}</h3>
                <div className="ticket-price">{ticket.price}</div>
                <p className="ticket-description">{ticket.description}</p>
              </div>
              
              <div className="ticket-features">
                <ul>
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="ticket-actions">
                {ticket.id === 3 ? (
                  <button 
                    className="ticket-button special-button"
                    onClick={openPassGamersPopup}
                  >
                    Plus d'informations
                  </button>
                ) : (
                  <a 
                    href="https://ticket.mge.ma" 
                    className="ticket-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acheter maintenant
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="tickets-note">
          <p>* Les billets sont non remboursables et non transférables. Un e-billet vous sera envoyé par email après l'achat.</p>
          <p>Pour les achats de groupe (10+ personnes), contactez-nous à <a href="mailto:tickets@mge.ma">tickets@mge.ma</a> pour des tarifs spéciaux.</p>
        </div>
      </div>
    </section>
  );
};

export default Tickets;