import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Users,
  ExternalLink,
  ArrowUp,
  Shield
} from 'lucide-react';
import axios from 'axios';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjectData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);



  // Removed price history data for privacy
  const priceHistoryData = [];

  const rentalYieldData = [
    { year: '2019', yield: 4.2 },
    { year: '2020', yield: 4.8 },
    { year: '2021', yield: 5.2 },
    { year: '2022', yield: 5.8 },
    { year: '2023', yield: project?.rentalYield || 6.2 }
  ];

  const amenitiesData = [
    { name: 'Swimming Pool', value: 85 },
    { name: 'Gym', value: 92 },
    { name: 'Parking', value: 100 },
    { name: 'Security', value: 100 },
    { name: 'Garden', value: 78 },
    { name: 'Club House', value: 88 }
  ];

  const COLORS = ['#1e40af', '#f59e0b', '#0d9488', '#ef4444', '#8b5cf6', '#10b981'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Project not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Project Header */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-teal-800 text-white overflow-hidden border-b border-gray-200 dark:border-gray-700 min-h-[280px] flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
              {project.type}
            </span>
            <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
              RERA Compliant
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{project.name}</h1>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4" />
              <span>{project.developer}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Metrics */}
              <button 
                className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2 mt-1"
                onClick={() => window.location.href='/buyer-report'}
              >
                Get Buyer Report
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get Latest Price Details</p>
              <button 
                className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2"
                onClick={() => window.location.href='/buyer-report'}
              >
                Get Buyer Report
              </button>
              <div className="stat-card p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ROI Since Launch</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.roi}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Percent className="w-8 h-8 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rental Yield</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.rentalYield}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-saffron-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Absorption Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.absorptionRate}%
                    </p>
                  </div>
                </div>
              </div>
              {/* Price Appreciation Chart Removed */}
              <div className="card p-6 flex flex-col items-center justify-center min-h-[150px]">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Want to know about price trends?
                </h3>
                <button className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2">
                  {/* Pricing/stat info or neutral message here */}
                </button>
              </div>
              {/* Rental Yield Trend */}
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Rental Yield History
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rentalYieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Rental Yield']} />
                    <Bar dataKey="yield" fill="#0d9488" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Amenities Rating */}
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Amenities Rating
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={amenitiesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Rating']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Project Details */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Developer</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Property Type</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Launch Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      <button className="btn-secondary bg-transparent border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400 hover:text-primary-900 text-sm px-3 py-1 font-semibold border rounded shadow-glow-yellow">
                        Request Launch Price
                      </button>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">RERA Number</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {project.reraNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Investment Analysis */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Investment Analysis
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800 dark:text-green-300">Strong ROI</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {project.roi}% return since launch indicates strong investment potential.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Percent className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800 dark:text-blue-300">Good Rental Yield</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {project.rentalYield}% rental yield is above market average.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-saffron-50 dark:bg-saffron-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-saffron-600" />
                      <span className="font-semibold text-saffron-800 dark:text-saffron-300">High Demand</span>
                    </div>
                    <p className="text-sm text-saffron-700 dark:text-saffron-400">
                      {project.absorptionRate}% absorption rate shows strong market demand.
                    </p>
                  </div>
                </div>
              </div>

              {/* RERA & Government Links */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Regulatory Information
                </h3>
                <div className="space-y-3">
                  <a 
                    href={`https://rera.gov.in/project/${project.reraNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <Shield className="w-4 h-4" />
                    <span>View RERA Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://housing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Property Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Comparative Analysis */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  vs Nearby Projects
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Project A</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">0.5 km away</p>
                    </div>
                    <div className="text-right">
                      <button className="btn-secondary bg-transparent border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400 hover:text-primary-900 text-sm px-3 py-1 font-semibold border rounded shadow-glow-yellow">
                        Compare Pricing
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Project B</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1.2 km away</p>
                    </div>
                    <div className="text-right">
                      <button className="btn-secondary bg-transparent border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400 hover:text-primary-900 text-sm px-3 py-1 font-semibold border rounded shadow-glow-yellow">
                        Compare Pricing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Intelligence CTA */}
      <section className="py-4 md:py-6 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Get Complete Project Intelligence
           </h2>
           <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
             Unlock <span className="font-bold text-black">BhuvisX</span>' comprehensive project reports with detailed analysis, 
             risk assessment, and investment recommendations for this project.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-2xl font-bold mb-3">Project Deep Dive</h3>
               <p className="text-primary-100 mb-4">Comprehensive analysis with 5-year projections and risk assessment</p>
               <button 
                 className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2 mt-1"
                 onClick={() => window.location.href='/buyer-report'}
               >
                 Get Buyer Report
               </button>
             </div>
             
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-2xl font-bold mb-3">Investment Strategy</h3>
               <p className="text-primary-100 mb-4">Personalized investment strategy with entry/exit recommendations</p>
              <Link to="/enterprise-dashboard" className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-1">
                Access Dashboard
              </Link>
             </div>
             
             <div className="bg-white/10 rounded-xl p-6">
               <h3 className="text-2xl font-bold mb-3">Due Diligence Report</h3>
               <p className="text-primary-100 mb-4">Complete due diligence with legal, financial, and market analysis</p>
               <button className="inline-flex items-center space-x-2 text-base px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200 mt-1">
                 Request Due Diligence
               </button>
             </div>
           </div>
           
           <div className="flex flex-row gap-4 justify-center items-center mt-6">
             <button 
               className="inline-flex items-center space-x-2 text-lg px-8 py-4 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200"
               onClick={() => window.location.href='/buyer-report'}
             >
               Get Buyer Report
             </button>
            <Link to="/enterprise-dashboard" className="inline-flex items-center space-x-2 text-lg px-8 py-4 rounded-lg font-bold shadow-lg transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-primary-900 border-2 border-yellow-400 focus:ring-4 focus:ring-yellow-200">
              Access Dashboard
            </Link>
           </div>
         </div>
       </section>
    </div>
  );
};

export default ProjectDetailsPage;