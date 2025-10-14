import React from 'react';
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
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnterpriseDashboardPage = () => {
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
      <section className="relative gradient-hero text-white overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom py-6 md:py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-white drop-shadow-2xl mb-6">
              Enterprise Dashboard
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
              Unlock the power of enterprise-grade real estate analytics with our comprehensive dashboard. 
              Track portfolios, analyze markets, and make data-driven decisions with advanced tools designed for professionals.
            </p>
            <div className="flex justify-center">
              <Link to="/early-access" className="btn-cta shadow-glow-yellow">
                <span>Get Early Access</span>
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
              Powerful Features for Real Estate Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your real estate portfolio and stay ahead of market trends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Coming Soon
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We're building something amazing! Our enterprise dashboard is currently in development 
              and will be available soon. In the meantime, get early access and exclusive updates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 bg-gradient-to-br from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20 rounded-xl border border-primary-200 dark:border-primary-700">
                <CheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Early Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Be among the first to experience our dashboard</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-saffron-50 to-amber-50 dark:from-saffron-900/20 dark:to-amber-900/20 rounded-xl border border-saffron-200 dark:border-saffron-700">
                <Target className="w-8 h-8 text-saffron-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tailored solutions for your specific needs</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200 dark:border-teal-700">
                <Shield className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Priority Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dedicated support team for enterprise clients</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/early-access" className="btn-cta shadow-glow-yellow">
                <span>Get Early Access</span>
              </Link>
              <Link to="/buyer-report" className="btn-cta shadow-glow-yellow">
                <span>Try Buyer Reports</span>
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
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Flexible dashboard packages to suit your business needs
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
                  <button className="w-full py-3 font-bold rounded-xl transition-all duration-300 bg-saffron-400 hover:bg-saffron-500 text-primary-900 border-2 border-saffron-400 shadow-glow-yellow">
                    {tier.name === 'Custom Dashboard Package' ? 'Contact Sales' : 'Get Started'}
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
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Join leading real estate professionals who trust BhuvisX for their data-driven decisions. 
            Get started today and unlock the full potential of your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-cta shadow-glow-yellow">
              <span>Access Dashboard</span>
            </Link>
            <Link to="/bhuvisaipage" className="btn-cta shadow-glow-yellow">
              <span>Try BhuvisAI</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseDashboardPage;


