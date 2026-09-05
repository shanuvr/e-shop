import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye } from 'lucide-react';

// Custom rounded 5-star rating SVG matching standard high-end e-commerce star designs
const RoundedStarIcon = ({ fill = "#FF9500", size = 14 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className="shrink-0 inline-block"
  >
    <path 
      d="M12 2.25c.34 0 .66.19.82.5l2.67 5.41 5.97.87c.36.05.66.29.77.63.11.34.02.72-.24.97l-4.32 4.21 1.02 5.95c.06.36-.08.72-.37.93-.29.21-.68.24-1 .07L12 18.96l-5.34 2.81c-.32.17-.71.14-1-.07-.29-.21-.43-.57-.37-.93l1.02-5.95-4.32-4.21c-.26-.25-.35-.63-.24-.97.11-.34.41-.58.77-.63l5.97-.87 2.67-5.41c.16-.31.48-.5.82-.5z" 
      fill={fill} 
      stroke={fill === "url(#halfStarGrad)" ? "#FF9500" : fill} 
      strokeWidth="1.2" 
      strokeLinejoin="round" 
      strokeLinecap="round" 
    />
  </svg>
);

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

  const numericRating = item.rating !== undefined && item.rating !== null ? parseFloat(item.rating) : 4.5;
  const ratingValue = isNaN(numericRating) || numericRating <= 0 ? 4.5 : Math.min(5, numericRating);
  const reviewText = item.reviews || item.reviewCount || null;

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
          
          {/* Category Header line */}
          {item.category && (
            <div className="text-blue-600 font-semibold tracking-wide text-[9px] uppercase truncate">
              {item.category}
            </div>
          )}

          {/* Full Title on its own dedicated lines */}
          <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Plump Rounded Star Rating Bar (Matching high-end E-Commerce UI) */}
          <div className="flex items-center gap-1.5 pt-0.5" title={`${ratingValue.toFixed(1)} out of 5 stars`}>
            <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id="halfStarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#FF9500" />
                  <stop offset="50%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>
            </svg>

            {/* 5 Plump Rounded Stars */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => {
                let starFill = "#CBD5E1"; // light slate gray for empty star (from screenshot)
                if (ratingValue >= star - 0.25) {
                  starFill = "#FF9500"; // rich vivid orange for filled star (from screenshot)
                } else if (ratingValue >= star - 0.75) {
                  starFill = "url(#halfStarGrad)";
                }
                return (
                  <RoundedStarIcon key={star} fill={starFill} size={15} />
                );
              })}
            </div>

            <span className="font-bold text-slate-800 text-[12px] leading-none ml-0.5">
              {ratingValue.toFixed(1)}
            </span>

            {reviewText && (
              <span className="text-slate-400 font-medium text-[10px] leading-none ml-auto truncate">
                ({reviewText})
              </span>
            )}
          </div>

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
