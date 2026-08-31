import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-4 pb-6 h-[calc(100vh-80px)] min-h-[520px] max-h-[680px] w-full max-w-[1440px] mx-auto overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-100 to-pink-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      {/* Top Text Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start w-full relative z-10 px-2 sm:px-6 lg:px-10 mb-2">
        <div className="flex flex-col animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-serif italic text-[#1f1f1f] leading-none mb-1">
            Find Your
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8561d4] to-[#a78bda] leading-[0.85] tracking-tighter uppercase hover:scale-105 transition-transform duration-300 cursor-default">
            NEEDS
          </h1>
        </div>
        
        <div className="flex flex-col text-right mt-2 sm:mt-4 relative group">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#1f1f1f] leading-none tracking-tight mb-0.5">
            Shop Your
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-[58px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8561d4] to-[#6c4db3] leading-[0.85] tracking-tighter uppercase hover:scale-105 transition-transform duration-300 cursor-default">
            WAY
          </h1>
          
          {/* Animated Sparkle */}
          <div className="absolute -right-6 lg:-right-8 -top-1 text-[#8561d4] animate-spin-slow group-hover:scale-125 transition-transform">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8 opacity-80">
              <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Purple Card Section */}
      <div className="bg-gradient-to-br from-[#8561d4] to-[#6c4db3] rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 w-full relative z-10 text-white flex flex-col lg:flex-row justify-between min-h-[320px] max-h-[380px] flex-grow shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
        
        {/* Abstract blobs in background of purple card */}
        <div className="absolute top-0 right-1/3 w-[300px] h-[200px] bg-white opacity-[0.05] rounded-full blur-[30px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[200px] h-[150px] bg-white opacity-[0.03] rounded-full blur-[40px] pointer-events-none" />
        
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[30px] lg:rounded-[40px]" 
             style={{
               backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 2px)',
               backgroundSize: '40px 40px'
             }} />

        {/* Left Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between h-full z-20 pb-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold mb-3 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 animate-pulse">
                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z"/>
              </svg>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full text-[10px]">Local Marketplace</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight mb-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Products & Services,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">All in One Place</span>
            </h2>
            
            <p className="text-purple-100 text-xs sm:text-sm lg:text-[14px] mb-4 leading-relaxed max-w-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover unique products and book local services from verified businesses in your neighborhood.
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full p-1 sm:p-1.5 shadow-xl w-full max-w-md mb-4 text-black transition-all border border-transparent focus-within:border-white/50 focus-within:shadow-2xl hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="pl-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search products, services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2.5 py-1.5 text-xs font-semibold outline-none placeholder-gray-400 text-gray-800"
            />
            <button 
              type="submit"
              className="bg-[#1f1f1f] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-md active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Avatars badge */}
          <div className="flex items-center gap-3 animate-fade-in-up mt-2" style={{ animationDelay: '0.6s' }}>
            <div className="flex -space-x-2.5">
              <img src="https://i.pravatar.cc/100?img=11" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8561d4] object-cover hover:z-10 hover:scale-110 transition-all" alt="Happy customer"/>
              <img src="https://i.pravatar.cc/100?img=32" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8561d4] object-cover hover:z-10 hover:scale-110 transition-all" alt="Happy customer"/>
              <img src="https://i.pravatar.cc/100?img=47" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8561d4] object-cover hover:z-10 hover:scale-110 transition-all" alt="Happy customer"/>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8561d4] bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-[7px] font-bold text-white">
                20K+
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold leading-tight text-white/90">
              <span className="block">Loved by 20K+</span>
              <span className="block text-white/70">Active Shoppers</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[35%] flex flex-col lg:items-end z-20 justify-between h-full pb-1">
          
          {/* Features row */}
          <div className="flex gap-4 sm:gap-6 justify-center lg:justify-end text-center text-[9px] sm:text-[10px] font-semibold text-white animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <span className="text-[10px]">Top Products</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766l.002-.001a1.56 1.56 0 011.883 1.882l-.001.002c-.14.468-.382.89-.766 1.208l-3.03 2.496M11.42 15.17L9.814 8.256c-.573 1.1-.03 2.52 1.007 2.87a2.686 2.686 0 002.266-.34L11.42 15.17zM11.42 15.17L4.946 8.697a3.42 3.42 0 114.836-4.836L16.25 10.332M11.42 15.17l-3.18-3.18c-.368-.368-.613-.844-.712-1.362l-.001-.005a1.561 1.561 0 011.666-1.841l.003.001c.421.057.817.242 1.144.524l2.08 2.08" />
                </svg>
              </div>
              <span className="text-[10px]">Local Services</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 002.25 1.015c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.5a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
                </svg>
              </div>
              <span className="text-[10px]">Verified Shops</span>
            </div>
          </div>

          {/* Become a Seller Card */}
          <div className="bg-white/20 backdrop-blur-md p-1 rounded-[20px] w-full sm:w-[200px] mx-auto lg:mx-0 text-center shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-white rounded-[16px] p-2.5 text-black pb-3">
              <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0.5">Sell on E-Shop</p>
              <div className="relative overflow-hidden rounded-[10px] mb-2 group">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&h=200" 
                  alt="Become a Seller" 
                  className="w-full h-[95px] object-cover rounded-[10px] bg-gray-100 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-extrabold text-[12px] mb-0.5">Become a Seller</h3>
              <p className="text-gray-500 text-[10px] font-medium mb-2">3 ways to sell online</p>
              <Link 
                to="/seller" 
                className="w-full bg-gradient-to-r from-[#8561d4] to-[#6c4db3] text-white py-2 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 hover:from-[#724ebf] hover:to-[#5a3d9e] transition-all shadow-md active:scale-95"
              >
                Get Started
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.89h2.25m-2.25 4.5h2.25m-3.285 9.03l.11-.082A13.65 13.65 0 0016.5 12V3.9L12 1.5 7.5 3.9V12c0 2.924 1.15 5.583 3.02 7.568l.11.082M12 21.75V12" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Central Girl Image */}
      <div className="absolute left-1/2 lg:left-[55%] bottom-0 -translate-x-1/2 z-30 h-[70%] lg:h-[95%] pointer-events-none drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <img 
          src="/Hero-image%20(2).png" 
          alt="Hero Model" 
          className="h-full object-contain object-bottom scale-[1.05] origin-bottom hover:scale-[1.08] transition-transform duration-500"
        />
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}