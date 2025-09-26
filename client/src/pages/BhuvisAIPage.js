import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, User, Bot, Sparkles, MapPin, X, ChevronDown, Check } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dropdown button that opens a menu; click toggles a value then auto-closes
const Dropdown = ({ label, placeholder, options, values, onToggle }) => {
  const [open, setOpen] = useState(false);
  const btnText = values.length ? label : (placeholder || `Select ${label}`);
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
  const cityOptions = ['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad'];
  const localityOptions = ['Baner', 'Aundh', 'Kharadi', 'Hinjewadi'];
  const propertyTypeOptions = ['Residential', 'Commercial'];
  const segmentOptions = ['Apartment', 'Villa', 'Office', 'Plot'];
  const budgetOptions = ['< ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '> ₹2Cr'];
  const possessionOptions = ['Ready to Move', 'Under Construction'];
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
  const furnishingOptions = ['Unfurnished', 'Semi-furnished', 'Furnished'];

  const [selectedCities, setSelectedCities] = useState(['Pune']);
  const [selectedLocalities, setSelectedLocalities] = useState(['Baner']);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(['Residential']);
  const [selectedSegments, setSelectedSegments] = useState(['Apartment']);
  const [selectedBudgets, setSelectedBudgets] = useState([]);

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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Page remains scrollable; no height syncing

  const markers = useMemo(() => {
    // Basic demo markers grouped by locality
    const base = {
      Baner: [
        { pos: [18.5603, 73.7769], label: 'Baner Central', price: '₹8,200', growth: '+3.1%', demand: 'High' },
        { pos: [18.565, 73.78], label: 'Baner West', price: '₹7,900', growth: '+2.4%', demand: 'Medium' }
      ],
      Aundh: [
        { pos: [18.56, 73.807], label: 'Aundh East', price: '₹9,100', growth: '+2.8%', demand: 'High' },
        { pos: [18.565, 73.815], label: 'Aundh Central', price: '₹8,750', growth: '+3.0%', demand: 'High' }
      ],
      Kharadi: [
        { pos: [18.551, 73.94], label: 'Kharadi IT Park', price: '₹9,800', growth: '+3.5%', demand: 'Very High' },
      ],
      Hinjewadi: [
        { pos: [18.59, 73.73], label: 'Phase 1', price: '₹6,900', growth: '+2.2%', demand: 'Medium' },
      ]
    };
    const locs = selectedLocalities.length ? selectedLocalities : ['Baner'];
    return locs.flatMap((l) => base[l] || []);
  }, [selectedLocalities]);

  const quickActions = ['📈 Price Trends', '🏢 Best Office Spaces', '🚀 Top Investment Areas'];

  const firstCity = selectedCities[0] ?? 'Pune';
  const firstLocality = selectedLocalities[0] ?? 'Baner';

  // Custom marker icon (replace with a direct PNG URL if desired)
  const markerImageUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  const customIcon = useMemo(() => {
    return L.icon({
      iconUrl: markerImageUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
    });
  }, [markerImageUrl]);

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((prev) => [...prev, { role: 'user', content }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/perplexity/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          filters: {
            cities: selectedCities,
            localities: selectedLocalities,
            propertyTypes: selectedPropertyTypes,
            segments: selectedSegments,
            budgets: selectedBudgets
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
    handleSend(`Tell me about ${m.label} in ${firstLocality}, ${firstCity}.`);
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
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scroll-smooth">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
                    )}
                    <div className={`rounded-2xl px-4 py-2 max-w-[80%] whitespace-pre-wrap break-words shadow ${m.role === 'user' ? 'bg-yellow-100 text-gray-900 border border-yellow-200' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700'}`}>
                      {m.content}
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
                <div ref={messagesEndRef} />
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
                  {selectedLocalities.map((v) => (
                    <span key={`loc-${v}`} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs">
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
                <Dropdown label="Locality / Area" placeholder="Select Locality" options={localityOptions} values={selectedLocalities} onToggle={(opt) => setSelectedLocalities((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                <Dropdown label="Property Type" placeholder="Select Type" options={propertyTypeOptions} values={selectedPropertyTypes} onToggle={(opt) => setSelectedPropertyTypes((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                <Dropdown label="Segment" placeholder="Select Segment" options={segmentOptions} values={selectedSegments} onToggle={(opt) => setSelectedSegments((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
              </div>
              {/* Row 2: four filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Dropdown label="Budget Range" placeholder="Select Budget" options={budgetOptions} values={selectedBudgets} onToggle={(opt) => setSelectedBudgets((prev) => prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt])} />
                <Dropdown label="Possession" placeholder="Select Possession" options={possessionOptions} values={[]} onToggle={() => {}} />
                <Dropdown label="BHK" placeholder="Select BHK" options={bhkOptions} values={[]} onToggle={() => {}} />
                <Dropdown label="Furnishing" placeholder="Select Furnishing" options={furnishingOptions} values={[]} onToggle={() => {}} />
              </div>
            </div>

            {/* Map placed under the grid so it aligns to the right column while filters occupy top rows */}
            <div className="rounded-2xl overflow-hidden border border-primary-200 dark:border-primary-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur aspect-square shadow-soft relative z-0 isolate">
              <div className="h-full">
                <MapContainer center={[18.5603, 73.7769]} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
                  <MapInvalidate />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {markers.map((m, idx) => (
                    <Marker key={idx} position={m.pos} icon={customIcon} eventHandlers={{ click: () => handlePinClick(m) }}>
                      <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent={false}>
                        <div className="text-xs">
                          <div className="font-semibold flex items-center gap-1"><MapPin className="w-3 h-3" /> {m.label}</div>
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
