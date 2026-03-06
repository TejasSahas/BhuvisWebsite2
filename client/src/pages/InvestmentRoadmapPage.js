import React from 'react';

const InvestmentRoadmapPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Investment Roadmap</h1>
      <p className="text-gray-700 mb-6">We’re preparing a tailored 5-year investment roadmap template with milestones, risk checkpoints, and KPI tracking. Contact us to customize this roadmap for your portfolio.</p>
      <div className="flex gap-3">
        <a href="mailto:info@realestateanalytics.in" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200">Contact Us</a>
        <a href="/comparative-analysis" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-white text-primary-900 border-2 border-gray-200 focus:ring-4 focus:ring-gray-200">Back to Comparative</a>
      </div>
    </div>
  );
};

export default InvestmentRoadmapPage;


