import React, { useState, useEffect, useRef } from 'react';

const RedefiningSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const redefiningRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (redefiningRef.current) {
        const rect = redefiningRef.current.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setElementHeight(rect.height);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate parallax offset based on element position
  const parallaxOffset = () => {
    const rate = (scrollY - elementTop + window.innerHeight) / (elementHeight + window.innerHeight);
    return Math.max(-100, Math.min(100, (rate - 0.5) * 100));
  };

  return (
    <section className="redefining-section" ref={redefiningRef}>
      <div 
        className="redefining-background"
        style={{
          transform: `translate3d(0, ${parallaxOffset()}px, 0) scale(1.1)`,
          willChange: 'transform'
        }}
      ></div>
      <div className="redefining-overlay"></div>
      <div className="container">
        <div className="redefining-content-wrapper">
          <h2 className="section-title">Redefining Real Estate, One Bold Move at a Time</h2>
          <div className="redefining-content">
            <p>Orchid Infrastructure Developers don't just list properties, we elevate them. We transform homes' untapped potential, crafting thoughtful design, and executing compelling marketing strategies to attract premium buyers and deliver top prices.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedefiningSection;
