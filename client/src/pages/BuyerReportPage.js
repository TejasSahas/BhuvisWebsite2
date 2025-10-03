import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerReportPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-teal-800 text-white overflow-hidden border-b border-gray-200 dark:border-gray-700 py-6 md:py-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 z-10">
          {/* Left: Report Overview */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Comprehensive Buyer Reports</h1>
            <p className="text-lg md:text-2xl text-primary-100 max-w-2xl mb-6 drop-shadow">
              Get personalized, data-driven insights for your next property purchase. Our Buyer Reports combine city analytics, micro-market data, location images, area qualities, new projects, prices, amenities, connectivity, and upcoming infrastructure—all tailored to your requirements.
            </p>
            <ul className="list-disc pl-6 text-primary-100 space-y-2 text-base">
              <li>Suggestions based on your requirements</li>
              <li>City & micro-market analytics</li>
              <li>Location images & area qualities</li>
              <li>New projects, prices, amenities</li>
              <li>Nearby metro/bus stops, airport distance</li>
              <li>Upcoming infrastructure projects</li>
              <li>And much more…</li>
            </ul>
          </div>
          {/* Right: Login Container (copied from LoginPage) */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 border border-primary-100 dark:border-primary-800 backdrop-blur-md">
              <h2 className="text-2xl font-extrabold text-center mb-2 text-primary-700 dark:text-primary-300 tracking-tight">Sign in to Access Buyer Reports</h2>
              <form className="space-y-6 w-full">
                <div className="flex flex-col">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
                  <input type="email" required className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Password</label>
                  <input type="password" required className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
                </div>
                <button type="submit" className="w-full py-3 inline-flex items-center justify-center space-x-2 font-bold rounded-xl shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-2">Login</button>
              </form>
              <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                <span>New to BhuvisX? <a href="/register" className="text-primary-600 hover:underline">Register here</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Structure Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-white mb-6 text-center">Buyer Reports: Tiered Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tier 1 */}
            <div className="bg-primary-50 dark:bg-primary-900/40 rounded-xl shadow p-8">
              <h3 className="text-2xl font-bold text-primary-800 dark:text-saffron-400 mb-4">Tier 1: Essential Analytics</h3>
              <ul className="list-disc pl-6 text-primary-900 dark:text-primary-100 space-y-2 text-base mb-4">
                <li>For residential & commercial buyers</li>
                <li>City & locality analytics</li>
                <li>Price trends, new launches, area qualities</li>
                <li>Connectivity, amenities, infrastructure</li>
                <li>Location images & project highlights</li>
              </ul>
              <div className="text-primary-700 dark:text-primary-200 text-sm">Perfect for end consumers seeking a holistic view of their target area.</div>
            </div>
            {/* Tier 2 */}
            <div className="bg-primary-50 dark:bg-primary-900/40 rounded-xl shadow p-8">
              <h3 className="text-2xl font-bold text-primary-800 dark:text-saffron-400 mb-4">Tier 2: Advanced & Custom Analytics</h3>
              <ul className="list-disc pl-6 text-primary-900 dark:text-primary-100 space-y-2 text-base mb-4">
                <li>For commercial buyers & enterprises</li>
                <li>Customizable reports for specific projects/areas</li>
                <li>Detailed micro-market segmentation</li>
                <li>Competitor benchmarking & risk analysis</li>
                <li>Specialized data visualizations</li>
              </ul>
              <div className="text-primary-700 dark:text-primary-200 text-sm">Ideal for businesses and investors needing deep, tailored insights.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerReportPage;
