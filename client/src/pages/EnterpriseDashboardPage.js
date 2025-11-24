import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Users, 
  MapPin, 
  DollarSign,
  Target,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Calendar,
  ArrowRight
} from 'lucide-react';
import MeetingBookingModal from '../components/MeetingBookingModal';

const EnterpriseDashboardPage = () => {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live market data with instant updates and trend analysis"
    },
    {
      icon: TrendingUp,
      title: "Portfolio Tracking",
      description: "Monitor your investments with comprehensive performance metrics"
    },
    {
      icon: Building2,
      title: "Property Management",
      description: "Track multiple properties across different cities and markets"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team members"
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Geographic analysis and micro-market insights"
    },
    {
      icon: DollarSign,
      title: "Financial Planning",
      description: "ROI calculations and investment forecasting tools"
    }
  ];

  const pricingTiers = [
    {
      name: "Standard Dashboard Package",
      description: "Perfect for individual investors and small teams",
      features: [
        "Information on existing database",
        "Weekly market updates and news",
        "Standardized Regional Information",
        "BhuvisAI enabled consultations",
        "Email Support",
        "Detailed Customized Info on 5 Micro-Markets"
      ],
      popular: false
    },
    {
      name: "Custom Dashboard Package",
      description: "Tailored solutions for large organizations and enterprises",
      features: [
        "Customizable data collection and documentation support",
        "On demand inputs and 24hr consultation and support",
        "Custom Integrations and Real Estate Dashboards",
        "Dedicated Account Manager",
        "API Access for several modules",
        "BhuvisAI support",
        "Email Support",
        "Daily / Weekly market updates and news",
        "Detailed Customized Info on unlimited micro-markets"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-12 min-h-[320px] md:min-h-[380px] flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
              Enterprise Dashboard & Data Services
            </h1>
            <p className="text-lg lg:text-xl text-gray-100 leading-relaxed mb-6">
              Comprehensive real estate analytics and data services for companies. Access custom data compilation, market intelligence, and advanced analytics tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
                onClick={() => setShowCallModal(true)}
              >
                <Phone className="w-5 h-5" />
                <span>Schedule a Call</span>
              </button>
              <Link
                to="/dashboard"
                className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
              Data Services & Analytics for Real Estate Companies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive data compilation, market intelligence, and analytics tools designed for real estate companies building comprehensive databases and making strategic decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Coming Soon
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We're building something amazing! Our enterprise dashboard with comprehensive data services is currently in development 
              and will be available soon. In the meantime, get early access and schedule a call to discuss your data compilation and advisory needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-700">
                <CheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Early Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Be among the first to experience our dashboard</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-saffron-50 to-amber-50 dark:from-saffron-900/20 dark:to-amber-900/20 rounded-xl border border-saffron-200 dark:border-saffron-700">
                <Target className="w-8 h-8 text-saffron-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tailored solutions for your specific needs</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-700">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Priority Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dedicated support team for enterprise clients</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
                onClick={() => setShowCallModal(true)}
              >
                <Phone className="w-5 h-5" />
                <span>Schedule a Call</span>
              </button>
              <Link
                to="/dashboard"
                className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="section-title text-3xl lg:text-4xl text-gray-900 dark:text-white">
              Data Services Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Flexible data services and dashboard packages for real estate companies. Choose the package that best suits your data compilation and analytics needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="card p-8 border-2 border-saffron-200 dark:border-saffron-700 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{tier.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{tier.description}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button 
                    className="w-full py-3 font-bold rounded-xl transition-all duration-300 bg-saffron-400 hover:bg-saffron-500 text-primary-900 border-2 border-saffron-400 shadow-glow-yellow"
                    onClick={() => setShowCallModal(true)}
                  >
                    {tier.name === 'Custom Dashboard Package' ? 'Schedule a Call' : 'Schedule a Call'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4 md:py-6 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom text-center">
          <h2 className="hero-title text-white drop-shadow-2xl mb-6">
            Ready to Get Expert Data Services & Advisory?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Join leading real estate companies who trust BhuvisX for their data compilation and analytics needs. 
            Schedule a call to discuss your requirements and discover how our services can help your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
              onClick={() => setShowCallModal(true)}
            >
              <Phone className="w-5 h-5" />
              <span>Schedule a Consultation Call</span>
            </button>
            <button 
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
              onClick={() => setShowMeetingModal(true)}
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Meeting</span>
            </button>
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

export default EnterpriseDashboardPage;


