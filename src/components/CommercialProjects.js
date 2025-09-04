import React, { useState, useRef, useEffect } from 'react';
import Hero2Image from '../images/Hero-2.jpg';

const CommercialProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const commercialRef = useRef();

  const CARD_WIDTH = 380;
  const GAP_WIDTH = 30;
  const SLIDE_WIDTH = CARD_WIDTH + GAP_WIDTH;
  const MOBILE_CARD_WIDTH = 320;
  const MOBILE_GAP_WIDTH = 20;
  const MOBILE_SLIDE_WIDTH = MOBILE_CARD_WIDTH + MOBILE_GAP_WIDTH;

  const commercialProjects = [
    {
      id: 1,
      name: 'Inspire BKC',
      location: 'Mumbai, Maharashtra',
      description: 'Office Spaces',
      image: 'Hero-2.jpg',
      logo: '🏢'
    },
    {
      id: 2,
      name: 'Center Point',
      location: 'Ahmedabad, Gujarat',
      description: 'Shops & Showrooms',
      image: 'Hero-2.jpg',
      logo: '🏢'
    },
    {
      id: 3,
      name: 'Medico House',
      location: 'Ahmedabad, Gujarat',
      description: 'Retail Spaces, Boutique Clinics, Floor Plates',
      image: 'Hero-2.jpg',
      logo: '🏢'
    },
    {
      id: 4,
      name: 'Orchid Square',
      location: 'Sushant Lok, Gurugram',
      description: 'Retail & Office Complex',
      image: 'Hero-2.jpg',
      logo: '🏢'
    },
    {
      id: 5,
      name: 'Orchid Plaza',
      location: 'Golf Course Road, Gurugram',
      description: 'Mixed-Use Development',
      image: 'Hero-2.jpg',
      logo: '🏢'
    },
    {
      id: 6,
      name: 'Orchid Tower',
      location: 'Cyber City, Gurugram',
      description: 'High-Rise Office Complex',
      image: 'Hero-2.jpg',
      logo: '🏢'
    }
  ];

  // Create infinite loop by duplicating projects
  const extendedProjects = [...commercialProjects, ...commercialProjects, ...commercialProjects];

  const isMobile = () => window.innerWidth <= 768;
  
  const getCurrentSlideWidth = () => {
    return isMobile() ? MOBILE_SLIDE_WIDTH : SLIDE_WIDTH;
  };

  // Start from the middle set to allow infinite scrolling in both directions
  const initialIndex = commercialProjects.length;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      // Reset to beginning of middle set when reaching end
      if (currentIndex >= commercialProjects.length * 2 - 1) {
        setCurrentIndex(commercialProjects.length);
      }
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      // Reset to end of middle set when reaching beginning
      if (currentIndex <= 0) {
        setCurrentIndex(commercialProjects.length - 1);
      }
    }, 500);
  };

  return (
    <section className="projects-section commercial-projects" ref={commercialRef}>
      <div className="container">
        <h2 className="section-title">Orchid Commercial Projects</h2>
        <p className="section-intro">
          Commercial spaces are built to empower businesses with smart infrastructure, prime locations, 
          and cutting-edge facilities, delivering environments that support productivity, professionalism, 
          and long-term growth.
        </p>

        <div className="commercial-slider">
          <div className="slider-container">
            <div 
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * getCurrentSlideWidth()}px)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {extendedProjects.map((project, index) => (
                <div key={`${project.id}-${index}`} className="project-card">
                  <div className="project-image">
                    <img 
                      src={Hero2Image} 
                      alt={`${project.name} - ${project.description} in ${project.location}`}
                      loading="lazy"
                      onLoad={(e) => e.target.classList.add('loaded')}
                      onError={(e) => {
                        e.target.alt = `Image not available for ${project.name}`;
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="project-logo-badge">
                      <span className="project-logo">{project.logo}</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-location">{project.location}</p>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="slider-controls">
            <button 
              className="slider-btn prev" 
              onClick={prevSlide}
              aria-label="Previous commercial project"
              title="View previous project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>
            <button 
              className="slider-btn next" 
              onClick={nextSlide}
              aria-label="Next commercial project"
              title="View next project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18L15 12L9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialProjects;
