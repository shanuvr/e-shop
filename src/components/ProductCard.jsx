import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item, linkPrefix = '/product' }) {
  if (!item) return null;

  const targetLink = item.link || `${linkPrefix}/${item.id || ''}`;
  const displayTag = item.tag || item.badge;
  const isTopRated = displayTag === 'Top Rated' || (typeof displayTag === 'string' && displayTag.includes('★'));

  return (
    <Link 
      to={targetLink} 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 ease-out group relative border border-slate-200/60 hover:border-blue-400/50 flex flex-col justify-between cursor-pointer w-full"
    >
      <div>
        {displayTag && (
          <div className={`absolute top-2.5 left-2.5 z-10 text-[8px] sm:text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-sm flex items-center gap-1 backdrop-blur-md transition-transform group-hover:scale-105 ${
            isTopRated ? 'bg-emerald-800/90 text-white' : 'bg-blue-600/90 text-white'
          }`}>
            {isTopRated && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 sm:w-3 sm:h-3">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            )}
            {displayTag}
          </div>
        )}
        
        {/* Wishlist Heart Button */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8.5 sm:h-8.5 bg-white/90 rounded-full flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-90 shadow-sm transition-all duration-200 backdrop-blur-sm cursor-pointer"
          aria-label="Add to wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-active:scale-125">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Product Image Box */}
        <div className="h-[130px] sm:h-[190px] bg-slate-50 w-full overflow-hidden relative">
          <img 
            alt={item.title} 
            className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out" 
            src={item.image || item.img} 
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white text-blue-600 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              View Details
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-2">
            <h3 className="font-bold text-[11px] sm:text-base text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 sm:line-clamp-1 leading-snug">{item.title}</h3>
            <span className="text-[13px] sm:text-lg font-bold text-blue-600 shrink-0">{item.price}</span>
          </div>
          {item.location && (
            <p className="text-slate-500 text-[10px] sm:text-xs mb-1 sm:mb-1.5 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {item.location}
            </p>
          )}
          <p className="hidden sm:block text-slate-500 text-[10px] sm:text-xs line-clamp-2 leading-relaxed mt-1 sm:mt-1.5">
            {item.description || item.desc}
          </p>
        </div>
      </div>
      {(item.shipping || item.tag2) && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
          <span className="text-emerald-700 text-[8px] sm:text-[10px] font-bold uppercase tracking-tight bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-md inline-block">
            {item.shipping || item.tag2}
          </span>
        </div>
      )}
    </Link>
  );
}

