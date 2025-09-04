import React from 'react';
import AboutImage from '../images/About-Us-Image.png';

const AboutSection = () => {
  return (
    <section className="about-section-modern">
      <div className="container">
        <div className="about-modern-content">
          <div className="about-text-modern">
            <h2 className="about-title-modern">About Us</h2>
            <p className="about-description-modern">
              The Orchid is the most aristocratic of flowering plants, a 
              spectacular specimen of floral evolution. 800 known 
              genera, 25,000 species and 100,000 hybrids make up 
              the orchid family, each one as captivating and 
              charismatic as dancing butterflies.
            </p>
            <button className="learn-more-btn-modern">LEARN MORE</button>
          </div>
          <div className="about-images-modern">
            <div className="single-image-container">
              <img src={AboutImage} alt="About Orchid Infrastructure" className="single-about-image" />
              <div className="decorative-elements">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
