import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Video, Share2, Image, Send, ArrowRight } from 'lucide-react';

const ContentAutomationPage = () => {
  const features = [
    { title: 'Property content creation', desc: 'Generate listing descriptions, highlights, and brochures from your data.', icon: FileText },
    { title: 'Automated video generation', desc: 'Create short property videos and reels for listings and social.', icon: Video },
    { title: 'Listing promotion', desc: 'Push listings to multiple channels and portals from one place.', icon: Send },
    { title: 'Social media automation', desc: 'Schedule and publish property content across social platforms.', icon: Share2 },
    { title: 'Content distribution', desc: 'Distribute listings and updates to partners and portals automatically.', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[220px] md:min-h-[260px] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative container-custom hero-inner">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
              Content Automation
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed">
              Automate property marketing content so brokers can scale marketing without hiring large teams — from listing videos and social content to distribution across channels.
            </p>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">What We Automate</h2>
            <div className="section-accent" />
            <p className="section-subtitle">We help real estate firms produce and distribute property content at scale using technology and templates.</p>
          </div>
          <div className="mb-6 img-frame">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
              alt="Content creation and digital marketing"
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card p-4 md:p-5 border-l-4 border-saffron-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
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
        <div className="container-custom text-center hero-inner">
          <div className="section-head">
            <h2 className="section-title text-2xl text-gray-900 dark:text-white">Scale your property marketing</h2>
            <div className="section-accent" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/schedule-free-session" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
              Book a Demo
            </Link>
            <Link to="/services" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
              Explore all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentAutomationPage;
