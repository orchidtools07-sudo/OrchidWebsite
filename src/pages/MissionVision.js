import React, { useState, useEffect } from 'react';
import './MissionVision.css';

const MissionVision = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="mission-vision-page">
      {/* Hero Section */}
      <section className="mv-hero">
        <div className="mv-hero-background">
          <div className="mv-floating-particles">
            <div className="mv-particle mv-particle-1"></div>
            <div className="mv-particle mv-particle-2"></div>
            <div className="mv-particle mv-particle-3"></div>
            <div className="mv-particle mv-particle-4"></div>
            <div className="mv-particle mv-particle-5"></div>
            <div className="mv-particle mv-particle-6"></div>
          </div>
          <div className="mv-gradient-overlay"></div>
        </div>
        
        <div className="mv-hero-content">
          <div className="mv-container">
            <div className="mv-hero-header">
              <div className={`mv-hero-badge ${isVisible ? 'animate-in' : ''}`}>
                <span className="mv-badge-icon">✨</span>
                Our Foundation
              </div>
              
              <h1 className={`mv-hero-title ${isVisible ? 'animate-in' : ''}`}>
                Mission
                <span className="mv-title-separator">&</span>
                <span className="mv-title-highlight">Vision</span>
              </h1>
              
              <p className={`mv-hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
                The driving force behind everything we create
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="mv-vision-section">
        <div className="mv-container">
          <div className="mv-content-grid">
            <div className="mv-content-card vision-card">
              <div className="mv-card-header">
                <div className="mv-card-icon">
                  <div className="mv-icon-circle">
                    <span>👁️</span>
                  </div>
                </div>
                <h2 className="mv-card-title">The Orchid Vision</h2>
              </div>
              
              <div className="mv-card-content">
                <blockquote className="mv-vision-quote">
                  "We shall do whatever it takes to deliver the finest, we shall set new industry benchmarks, and as a result, we shall make life inspirational for everyone associated with us."
                </blockquote>
              </div>
              
              <div className="mv-card-decoration">
                <div className="mv-decoration-line"></div>
                <div className="mv-decoration-dot"></div>
                <div className="mv-decoration-line"></div>
              </div>
            </div>

            <div className="mv-content-card mission-card">
              <div className="mv-card-header">
                <div className="mv-card-icon">
                  <div className="mv-icon-circle">
                    <span>🎯</span>
                  </div>
                </div>
                <h2 className="mv-card-title">The Orchid Mission</h2>
              </div>
              
              <div className="mv-card-content">
                <p className="mv-mission-text">
                  To make our current projects noticeable standard bearers, leaving a lasting impression on the industry and the property buying public. Laying the foundation for Orchid's brand philosophy: 
                  <strong className="mv-brand-philosophy">Making living more inspirational.</strong>
                </p>
              </div>
              
              <div className="mv-card-decoration">
                <div className="mv-decoration-line"></div>
                <div className="mv-decoration-dot"></div>
                <div className="mv-decoration-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mv-values-section">
        <div className="mv-container">
          <h2 className="mv-values-title">Our Core Values</h2>
          <div className="mv-values-grid">
            <div className="mv-value-item">
              <div className="mv-value-icon">
                <div className="mv-value-icon-bg">
                  <span>🏆</span>
                </div>
              </div>
              <h3>Excellence</h3>
              <p>Setting new industry benchmarks through uncompromising quality</p>
            </div>
            
            <div className="mv-value-item">
              <div className="mv-value-icon">
                <div className="mv-value-icon-bg">
                  <span>💡</span>
                </div>
              </div>
              <h3>Innovation</h3>
              <p>Pioneering solutions that redefine modern living experiences</p>
            </div>
            
            <div className="mv-value-item">
              <div className="mv-value-icon">
                <div className="mv-value-icon-bg">
                  <span>🤝</span>
                </div>
              </div>
              <h3>Integrity</h3>
              <p>Building trust through transparency and ethical practices</p>
            </div>
            
            <div className="mv-value-item">
              <div className="mv-value-icon">
                <div className="mv-value-icon-bg">
                  <span>✨</span>
                </div>
              </div>
              <h3>Inspiration</h3>
              <p>Making life inspirational for everyone we touch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="mv-journey-section">
        <div className="mv-container">
          <div className="mv-journey-content">
            <h2 className="mv-journey-title">Our Journey Forward</h2>
            <p className="mv-journey-description">
              Every project we undertake is a step towards realizing our vision. 
              We believe in creating spaces that don't just meet expectations, 
              but inspire a new way of living.
            </p>
            
            <div className="mv-journey-stats">
              <div className="mv-stat-item">
                <div className="mv-stat-number">15+</div>
                <div className="mv-stat-label">Years of Excellence</div>
              </div>
              <div className="mv-stat-item">
                <div className="mv-stat-number">50+</div>
                <div className="mv-stat-label">Projects Delivered</div>
              </div>
              <div className="mv-stat-item">
                <div className="mv-stat-number">1000+</div>
                <div className="mv-stat-label">Happy Families</div>
              </div>
              <div className="mv-stat-item">
                <div className="mv-stat-number">100%</div>
                <div className="mv-stat-label">Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionVision;
