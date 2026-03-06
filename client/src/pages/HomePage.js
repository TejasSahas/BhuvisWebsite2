import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Zap,
  FileText,
  Database,
  BarChart3,
  Sparkles,
  Package,
  Calendar,
  Phone,
  ArrowRight,
  Users,
  Briefcase,
  HardHat,
} from 'lucide-react';

const HomePage = () => {
  const automationStack = [
    {
      title: 'Lead Automation',
      description: 'Automated systems to generate and capture real estate leads across multiple channels.',
      icon: Zap,
      items: ['Ad funnels', 'Landing pages', 'Lead routing', 'CRM integration'],
      link: '/services/lead-automation',
      borderClass: 'border-primary-500',
      bgClass: 'bg-primary-100 dark:bg-primary-900/30',
      iconClass: 'text-primary-600 dark:text-primary-400',
    },
    {
      title: 'Content Automation',
      description: 'Automate property marketing content.',
      icon: FileText,
      items: ['Listing videos', 'Social media content', 'Property reels', 'Listing distribution'],
      link: '/services/content-automation',
      borderClass: 'border-saffron-500',
      bgClass: 'bg-saffron-100 dark:bg-saffron-900/30',
      iconClass: 'text-saffron-600 dark:text-saffron-400',
    },
    {
      title: 'Data Consulting',
      description: 'Advanced real estate analytics and market intelligence.',
      icon: Database,
      items: ['Micro-market insights', 'Investment analysis', 'Custom dashboards'],
      link: '/services/data-consulting',
      borderClass: 'border-teal-500',
      bgClass: 'bg-teal-100 dark:bg-teal-900/30',
      iconClass: 'text-teal-600 dark:text-teal-400',
    },
  ];

  const whoWeWorkWith = [
    { title: 'Channel Partners', icon: Users, desc: 'Automate lead handoffs and reporting so you can scale partnerships.' },
    { title: 'Mandate Firms', icon: Building2, desc: 'Streamline deal flow and broker coordination with workflow automation.' },
    { title: 'Brokers', icon: Briefcase, desc: 'Capture more leads and nurture them with automated follow-ups and content.' },
    { title: 'Builders / Developers', icon: HardHat, desc: 'Generate and qualify leads, and keep sales pipelines full with technology.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Section 1 – Hero */}
      <section className="relative gradient-hero text-white overflow-hidden pt-24 pb-14 md:pt-28 md:pb-20 min-h-[420px] md:min-h-[560px] flex items-center">
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative container-custom hero-inner w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              Real Estate Technology & Automation
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-[1.15] mb-5 md:mb-6">
              Automate Lead Generation.<br className="hidden sm:block" /> Scale Deals. Close Faster.
            </h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-2 max-w-2xl font-medium">
              We turn manual sales work into automated pipelines — so your team spends time closing, not chasing.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 md:mb-10 max-w-2xl">
              Lead capture, content creation, and market intelligence in one stack. Built for brokers, mandate firms, and developers who want to grow without adding headcount.
            </p>

            {/* What we do – punchy strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="w-10 h-10 rounded-lg bg-primary-400/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">Lead Automation</p>
                  <p className="text-white/80 text-xs md:text-sm mt-0.5">Capture, route & nurture leads from portals, ads & website.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="w-10 h-10 rounded-lg bg-saffron-400/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">Content Automation</p>
                  <p className="text-white/80 text-xs md:text-sm mt-0.5">Listing videos, social content & distribution at scale.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="w-10 h-10 rounded-lg bg-teal-400/30 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">Data & Intelligence</p>
                  <p className="text-white/80 text-xs md:text-sm mt-0.5">Market insights, dashboards & AI for better decisions.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Link
                to="/schedule-free-session"
                className="btn-cta shadow-glow-yellow text-base md:text-lg px-8 py-4 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book a Demo
              </Link>
              <Link
                to="/services"
                className="btn-cta shadow-glow-yellow text-base px-8 py-4 flex items-center justify-center gap-2"
              >
                Explore Automation Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 – Process Automation Visual */}
      <section className="section-compact bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">
              Processes We Automate for Real Estate Firms
            </h2>
            <div className="section-accent" />
            <p className="section-subtitle">
              We automate the most time-consuming parts of real estate sales operations — from lead generation and content creation to lead nurturing and conversion workflows.
            </p>
          </div>
          <div className="max-w-5xl mx-auto mt-4 md:mt-6">
            <div className="img-frame border-2 border-orange-400 bg-gray-50 dark:bg-gray-900">
              <img
                src="/images/lead-automation-workflow.png"
                alt="Real estate lead generation and sales pipeline automation workflow"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden p-8 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-orange-400 rounded-xl m-4">
                <p className="font-medium">Automation workflow diagram</p>
                <p className="text-sm mt-2">Lead sources → Lead quality ranking → Quick feedback → CRM → Requirement gathering → Automated followups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 – Our Automation Stack */}
      <section className="section-compact bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Our Automation Stack</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Lead, content, and data — one stack for your real estate operations.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            {automationStack.map((stack, i) => {
              const Icon = stack.icon;
              return (
                <Link
                  key={i}
                  to={stack.link}
                  className={`card p-5 md:p-6 hover:shadow-xl transition-all duration-300 border-l-4 ${stack.borderClass} group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${stack.bgClass} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${stack.iconClass}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{stack.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{stack.description}</p>
                  <ul className="space-y-1 mb-4">
                    {stack.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium text-sm">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 – Who We Work With */}
      <section className="section-compact bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Who We Work With</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Brokers, mandate firms, developers, and channel partners — we automate for the full ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-6">
            {whoWeWorkWith.map((item, i) => {
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

      {/* Section 5 – Products */}
      <section className="section-compact bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Products</h2>
            <div className="section-accent" />
            <p className="section-subtitle">Technology built for real estate networks and deal flow.</p>
          </div>
          <div className="max-w-2xl mx-auto mt-4 md:mt-6">
            <div className="card p-5 md:p-6 border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 md:w-7 md:h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">BrokerJodo</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
                    A technology platform that connects brokers and mandate firms with real estate opportunities.
                  </p>
                  <Link to="/products/brokerjodo" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 – Market Intelligence */}
      <section className="section-compact bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Market Intelligence</h2>
            <div className="section-accent" />
            <p className="section-subtitle">AI and dashboards for real estate analytics and decision-making.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mt-4 md:mt-6">
            <div className="card p-4 md:p-5 border-l-4 border-primary-500">
              <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">BhuvisAI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">AI-driven real estate market intelligence.</p>
            </div>
            <div className="card p-4 md:p-5 border-l-4 border-saffron-500">
              <BarChart3 className="w-8 h-8 text-saffron-600 dark:text-saffron-400 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Interactive data dashboards for real estate analysis.</p>
            </div>
          </div>
          <div className="text-center mt-4 md:mt-6">
            <Link to="/services/data-consulting" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
              Explore Market Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7 – Call To Action */}
      <section className="section-compact gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative container-custom text-center hero-inner">
          <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
            Enable Technology Inside Your Real Estate Business
          </h2>
          <p className="text-sm md:text-base text-gray-100 mb-4 md:mb-6 max-w-2xl mx-auto">
            Book a consultation or schedule a demo to see how automation can work for your firm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/request-call"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Book Consultation
            </Link>
            <Link
              to="/schedule-free-session"
              className="btn-cta shadow-glow-yellow flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
