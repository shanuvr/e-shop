import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye } from 'lucide-react';

export default function ProductCard({ item, linkPrefix = '/product' }) {
  if (!item) return null;

  const targetLink = item.link || `${linkPrefix}/${item.id || ''}`;
  const displayTag = item.tag || item.badge;
  const isTopRated = displayTag === 'Top Rated' || (typeof displayTag === 'string' && displayTag.includes('★'));

  const formattedPrice = typeof item.price === 'number' 
    ? `₹${item.price.toLocaleString()}` 
    : item.price;

  const formattedOriginalPrice = item.originalPrice 
    ? (typeof item.originalPrice === 'number' ? `₹${item.originalPrice.toLocaleString()}` : item.originalPrice)
    : null;

  // Extract or derive 1 or 2 key highlight points
  const getHighlights = () => {
    if (item.highlights && Array.isArray(item.highlights) && item.highlights.length > 0) {
      return item.highlights.slice(0, 2);
    }
    
    // Custom highlights for specific products
    const itemId = String(item.id);
    if (itemId === '1' || itemId === 'e1') return ['Active Noise Cancellation', 'Memory Foam Earcups'];
    if (itemId === '2' || itemId === 'e2') return ['Health Monitoring', 'Custom Workout Tracking'];
    if (itemId === '3' || itemId === 'e4') return ['4K Video Recording', 'Fast Autofocus'];
    if (itemId === '4' || itemId === 'e8') return ['High-Fidelity Audio', 'Textured Fabric Wrap'];
    if (itemId === 'e5') return ['4K Ultra HD Display', '100% sRGB Color Calibrated'];
    if (itemId === 'e6') return ['RGB Backlighting', 'Hot-Swappable Switches'];
    if (itemId === 'f1') return ['Authentic Handloom', 'Golden Zari Weave'];
    if (itemId === 'f2') return ['Turkish Rose Notes', 'Rich Oud Fragrance'];
    if (itemId === 'h1') return ['Solid Teak Wood', 'Cushioned Seating'];
    if (itemId === 'h2') return ['Warm LED Ambient', 'Brushed Bamboo Base'];
    if (itemId === 'bh1') return ['100% Cold-Pressed', 'Skin Hydration Formula'];
    if (itemId === 'sp1') return ['Carbon Fiber Build', 'High Tension Control'];
    if (itemId === 'bk1') return ['Gold Embossed Cover', 'Collector Boxed Set'];
    if (itemId === 'au1') return ['Heavy Duty Motor', 'Brass Pressure Nozzle'];
    if (itemId === 'sv1' || itemId === '101') return ['Hospital-Grade Clean', 'Certified Local Pros'];
    if (itemId === '102') return ['Certified Technicians', 'Quick Repair Warranty'];
    if (itemId === '103') return ['24/7 Emergency Service', 'Licensed Plumbers'];
    if (itemId === '104') return ['Personalized Learning', '1-on-1 Online Class'];

    // Fallback: derive 1 or 2 points from description
    if (item.description || item.desc) {
      const parts = (item.description || item.desc)
        .split(/[,;.]/)
        .map(s => s.trim())
        .filter(s => s.length > 3 && s.length < 35);
      if (parts.length >= 2) return parts.slice(0, 2);
      if (parts.length === 1) return [parts[0]];
    }

    return ['100% Genuine Quality', 'Verified Local Seller'];
  };

  const highlights = getHighlights();

  return (
    <Link 
      to={targetLink} 
      className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 ease-out group relative border border-slate-200/80 hover:border-blue-300 flex flex-col justify-between cursor-pointer w-full"
    >
      <div>
        {/* Top Tag Badge (Minimalist Micro-Pill) */}
        {displayTag && (
          <div className="absolute top-2 left-2 z-10 text-[9px] font-semibold text-slate-700 bg-white/95 backdrop-blur-md border border-slate-200/80 px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1 transition-all">
            {isTopRated ? (
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
            ) : (
              <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
            )}
            <span className="leading-none">{displayTag}</span>
          </div>
        )}
        
        {/* Wishlist Heart Button */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-90 shadow-2xs transition-all duration-200 backdrop-blur-sm cursor-pointer border border-slate-100"
          aria-label="Add to wishlist"
        >
          <Heart className="w-3.5 h-3.5 transition-transform group-active:scale-125" />
        </button>

        {/* Product Image Container */}
        <div className="h-32 sm:h-40 bg-slate-50 w-full overflow-hidden relative">
          <img 
            alt={item.title} 
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 ease-out" 
            src={item.image || item.img} 
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out hover:scale-105 active:scale-95">
              <Eye className="w-3 h-3 text-blue-600" />
              View Details
            </span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-3 sm:p-3.5 space-y-1.5">
          
          {/* Category & Rating Header line */}
          <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
            {item.category && (
              <span className="text-blue-600 font-semibold tracking-wide text-[9px] truncate max-w-[120px]">
                {item.category}
              </span>
            )}
            {item.rating && (
              <span className="flex items-center gap-0.5 text-amber-500 font-semibold ml-auto text-[11px]">
                <Star className="w-3 h-3 fill-current" />
                <span>{item.rating}</span>
                {item.reviews && <span className="text-slate-400 font-normal text-[10px]">({item.reviews})</span>}
              </span>
            )}
          </div>

          {/* Full Title on its own dedicated lines */}
          <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* 1 or 2 Key Highlight Bullet Points */}
          <div className="pt-0.5 space-y-1">
            {highlights.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-600 truncate">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="truncate">{pt}</span>
              </div>
            ))}
          </div>

          {/* Dedicated Price Block */}
          <div className="pt-1.5 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-black text-slate-900 leading-none">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[11px] text-slate-400 line-through font-medium">
                {formattedOriginalPrice}
              </span>
            )}
            {item.discount && (
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                {item.discount}% OFF
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Footer Tag (Shipping / Offer) */}
      {(item.shipping || item.tag2) && (
        <div className="px-3 pb-2.5 sm:px-3.5 sm:pb-3 pt-0">
          <span className="text-emerald-700 text-[9px] font-semibold tracking-normal bg-emerald-50/70 border border-emerald-200/40 px-1.5 py-0.5 rounded inline-block leading-none">
            {item.shipping || item.tag2}
          </span>
        </div>
      )}
    </Link>
  );
}
