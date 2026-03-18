import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Target, GitBranch, Users, BarChart3, ChevronDown } from 'lucide-react';

const FlowNode = ({ children, className = '' }) => (
  <div className={`rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 border-2 border-orange-400 shadow min-w-[140px] ${className}`}>
    {children}
  </div>
);

const Connector = () => (
  <div className="flex justify-center py-1" aria-hidden="true">
    <ChevronDown className="w-5 h-5 text-orange-400" strokeWidth={2.5} />
  </div>
);

const LeadAutomationPage = () => {
  const features = [
    { title: 'Lead generation systems', desc: 'Capture leads from portals, ads, and your website with automated forms and routing.', icon: Target },
    { title: 'Lead routing', desc: 'Route leads to the right team or agent based on source, type, and qualification.', icon: GitBranch },
    { title: 'CRM workflows', desc: 'Automate follow-ups, status updates, and pipeline stages inside your CRM.', icon: BarChart3 },
    { title: 'Sales funnel automation', desc: 'Nurture leads through defined stages with triggered emails and tasks.', icon: Zap },
    { title: 'Real estate ad funnels', desc: 'Landing pages and ad campaigns that capture and qualify leads automatically.', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-8 md:pb-10 min-h-[220px] md:min-h-[260px] flex items-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative container-custom hero-inner">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl mb-2 md:mb-3">
              Lead Automation
            </h1>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed">
              Automated systems to generate and capture real estate leads across multiple channels — from ad funnels and landing pages to lead routing and CRM integration.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Automate - flowchart */}
      <section className="section-compact bg-white dark:bg-gray-800" aria-label="Lead automation flowchart">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-4xl text-gray-900 dark:text-white">Where We Automate</h2>
            <div className="section-accent" />
            <p className="section-subtitle">
              Visual map of how leads move from content, portals, and outbound into CRM, ranking, and automated follow-ups.
            </p>
          </div>
          <div className="img-frame max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900">
            <img
              src="/images/lead-automation-flow.png"
              alt="Lead automation flowchart showing automated content creation, digital marketing, social media, portals, CRM and automated follow-ups"
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback instanceof HTMLElement) {
                  fallback.classList.remove('hidden');
                }
              }}
            />
            <div className="hidden p-6 text-center text-gray-600 dark:text-gray-300">
              <p className="font-semibold mb-2">Lead automation flowchart</p>
              <p className="text-sm">
                Automated Content Creation → Digital Marketing / Social Media → Website → CTA → Quick Feedback Automation → CRM → Requirement gathering &amp; Automated followups.
                Portals (Magicbricks, 99acres, NoBroker) feed into Lead quality ranking. Direct Inbound and Automation Out bounds both drive Automated followups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container-custom">
          <div className="section-head">
            <h2 className="section-title text-2xl md:text-3xl text-gray-900 dark:text-white">What We Automate</h2>
            <div className="section-accent" />
            <p className="section-subtitle">We help real estate firms set up end-to-end lead pipelines so your team can focus on closing deals, not manual data entry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card p-4 md:p-5 border-l-4 border-primary-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
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
          <h2 className="section-title text-2xl text-gray-900 dark:text-white mb-3">
            Ready to automate your lead pipeline?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enquiry" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
              Book a Demo
            </Link>
            <Link to="/enquiry" className="btn-cta shadow-glow-yellow inline-flex items-center gap-2">
              Request a Call
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Explore all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadAutomationPage;
