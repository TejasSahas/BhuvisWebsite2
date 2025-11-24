import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  TrendingUp, 
  BarChart3, 
  Building2, 
  Newspaper, 
  Info,
  Home
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Building2 },
    { name: 'BhuvisAI', path: '/bhuvisaipage', icon: TrendingUp },
    { name: 'Dashboard', path: '/enterprise-dashboard', icon: BarChart3 },
    { name: 'News & Research', path: '/news', icon: Newspaper },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Login', path: '/login', icon: Sun }, // You can replace Sun with a user icon if available
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-soft">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group mr-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-display gradient-text">
              BhuvisX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 flex-1 pl-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Dark mode toggle and mobile menu */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-saffron-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 rounded-b-2xl shadow-large">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'nav-link-active bg-primary-50 dark:bg-primary-900/20 shadow-sm' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 