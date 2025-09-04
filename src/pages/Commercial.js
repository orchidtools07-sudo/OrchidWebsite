import React from 'react';
import { Link } from 'react-router-dom';
import './Commercial.css';

const Commercial = () => {
  const commercialProjects = [
    {
      id: 1,
      name: 'Orchid Centre',
      location: 'Golf Course Road, Gurgaon',
      description: 'Sunlight and open spaces. Poetry in glass and steel Coming up on the Golf Course Road, Gurgaon is another Orchid landmark: the new state-of-the-art commercial complex. Orchid Centre, spread over 2.54 acres, offers retail space on the ground floor and office space on the higher floors totaling 270,000 sq.ft.',
      features: ['Retail Space', 'Office Space', '270,000 sq.ft', '2.54 Acres', 'Golf Course Road', 'Ample Parking'],
      image: 'orchid-centre',
      type: 'Mixed Use'
    },
    {
      id: 2,
      name: 'Orchid Business Park',
      location: 'Sohna Road, Gurugram',
      description: 'Our commercial hub of over 3.56 acres situated at the Sohna Road, Gurugram. Well equipped with central air-conditioning, 100% power backup and ample deck/3-tier basement parking. Designated by the well known architect Mohit Gujral to meet the growing needs of modern businesses.',
      features: ['Commercial Hub', '3.56 Acres', 'Central AC', '100% Power Backup', '3-tier Basement Parking', 'Modern Design'],
      image: 'orchid-business-park',
      type: 'Business Park'
    },
    {
      id: 3,
      name: 'Global Arcade',
      location: 'Mehrauli-Gurgaon Road',
      description: 'Orchid Global Arcade is a masterpiece in terms of a commercial complex! This 160,000sqft complex has been designed by the illustrious Mohit Gujral and offers 24-hour business services, fully equipped conference and boardrooms, and houses the 4-star ITC Fortune Hotel.',
      features: ['160,000 sq.ft', 'ITC Fortune Hotel', 'Conference Rooms', 'Boardrooms', '24-hour Services', 'Premium Location'],
      image: 'global-arcade',
      type: 'Commercial Complex'
    },
    {
      id: 4,
      name: 'Global Business Park',
      location: 'M.G. Road, Gurugram',
      description: 'An address exuding finesse and élan and matches the fine taste and keen eye that our customers possess. With so many features that exhibit selective style, grandeur and unmatched functionality it is only fitting that it becomes the preferred choice for discerning businesses.',
      features: ['Business Park', 'Premium Location', 'Modern Design', 'Selective Style', 'Grandeur', 'Unmatched Functionality'],
      image: 'global-business-park',
      type: 'Business Park'
    },
    {
      id: 5,
      name: 'Orchid Petals Shopping Arcade',
      location: 'Adjacent to Orchid Petals, Sohna Road',
      description: 'Situated adjacent to the residential complex of Orchid Petals, stands our Shopping Arcade with 41 ready to move in shops. The Arcade affords its visitors comfort and a luxuriant shopping experience starting with their arrival.',
      features: ['41 Shops', 'Ready to Move', 'Shopping Arcade', 'Adjacent to Residential', 'Luxuriant Experience', 'Comfort'],
      image: 'orchid-petals-shopping',
      type: 'Shopping Arcade'
    }
  ];

  return (
    <div className="commercial">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Commercial Projects</h1>
          <p>State-of-the-art commercial spaces designed for modern business needs</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Commercial Portfolio</h2>
            <p>From office spaces to retail complexes, we create commercial environments that drive business success</p>
          </div>
          
          <div className="projects-grid">
            {commercialProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.image}
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span className="project-type">{project.type}</span>
                  </div>
                  <p className="project-location">{project.location}</p>
                  <p>{project.description}</p>
                  <div className="project-features">
                    {project.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <Link to={`/commercial/${project.id}`} className="btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Advantages Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Orchid Commercial Spaces?</h2>
            <p>We understand the unique requirements of modern businesses</p>
          </div>
          
          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="advantage-icon">🏢</div>
              <h3>Prime Business Locations</h3>
              <p>Strategically located in business districts with excellent connectivity and accessibility.</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">⚡</div>
              <h3>Modern Infrastructure</h3>
              <p>State-of-the-art facilities including power backup, HVAC systems, and smart building technology.</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">🚗</div>
              <h3>Ample Parking</h3>
              <p>Multi-level parking facilities to accommodate the growing number of vehicles.</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">🔒</div>
              <h3>24/7 Security</h3>
              <p>Round-the-clock security systems ensuring the safety of your business and employees.</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">🌿</div>
              <h3>Green Building Standards</h3>
              <p>Environmentally conscious design with energy-efficient systems and sustainable practices.</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">📈</div>
              <h3>High ROI</h3>
              <p>Excellent investment opportunities with high rental yields and capital appreciation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="section">
        <div className="container">
          <div className="investment-content">
            <div className="investment-text">
              <h2>Investment Opportunities</h2>
              <p>Our commercial properties offer excellent investment opportunities for both individual investors and institutional buyers. With prime locations, modern amenities, and strong rental demand, these properties provide:</p>
              <ul>
                <li>High rental yields</li>
                <li>Strong capital appreciation</li>
                <li>Stable long-term returns</li>
                <li>Diversified portfolio options</li>
                <li>Professional property management</li>
              </ul>
              <Link to="/contact" className="btn">Contact for Investment</Link>
            </div>
            <div className="investment-image">
              <div className="placeholder-image">Investment Opportunities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commercial;
