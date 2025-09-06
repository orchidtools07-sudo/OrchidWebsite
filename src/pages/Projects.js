import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import ScheduleCallPopup from '../components/ScheduleCallPopup';

// Import images same as ResidentialProjects and CommercialProjects
import OrchidIVYImage from '../images/Residential/orchid-ivy.jpg';
import OrchidMayfield from '../images/Residential/orchid-mayfeild.jpg';
import OrchidMetroPols from '../images/Residential/orchid-metropols.jpg';
import OrchidPetals from '../images/Residential/orchid-petals.jpg';
import OrchidWestgreen from '../images/Residential/orchid-westgreen.jpg';
import OrchidIsland from '../images/Residential/orchid-island.avif';
import OrchidCenter from '../images/Commercial/orchid-centre.jpg';
import OrchidBusinessPark from '../images/Commercial/orchid-businesspark.jpg';
import GlobalArcade from '../images/Commercial/Global-Arcade.jpg';
import GlobalBusinessPark from '../images/Commercial/global-businespark.jpg';
import ShoppingArcade from '../images/Commercial/shopping-arcade.jpg';

// Import logo images
import OrchidCentreLogo from '../images/Logo/orchid-centre-logo.png';
import OrchidBusinessParkLogo from '../images/Logo/orchid-business-park-logo.png';
import OrchidGlobalArcadeLogo from '../images/Logo/orchid-global-arcade-logo.png';
import OrchidGlobalBusinessParkLogo from '../images/Logo/orchid-global-business-park-logo.png';
import PetalsShoppingArcadeLogo from '../images/Logo/petals-shopping-arcade-logo.png';

const Projects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scheduleCallPopup, setScheduleCallPopup] = useState(false);

  // Project data using same images as ResidentialProjects and CommercialProjects
  const projectsData = {
    residential: [
      {
        id: 'orchid-petals',
        name: "Orchid Petals",
        type: "Residential",
        status: "Ready to Move",
        location: "Sohna Road, Gurugram",
        description: "2 & 3 BHK Premium Homes with elegant residential complex featuring beautiful architecture and premium amenities.",
        features: ["Modern Architecture", "Green Spaces", "Gym & Spa", "Children Play Area", "Power Backup", "24/7 Security"],
        image: OrchidPetals,
        gallery: [OrchidPetals],
        specifications: {
          "Total Area": "4.8 Acres",
          "Total Units": "150 Apartments",
          "Configuration": "2/3 BHK",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-westgreen',
        name: "Westend Greens",
        type: "Residential",
        location: "Sector 49, Gurugram",
        status: "Ready to Move",
        description: "3 & 4 BHK Luxury Apartments with premium residential project featuring eco-friendly design and sustainable living solutions.",
        features: ["Eco-Friendly Design", "Solar Power", "Rain Water Harvesting", "Organic Garden", "Yoga Deck", "Club House"],
        image: OrchidWestgreen,
        gallery: [OrchidWestgreen],
        specifications: {
          "Total Area": "6.1 Acres",
          "Total Units": "200 Apartments",
          "Configuration": "3/4 BHK",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-metropolis',
        name: "Orchid Metropolis",
        type: "Residential",
        location: "Golf Course Extension Road",
        status: "Ready to Move",
        description: "4 BHK Ultra-Luxury Residences with urban living redefined through contemporary architecture and world-class facilities.",
        features: ["Metro Connectivity", "Shopping Mall", "Food Court", "Spa", "Business Center", "Concierge Service"],
        image: OrchidMetroPols,
        gallery: [OrchidMetroPols],
        specifications: {
          "Total Area": "12 Acres",
          "Total Units": "500 Apartments",
          "Configuration": "4 BHK",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-mayfield',
        name: "Mayfield Gardens",
        type: "Residential",
        location: "Dwarka Expressway, Gurugram",
        status: "Ready to Move",
        description: "2 & 3 BHK Premium Apartments offering affordable luxury homes with excellent connectivity and modern lifestyle amenities.",
        features: ["Affordable Housing", "Good Connectivity", "Modern Amenities", "Security", "Maintenance", "Parking"],
        image: OrchidMayfield,
        gallery: [OrchidMayfield],
        specifications: {
          "Total Area": "6 Acres",
          "Total Units": "250 Apartments",
          "Configuration": "2/3 BHK",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-island',
        name: "Orchid Island",
        type: "Residential",
        location: "Sector 51, Gurugram",
        status: "Ready to Move",
        description: "3 & 4 BHK Luxury Residences with exclusive island-themed residential community featuring water features and luxury amenities.",
        features: ["Water Features", "Island Theme", "Luxury Amenities", "Exclusive Community", "Premium Location", "Swimming Pool"],
        image: OrchidIsland,
        gallery: [OrchidIsland],
        specifications: {
          "Total Area": "4 Acres",
          "Total Units": "150 Apartments",
          "Configuration": "3/4 BHK",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-ivy',
        name: "Orchid IVY",
        type: "Residential",
        location: "Gurugram, Haryana",
        status: "Latest Launch",
        description: "4 BHK Premium Apartments - Our flagship residential project featuring ultra-modern design, premium amenities, and strategic location in the heart of Gurgaon.",
        features: ["Smart Home Technology", "Infinity Pool", "Sky Lounge", "Concierge Service", "Valet Parking", "Private Elevator"],
        image: OrchidIVYImage,
        gallery: [OrchidIVYImage],
        specifications: {
          "Total Area": "15 Acres",
          "Total Units": "400 Apartments",
          "Configuration": "4 BHK Premium",
          "Possession": "Dec 2025"
        }
      },
    ],
    commercial: [
      {
        id: 'orchid-centre',
        name: "Orchid Centre",
        type: "Commercial",
        location: "Golf Course, Gurugram",
        status: "Ready to Move",
        description: "Premium commercial center with retail and office spaces in prime location offering state-of-the-art business facilities.",
        features: ["Modern Office Spaces", "Conference Rooms", "High-Speed Internet", "Parking", "Food Court", "Prime Location"],
        image: OrchidCenter,
        gallery: [OrchidCenter],
        specifications: {
          "Total Area": "10 Acres",
          "Total Units": "150 Units",
          "Configuration": "Retail & Office",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'orchid-business-park',
        name: "Orchid Business Park",
        type: "Commercial",
        location: "Sector 48, Gurugram",
        status: "Ready to Move",
        description: "State-of-the-art business park with modern office spaces and corporate facilities designed for professional excellence.",
        features: ["Corporate Facilities", "Business Lounges", "Meeting Rooms", "Ample Parking", "Security", "Maintenance"],
        image: OrchidBusinessPark,
        gallery: [OrchidBusinessPark],
        specifications: {
          "Total Area": "20 Acres",
          "Total Units": "100 Offices",
          "Configuration": "Various Sizes",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'global-business-park',
        name: "Global Business Park",
        type: "Commercial",
        location: "Sector 26, Gurugram",
        status: "Ready to Move",
        description: "International standard business park catering to global corporations and enterprises with world-class infrastructure.",
        features: ["International Standards", "Global Connectivity", "Premium Amenities", "Tech Infrastructure", "Business Center", "Conference Facilities"],
        image: GlobalBusinessPark,
        gallery: [GlobalBusinessPark],
        specifications: {
          "Total Area": "25 Acres",
          "Total Units": "200 Offices",
          "Configuration": "Various Sizes",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'global-arcade',
        name: "Global Arcade",
        type: "Commercial",
        location: "Sector 26, Gurugram",
        status: "Ready to Move",
        description: "Modern commercial arcade with diverse retail and entertainment options providing vibrant business opportunities.",
        features: ["Entertainment Zone", "Retail Shops", "Food Court", "Cinema", "Gaming Zone", "Event Spaces"],
        image: GlobalArcade,
        gallery: [GlobalArcade],
        specifications: {
          "Total Area": "8 Acres",
          "Total Units": "120 Units",
          "Configuration": "Retail & Entertainment",
          "Possession": "Ready to Move"
        }
      },
      {
        id: 'shopping-arcade',
        name: "Shopping Arcade",
        type: "Commercial",
        location: "Sohna-Road, Gurgaon",
        status: "Ready to Move",
        description: "Vibrant shopping destination with premium retail brands and dining options creating the perfect commercial hub.",
        features: ["Premium Brands", "Dining Options", "Entertainment", "Parking", "Security", "Customer Amenities"],
        image: ShoppingArcade,
        gallery: [ShoppingArcade],
        specifications: {
          "Total Area": "6 Acres",
          "Total Units": "80 Shops",
          "Configuration": "Retail Shops",
          "Possession": "Ready to Move"
        }
      }
    ]
  };

  const allProjects = [...projectsData.residential, ...projectsData.commercial];

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return allProjects;
    if (activeFilter === 'residential') return projectsData.residential;
    if (activeFilter === 'commercial') return projectsData.commercial;
    return allProjects;
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleScheduleVisit = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
    navigate('/contact');
  };

  const closeScheduleCallPopup = () => {
    setScheduleCallPopup(false);
  };

  const featuredProject = projectsData.residential.find(p => p.id === 'orchid-ivy');

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-overlay">
          <div className="projects-hero-gradient"></div>
          <div className="projects-hero-pattern"></div>
        </div>
        <div className="container">
          <div className="projects-hero-content">
            <div className="projects-hero-badge">
              <span className="projects-badge-icon">🏗️</span>
              <span>Our Portfolio</span>
            </div>
            <h1 className="projects-hero-title">
              Our <span className="projects-gradient-text">Projects</span>
            </h1>
            <p className="projects-hero-subtitle">
              Discover our portfolio of luxury residential and commercial developments that redefine modern living and business excellence
            </p>
       
          </div>
        </div>
      </section>

      {/* Featured Project - Orchid Ivy */}
      <section className="projects-featured-project">
        <div className="container">
          <div className="projects-section-header">
            <span className="projects-section-badge">Latest Project</span>
            <h2 className="projects-section-title">Orchid Ivy</h2>
            <p className="projects-section-subtitle">Our flagship residential development setting new standards in luxury living</p>
          </div>
          
          <div className="projects-featured-content">
            <div className="projects-featured-image">
              <img src={featuredProject.image} alt={featuredProject.name} />
              <div className="projects-featured-badge">New Launch</div>
            </div>
            
            <div className="projects-featured-details">
              <div className="projects-featured-info">
                <h3>{featuredProject.name}</h3>
                <p className="projects-featured-location">{featuredProject.location}</p>
                <p className="projects-featured-description">{featuredProject.description}</p>
                
                <div className="projects-featured-highlights">
                  <h4>Key Highlights</h4>
                  <div className="projects-highlights-grid">
                    {featuredProject.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="projects-highlight-item">
                        <i className="projects-highlight-icon">✓</i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="projects-featured-specs">
                  <div className="projects-spec-item">
                    <span className="projects-spec-label">Total Area</span>
                    <span className="projects-spec-value">{featuredProject.specifications['Total Area']}</span>
                  </div>
                  <div className="projects-spec-item">
                    <span className="projects-spec-label">Units</span>
                    <span className="projects-spec-value">{featuredProject.specifications['Total Units']}</span>
                  </div>
                </div>
                
                <button 
                  className="projects-featured-btn"
                  onClick={() => window.open('https://orchidivyfloors.com/', '_blank')}
                >
                  Explore Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="projects-logos-section">
        <div className="container">
          <div className="projects-section-header">
            <span className="projects-section-badge">Our Brands</span>
            <h2 className="projects-section-title">Our <span className="projects-gradient-text">Portfolio</span></h2>
            <p className="projects-section-subtitle">Discover our diverse range of premium developments across different segments</p>
          </div>
          
          <div className="projects-logos-container">
            <div className="projects-logos-track">
              <div className="projects-logo-item">
                <div className="projects-logo-card">
                  <div className="projects-logo-image">
                    <img src={OrchidCentreLogo} alt="Orchid Centre Logo" />
                  </div>
               
                </div>
              </div>
              
              <div className="projects-logo-item">
                <div className="projects-logo-card">
                  <div className="projects-logo-image">
                    <img src={OrchidBusinessParkLogo} alt="Orchid Business Park Logo" />
                  </div>
                
                </div>
              </div>
              
              <div className="projects-logo-item">
                <div className="projects-logo-card">
                  <div className="projects-logo-image">
                    <img src={OrchidGlobalArcadeLogo} alt="Orchid Global Arcade Logo" />
                  </div>
               
                </div>
              </div>
              
              <div className="projects-logo-item">
                <div className="projects-logo-card">
                  <div className="projects-logo-image">
                    <img src={OrchidGlobalBusinessParkLogo} alt="Orchid Global Business Park Logo" />
                  </div>
                
                </div>
              </div>
              
              <div className="projects-logo-item">
                <div className="projects-logo-card">
                  <div className="projects-logo-image">
                    <img src={PetalsShoppingArcadeLogo} alt="Petals Shopping Arcade Logo" />
                  </div>
                
                </div>
              </div>
            </div>
            
            <div className="projects-logos-gradient-left"></div>
            <div className="projects-logos-gradient-right"></div>
          </div>
        </div>
      </section>

      {/* Projects Filter & Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-section-header">
            <h2 className="projects-section-title">All Projects</h2>
            <p className="projects-section-subtitle">Discover our portfolio of exceptional developments</p>
          </div>

          {/* Filter Buttons */}
          <div className="projects-filter-buttons">
            <button 
              className={`projects-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`projects-filter-btn ${activeFilter === 'residential' ? 'active' : ''}`}
              onClick={() => setActiveFilter('residential')}
            >
              Residential
            </button>
            <button 
              className={`projects-filter-btn ${activeFilter === 'commercial' ? 'active' : ''}`}
              onClick={() => setActiveFilter('commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {getFilteredProjects().map((project) => (
              <div key={project.id} className="projects-card" onClick={() => openModal(project)}>
                <img src={project.image} alt={project.name} className="projects-card-image" />
                <div className="projects-card-content">
                  <div className="projects-card-header">
                    <div className="projects-card-type">{project.type}</div>
                    <h3 className="projects-card-title">{project.name}</h3>
                    <div className="projects-card-location">{project.location}</div>
                  </div>
                  <div className="projects-card-footer">
                    <div className="projects-card-status">{project.status}</div>
                    <button className="projects-view-details">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="projects-modal" onClick={closeModal}>
          <div className="projects-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="projects-modal-close" onClick={closeModal}>×</button>
            
            <div className="projects-modal-header">
              <h2>{selectedProject.name}</h2>
              <div className="projects-modal-badges">
                <span className="projects-badge-type">{selectedProject.type}</span>
                <span className="projects-badge-status">{selectedProject.status}</span>
              </div>
            </div>

            <div className="projects-modal-body">
              <div className="projects-modal-image-section">
                {selectedProject.gallery ? (
                  <div className="projects-image-gallery">
                    <div className="projects-main-image">
                      <img src={selectedProject.gallery[0]} alt={selectedProject.name} />
                    </div>
                    <div className="projects-thumbnail-grid">
                      {selectedProject.gallery.slice(1, 5).map((img, index) => (
                        <img key={index} src={img} alt={`${selectedProject.name} ${index + 2}`} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.name} className="projects-single-image" />
                )}
                
                {/* Map Section */}
                <div className="projects-modal-map">
                  <h4>Location</h4>
                  <div className="projects-map-container">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(selectedProject.location)}`}
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${selectedProject.name}`}
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="projects-modal-details">
                <div className="projects-detail-section">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.description}</p>
                  <p><strong>Location:</strong> {selectedProject.location}</p>
                </div>

                <div className="projects-detail-section">
                  <h3>Key Features</h3>
                  <div className="projects-features-list">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="projects-feature-item">
                        <i className="projects-feature-icon">✓</i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="projects-detail-section">
                  <h3>Specifications</h3>
                  <div className="projects-specifications-grid">
                    {Object.entries(selectedProject.specifications).map(([key, value]) => (
                      <div key={key} className="projects-spec-row">
                        <span className="projects-spec-key">{key}:</span>
                        <span className="projects-spec-value-modal">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="projects-modal-actions">
                  <button className="projects-btn-secondary" onClick={handleScheduleVisit}>Schedule Visit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {scheduleCallPopup && (
        <ScheduleCallPopup onClose={closeScheduleCallPopup} />
      )}
    </div>
  );
};

export default Projects;
