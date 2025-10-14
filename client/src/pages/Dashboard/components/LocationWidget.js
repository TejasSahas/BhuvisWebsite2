import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle map view updates
function MapUpdater({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      // Fly to the new position with smooth animation and zoom in
      map.flyTo(position, 15, {
        animate: true,
        duration: 1.5 // Animation duration in seconds
      });
    }
  }, [map, position]);
  
  return null;
}

// Component to handle marker position updates
function DynamicMarker({ position, coordinates }) {
  return (
    <Marker position={position}>
      <Popup>
        <div>
          <strong>{coordinates?.Area || 'Pune'}</strong>
          {coordinates?.Pincode && <div>Pincode: {coordinates.Pincode}</div>}
        </div>
      </Popup>
    </Marker>
  );
}

const LocationWidget = ({ coordinates, loading }) => {
  // Default coordinates for Pune
  const defaultPosition = [18.5204, 73.8567];
  
  // Extract coordinates from the API response
  const position = coordinates && coordinates.Latitude && coordinates.Longitude 
    ? [coordinates.Latitude, coordinates.Longitude] 
    : defaultPosition;

  if (loading) {
    return (
      <div className="card p-4 h-auto max-h-[480px] animate-pulse">
        <div className="mb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
        </div>
        <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="card p-4 h-auto max-h-[480px]">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
          Location: {coordinates?.Area || 'Pune'}
        </h3>
        {coordinates?.Pincode && (
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
            Pincode: {coordinates.Pincode}
          </p>
        )}
      </div>
      <div className="h-[400px] rounded overflow-hidden">
        <MapContainer 
          center={defaultPosition} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DynamicMarker position={position} coordinates={coordinates} />
          <MapUpdater position={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationWidget;