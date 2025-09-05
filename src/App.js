import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Hospitality from './pages/Hospitality';
import MissionVision from './pages/MissionVision';
import Contact from './pages/Contact';
import Certification from './pages/Certification';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App container-fluid">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/hospitality" element={<Hospitality />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certification" element={<Certification />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
