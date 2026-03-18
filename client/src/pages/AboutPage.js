import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Users, 
  Database, 
  BarChart3,
  Target,
  Award,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Phone,
  Calendar,
  Briefcase,
  ClipboardList,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MeetingBookingModal from '../components/MeetingBookingModal';

const AboutPage = () => {
  const navigate = useNavigate();
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  
  // About: Real Estate Technology & Automation
  const realEstateIntro = (
    <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[240px] md:min-h-[280px] flex items-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
      <div className="relative container-custom w-full hero-inner">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
            About BhuvisX
          </h1>
          <p className="text-base md:text-lg text-gray-100 leading-relaxed">
            <span className="font-bold text-white">BhuvisX</span> is a real estate technology enablement platform. We help brokers, mandate firms, and developers automate lead generation, scale content, and use data and intelligence — so you grow pipeline and close more deals without scaling headcount.
          </p>
        </div>
      </div>
    </section>
  );
  const dataSources = [
    {
      name: "RERA (Real Estate Regulatory Authority)",
      description: "Official regulatory data for project registrations and compliance",
      url: "https://rera.gov.in",
      icon: Shield
    },
    {
      name: "Housing.com",
      description: "Comprehensive property listings and market data",
      url: "https://housing.com",
      icon: Building2
    },
    {
      name: "99acres",
      description: "Property listings and market insights",
      url: "https://99acres.com",
      icon: Database
    },
    {
      name: "PropEquity",
      description: "Real estate data and analytics platform",
      url: "https://propequity.co.in",
      icon: BarChart3
    },
    {
      name: "Knight Frank",
      description: "Global real estate consultancy reports",
      url: "https://knightfrank.com",
      icon: TrendingUp
    }
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Understand",
      description: "We map your lead sources, content needs, and data gaps so automation fits your sales and marketing workflow.",
      icon: Target
    },
    {
      step: "02",
      title: "Design",
      description: "We design pipelines — lead capture, routing, CRM workflows, content flows — tailored to your team and tools.",
      icon: ClipboardList
    },
    {
      step: "03",
      title: "Implement",
      description: "We build and integrate systems: ad funnels, landing pages, CRM automation, content distribution, and dashboards.",
      icon: Database
    },
    {
      step: "04",
      title: "Optimize",
      description: "We monitor performance and refine workflows so your pipeline stays efficient and your team keeps closing.",
      icon: BarChart3
    }
  ];

  const keyMetrics = [
    {
      title: "ROI (Return on Investment)",
      description: "Measures the percentage return on investment over a specific period, calculated as (Current Value - Initial Investment) / Initial Investment × 100.",
      importance: "Helps investors understand the profitability of their real estate investments and compare different opportunities."
    },
    {
      title: "Rental Yield",
      description: "Annual rental income as a percentage of property value, calculated as (Annual Rent / Property Value) × 100.",
      importance: "Indicates the income-generating potential of a property and helps assess cash flow returns."
    },
    {
      title: "Price Trends",
      description: "Historical and projected price movements in specific markets, locations, and property types.",
      importance: "Enables investors to identify appreciating markets and make timing decisions for buying or selling."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Lead Data Scientist",
      expertise: "Real Estate Analytics, Machine Learning",
      experience: "8+ years"
    },
    {
      name: "Rajesh Kumar",
      role: "Market Research Analyst",
      expertise: "Indian Real Estate Markets, Policy Analysis",
      experience: "12+ years"
    },
    {
      name: "Anita Patel",
      role: "Investment Strategist",
      expertise: "Portfolio Management, Risk Assessment",
      experience: "10+ years"
    },
    {
      name: "Suresh Reddy",
      role: "Technology Lead",
      expertise: "Full-Stack Development, Data Engineering",
      experience: "15+ years"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Blue Hero Section First */}
      {realEstateIntro}
      {/* Mission & Vision */}
      <section className="py-4 md:py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6">
          <div className="img-frame mb-6">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Modern workspace and collaboration"
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="card p-4 md:p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-8 h-8 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To empower real estate firms with technology that automates leads, content, and data workflows. We build and integrate systems so your team focuses on closing deals — not manual capture, follow-ups, or content production.
              </p>
            </div>
            <div className="card p-4 md:p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-8 h-8 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the go-to technology and automation partner for India's real estate ecosystem — brokers, mandate firms, developers, and channel partners — enabling them to scale operations and win more business through automation and data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">Our Methodology</h2>
            <div className="section-accent" />
            <p className="section-subtitle">How we work with you: from understanding your workflow to designing, implementing, and optimizing your automation stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="card p-5 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-primary-900" />
                  </div>
                  <div className="text-xl font-bold text-yellow-500 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Key Metrics Explanation */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">Understanding Key Metrics</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Our data and intelligence layer powers dashboards and decisions — here are key metrics we help you track and use.</p>
          </div>

          <div className="space-y-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="card p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {metric.title}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Definition</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Why It Matters</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {metric.importance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">Our Services</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Lead automation, content automation, and data consulting — one stack for brokers, mandate firms, and developers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Automation */}
            <div className="card p-6 border-l-4 border-primary-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Lead Automation
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Capture, route, and nurture leads from portals, ads, and your website with automated pipelines and CRM workflows.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Ad funnels and landing pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Lead routing and qualification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>CRM integration and follow-ups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Portal and channel aggregation</span>
                </li>
              </ul>
            </div>

            {/* Content Automation */}
            <div className="card p-6 border-l-4 border-saffron-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-saffron-400 to-saffron-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Content Automation
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Scale property marketing with automated listing content, videos, and distribution across channels.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 mt-0.5 flex-shrink-0" />
                  <span>Listing videos and reels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 mt-0.5 flex-shrink-0" />
                  <span>Social media and portal distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 mt-0.5 flex-shrink-0" />
                  <span>Content templates and workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-saffron-600 mt-0.5 flex-shrink-0" />
                  <span>Partner and channel syndication</span>
                </li>
              </ul>
            </div>

            {/* Data Consulting */}
            <div className="card p-6 border-l-4 border-teal-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Data Consulting
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Market intelligence, dashboards, and analytics to support pricing, investment, and strategy decisions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Micro-market and price insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>BhuvisAI and custom dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>ROI and rental yield analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Developer and project intelligence</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 border-l-4 border-red-500">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Important Disclaimer
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>Educational Purpose:</strong> This platform provides technology, automation, and data insights 
                    for educational and analytical purposes. It is not a brokerage or listing portal.
                  </p>
                  <p>
                    <strong>Data Accuracy:</strong> While we strive for accuracy, all data is for 
                    demonstration purposes and should not be used for actual investment decisions 
                    without proper verification.
                  </p>
                  <p>
                    <strong>Professional Advice:</strong> Please consult with qualified professionals 
                    (financial advisors, real estate experts, legal counsel) before making any 
                    investment decisions.
                  </p>
                  <p>
                    <strong>Market Risks:</strong> Real estate investments carry inherent risks. 
                    Past performance does not guarantee future results. Market conditions can change 
                    rapidly and affect investment outcomes.
                  </p>
                  <p>
                    <strong>Regulatory Compliance:</strong> Always ensure compliance with local 
                    regulations, RERA guidelines, and other applicable laws when making real estate 
                    investments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-4 md:py-6 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom text-center">
          <h2 className="hero-title text-white drop-shadow-2xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Explore our lead automation, content automation, and data consulting services — or schedule a call to see how we can automate your pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/enquiry"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Schedule a Call</span>
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

export default AboutPage;