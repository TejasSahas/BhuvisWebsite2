import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const PriceWidget = ({ avgPrice, loading }) => {
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

  if (!avgPrice) {
    return (
      <div className="card p-4 h-auto max-h-[350px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Average Price</h3>
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">No price data available for the selected area and property type.</p>
      </div>
    );
  }

  return (
    <div className="card p-4 h-auto max-h-[350px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Average Price</h3>
        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{avgPrice.AvgPricePerSqft?.toLocaleString() || 'N/A'}/sqft
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-green-600 dark:text-green-400 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5.2%
          </span>
          <span className="text-gray-500 dark:text-gray-400">vs last quarter</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Average price per square foot for {avgPrice.PropertyType} properties in {avgPrice.Area}
      </p>
    </div>
  );
};

export default PriceWidget;
