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
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  Store,
  Check,
  Zap,
  Clock,
  BatteryCharging,
  Volume2,
  Cpu,
  Bluetooth
} from 'lucide-react';

export default function DetailedProduct() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const handleColorChange = (colorKey) => {
    setSelectedColor(colorKey);
    setActiveImageIndex(0);
  };

  const product = {
    id: 'e1',
    title: 'Acoustic Pro Wireless ANC Headphones',
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
      black: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80'
      ],
      white: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80'
      ],
      blue: [
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    colorNames: {
      black: 'Midnight Matte Black',
      white: 'Pearl White & Silver',
      blue: 'Navy Blue & Brass'
    },
    quickFeatures: [
      { label: 'Battery Life', value: '40 Hours', icon: BatteryCharging, color: 'text-amber-600 bg-amber-50 border-amber-100' },
      { label: 'Noise Control', value: 'Hybrid ANC -38dB', icon: Volume2, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
      { label: 'Drivers', value: '40mm Dynamic', icon: Cpu, color: 'text-blue-600 bg-blue-50 border-blue-100' },
      { label: 'Connectivity', value: 'BT 5.3 + AUX', icon: Bluetooth, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' }
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
      { name: 'Item Weight', value: '248 grams' },
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
      <div className="bg-white min-h-screen pb-24 sm:pb-8">

        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8">

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">

            {/* Left: Images */}
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group shadow-sm flex items-center justify-center p-2 h-[300px] sm:h-[320px]">
                <img
                  src={product.images[selectedColor][activeImageIndex] || product.images[selectedColor][0]}
                  alt={`${product.title} - ${product.colorNames[selectedColor]}`}
                  className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02]"
                />
                {product.isAssured && (
                  <span className="absolute top-3 left-3 bg-primary/95 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" /> Assured
                  </span>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all ${
                      isWishlisted ? 'text-red-500 scale-110' : 'text-slate-500 hover:text-red-500 hover:scale-105'
                    }`}
                  >
                    <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:scale-105 transition-all">
                    <Share2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Downside Thumbnails: Change angle / photo of current product */}
              <div className="flex gap-2.5 justify-center items-center py-1">
                {product.images[selectedColor].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImageIndex === idx
                        ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-sm'
                        : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img src={imgUrl} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Highlights / Key Specifications */}
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                {product.quickFeatures.map((feat, idx) => {
                  const IconComponent = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 bg-slate-50/80 hover:bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${feat.color || 'bg-blue-50 text-primary border-blue-100'} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                          {feat.label}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                          {feat.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Color Selection */}
              <div className="mt-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                  Color Variant — <span className="font-normal text-slate-600">{product.colorNames[selectedColor]}</span>
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    { id: 'black', label: 'Matte Black', swatch: 'bg-slate-900' },
                    { id: 'white', label: 'Silver White', swatch: 'bg-gradient-to-br from-white to-slate-200 border border-slate-300' },
                    { id: 'blue', label: 'Navy Blue', swatch: 'bg-gradient-to-br from-blue-600 to-blue-900' }
                  ].map((c) => {
                    const isActive = selectedColor === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleColorChange(c.id)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold border-2 transition-all ${
                          isActive
                            ? 'border-primary bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-primary/60 hover:bg-blue-50/50'
                        }`}
                      >
                        <span className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${c.swatch} shrink-0 ring-1 sm:ring-2 ring-offset-1 ${isActive ? 'ring-white' : 'ring-transparent'}`} />
                        {c.label}
                        {isActive && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trust Bar */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 sm:py-3 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                  <span className="text-[10px] sm:text-[13px] font-medium">100% Genuine</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                  <span className="text-[10px] sm:text-[13px] font-medium">7 Day Returns</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                  <span className="text-[10px] sm:text-[13px] font-medium">1 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">

              {/* Brand & Category */}
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">{product.brand}</span>
                <span className="text-gray-300">|</span>
                <span className="text-[13px] text-gray-500">{product.subCategory}</span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5 bg-primary text-white px-2.5 py-1 rounded text-[13px] font-semibold">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[13px] text-gray-500">
                  {product.reviewsCount.toLocaleString()} ratings
                </span>
                <span className="text-[13px] text-green-600 font-semibold flex items-center gap-1">
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[13px] font-semibold text-primary">
                    {product.discount}% off
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Quantity + Actions (Desktop & Tablet inline view) */}
              <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
                <div className="flex items-center justify-between sm:justify-start border border-gray-200 rounded-xl h-11 px-3 sm:px-0">
                  <span className="sm:hidden text-xs font-semibold text-gray-500">Quantity</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-9 sm:w-11 h-full flex items-center justify-center text-gray-600 hover:text-primary font-medium transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 sm:w-11 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-9 sm:w-11 h-full flex items-center justify-center text-gray-600 hover:text-primary font-medium transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="hidden sm:flex flex-1 gap-2.5">
                  <button className="flex-1 border-2 border-primary text-primary hover:bg-blue-50 font-semibold text-sm h-11 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-primary hover:bg-blue-700 text-white font-semibold text-sm h-11 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-primary/25">
                    <Zap className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Delivery Check */}
              <div className="mb-5 p-3.5 sm:p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-900">Delivery</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-3 focus-within:border-primary transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-2 py-2 text-xs sm:text-sm outline-none placeholder-gray-400 min-w-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-2 bg-primary hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>
                {deliveryStatus && (
                  <p className={`mt-2.5 text-xs sm:text-sm font-medium ${deliveryStatus.success ? 'text-green-600' : 'text-red-500'}`}>
                    {deliveryStatus.message}
                  </p>
                )}
              </div>

              {/* Seller Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.seller.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{product.seller.location}</span>
                      <span className="text-amber-500 font-semibold">★ {product.seller.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Link
                    to={`/shop/${product.seller.id}`}
                    className="flex-1 sm:flex-none text-center px-3.5 py-2 border border-primary text-primary rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Visit Store
                  </Link>
                  <button
                    onClick={() => alert('Contacting seller...')}
                    className="flex-1 sm:flex-none text-center px-3.5 py-2 bg-primary hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Contact Us
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section — Two-Column Layout on Desktop */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

              {/* Left Column: Tab Headers + Tab Content */}
              <div className="lg:col-span-2">
                {/* Tab Headers */}
                <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                  {[
                    { id: 'specs', label: 'Specifications' },
                    { id: 'overview', label: 'Highlights' },
                    { id: 'description', label: 'Description' },
                    { id: 'reviews', label: `Reviews (${product.reviews.length})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab: Specs */}
                {activeTab === 'specs' && (
                  <div>
                    {product.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`flex py-3 ${idx !== product.specs.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        <span className="w-48 text-sm text-gray-500 shrink-0">{spec.name}</span>
                        <span className="text-sm text-gray-900 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab: Highlights */}
                {activeTab === 'overview' && (
                  <div>
                    <ul className="space-y-4">
                      {product.highlights.map((high, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 leading-relaxed">{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tab: Description */}
                {activeTab === 'description' && (
                  <div>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.description}
                    </div>
                  </div>
                )}

                {/* Tab: Reviews */}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                      <div className="text-center">
                        <span className="text-4xl font-bold text-gray-900">{product.rating}</span>
                        <div className="flex gap-0.5 mt-1 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{product.reviewsCount.toLocaleString()} ratings</p>
                      </div>
                      <div className="flex-1">
                        {[
                          { stars: 5, pct: 78 },
                          { stars: 4, pct: 15 },
                          { stars: 3, pct: 4 },
                          { stars: 2, pct: 2 },
                          { stars: 1, pct: 1 }
                        ].map((bar) => (
                          <div key={bar.stars} className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500 w-3">{bar.stars}</span>
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${bar.pct}%` }} />
                            </div>
                            <span className="text-xs text-gray-400 w-8">{bar.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {product.reviews.map((rev, idx) => (
                        <div key={idx} className={idx !== product.reviews.length - 1 ? 'pb-6 border-b border-gray-100' : ''}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                              {rev.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{rev.name}</p>
                              <p className="text-xs text-gray-500">{rev.date}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1 text-sm font-semibold text-gray-900">
                              <span>{rev.rating}</span>
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed ml-12">
                            {rev.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Purchase Sidebar (Desktop Only) */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">

                  {/* Price + Discount Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-baseline gap-2.5 mb-1">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">{product.discount}% OFF</span>
                      <span className="text-xs text-gray-500">Inclusive of all taxes</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Quantity</span>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary font-medium transition-colors"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary font-medium transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-2.5">
                      <button className="w-full border-2 border-primary text-primary hover:bg-blue-50 font-semibold text-sm h-11 rounded-xl flex items-center justify-center gap-2 transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button className="w-full bg-primary hover:bg-blue-700 text-white font-semibold text-sm h-11 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-primary/25">
                        <Zap className="w-4 h-4" />
                        Buy Now
                      </button>
                    </div>
                  </div>

                  {/* Delivery Check Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-gray-900">Delivery</span>
                    </div>
                    <form onSubmit={handlePincodeCheck} className="flex gap-2">
                      <div className="flex items-center flex-1 bg-slate-50 border border-gray-200 rounded-lg px-3 focus-within:border-primary transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="Enter pincode"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full px-2 py-2 text-xs outline-none placeholder-gray-400 min-w-0 bg-transparent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-primary hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                      >
                        Check
                      </button>
                    </form>
                    {deliveryStatus && (
                      <p className={`mt-2 text-xs font-medium ${deliveryStatus.success ? 'text-green-600' : 'text-red-500'}`}>
                        {deliveryStatus.message}
                      </p>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Truck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Free express delivery on this order</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <RotateCcw className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>7-day easy return policy</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>1 Year Manufacturer Warranty</span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Sold by</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Store className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{product.seller.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{product.seller.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span className="font-semibold text-gray-900">{product.seller.rating}</span>
                        <span className="text-gray-400">({product.seller.reviews} reviews)</span>
                      </div>
                      {product.seller.verified && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/shop/${product.seller.id}`}
                        className="flex-1 text-center px-3 py-2 border border-primary text-primary rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors"
                      >
                        Visit Store
                      </Link>
                      <button
                        onClick={() => alert('Contacting seller...')}
                        className="flex-1 text-center px-3 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Related Products */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">You might also like</h2>
                <p className="text-[13px] text-gray-500 mt-0.5">Similar products from verified sellers</p>
              </div>
              <Link to="/marketplace" className="text-sm font-medium text-primary hover:text-blue-700 flex items-center gap-1 transition-colors">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} item={item} linkPrefix="/product" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2.5">
        <button className="flex-1 border-2 border-primary text-primary active:bg-blue-50 font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
        <button className="flex-1 bg-primary active:bg-blue-700 text-white font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-primary/25">
          <Zap className="w-4 h-4" />
          Buy Now
        </button>
      </div>
    </UserLayout>
  );
}
