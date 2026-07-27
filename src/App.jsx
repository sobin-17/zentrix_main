import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FloatingCTA from './components/FloatingCTA';
import ChatIntegration from './components/chatbot/ChatIntegration';
import './firebase';
import './index.css';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded routes for code-splitting & reduced initial JS bundle size
const About = lazy(() => import('./pages/About'));
const Service = lazy(() => import('./pages/Service'));
const Contact = lazy(() => import('./pages/Contact'));
const Course = lazy(() => import('./pages/Course'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const GetTouch = lazy(() => import('./pages/GetTouch'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const OurProducts = lazy(() => import('./pages/OurProducts'));
const OurPortfolio = lazy(() => import('./pages/OurPortfolio'));
const YourNextStep = lazy(() => import('./pages/Yournextstepnew'));
const Admindashboard = lazy(() => import('./pages/Admindashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const ResumeViewer = lazy(() => import('./pages/ResumeViewer'));

const GlobalAtmosphere = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    {/* Glows removed to prevent blur rendering artifacts */}
  </div>
);

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/view-resume');

  return (
    <div className="bg-transparent text-white font-poppins relative w-full max-w-[100vw]">
      <ScrollToTop />
      <GlobalAtmosphere />

      {/* Persistent Navbar */}
      {!isAdmin && <Navbar />}

      {/* Persistent Floating Controls (Chatbot + Actions) */}
      {!isAdmin && (
        <div className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
          <div className="pointer-events-auto origin-bottom-right scale-[0.85] md:scale-100 transition-transform">
            <FloatingCTA />
          </div>
          <div className="pointer-events-auto mt-2">
            <ChatIntegration />
          </div>
        </div>
      )}

      {/* Dynamic Page Content */}
      <main className="relative" id="main-scroll-container">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
            <Route path="/our-products" element={<OurProducts />} />
            <Route path="/ourporfolio" element={<OurPortfolio />} />
            <Route path="/our-portfolio" element={<OurPortfolio />} />
            <Route path="/get-touch" element={<GetTouch />} />
            <Route path="/your-next-step" element={<YourNextStep />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/admin-dashboard" element={<Admindashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <Admindashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-resume"
              element={
                <ProtectedRoute>
                  <ResumeViewer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>

        {/* Persistent Footer */}
        {!isAdmin && <Footer />}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
