import React from 'react';
import './Footer.css';
import LogoWhite from '../images/Logowhite.png';
const Footer = () => {
  return (
    <>
      {/* Sticky Call Button */}
      <div className="sticky-buttons">
        <a href="tel:+919876543210" className="sticky-btn call-btn">
          <span className="call-icon">📞</span>
        </a>
      </div>

      {/* Bottom Message Button */}
  

      <footer className="footer">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="footer-nav">
              <a href="/">HOME</a>
              <a href="/about">About us</a>
              <a href="/projects">Projects</a>
              <a href="/hospitality">Hospitality</a>
              <a href="/mission-vision">Mission & Vision</a>
              <a href="/contact">Contact Us</a>
              <a href="/certification">Certification</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>All Rights Reserved 2025</p>
          </div>
          
          <div className="footer-logo">
            <img src={LogoWhite} alt="Orchid Infrastructure Developers Logo"></img>
          </div>
          
          <div className="footer-social">
            <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook"></a>
            <a href="https://twitter.com" className="social-icon twitter" aria-label="Twitter"></a>
            <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram"></a>
            <a href="https://linkedin.com" className="social-icon linkedin" aria-label="LinkedIn"></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
