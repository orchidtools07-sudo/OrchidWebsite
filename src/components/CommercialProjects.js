import React from 'react';
import OrchidCenter from '../images/Commercial/orchid-centre.jpg';
import OrchidBusinessPark from '../images/Commercial/orchid-businesspark.jpg';
import Hero2Image from '../images/Hero-2.jpg';
import GlobalArcade from '../images/Commercial/Global-Arcade.jpg';
import GlobalBusinessPark from '../images/Commercial/global-businespark.jpg';
import ShoppingArcade from '../images/Commercial/shopping-arcade.jpg';
const CommercialProjects = () => {
  const commercialProjects = [
    {
      id: 1,
      name: 'Orchid Centre',
      location: 'Golf Course, Gurugram',
      image: OrchidCenter,
    },
    {
      id: 2,
      name: 'Orchid Business Park',
      location: 'Sector 48, Gurugram',
      image: OrchidBusinessPark,
    },
    {
      id: 3,
      name: 'Global Arcade',
      location: 'Sector 26, Gurugram',
      image: GlobalArcade,
    },
    {
      id: 4,
      name: 'Global Business Park',
      location: 'Sector 26, Gurugram',
      image: GlobalBusinessPark,
    },
    {
      id: 5,
      name: 'Shopping Arcade',
      location: 'Sohna-Road, Gurgaon',
      image: ShoppingArcade,
    },
   
  ];

  return (
    <section className="projects-section commercial-projects">
      <div className="container">
        <h2 className="section-title">Orchid Commercial Projects</h2>
        <p className="section-intro">
          Commercial spaces are built to empower businesses with smart infrastructure, prime locations, 
          and cutting-edge facilities, delivering environments that support productivity, professionalism, 
          and long-term growth.
        </p>

        <div className="projects-grid">
          {commercialProjects.map((project) => (
            <div key={project.id} className="project-card">
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

export default CommercialProjects;
