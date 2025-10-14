import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketTrendsPage from './pages/MarketTrendsPage';
import ComparativeAnalysisPage from './pages/ComparativeAnalysisPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import InvestmentRoadmapPage from './pages/InvestmentRoadmapPage';
import BhuvisAIPage from './pages/BhuvisAIPage';
import DashboardPage from './pages/Dashboard';
import EarlyAccessPage from './pages/EarlyAccessPage';

// ScrollToTop component to handle scroll position on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also ensure scroll to top after a brief delay to handle any async rendering
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Indian Real Estate Analytics...
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Data-Driven Decisions for Indian Real Estate Investors
          </p>
        </div>
      </div>
    );
  }

  return (
    <DarkModeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="pt-20">
             <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/market-trends" element={<MarketTrendsPage />} />
               <Route path="/comparative-analysis" element={<ComparativeAnalysisPage />} />
               <Route path="/projects/:id" element={<ProjectDetailsPage />} />
               <Route path="/news" element={<NewsPage />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/buyer-report" element={React.createElement(require('./pages/BuyerReportPage').default)} />
               <Route path="/enterprise-dashboard" element={<EnterpriseDashboardPage />} />
               <Route path="/investment-roadmap" element={<InvestmentRoadmapPage />} />
               <Route path="/bhuvisaipage" element={<BhuvisAIPage />} />
               <Route path="/dashboard" element={<DashboardPage />} />
               <Route path="/early-access" element={<EarlyAccessPage />} />
             </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;