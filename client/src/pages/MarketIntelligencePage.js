import React, { useState } from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import BhuvisAIPage from './BhuvisAIPage';
import DashboardPage from './Dashboard';

const MarketIntelligencePage = () => {
  const [activeTab, setActiveTab] = useState('bhuvisai');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="pt-24 pb-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Market Intelligence
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            AI-driven market intelligence and interactive dashboards for real estate analysis.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('bhuvisai')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'bhuvisai'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              BhuvisAI
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
          </div>
        </div>
      </section>

      <section className="min-h-[60vh]">
        {activeTab === 'bhuvisai' && <BhuvisAIPage />}
        {activeTab === 'dashboard' && <DashboardPage />}
      </section>
    </div>
  );
};

export default MarketIntelligencePage;
