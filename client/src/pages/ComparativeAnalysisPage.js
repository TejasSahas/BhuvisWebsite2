import React, { useState, useEffect, useCallback } from 'react';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Building2, 
  MapPin, 
  Percent,
  ArrowUp,
  Scale,
  Target,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ComparativeAnalysisPage = () => {
  // New: Comparative Analytics Introduction
  const comparativeIntro = (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-teal-800 text-white overflow-hidden border-b border-gray-200 dark:border-gray-700 py-6 md:py-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-20"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Comparative Analytics: Smarter Real Estate Decisions</h2>
        <p className="text-lg md:text-2xl text-primary-100 max-w-3xl mb-4 drop-shadow">
          In a diverse and rapidly changing market like India, comparing cities, micro-markets, and asset classes is crucial for maximizing returns and minimizing risk. BhuvisX enables you to benchmark locations, evaluate growth drivers, and identify the best opportunities using advanced data models and real-time indicators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-primary-800/80 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-saffron-400 mb-2">Key Benefits</h3>
            <ul className="list-disc pl-4 text-primary-100 space-y-1 text-left">
              <li>Compare rental yields, occupancy rates, and infrastructure across cities.</li>
              <li>Spot emerging investment corridors and high-growth zones.</li>
              <li>Make data-driven decisions for residential, commercial, and mixed-use assets.</li>
            </ul>
          </div>
          <div className="bg-primary-900/80 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-saffron-400 mb-2">How to Use</h3>
            <p className="text-primary-100">Select two cities to compare, and instantly visualize differences in key metrics, infrastructure, and market performance. Use these insights to guide your next investment or development decision.</p>
          </div>
        </div>
      </div>
    </section>
  );
  const [city1, setCity1] = useState('Mumbai');
  const [city2, setCity2] = useState('Delhi');
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  const fetchComparisonData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/compare/${city1}/${city2}`);
      setComparisonData(response.data);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    } finally {
      setLoading(false);
    }
  }, [city1, city2]);

  useEffect(() => {
    if (city1 && city2) {
      fetchComparisonData();
    }
  }, [fetchComparisonData]);

  // Removed price history data for privacy
  const priceHistoryData = [];

  const rentalYieldData = [
    { metric: 'Residential', [city1]: 3.2, [city2]: 4.1 },
    { metric: 'Commercial', [city1]: 8.5, [city2]: 7.8 },
    { metric: 'Retail', [city1]: 6.8, [city2]: 6.2 },
    { metric: 'Industrial', [city1]: 9.2, [city2]: 8.5 }
  ];

  const marketMetricsData = [
    { metric: 'Price Growth', [city1]: 38, [city2]: 22 },
    { metric: 'Rental Yield', [city1]: 6.2, [city2]: 6.8 },
    { metric: 'Occupancy Rate', [city1]: 92, [city2]: 88 },
    { metric: 'Infrastructure', [city1]: 85, [city2]: 78 },
    { metric: 'Job Growth', [city1]: 12, [city2]: 8 },
    { metric: 'Investment Flow', [city1]: 75, [city2]: 65 }
  ];

  const infrastructureData = [
    { project: 'Metro Lines', [city1]: 14, [city2]: 8 },
    { project: 'Airports', [city1]: 2, [city2]: 1 },
    { project: 'Highways', [city1]: 8, [city2]: 6 },
    { project: 'Smart City Projects', [city1]: 12, [city2]: 9 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {comparativeIntro}
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Comparative Intelligence
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              BhuvisX's proprietary comparison engine provides deep market insights, 
              risk assessment, and investment recommendations across cities and markets.
            </p>
          </div>

          {/* City Selection */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
              <select
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Scale className="w-6 h-6 text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 font-medium">vs</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
              <select
                value={city2}
                onChange={(e) => setCity2(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Content */}
      <section className="py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{city1}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Avg Price/sq.ft</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comparisonData?.city1?.avgPrice ? `₹${comparisonData.city1.avgPrice.toLocaleString()}` : "₹68,000"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Appreciation</span>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <ArrowUp className="w-4 h-4" />
                    <span className="font-semibold">{comparisonData?.city1.appreciation || '15.2'}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Rental Yield</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3.2%</span>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{city2}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Avg Price/sq.ft</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comparisonData?.city2?.avgPrice ? `₹${comparisonData.city2.avgPrice.toLocaleString()}` : "₹68,000"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Appreciation</span>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <ArrowUp className="w-4 h-4" />
                    <span className="font-semibold">{comparisonData?.city2.appreciation || '12.8'}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Rental Yield</span>
                  <span className="font-semibold text-gray-900 dark:text-white">4.1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Index Chart */}
          <div className="card p-6 mb-6 flex flex-col items-center justify-center min-h-[150px]">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Price Trends: {comparisonData?.priceTrends ? comparisonData.priceTrends : "Prices have shown steady growth over the past 5 years across major Indian cities."}
            </h3>
          </div>

          {/* Rental Yield Comparison */}
          <div className="card p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Rental Yield Comparison by Property Type
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={rentalYieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={city1} fill="#1e40af" name={city1} />
                <Bar dataKey={city2} fill="#0d9488" name={city2} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Market Metrics Radar Chart */}
          <div className="card p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Market Performance Metrics
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={marketMetricsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar 
                  name={city1} 
                  dataKey={city1} 
                  stroke="#1e40af" 
                  fill="#1e40af" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name={city2} 
                  dataKey={city2} 
                  stroke="#0d9488" 
                  fill="#0d9488" 
                  fillOpacity={0.3} 
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Infrastructure Comparison */}
          <div className="card p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Infrastructure Development Comparison
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={infrastructureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={city1} fill="#1e40af" name={city1} />
                <Bar dataKey={city2} fill="#0d9488" name={city2} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Investment Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Investment Insights - {city1}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Strong price appreciation trend
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    High-end luxury market focus
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-saffron-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Premium location premium
                  </span>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Investment Insights - {city2}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Percent className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Better rental yield potential
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Growing job market
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-saffron-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Infrastructure development
                  </span>
                </div>
              </div>
            </div>
                     </div>
         </div>
       </section>

       {/* Advanced Analytics CTA */}
       <section className="py-4 md:py-6 bg-gradient-to-r from-primary-600 to-teal-600 text-white">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Get Advanced Comparative Intelligence
           </h2>
           <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
             Unlock BhuvisX's advanced comparison tools with multi-city analysis, 
             risk scoring, and personalized investment recommendations.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-xl font-bold mb-3">Multi-City Analysis</h3>
               <p className="text-primary-100 mb-4">Compare up to 5 cities simultaneously with advanced metrics</p>
              <Link to="/buyer-report" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-1">
                Get Buyer Report
              </Link>
             </div>
             
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-xl font-bold mb-3">Risk Assessment</h3>
               <p className="text-primary-100 mb-4">Comprehensive risk analysis with mitigation strategies</p>
              <Link to="/enterprise-dashboard" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-1">
                Access Dashboard
              </Link>
             </div>
             
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-xl font-bold mb-3">Investment Roadmap</h3>
               <p className="text-primary-100 mb-4">5-year investment strategy with timeline and milestones</p>
               <Link to="/investment-roadmap" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-1">
                 Request Roadmap
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

export default ComparativeAnalysisPage; 