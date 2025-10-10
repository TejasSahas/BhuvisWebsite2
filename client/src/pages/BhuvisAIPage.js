import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, User, Bot, Sparkles, MapPin, X, ChevronDown, Check } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Dropdown button that opens a menu; click toggles a value then auto-closes
const Dropdown = ({ label, placeholder, options, values, onToggle }) => {
  const [open, setOpen] = useState(false);
  const btnText = values.length ? values.join(', ') : (placeholder || `Select ${label}`);
  return (
    <div className="flex flex-col gap-1 min-w-[120px] max-w-[180px] w-full mx-auto relative">
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full inline-flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur px-3 py-2 text-sm hover:bg-white/80 dark:hover:bg-gray-900/60"
      >
        <span className="text-gray-800 dark:text-gray-100 truncate">{btnText}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-[10000] top-full mt-2 w-56 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          <ul className="max-h-64 overflow-y-auto py-1">
            {options.map((opt) => {
              const active = values.includes(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => { onToggle(opt); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${active ? 'text-yellow-800 dark:text-yellow-300' : 'text-gray-800 dark:text-gray-100'}`}
                  >
                    <span>{opt}</span>
                    {active && <Check className="w-4 h-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// Searchable dropdown for area selection
const SearchableAreaDropdown = ({ label, placeholder, options, values, onToggle, searchTerm, onSearchChange }) => {
  const [open, setOpen] = useState(false);
  const btnText = values.length ? values.join(', ') : (placeholder || `Select ${label}`);
  
  return (
    <div className="flex flex-col gap-1 min-w-[120px] max-w-[180px] w-full mx-auto relative">
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full inline-flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur px-3 py-2 text-sm hover:bg-white/80 dark:hover:bg-gray-900/60"
      >
        <span className="text-gray-800 dark:text-gray-100 truncate">{btnText}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-[10000] top-full mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search areas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Options list */}
          <ul className="max-h-64 overflow-y-auto py-1">
            {options.length > 0 ? (
              options.map((opt) => {
                const active = values.includes(opt);
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => { onToggle(opt); setOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${active ? 'text-yellow-800 dark:text-yellow-300' : 'text-gray-800 dark:text-gray-100'}`}
                    >
                      <span>{opt}</span>
                      {active && <Check className="w-4 h-4" />}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No areas found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const QuickAction = ({ label, onClick }) => (
  <button
    onClick={() => onClick(label)}
    className="px-3 py-1 rounded-full text-xs bg-white/70 dark:bg-gray-900/50 border border-gray-200/60 dark:border-gray-700 hover:bg-white hover:shadow transition"
  >
    {label}
  </button>
);

export default function BhuvisAIPage() {
  // Filters (extensible)
  const cityOptions = ['Pune'];
  
  // Comprehensive locality options by city
  const localityOptionsByCity = {
    'Pune': [
      'Peth Areas', 'Shivaji Nagar', 'Deccan Gymkhana', 'Model Colony', 'Shaniwar Wada', 'Swargate', 'Tilak Road', 'Bhandarkar Road', 'Ganeshkhind Road', 'Gokhale Nagar', 'Senapati Bapat Road', 'Prabhat Road', 'Camp', 'Pulgate', 'Shankar Sheth Road', 'Bajirao Road', 'FC Road', 'JM Road', 'Laxmi Road', 'Sangamwadi', 'Khadki', 'Range Hills', 'Bhosale Nagar', 'Pune University', 'Bund Garden', 'Pune Railway Station', 'Tadiwala Road', 'Vishrantwadi', 'Dhanori', 'Lohegaon', 'Alandi', 'Dighi', 'Bopkhel', 'Charholi', 'Bhosari', 'Moshi', 'Chakan', 'Kurali', 'Rajgurunagar', 'Manchar', 'Yerwada', 'Tingre Nagar', '509 Area', 'Viman Nagar', 'Kharadi', 'Vadgaon Sheri', 'Hadapsar', 'Mundhwa', 'Koregaon Park', 'Kalyani Nagar', 'Wanwadi', 'Magarpatta', 'Shewalewadi', 'Manjari', 'Bhekrainagar', 'Phursungi', 'Lulla Nagar', 'Wagholi', 'Chandan Nagar', 'Nagar Road', 'Shikrapur', 'Lonikand', 'Uruli Kanchan', 'Loni Kalbhor', 'Talegaon Dhamdhere', 'Shirur', 'Yavat', 'Balaji Nagar', 'Katraj', 'Sinhagad Road', 'Vadgaon Budruk', 'Dhayari', 'Narhe Gaon', 'Ambegaon', 'Dhankawadi', 'Bibwewadi', 'Jambhulwadi', 'Khed Shivapur', 'Kapurhol', 'Upper Indira Nagar', 'Kondhwa', 'Khadakwasla', 'Yewalewadi', 'Saswad', 'Jejuri', 'Satara Road', 'Marketyard', 'Kothrud', 'Erandwane', 'Paud Road', 'Karve Road', 'Karve Nagar', 'Warje', 'Uttam Nagar', 'Bavdhan', 'Bhugaon', 'Pirangut', 'Pashan', 'Baner', 'Aundh', 'Sus', 'Mahalunge', 'Balewadi', 'Wakad', 'Hinjewadi', 'Thergaon', 'Rahatani', 'Pimple Nilakh', 'Pimple Gurav', 'Pimple Saudagar', 'Sangvi', 'Dapodi', 'Kasarwadi', 'Pimpri', 'Nehru Nagar', 'Chinchwad', 'Vallabh Nagar', 'Kalewadi', 'Tathawade', 'Punawale', 'Kiwale', 'Ravet', 'Akurdi', 'Walhekarwadi', 'Nigdi', 'Dehu Road', 'Chikhali', 'Talawade', 'Dehu', 'Talegaon Dabhade', 'Vadgaon', 'Lonavala', 'Gahunje', 'Kudalwadi'
    ],
    'Mumbai': ['Bandra', 'Andheri', 'Powai', 'Malad', 'Goregaon', 'Borivali', 'Kandivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Thane', 'Navi Mumbai', 'Vashi', 'Nerul', 'Seawoods', 'Kharghar', 'Panvel', 'Kalyan', 'Dombivli', 'Ambernath', 'Badlapur', 'Ulhasnagar', 'Bhiwandi', 'Vasai', 'Virar', 'Nalasopara'],
    'Bengaluru': ['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City', 'Marathahalli', 'Sarjapur', 'Bellandur', 'Kundalahalli', 'Brookefield', 'KR Puram', 'Hennur', 'Banashankari', 'Jayanagar', 'JP Nagar', 'Bannerghatta', 'Uttarahalli', 'Rajarajeshwari Nagar', 'Vijayanagar', 'Rajajinagar', 'Malleshwaram', 'Basavanagudi', 'Chamrajpet', 'Shivajinagar', 'Cubbon Park', 'MG Road', 'Brigade Road', 'Commercial Street', 'Residency Road', 'Richmond Road', 'Lavelle Road', 'St. Marks Road', 'Church Street', 'Cunningham Road', 'Vasanth Nagar', 'Fraser Town', 'Cox Town', 'Murphy Town', 'Richmond Town', 'Langford Town', 'Shantinagar', 'Domlur', 'Ulsoor', 'Halasuru', 'Sivanchetty Garden'],
    'Hyderabad': ['Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Jubilee Hills', 'Banjara Hills', 'Begumpet', 'Secunderabad', 'Ameerpet', 'Kukatpally', 'Miyapur', 'Chandanagar', 'Serilingampally', 'Nizampet', 'Bachupally', 'Quthbullapur', 'Balanagar', 'KPHB']
  };
  
  // Hierarchical filter options
  const propertyTypeOptions = ['Residential', 'Commercial'];
  
  const segmentOptions = {
    'Residential': ['Apartment', 'Plot', 'Villa'],
    'Commercial': ['Office', 'Retail Store', 'Warehouse', 'Industrial Shed']
  };
  
  const budgetOptions = ['< ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '₹2Cr – ₹5Cr', '> ₹5Cr'];
  const possessionOptions = ['Ready to Move', 'Under Construction'];
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
  const furnishingOptions = ['Unfurnished', 'Semi-furnished', 'Furnished'];

  // State for hierarchical filters
  const [selectedCities, setSelectedCities] = useState(['Pune']);
  const [selectedLocalities, setSelectedLocalities] = useState(['Baner']);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(['Residential']);
  const [selectedSegments, setSelectedSegments] = useState(['Apartment']);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedPossession, setSelectedPossession] = useState([]);
  const [selectedBHK, setSelectedBHK] = useState([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState([]);
  
  // Search state for area filter
  const [areaSearchTerm, setAreaSearchTerm] = useState('');

  // Get filtered locality options based on selected cities and search term
  const getFilteredLocalities = () => {
    if (selectedCities.length === 0) return [];
    
    // If multiple cities selected, show localities from all selected cities
    let allLocalities = selectedCities.flatMap(city => 
      localityOptionsByCity[city] || []
    );
    
    // Remove duplicates and sort
    allLocalities = [...new Set(allLocalities)].sort();
    
    // Filter by search term if provided
    if (areaSearchTerm.trim()) {
      allLocalities = allLocalities.filter(locality =>
        locality.toLowerCase().includes(areaSearchTerm.toLowerCase())
      );
    }
    
    return allLocalities;
  };

  const localityOptions = getFilteredLocalities();

  // Conditional filter logic based on hierarchy
  const shouldShowPossession = () => {
    // Always show possession for all segments
    return true;
  };

  const shouldShowFurnishing = () => {
    // Show furnishing for: Apartment, Villa, Office
    // Hide for: Plot, Retail Store, Warehouse, Industrial Shed
    const segments = selectedSegments;
    return segments.some(segment => 
      ['Apartment', 'Villa', 'Office'].includes(segment)
    );
  };

  const shouldShowBHK = () => {
    // Show BHK for: Apartment, Villa
    // Hide for: Plot, Office, Retail Store, Warehouse, Industrial Shed
    const segments = selectedSegments;
    return segments.some(segment => 
      ['Apartment', 'Villa'].includes(segment)
    );
  };

  // Get filtered segment options based on selected property types
  const getFilteredSegments = () => {
    if (selectedPropertyTypes.length === 0) return [];
    
    const allSegments = selectedPropertyTypes.flatMap(type => 
      segmentOptions[type] || []
    );
    
    return [...new Set(allSegments)].sort();
  };

  const availableSegments = getFilteredSegments();

  // Clear localities when cities change
  useEffect(() => {
    // Filter out localities that don't belong to selected cities
    const validLocalities = selectedLocalities.filter(locality => {
      return selectedCities.some(city => 
        localityOptionsByCity[city]?.includes(locality)
      );
    });
    
    if (validLocalities.length !== selectedLocalities.length) {
      setSelectedLocalities(validLocalities);
    }
  }, [selectedCities]);

  // Clear segments when property types change
  useEffect(() => {
    const validSegments = selectedSegments.filter(segment => 
      availableSegments.includes(segment)
    );
    
    if (validSegments.length !== selectedSegments.length) {
      setSelectedSegments(validSegments);
    }
  }, [selectedPropertyTypes, availableSegments]);

  // Clear conditional filters when they should no longer be shown
  useEffect(() => {
    // Clear BHK if it should not be shown
    if (!shouldShowBHK() && selectedBHK.length > 0) {
      setSelectedBHK([]);
    }
    
    // Clear Furnishing if it should not be shown
    if (!shouldShowFurnishing() && selectedFurnishing.length > 0) {
      setSelectedFurnishing([]);
    }
  }, [selectedSegments]);

  // Conversations
  const [conversations, setConversations] = useState([
    { id: 'c1', title: 'Pune: Investment ideas', preview: 'Top micro-markets with 3-5 year upside...' },
    { id: 'c2', title: 'Baner price trends', preview: 'Avg price, QoQ growth, demand...' }
  ]);
  const [activeConversationId, setActiveConversationId] = useState('c1');

  // Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am BhuvisAI. How can I help you explore real estate insights today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  
  // Coordinates data for map redirection
  const [coordinatesData, setCoordinatesData] = useState({});
  const [mapCenter, setMapCenter] = useState([18.5603, 73.7769]); // Default Pune center
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    // Scroll only the chat container, not the entire page
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Load coordinates data
  useEffect(() => {
    fetch('/pune-coordinates.json')
      .then(response => response.json())
      .then(data => {
        setCoordinatesData(data);
      })
      .catch(error => {
        console.error('Error loading coordinates:', error);
      });
  }, []);

  // Update map when area is selected - show all selected areas
  useEffect(() => {
    if (selectedLocalities.length > 0 && Object.keys(coordinatesData).length > 0) {
      // Get coordinates for all selected areas
      const validCoordinates = selectedLocalities
        .map(locality => {
          const areaKey = locality.toLowerCase();
          const coords = coordinatesData[areaKey];
          return coords ? [coords.lat, coords.lng] : null;
        })
        .filter(Boolean);

      if (validCoordinates.length > 0) {
        if (validCoordinates.length === 1) {
          // Single area - center on it with high zoom
          setMapCenter(validCoordinates[0]);
          setMapZoom(15);
        } else {
          // Multiple areas - calculate bounds to show all
          const lats = validCoordinates.map(coord => coord[0]);
          const lngs = validCoordinates.map(coord => coord[1]);
          
          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);
          const minLng = Math.min(...lngs);
          const maxLng = Math.max(...lngs);
          
          // Calculate center point
          const centerLat = (minLat + maxLat) / 2;
          const centerLng = (minLng + maxLng) / 2;
          
          // Calculate appropriate zoom level based on bounds
          const latDiff = maxLat - minLat;
          const lngDiff = maxLng - minLng;
          const maxDiff = Math.max(latDiff, lngDiff);
          
          let zoom;
          if (maxDiff > 0.1) zoom = 10;      // Very wide area
          else if (maxDiff > 0.05) zoom = 11; // Wide area
          else if (maxDiff > 0.02) zoom = 12; // Medium area
          else if (maxDiff > 0.01) zoom = 13; // Close area
          else zoom = 14; // Very close areas
          
          setMapCenter([centerLat, centerLng]);
          setMapZoom(zoom);
        }
      }
    } else {
      // Reset to default Pune center when no area is selected
      setMapCenter([18.5603, 73.7769]);
      setMapZoom(12);
    }
  }, [selectedLocalities, coordinatesData]);

  // Page remains scrollable; no height syncing

  const markers = useMemo(() => {
    // Create markers for selected areas using coordinates data
    if (selectedLocalities.length > 0 && Object.keys(coordinatesData).length > 0) {
      const markers = selectedLocalities.map(locality => {
        const areaKey = locality.toLowerCase();
        const coords = coordinatesData[areaKey];
        
        if (coords) {
          return {
            pos: [coords.lat, coords.lng],
            label: coords.name,
            price: 'Selected Area',
            growth: 'Active',
            demand: 'Selected',
            locality: locality
          };
        }
        return null;
      }).filter(Boolean);
      
      console.log(`Created ${markers.length} markers for areas:`, selectedLocalities);
      return markers;
    }
    
    // Default markers when no area is selected
    return [
      { pos: [18.5603, 73.7769], label: 'Pune Center', price: 'Default View', growth: 'Overview', demand: 'General', locality: 'Pune' }
    ];
  }, [selectedLocalities, coordinatesData]);

  // Custom icons for markers - different colors for multiple selections
  const getMarkerIcon = (index, total) => {
    // Using a more comprehensive color palette with verified available colors
    const colors = [
      'red', 'blue', 'green', 'orange', 'purple', 
      'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen',
      'pink', 'yellow', 'violet', 'gold', 'silver'
    ];
    const color = colors[index % colors.length];
    
    // Debug log to see which colors are being used
    console.log(`Marker ${index + 1}/${total}: Using color ${color}`);
    
    // Create icon with proper configuration
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    
    // Create user message with filter context
    const activeFilters = [];
    if (selectedCities.length > 0) activeFilters.push(`Cities: ${selectedCities.join(', ')}`);
    if (selectedLocalities.length > 0) activeFilters.push(`Areas: ${selectedLocalities.join(', ')}`);
    if (selectedPropertyTypes.length > 0) activeFilters.push(`Types: ${selectedPropertyTypes.join(', ')}`);
    if (selectedSegments.length > 0) activeFilters.push(`Segments: ${selectedSegments.join(', ')}`);
    if (selectedBudgets.length > 0) activeFilters.push(`Budgets: ${selectedBudgets.join(', ')}`);
    if (shouldShowPossession() && selectedPossession.length > 0) activeFilters.push(`Possession: ${selectedPossession.join(', ')}`);
    if (shouldShowBHK() && selectedBHK.length > 0) activeFilters.push(`BHK: ${selectedBHK.join(', ')}`);
    if (shouldShowFurnishing() && selectedFurnishing.length > 0) activeFilters.push(`Furnishing: ${selectedFurnishing.join(', ')}`);
    
    // If no content and no filters, don't send
    if (!content && activeFilters.length === 0) return;
    
    // Create appropriate user message
    let userMessage;
    if (content && activeFilters.length > 0) {
      userMessage = `${content}\n\n*Searching with filters: ${activeFilters.join(' | ')}*`;
    } else if (content) {
      userMessage = content;
    } else {
      userMessage = `*Searching with filters: ${activeFilters.join(' | ')}*`;
    }
    
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/perplexity/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content || 'Show me properties based on the selected filters',
          filters: {
            cities: selectedCities,
            localities: selectedLocalities,
            propertyTypes: selectedPropertyTypes,
            segments: selectedSegments,
            budgets: selectedBudgets,
            ...(shouldShowPossession() && { possession: selectedPossession }),
            ...(shouldShowBHK() && { bhk: selectedBHK }),
            ...(shouldShowFurnishing() && { furnishing: selectedFurnishing })
          }
        })
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      setMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'There was an error contacting BhuvisAI. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePinClick = (m) => {
    handleSend(`Tell me about ${m.label} in ${m.locality}, Pune.`);
  };

  // Ensures Leaflet recalculates size when mounted/resized
  const MapInvalidate = () => {
    const map = useMap();
    useEffect(() => {
      const t = setTimeout(() => map.invalidateSize(), 100);
      const onResize = () => map.invalidateSize();
      window.addEventListener('resize', onResize);
      return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
    }, [map]);
    return null;
  };

  // Component to update map center and zoom
  const MapUpdater = ({ center, zoom, markers }) => {
    const map = useMap();
    
    useEffect(() => {
      if (center && center.length === 2) {
        if (markers && markers.length > 1) {
          // For multiple markers, fit bounds to show all
          const bounds = L.latLngBounds(markers.map(m => m.pos));
          map.fitBounds(bounds, { padding: [20, 20] });
        } else {
          // Single marker or no markers, use center and zoom
          map.setView(center, zoom);
        }
      }
    }, [map, center, zoom, markers]);
    
    return null;
  };

  const quickActions = [
    'Show me properties in Baner',
    'What\'s the rental yield in Pune?',
    'Price trends in Hinjewadi',
    'Investment opportunities'
  ];

  // Get first selected city and locality for display
  const firstCity = selectedCities[0] || 'Pune';
  const firstLocality = selectedLocalities[0] || 'Baner';

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 pt-6 lg:pt-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15 pointer-events-none"></div>
      <div className="relative z-10 container-custom py-4 lg:py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Chat Section - page scrollable; chat scrolls internally */}
          <section className="flex flex-col">
            {/* Chat window */}
            <div className="rounded-2xl border border-primary-200 dark:border-primary-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur p-4 flex flex-col min-h-[80vh] lg:h-[calc(100vh-6rem)] overflow-hidden shadow-soft">
              {/* Messages area scrolls inside chat card */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 scroll-smooth relative">
                {/* Subtle fade at top */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80 pointer-events-none z-10"></div>
                {/* Subtle fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 pointer-events-none z-10"></div>
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
                    )}
                    <div className={`rounded-2xl px-4 py-2 max-w-[80%] break-words shadow ${m.role === 'user' ? 'bg-yellow-100 text-gray-900 border border-yellow-200' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700'}`}>
                      {m.role === 'assistant' ? (
                        <div className="prose max-w-none text-gray-900 dark:text-gray-100 leading-relaxed overflow-y-auto">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-xl font-bold mt-4 mb-3 border-b-2 border-gray-400 dark:border-gray-500 pb-2 text-gray-900 dark:text-white">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-lg font-bold mt-4 mb-2 border-b border-gray-300 dark:border-gray-600 pb-1 text-gray-900 dark:text-white">
                                  {children}
                                </h3>
                              ),
                              h4: ({ children }) => (
                                <h4 className="text-md font-semibold mt-2 mb-1 ml-2 text-blue-600 dark:text-blue-400">
                                  {children}
                                </h4>
                              ),
                              p: ({ children }) => {
                                const text = children?.toString() || '';
                                // Check if paragraph starts with bullet point
                                if (text.startsWith('•')) {
                                  return <li className="mb-2 leading-relaxed list-disc ml-6">{children}</li>;
                                }
                                return <p className="mb-2">{children}</p>;
                              },
                              ul: ({ children }) => <ul className="list-disc ml-6 mt-2 mb-4 space-y-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal ml-6 mt-2 mb-4 space-y-2">{children}</ol>,
                              li: ({ children }) => <li className="ml-2 mb-1 leading-relaxed">{children}</li>,
                              table: ({ children }) => (
                                <div className="overflow-x-auto my-4">
                                  <table className="min-w-full border border-gray-400 dark:border-gray-600 text-sm rounded-md">
                                    {children}
                                  </table>
                                </div>
                              ),
                              th: ({ children }) => (
                                <th className="border border-gray-400 dark:border-gray-600 px-3 py-2 font-semibold bg-gray-200 dark:bg-gray-800 text-left text-gray-900 dark:text-white">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="border border-gray-400 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-200">
                                  {children}
                                </td>
                              ),
                              strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                              br: () => <br />,
                              code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                              blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2">{children}</blockquote>,
                            }}
                          >
                            {m.content
                              ?.replace(/\[\d+\]/g, "") // remove [1], [2], etc.
                              ?.replace(/\n?•\s*•/g, "\n- ") // remove duplicate bullets
                              ?.replace(/\n?•/g, "\n- ") // ensure each bullet starts on a new line
                              ?.replace(/([^#\n])(##\s)/g, "$1\n\n$2") // add line break before ## headers
                              ?.replace(/([^#\n])(###\s)/g, "$1\n\n$2") // add line break before ### headers
                              ?.replace(/([^#\n])(####\s)/g, "$1\n\n$2") // add line break before #### headers
                              ?.replace(/([^#\n])(#####\s)/g, "$1\n\n$2") // add line break before ##### headers
                              ?.replace(/\n\s*\n/g, "\n\n") // clean up extra line breaks
                              ?.trim()}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center shrink-0"><User className="w-4 h-4" /></div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center"><Bot className="w-4 h-4" /></div>
                    <div className="px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce [animation-delay:-0.3s] inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="animate-bounce [animation-delay:-0.15s] inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="animate-bounce inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="mt-2 flex flex-wrap gap-2">
                {quickActions.map((qa) => (
                  <QuickAction key={qa} label={qa} onClick={(label) => setInput(label)} />
                ))}
              </div>

              {/* Sticky input at bottom of chat card */}
              <form
                className="mt-2 flex items-end gap-2 sticky bottom-0 pt-2 bg-gradient-to-t from-white/90 dark:from-gray-900/90 from-60% to-transparent"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              >
                <div className="flex-1 flex flex-wrap items-center gap-2 border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 rounded-xl p-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  {/* Bubbles inline inside input */}
                  {selectedCities.map((v) => (
                    <span key={`city-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedCities((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedLocalities.map((v, idx) => (
                    <span key={`loc-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">#{idx + 1}</span>
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedLocalities((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedPropertyTypes.map((v) => (
                    <span key={`ptype-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedPropertyTypes((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedSegments.map((v) => (
                    <span key={`seg-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedSegments((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedBudgets.map((v) => (
                    <span key={`bdg-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedBudgets((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedPossession.map((v) => (
                    <span key={`pos-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedPossession((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedBHK.map((v) => (
                    <span key={`bhk-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedBHK((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  {selectedFurnishing.map((v) => (
                    <span key={`fur-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
                      {v}
                      <button aria-label={`Remove ${v}`} onClick={() => setSelectedFurnishing((prev) => prev.filter((x) => x !== v))} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask about ${firstLocality}, ${firstCity}...`}
                    rows={1}
                    className="flex-1 min-w-[160px] resize-none outline-none bg-transparent text-sm max-h-32 whitespace-pre-wrap break-words"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="relative px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-transform active:scale-95"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4 inline" />
                  <span className="absolute -right-2 -top-2 text-xs">✈️</span>
                </button>
              </form>
            </div>
          </section>

          {/* Right: Filters + Map - sticky map, no internal scroll so page scroll works */}
          <section className="flex flex-col lg:sticky lg:top-28 lg:self-start z-[9999]">
            {/* Filters (dropdowns) */}
            <div className="p-4 rounded-2xl border border-primary-200 dark:border-primary-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur mb-4 shadow-soft relative z-[10001]">
              {/* Row 1: four filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                <Dropdown label="City" placeholder="Select City" options={cityOptions} values={selectedCities} onToggle={(opt) => setSelectedCities((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                <SearchableAreaDropdown 
                  label="Area" 
                  placeholder="Select Area" 
                  options={localityOptions} 
                  values={selectedLocalities} 
                  searchTerm={areaSearchTerm}
                  onSearchChange={setAreaSearchTerm}
                  onToggle={(opt) => setSelectedLocalities((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} 
                />
                <Dropdown label="Property Type" placeholder="Select Type" options={propertyTypeOptions} values={selectedPropertyTypes} onToggle={(opt) => setSelectedPropertyTypes((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                <Dropdown label="Segment" placeholder="Select Segment" options={availableSegments} values={selectedSegments} onToggle={(opt) => setSelectedSegments((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
              </div>
              {/* Row 2: conditional filters based on hierarchy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Dropdown label="Budget Range" placeholder="Select Budget" options={budgetOptions} values={selectedBudgets} onToggle={(opt) => setSelectedBudgets((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                
                {shouldShowPossession() && (
                  <Dropdown label="Possession" placeholder="Select Possession" options={possessionOptions} values={selectedPossession} onToggle={(opt) => setSelectedPossession((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                )}
                
                {shouldShowFurnishing() && (
                  <Dropdown label="Furnishing" placeholder="Select Furnishing" options={furnishingOptions} values={selectedFurnishing} onToggle={(opt) => setSelectedFurnishing((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                )}
                
                {shouldShowBHK() && (
                  <Dropdown label="BHK" placeholder="Select BHK" options={bhkOptions} values={selectedBHK} onToggle={(opt) => setSelectedBHK((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                )}
              </div>
            </div>

            {/* Map placed under the grid so it aligns to the right column while filters occupy top rows */}
            <div className="rounded-2xl overflow-hidden border border-primary-200 dark:border-primary-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur aspect-square shadow-soft relative z-0 isolate">
              <div className="h-full">
                <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
                  <MapInvalidate />
                  <MapUpdater center={mapCenter} zoom={mapZoom} markers={markers} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {markers.map((m, idx) => (
                    <Marker key={idx} position={m.pos} icon={getMarkerIcon(idx, markers.length)} eventHandlers={{ click: () => handlePinClick(m) }}>
                      <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent={false}>
                        <div className="text-xs">
                          <div className="font-semibold flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> 
                            {m.label} 
                            <span className="text-xs bg-gray-200 px-1 rounded">#{idx + 1}</span>
                          </div>
                          <div>Avg: {m.price}</div>
                          <div>Growth: {m.growth}</div>
                          <div>Demand: {m.demand}</div>
                        </div>
                      </Tooltip>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}