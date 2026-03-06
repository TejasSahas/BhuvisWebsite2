import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Building2,
  Package,
  Info,
  Home,
  Zap,
  FileText,
  Database,
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isServicesActive = ['/services', '/services/lead-automation', '/services/content-automation', '/services/data-consulting'].some((p) => location.pathname === p || location.pathname.startsWith(p));
  const isProductsActive = location.pathname.startsWith('/products');

  const servicesItems = [
    { name: 'Lead Automation', path: '/services/lead-automation', icon: Zap },
    { name: 'Content Automation', path: '/services/content-automation', icon: FileText },
    { name: 'Data Consulting', path: '/services/data-consulting', icon: Database },
  ];

  const productsItems = [
    { name: 'BrokerJodo', path: '/products/brokerjodo', icon: Package },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-soft">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group mr-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-display gradient-text">BhuvisX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 pl-8">
            <Link
              to="/"
              className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive('/') ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Services: link to all-encompassing page + dropdown on hover */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isServicesActive ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <Building2 className="w-4 h-4" />
                <span className="font-medium">Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 py-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <Link to="/services" className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl" onClick={() => setServicesOpen(false)}>
                    All Services
                  </Link>
                  {servicesItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setServicesOpen(false)}
                      >
                        <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isProductsActive ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <Package className="w-4 h-4" />
                <span className="font-medium">Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 py-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                  {productsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                        onClick={() => setProductsOpen(false)}
                      >
                        <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive('/about') ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <Info className="w-4 h-4" />
              <span className="font-medium">About Us</span>
            </Link>

            <Link
              to="/login"
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Sun className="w-4 h-4" />
              <span className="font-medium">Login</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-saffron-500" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <div className="py-4 px-2 space-y-1">
              <Link to="/" className="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl" onClick={() => setIsMenuOpen(false)}><Home className="w-5 h-5" /><span>Home</span></Link>
              <span className="block px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Services</span>
              <Link to="/services" className="block px-6 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>All Services</Link>
              {servicesItems.map((item) => (
                <Link key={item.path} to={item.path} className="flex items-center space-x-2 px-6 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
              ))}
              <span className="block px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Products</span>
              {productsItems.map((item) => (
                <Link key={item.path} to={item.path} className="block px-6 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
              ))}
              <Link to="/about" className="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl" onClick={() => setIsMenuOpen(false)}><Info className="w-5 h-5" /><span>About Us</span></Link>
              <Link to="/login" className="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl" onClick={() => setIsMenuOpen(false)}><span>Login</span></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
