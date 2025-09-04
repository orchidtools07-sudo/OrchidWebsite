import React, { useState, useRef, useEffect } from 'react';
import OrchidIVYImage from '../images/Residential/orchid-ivy.jpg';
import OrchidMayfield from '../images/Residential/orchid-mayfeild.jpg';
import OrchidMetroPols from '../images/Residential/orchid-metropols.jpg';
import OrchidPetals from '../images/Residential/orchid-petals.jpg';
import OrchidWestgreen from '../images/Residential/orchid-westgreen.jpg';
import OrchidIsland from '../images/Residential/orchid-island.avif';

const ResidentialProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const residentialRef = useRef();

  const CARD_WIDTH = 380;
  const GAP_WIDTH = 30;
  const SLIDE_WIDTH = CARD_WIDTH + GAP_WIDTH;
  const MOBILE_CARD_WIDTH = 320;
  const MOBILE_GAP_WIDTH = 20;
  const MOBILE_SLIDE_WIDTH = MOBILE_CARD_WIDTH + MOBILE_GAP_WIDTH;

  const residentialProjects = [
    {
      id: 1,
      name: 'Orchid IVY',
      location: 'Gurugram, Haryana',
      description: '4 BHK Premium Apartments',
      image: OrchidIVYImage,
      logo: '🏢'
    },
    {
      id: 2,
      name: 'Orchid Island',
      location: 'Sector 51, Gurugram',
      description: '3 & 4 BHK Luxury Residences',
      image: OrchidIsland,
      logo: '🏢'
    },
    {
      id: 3,
      name: 'Orchid Petals',
      location: 'Sohna Road, Gurugram',
      description: '2 & 3 BHK Premium Homes',
      image: OrchidPetals,
      logo: '🏢'
    },
    {
      id: 4,
      name: 'Westend Greens',
      location: 'Sector 49, Gurugram',
      description: '3 & 4 BHK Luxury Apartments',
      image: OrchidWestgreen,
      logo: '🏢'
    },
    {
      id: 5,
      name: 'Orchid Metropolis',
      location: 'Golf Course Extension Road',
      description: '4 BHK Ultra-Luxury Residences',
      image: OrchidMetroPols,
      logo: '🏢'
    },
    {
      id: 6,
      name: 'Mayfield Gardens',
      location: 'Dwarka Expressway, Gurugram',
      description: '2 & 3 BHK Premium Apartments',
      image: OrchidMayfield,
      logo: '🏢'
    }
  ];

  // Create infinite loop by duplicating projects
  const extendedProjects = [...residentialProjects, ...residentialProjects, ...residentialProjects];

  const isMobile = () => window.innerWidth <= 768;
  
  const getCurrentSlideWidth = () => {
    return isMobile() ? MOBILE_SLIDE_WIDTH : SLIDE_WIDTH;
  };

  // Start from the middle set to allow infinite scrolling in both directions
  const initialIndex = residentialProjects.length;

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
      if (currentIndex >= residentialProjects.length * 2 - 1) {
        setCurrentIndex(residentialProjects.length);
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
        setCurrentIndex(residentialProjects.length - 1);
      }
    }, 500);
  };

  return (
    <section className="projects-section residential-projects" ref={residentialRef}>
      <div className="container">
        <h2 className="section-title">Orchid Residential Projects</h2>
        <p className="section-intro">
          Our residential developments are thoughtfully designed to offer modern living, enhanced comfort, 
          and serene surroundings. Each home reflects quality craftsmanship, premium amenities, 
          and strategic connectivity.
        </p>

        <div className="residential-slider">
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
                      src={project.image} 
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
              aria-label="Previous residential project"
              title="View previous project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>
            <button 
              className="slider-btn next" 
              onClick={nextSlide}
              aria-label="Next residential project"
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

export default ResidentialProjects;
