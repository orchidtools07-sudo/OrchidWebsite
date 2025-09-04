import React from 'react';
import HeroVideo from '../images/hero-video.mp4';

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ 
      width: '100%', 
      height: '52rem',
      position: 'relative', 
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      display: 'block'
    }}>
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="hero-video"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: 1,
          transform: 'translateX(-50%) translateY(-50%)',
          objectFit: 'cover'
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 2
      }}></div>
      <div className="hero-content" style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        textAlign: 'center', 
        color: 'white',
        zIndex: 3,
        width: '90%',
        maxWidth: '1000px',
        padding: '0 20px'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            lineHeight: '1.2',
            textAlign: 'center'
          }}>
            Building Dreams, Creating Legacies
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', 
            marginBottom: '2.5rem',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
            lineHeight: '1.5',
            maxWidth: '800px',
            margin: '0 auto 2.5rem auto',
            textAlign: 'center'
          }}>
            Orchid Infrastructure Developers - Your trusted partner in creating exceptional residential and commercial spaces across Delhi NCR
          </p>
          <div className="hero-buttons" style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <button className="btn-primary" style={{
              padding: '15px 30px',
              backgroundColor: '#1e3f5f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}>
              Explore Projects
            </button>
            <button className="btn-secondary" style={{
              padding: '15px 30px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
