import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../images/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <header className="header">
        <div className="container-fluid">
          <div className="header-content">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>
                <div className="logo-graphic">
                  <img src={Logo} alt="Orchid Logo" />
                </div>
              </Link>
            </div>
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} role="navigation" aria-label="Main navigation">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link 
                    to="/" 
                    className={location.pathname === '/' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/about" 
                    className={location.pathname === '/about' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/projects" 
                    className={location.pathname === '/projects' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/hospitality" 
                    className={location.pathname === '/hospitality' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Hospitality
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/mission-vision" 
                    className={location.pathname === '/mission-vision' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Mission & Vision
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/contact" 
                    className={location.pathname === '/contact' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/certification" 
                    className={location.pathname === '/certification' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Certification
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
