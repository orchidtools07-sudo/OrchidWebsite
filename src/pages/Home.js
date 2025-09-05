import React, { useState } from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import RedefiningSection from '../components/RedefiningSection';
import JustLaunched from '../components/JustLaunched';
import ResidentialProjects from '../components/ResidentialProjects';
import CommercialProjects from '../components/CommercialProjects';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';
import ContactPopup from '../components/ContactPopup';
const Home = () => {
  const [contactPopup, setContactPopup] = useState({
    isOpen: false,
    title: "Get In Touch"
  });

  const openContactPopup = (title = "Get In Touch") => {
    setContactPopup({
      isOpen: true,
      title: title
    });
  };

  const closeContactPopup = () => {
    setContactPopup({
      isOpen: false,
      title: "Get In Touch"
    });
  };

  return (
    <div className="home">
      <HeroSection onContactClick={() => openContactPopup("Contact Us")} />
      <main id="main-content">
        <StatsSection />
        <AboutSection />
        <JustLaunched onBookNowClick={() => openContactPopup("Book Your Dream Property")} />
        <RedefiningSection />
        <ResidentialProjects />
        <WhyChooseUs />
        <CommercialProjects />
        <BlogSection />
        <CTASection onContactClick={() => openContactPopup("Let's Build Your Future")} />
      </main>
      
      <ContactPopup 
        isOpen={contactPopup.isOpen}
        onClose={closeContactPopup}
        title={contactPopup.title}
      />
    </div>
  );
};

export default Home;
