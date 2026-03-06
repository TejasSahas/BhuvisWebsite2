import React from 'react';
import { MapPin } from 'lucide-react';

const AreaSelector = ({ areas, selectedArea, onChange }) => {
  return (
    <div className="w-full md:w-64">
      <label htmlFor="area-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Area
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id="area-select"
          value={selectedArea}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Select Area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AreaSelector;
