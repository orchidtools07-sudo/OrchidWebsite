import React from 'react';
import OrchidIVYImage from '../images/Residential/orchid-ivy.jpg';
import OrchidMayfield from '../images/Residential/orchid-mayfeild.jpg';
import OrchidMetroPols from '../images/Residential/orchid-metropols.jpg';
import OrchidPetals from '../images/Residential/orchid-petals.jpg';
import OrchidWestgreen from '../images/Residential/orchid-westgreen.jpg';
import OrchidIsland from '../images/Residential/orchid-island.avif';

const ResidentialProjects = () => {
  const residentialProjects = [
    {
      id: 1,
      name: 'Orchid IVY',
      location: 'Gurugram, Haryana',
      description: '4 BHK Premium Apartments',
      image: OrchidIVYImage,
    },
    {
      id: 2,
      name: 'Orchid Island',
      location: 'Sector 51, Gurugram',
      description: '3 & 4 BHK Luxury Residences',
      image: OrchidIsland,
    },
    {
      id: 3,
      name: 'Orchid Petals',
      location: 'Sohna Road, Gurugram',
      description: '2 & 3 BHK Premium Homes',
      image: OrchidPetals,
    },
    {
      id: 4,
      name: 'Westend Greens',
      location: 'Sector 49, Gurugram',
      description: '3 & 4 BHK Luxury Apartments',
      image: OrchidWestgreen,
    },
    {
      id: 5,
      name: 'Orchid Metropolis',
      location: 'Golf Course Extension Road',
      description: '4 BHK Ultra-Luxury Residences',
      image: OrchidMetroPols,
    },
    {
      id: 6,
      name: 'Mayfield Gardens',
      location: 'Dwarka Expressway, Gurugram',
      description: '2 & 3 BHK Premium Apartments',
      image: OrchidMayfield,
    }
  ];

  return (
    <section className="projects-section residential-projects">
      <div className="container">
        <h2 className="section-title">Orchid Residential Projects</h2>
        <p className="section-intro">
          Our residential developments are thoughtfully designed to offer modern living, enhanced comfort, 
          and serene surroundings. Each home reflects quality craftsmanship, premium amenities, 
          and strategic connectivity.
        </p>

        <div className="projects-grid">
          {residentialProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={`${project.name} - ${project.description} in ${project.location}`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    transition: 'opacity 0.3s ease',
                    opacity: 0
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = 1;
                    e.target.classList.add('loaded');
                  }}
                  onError={(e) => {
                    e.target.alt = `Image not available for ${project.name}`;
                    e.target.style.display = 'none';
                  }}
                />
                <div className="project-logo-badge">
                  <span className="project-logo">{project.logo}</span>
                </div>
              </div>
              <div className="residential-project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="residential-project-location">{project.location}</p>
                <p className="project-description">{project.description}</p>
                <div className="view-more-luxury">
                  <span>View More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResidentialProjects;
