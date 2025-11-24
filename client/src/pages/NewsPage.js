import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  TrendingUp, 
  Building2, 
  Newspaper,
  Filter,
  Search,
  Clock,
  User
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  // New: News & Insights Introduction
  const newsIntro = (
    <section className="relative gradient-hero text-white overflow-hidden pt-20 pb-12 min-h-[320px] md:min-h-[380px] flex items-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
      <div className="relative container-custom w-full">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
            News & Research Hub
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 leading-relaxed mb-6">
            Stay ahead with curated news, policy updates, and expert insights from the Indian real estate sector.
          </p>
          <div className="flex justify-center">
            <Link
              to="/newsletter-subscribe"
              className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2"
            >
              <span>Subscribe to Newsletter</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All News', icon: Newspaper },
    { id: 'market-insights', name: 'Market Insights', icon: TrendingUp },
    { id: 'policy', name: 'Policy Updates', icon: Building2 },
    { id: 'infrastructure', name: 'Infrastructure', icon: Building2 },
    { id: 'developer-news', name: 'Developer News', icon: User }
  ];

  useEffect(() => {
    fetchNewsData();
  }, []);

  const filterNews = useCallback(() => {
    let filtered = newsData;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(news => 
        news.category.toLowerCase().replace(' ', '-') === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [newsData, activeCategory, searchTerm]);

  useEffect(() => {
    filterNews();
  }, [filterNews]);

  const fetchNewsData = async () => {
    try {
      const response = await axios.get('/api/news');
      
      // Add more sample news data
      const additionalNews = [
        {
          id: 4,
          title: "Mumbai Real Estate Market Shows Strong Recovery in Q4 2023",
          category: "Market Insights",
          date: "2024-01-08",
          summary: "Mumbai's real estate market witnessed a strong recovery in the fourth quarter of 2023, with residential sales increasing by 25% compared to the previous quarter.",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
        },
        {
          id: 5,
          title: "New Metro Lines to Boost Property Prices in Bangalore",
          category: "Infrastructure",
          date: "2024-01-05",
          summary: "The announcement of new metro lines in Bangalore is expected to boost property prices in the surrounding areas by 15-20% over the next two years.",
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"
        },
        {
          id: 6,
          title: "Pune Emerges as Top Investment Destination for 2024",
          category: "Market Insights",
          date: "2024-01-03",
          summary: "Pune has emerged as the top investment destination for 2024, driven by strong IT sector growth and improved infrastructure connectivity.",
          image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?w=400"
        },
        {
          id: 7,
          title: "Government Announces New Tax Incentives for Real Estate Developers",
          category: "Policy",
          date: "2024-01-01",
          summary: "The government has announced new tax incentives for real estate developers focusing on affordable housing projects and green building initiatives.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
        },
        {
          id: 8,
          title: "DLF Launches Premium Residential Project in Gurgaon",
          category: "Developer News",
          date: "2023-12-28",
          summary: "DLF has launched a premium residential project in Gurgaon with world-class amenities and sustainable design features.",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
        }
      ];
      
      setNewsData([...response.data, ...additionalNews]);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Set fallback data if API fails
      const fallbackNews = [
        {
          id: 1,
          title: "Office Demand in Bengaluru IT Corridor Up 18%",
          category: "Market Insights",
          date: "2024-01-15",
          summary: "Bengaluru's IT corridor continues to show strong demand for office spaces with 18% increase in leasing activity.",
          image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?w=400"
        },
        {
          id: 2,
          title: "Navi Mumbai Affordable Housing Sees Record Bookings",
          category: "Market Insights",
          date: "2024-01-12",
          summary: "Affordable housing projects in Navi Mumbai witness record bookings due to improved connectivity and government incentives.",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
        },
        {
          id: 3,
          title: "Delhi-NCR RERA Tightens Compliance for Builders",
          category: "Policy",
          date: "2024-01-10",
          summary: "RERA authorities in Delhi-NCR announce stricter compliance measures for real estate developers to protect homebuyers.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
        }
      ];
      setNewsData(fallbackNews);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'market insights':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'policy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'infrastructure':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'developer news':
        return 'bg-saffron-100 text-saffron-800 dark:bg-saffron-900/20 dark:text-saffron-400';
      case 'affordable housing':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {newsIntro}
      
      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news and articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Filter:</span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-1 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured News */}
          {filteredNews.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {activeCategory === 'all' ? 'Latest News' : `${categories.find(c => c.id === activeCategory)?.name}`}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                  <article key={news.id} className="card card-hover overflow-hidden">
                    <div className="relative">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                          {news.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(news.date)}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {news.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {news.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1">
                          <span>Read More</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No news found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters to find relevant articles.
              </p>
            </div>
          )}

          {/* Market Insights Section */}
          <div className="card p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Market Insights Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Market Trends</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Residential prices up 8.5% YoY across major cities
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <Building2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Policy Updates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New RERA guidelines for enhanced transparency
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <User className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Developer Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  15 new projects launched in Q4 2023
                </p>
              </div>
            </div>
                     </div>
         </div>
       </section>

       {/* CTA Section */}
       <section className="py-4 md:py-6 gradient-hero text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')] bg-cover bg-center opacity-15"></div>
         <div className="relative container-custom text-center">
           <h2 className="hero-title text-white drop-shadow-2xl mb-6">
             Ready to Transform Your Real Estate Business?
           </h2>
           <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-6">
             Join leading real estate professionals who trust BhuvisX for their data-driven decisions. 
             Get started today and unlock the full potential of your portfolio.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="btn-cta shadow-glow-yellow">
               <span>Access Dashboard</span>
             </button>
             <button className="btn-cta shadow-glow-yellow">
               <span>Try BhuvisAI</span>
             </button>
           </div>
         </div>
       </section>
     </div>
   );
 };

export default NewsPage; 