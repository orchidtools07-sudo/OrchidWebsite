import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import AboutOrchid1 from '../images/Residential/orchid-ivy.jpg';
import AboutOrchid2 from '../images/Residential/interiour.jpg';
import AboutOrchid3 from '../images/Residential/orchid-metropols.jpg';
import AboutOrchid4 from '../images/Residential/Interiou2.jpg';
import ScheduleCallPopup from '../components/ScheduleCallPopup';

const About = () => {
  const navigate = useNavigate();
  const [scheduleCallPopup, setScheduleCallPopup] = useState(false);

  const handleExploreProjects = () => {
    navigate('/projects');
  };

  const handleScheduleConsultation = () => {
    setScheduleCallPopup(true);
  };

  const closeScheduleCallPopup = () => {
    setScheduleCallPopup(false);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✦</span>
              About Orchid Infrastructure
            </div>
            <h1 className="hero-title">
              Crafting <span className="gradient-text">Luxury</span> Living Spaces
            </h1>
            <p className="hero-subtitle">
              Where architectural excellence meets uncompromising quality. We transform visions into 
              extraordinary residential and commercial developments that define modern luxury.
            </p>
         
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-content">
        <div className="container">
          <div className="luxury-content-wrapper">
            {/* Luxury Header */}
            <div className="luxury-header">
              <div className="luxury-badge">
                <span className="badge-sparkle">✨</span>
                Our Legacy of Excellence
              </div>
              <h2 className="luxury-title">
                Crafting <span className="gold-text">Extraordinary</span> Living Experiences
              </h2>
              <div className="luxury-divider">
                <div className="divider-line"></div>
                <div className="divider-diamond">◆</div>
                <div className="divider-line"></div>
              </div>
              <p className="luxury-subtitle">
                Since 2008, we have been transforming architectural dreams into breathtaking realities, 
                setting new standards in luxury real estate development across India.
              </p>
            </div>

            {/* Luxury Content Grid */}
            <div className="luxury-grid">
              {/* Left Side - Image Gallery */}
              <div className="luxury-gallery">
                <div className="main-luxury-image">
                  <img 
                    src={AboutOrchid1} 
                    alt="Luxury Real Estate Development" 
                    className="gallery-main-img"
                  />
                  <div className="image-luxury-overlay">
                    <div className="overlay-luxury-content">
                      <h4>Premium Architecture</h4>
                      <p>Where luxury meets innovation</p>
                    </div>
                  </div>
                </div>

                <div className="secondary-luxury-image">
                  <img 
                    src={AboutOrchid2}
                    alt="Luxury Interior Design" 
                    className="gallery-secondary-img"
                  />
                  <div className="image-luxury-overlay">
                    <div className="overlay-luxury-content">
                      <h4>Exquisite Interiors</h4>
                      <p>Crafted with finest materials</p>
                    </div>
                  </div>
                </div>
                
                <div className="gallery-thumbnails">
                  <div className="thumbnail-item">
                    <img 
                      src={AboutOrchid3}
                      alt="Modern Architecture" 
                    />
                    <div className="thumbnail-overlay">
                      <span>Modern Design</span>
                    </div>
                  </div>
                  <div className="thumbnail-item">
                    <img 
                      src={AboutOrchid4}
                      alt="Luxury Interior" 
                    />
                    <div className="thumbnail-overlay">
                      <span>Premium Interiors</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Luxury Content Cards */}
              <div className="luxury-content-cards">
                <div className="luxury-card">
                  <div className="card-luxury-header">
                    <div className="luxury-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" alt="Excellence" />
                    </div>
                    <div className="card-title-section">
                      <h3>Legacy of Excellence</h3>
                      <span className="card-subtitle">Since 2008</span>
                    </div>
                  </div>
                  <p>
                    Orchid Infrastructure has redefined luxury living with over 200+ premium developments. 
                    Our architectural masterpieces stand as testaments to uncompromising quality and 
                    innovative design excellence.
                  </p>
                
                </div>

                <div className="luxury-card">
                  <div className="card-luxury-header">
                    <div className="luxury-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/3176/3176313.png" alt="Vision" />
                    </div>
                    <div className="card-title-section">
                      <h3>Visionary Development</h3>
                      <span className="card-subtitle">Future-Ready</span>
                    </div>
                  </div>
                  <p>
                    We create iconic landmarks that blend contemporary aesthetics with sustainable practices. 
                    Each development is meticulously planned to enhance lifestyles and create lasting value 
                    for our discerning clientele.
                  </p>
              
                </div>

                <div className="luxury-card">
                  <div className="card-luxury-header">
                    <div className="luxury-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/3176/3176320.png" alt="Quality" />
                    </div>
                    <div className="card-title-section">
                      <h3>Unmatched Quality</h3>
                      <span className="card-subtitle">Premium Standards</span>
                    </div>
                  </div>
                  <p>
                    Every Orchid development reflects our commitment to superior craftsmanship and attention 
                    to detail. We use only the finest materials and work with renowned architects to deliver 
                    exceptional living spaces.
                  </p>
                  <div className="quality-indicators">
                    <div className="quality-item">
                      <span className="quality-icon">🏆</span>
                      <span>Award Winning</span>
                    </div>
                    <div className="quality-item">
                      <span className="quality-icon">⭐</span>
                      <span>5-Star Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Luxury Stats Section */}
        
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title">
              Unmatched <span className="gradient-text">Excellence</span> in Every Detail
            </h2>
            <p className="section-subtitle">
              Discover what sets us apart in the luxury real estate development industry
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>🏗️</span>
              </div>
              <h3>Premium Construction</h3>
              <p>State-of-the-art construction techniques with the finest materials and finishes for lasting quality.</p>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>🎨</span>
              </div>
              <h3>Innovative Design</h3>
              <p>Award-winning architectural designs that blend aesthetics with functionality and sustainability.</p>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>🌱</span>
              </div>
              <h3>Sustainable Living</h3>
              <p>Eco-friendly developments with green building practices and energy-efficient solutions.</p>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>🔧</span>
              </div>
              <h3>Expert Craftsmanship</h3>
              <p>Skilled artisans and experienced professionals ensuring perfection in every construction detail.</p>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>📍</span>
              </div>
              <h3>Prime Locations</h3>
              <p>Strategic locations with excellent connectivity, amenities, and future growth potential.</p>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-icon">
                <span>🤝</span>
              </div>
              <h3>Customer First</h3>
              <p>Dedicated support throughout your journey with transparent processes and timely delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-gradient"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <span className="badge-icon">✨</span>
              Ready to Begin?
            </div>
            <h2 className="cta-title">
              Let's Create Your <span className="gradient-text-light">Dream Space</span>
            </h2>
            <p className="cta-subtitle">
              Experience the pinnacle of luxury living with our premium developments. 
              Connect with our experts to explore exclusive opportunities.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary premium-btn" onClick={handleExploreProjects}>
                <span>Explore Projects</span>
                <span className="btn-arrow">→</span>
              </button>
              <button 
                className="btn-secondary premium-btn"
                onClick={handleScheduleConsultation}
              >
                <span>Schedule Consultation</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Call Popup */}
      <ScheduleCallPopup 
        isOpen={scheduleCallPopup}
        onClose={closeScheduleCallPopup}
      />
    </div>
  );
};

export default About;
