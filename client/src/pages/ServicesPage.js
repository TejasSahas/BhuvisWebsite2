import React, { useState } from 'react';
import { 
  Briefcase, 
  Database, 
  TrendingUp, 
  Building2, 
  Users, 
  MapPin,
  BarChart3,
  FileText,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  Target,
  Shield,
  Lightbulb,
  ClipboardCheck,
  LineChart,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MeetingBookingModal from '../components/MeetingBookingModal';

const ServicesPage = () => {
  const [showCallModal, setShowCallModal] = useState(false);
  const [activeService, setActiveService] = useState('advisory');

  const advisoryServices = [
    {
      icon: Target,
      title: "Investment Advisory",
      description: "Expert guidance for real estate investors seeking profitable opportunities",
      details: [
        "Portfolio strategy and asset allocation recommendations",
        "ROI analysis and investment return projections",
        "Risk assessment and mitigation strategies",
        "Market timing and entry/exit strategies",
        "Due diligence support and property evaluation"
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
    },
    {
      icon: Building2,
      title: "Property Evaluation for Buyers",
      description: "Comprehensive analysis to help buyers make informed purchase decisions",
      details: [
        "Neighborhood and location analysis",
        "Property valuation and fair price assessment",
        "Lifestyle and infrastructure evaluation",
        "Future growth potential analysis",
        "Comparative market analysis (CMA)"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    },
    {
      icon: FileText,
      title: "Customized Property Reports",
      description: "Detailed reports tailored to your specific property or investment needs",
      details: [
        "Comprehensive property analysis reports",
        "Price trends and historical data",
        "Rental yield and income projections",
        "Infrastructure and development impact analysis",
        "Investment potential scoring"
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    },
    {
      icon: LineChart,
      title: "Market Analysis & Insights",
      description: "Deep-dive market research and trend analysis for strategic planning",
      details: [
        "Micro-market trend analysis",
        "Price appreciation forecasts",
        "Demand-supply gap analysis",
        "Policy impact assessment",
        "Competitive market positioning"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    }
  ];

  const dataServices = [
    {
      icon: Database,
      title: "Custom Data Compilation",
      description: "Comprehensive data collection and compilation for real estate companies",
      details: [
        "Property listings and inventory data",
        "Price and rental data across micro-markets",
        "Developer and project information",
        "Infrastructure and amenity mapping",
        "Historical trends and time-series data"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      icon: BarChart3,
      title: "Market Intelligence & Analytics",
      description: "Advanced analytics and insights derived from comprehensive market data",
      details: [
        "Market performance dashboards",
        "Trend analysis and forecasting",
        "Competitive benchmarking",
        "Demand-supply analytics",
        "Price index calculations"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      icon: MapPin,
      title: "Micro-Market & Location Data",
      description: "Granular location-based data and neighborhood insights",
      details: [
        "Pincode and locality-level data",
        "Neighborhood demographics and profiles",
        "Infrastructure development tracking",
        "Accessibility and connectivity metrics",
        "Local market dynamics"
      ],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80"
    },
    {
      icon: ClipboardCheck,
      title: "Documentation & Data Management",
      description: "Structured data organization and documentation support",
      details: [
        "Data standardization and formatting",
        "Quality assurance and validation",
        "Database design and management",
        "API integration support",
        "Regular data updates and maintenance"
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We understand your requirements, goals, and specific needs through a detailed consultation call or meeting.",
      icon: Phone
    },
    {
      step: "02",
      title: "Service Design",
      description: "We design a customized service plan tailored to your objectives, whether it's advisory guidance or data compilation.",
      icon: Lightbulb
    },
    {
      step: "03",
      title: "Execution",
      description: "Our expert team executes the service with regular updates and communication throughout the process.",
      icon: ClipboardCheck
    },
    {
      step: "04",
      title: "Delivery & Support",
      description: "We deliver comprehensive results and provide ongoing support to ensure you achieve your goals.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-12 min-h-[320px] md:min-h-[380px] flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
            Our Services
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-6">
            Expert advisory services and comprehensive data solutions for real estate companies, investors, and buyers
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
              to="/request-call"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Request for a Call</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-700/50 p-1.5 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveService('advisory')}
                className={`px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeService === 'advisory'
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Briefcase className={`w-5 h-5 ${activeService === 'advisory' ? 'text-white' : ''}`} />
                <span>Advisory Services</span>
              </button>
              <button
                onClick={() => setActiveService('data')}
                className={`px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeService === 'data'
                    ? 'bg-gradient-to-br from-saffron-400 to-saffron-500 text-primary-900 shadow-lg shadow-saffron-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400'
                }`}
              >
                <Database className={`w-5 h-5 ${activeService === 'data' ? 'text-primary-900' : ''}`} />
                <span>Data Services</span>
              </button>
            </div>
          </div>

          {/* Advisory Services */}
          {activeService === 'advisory' && (
            <div className="space-y-12">
              {advisoryServices.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      !isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
                        onClick={() => setShowCallModal(true)}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Data Services */}
          {activeService === 'data' && (
            <div className="space-y-12">
              {dataServices.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      !isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-saffron-400 to-saffron-500 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary-900" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-saffron-600 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
                        onClick={() => setShowCallModal(true)}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our streamlined process ensures you get the best advisory and data services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="card p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <div className="mt-4 mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our services are designed for different stakeholders in the real estate ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center border-l-4 border-saffron-500">
              <div className="w-20 h-20 bg-gradient-to-br from-saffron-400 to-saffron-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-primary-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Real Estate Companies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Comprehensive data compilation, market intelligence, and analytics services to build your database and make strategic decisions.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                  <span>Custom data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                  <span>Market intelligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                  <span>Analytics dashboards</span>
                </li>
              </ul>
            </div>

            <div className="card p-8 text-center border-l-4 border-primary-500">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Investors
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Expert investment advisory, property analysis, and strategic guidance to maximize returns and minimize risks.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>Investment strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>ROI analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>Risk assessment</span>
                </li>
              </ul>
            </div>

            <div className="card p-8 text-center border-l-4 border-primary-500">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Buyers (End Use)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Comprehensive property evaluation, neighborhood analysis, and expert recommendations to find your perfect home.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>Property evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>Neighborhood analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>Purchase guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Schedule a consultation call to discuss your requirements and discover how our services can help you achieve your goals.
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
              to="/custom-dashboard-enquiry"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Custom Dashboard Enquiry</span>
            </Link>
          </div>
        </div>
      </section>

      <MeetingBookingModal 
        isOpen={showCallModal} 
        onClose={() => setShowCallModal(false)}
        variant="call"
      />
    </div>
  );
};

export default ServicesPage;

