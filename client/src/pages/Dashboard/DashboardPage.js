import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  MapPin, 
  DollarSign, 
  AlertCircle,
  RefreshCw,
  Home
} from 'lucide-react';
import axios from 'axios';

// Dashboard Components
import AreaSelector from './components/AreaSelector';
import PropertyTypeSelector from './components/PropertyTypeSelector';
import PriceWidget from './components/PriceWidget';
import RentalYieldWidget from './components/RentalYieldWidget';
import LocationWidget from './components/LocationWidget';
import BusinessCategoryCard from './components/BusinessCategoryCard';
import RentWidget from './components/RentWidget';

const DashboardPage = () => {
  // State for filters
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedType, setSelectedType] = useState('residential');
  const [areas, setAreas] = useState([]);
  
  // State for API data
  const [coordinates, setCoordinates] = useState(null);
  const [rentalYield, setRentalYield] = useState(null);
  const [avgPrice, setAvgPrice] = useState(null);
  const [avgRent, setAvgRent] = useState(null);
  const [filterResults, setFilterResults] = useState([]);
  const [businessCategoryData, setBusinessCategoryData] = useState(null);
  const [isDefaultBusinessData, setIsDefaultBusinessData] = useState(true);
  
  // State for UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available areas on component mount
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('/api/filters');
        if (response.data && response.data.areas) {
          setAreas(response.data.areas);
          // Set default area if available
          if (response.data.areas.length > 0) {
            setSelectedArea(response.data.areas[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching areas:', err);
        setError('Failed to load areas. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  // Fetch dashboard data when filters change
  useEffect(() => {
    if (!selectedArea || !selectedType) return;
    
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch coordinates
        const coordResponse = await axios.post('/api/coordinates', {
          area: selectedArea
        });
        setCoordinates(coordResponse.data);
        
        // Fetch rental yield
        const rentalResponse = await axios.post('/api/rental-yield', {
          area: selectedArea,
          type: selectedType
        });
        setRentalYield(rentalResponse.data);
        
        // Fetch average price
        const priceResponse = await axios.post('/api/avg-price', {
          area: selectedArea,
          type: selectedType
        });
        setAvgPrice(priceResponse.data);
        
        // Calculate average rent based on price data
        // In a real implementation, this would be a separate API call
        // For now, we'll derive it from the price data
        if (priceResponse.data && priceResponse.data.AvgPricePerSqft) {
          // Typically, monthly rent is around 0.3-0.5% of property value
          // We'll use a factor based on property type
          const rentFactor = selectedType === 'commercial' ? 0.007 : 0.004;
          const avgRentPerSqft = Math.round(priceResponse.data.AvgPricePerSqft * rentFactor);
          
          setAvgRent({
            Area: priceResponse.data.Area,
            PropertyType: priceResponse.data.PropertyType,
            AvgRentPerSqft: avgRentPerSqft
          });
        } else {
          setAvgRent(null);
        }
        
        // Fetch filter results
        const filterResponse = await axios.post('/api/filter-results', {
          area: selectedArea,
          type: selectedType
        });
        setFilterResults(filterResponse.data.results || []);
        
        // Fetch business category data using the area
        try {
          const businessResponse = await axios.get(`/api/business-area?business_area=${selectedArea}`);
          
          if (businessResponse.data && businessResponse.data.categories) {
            // Transform the data format - multiply ROI values by 100 if needed
            const transformedData = {
              categories: businessResponse.data.categories.map(item => {
                // Extract percentage value (remove % if it's a string)
                let percentValue;
                
                // Handle percentage field
                if (item.percentage !== undefined) {
                  percentValue = typeof item.percentage === 'string' 
                    ? parseFloat(item.percentage) 
                    : item.percentage;
                }
                // Handle ROI field if present
                else if (item.roi !== undefined) {
                  percentValue = typeof item.roi === 'string'
                    ? parseFloat(item.roi) * 100
                    : item.roi * 100;
                }
                else {
                  percentValue = 0;
                }
                
                // If the API returns ROI values instead of percentages, multiply by 100
                if (percentValue > 0 && percentValue < 1) {
                  percentValue = percentValue * 100;
                }
                
                // Round to 1 decimal place for consistency
                percentValue = Math.round(percentValue * 10) / 10;
                
                return {
                  ...item,
                  percentage: percentValue
                };
              })
            };
            
            setBusinessCategoryData(transformedData);
            setIsDefaultBusinessData(false);
          } else {
            // Use default data if API response doesn't have the expected format
            setBusinessCategoryData({
              categories: [
                { name: 'IT/Software', percentage: 45 },
                { name: 'Retail', percentage: 28 },
                { name: 'Healthcare', percentage: 15 },
                { name: 'Others', percentage: 12 }
              ]
            });
            setIsDefaultBusinessData(true);
          }
        } catch (err) {
          console.error('Error fetching business category data:', err);
          // Use default data on error
          setBusinessCategoryData({
            categories: [
              { name: 'IT/Software', percentage: 45 },
              { name: 'Retail', percentage: 28 },
              { name: 'Healthcare', percentage: 15 },
              { name: 'Others', percentage: 12 }
            ]
          });
          setIsDefaultBusinessData(true);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [selectedArea, selectedType]);

  // Handle area change
  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };
  
  // Handle property type change
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Handle refresh
  const handleRefresh = () => {
    // Re-fetch data with current filters
    if (selectedArea && selectedType) {
      const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          // Fetch all data again...
          const coordResponse = await axios.post('/api/coordinates', {
            area: selectedArea
          });
          setCoordinates(coordResponse.data);
          
          const rentalResponse = await axios.post('/api/rental-yield', {
            area: selectedArea,
            type: selectedType
          });
          setRentalYield(rentalResponse.data);
          
          const priceResponse = await axios.post('/api/avg-price', {
            area: selectedArea,
            type: selectedType
          });
          setAvgPrice(priceResponse.data);
          
          // Calculate average rent based on price data
          if (priceResponse.data && priceResponse.data.AvgPricePerSqft) {
            const rentFactor = selectedType === 'commercial' ? 0.007 : 0.004;
            const avgRentPerSqft = Math.round(priceResponse.data.AvgPricePerSqft * rentFactor);
            
            setAvgRent({
              Area: priceResponse.data.Area,
              PropertyType: priceResponse.data.PropertyType,
              AvgRentPerSqft: avgRentPerSqft
            });
          } else {
            setAvgRent(null);
          }
          
          const filterResponse = await axios.post('/api/filter-results', {
            area: selectedArea,
            type: selectedType
          });
          setFilterResults(filterResponse.data.results || []);
          
          // Refresh business category data
          try {
            const businessResponse = await axios.get(`/api/business-area?business_area=${selectedArea}`);
            
            if (businessResponse.data && businessResponse.data.categories) {
              // Transform the data format - multiply ROI values by 100 if needed
              const transformedData = {
                categories: businessResponse.data.categories.map(item => {
                  // Extract percentage value (remove % if it's a string)
                  let percentValue;
                
                  // Handle percentage field
                  if (item.percentage !== undefined) {
                    percentValue = typeof item.percentage === 'string' 
                      ? parseFloat(item.percentage) 
                      : item.percentage;
                  }
                  // Handle ROI field if present
                  else if (item.roi !== undefined) {
                    percentValue = typeof item.roi === 'string'
                      ? parseFloat(item.roi) * 100
                      : item.roi * 100;
                  }
                  else {
                    percentValue = 0;
                  }
                  
                  // If the API returns ROI values instead of percentages, multiply by 100
                  if (percentValue > 0 && percentValue < 1) {
                    percentValue = percentValue * 100;
                  }
                  
                  // Round to 1 decimal place for consistency
                  percentValue = Math.round(percentValue * 10) / 10;
                  
                  return {
                    ...item,
                    percentage: percentValue
                  };
                })
              };
              
              setBusinessCategoryData(transformedData);
              setIsDefaultBusinessData(false);
            } else {
              // Use default data if API response doesn't have the expected format
              setBusinessCategoryData({
                categories: [
                  { name: 'IT/Software', percentage: 45 },
                  { name: 'Retail', percentage: 28 },
                  { name: 'Healthcare', percentage: 15 },
                  { name: 'Others', percentage: 12 }
                ]
              });
              setIsDefaultBusinessData(true);
            }
          } catch (err) {
            console.error('Error fetching business category data:', err);
            // Use default data on error
            setBusinessCategoryData({
              categories: [
                { name: 'IT/Software', percentage: 45 },
                { name: 'Retail', percentage: 28 },
                { name: 'Healthcare', percentage: 15 },
                { name: 'Others', percentage: 12 }
              ]
            });
            setIsDefaultBusinessData(true);
          }
        } catch (err) {
          console.error('Error refreshing dashboard data:', err);
          setError('Failed to refresh dashboard data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchDashboardData();
    }
  };

  // Show loading state
  if (loading && !selectedArea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard Header */}
      <section className="relative gradient-hero text-white overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom py-6 md:py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-white drop-shadow-2xl mb-6">
              Pune Property Dashboard
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
              Comprehensive real estate analytics and insights for the Pune region
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <AreaSelector 
                areas={areas} 
                selectedArea={selectedArea} 
                onChange={handleAreaChange} 
              />
              <PropertyTypeSelector 
                selectedType={selectedType} 
                onChange={handleTypeChange} 
              />
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh} 
                className="btn-secondary flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-800 dark:text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Map and Location */}
            <div className="lg:col-span-1">
              <LocationWidget 
                coordinates={coordinates} 
                loading={loading} 
              />
            </div>
            
            {/* Right Column - KPIs and Charts */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <PriceWidget 
                  avgPrice={avgPrice} 
                  loading={loading} 
                />
                <RentalYieldWidget 
                  rentalYield={rentalYield} 
                  propertyType={selectedType}
                  loading={loading} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <RentWidget 
                  avgRent={avgRent} 
                  loading={loading} 
                />
                <div className="hidden md:block"></div>
              </div>
              
              {/* Business Category Analysis Card */}
              <BusinessCategoryCard 
                businessData={businessCategoryData}
                loading={loading}
                isDefault={isDefaultBusinessData}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostics Panel (for any unused API data) */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Diagnostics Panel
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Raw data from API endpoints for development and debugging
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coordinates Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Coordinates API Response
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(coordinates, null, 2) || 'No data available'}
              </pre>
            </div>
            
            {/* Rental Yield Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Rental Yield API Response
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(rentalYield, null, 2) || 'No data available'}
              </pre>
            </div>
            
            {/* Average Price Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Average Price API Response
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(avgPrice, null, 2) || 'No data available'}
              </pre>
            </div>
            
            {/* Average Rent Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Average Rent Data (Derived)
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(avgRent, null, 2) || 'No data available'}
              </pre>
            </div>
            
            {/* Filter Results Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Filter Results API Response
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(filterResults.slice(0, 5), null, 2) || 'No data available'}
                {filterResults.length > 5 && '... (truncated)'}
              </pre>
            </div>
            
            {/* Business Category Data */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Business Category API Response
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-60 text-xs">
                {JSON.stringify(businessCategoryData, null, 2) || 'No data available'}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
