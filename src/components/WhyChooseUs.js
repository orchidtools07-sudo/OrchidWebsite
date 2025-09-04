import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-section-modern">
      <div className="container text-center">
        <h2 className="why-choose-title-modern">Why Choose Us?</h2>
        <div className="why-choose-grid-modern">
          <div className="why-choose-item-modern">
            <div className="icon-modern">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </div>
            <h3>Architectural Excellence</h3>
            <p>Unique Orchid-inspired designs with impactful aesthetics and high-quality finishes.</p>
          </div>
          <div className="why-choose-item-modern">
            <div className="icon-modern">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Prime Locations & Amenities</h3>
            <p>Carefully chosen Gurugram sites offering superior facilities, security, and green living.</p>
          </div>
          <div className="why-choose-item-modern">
            <div className="icon-modern">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Reliability & Financial Strength</h3>
            <p>Decades-long experience, proven delivery, and strong financial health with CRISIL ratings.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
