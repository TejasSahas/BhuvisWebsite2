import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  FileText,
  Database,
  ArrowRight,
  Phone,
  Calendar,
  CheckCircle,
  Users,
  Briefcase,
  HardHat,
} from 'lucide-react';

const HERO_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200";

const ServicesPage = () => {
  const servicePillars = [
    {
      title: 'Lead Automation',
      path: '/services/lead-automation',
      icon: Zap,
      desc: 'Automated systems to generate and capture real estate leads across multiple channels.',
      items: ['Ad funnels', 'Landing pages', 'Lead routing', 'CRM integration'],
      borderClass: 'border-primary-500',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      title: 'Content Automation',
      path: '/services/content-automation',
      icon: FileText,
      desc: 'Automate property marketing content so brokers can scale without hiring large teams.',
      items: ['Listing videos', 'Social media content', 'Property reels', 'Listing distribution'],
      borderClass: 'border-saffron-500',
      iconBg: 'bg-saffron-100 dark:bg-saffron-900/30',
      iconColor: 'text-saffron-600 dark:text-saffron-400',
    },
    {
      title: 'Data Consulting',
      path: '/services/data-consulting',
      icon: Database,
      desc: 'Advanced real estate analytics and market intelligence for decision-making.',
      items: ['Micro-market insights', 'Investment analysis', 'Custom dashboards', 'BhuvisAI and Dashboard'],
      borderClass: 'border-teal-500',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
  ];

  const whoWeServe = [
    { title: 'Channel Partners', icon: Users, desc: 'Automate lead handoffs and reporting at scale.' },
    { title: 'Mandate Firms', icon: Briefcase, desc: 'Streamline deal flow and broker coordination.' },
    { title: 'Brokers', icon: Briefcase, desc: 'Capture and nurture leads with automated follow-ups.' },
    { title: 'Builders / Developers', icon: HardHat, desc: 'Generate and qualify leads for sales pipelines.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[240px] md:min-h-[280px] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="relative container-custom text-center w-full hero-inner">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
            Our Services
          </h1>
          <p className="text-base md:text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6">
            We help real estate firms automate lead generation, content creation, and sales processes using technology. One place for all your automation and data needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/schedule-free-session" className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Free Session
            </Link>
            <Link to="/request-call" className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Request a Call
            </Link>
          </div>
        </div>
      </section>

      {/* What we offer - three pillars */}
      <section className="section-compact bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">What We Automate</h2>
            <div className="section-accent" />
            <p className="section-subtitle">From lead capture to content and data — we cover the full stack for real estate firms.</p>
          </div>
          <div className="img-frame max-w-4xl mx-auto mb-6">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
              alt="Real estate technology and automation"
              className="w-full h-44 md:h-56 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {servicePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={i}
                  to={pillar.path}
                  className={`card p-5 md:p-6 hover:shadow-xl transition-all border-l-4 ${pillar.borderClass} group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{pillar.desc}</p>
                  <ul className="space-y-1 mb-4">
                    {pillar.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
                        <CheckCircle className={`w-4 h-4 ${pillar.iconColor} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-compact bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Who We Serve</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Our automation and data services are built for the full real estate ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card p-4 md:p-5 text-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-compact gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="relative container-custom text-center hero-inner">
          <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-sm md:text-base text-gray-100 max-w-2xl mx-auto mb-4 md:mb-6">
            Schedule a call or session to discuss your requirements and see how our services can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link to="/schedule-free-session" className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Free Session
            </Link>
            <Link to="/request-call" className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Request a Call
            </Link>
            <Link to="/custom-dashboard-enquiry" className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2">
              Custom Dashboard Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
