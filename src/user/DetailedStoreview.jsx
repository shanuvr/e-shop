import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import ProductCard from '../components/ProductCard';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function DetailedStoreview() {
  const store = {
    id: 'shop-1',
    name: 'Elite Digital Mall',
    category: 'Electronics & Mobiles',
    location: 'Swaraj Round, Thrissur',
    rating: '4.9',
    reviews: '340+',
    phone: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&h=300',
    logo: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=200&h=200',
    badge: 'VERIFIED STORE',
    isOpen: true,
    description: 'Thrissur\'s most trusted electronics destination. We stock the latest smartphones, laptops, audio gear, and smart devices from top global brands. Every product comes with manufacturer warranty and our personal satisfaction guarantee.',
    hours: '9:00 AM – 9:00 PM',
    established: '2019'
  };

  const products = [
    {
      id: 'e1',
      title: 'Acoustic Pro Headphones',
      price: '₹24,999',
      location: 'Elite Digital Mall',
      description: 'Immersive sound experience with advanced active noise cancellation and memory foam earcups for all-day comfort.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'Bestseller',
      shipping: 'Free Shipping',
      category: 'Audio'
    },
    {
      id: 'e2',
      title: 'Elite Smartwatch Series',
      price: '₹36,999',
      location: 'Elite Digital Mall',
      description: 'Next-gen health monitoring, custom workout tracking, and sleek responsive tactile controls on a vibrant display.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'New',
      category: 'Wearables'
    },
    {
      id: 'e3',
      title: 'Lumix Mirrorless G9 Camera',
      price: '₹99,999',
      location: 'Elite Digital Mall',
      description: 'Ultra-fast autofocus mirrorless camera featuring 4K video recording and robust image stabilization.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=300',
      tag: 'Hot Deal',
      category: 'Cameras'
    },
    {
      id: 'e4',
      title: 'Sonic Fabric Speaker',
      price: '₹15,999',
      location: 'Elite Digital Mall',
      description: 'High-fidelity cylindrical Bluetooth speaker wrapped in tactile, sustainable textured fabric.',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&h=300',
      tag: 'Limited',
      shipping: 'Free Shipping',
      category: 'Audio'
    },
    {
      id: 'e5',
      title: 'Ultra HD 4K Monitor',
      price: '₹89,999',
      location: 'Elite Digital Mall',
      description: 'Professional creator monitor with 100% sRGB coverage and factory calibrated color accuracy.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&h=300',
      tag: 'Top Rated',
      category: 'Computers'
    },
    {
      id: 'e6',
      title: 'Mechanical Keyboard RGB',
      price: '₹15,999',
      location: 'Elite Digital Mall',
      description: 'Hot-swappable mechanical switches with vibrant RGB backlighting and premium aluminum top plate.',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&h=300',
      tag: 'Staff Pick',
      category: 'Computers'
    },
    {
      id: 'e7',
      title: 'Wireless Earbuds Pro',
      price: '₹8,999',
      location: 'Elite Digital Mall',
      description: 'Compact true wireless earbuds with active noise cancellation and 30-hour total battery life.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=400&h=300',
      shipping: 'Free Shipping',
      category: 'Audio'
    },
    {
      id: 'e8',
      title: 'Smart Home Hub',
      price: '₹12,499',
      location: 'Elite Digital Mall',
      description: 'Central control unit for all your smart devices with voice assistant and touchscreen display.',
      image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=400&h=300',
      tag: 'New',
      category: 'Smart Home'
    }
  ];

  const categories = ['All', 'Audio', 'Wearables', 'Cameras', 'Computers', 'Smart Home'];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const PRICE_MIN = 0;
  const PRICE_MAX = 100000;

  const featuredProducts = products.slice(0, 4);

  const policies = [
    { icon: <Truck className="w-5 h-5" />, title: 'Free Shipping', desc: 'On all orders above ₹499 within Thrissur' },
    { icon: <RotateCcw className="w-5 h-5" />, title: 'Easy Returns', desc: 'Hassle-free 7-day return policy' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: '1 Year Warranty', desc: 'All items covered with manufacturer warranty' },
    { icon: <Phone className="w-5 h-5" />, title: '24/7 Support', desc: 'Dedicated store support team available' }
  ];

  const storeReviews = [
    {
      name: 'Suresh Nair',
      date: 'Verified Buyer · 2 days ago',
      rating: 5,
      comment: 'Excellent store! The staff helped me choose the perfect laptop and even arranged same-day delivery. Highly recommend for anyone in Thrissur.'
    },
    {
      name: 'Lakshmi Menon',
      date: 'Verified Buyer · 1 week ago',
      rating: 5,
      comment: 'Genuine products at great prices. The warranty process was smooth and the after-sales support is really responsive.'
    },
    {
      name: 'Arjun Krishnan',
      date: 'Verified Buyer · 2 weeks ago',
      rating: 4,
      comment: 'Good selection and quick delivery. Would be 5 stars if the store had more photography gear options in stock.'
    },
    {
      name: 'Priya Das',
      date: 'Verified Buyer · 1 month ago',
      rating: 5,
      comment: 'Bought headphones and a smartwatch. Everything arrived perfectly packed and well within the promised time.'
    }
  ];

  const ratingBreakdown = [
    { stars: 5, pct: 82 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 }
  ];

  const totalFilters =
    (selectedCategory !== 'All' ? 1 : 0) +
    (priceRange.min !== PRICE_MIN || priceRange.max !== PRICE_MAX ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setPriceRange({ min: PRICE_MIN, max: PRICE_MAX });
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => {
      const price = parseInt(p.price.replace(/[₹,]/g, ''));
      return price >= priceRange.min && price <= priceRange.max;
    });

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
        const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
        const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Most Reviews') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery, priceRange]);

  return (
    <UserLayout>
      <div className="bg-white min-h-screen">

        {/* Dual range slider thumb styling */}
        <style>{`
          .price-range input::-webkit-slider-thumb {
            -webkit-appearance: none;
            pointer-events: auto;
            width: 16px;
            height: 16px;
            border-radius: 9999px;
            background: #ffffff;
            border: 2px solid #111827;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            cursor: pointer;
            position: relative;
            z-index: 5;
          }
          .price-range input::-moz-range-thumb {
            pointer-events: auto;
            width: 14px;
            height: 14px;
            border-radius: 9999px;
            background: #ffffff;
            border: 2px solid #111827;
            cursor: pointer;
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link to="/marketplace" className="hover:text-gray-900 transition-colors">Marketplace</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium truncate">{store.name}</span>
          </div>
        </div>

        {/* Store Banner */}
        <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-end gap-4">
                {/* Store Profile Picture */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white -mb-2">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/90 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded">
                      {store.badge}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded ${
                      store.isOpen
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {store.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{store.name}</h1>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <Star className="w-4 h-4 fill-current text-amber-400" />
                      <span className="font-semibold">{store.rating}</span>
                      <span className="text-white/60">({store.reviews})</span>
                    </div>
                    <span className="text-white/40">|</span>
                    <span className="text-white/80 text-sm">{store.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm pb-1">
                <MapPin className="w-4 h-4" />
                <span>{store.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Info Bar */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                {store.description}
              </p>
              <div className="flex items-center gap-5 text-sm text-gray-500 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{store.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Active filter chips */}
          {totalFilters > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                >
                  {selectedCategory}
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {(priceRange.min !== PRICE_MIN || priceRange.max !== PRICE_MAX) && (
                <button
                  onClick={() => setPriceRange({ min: PRICE_MIN, max: PRICE_MAX })}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                >
                  ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                >
                  "{searchQuery}"
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={clearAllFilters}
                className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Products</h2>
              <p className="text-sm text-gray-500 mt-0.5">{filteredProducts.length} items in this store</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition-colors placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="sm:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer focus:border-gray-900"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
                <option>Most Reviews</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">

            {/* Sidebar - Desktop */}
            <aside className="hidden sm:block w-56 shrink-0">
              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Price Range</h3>

                {/* Dual range slider */}
                <div className="price-range relative h-1.5 bg-gray-200 rounded-full mb-5">
                  {/* Filled track */}
                  <div
                    className="absolute top-0 bottom-0 bg-gray-900 rounded-full"
                    style={{
                      left: `${((priceRange.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                      right: `${100 - ((priceRange.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`
                    }}
                  />
                  {/* Thumbs */}
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={1000}
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Math.min(Number(e.target.value), prev.max - 1000) }))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 3 }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={1000}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Math.max(Number(e.target.value), prev.min + 1000) }))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 4 }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-gray-900">₹{priceRange.min.toLocaleString()}</span>
                  <span className="text-gray-400">to</span>
                  <span className="text-gray-900">₹{priceRange.max.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setPriceRange({ min: PRICE_MIN, max: PRICE_MAX })}
                  className="mt-3 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Reset price
                </button>
              </div>

              {/* Categories */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Store Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Established</p>
                    <p className="text-gray-900 font-medium">{store.established}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-gray-900 font-medium">{store.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Hours</p>
                    <p className="text-gray-900 font-medium">{store.hours}</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile filter drawer */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 sm:hidden">
                <div
                  onClick={() => setMobileFilterOpen(false)}
                  className="absolute inset-0 bg-black/40"
                />
                <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Price Range</h4>
                    <div className="price-range relative h-1.5 bg-gray-200 rounded-full mb-5">
                      <div
                        className="absolute top-0 bottom-0 bg-gray-900 rounded-full"
                        style={{
                          left: `${((priceRange.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                          right: `${100 - ((priceRange.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`
                        }}
                      />
                      <input
                        type="range"
                        min={PRICE_MIN}
                        max={PRICE_MAX}
                        step={1000}
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Math.min(Number(e.target.value), prev.max - 1000) }))}
                        className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                        style={{ zIndex: 3 }}
                      />
                      <input
                        type="range"
                        min={PRICE_MIN}
                        max={PRICE_MAX}
                        step={1000}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Math.max(Number(e.target.value), prev.min + 1000) }))}
                        className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                        style={{ zIndex: 4 }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="text-gray-900">₹{priceRange.min.toLocaleString()}</span>
                      <span className="text-gray-400">to</span>
                      <span className="text-gray-900">₹{priceRange.max.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setPriceRange({ min: PRICE_MIN, max: PRICE_MAX })}
                      className="mt-3 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Reset price
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setMobileFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === cat
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full mt-6 px-4 py-3 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-900 font-semibold text-lg">No products found</p>
                  <p className="text-gray-500 text-sm mt-1">Try a different search or category</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((item) => (
                    <ProductCard key={item.id} item={item} linkPrefix="/product" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured / Bestsellers Strip */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Bestsellers at {store.name}</h2>
              </div>
              <Link to="/marketplace" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {featuredProducts.map((item) => (
                <ProductCard key={item.id} item={item} linkPrefix="/product" />
              ))}
            </div>
          </div>
        </div>

        {/* Store Policies */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Store policies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {policies.map((policy, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 shrink-0">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{policy.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{policy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Reviews */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">What buyers say about this store</h2>
                <p className="text-sm text-gray-500 mt-1">Based on {store.reviews} verified reviews</p>
              </div>
              <button className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors">
                Write a review
              </button>
            </div>

            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
              <div className="text-center shrink-0">
                <span className="text-5xl font-bold text-gray-900">{store.rating}</span>
                <div className="flex gap-0.5 mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(store.rating)) ? 'text-amber-400 fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1.5">{store.reviews} reviews</p>
              </div>
              <div className="flex-1">
                {ratingBreakdown.map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm text-gray-500 w-3 shrink-0">{bar.stars}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${bar.pct}%` }} />
                    </div>
                    <span className="text-sm text-gray-400 w-10 text-right">{bar.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {storeReviews.map((rev, idx) => (
                <div key={idx} className={idx !== storeReviews.length - 1 ? 'pb-6 border-b border-gray-100' : ''}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
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
                  <p className="text-sm text-gray-600 leading-relaxed ml-14">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
