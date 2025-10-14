import React from 'react';
import { Home, TrendingUp } from 'lucide-react';

const RentWidget = ({ avgRent, loading }) => {
  if (loading) {
    return (
      <div className="card p-4 h-auto max-h-[350px] animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  // If no data is available, use default values
  const defaultRent = {
    Area: avgRent?.Area || 'Selected Area',
    PropertyType: avgRent?.PropertyType || 'residential',
    AvgRentPerSqft: avgRent?.AvgRentPerSqft || 65
  };

  // Use actual data if available, otherwise use defaults
  const rentData = avgRent || defaultRent;

  return (
    <div className="card p-4 h-auto max-h-[350px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Average Rent</h3>
        <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
          <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </div>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{rentData.AvgRentPerSqft?.toLocaleString() || 'N/A'}/sqft
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-green-600 dark:text-green-400 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +3.8%
          </span>
          <span className="text-gray-500 dark:text-gray-400">vs last quarter</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Average monthly rent per square foot for {rentData.PropertyType} properties in {rentData.Area}
      </p>
    </div>
  );
};

export default RentWidget;
