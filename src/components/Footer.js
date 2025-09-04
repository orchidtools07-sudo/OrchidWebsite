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
            <img src={LogoWhite}></img>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-icon facebook"></a>
            <a href="#" className="social-icon twitter"></a>
            <a href="#" className="social-icon instagram"></a>
            <a href="#" className="social-icon linkedin"></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
