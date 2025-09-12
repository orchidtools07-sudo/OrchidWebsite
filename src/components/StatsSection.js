import React, { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    families: 0,
    projects: 0,
    experience: 0,
    rating: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef();

  const animateCounters = () => {
    // Animate counters
    const targetValues = { families: 1000, projects: 10, experience: 15, rating: 4.9 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        families: Math.floor(targetValues.families * progress),
        projects: Math.floor(targetValues.projects * progress),
        experience: Math.floor(targetValues.experience * progress),
        rating: (targetValues.rating * progress).toFixed(1)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          families: targetValues.families,
          projects: targetValues.projects,
          experience: targetValues.experience,
          rating: targetValues.rating
        });
      }
    }, stepDuration);
  };

  // Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section className="stats-section-hero" ref={statsRef}>
      <div className="stats-container">
        <div className="stats-grid-hero">
          <div className="stat-item-hero">
            <div className="stat-number-hero">{counters.families}+</div>
            <div className="stat-label-hero">Happy Families</div>
          </div>
          <div className="stat-item-hero">
            <div className="stat-number-hero">{counters.projects}+</div>
            <div className="stat-label-hero">Projects Delivered</div>
          </div>
          <div className="stat-item-hero">
            <div className="stat-number-hero">{counters.experience}+</div>
            <div className="stat-label-hero">Years of Excellence</div>
          </div>
          <div className="stat-item-hero">
            <div className="stat-number-hero">{counters.rating}★</div>
            <div className="stat-label-hero">Client Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
