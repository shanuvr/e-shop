import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Tag,
  Sparkles
} from 'lucide-react';

export default function Hero2() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full bg-[#edf4f9] pt-6 sm:pt-10 pb-12 sm:pb-14 px-4 sm:px-12 lg:px-20 relative overflow-hidden flex flex-col md:flex-row justify-between items-center min-h-[300px] sm:min-h-[360px]">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />
      
      {/* Left Content Column */}
      <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center z-10 select-none">
        
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
          Shop from trusted businesses, book services, and support local — all in one place.
        </p>

        {/* Badges Row */}
        <div className="animate-fade-in-up-delay-3 flex flex-wrap items-center gap-y-2 gap-x-2 sm:gap-x-3 mb-5 text-[11px] sm:text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs hover:scale-105 hover:bg-white hover:border-blue-300 transition-all duration-300">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
            <span>Trusted Businesses</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs hover:scale-105 hover:bg-white hover:border-blue-300 transition-all duration-300">
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
            <span>Best Prices</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs hover:scale-105 hover:bg-white hover:border-blue-300 transition-all duration-300">
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
            <span>Easy Returns</span>
          </div>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="animate-fade-in-up-delay-4 flex items-center bg-white rounded-xl shadow-md shadow-blue-900/5 border border-slate-200 overflow-hidden w-full max-w-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all h-11 sm:h-12">
          <input 
            type="text" 
            placeholder="Search products, services, shops..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400 font-medium min-w-0 flex-1"
          />
          <button 
            type="submit"
            className="bg-[#1a73e8] hover:bg-blue-700 text-white px-4 sm:px-7 h-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
          >
            Search
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

