import React from 'react';
import './Partners.scss';

const Partners = () => {
  // Liste fictive de partenaires
  const partners = [
    { id: 1, name: 'Sponsor Gold', logo: '/img/sponsors/sponsor1.png' },
    { id: 2, name: 'Sponsor Silver', logo: '/img/sponsors/sponsor2.png' },
    { id: 3, name: 'Sponsor Bronze', logo: '/img/sponsors/sponsor3.png' },
    { id: 4, name: 'Media Partner', logo: '/img/sponsors/sponsor4.png' },
    { id: 5, name: 'Tech Partner', logo: '/img/sponsors/sponsor5.png' },
  ];

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="section-header">
          <h2>Nos Partenaires</h2>
          <p>Ils nous font confiance et soutiennent Morocco Gaming Expo</p>
        </div>

        <div className="partners-grid">
          {partners.map(partner => (
            <div key={partner.id} className="partner-item">
              <div className="partner-logo">
                {/* Image de placeholder si le logo n'est pas disponible */}
                <img 
                  src={partner.logo || '/img/placeholder-logo.png'} 
                  alt={partner.name} 
                  onError={(e) => {
                    e.target.src = '/img/placeholder-logo.png';
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="partner-name">{partner.name}</div>
            </div>
          ))}
        </div>

        <div className="become-partner">
          <h3>Devenez partenaire</h3>
          <p>Vous souhaitez associer votre marque à Morocco Gaming Expo?</p>
          <a href="mailto:partners@mge.ma" className="partner-cta">
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partners; 