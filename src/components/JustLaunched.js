import React, { useState, useRef, useEffect, useCallback } from 'react';
import ivyslide1 from '../images/orchidivy/ivy-1.jpg';
import ivyslide2 from '../images/orchidivy/ivy-2.jpg';
import ivyslide3 from '../images/orchidivy/ivy-3.jpg';
import ivyslide4 from '../images/orchidivy/ivy-4.jpg';
import ivyslide5 from '../images/orchidivy/ivy-5.jpg';

const JustLaunched = ({ onBookNowClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef();

  // Project images for the slider
  const projectImages = [
    {
      id: 1,
      src: ivyslide1,
      alt: 'Orchid IVY - Main Building View',
      caption: 'Premium Facade Design'
    },
    {
      id: 2,
      src: ivyslide2,
      alt: 'Orchid IVY - Construction Progress',
      caption: 'Construction in Full Swing'
    },
    {
      id: 3,
      src: ivyslide3,
      alt: 'Orchid IVY - Interior Layout',
      caption: 'Luxury Interior Spaces'
    },
    {
      id: 4,
      src: ivyslide4,
      alt: 'Orchid IVY - Amenities View',
      caption: 'World-Class Amenities'
    },
    {
      id: 5,
      src: ivyslide5,
      alt: 'Orchid IVY - Landscape Design',
      caption: 'Beautiful Landscaping'
    }
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % projectImages.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, projectImages.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev === 0 ? projectImages.length - 1 : prev - 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, projectImages.length]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleBookNow = () => {
    if (onBookNowClick) {
      onBookNowClick();
    }
  };

  return (
    <section className="just-launched-section" ref={sliderRef}>
      <div className="container">
        <div className="just-launched-content">
          {/* Left Side - Simple Image Slider with Badge and Title */}
          <div className="slider-side">
            {/* Badge and Title beside slider */}
            <div className="slider-header">
              <div className="launch-badge">
                <span className="badge-icon">🚀</span>
                <span className="badge-text">Just Launched</span>
              </div>
              <h2 className="project-title">Orchid IVY</h2>
            </div>
            
            <div className="simple-image-slider">
              <div className="simple-slider-container">
                <img 
                  src={projectImages[currentIndex].src} 
                  alt={projectImages[currentIndex].alt}
                  className="slider-image"
                  loading="lazy"
                />
                
                {/* Navigation Arrows */}
                <button className="simple-nav prev" onClick={prevSlide}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18L9 12L15 6"/>
                  </svg>
                </button>
                <button className="simple-nav next" onClick={nextSlide}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18L15 12L9 6"/>
                  </svg>
                </button>
              </div>
              
              {/* Simple Dots */}
             
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="content-side">
            <div className="project-status">
              <span className="status-indicator"></span>
              <span className="status-text">Work in Full Swing - Under Construction</span>
            </div>
            
            <p className="project-description">
              Experience luxury living at its finest with Orchid IVY, our latest premium residential development. 
              Featuring state-of-the-art architecture, world-class amenities, and strategic connectivity, 
              this project represents the pinnacle of modern urban living. With construction progressing rapidly, 
              secure your dream home in this exclusive community.
            </p>
            
            <div className="project-location">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Sector 51, Gurugram, Haryana</span>
            </div>
            
            <div className="project-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🏠</span>
                <span>3&4 BHK Low Rise Floor</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🌟</span>
                <span>Luxury Amenities</span>
              </div>
           
            </div>
            
            <div className="cta-section">
              <button 
                className="book-now-btn"
                onClick={handleBookNow}
              >
                <span>Book Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </button>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustLaunched;
