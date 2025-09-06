import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './ScheduleCallPopup.css';

// Initialize EmailJS
emailjs.init('0JaufsfxPtIz0baYD'); // Replace with your actual public key from EmailJS dashboard

const ScheduleCallPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form when popup closes
      setTimeout(() => {
        setFormData({ name: '', phone: '' });
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 300);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    console.log('Attempting to send email with data:', {
      name: formData.name,
      phone: formData.phone,
      serviceId: 'service_jsimrnn',
      templateId: 'template_7tuttjj'
    });
    
    try {
      const response = await emailjs.send(
        'service_jsimrnn',
        'template_7tuttjj',
        {
          name: formData.name,
          phone: formData.phone,
          current_date: new Date().toLocaleString(),
          to_email: 'orchidtools07@gmail.com',
          from_name: 'Website Contact Form',
          reply_to: 'orchidtools07@gmail.com'
        }
      );
      
      console.log('EmailJS Response:', response);
      
      if (response.status === 200) {
        console.log('Email sent successfully!');
        
        // Save lead to localStorage for admin panel
        const leadData = {
          name: formData.name,
          phone: formData.phone,
          date: new Date().toISOString(),
          source: 'Schedule Call Popup'
        };
        
        const existingLeads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('websiteLeads', JSON.stringify(existingLeads));
        
        setIsSubmitting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.error('EmailJS returned non-200 status:', response.status);
        setError('Failed to send message. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Email Error Details:', error);
      console.error('Error message:', error.message);
      console.error('Error text:', error.text);
      setError(`Failed to send message: ${error.text || error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="schedule-popup-overlay" onClick={handleOverlayClick}>
      <div className="schedule-popup-container">
        <div className="schedule-popup-content">
          {/* Close Button */}
          <button className="schedule-popup-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Header */}
          <div className="schedule-popup-header">
            <div className="schedule-popup-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <h2 className="schedule-popup-title">Schedule a Call</h2>
            <p className="schedule-popup-subtitle">
              Let's discuss your dream property. Our experts will call you back within 24 hours.
            </p>
          </div>

          {/* Form */}
          {!isSuccess ? (
            <form className="schedule-popup-form" onSubmit={handleSubmit}>
              <div className="schedule-form-group">
                <label className="schedule-form-label">Full Name</label>
                <div className="schedule-input-wrapper">
                  <svg className="schedule-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="schedule-form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="schedule-form-group">
                <label className="schedule-form-label">Phone Number</label>
                <div className="schedule-input-wrapper">
                  <svg className="schedule-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="schedule-form-input"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="schedule-submit-btn"
                disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="schedule-spinner"></div>
                    <span>Scheduling...</span>
                  </>
                ) : (
                  <>
                    <span>Schedule My Call</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          ) : (
            <div className="schedule-success-message">
              <div className="schedule-success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <h3>Call Scheduled Successfully!</h3>
              <p>Thank you {formData.name}! Our team will contact you on {formData.phone} within 24 hours.</p>
            </div>
          )}

          {/* Features */}
          <div className="schedule-popup-features">
            <div className="schedule-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <span>Free Consultation</span>
            </div>
            <div className="schedule-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <span>Expert Guidance</span>
            </div>
            <div className="schedule-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <span>24 Hour Response</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="schedule-popup-decoration">
          <div className="schedule-decoration-circle schedule-circle-1"></div>
          <div className="schedule-decoration-circle schedule-circle-2"></div>
          <div className="schedule-decoration-circle schedule-circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCallPopup;
