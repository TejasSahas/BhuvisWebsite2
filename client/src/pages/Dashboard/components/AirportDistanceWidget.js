import React from 'react';
import { Plane, AlertCircle } from 'lucide-react';

const AirportDistanceWidget = ({ distance, loading, error }) => {
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

  if (error) {
    return (
      <div className="card p-4 h-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span>Failed to load airport distance data</span>
        </div>
      </div>
    );
  }

  // If no data is available, show a message
  if (!distance || !distance.distance_from_pune_airport_km) {
    return (
      <div className="card p-4 h-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Airport Distance</h3>
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <Plane className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No airport distance data available for this area
        </p>
      </div>
    );
  }

  return (
    <div className="card p-4 h-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Airport Distance</h3>
        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
          <Plane className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {distance.distance_from_pune_airport_km} km
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Driving distance from Pune Airport to {distance.area}
      </p>
    </div>
  );
};

export default AirportDistanceWidget;
