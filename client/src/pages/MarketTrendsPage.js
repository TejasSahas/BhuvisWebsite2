import React, { useState, useEffect } from 'react';
// import dashboardScreenshot from '../assets/dashboard-screenshot.png'; // Uncomment and add the file to assets if available
import axios from 'axios';
import {
  Home,
  Briefcase,
  Building2,
  Users,
  MapPin,
  DollarSign,
  Percent,
  ArrowUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const MarketTrendsPage = () => {
  // New: Market Trends Introduction (clean, modern, on-theme)
  const trendsIntro = (
    <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-12 min-h-[320px] md:min-h-[380px] flex items-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
      <div className="relative container-custom w-full">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
            Market Trends & Insights
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 leading-relaxed">
            The Indian real estate market is transforming rapidly, shaped by technology, regulatory reforms, and new investment patterns. BhuvisX delivers the latest trends, forecasts, and actionable intelligence for every segment.
          </p>
        </div>
      </div>
    </section>
  );
    // Enterprise Dashboard for Realtors Section
    const enterpriseDashboardSection = (
      <section className="relative py-6 md:py-8 bg-white border-t border-b border-gray-200 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-saffron-100 rounded-full opacity-20 z-0"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-100 rounded-full opacity-20 z-0"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 z-10">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary-900">Enterprise Dashboard for Realtors</h2>
            <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mb-6">
              Stay ahead with daily and weekly micro-market events, price appreciation insights, and actionable analytics. The Enterprise Dashboard empowers realtors with real-time data, trends, and opportunities—so you can make smarter decisions and deliver more value to your clients.
            </p>
            <div className="w-full flex justify-center md:justify-start">
              <Link
                to="/enterprise-dashboard"
                className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2"
                style={{ boxShadow: '0 4px 24px 0 rgba(251,191,36,0.10)' }}
              >
                Access Dashboard
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80"
                alt="Enterprise Dashboard Preview"
                className="rounded-2xl shadow-2xl w-full border-4 border-saffron-100"
                style={{ minHeight: '340px', objectFit: 'cover' }}
              />
              <div className="absolute bottom-6 right-6 bg-white/80 rounded-full px-6 py-2 shadow-lg text-saffron-600 font-bold text-lg hidden md:block">
                Live Insights
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  const [activeTab, setActiveTab] = useState('residential');
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/api/market-trends');
        let data = response.data;
        // Fallback/mock data for all chart sections if missing or empty
        if (!data?.residential?.rentalYields || !Array.isArray(data.residential.rentalYields) || data.residential.rentalYields.length === 0) {
          data = {
            ...data,
            residential: {
              ...data?.residential,
              avgPrice: data?.residential?.avgPrice || 68000,
              rentalYields: [
                { city: 'Mumbai', yield: 3.8, occupancy: 91 },
                { city: 'Delhi', yield: 3.2, occupancy: 88 },
                { city: 'Bangalore', yield: 4.1, occupancy: 93 },
                { city: 'Pune', yield: 3.5, occupancy: 90 },
                { city: 'Hyderabad', yield: 3.9, occupancy: 92 }
              ]
            }
          };
        }
        if (!data?.commercial?.rentalYields || !Array.isArray(data.commercial.rentalYields) || data.commercial.rentalYields.length === 0) {
          data = {
            ...data,
            commercial: {
              ...data?.commercial,
              rentalYields: [
                { city: 'Mumbai', cbd: 8.2, suburban: 7.1 },
                { city: 'Delhi', cbd: 7.8, suburban: 6.9 },
                { city: 'Bangalore', cbd: 8.5, suburban: 7.5 },
                { city: 'Pune', cbd: 7.9, suburban: 7.0 },
                { city: 'Hyderabad', cbd: 8.0, suburban: 7.2 }
              ]
            }
          };
        }
        if (!data?.affordable?.avgPrice) {
          data = {
            ...data,
            affordable: {
              ...data?.affordable,
              avgPrice: 32000
            }
          };
        }
        if (!data?.emergingMarkets || !Array.isArray(data.emergingMarkets) || data.emergingMarkets.length === 0) {
          data = {
            ...data,
            emergingMarkets: [
              { name: 'Wakad', city: 'Pune', growth: 18, type: 'Residential' },
              { name: 'Whitefield', city: 'Bangalore', growth: 15, type: 'Commercial' },
              { name: 'Gachibowli', city: 'Hyderabad', growth: 14, type: 'IT/ITES' },
              { name: 'Thane', city: 'Mumbai', growth: 13, type: 'Mixed Use' },
              { name: 'Noida Ext.', city: 'Delhi NCR', growth: 12, type: 'Affordable' }
            ]
          };
        }
        setMarketData(data);
      } catch (error) {
        // Fallback/mock data if API fails
        setMarketData({
          residential: {
            avgPrice: 68000,
            rentalYields: [
              { city: 'Mumbai', yield: 3.8, occupancy: 91 },
              { city: 'Delhi', yield: 3.2, occupancy: 88 },
              { city: 'Bangalore', yield: 4.1, occupancy: 93 },
              { city: 'Pune', yield: 3.5, occupancy: 90 },
              { city: 'Hyderabad', yield: 3.9, occupancy: 92 }
            ]
          },
          commercial: {
            rentalYields: [
              { city: 'Mumbai', cbd: 8.2, suburban: 7.1 },
              { city: 'Delhi', cbd: 7.8, suburban: 6.9 },
              { city: 'Bangalore', cbd: 8.5, suburban: 7.5 },
              { city: 'Pune', cbd: 7.9, suburban: 7.0 },
              { city: 'Hyderabad', cbd: 8.0, suburban: 7.2 }
            ]
          },
          affordable: {
            avgPrice: 32000
          },
          emergingMarkets: [
            { name: 'Wakad', city: 'Pune', growth: 18, type: 'Residential' },
            { name: 'Whitefield', city: 'Bangalore', growth: 15, type: 'Commercial' },
            { name: 'Gachibowli', city: 'Hyderabad', growth: 14, type: 'IT/ITES' },
            { name: 'Thane', city: 'Mumbai', growth: 13, type: 'Mixed Use' },
            { name: 'Noida Ext.', city: 'Delhi NCR', growth: 12, type: 'Affordable' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const tabs = [
    { id: 'residential', name: 'Residential', icon: Home },
    { id: 'commercial', name: 'Commercial', icon: Briefcase },
    { id: 'affordable', name: 'Affordable Housing', icon: Building2 },
    { id: 'coliving', name: 'Co-Living/Shared', icon: Users },
  ];

  // Updated color palette: blue, yellow, teal, orange, purple
  const COLORS = ['#1e40af', '#fbbf24', '#0d9488', '#f59e0b', '#a78bfa'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {trendsIntro}
      {/* Tabs */}
      
      {/* Tabs */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'residential' && (
            <div className="space-y-6">
              {/* Removed Average Residential Price section as requested */}
              {enterpriseDashboardSection}

              {/* Rental Yields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Rental Yields by City
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={marketData?.residential.rentalYields}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="yield" fill="#fbbf24" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="card p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Occupancy Rates
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={marketData?.residential.rentalYields}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="occupancy" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commercial' && (
            <div className="space-y-6">
              {/* Commercial Rental Yields */}
              <div className="card p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Commercial Rental Yields Comparison
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={marketData?.commercial.rentalYields}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cbd" fill="#fbbf24" name="CBD" />
                    <Bar dataKey="suburban" fill="#1e40af" name="Suburban" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Market Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Office Space Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'IT/ITES', value: 45 },
                          { name: 'BFSI', value: 25 },
                          { name: 'Manufacturing', value: 15 },
                          { name: 'Others', value: 15 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        // Use purple for pie default
                        fill="#a78bfa"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="card p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Vacancy Rates Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { year: '2019', vacancy: 12 },
                      { year: '2020', vacancy: 18 },
                      { year: '2021', vacancy: 15 },
                      { year: '2022', vacancy: 10 },
                      { year: '2023', vacancy: 8 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="vacancy" stroke="#fbbf24" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'affordable' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Affordable Housing Market Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="stat-card p-6 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                      </div>
                    </div>
                  </div>
                  <div className="stat-card p-6 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Price</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{marketData?.affordable?.avgPrice ? `₹${marketData.affordable.avgPrice.toLocaleString()}` : "₹32,000/sq.ft"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="stat-card p-6 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Percent className="w-8 h-8 text-saffron-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">+15.3%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coliving' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Co-Living Market Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Market Size Growth
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { year: '2019', size: 100 },
                        { year: '2020', size: 120 },
                        { year: '2021', size: 180 },
                        { year: '2022', size: 250 },
                        { year: '2023', size: 320 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="size" stroke="#fbbf24" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Average Rent by City
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { city: 'Mumbai', rent: 25000 },
                        { city: 'Delhi', rent: 18000 },
                        { city: 'Bangalore', rent: 15000 },
                        { city: 'Pune', rent: 12000 },
                        { city: 'Hyderabad', rent: 11000 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="rent" fill="#fbbf24" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emerging Markets Section */}
          <div className="card p-6 mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Top 5 Emerging Micro-Markets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {marketData?.emergingMarkets.map((market, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20 rounded-xl border border-primary-200 dark:border-primary-700">
                  <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{market.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{market.city}</p>
                  <div className="flex items-center justify-center space-x-1 text-green-600 dark:text-green-400">
                    <ArrowUp className="w-4 h-4" />
                    <span className="font-semibold">{market.growth}%</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{market.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Watch Section */}
          <div className="card p-6 mt-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Policy Watch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">RERA Updates</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  New compliance requirements for developers announced. Enhanced transparency measures implemented.
                </p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Smart Cities Mission</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  15 new cities added to Smart Cities Mission. Infrastructure development projects accelerated.
                </p>
              </div>
              <div className="p-6 bg-saffron-50 dark:bg-saffron-900/20 rounded-lg border border-saffron-200 dark:border-saffron-700">
                <h4 className="font-semibold text-saffron-800 dark:text-saffron-300 mb-2">Infrastructure Projects</h4>
                <p className="text-sm text-saffron-700 dark:text-saffron-400">
                  Metro rail expansion in 8 cities. Expressway projects worth ₹50,000 crore approved.
                </p>
              </div>
            </div>
          </div>

          {/* Market Insights Section */}
          <div className="card p-6 mt-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Market Insights & Predictions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2025 Market Outlook</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></span>
                      <span>Residential prices expected to grow 8-12% in Tier-1 cities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></span>
                      <span>Commercial real estate recovery in Q2 2025</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></span>
                      <span>Affordable housing demand surge in Tier-2 cities</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Investment Hotspots</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">Mumbai</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+15% Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">Bangalore</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+18% Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">Pune</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+12% Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">Hyderabad</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+14% Growth</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20 rounded-xl border border-saffron-200 dark:border-saffron-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Market Drivers</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Infrastructure development and connectivity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">IT/ITES sector expansion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Government policy reforms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Foreign direct investment</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Risk Factors</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Interest rate fluctuations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Economic slowdown risks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Regulatory changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Supply-demand imbalances</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
         </div>
       </section>

       {/* Premium Intelligence CTA */}
       <section className="py-4 md:py-6 gradient-hero text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Get Exclusive Market Intelligence
           </h2>
           <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
             Unlock BhuvisX's premium market reports with AI-powered predictions, 
             custom portfolio analysis, and exclusive investment opportunities.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-2xl font-bold mb-3">AI-Powered Predictions</h3>
               <p className="text-primary-100 mb-4">Get 12-month market forecasts with 95% accuracy using our proprietary AI models</p>
              <Link to="/buyer-report" className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2">
                Get Buyer Report
              </Link>
             </div>
             
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-2xl font-bold mb-3">Portfolio Optimization</h3>
               <p className="text-primary-100 mb-4">Personalized investment recommendations based on your risk profile and goals</p>
              <Link to="/enterprise-dashboard" className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2">
                Access Dashboard
              </Link>
             </div>
           </div>
           
           <div className="flex flex-row gap-4 justify-center items-center mt-6">
             {/* Removed duplicate CTA buttons to avoid repetition */}
           </div>
         </div>
       </section>
     </div>
   );
};

export default MarketTrendsPage; 