import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-6 md:px-12 pt-5 pb-3 flex flex-col z-50">
      <div className="flex justify-between items-center w-full">
        {/* Mobile: Hamburger Icon (Left) */}
        <div className="flex md:hidden flex-1 justify-start">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-800 hover:text-gray-500 transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop: Navigation Links (Left) */}
        <div className="hidden md:flex flex-1 items-center justify-start gap-8">
          <Link to="/marketplace" className="text-[#1f1f1f] font-medium text-[15px] hover:text-gray-500 transition-colors tracking-tight">
            Marketplace
          </Link>
          <Link to="/products" className="text-[#1f1f1f] font-medium text-[15px] hover:text-gray-500 transition-colors tracking-tight">
            Products
          </Link>
          <Link to="/services" className="text-[#1f1f1f] font-medium text-[15px] hover:text-gray-500 transition-colors tracking-tight">
            Services
          </Link>
          <Link to="/seller" className="text-[#1f1f1f] font-medium text-[15px] hover:text-gray-500 transition-colors tracking-tight">
            Become a Seller
          </Link>
        </div>

        {/* Middle: Logo / Brand Name */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Link to="/" className="text-[22px] font-black text-black tracking-widest uppercase">
            E-SHOP
          </Link>
        </div>

        {/* Right side: Actions */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
          {/* Search Icon */}
          <button className="text-gray-800 hover:text-gray-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-800 hover:text-gray-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="absolute -top-1.5 -right-2 bg-[#7e63d3] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {/* Desktop Login Button */}
          <Link 
            to="/login" 
            className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-2 border-[1.5px] border-[#c3b6eb] rounded-full text-[#1f1f1f] hover:bg-[#f7f5ff] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#7e63d3" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="font-bold text-[14px]">Log in</span>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 bg-gray-50/70 rounded-2xl p-4 border border-gray-100 transition-all z-50">
          <Link 
            to="/marketplace" 
            onClick={() => setIsOpen(false)}
            className="text-[#1f1f1f] font-semibold text-[15px] hover:text-[#7e63d3] transition-colors tracking-tight py-2 border-b border-gray-100/50"
          >
            Marketplace
          </Link>
          <Link 
            to="/products" 
            onClick={() => setIsOpen(false)}
            className="text-[#1f1f1f] font-semibold text-[15px] hover:text-[#7e63d3] transition-colors tracking-tight py-2 border-b border-gray-100/50"
          >
            Products
          </Link>
          <Link 
            to="/services" 
            onClick={() => setIsOpen(false)}
            className="text-[#1f1f1f] font-semibold text-[15px] hover:text-[#7e63d3] transition-colors tracking-tight py-2 border-b border-gray-100/50"
          >
            Services
          </Link>
          <Link 
            to="/seller" 
            onClick={() => setIsOpen(false)}
            className="text-[#1f1f1f] font-semibold text-[15px] hover:text-[#7e63d3] transition-colors tracking-tight py-2 border-b border-gray-100/50"
          >
            Become a Seller
          </Link>
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-2.5 border-[1.5px] border-[#c3b6eb] rounded-full text-[#1f1f1f] bg-white hover:bg-[#f7f5ff] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#7e63d3" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="font-bold text-[14px]">Log in</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
