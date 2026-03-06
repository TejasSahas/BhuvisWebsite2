import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

const BrokerJodoPage = () => {
  const useCases = [
    'Discover deals and opportunities from mandate firms and developers',
    'Connect with brokers and channel partners in a structured network',
    'Share and collaborate on listings and mandates',
    'Manage deal flow and opportunities in one place',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[220px] md:min-h-[260px] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative container-custom hero-inner">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2 md:mb-3">
              <Package className="w-3.5 h-3.5" /> Product
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
              BrokerJodo
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed">
              A technology platform that connects brokers and mandate firms with real estate opportunities. Discover deals, collaborate, and share opportunities in one network.
            </p>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-custom">
          <div className="img-frame mb-6">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
              alt="Brokers and professionals collaborating"
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">Who it is for</h2>
            <div className="section-accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="card p-4 md:p-5 border-l-4 border-primary-500">
              <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Brokers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Find mandates and deals from developers and mandate firms. Collaborate with other brokers and grow your pipeline.</p>
            </div>
            <div className="card p-4 md:p-5 border-l-4 border-saffron-500">
              <Briefcase className="w-8 h-8 text-saffron-600 dark:text-saffron-400 mb-2" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Mandate Firms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Share opportunities with a qualified broker network. Manage deal flow and partnerships in one platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-compact bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl text-gray-900 dark:text-white">Use cases</h2>
            <div className="section-accent" />
          </div>
          <ul className="space-y-2 max-w-2xl text-sm">
            {useCases.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-custom text-center">
          <div className="section-head">
            <h2 className="section-title text-2xl text-gray-900 dark:text-white">Get early access</h2>
            <div className="section-accent" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-xl mx-auto text-sm">
            Join the waitlist for BrokerJodo and be among the first to use the platform.
          </p>
          <Link to="/early-access" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
            Learn More and Get Early Access
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BrokerJodoPage;
