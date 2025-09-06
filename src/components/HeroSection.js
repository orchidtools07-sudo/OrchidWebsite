import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroVideo from '../images/hero-video.mp4';
import './HeroSection.css';

const HeroSection = ({ onContactClick }) => {
  const navigate = useNavigate();
  const [currentMediaUrl, setCurrentMediaUrl] = useState('');
  const [isVideo, setIsVideo] = useState(true);
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    // Load saved media info on component mount
    loadSavedMedia();
    
    // Listen for video updates from admin panel
    const handleVideoUpdate = (event) => {
      const { videoUrl, mediaType: type } = event.detail;
      setCurrentMediaUrl(videoUrl);
      setIsVideo(true);
      setMediaType(type || '');
    };

    // Listen for image updates from admin panel
    const handleImageUpdate = (event) => {
      const { imageUrl, mediaType: type } = event.detail;
      setCurrentMediaUrl(imageUrl);
      setIsVideo(false);
      setMediaType(type || '');
    };

    window.addEventListener('heroVideoUpdated', handleVideoUpdate);
    window.addEventListener('heroImageUpdated', handleImageUpdate);
    
    return () => {
      window.removeEventListener('heroVideoUpdated', handleVideoUpdate);
      window.removeEventListener('heroImageUpdated', handleImageUpdate);
    };
  }, []);

  const loadSavedMedia = () => {
    try {
      // Check for saved video
      const savedVideoInfo = localStorage.getItem('heroVideoInfo');
      const savedImageInfo = localStorage.getItem('heroImageInfo');
      
      if (savedVideoInfo) {
        const videoInfo = JSON.parse(savedVideoInfo);
        setIsVideo(true);
        setMediaType(videoInfo.type);
      } else if (savedImageInfo) {
        const imageInfo = JSON.parse(savedImageInfo);
        setIsVideo(false);
        setMediaType(imageInfo.type);
      }
    } catch (error) {
      console.error('Error loading saved media:', error);
    }
  };

  const handleExploreProjects = () => {
    navigate('/projects');
  };

  // Determine what media to show
  const mediaSource = currentMediaUrl || HeroVideo;
  const showVideo = currentMediaUrl ? isVideo : true; // Default to video if no custom media

  return (
    <section className="hero-section" style={{ 
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      display: 'block'
    }}>
      <div className="hero-media-container" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1
      }}>
        {showVideo ? (
          <video 
            key={mediaSource} // Force re-render when video changes
            className="hero-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              transform: 'translateX(-50%) translateY(-50%)',
              objectFit: 'cover'
            }}
          >
            <source src={mediaSource} type={mediaType || "video/mp4"} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            key={mediaSource} // Force re-render when image changes
            className="hero-image" 
            src={mediaSource} 
            alt="Hero Background"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              transform: 'translateX(-50%) translateY(-50%)',
              objectFit: 'cover'
            }}
          />
        )}
        <div className="hero-overlay" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 2
        }}></div>
      </div>
      
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
            <button 
              className="btn-primary" 
              onClick={handleExploreProjects}
              style={{
                padding: '15px 30px',
                backgroundColor: '#1e3f5f',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Explore Projects
            </button>
            <button 
              className="btn-secondary" 
              onClick={onContactClick}
              style={{
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
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
