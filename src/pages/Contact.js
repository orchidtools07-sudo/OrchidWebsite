import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import ScheduleCallPopup from '../components/ScheduleCallPopup';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [scheduleCallPopup, setScheduleCallPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations on component mount
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.contact-animate-on-load');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 200);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  const handleScheduleCall = () => {
    setScheduleCallPopup(true);
  };

  const handleCloseScheduleCallPopup = () => {
    setScheduleCallPopup(false);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background">
          <div className="contact-animated-shapes">
            <div className="contact-shape contact-triangle-1"></div>
            <div className="contact-shape contact-circle-1"></div>
            <div className="contact-shape contact-square-1"></div>
            <div className="contact-shape contact-triangle-2"></div>
            <div className="contact-shape contact-circle-2"></div>
            <div className="contact-shape contact-hexagon-1"></div>
          </div>
          <div className="contact-wave-container">
            <svg className="contact-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="contact-wave-shape"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="contact-wave-shape"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="contact-wave-shape"></path>
            </svg>
          </div>
          <div className="contact-gradient-mesh"></div>
        </div>
        
        <div className="contact-container">
          <div className="contact-hero-content">
            <div className="contact-hero-badge contact-animate-on-load">
              <span className="contact-badge-icon">�</span>
              Let's Connect
            </div>
            
            <h1 className="contact-hero-title contact-animate-on-load">
              Get In <span className="contact-title-highlight">Touch</span>
            </h1>
            
            <p className="contact-hero-subtitle contact-animate-on-load">
              Ready to transform your space? Let's discuss your project and bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <div className="contact-icon-circle">
                  <span>📍</span>
                </div>
              </div>
              <h3>Visit Our Office</h3>
              <p>
              Level II, Global Arcade,<br />
Mehrauli-Gurgaon Road,<br />
Gurgaon - 122 002.<br />

              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <div className="contact-icon-circle">
                  <span>📞</span>
                </div>
              </div>
              <h3>Call Us</h3>
              <p>
                <a href="tel:+1234567890">+91-124-4590000</a><br/>
                <a href="tel:+1234567891">+91 98765 43210</a>
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <div className="contact-icon-circle">
                  <span>✉️</span>
                </div>
              </div>
              <h3>Email Us</h3>
              <p>
                <a href="mailto:info@oidpl.com">info@oidpl.com</a><br/>
                <a href="mailto:marketing@oidpl.com">marketing@oidpl.com</a>
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <div className="contact-icon-circle">
                  <span>🕒</span>
                </div>
              </div>
              <h3>Business Hours</h3>
              <p>
                Mon - Fri: 10:00 AM - 7:00 PM<br/>
                Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-content-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="contact-form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="residential">Residential Project</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="hospitality">Hospitality Project</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="contact-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="contact-btn-arrow">→</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="contact-success-message">
                    <span className="contact-success-icon">✓</span>
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Map Container */}
            <div className="contact-map-container">
              <div className="contact-map-header">
                <h2>Find Us Here</h2>
                <p>Visit our office for in-person consultations and project discussions.</p>
              </div>

              <div className="contact-map-wrapper">
                {/* Google Maps embed for Orchid Infrastructure Developers */}
                <iframe
                  className="contact-map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1370.8568884000588!2d77.1037506!3d28.481071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ed12e02c659%3A0xb840140ea04a9471!2sOrchid%20Infrastructure%20Developers%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1635959552036!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orchid Infrastructure Developers Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-container">
          <div className="contact-cta-content">
            <div className="contact-cta-badge">
              <span className="contact-badge-icon">🏆</span>
              Ready to Start?
            </div>
            
            <h2>Let's Create Something Amazing Together</h2>
            <p>
              From concept to completion, we're here to make your vision a reality. 
              Contact us today for a free consultation.
            </p>
            
            <div className="contact-cta-buttons">
              <button className="contact-cta-primary" onClick={handleScheduleCall}>
                Schedule Consultation
                <span className="contact-btn-glow"></span>
              </button>
              <button className="contact-cta-secondary" onClick={() => navigate('/projects')}>
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleCallPopup 
        isOpen={scheduleCallPopup} 
        onClose={handleCloseScheduleCallPopup} 
      />
    </div>
  );
};

export default Contact;
