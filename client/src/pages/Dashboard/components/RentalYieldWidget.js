import React from 'react';
import { TrendingUp, Home } from 'lucide-react';

const RentalYieldWidget = ({ rentalYield, propertyType, loading }) => {
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

  if (!rentalYield) {
    return (
      <div className="card p-4 h-auto max-h-[350px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rental Yield</h3>
          <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
            <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">No rental yield data available for the selected area and property type.</p>
      </div>
    );
  }

  // Determine which yield values to display based on property type
  let yieldLow = propertyType === 'commercial' 
    ? rentalYield.CommercialRYL 
    : rentalYield.ResidentialRYL;
    
  let yieldHigh = propertyType === 'commercial' 
    ? rentalYield.CommercialRYH 
    : rentalYield.ResidentialRYH;
    
  // Convert decimal values to percentages (multiply by 100)
  if (yieldLow !== undefined && yieldLow < 1) {
    yieldLow = Math.round(yieldLow * 100);
  }
  
  if (yieldHigh !== undefined && yieldHigh < 1) {
    yieldHigh = Math.round(yieldHigh * 100);
  }

  return (
    <div className="card p-4 h-auto max-h-[350px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rental Yield</h3>
        <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
          <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </div>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {yieldLow ? `${yieldLow}%` : 'N/A'} - {yieldHigh ? `${yieldHigh}%` : 'N/A'}
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-green-600 dark:text-green-400 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +0.8%
          </span>
          <span className="text-gray-500 dark:text-gray-400">vs last quarter</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Expected rental yield range for {propertyType} properties in {rentalYield.Area}
      </p>
    </div>
  );
};

export default RentalYieldWidget;
