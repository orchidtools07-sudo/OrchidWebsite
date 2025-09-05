import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Residential.css';
const Residential = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const residentialProjects = [
    {
      id: 1,
      name: 'Orchid IVY',
      location: 'Sector 51, Gurugram',
      description: 'Orchid IVY Floors, is a one-of-its-kind residential project in the heart of Gurugram sector 51, an address that brings to you a completely new world. Orchid IVY is a self-integrated and coveted residential destination. With its futuristic design, state-of-the-art facilities and relaxing environment, Orchid IVY provides you with a definitive edge within the most integrated Community Living.',
      features: ['Futuristic Design', 'State-of-the-art Facilities', 'Integrated Community Living', 'Peaceful Environment'],
      image: 'orchid-ivy',
      status: 'Under Development'
    },
    {
      id: 2,
      name: 'Orchid Island',
      location: 'Sector 51, Gurugram',
      description: 'Orchid Island is one of the largest low-rise residential complexes in Gurugram and is located in Sector 51. Over 900 families are already enjoying the benefits and beauty of their homes here. With 24-hour power back up, water supply, and security, residents are completely at ease.',
      features: ['Ready to Move', '2/3/4 BHK', 'G+2 Level Flats', 'Starting @ 80 Lacs', '24-hour Power Backup', '24-hour Water Supply', '24-hour Security'],
      image: 'orchid-island',
      status: 'Ready to Move'
    },
    {
      id: 3,
      name: 'Orchid Petals',
      location: 'Sector 49, Sohna Road, Gurugram',
      description: 'Located on Sector 49 Sohna Road, Gurugram, spread over 37 acres and 3 million square feet of exclusive and top class living space, is Orchid Petals. The largest residential project par excellence brought to you by Orchid Developers! This residential complex has 635 units - 3 bedroom apartments, 3 bedroom and study apartments, and 4 bedroom apartments / penthouses and villas.',
      features: ['Ready to Move', '3/4 BHK / Penthouse / Villas', 'Highrise Apartment', 'Starting @ 1.5 Crore', '37 Acres', '635 Units', '24-hour Power Supply', '24-hour Water Supply', 'Multi-tier Security'],
      image: 'orchid-petals',
      status: 'Ready to Move'
    },
    {
      id: 4,
      name: 'Westend Greens',
      location: 'Near International Airport, New Delhi',
      description: 'Pristine and exemplary are the words that come to mind when describing these opulent homes. The awe-inspiring and extensive luxurious landscape spread across 400 acres near the international airport in New Delhi, is sure appeal to aesthete in you. These homes go beyond the horizon of spectacular and provide the quintessential features for even the most discretionary connoisseur.',
      features: ['Luxury Villas', '400 Acres', 'Premium Location', 'Diplomatic Area', 'Business Magnates', 'Top-level Officials'],
      image: 'westend-greens',
      status: 'Ready to Move'
    },
    {
      id: 5,
      name: 'Orchid Metropolis',
      location: 'Aurobindo Marg, New Delhi',
      description: 'One of the prestigious completed projects from Orchid Developers in the posh Aurobindo Marg area in New Delhi. This residential complex offers an unmatched living experience with the stylish, airy, and well-equipped living spaces.',
      features: ['Completed Project', 'Premium Location', 'Stylish Design', 'Airy Spaces', 'Double Layer Parking', 'Swimming Pool', 'Water Body', '24x7 Security', 'Centralized Maintenance'],
      image: 'orchid-metropolis',
      status: 'Completed'
    },
    {
      id: 6,
      name: 'Mayfield Gardens',
      location: 'Express Highway, Rajiv Chowk',
      description: 'Enticing and alluring, the homes in the 330-acre township of Mayfield Gardens, are the ultimate in luxury living, touching the Express Highway new Rajiv Chowk that connects Gurgaon with its satellites. There are excellent amenities to cater to those fond of luxurious living.',
      features: ['330 Acres', 'Luxury Living', 'Highway Access', 'Manicured Landscapes', 'Space Optimization', 'Cross Ventilation', 'Extra-ordinary Features'],
      image: 'mayfield-gardens',
      status: 'Ready to Move'
    }
  ];

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= residentialProjects.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev <= 0 ? residentialProjects.length - slidesToShow : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="residential">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Orchid Residential Projects</h1>
          <p>Our residential developments are thoughtfully designed to offer modern living, enhanced comfort, and serene surroundings. Each home reflects quality craftsmanship, premium amenities, and strategic connectivity.</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <div className="projects-slider">
            <div className="slider-container">
              <button className="slider-btn prev-btn" onClick={prevSlide}>
                &#8249;
              </button>
              
              <div className="slider-wrapper">
                <div 
                  className="slider-track"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                    width: `${(residentialProjects.length / slidesToShow) * 100}%`
                  }}
                >
                  {residentialProjects.map(project => (
                    <div key={project.id} className="project-slide">
                      <div className="project-card">
                        <div className="project-image">
                          <div className="image-placeholder">{project.image}</div>
                        </div>
                        <div className="project-content">
                          <div className="project-header">
                            <h3>{project.name}</h3>
                            <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="project-location">{project.location}</p>
                          <p className="project-description">{project.description}</p>
                          <div className="project-features">
                            {project.features.slice(0, 4).map((feature, index) => (
                              <span key={index} className="feature-tag">{feature}</span>
                            ))}
                          </div>
                          <Link to={`/residential/${project.id}`} className="view-more-btn">View More</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="slider-btn next-btn" onClick={nextSlide}>
                &#8250;
              </button>
            </div>
            
            <div className="slider-dots">
              {Array.from({ length: Math.ceil(residentialProjects.length / slidesToShow) }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Orchid Residential Projects?</h2>
            <p>We are committed to delivering quality homes that exceed expectations</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🏗️</div>
              <h3>Quality Construction</h3>
              <p>Built with premium materials and modern construction techniques ensuring durability and safety.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌳</div>
              <h3>Green Spaces</h3>
              <p>Thoughtfully designed landscapes and green areas for a healthy and peaceful living environment.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>24/7 Security</h3>
              <p>Multi-tier security systems and round-the-clock surveillance for your peace of mind.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏊</div>
              <h3>Modern Amenities</h3>
              <p>Swimming pools, gyms, play areas, and more amenities for an enhanced lifestyle.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📍</div>
              <h3>Prime Locations</h3>
              <p>Strategically located projects with easy access to transportation, schools, and hospitals.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Value for Money</h3>
              <p>Competitive pricing with flexible payment options and excellent return on investment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Residential;
