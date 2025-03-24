import React, { useState, useEffect } from 'react';
import './HomePageSlider.scss';

const HomePageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images du carrousel (à remplacer par vos propres images)
  const slides = [
    {
      id: 1,
      image: '/img/slider/slide1.jpg',
      title: 'Les Meilleurs Jeux',
      description: 'Découvrez les dernières tendances du gaming'
    },
    {
      id: 2,
      image: '/img/slider/slide2.jpg',
      title: 'Tournois Exclusifs',
      description: 'Participez à des compétitions de haut niveau'
    },
    {
      id: 3,
      image: '/img/slider/slide3.jpg',
      title: 'Rencontrez des Pros',
      description: 'Échangez avec les experts de l\'industrie'
    }
  ];

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Changer automatiquement de diapositive toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="homepage-slider-section">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${slide.image || '/img/slider/placeholder.jpg'})` 
            }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
        
        <div className="slider-controls">
          <button className="prev-btn" onClick={prevSlide}>
            &lt;
          </button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button className="next-btn" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePageSlider; 