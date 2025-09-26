import React from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  
  // Unified: Indian Real Estate Landscape & Analytics
  const realEstateIntro = (
    <section className="relative gradient-hero text-white overflow-hidden pt-16">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
      <div className="relative container-custom py-6 md:py-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-white drop-shadow-2xl mb-6">
            About BhuvisX
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
            <span className="font-bold text-white">BhuvisX</span> empowers investors, developers, and homebuyers with transparent, data-driven insights and actionable intelligence for the Indian real estate market. Our platform helps you navigate a rapidly evolving landscape shaped by urbanization, technology, and policy reforms—so you can make confident, informed decisions.
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
      title: "Data Collection",
      description: "Aggregating data from multiple authoritative sources including RERA, property portals, and real estate consultancies.",
      icon: Database
    },
    {
      step: "02",
      title: "Data Validation",
      description: "Cross-verifying information across sources and applying quality checks to ensure accuracy and reliability.",
      icon: CheckCircle
    },
    {
      step: "03",
      title: "Analysis & Processing",
      description: "Applying statistical models and algorithms to process raw data into meaningful insights and trends.",
      icon: BarChart3
    },
    {
      step: "04",
      title: "Insight Generation",
      description: "Generating actionable insights, ROI projections, and market intelligence for informed decision-making.",
      icon: Target
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
      <section className="py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To provide the most accurate and insightful real estate analytics, 
                empowering our clients to make informed and profitable investment decisions.
              </p>
            </div>
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To democratize access to high-quality real estate intelligence, empowering all stakeholders across India with actionable, transparent, and timely data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Methodology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our rigorous 4-step process ensures the highest quality data and insights for your real estate decisions.
            </p>
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
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Understanding Key Metrics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn about the important metrics we track and why they matter 
              for real estate investment decisions.
            </p>
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
                    <strong>Educational Purpose:</strong> This platform provides research-based insights 
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
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Join leading real estate professionals who trust BhuvisX for their data-driven decisions. 
            Get started today and unlock the full potential of your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-cta shadow-glow-yellow"
              onClick={() => {
                navigate('/enterprise-dashboard');
                window.scrollTo(0, 0);
              }}
            >
              <span>Access Dashboard</span>
            </button>
            <button 
              className="btn-cta shadow-glow-yellow"
              onClick={() => {
                navigate('/bhuvisaipage');
                window.scrollTo(0, 0);
              }}
            >
              <span>Try BhuvisAI</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;