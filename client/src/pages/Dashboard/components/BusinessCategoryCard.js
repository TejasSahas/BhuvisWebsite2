import React from 'react';
import { BarChart3, Info, AlertCircle } from 'lucide-react';

const BusinessCategoryCard = ({ businessData, loading, isDefault }) => {
  // Process categories to ensure they have the correct format
  const processedCategories = businessData?.categories?.map(item => {
    // Handle different data formats - API might return percentage as string with '%' or as a number
    let percentValue;
    
    // If percentage is available, use it
    if (item.percentage !== undefined) {
      // Extract numeric value if it's a string with '%'
      percentValue = typeof item.percentage === 'string' 
        ? parseFloat(item.percentage.replace('%', '')) 
        : item.percentage;
    } else {
      percentValue = 0;
    }
    
    // Round to 1 decimal place for consistency
    const roundedPercent = Math.round(percentValue * 10) / 10;
    
    return {
      // Use name or category field depending on what's available
      category: item.name || item.category,
      // Ensure percentage is a properly formatted number
      percentage: roundedPercent
    };
  });

  if (loading) {
    return (
      <div className="card p-4 h-auto max-h-[350px] animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 h-auto max-h-[350px] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Category Analysis</h3>
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      {/* Show message if no data is available */}
      {!businessData && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">No Data Available</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Failed to fetch business category data for this area.
          </p>
        </div>
      )}
      
      {/* Show data if available */}
      {businessData && (
        <div className="space-y-3">
          {processedCategories.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessCategoryCard;
