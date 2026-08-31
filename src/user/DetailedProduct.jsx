import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Store,
  Check,
  Award,
  Zap,
  Clock
} from 'lucide-react';

export default function DetailedProduct() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const product = {
    id: 'e1',
    title: 'Acoustic Pro Wireless ANC Headphones',
    tagline: 'Industry-Leading Active Noise Cancellation with High-Res Spatial Audio',
    price: 24999,
    originalPrice: 39999,
    discount: 37,
    rating: 4.8,
    reviewsCount: 1478,
    isAssured: true,
    category: 'Electronics',
    subCategory: 'Audio & Headphones',
    brand: 'Acoustic Labs',
    seller: {
      id: 'shop-1',
      name: 'Elite Digital Mall',
      rating: '4.9',
      location: 'Swaraj Round, Thrissur',
      reviews: '340+',
      verified: true
    },
    images: {
      black: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&h=600',
      white: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&h=600',
      blue: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&h=600'
    },
    colorNames: {
      black: 'Midnight Matte Black',
      white: 'Pearl White & Silver',
      blue: 'Navy Blue & Brass'
    },
    quickFeatures: [
      { label: 'Battery Life', value: '40 Hours Playtime' },
      { label: 'Noise Control', value: 'Hybrid ANC (-38dB)' },
      { label: 'Drivers', value: '40mm Dynamic Bass' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 + AUX' }
    ],
    highlights: [
      'Adaptive Hybrid Active Noise Cancellation blocks up to 98% of background noise.',
      'Custom tuned 40mm graphene dynamic drivers for crystal-clear highs and deep sub-bass.',
      'Ultra-fast Type-C charging: 10 minutes gives up to 5 hours of non-stop playback.',
      'Ergonomic memory-foam ear cushions wrapped in breathable protein leather.',
      'Quad-microphone array with AI ENC algorithm for studio-quality crystal voice calls.',
      'Dual device pairing to seamlessly switch between your laptop and smartphone.'
    ],
    specs: [
      { name: 'Model Name', value: 'Acoustic Pro Wireless ANC (2026 Edition)' },
      { name: 'Color', value: 'Midnight Matte Black' },
      { name: 'Headphone Type', value: 'Over-Ear Wireless' },
      { name: 'Bluetooth Version', value: 'v5.3 with Multipoint Connection' },
      { name: 'Driver Size', value: '40 mm Custom Titanium Dynamic' },
      { name: 'Frequency Response', value: '20 Hz – 40,000 Hz (Hi-Res Audio Certified)' },
      { name: 'Battery Capacity', value: '800 mAh Li-ion Rechargeable' },
      { name: 'Charging Time', value: '90 minutes to 100%' },
      { name: 'Microphones', value: '4 Built-in Mics with AI Noise Shield' },
      { name: 'Item Weight', value: '248 grams (Featherlight Comfort)' },
      { name: 'In the Box', value: 'Headphones, USB-C Cable, 3.5mm Aux Cable, Hard Travel Case, Manual' },
      { name: 'Warranty', value: '1 Year Full Domestic Brand Warranty' }
    ],
    description: `The Acoustic Pro Wireless ANC Headphones represent the peak of audio craftsmanship. Engineered with custom-developed 40mm titanium diaphragm drivers, every acoustic note from intricate classical instruments to thunderous bass drops is reproduced with absolute precision and clarity.

Our next-generation Hybrid Active Noise Cancellation system uses dedicated internal and external microphone arrays to analyze external noise 1,000 times per second, isolating you completely from bustling city streets, cafe chatter, and airplane engine hums.

Built with all-day luxury in mind, the frame is crafted from ultra-durable aerospace-grade aluminum and wrapped in memory foam cushions. Enjoy up to 40 hours of uninterrupted listening on a single charge with fast Type-C recovery.`,
    reviews: [
      {
        name: 'Rahul Varma',
        rating: 5,
        date: 'Verified Buyer · 3 days ago',
        comment: 'Unbelievable sound quality! The bass is tight and punchy without muddying the vocals. Active Noise Cancellation easily rivals headphones that cost twice as much. Delivery to Thrissur was within 24 hours.'
      },
      {
        name: 'Ananya Sharma',
        rating: 5,
        date: 'Verified Buyer · 1 week ago',
        comment: 'Super comfortable for long 8-hour work days. The microphone clarity on Zoom calls is crisp, and switching between my MacBook and phone is seamless.'
      },
      {
        name: 'Karthik Menon',
        rating: 4,
        date: 'Verified Buyer · 2 weeks ago',
        comment: 'Great build quality and very premium unboxing experience. Battery life easily lasted me a full week of daily commute.'
      }
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      title: 'Elite Smartwatch Series',
      price: '₹36,999',
      location: 'Elite Digital Mall',
      description: 'Next-gen health monitoring, custom workout tracking, and sleek responsive tactile controls.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'New Release',
      shipping: 'Free Shipping'
    },
    {
      id: 3,
      title: 'Lumix Mirrorless G9',
      price: '₹99,999',
      location: 'Elite Digital Mall',
      description: 'Ultra-fast autofocus mirrorless camera featuring 4K video recording and robust build.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=300',
      tag: 'Hot Deal',
      shipping: 'Free Shipping'
    },
    {
      id: 4,
      title: 'Sonic Fabric Speaker',
      price: '₹15,999',
      location: 'Elite Digital Mall',
      description: 'High-fidelity cylindrical Bluetooth speaker wrapped in tactile, sustainable textured fabric.',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&h=300',
      tag: 'Limited Edition',
      shipping: 'Free Shipping'
    },
    {
      id: 1,
      title: 'Acoustic Pro Headphones',
      price: '₹24,999',
      location: 'Elite Digital Mall',
      description: 'Immersive sound experience with advanced active noise cancellation and memory foam.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'Top Rated',
      shipping: 'Free Shipping'
    }
  ];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryStatus({
        success: true,
        message: 'Delivery available! Free express shipping by tomorrow.'
      });
    } else {
      setDeliveryStatus({
        success: false,
        message: 'Please enter a valid 6-digit pincode.'
      });
    }
  };

  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] text-slate-900 pb-20 antialiased font-sans">
        
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-slate-200/70 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/marketplace" className="hover:text-primary transition-colors">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-800 font-semibold truncate">{product.title}</span>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 flex flex-col gap-6">

          {/* Core Product Section Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 lg:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Compact Photo & Gallery */}
              <div className="lg:col-span-5 flex flex-col items-center gap-3">
                {/* Main Image Viewport (compact, controlled size) */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden relative w-full max-w-[360px] aspect-square flex items-center justify-center group shadow-xs">
                  <img 
                    src={product.images[selectedColor]} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {product.isAssured && (
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      Assured
                    </span>
                  )}

                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label="Wishlist"
                      className={`w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                        isWishlisted ? 'text-red-500 border-red-200' : 'text-slate-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      aria-label="Share"
                      className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="flex gap-2.5 w-full max-w-[360px] justify-center">
                  {Object.keys(product.images).map((colorKey) => (
                    <button 
                      key={colorKey}
                      onClick={() => setSelectedColor(colorKey)}
                      className={`border-2 rounded-xl overflow-hidden w-20 h-14 bg-slate-50 transition-all cursor-pointer p-0.5 ${
                        selectedColor === colorKey ? 'border-primary shadow-xs ring-2 ring-primary/20' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={product.images[colorKey]} alt={colorKey} className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>

                {/* Guarantee Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 w-full max-w-[360px] text-center">
                  <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-slate-700">100% Genuine</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-slate-700">7 Days Return</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-slate-700">1 Yr Warranty</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Information, Pricing, Action Buttons Above & Pincode Downside */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* 1. Header: Brand, Seller & Rating */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                        {product.brand}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500 font-medium">{product.subCategory}</span>
                    </div>

                    <Link 
                      to={`/shop/${product.seller.id}`}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-primary bg-slate-100 hover:bg-blue-50 px-2.5 py-0.5 rounded-full transition-colors border border-slate-200/60"
                    >
                      <Store className="w-3 h-3 text-primary" />
                      <span>{product.seller.name}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">★ {product.seller.rating}</span>
                    </Link>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center gap-2.5 mt-1.5">
                    <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-xs">
                      <span>{product.rating}</span>
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {product.reviewsCount.toLocaleString()} Ratings &amp; 380+ Reviews
                    </span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 ml-2">
                      <Clock className="w-3 h-3" />
                      In Stock
                    </span>
                  </div>
                </div>

                {/* 2. Price Block (Compact & Clean) */}
                <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-3 sm:p-3.5 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through font-medium">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded uppercase">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Inclusive of all taxes</span>
                </div>

                {/* 3. Color Variant Selection */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">
                    Color: <span className="text-primary font-bold">{product.colorNames[selectedColor]}</span>
                  </span>
                  <div className="flex gap-2">
                    {[
                      { id: 'black', label: 'Black', bg: 'bg-slate-900' },
                      { id: 'white', label: 'White', bg: 'bg-slate-100 border border-slate-300' },
                      { id: 'blue', label: 'Navy Blue', bg: 'bg-indigo-900' }
                    ].map((c) => (
                      <button 
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          selectedColor === c.id 
                            ? 'border-primary bg-blue-50/60 text-primary shadow-xs ring-1 ring-primary' 
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                        <span>{c.label}</span>
                        {selectedColor === c.id && <Check className="w-3 h-3 text-primary ml-0.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. QUANTITY & BUY NOW / ADD TO CART BUTTONS (PLACED DIRECTLY ABOVE!) */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between sm:justify-start bg-slate-100 border border-slate-200 rounded-xl p-1 h-12 w-full sm:w-auto shrink-0">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold cursor-pointer select-none rounded-lg hover:bg-white transition-all text-base"
                      title="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="w-8 text-center text-xs font-extrabold text-slate-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold cursor-pointer select-none rounded-lg hover:bg-white transition-all text-base"
                      title="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="flex-1 bg-white border-2 border-primary text-primary hover:bg-blue-50/70 font-extrabold text-xs sm:text-sm h-12 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer select-none">
                    <ShoppingBag className="w-4 h-4" />
                    ADD TO CART
                  </button>

                  {/* Buy Now Button */}
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-extrabold text-xs sm:text-sm h-12 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer select-none">
                    <Zap className="w-4 h-4 fill-current" />
                    BUY NOW
                  </button>
                </div>

                {/* 5. Key Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {product.quickFeatures.map((feat, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-lg p-2 flex flex-col justify-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{feat.label}</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5 truncate">{feat.value}</span>
                    </div>
                  ))}
                </div>

                {/* 6. PINCODE DELIVERY ESTIMATOR (PLACED DOWNSIDE!) */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-bold text-slate-700">Delivery Options:</span>
                    </div>

                    <form onSubmit={handlePincodeCheck} className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden p-0.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary w-full sm:w-64">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 ml-2 shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Enter 6-digit Pincode" 
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-transparent px-2 py-1 text-xs text-slate-800 font-semibold outline-none placeholder-slate-400"
                      />
                      <button 
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer select-none shrink-0"
                      >
                        Check
                      </button>
                    </form>
                  </div>

                  {deliveryStatus && (
                    <div className={`mt-2 text-xs font-semibold flex items-center gap-1.5 p-2 rounded-lg border ${
                      deliveryStatus.success 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{deliveryStatus.message}</span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* Seller Details Card (Flipkart style, outside tabs) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Sold by: {product.seller.name}</h3>
                  <span className="bg-blue-50 text-primary text-[9px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                    Verified Store
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{product.seller.location}</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100/50">
                    ★ {product.seller.rating} Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="border-l border-slate-200 pl-4 md:block hidden" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Total Reviews</span>
                <span className="text-sm font-extrabold text-slate-800">{product.seller.reviews}</span>
              </div>
              <div className="border-l border-slate-200 pl-4 md:block hidden" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Response Rate</span>
                <span className="text-sm font-extrabold text-slate-800">98% (Within 1h)</span>
              </div>
              <div className="border-l border-slate-200 pl-4 md:block hidden" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Return Policy</span>
                <span className="text-sm font-extrabold text-slate-800">7 Days Refund</span>
              </div>
            </div>

            <div className="flex gap-2.5 w-full md:w-auto mt-2 md:mt-0">
              <Link 
                to={`/shop/${product.seller.id}`}
                className="flex-1 md:flex-initial bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-center font-bold text-xs py-2.5 px-5 rounded-xl transition-all shadow-xs"
              >
                Visit Store
              </Link>
              <button 
                onClick={() => alert('Chat with seller is coming soon!')}
                className="flex-1 md:flex-initial bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Contact Seller
              </button>
            </div>
          </div>

          {/* Technical Specs, Description, and Customer Reviews Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
            
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200 gap-6 sm:gap-8 mb-5 overflow-x-auto select-none">
              {[
                { id: 'overview', label: 'Product Highlights' },
                { id: 'specs', label: 'Full Specifications' },
                { id: 'description', label: 'About This Item' },
                { id: 'reviews', label: `Customer Reviews (${product.reviews.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 font-bold text-xs sm:text-sm transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Highlights */}
            {activeTab === 'overview' && (
              <div className="space-y-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2">Key Performance Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.highlights.map((high, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{high}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Full Specifications */}
            {activeTab === 'specs' && (
              <div className="border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 font-semibold hover:bg-slate-50/60 transition-colors">
                    <div className="sm:col-span-4 text-slate-500 uppercase tracking-wider text-xs">{spec.name}</div>
                    <div className="sm:col-span-8 text-slate-900 mt-0.5 sm:mt-0">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Detailed Description */}
            {activeTab === 'description' && (
              <div className="max-w-4xl text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium space-y-3">
                {product.description}
              </div>
            )}

            {/* Tab: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="text-center bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xl font-black text-slate-900">{product.rating}</span>
                      <div className="flex text-amber-500 justify-center text-xs mt-0.5">★★★★★</div>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Overall Customer Satisfaction</h4>
                      <p className="text-xs text-slate-500 font-medium">Based on 1,478 verified purchases</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Review submission will open when you sign in.')}
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-3">
                  {product.reviews.map((rev, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 sm:p-4 shadow-xs">
                      <div className="flex justify-between items-start gap-4 mb-1.5">
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">{rev.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded text-xs font-bold">
                          <span>{rev.rating}</span>
                          <Star className="w-3 h-3 fill-current text-emerald-600" />
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Related Products Grid */}
          <div className="mt-2">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-0.5">Recommended Picks</span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Similar Products From Verified Sellers</h2>
              </div>
              <Link to="/marketplace" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} item={item} linkPrefix="/product" />
              ))}
            </div>
          </div>

        </main>
      </div>
    </UserLayout>
  );
}