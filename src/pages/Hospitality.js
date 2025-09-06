import React, { useState, useEffect } from 'react';
import './Hospitality.css';

const Hospitality = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const highlights = [
    'Honoured with the "Best First Class Hotel" Award',
    'Strategic and prominent location on Mehrauli-Gurgaon Road',
    'Sprawling 120,000 sqft. area',
    'Exclusive shopping and office levels across 2 floors',
    'Managed by the renowned ITC Welcomgroup',
    'Top-of-the-line Building Management System'
  ];

  return (
    <div className="hospitality-page">
      {/* Hero Section */}
      <section className="hospitality-hero">
        <div className="hospitality-hero-background">
          <div className="hospitality-floating-elements">
            <div className="hospitality-float-1"></div>
            <div className="hospitality-float-2"></div>
            <div className="hospitality-float-3"></div>
            <div className="hospitality-float-4"></div>
          </div>
        </div>
        
        <div className="hospitality-hero-content">
          <div className="hospitality-container">
            <div className="hospitality-hero-grid">
              <div className="hospitality-text-section">
                <div className={`hospitality-badge ${isVisible ? 'animate-in' : ''}`}>
                  <span className="hospitality-badge-icon">★</span>
                  4-Star ITC Welcomgroup Hotel
                </div>
                
                <h1 className={`hospitality-hero-title ${isVisible ? 'animate-in' : ''}`}>
                  Fortune Select
                  <span className="hospitality-title-highlight">Global</span>
                </h1>
                
                <div className={`hospitality-hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
                  Discerning Service & Supreme Comfort
                </div>
                
                <p className={`hospitality-hero-description ${isVisible ? 'animate-in' : ''}`}>
                  Owing to the grandeur of its 83 rooms and suites, convenient location, 
                  excellent service, multi-cuisine restaurant, business centre, and more, 
                  it is the favoured hotel for business travellers from across the globe. 
                  Honoured as <strong>"the finest hotel in its class"</strong> in India.
                </p>
                
                <div className={`hospitality-features ${isVisible ? 'animate-in' : ''}`}>
                  <div className="hospitality-feature-item">
                    <div className="hospitality-feature-icon">🏨</div>
                    <span>83 Luxury Rooms & Suites</span>
                  </div>
                  <div className="hospitality-feature-item">
                    <div className="hospitality-feature-icon">🍽️</div>
                    <span>Multi-Cuisine Restaurant</span>
                  </div>
                  <div className="hospitality-feature-item">
                    <div className="hospitality-feature-icon">💼</div>
                    <span>Business Centre</span>
                  </div>
                </div>
                
                <div className={`hospitality-cta-section ${isVisible ? 'animate-in' : ''}`}>
                  <button 
                    className="hospitality-visit-btn"
                    onClick={() => window.open('https://www.itchotels.com/in/en/fortuneselectglobal-gurugram', '_blank')}
                  >
                    <span>Visit Website</span>
                    <div className="hospitality-btn-glow"></div>
                  </button>
                </div>
              </div>
              
              <div className="hospitality-visual-section">
                <div className="hospitality-hotel-showcase">
                  <div className="hospitality-showcase-card main-card">
                    <div className="hospitality-card-glow"></div>
                    <div className="hospitality-card-content">
                      <div className="hospitality-award-badge">
                        <div className="hospitality-award-icon">🏆</div>
                        <div className="hospitality-award-text">
                          <span>Best First Class</span>
                          <span>Hotel Award</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hospitality-showcase-card secondary-card">
                    <div className="hospitality-card-content">
                      <div className="hospitality-location-info">
                        <div className="hospitality-location-icon">📍</div>
                        <div className="hospitality-location-text">
                          <span>Mehrauli-Gurgaon Road</span>
                          <span>Strategic Location</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hospitality-showcase-card tertiary-card">
                    <div className="hospitality-card-content">
                      <div className="hospitality-area-info">
                        <div className="hospitality-area-number">120,000</div>
                        <div className="hospitality-area-unit">sqft</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Elegance Section */}
      <section className="hospitality-elegance">
        <div className="hospitality-container">
          <div className="hospitality-elegance-content">
            <h2 className="hospitality-elegance-title">
              Elegance & Sophistication
            </h2>
            <p className="hospitality-elegance-description">
              The elegance and sophistication are complemented by interiors that blend 
              classic and modern touches, with an emphasis on space and glamour. It boasts 
              also of banqueting facilities, health club, swimming pool, bar, and a glitzy 
              shopping arcade. Very few business hotels exude so much charm and panache – 
              suiting every aspiration and business requirement.
            </p>
            
            <div className="hospitality-amenities-grid">
              <div className="hospitality-amenity-card">
                <div className="hospitality-amenity-icon">🏊‍♂️</div>
                <h3>Swimming Pool</h3>
                <p>Luxurious pool facilities</p>
              </div>
              <div className="hospitality-amenity-card">
                <div className="hospitality-amenity-icon">🏋️‍♂️</div>
                <h3>Health Club</h3>
                <p>State-of-the-art fitness center</p>
              </div>
              <div className="hospitality-amenity-card">
                <div className="hospitality-amenity-icon">🍸</div>
                <h3>Premium Bar</h3>
                <p>Sophisticated cocktail lounge</p>
              </div>
              <div className="hospitality-amenity-card">
                <div className="hospitality-amenity-icon">🛍️</div>
                <h3>Shopping Arcade</h3>
                <p>Glitzy retail experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Highlights Section */}
      <section className="hospitality-highlights">
        <div className="hospitality-container">
          <h2 className="hospitality-highlights-title">Key Highlights</h2>
          <div className="hospitality-highlights-grid">
            {highlights.map((highlight, index) => (
              <div key={index} className="hospitality-highlight-item">
                <div className="hospitality-highlight-bullet">
                  <div className="hospitality-bullet-glow"></div>
                </div>
                <span className="hospitality-highlight-text">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hospitality;
