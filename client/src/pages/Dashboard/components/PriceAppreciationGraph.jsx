import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const PriceAppreciationGraph = ({ selectedArea, selectedType, loading }) => {
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDefaultData, setIsDefaultData] = useState(false);

  // Default data for when API fails or no data is available
  const defaultData = [
    { quarter: 'Q1 2020', price: 18.5 },
    { quarter: 'Q2 2020', price: 19.2 },
    { quarter: 'Q3 2020', price: 19.8 },
    { quarter: 'Q4 2020', price: 20.3 },
    { quarter: 'Q1 2021', price: 21.1 },
    { quarter: 'Q2 2021', price: 21.9 },
    { quarter: 'Q3 2021', price: 22.5 },
    { quarter: 'Q4 2021', price: 23.2 },
    { quarter: 'Q1 2022', price: 24.1 },
    { quarter: 'Q2 2022', price: 25.0 },
    { quarter: 'Q3 2022', price: 25.8 },
    { quarter: 'Q4 2022', price: 26.5 },
    { quarter: 'Q1 2023', price: 27.3 },
    { quarter: 'Q2 2023', price: 28.1 },
    { quarter: 'Q3 2023', price: 28.9 },
    { quarter: 'Q4 2023', price: 29.5 },
  ];

  useEffect(() => {
    if (!selectedArea || !selectedType) {
      setIsLoading(false);
      setPriceData(defaultData);
      setIsDefaultData(true);
      return;
    }

    const fetchPriceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/property-data?area=${selectedArea}&type=${selectedType}`);
        
        if (response.data && response.data.rental_history) {
          // Transform the API response into the format needed for the chart
          const formattedData = Object.entries(response.data.rental_history).map(([quarter, price]) => ({
            quarter,
            price
          }));
          
          setPriceData(formattedData);
          setIsDefaultData(false);
        } else {
          console.warn('API response missing expected data structure:', response.data);
          setPriceData(defaultData);
          setIsDefaultData(true);
        }
      } catch (err) {
        console.error('Error fetching price appreciation data:', err);
        setError('Failed to load price appreciation data');
        setPriceData(defaultData);
        setIsDefaultData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceData();
  }, [selectedArea, selectedType]);

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="card p-4 h-auto max-h-[350px] animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  // Calculate price change percentage if data available
  let priceChangePercentage = 0;
  if (priceData && priceData.length >= 2) {
    const latestPrice = priceData[priceData.length - 1].price;
    const previousPrice = priceData[priceData.length - 2].price;
    priceChangePercentage = ((latestPrice - previousPrice) / previousPrice) * 100;
  }

  // Format the percentage with one decimal place
  const formattedPercentage = priceChangePercentage.toFixed(1);
  
  // Determine if trend is positive or negative
  const isTrendPositive = priceChangePercentage >= 0;

  return (
    <div className="card p-4 h-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rent Price Appreciation Trend</h3>
        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
      </div>
      
      {isDefaultData && (
        <div className="mb-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-md">
          <span>Default (No Data Available)</span>
        </div>
      )}
      
      {error && (
        <div className="mb-3 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-1.5 rounded-md">
          <span>{error}</span>
        </div>
      )}
      
      <div className="mb-2">
        <div className="flex items-center gap-1 text-sm">
          <span className={`${isTrendPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} flex items-center`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {isTrendPositive ? '+' : ''}{formattedPercentage}%
          </span>
          <span className="text-gray-500 dark:text-gray-400">vs previous quarter</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={priceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 12 }} 
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="#9ca3af"
              domain={['auto', 'auto']}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Price per sqft']}
              labelFormatter={(label) => `Quarter: ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
              name="Price per sqft"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
        Historical rent price trends for {selectedType || 'residential'} properties in {selectedArea || 'selected area'}
      </p>
    </div>
  );
};

export default PriceAppreciationGraph;
