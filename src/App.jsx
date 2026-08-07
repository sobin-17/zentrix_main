import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './firebase';
import './index.css';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded routes & floating components for max initial speed & minimum bundle size
const Home = lazy(() => import('./pages/Home'));
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
const AbijoeFurnitureERP = lazy(() => import('./pages/AbijoeFurnitureERP'));
const YourNextStep = lazy(() => import('./pages/Yournextstepnew'));
const Admindashboard = lazy(() => import('./pages/Admindashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const ResumeViewer = lazy(() => import('./pages/ResumeViewer'));

const FloatingCTA = lazy(() => import('./components/FloatingCTA'));
const ChatIntegration = lazy(() => import('./components/chatbot/ChatIntegration'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));

const GlobalAtmosphere = React.memo(() => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    {/* Atmosphere container */}
  </div>
));

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/view-resume');

  return (
    <div className="bg-transparent text-white font-poppins relative w-full max-w-[100vw]">
      <ScrollToTop />
      <GlobalAtmosphere />

      {/* Persistent Navbar */}
      {!isAdmin && <Navbar />}

      {/* Cookie Consent Banner */}
      {!isAdmin && (
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      )}

      {/* Persistent Floating Controls (Chatbot + Actions) */}
      {!isAdmin && (
        <Suspense fallback={null}>
          <div className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
            <div className="pointer-events-auto origin-bottom-right scale-[0.85] md:scale-100 transition-transform">
              <FloatingCTA />
            </div>
            <div className="pointer-events-auto mt-2">
              <ChatIntegration />
            </div>
          </div>
        </Suspense>
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
            <Route path="/portfolio/abijoefurniture-erp" element={<AbijoeFurnitureERP />} />
            <Route path="/portfolio/:projectId" element={<AbijoeFurnitureERP />} />
            <Route path="/get-touch" element={<GetTouch />} />
            <Route path="/your-next-step" element={<YourNextStep />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
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
