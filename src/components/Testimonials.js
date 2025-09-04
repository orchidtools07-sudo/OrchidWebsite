import React, { useState, useRef, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      designation: 'Business Owner',
      location: 'Orchid Petals, Sector 49',
      text: 'Orchid Infrastructure delivered beyond our expectations. The quality of construction, timely delivery, and professional approach made our home-buying journey seamless. The amenities and location are perfect for our family.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      id: 2,
      name: 'Priya Mehta',
      designation: 'IT Professional',
      location: 'Orchid Island, Sector 51',
      text: 'Moving into Orchid Island was the best decision we made. The community living, security, and modern facilities have enhanced our lifestyle significantly. Highly recommend Orchid Infrastructure for quality homes.',
      rating: 5,
      image: '👩‍💻'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      designation: 'Senior Manager',
      location: 'Westend Greens, New Delhi',
      text: 'The luxury and sophistication at Westend Greens is unmatched. From the architectural excellence to the premium amenities, every detail reflects quality. Orchid Infrastructure truly understands luxury living.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      id: 4,
      name: 'Sunita Agarwal',
      designation: 'Entrepreneur',
      location: 'Mayfield Gardens',
      text: 'The 330-acre township offers everything we dreamed of - space, luxury, and connectivity. The team at Orchid Infrastructure was professional throughout the process. Our investment has been truly worthwhile.',
      rating: 5,
      image: '👩‍💼'
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(autoSlide);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setCurrentTestimonial(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setCurrentTestimonial(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    if (isTransitioning) return;
    setCurrentTestimonial(index);
  };

  return (
    <section className="testimonials-section-elegant">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">Real experiences from families who chose Orchid Infrastructure for their dream homes</p>
        </div>
        
        <div className="testimonials-content">
          <div className="testimonial-main">
            <div className="testimonial-card-elegant">
              <div className="quote-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="#ffd700"/>
                </svg>
              </div>
              
              <div className="testimonial-text-elegant">
                <p>"{testimonials[currentTestimonial].text}"</p>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star-elegant">
                    ⭐
                  </span>
                ))}
              </div>
              
              <div className="testimonial-author-elegant">
                <div className="author-avatar">
                  <span className="avatar-icon">{testimonials[currentTestimonial].image}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonials[currentTestimonial].name}</h4>
                  <p className="author-designation">{testimonials[currentTestimonial].designation}</p>
                  <p className="author-location">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonials-navigation">
            <button className="nav-btn prev-btn" onClick={prevTestimonial}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                />
              ))}
            </div>
            
            <button className="nav-btn next-btn" onClick={nextTestimonial}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18L15 12L9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
