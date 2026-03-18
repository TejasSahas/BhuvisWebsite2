import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, BarChart3, MapPin, Building2, ArrowRight, Sparkles } from 'lucide-react';
import BhuvisAIPage from './BhuvisAIPage';
import DashboardPage from './Dashboard';

const DataConsultingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    { title: 'Market data analysis', desc: 'Structured analysis of prices, rents, and trends across micro-markets.', icon: BarChart3 },
    { title: 'Micro-market insights', desc: 'Locality-level data for investment and pricing decisions.', icon: MapPin },
    { title: 'Developer intelligence', desc: 'Project-level and developer-level analytics for mandates and channel partners.', icon: Building2 },
    { title: 'Custom dashboards', desc: 'Interactive dashboards built for your team and use cases.', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[220px] md:min-h-[260px] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative container-custom w-full hero-inner">
          <div className="max-w-3xl mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
              Data Consulting
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed">
              Advanced real estate analytics and market intelligence — micro-market insights, investment analysis, and custom dashboards to support your automation and decision-making.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-white/20 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('bhuvisai')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'bhuvisai'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              BhuvisAI
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'overview' && (
        <>
          <section className="section-compact">
            <div className="container-custom">
              <div className="section-head">
                <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">What We Offer</h2>
                <div className="section-accent" />
                <p className="section-subtitle">Data consulting is the analytics layer that supports lead and content automation with accurate market data.</p>
              </div>
              <div className="mb-6 img-frame">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                  alt="Analytics and data dashboards"
                  className="w-full h-48 md:h-56 object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {features.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="card p-4 md:p-5 border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section-compact bg-white dark:bg-gray-800">
            <div className="container-custom">
              <div className="card p-5 md:p-6 border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  Access our analytics dashboard for real estate analysis — price trends, rental yields, and micro-market data.
                </p>
                <Link
                  to="/dashboard"
                  className="btn-cta shadow-glow-yellow inline-flex items-center gap-2"
                >
                  Open Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="section-compact">
            <div className="container-custom text-center">
              <div className="section-head">
                <h2 className="section-title text-2xl text-gray-900 dark:text-white">Need custom analytics or dashboards?</h2>
                <div className="section-accent" />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/enquiry" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
                  Custom Dashboard Enquiry
                </Link>
                <Link to="/enquiry" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
                  Book a Demo
                </Link>
                <Link to="/services" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
                  Explore all services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'bhuvisai' && (
        <section className="min-h-[60vh]">
          <BhuvisAIPage />
        </section>
      )}

      {activeTab === 'dashboard' && (
        <section className="min-h-[60vh]">
          <DashboardPage />
        </section>
      )}
    </div>
  );
};

export default DataConsultingPage;
