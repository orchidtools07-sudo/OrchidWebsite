import React from 'react';

const CTASection = ({ onContactClick }) => {
  return (
    <section className="cta-section-elegant">
      <div className="cta-container">
        <div className="cta-content-wrapper">
          <div className="cta-text-content">
            <h2 className="cta-title">Let's talk about how our staging and listing process can work for you.</h2>
            <p className="cta-subtitle">Ready to transform your real estate dreams into reality? Our expert team is here to guide you through every step of the process.</p>
          </div>
          <div className="cta-action">
            <button className="cta-btn-primary" onClick={onContactClick}>
              <span>Contact Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="cta-btn-secondary">
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>
        <div className="cta-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
