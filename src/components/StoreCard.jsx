import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const storeChips = [
  { key: 'Verified', icon: 'badge', text: 'Verified' },
  { key: 'Free Shipping', icon: 'truck', text: 'Free Shipping' },
  { key: 'Return', icon: 'return', text: 'Easy Returns' },
  { key: 'Warranty', icon: 'shield', text: 'Warranty' }
];

const chipIcons = {
  badge: (
    <svg className="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  truck: (
    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-6 0a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  return: (
    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M4 10a8 8 0 1014.9 2" />
    </svg>
  ),
  shield: (
    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
};

export default function StoreCard({ store, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = store.images || [store.image];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((curr) => (curr + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((curr) => (curr - 1 + images.length) % images.length);
  };

  return (
    <div
      onClick={() => navigate(`/shop/${store.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-slate-200/80 relative flex flex-row font-sans min-h-[150px] sm:min-h-[190px] cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-[#1a73e8]/40 transition-all duration-300 ease-out overflow-hidden"
    >
      <div className="flex flex-row h-full w-full">

        {/* Left: Store Image Carousel */}
        <div className="relative w-[110px] sm:w-[190px] md:w-[220px] flex-shrink-0 min-h-full group cursor-pointer overflow-hidden bg-slate-100">

          <div
            className="flex h-full w-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {images.map((imgUrl, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0">
                <img
                  alt={`${store.name} ${idx + 1}`}
                  className="w-full h-full object-cover select-none"
                  src={imgUrl}
                />
              </div>
            ))}
          </div>

          {/* Verified Badge */}
          <div className="absolute top-2 left-2 bg-[#1a73e8] text-white text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-white/20">
            {chipIcons.badge}
            {store.badge || 'Verified'}
          </div>

          {/* Open / Closed */}
          <div className={`absolute top-2 right-2 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 ${
            store.isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${store.isOpen ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
            {store.isOpen ? 'Open' : 'Closed'}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => toggleFavorite && toggleFavorite(e, store.id)}
            className={`absolute bottom-2 right-2 sm:bottom-auto sm:top-9 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-colors z-10 ${
              favorites.includes(store.id) ? 'text-red-500 scale-105' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <svg className="w-4 h-4" fill={favorites.includes(store.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handlePrevImage}
                  className="w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 cursor-pointer"
                  type="button"
                  aria-label="Previous Image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
              </div>
              <div className="absolute inset-y-0 right-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleNextImage}
                  className="w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 cursor-pointer"
                  type="button"
                  aria-label="Next Image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </>
          )}

          {/* Image Count Pill */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide">
              {activeImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        {/* Middle & Right Content Wrapper */}
        <div className="flex-grow flex flex-row p-2.5 sm:p-3 gap-3 h-full min-w-0">

          {/* Middle Info */}
          <div className="flex-grow min-w-0 flex flex-col justify-between">
            <div>
              {/* Category */}
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                {store.category}
              </p>

              {/* Title & Mobile Rating */}
              <div className="flex items-start justify-between gap-2 mb-1 min-w-0 w-full">
                <h3 className="flex-1 min-w-0 text-xs sm:text-base md:text-lg font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#1a73e8] transition-colors line-clamp-1 sm:line-clamp-2">
                  {store.name}
                </h3>
                <div className="sm:hidden flex items-center gap-0.5 bg-blue-50 text-[#1a73e8] px-1.5 py-0.5 rounded-md shrink-0">
                  <span className="font-extrabold text-[10px]">{store.rating}</span>
                  <span className="text-[9px] font-bold">★</span>
                </div>
              </div>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                <div className="flex text-amber-400 shrink-0">
                  {[...Array(getStarCount(store.rating))].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-slate-400 text-[10px] sm:text-xs font-medium truncate">
                  {store.rating} ({store.reviews})
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-1 mb-2 text-[10px] sm:text-xs min-w-0">
                <svg className="w-3.5 h-3.5 text-[#1a73e8] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="leading-tight min-w-0 flex-grow">
                  <div className="text-[#1a73e8] font-semibold hover:underline cursor-pointer truncate">
                    {store.location}
                  </div>
                  <div className="text-slate-400 text-[9px] sm:text-[11px] truncate mt-0.5">
                    {store.distance} away
                  </div>
                </div>
              </div>

              {/* Store Tags Chips */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1 text-[9px] sm:text-[11px] text-slate-600">
                {storeChips.map((chip, i) => {
                  const isMobileHidden = i >= 3;
                  return (
                    <div key={chip.text} className={`flex items-center gap-0.5 sm:gap-1 bg-slate-50 px-1 sm:px-1.5 py-0.5 rounded-md border border-slate-200 ${isMobileHidden ? 'hidden sm:flex' : 'flex'}`}>
                      {chipIcons[chip.icon]}
                      <span>{chip.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              {store.description && (
                <p className="hidden sm:block mt-1.5 text-xs text-slate-600 leading-snug line-clamp-2">
                  {store.description}
                </p>
              )}
            </div>

            {/* Mobile Deal Bar */}
            <div className="sm:hidden mt-1 pt-1.5 border-t border-slate-100 flex items-end justify-between gap-2">
              <div className="min-w-0 flex flex-col items-start">
                <span className="text-rose-600 font-bold text-[9px]">Up to {store.maxDiscount}</span>
                <div className="text-[#1a73e8] text-base font-extrabold leading-tight">
                  {store.productCount} products
                </div>
                <span className="text-slate-400 text-[8px]">{store.rating} rated store</span>
              </div>
              <button
                type="button"
                className="shrink-0 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                Visit Store
              </button>
            </div>

            {/* Promo Tags - desktop */}
            <div className="hidden sm:flex flex-wrap gap-1.5 mt-1.5">
              <span className="bg-blue-50 text-[#1a73e8] text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-semibold">
                {store.productCount} products in store
              </span>
            </div>
          </div>

          {/* Right: Rating & Visit (Desktop) */}
          <div className="hidden sm:flex w-[130px] md:w-[150px] flex-col justify-between items-end border-l border-slate-100 pl-3 sm:pl-4 text-right shrink-0">

            {/* Ratings */}
            <div className="flex flex-col items-end w-full">
              <div className="flex items-center justify-end gap-2 mb-0.5">
                <span className="text-[#1a73e8] font-bold text-sm sm:text-base">{store.rating}</span>
                <span className="bg-[#1a73e8] text-white font-extrabold text-xs px-2 py-1 rounded-lg shadow-xs">
                  {store.rating}★
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">{store.reviews} reviews</div>
              <div className="text-slate-800 font-semibold text-xs mt-1">{store.distance} away</div>
            </div>

            {/* Deal */}
            <div className="flex flex-col items-end w-full mt-3">
              <div className="text-slate-400 text-[10px] mb-0.5">Best discount</div>
              <div className="text-rose-600 font-extrabold text-lg sm:text-xl leading-none">
                Up to {store.maxDiscount}
              </div>
              <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                {store.productCount} products
              </div>

              <button
                type="button"
                className="mt-3 w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
              >
                Visit Store
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function getStarCount(rating) {
  const num = parseFloat(rating);
  if (isNaN(num)) return 4;
  return Math.max(1, Math.min(5, Math.round(num)));
}
