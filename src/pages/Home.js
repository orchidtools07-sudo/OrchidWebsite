import React from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import RedefiningSection from '../components/RedefiningSection';
import JustLaunched from '../components/JustLaunched';
import ResidentialProjects from '../components/ResidentialProjects';
import CommercialProjects from '../components/CommercialProjects';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <main id="main-content">
        <StatsSection />
        <AboutSection />
        <JustLaunched />
        <RedefiningSection />
        <ResidentialProjects />
        <WhyChooseUs />
        <CommercialProjects />
        <Testimonials />
        <CTASection />
      </main>
    </div>
  );
};

export default Home;
