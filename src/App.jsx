import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Course from './pages/Course';
import CourseDetail from './pages/CourseDetail';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import GetTouch from "./pages/GetTouch";
import GetInTouch from "./pages/GetInTouch";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FloatingCTA from './components/FloatingCTA';
import './firebase';
import './index.css';
import ScrollToTop from "./components/ScrollToTop";
import OurProducts from './pages/OurProducts';
import OurPortfolio from './pages/OurPortfolio';
import YourNextStep from './pages/Yournextstepnew';
import Admindashboard from './pages/Admindashboard';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
const GlobalAtmosphere = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    {/* Glows removed to prevent blur rendering artifacts */}
  </div>
);

function App() {
  return (
    
    <Router>
      <ScrollToTop />
      <div className="bg-transparent text-white font-poppins relative w-full max-w-[100vw]">
        <GlobalAtmosphere />
        {/* Persistent Navbar */}
        <Navbar />
        <FloatingCTA />

        {/* Dynamic Page Content */}
        <main className="relative scroll-smooth" id="main-scroll-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/course" element={<Course />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/career/:jobId" element={<JobDetail />} />
            <Route path="/ourproducts" element={<OurProducts />} />
            <Route path="/ourporfolio" element={<OurPortfolio />} />
            <Route path="/get-touch" element={<GetTouch />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            
            <Route path="/your-next-step" element={<YourNextStep />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/admin-dashboard" element={<Admindashboard/>}/>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-signup" element={<AdminSignup />} />

          </Routes>
          {/* Persistent Footer */}
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
