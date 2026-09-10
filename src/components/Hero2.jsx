import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  MapPin,
  Search,
  ChevronDown,
  Navigation
} from 'lucide-react';

const POPULAR_LOCATIONS = [
  'All Locations',
  'Thrissur Town',
  'Swaraj Round',
  'West Fort',
  'East Fort',
  'Punkunnam',
  'MG Road',
  'Kokkalai',
  'Ramavarmapuram',
  'Ollur'
];

export default function Hero2() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Thrissur');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, width: 240 });
  const locationRef = useRef(null);
  const popoverRef = useRef(null);

  const updateDropdownCoords = () => {
    if (locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect();
      const popoverWidth = Math.max(rect.width, 240);
      let left = rect.left;
      if (typeof window !== 'undefined' && left + popoverWidth > window.innerWidth - 16) {
        left = Math.max(16, window.innerWidth - popoverWidth - 16);
      }
      setDropdownCoords({
        top: rect.bottom + 6,
        left: Math.max(8, left),
        width: popoverWidth
      });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current && 
        !locationRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on scroll so it doesn't follow the page
  useEffect(() => {
    if (isLocationDropdownOpen) {
      const handleScroll = () => setIsLocationDropdownOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLocationDropdownOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (location && location.trim() && location !== 'All Locations') {
      params.append('location', location.trim());
    }
    navigate(`/marketplace?${params.toString()}`);
  };

  const handleDetectLocation = () => {
    setLocation('Thrissur Town');
    setIsLocationDropdownOpen(false);
  };

  return (
    <div className="w-full bg-[#edf4f9] pt-6 sm:pt-10 pb-12 sm:pb-14 px-4 sm:px-12 lg:px-20 relative z-0 overflow-visible flex flex-col md:flex-row justify-between items-center min-h-[300px] sm:min-h-[360px]">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />
      
      {/* Left Content Column */}
      <div className="w-full md:w-[55%] lg:w-[52%] flex flex-col justify-center z-10 select-none">
        
        {/* Top Tagline Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-700 text-[11px] sm:text-xs font-bold rounded-full w-fit mb-3 border border-blue-500/20 backdrop-blur-sm shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Multi-Vendor E-Commerce Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="animate-fade-in-up-delay-1 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#1f1f1f] leading-tight mb-2.5 tracking-tight">
          Your One-Stop Platform<br className="hidden sm:block" />
          for <span className="text-[#1a73e8] relative inline-block">
            Products & Services
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500/30 rounded-full" />
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 text-slate-600 text-xs sm:text-sm lg:text-[15px] mb-4 leading-relaxed max-w-lg">
          Shop anything, anytime, from anywhere — all in one place.
        </p>

        

        {/* Search Box with Integrated Location Search */}
        <form 
          onSubmit={handleSearch} 
          className="animate-fade-in-up-delay-4 flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-xl shadow-lg shadow-blue-900/5 border border-slate-200/90 w-full max-w-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all p-1.5 sm:p-1 gap-1.5 sm:gap-0 relative z-20"
        >
          {/* Location Segment */}
          <div ref={locationRef} className="relative flex items-center min-w-[120px] sm:max-w-[130px] px-2.5 py-1 sm:py-0 border-b sm:border-b-0 sm:border-r border-slate-200/80">
            <MapPin className="w-4 h-4 text-primary shrink-0 mr-1.5" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                updateDropdownCoords();
                setIsLocationDropdownOpen(true);
              }}
              onFocus={() => {
                updateDropdownCoords();
                setIsLocationDropdownOpen(true);
              }}
              placeholder="Location..."
              className="w-full bg-transparent text-xs sm:text-[13px] font-bold text-slate-800 outline-none placeholder-slate-400 truncate"
            />
            <button
              type="button"
              onClick={() => {
                if (!isLocationDropdownOpen) {
                  updateDropdownCoords();
                }
                setIsLocationDropdownOpen(!isLocationDropdownOpen);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Toggle location dropdown"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
          </div>

          {/* Location Dropdown Fixed Viewport Popover via Portal */}
          {isLocationDropdownOpen && typeof document !== 'undefined' && createPortal(
            <div 
              ref={popoverRef}
              style={{
                position: 'fixed',
                top: `${dropdownCoords.top}px`,
                left: `${dropdownCoords.left}px`,
                width: `${dropdownCoords.width}px`,
                zIndex: 99999
              }}
              className="bg-white rounded-xl shadow-2xl border border-slate-200 p-2 animate-fadeIn"
            >
              <button
                type="button"
                onClick={handleDetectLocation}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-primary hover:bg-blue-50 flex items-center gap-2 border-b border-slate-100 mb-1 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-primary" />
                <span>Use Current Location</span>
              </button>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                Popular Localities
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {POPULAR_LOCATIONS.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      location === loc
                        ? 'bg-blue-50 text-primary font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{loc}</span>
                    {location === loc && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            </div>,
            document.body
          )}

          {/* Search Query Segment */}
          <div className="flex items-center flex-1 min-w-0 px-2 sm:px-3 py-1 sm:py-0">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search your shop/products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-1.5 text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400 font-medium min-w-0"
            />
          </div>

          {/* Submit Search Button */}
          <button 
            type="submit"
            className="bg-[#1a73e8] hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-xl sm:rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 sm:hidden" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Right Graphic Column */}
      <div className="hidden md:flex md:w-[42%] lg:w-[45%] flex-shrink-0 justify-center items-center z-10 relative">
        <img 
          src="/2hero-image.png" 
          alt="E-Shop Showcase" 
          className="w-full max-w-[460px] object-contain drop-shadow-2xl select-none" 
        />
      </div>
    </div>
  );
}
