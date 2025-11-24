import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Building2, 
  MapPin, 
  DollarSign, 
  ArrowRight,
  BarChart3,
  Newspaper,
  Target,
  Shield,
  Phone,
  Calendar,
  Users,
  Database,
  Briefcase,
  CheckCircle,
  Mail,
  BarChart
} from 'lucide-react';
import axios from 'axios';
import MeetingBookingModal from '../components/MeetingBookingModal';

const HomePage = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/api/market-overview');
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const quickStats = [
    {
      title: "Avg Residential Price",
    value: marketData?.quickKPIs.avgResidentialPrice ? `₹${marketData.quickKPIs.avgResidentialPrice.toLocaleString()}` : "₹68,000/sq.ft",
      icon: Building2,
      trend: "",
      trendUp: true
    },
    {
      title: "Commercial Rental Yield",
      value: marketData?.quickKPIs.avgCommercialYield || "8.2%",
      icon: DollarSign,
      trend: "+2.1%",
      trendUp: true
    },
    {
      title: "Top Performing City",
      value: marketData?.quickKPIs.topGainers?.[0] || "Pune",
      icon: TrendingUp,
      trend: "+22.1%",
      trendUp: true
    }
  ];

  const policyUpdates = [
    {
      title: "RERA Status",
      status: marketData?.quickKPIs.policyTracker.rera || "Active",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Smart Cities Mission",
      status: marketData?.quickKPIs.policyTracker.smartCities || "In Progress",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Affordable Housing",
      status: marketData?.quickKPIs.policyTracker.affordableHousing || "New Incentives",
      icon: Building2,
      color: "text-saffron-600"
    }
  ];

  const features = [
    {
      title: "Market Trends & Insights",
      description: "Comprehensive analysis of residential, commercial, and affordable housing markets across India.",
      icon: BarChart3,
      link: "/market-trends"
    },
    {
      title: "Comparative Analysis",
      description: "Side-by-side comparison of cities, projects, and investment opportunities.",
      icon: TrendingUp,
      link: "/comparative-analysis"
    },
    {
      title: "News & Research",
      description: "Latest market updates, policy changes, and expert insights.",
      icon: Newspaper,
      link: "/news"
    }
  ];

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom flex items-center min-h-[420px] md:min-h-[520px]">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full">
            {/* Left: Headline, description, CTAs */}
            <div className="flex-1 flex flex-col justify-center items-start space-y-5 max-w-2xl">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
                  Real Estate Advisory & Data Services
                </h1>
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-xl">
                  <span className="font-bold text-white">BhuvisX</span> provides expert advisory services and comprehensive data solutions for real estate companies, investors, and buyers. Get personalized guidance, custom data compilation, and strategic insights to make informed investment and purchasing decisions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Link
                  to="/schedule-free-session"
                  className="btn-cta text-base md:text-lg px-8 py-4 shadow-glow-yellow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Free Session</span>
                </Link>
                <Link
                  to="/request-call"
                  className="btn-cta text-base md:text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Request for a Call</span>
                </Link>
              </div>
            </div>
            {/* Right: Map and Stats */}
            <div className="flex-1 flex flex-col items-center w-full max-w-2xl">
              <div className="w-full h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm relative z-10">
                <MapContainer 
                  center={[18.559, 73.7865]} 
                  zoom={15} 
                  scrollWheelZoom={false} 
                  dragging={false} 
                  doubleClickZoom={false} 
                  zoomControl={false} 
                  attributionControl={false}
                  style={{ height: '100%', width: '100%', pointerEvents: 'none', borderRadius: '1.5rem' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </MapContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full mt-4">
                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <span className="text-sm text-gray-200 font-medium mb-2">Avg Price/sqft</span>
                  <span className="font-bold text-2xl text-white">₹12,500</span>
                </div>
                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <span className="text-sm text-gray-200 font-medium mb-2">Avg Rent/sqft</span>
                  <span className="font-bold text-2xl text-white">₹65</span>
                </div>
                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <span className="text-sm text-gray-200 font-medium mb-2">Rental Yield</span>
                  <span className="font-bold text-2xl text-white">6.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pune Data Availability Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="card-glass border-2 border-primary-400/30 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
                    🎯 Data Services: Pune Region Available
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our data services include comprehensive coverage for the Pune region with detailed micro-market analysis and neighborhood insights. We provide custom data compilation services for real estate companies looking to build comprehensive databases. Data for other cities and regions can be arranged on demand through our advisory services.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Micro-market Analysis Includes:</h3>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500"></span>
                        Price trends by locality
                      </li>
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500"></span>
                        Rental yield analysis
                      </li>
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500"></span>
                        Infrastructure development impact
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Coverage Areas:</h3>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-saffron-500"></span>
                        Baner, Aundh, Wakad
                      </li>
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-saffron-500"></span>
                        Koregaon Park, FC Road
                      </li>
                      <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-2 h-2 rounded-full bg-saffron-500"></span>
                        Hinjewadi, Magarpatta
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-saffron-50 dark:bg-saffron-900/20 p-4 rounded-lg border border-saffron-200 dark:border-saffron-800">
                  <p className="text-sm text-saffron-800 dark:text-saffron-200">
                    <strong>Note:</strong> Data for other cities and regions can be arranged on demand. We're adding more cities to our database periodically to provide comprehensive coverage across India.
                  </p>
                </div>
              </div>
              {/* Right: Stats Card */}
              <div className="flex-1 flex items-center justify-center">
                <div className="card-glass border-2 border-primary-600/30 p-8 flex flex-col items-center text-center max-w-sm">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pune Coverage</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex justify-between">
                      <span>Micro-markets:</span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">25+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Points:</span>
                      <span className="font-semibold text-saffron-600 dark:text-saffron-400">10,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Update Frequency:</span>
                      <span className="font-semibold text-saffron-600 dark:text-saffron-400">Daily</span>
                    </div>
                  </div>
                  <Link
                    to="/services"
                    className="btn-cta text-lg px-8 py-4 shadow-glow-yellow w-full flex items-center justify-center gap-2"
                  >
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BhuvisAI Explainer Section */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="card-glass border-2 border-yellow-400/30 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
                    Advisory Services: AI-Powered Recommendations
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our advisory services include BhuvisAI, which helps investors and buyers find the best properties and investment opportunities. Through our advisory consultations, you get:
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span>
                    Personalized property suggestions
                  </li>
                  <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span>
                    Pricing estimates for any location
                  </li>
                  <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span>
                    Micro-market and neighborhood analysis
                  </li>
                </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/services"
                  className="btn-cta text-lg px-8 py-4 shadow-glow-yellow inline-flex items-center gap-2"
                >
                  <span>Learn About Our Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/custom-dashboard-enquiry"
                  className="btn-cta text-lg px-8 py-4 border-2 border-yellow-400 bg-transparent text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 inline-flex items-center gap-2 shadow-glow-yellow"
                >
                  <BarChart className="w-5 h-5" />
                  <span>Custom Dashboard</span>
                </Link>
              </div>
              </div>
              {/* Right: AI Icon Card */}
              <div className="flex-1 flex items-center justify-center">
                <div className="card-glass border-2 border-primary-600/30 p-8 flex flex-col items-center text-center max-w-sm">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg width="40" height="40" fill="none" viewBox="0 0 64 64" className="text-white">
                      <circle cx="32" cy="32" r="24" fill="currentColor"/>
                      <path d="M32 20v24M20 32h24" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">BhuvisAI</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your personal AI assistant for smarter real estate decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ground-level Insights Section */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left: Map and stats */}
            <div className="order-2 lg:order-1 flex flex-col items-center">
              <div className="w-full h-[250px] lg:h-[300px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 mb-4 relative z-10">
                <MapContainer 
                  center={[18.5204, 73.8567]} 
                  zoom={14} 
                  scrollWheelZoom={false} 
                  dragging={false} 
                  doubleClickZoom={false} 
                  zoomControl={false} 
                  attributionControl={false}
                  style={{ height: '100%', width: '100%', pointerEvents: 'none', borderRadius: '1.5rem' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[18.5204, 73.8567]}>
                    <Popup>
                      <div className="text-sm font-bold text-primary-900">FC Road, Pune</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="stat-card p-4 text-center h-20 flex flex-col justify-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Price/sqft</div>
                  <div className="text-xl font-bold text-primary-600 dark:text-primary-400">₹14,200</div>
                </div>
                <div className="stat-card p-4 text-center h-20 flex flex-col justify-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rent/sqft</div>
                  <div className="text-xl font-bold text-saffron-600 dark:text-saffron-400">₹72</div>
                </div>
                <div className="stat-card p-4 text-center h-20 flex flex-col justify-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rental Yield</div>
                  <div className="text-xl font-bold text-saffron-600 dark:text-saffron-400">6.8%</div>
                </div>
              </div>
            </div>
            {/* Right: Header, description, and Market Stats */}
            <div className="order-1 lg:order-2 flex flex-col items-start justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
                  Advisory Services: Ground-level Insights for Smarter Investments
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our advisory team provides ground-level insights from Pune's most dynamic markets. Through our advisory services, we deliver hyperlocal price trends, rental yields, and neighborhood analytics to help investors and buyers make confident decisions. Our data services compile comprehensive market intelligence for real estate companies.
                </p>
              </div>
              
              {/* Market Performance Stats */}
              <div className="w-full space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Performance Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="stat-card p-4 h-20 flex flex-col justify-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Price Growth (YoY)</div>
                    <div className="text-xl font-bold text-primary-600 dark:text-primary-400">+18.5%</div>
                  </div>
                  <div className="stat-card p-4 h-20 flex flex-col justify-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rental Demand</div>
                    <div className="text-xl font-bold text-saffron-600 dark:text-saffron-400">High</div>
                  </div>
                  <div className="stat-card p-4 h-20 flex flex-col justify-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">New Launches</div>
                    <div className="text-xl font-bold text-saffron-600 dark:text-saffron-400">45+</div>
                  </div>
                  <div className="stat-card p-4 h-20 flex flex-col justify-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Infrastructure Score</div>
                    <div className="text-xl font-bold text-primary-700 dark:text-primary-300">8.2/10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customized Report Section */}
      <section className="py-4 sm:py-6 md:py-8 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Left: Text and CTA */}
            <div className="order-2 xl:order-1 space-y-3 sm:space-y-4 w-full">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 dark:text-white">
                  Advisory Services: Customized Property Reports
                </h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our advisory services include customized property reports for investors and buyers evaluating specific properties, projects, or micro-markets. We deliver tailored insights, price trends, rental yields, and growth forecasts—curated by our expert advisory team and powered by BhuvisX AI. Perfect for making informed investment or end-use purchase decisions.
                </p>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                  Detailed price and rent history
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                  Neighborhood and lifestyle analysis
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                  Investment potential and risk assessment
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                  Comparable property benchmarking
                </li>
              </ul>
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Report Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 card">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">AI Analysis</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Powered by BhuvisX</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 card">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-saffron-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Growth Forecast</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">5-year projections</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 card">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Location Analysis</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Micro-market insights</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 card">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-saffron-100 dark:bg-saffron-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-saffron-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Risk Assessment</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Comprehensive evaluation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Sample Report Image */}
            <div className="order-1 xl:order-2 flex justify-center w-full">
              <div className="relative w-full max-w-md sm:max-w-lg">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80" 
                  alt="Sample property report" 
                  className="rounded-2xl sm:rounded-3xl shadow-2xl w-full object-cover border-2 sm:border-4 border-yellow-400/50" 
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Sample Report</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">AI-Powered Analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Commercial Buyer Attraction Section */}
  {/* Commercial Buyer Attraction Section removed as requested */}

      {/* Services Overview Section */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive advisory and data services designed to help you make informed real estate decisions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Advisory Services Card */}
            <div className="card p-8 group hover:shadow-2xl transition-all duration-300 border-l-4 border-primary-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advisory Services</h3>
                  <p className="text-gray-600 dark:text-gray-400">Expert guidance for investors & buyers</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our advisory team provides personalized guidance for investors seeking profitable opportunities and buyers looking for the perfect property. We offer investment strategy, property evaluation, risk assessment, and comprehensive market analysis.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>Investment Advisory & Strategy</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>Property Evaluation & Analysis</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>Customized Property Reports</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>Market Analysis & Insights</span>
                </li>
              </ul>
              <Link
                to="/services"
                className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
              >
                <span>Explore Advisory Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Data Services Card */}
            <div className="card p-8 group hover:shadow-2xl transition-all duration-300 border-l-4 border-saffron-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-saffron-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Data Services</h3>
                  <p className="text-gray-600 dark:text-gray-400">Comprehensive data for real estate companies</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We help real estate companies build comprehensive databases through custom data compilation, market intelligence, and analytics. Our services include property listings, price trends, micro-market data, and documentation support.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                  <span>Custom Data Compilation</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                  <span>Market Intelligence & Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                  <span>Micro-Market & Location Data</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                  <span>Documentation & Data Management</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/services"
                  className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
                >
                  <span>Explore Data Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/custom-dashboard-enquiry"
                  className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
                >
                  <BarChart className="w-4 h-4" />
                  <span>Custom Dashboard</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Platform Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Access our analytics platform and AI-powered tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  key={index} 
                  to={feature.link}
                  className="feature-card group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left: Lifestyle Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&q=80" 
                  alt="Real estate lifestyle" 
                  className="rounded-3xl shadow-2xl w-full max-w-lg object-cover border-4 border-yellow-400/50" 
                />
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Professional Tools</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">For Every Stakeholder</div>
                </div>
              </div>
            </div>
            {/* Right: Header and Descriptions */}
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
                  Our Services: Who We Help
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  We provide advisory services and data solutions tailored for real estate companies, investors, and buyers
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full">
                <div className="card p-5 border-l-4 border-yellow-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real Estate Companies</h3>
                  <p className="text-gray-700 dark:text-gray-300">Our data services help you compile comprehensive databases, market intelligence, and analytics. We provide custom data collection, documentation support, and market insights tailored to your business needs.</p>
                </div>
                <div className="card p-5 border-l-4 border-yellow-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Investors</h3>
                  <p className="text-gray-700 dark:text-gray-300">Our advisory services provide investment guidance, property analysis, ROI projections, and market trend insights. Get personalized recommendations for investment opportunities with risk assessment and growth forecasts.</p>
                </div>
                <div className="card p-5 border-l-4 border-yellow-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Buyers (End Use)</h3>
                  <p className="text-gray-700 dark:text-gray-300">Our advisory services help you find the right property for your needs. We provide neighborhood analysis, property comparisons, lifestyle insights, and expert recommendations to make confident purchase decisions.</p>
                </div>
                <div className="card p-5 border-l-4 border-yellow-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real Estate Consultants & Agents</h3>
                  <p className="text-gray-700 dark:text-gray-300">Access our data services and advisory tools to empower your clients with transparent market data, trends, and custom reports. Enhance your consulting services with our comprehensive analytics platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-6 md:py-8 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg lg:text-xl text-gray-100 leading-relaxed mb-6 max-w-2xl mx-auto">
            Schedule a consultation to discuss your requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule-free-session"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Free Session</span>
            </Link>
            <Link
              to="/services"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meeting Booking Modals */}
      <MeetingBookingModal 
        isOpen={showMeetingModal} 
        onClose={() => setShowMeetingModal(false)}
        variant="meeting"
      />
      <MeetingBookingModal 
        isOpen={showCallModal} 
        onClose={() => setShowCallModal(false)}
        variant="call"
      />
    </div>
  );
};

export default HomePage;