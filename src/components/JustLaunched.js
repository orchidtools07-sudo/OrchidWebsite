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
      alt: 'Orchid IVY - Luxury Residential Complex',
      caption: 'Premium Architecture & Design'
    },
    {
      id: 2,
      src: ivyslide2,
      alt: 'Orchid IVY - Construction Excellence',
      caption: 'World-Class Construction Quality'
    },
    {
      id: 3,
      src: ivyslide3,
      alt: 'Orchid IVY - Spacious Interiors',
      caption: 'Luxurious Living Spaces'
    },
    {
      id: 4,
      src: ivyslide4,
      alt: 'Orchid IVY - Premium Amenities',
      caption: 'Resort-Style Amenities'
    },
    {
      id: 5,
      src: ivyslide5,
      alt: 'Orchid IVY - Green Landscapes',
      caption: 'Lush Green Environment'
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
          {/* Left Side - Enhanced Image Slider */}
          <div className="slider-side">
            <div className="slider-header">
            
              <h2 className="project-title">Orchid IVY</h2>
              <p className="project-subtitle">Premium Residential Living in the Heart of Gurugram</p>
            </div>
            
            <div className="simple-image-slider">
              <div className="simple-slider-container">
                <img 
                  src={projectImages[currentIndex].src} 
                  alt={projectImages[currentIndex].alt}
                  className="slider-image"
                  loading="lazy"
                />
                
                {/* Image Caption */}
                <div className="image-caption">
                  <span className="caption-text">{projectImages[currentIndex].caption}</span>
                </div>
                
                {/* Navigation Arrows */}
            
              </div>
              
              {/* Slider Dots */}
             
            </div>

            {/* Key Features moved to slider side */}
            <div className="project-highlights">
              <h4>Key Features</h4>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <span className="highlight-icon">🏠</span>
                  <span className="highlight-text">3 & 4 BHK Premium Apartments</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌟</span>
                  <span className="highlight-text">Luxury Amenities & Facilities</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🚗</span>
                  <span className="highlight-text">Dedicated Parking Space</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌳</span>
                  <span className="highlight-text">Landscaped Gardens</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏊</span>
                  <span className="highlight-text">Swimming Pool & Gym</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔒</span>
                  <span className="highlight-text">24/7 Security & CCTV</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div className="content-side">
            {/* Project Status with Progress */}
            <div className="project-status">
              <span className="status-indicator"></span>
              <div className="status-content">
                <span className="status-text">Construction in Full Swing</span>
                <span className="status-detail">Expected Completion: Q4 2025</span>
              </div>
            </div>

            {/* Attractive Project Description */}
            <div className="project-description">
              <p>
                Experience the epitome of luxury living at <strong>Orchid IVY</strong> - where modern architecture meets 
                timeless elegance. Nestled in the prime location of Sector 51, Gurugram, this exclusive residential 
                development offers unparalleled comfort and sophistication for discerning homeowners.
              </p>
            </div>
       
            {/* Enhanced Location */}
            <div className="project-location">
              <div className="location-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="location-content">
                <span className="location-text">Sector 51, Gurugram, Haryana</span>
                <span className="location-detail">Prime Location • Excellent Connectivity</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="price-section">
              <div className="price-content">
                <span className="price-label">Starting From</span>
                <span className="price-value">₹3.75 Cr*</span>
                <span className="price-note">*All inclusive | Limited Time Offer</span>
              </div>
            </div>
            
            {/* Enhanced CTA Section */}
            <div className="cta-section">
              <button 
                className="book-now-btn"
                onClick={handleBookNow}
              >
                <span>Book Site Visit</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </button>
              <div className="cta-benefits">
                <span className="benefit-item">✓ Free Site Visit</span>
                <span className="benefit-item">✓ Expert Consultation</span>
                <span className="benefit-item">✓ Flexible Payment Plans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustLaunched;
