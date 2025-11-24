import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ExternalLink, Shield, TrendingUp, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-display text-white">
                BhuvisX
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-lg leading-relaxed">
              India's Premier Real Estate Intelligence Platform. 
              Cutting-edge analytics, AI-powered insights, and strategic investment guidance 
              for the Indian real estate market.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-medium">RERA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 font-medium">Real-time Data</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span className="group-hover:text-primary-400">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/market-trends" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span className="group-hover:text-primary-400">Market Trends</span>
                </Link>
              </li>
              <li>
                <Link to="/comparative-analysis" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span className="group-hover:text-primary-400">Comparative Analysis</span>
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span className="group-hover:text-primary-400">News & Research</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span className="group-hover:text-primary-400">About</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://rera.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group"
                >
                  <span className="group-hover:text-primary-400">RERA Portal</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="https://smartcities.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group"
                >
                  <span className="group-hover:text-primary-400">Smart Cities Mission</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pmaymis.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group"
                >
                  <span className="group-hover:text-primary-400">PMAY Portal</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="https://housing.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group"
                >
                  <span className="group-hover:text-primary-400">Housing.com</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold text-white">Stay Updated with Our Newsletter</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Get the latest market insights, investment opportunities, and real estate news delivered to your inbox.
            </p>
            <Link
              to="/newsletter-subscribe"
              className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>Subscribe to Newsletter</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} BhuvisX - Indian Real Estate Analytics. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-y-0.5">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-y-0.5">
                Terms of Service
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-y-0.5">
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              <strong className="text-gray-300">Disclaimer:</strong> This platform provides research-based insights for educational and analytical purposes. 
              It is not a brokerage or listing portal. All data is for demonstration purposes and should not be used for 
              actual investment decisions without proper verification. Please consult with qualified professionals before 
              making any investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 