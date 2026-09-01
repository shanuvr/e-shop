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
      <div className="bg-white min-h-screen">

        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link to="/marketplace" className="hover:text-gray-900 transition-colors">Marketplace</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left: Images */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group shadow-sm flex items-center justify-center p-3 h-[360px] sm:h-[380px]">
                <img
                  src={product.images[selectedColor][activeImageIndex] || product.images[selectedColor][0]}
                  alt={`${product.title} - ${product.colorNames[selectedColor]}`}
                  className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02]"
                />
                {product.isAssured && (
                  <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Assured
                  </span>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all ${
                      isWishlisted ? 'text-red-500 scale-110' : 'text-slate-500 hover:text-red-500 hover:scale-105'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:scale-105 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Downside Thumbnails: Change angle / photo of current product */}
              <div className="flex gap-3 justify-center items-center py-1">
                {product.images[selectedColor].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImageIndex === idx
                        ? 'border-slate-900 ring-2 ring-slate-900/20 scale-105 shadow-sm'
                        : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img src={imgUrl} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Highlights / Key Specifications */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {product.quickFeatures.map((feat, idx) => {
                  const IconComponent = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-slate-50/80 hover:bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className={`w-9 h-9 rounded-lg ${feat.color || 'bg-blue-50 text-blue-600 border-blue-100'} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {IconComponent && <IconComponent className="w-4.5 h-4.5" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                          {feat.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {feat.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Bar */}
              <div className="flex items-center justify-center gap-8 py-4 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-medium">7 Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">

              {/* Brand & Category */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{product.brand}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{product.subCategory}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1 rounded text-sm font-semibold">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviewsCount.toLocaleString()} ratings
                </span>
                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {product.discount}% off
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  Color Variant — <span className="font-normal text-slate-600">{product.colorNames[selectedColor]}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'black', label: 'Matte Black', bg: 'bg-slate-900' },
                    { id: 'white', label: 'Silver White', bg: 'bg-slate-100 border border-slate-300' },
                    { id: 'blue', label: 'Navy Blue', bg: 'bg-indigo-900' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleColorChange(c.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                        selectedColor === c.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.bg} shrink-0`} />
                      {c.label}
                      {selectedColor === c.id && <Check className="w-4 h-4 text-white ml-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg h-12">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold text-sm h-12 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold text-sm h-12 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Zap className="w-4 h-4" />
                  Buy Now
                </button>
              </div>

              {/* Delivery Check */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-900">Delivery</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-lg px-3 focus-within:border-gray-900 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-2 py-2.5 text-sm outline-none placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Check
                  </button>
                </form>
                {deliveryStatus && (
                  <p className={`mt-3 text-sm font-medium ${deliveryStatus.success ? 'text-green-600' : 'text-red-500'}`}>
                    {deliveryStatus.message}
                  </p>
                )}
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.seller.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{product.seller.location}</span>
                      <span className="text-amber-500 font-semibold">★ {product.seller.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/shop/${product.seller.id}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Visit Store
                  </Link>
                  <button
                    onClick={() => alert('Chat with seller coming soon!')}
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Chat
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            {/* Tab Headers */}
            <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
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
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl">
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
              <div className="max-w-3xl">
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
              <div className="max-w-3xl">
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
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

          {/* Related Products */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">You might also like</h2>
                <p className="text-sm text-gray-500 mt-1">Similar products from verified sellers</p>
              </div>
              <Link to="/marketplace" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} item={item} linkPrefix="/product" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
