import React, { useState, useEffect } from 'react';
import './Certification.css';
import Certificate from  '../images/orchid-award.png';
const Certification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.certification-animate-on-load');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 300);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="certification-page">
      {/* Hero Section */}
      <section className="certification-hero">
        <div className="certification-hero-background">
          <div className="certification-grid-pattern"></div>
          <div className="certification-floating-icons">
            <div className="certification-icon certification-icon-1">🏆</div>
            <div className="certification-icon certification-icon-2">🎖️</div>
            <div className="certification-icon certification-icon-3">⭐</div>
            <div className="certification-icon certification-icon-4">🏅</div>
            <div className="certification-icon certification-icon-5">📜</div>
            <div className="certification-icon certification-icon-6">✨</div>
          </div>
          <div className="certification-light-beams">
            <div className="certification-beam certification-beam-1"></div>
            <div className="certification-beam certification-beam-2"></div>
            <div className="certification-beam certification-beam-3"></div>
          </div>
        </div>
        
        <div className="certification-container">
          <div className="certification-hero-content">
            <div className="certification-hero-badge certification-animate-on-load">
              <span className="certification-badge-icon">🎯</span>
              Excellence Recognized
            </div>
            
            <h1 className="certification-hero-title certification-animate-on-load">
              Our <span className="certification-title-highlight">Certification</span>
            </h1>
            
            <p className="certification-hero-subtitle certification-animate-on-load">
              Proudly showcasing our commitment to quality, innovation, and professional excellence in every project we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Display Section */}
      <section className="certification-display-section">
        <div className="certification-container">
          <div className="certification-section-header certification-animate-on-load">
            <h2>Professional Recognition</h2>
            <p>Our certification demonstrates our dedication to maintaining the highest standards in the industry.</p>
          </div>

          <div className="certification-showcase">
            <div className="certification-certificate-container certification-animate-on-load">
              <div className="certification-certificate-frame">
                <div className="certification-certificate-inner">
                  <div className={`certification-image-wrapper ${isImageLoaded ? 'loaded' : ''}`}>
                    {!isImageLoaded && (
                      <div className="certification-image-placeholder">
                        <div className="certification-loading-spinner"></div>
                        <p>Loading Certificate...</p>
                      </div>
                    )}
                    <img
                      src={Certificate}
                      alt="Orchid Infrastructure Developers Certification"
                      className="certification-image"
                      onLoad={handleImageLoad}
                      onClick={openModal}
                    />
                    <div className="certification-overlay">
                      <div className="certification-zoom-icon">
                        <span>🔍</span>
                        <p>Click to View Full Size</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="certification-frame-corners">
                  <div className="certification-corner certification-corner-tl"></div>
                  <div className="certification-corner certification-corner-tr"></div>
                  <div className="certification-corner certification-corner-bl"></div>
                  <div className="certification-corner certification-corner-br"></div>
                </div>
              </div>
              
              <div className="certification-details">
                <h3>Industry Excellence Award</h3>
                <p className="certification-description">
                  This certification recognizes our outstanding performance, quality standards, 
                  and commitment to excellence in infrastructure development and design services.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="certification-features-section">
        <div className="certification-container">
          <div className="certification-features-grid">
            <div className="certification-feature-card certification-animate-on-load">
              <div className="certification-feature-icon">
                <span>🎯</span>
              </div>
              <h3>Quality Assurance</h3>
              <p>Certified processes ensuring the highest quality standards in all our projects and deliverables.</p>
            </div>
            
            <div className="certification-feature-card certification-animate-on-load">
              <div className="certification-feature-icon">
                <span>🛡️</span>
              </div>
              <h3>Compliance Standards</h3>
              <p>Full adherence to industry regulations and safety standards for complete peace of mind.</p>
            </div>
            
            <div className="certification-feature-card certification-animate-on-load">
              <div className="certification-feature-icon">
                <span>⚡</span>
              </div>
              <h3>Innovation Excellence</h3>
              <p>Recognition for our innovative approaches and cutting-edge solutions in infrastructure development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="certification-cta-section">
        <div className="certification-container">
          <div className="certification-cta-content">
            <div className="certification-cta-badge">
              <span className="certification-badge-icon">🚀</span>
              Work With Certified Professionals
            </div>
            
            <h2>Ready to Experience Excellence?</h2>
            <p>
              Partner with a certified team that delivers outstanding results. 
              Let's bring your vision to life with our proven expertise.
            </p>
            
            <div className="certification-cta-buttons">
              <button className="certification-cta-primary">
                Start Your Project
                <span className="certification-btn-glow"></span>
              </button>
              <button className="certification-cta-secondary">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Full Size Certificate */}
      {isModalOpen && (
        <div className="certification-modal-overlay" onClick={closeModal}>
          <div className="certification-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="certification-modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="certification-modal-image-container">
              <img
                src="/path-to-your-certificate-image.jpg"
                alt="Orchid Infrastructure Developers Certification - Full Size"
                className="certification-modal-image"
              />
            </div>
            <div className="certification-modal-info">
              <h3>Professional Certification</h3>
              <p>Click outside or press the × button to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certification;
