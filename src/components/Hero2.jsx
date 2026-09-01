import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Tag
} from 'lucide-react';

export default function Hero2() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full bg-[#edf4f9] pt-8 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center min-h-[360px]">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      {/* Left Content Column */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center z-10 select-none">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1f1f1f] leading-[1.1] mb-4 tracking-tight">
          Your One-Stop Platform<br />
          for <span className="text-[#1a73e8]">Products & Services</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base lg:text-[16px] mb-6 leading-relaxed max-w-lg">
          Shop from trusted businesses, book services, and support local — all in one place.
        </p>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-6 text-xs font-semibold text-gray-700">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Trusted Businesses</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-blue-600" />
            <span>Best Prices</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span>Easy Returns</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Secure Payments</span>
          </div>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden w-full max-w-xl focus-within:border-blue-500 transition-colors h-12">
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-5 py-2 text-sm text-gray-800 outline-none placeholder-gray-400 font-medium"
          />
          <button 
            type="submit"
            className="bg-[#1a73e8] hover:bg-blue-700 text-white px-8 h-full text-sm font-bold transition-all flex items-center justify-center"
          >
            Search
          </button>
        </form>
      </div>

      {/* Right Graphic Column */}
      <div className="w-full lg:w-[45%] mt-8 lg:mt-0 flex justify-center items-center z-10 relative">
        <img 
          src="/2hero-image.png" 
          alt="E-Shop Showcase" 
          className="w-full max-w-[460px] object-contain drop-shadow-xl select-none" 
        />
      </div>
    </div>
  );
}
