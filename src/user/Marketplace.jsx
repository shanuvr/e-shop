import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import ProductCard from '../components/ProductCard';
import StoreCard from '../components/StoreCard';

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  // Rich products dataset with pricing, ratings, offers, and warranty matching high-fidelity mobile views
  const initialProducts = [
    {
      id: 'e1',
      title: 'Acoustic Pro Headphones',
      price: 299,
      originalPrice: 499,
      discount: 40,
      rating: 4.5,
      reviews: 1478,
      isAssured: true,
      category: 'Electronics',
      location: 'New York, NY',
      tag: 'BESTSELLER',
      shipping: 'Free Shipping',
      condition: 'New',
      bankOffer: 284,
      exchangeOffer: 80,
      warranty: '1 year warranty by MarketElite',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      description: 'Immersive sound experience with advanced active noise cancellation and memory foam earcups.',
      shopId: 'shop-1'
    },
    {
      id: 'e2',
      title: 'Elite Smartwatch Series',
      price: 449,
      originalPrice: 699,
      discount: 35,
      rating: 4.6,
      reviews: 892,
      isAssured: true,
      category: 'Electronics',
      location: 'Austin, TX',
      tag: 'New Release',
      condition: 'New',
      bankOffer: 420,
      exchangeOffer: 120,
      warranty: '1 year warranty by MarketElite',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      description: 'Next-gen health monitoring, custom workout tracking, and sleek responsive tactile controls.',
      shopId: 'shop-1'
    },
    {
      id: 'e3',
      title: 'Vintage Perfume Oud & Rose',
      price: 1250,
      originalPrice: 1999,
      discount: 37,
      rating: 4.8,
      reviews: 245,
      isAssured: false,
      category: 'Fashion',
      location: 'London, UK',
      tag: 'BESTSELLER',
      condition: 'New',
      bankOffer: 1180,
      exchangeOffer: 300,
      warranty: 'Original Brand Warranty',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&h=300',
      description: 'Exquisite fragrance blending rich agarwood oud and delicate Turkish rose notes.',
      shopId: 'shop-2'
    },
    {
      id: 'e4',
      title: 'Lumix Mirrorless G9 Camera',
      price: 890,
      originalPrice: 1490,
      discount: 40,
      rating: 4.2,
      reviews: 512,
      isAssured: true,
      category: 'Electronics',
      location: 'San Francisco, CA',
      tag: 'Hot Deal',
      condition: 'Used',
      bankOffer: 790,
      exchangeOffer: 300,
      warranty: '6 months seller warranty',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=300',
      description: 'Ultra-fast autofocus mirrorless camera featuring 4K video recording and robust image stabilization.',
      shopId: 'shop-1'
    },
    {
      id: 'e5',
      title: 'Ultra HD 4K Monitor',
      price: 899,
      originalPrice: 1299,
      discount: 30,
      rating: 4.7,
      reviews: 1024,
      isAssured: true,
      category: 'Electronics',
      location: 'Seattle, WA',
      tag: 'Top Rated',
      condition: 'Refurbished',
      bankOffer: 849,
      exchangeOffer: 200,
      warranty: '3 years manufacturer warranty',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&h=300',
      description: 'Professional creator monitor with 100% sRGB coverage and factory calibrated color accuracy.',
      shopId: 'shop-1'
    },
    {
      id: 'e6',
      title: 'Mechanical Keyboard RGB',
      price: 159,
      originalPrice: 249,
      discount: 36,
      rating: 4.4,
      reviews: 310,
      isAssured: true,
      category: 'Electronics',
      location: 'Miami, FL',
      tag: 'Staff Pick',
      condition: 'New',
      bankOffer: 149,
      exchangeOffer: 40,
      warranty: '1 year warranty by MarketElite',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&h=300',
      description: 'Hot-swappable mechanical switches with vibrant RGB backlighting and premium aluminum top plate.',
      shopId: 'shop-1'
    },
    {
      id: 'e7',
      title: 'Minimalist Bamboo LED Lamp',
      price: 120,
      originalPrice: 199,
      discount: 39,
      rating: 4.3,
      reviews: 156,
      isAssured: false,
      category: 'Home & Living',
      location: 'Portland, OR',
      tag: 'BESTSELLER',
      shipping: 'Free Shipping',
      condition: 'Used',
      bankOffer: 110,
      exchangeOffer: 20,
      warranty: '1 year warranty by DecorElite',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&h=300',
      description: 'Warm LED ambient bedside lamp designed with a sustainable brushed bamboo base.',
      shopId: 'shop-4'
    },
    {
      id: 'e8',
      title: 'Sonic Fabric Speaker',
      price: 199,
      originalPrice: 349,
      discount: 43,
      rating: 4.5,
      reviews: 408,
      isAssured: true,
      category: 'Electronics',
      location: 'Chicago, IL',
      tag: 'Sold Out Soon',
      condition: 'Used',
      bankOffer: 199,
      exchangeOffer: 60,
      warranty: '1 year brand warranty',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&h=300',
      description: 'High-fidelity cylindrical Bluetooth speaker wrapped in tactile, sustainable textured fabric.',
      shopId: 'shop-1'
    }
  ];

  const initialStores = [
    {
      id: 'shop-1',
      name: 'Elite Digital Mall',
      category: 'Electronics & Mobiles',
      location: 'Swaraj Round, Thrissur',
      rating: '4.9',
      reviews: '340+',
      image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400&h=260',
      badge: 'VERIFIED STORE',
      isOpen: true,
      distance: '0.8 km',
      productCount: 128,
      maxDiscount: '40% OFF',
      description: 'Thrissur\'s trusted destination for the latest smartphones, laptops, audio gear and smart devices from top global brands.'
    },
    {
      id: 'shop-2',
      name: 'Swaraj Heritage Silks',
      category: 'Fashion & Traditional Wear',
      location: 'M.G. Road, Thrissur',
      rating: '4.8',
      reviews: '510+',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&h=260',
      badge: 'TOP SELLER',
      isOpen: true,
      distance: '1.4 km',
      productCount: 214,
      maxDiscount: '55% OFF',
      description: 'Premium silk sarees, ethnic wear and festive fashion handpicked from across Kerala and beyond.'
    },
    {
      id: 'shop-3',
      name: 'Thrissur Organic Mart',
      category: 'Fresh Groceries & Spices',
      location: 'East Fort, Thrissur',
      rating: '4.7',
      reviews: '190+',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=260',
      badge: 'EXPRESS DELIVERY',
      isOpen: true,
      distance: '2.1 km',
      productCount: 96,
      maxDiscount: '30% OFF',
      description: 'Farm-fresh produce, organic grains and exotic spices delivered straight to your doorstep.'
    },
    {
      id: 'shop-4',
      name: 'Royal Crafts & Furniture',
      category: 'Home Decor & Wooden Crafts',
      location: 'Kokkala, Thrissur',
      rating: '4.9',
      reviews: '280+',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=260',
      badge: 'PREMIUM PARTNER',
      isOpen: false,
      distance: '3.0 km',
      productCount: 150,
      maxDiscount: '45% OFF',
      description: 'Handcrafted wooden furniture and premium home decor pieces made by local artisans.'
    }
  ];

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : ['Electronics']
  );
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2500);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [condition, setCondition] = useState('All');
  const [sortBy, setSortBy] = useState('Newest Arrivals');
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchType, setSearchType] = useState('products');

  const locations = [
    'Kerala',
    'Tamil Nadu',
    'Punjab',
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Gujarat',
    'Uttar Pradesh'
  ];

  const handleUseCurrentLocation = () => {
    setSelectedLocation('Mumbai, MH');
    setLocationDropdownOpen(false);
  };

  // Handle wishlisting
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Categories list
  const categoriesList = [
    'Electronics',
    'Home & Kitchen',
    'Fashion',
    'Beauty & Health',
    'Sports',
    'Books & Stationery',
    'Automotive',
    'Services'
  ];

  // Handle Category check
  const handleCategoryChange = (cat) => {
    const isSelected = selectedCategories.some(c => c.toLowerCase() === cat.toLowerCase());
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter(c => c.toLowerCase() !== cat.toLowerCase()));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceMin(0);
    setPriceMax(2500);
    setSelectedLocation('All Locations');
    setCondition('All');
    setSearchQuery('');
  };

  // Cycle through sort options on mobile click
  const cycleSortMobile = () => {
    if (sortBy === 'Newest Arrivals') {
      setSortBy('Price: Low to High');
    } else if (sortBy === 'Price: Low to High') {
      setSortBy('Price: High to Low');
    } else {
      setSortBy('Newest Arrivals');
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query
    if (searchQuery.trim() !== '') {
      result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => {
        return selectedCategories.some(cat => p.category.toLowerCase() === cat.toLowerCase());
      });
    }

    // Price range
    result = result.filter(p => p.price >= priceMin && p.price <= priceMax);

    // Location
    if (selectedLocation && selectedLocation !== 'All Locations' && selectedLocation !== 'India') {
      if (selectedLocation === 'North America') {
        result = result.filter(p => ['New York, NY', 'Austin, TX', 'Seattle, WA', 'San Francisco, CA', 'Miami, FL', 'Portland, OR', 'Chicago, IL'].includes(p.location));
      } else if (selectedLocation === 'Europe') {
        result = result.filter(p => ['London, UK'].includes(p.location));
      } else if (selectedLocation === 'Asia') {
        result = result.filter(p => p.location.includes('Tokyo') || p.location.includes('UAE'));
      } else {
        const selLocLower = selectedLocation.toLowerCase();
        result = result.filter(p => 
          p.location.toLowerCase().includes(selLocLower) || 
          selLocLower.includes(p.location.toLowerCase().split(',')[0].trim())
        );
      }
    }

    // Condition
    if (condition !== 'All') {
      result = result.filter(p => p.condition.toLowerCase() === condition.toLowerCase());
    }

    // Sort By
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategories, priceMin, priceMax, selectedLocation, condition, sortBy, searchQuery]);

  const filteredStores = useMemo(() => {
    const matchingShopIds = new Set(filteredProducts.map(p => p.shopId));
    let stores = initialStores.filter(store => matchingShopIds.has(store.id));
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      stores = stores.filter(
        store =>
          store.name.toLowerCase().includes(q) ||
          store.category.toLowerCase().includes(q) ||
          (store.description || '').toLowerCase().includes(q)
      );
    }
    return stores;
  }, [filteredProducts, searchQuery]);

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Search Type Toggle */}
      <div className="space-y-2">
        <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface">Search Type</h3>
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/50">
          <button
            onClick={() => setSearchType('products')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              searchType === 'products'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-650 hover:bg-slate-150'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setSearchType('stores')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              searchType === 'stores'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-650 hover:bg-slate-150'
            }`}
          >
            Stores
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3 pt-4 border-t border-outline-variant/30">
        <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface">Category</h3>
        <div className="space-y-2.5">
          {categoriesList.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                checked={selectedCategories.some(c => c.toLowerCase() === cat.toLowerCase())}
                onChange={() => handleCategoryChange(cat)}
                className="w-4.5 h-4.5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                type="checkbox"
              />
              <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-outline-variant/30">
        <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs font-bold">₹</span>
              <input
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full pl-6 pr-2.5 py-2 bg-surface-container border border-outline-variant/20 rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary font-semibold"
                type="number"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs font-bold">₹</span>
              <input
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full pl-6 pr-2.5 py-2 bg-surface-container border border-outline-variant/20 rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary font-semibold"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-3 pt-4 border-t border-outline-variant/30">
        <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface">Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl py-2.5 px-3 text-sm text-on-surface font-semibold focus:outline-none cursor-pointer"
        >
          <option>All Locations</option>
          <option>North America</option>
          <option>Europe</option>
          <option>Asia</option>
          {selectedLocation !== 'All Locations' && 
           selectedLocation !== 'North America' && 
           selectedLocation !== 'Europe' && 
           selectedLocation !== 'Asia' && (
            <option value={selectedLocation}>{selectedLocation}</option>
          )}
        </select>
      </div>
    </div>
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] pb-24 font-sans text-slate-900 antialiased">
        <main className="max-w-[1400px] mx-auto pt-2 sm:pt-4 pb-8 px-3.5 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-5 lg:gap-8 w-full relative">

      {/* Desktop Sidebar (visible on large screen) */}
      <aside className="hidden lg:block lg:w-64 shrink-0 bg-white p-5 rounded-2xl border border-outline-variant/30 lg:sticky lg:top-[76px] lg:h-[calc(100vh-95px)] lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-on-surface">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-primary font-bold hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>
        {renderFilterContent()}
      </aside>

      {/* Mobile Sort & Filter Bar (Flipkart Style) */}
      <div className="flex sm:hidden border-b border-outline-variant/20 bg-white sticky top-[64px] z-30 shadow-sm w-full divide-x divide-outline-variant/20 -mx-3.5 px-3.5">
        <button
          onClick={cycleSortMobile}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold text-xs text-on-surface hover:bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Sort: {sortBy === 'Newest Arrivals' ? 'Newest' : sortBy === 'Price: Low to High' ? 'Low-High' : 'High-Low'}
        </button>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold text-xs text-on-surface hover:bg-slate-50 cursor-pointer active:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filter
          {selectedCategories.length + (selectedLocation !== 'All Locations' ? 1 : 0) > 0 && (
            <span className="bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {selectedCategories.length + (selectedLocation !== 'All Locations' ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-0 pt-2 pb-1 w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="relative"
        >
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchType === 'products' ? 'Search products...' : 'Search stores...'}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-outline-variant/30 rounded-xl text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-sm"
            type="text"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </form>
      </div>



      {/* Mobile Filter Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
          {/* Drawer Panel */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl transition-transform duration-300 transform translate-x-0">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-6">
              <h2 className="text-xl font-bold text-on-surface">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {renderFilterContent()}

            <div className="mt-8 pt-4 border-t border-outline-variant/30">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-lg active:scale-95 transition-all text-center"
              >
                Apply Filters
              </button>
              <button
                onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
                className="w-full bg-surface-container text-on-surface font-bold py-3.5 rounded-xl cursor-pointer mt-3 active:scale-95 transition-all text-center text-sm"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List Area */}
      <section className="flex-grow w-full px-0 lg:h-[calc(100vh-120px)] lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Desktop / Tablet Header */}
        <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface">
              Explore {selectedCategories.length === 1 ? selectedCategories[0] : (searchType === 'products' ? 'Products' : 'Stores')}
            </h1>
            <p className="text-on-surface-variant font-medium mt-1">
              Showing {searchType === 'products' ? filteredProducts.length : filteredStores.length} results
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-grow sm:flex-grow-0 sm:w-72 relative"
            >
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'products' ? 'Search products...' : 'Search stores...'}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-outline-variant/30 rounded-xl text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 shadow-sm transition-all"
                type="text"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>

            {/* Tablet Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-outline-variant/30 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface cursor-pointer hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              Filters
              {selectedCategories.length + (selectedLocation !== 'All Locations' ? 1 : 0) > 0 && (
                <span className="bg-primary text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {selectedCategories.length + (selectedLocation !== 'All Locations' ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            {searchType === 'products' && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-on-surface-variant whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-outline-variant/30 rounded-xl py-2.5 pl-3 pr-8 text-sm font-bold text-on-surface focus:outline-none shadow-sm cursor-pointer"
                >
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Conditional Rendering of Products or Stores */}
        {searchType === 'products' ? (
          filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-outline-variant/30 shadow-sm mx-4 sm:mx-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-on-surface-variant/50 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
              <h3 className="text-lg font-bold text-on-surface mb-1">No products found</h3>
              <p className="text-sm text-on-surface-variant font-medium max-w-sm mx-auto">
                Try adjusting your filter keywords, category settings, or price ranges.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 bg-transparent border-none">
              {filteredProducts.map((item) => {
                const shopNames = {
                  'shop-1': 'Elite Digital Mall',
                  'shop-2': 'Swaraj Heritage Silks',
                  'shop-3': 'Thrissur Organic Mart',
                  'shop-4': 'Royal Crafts & Furniture'
                };
                return (
                  <ProductCard 
                    key={item.id} 
                    item={{
                      ...item,
                      price: `₹${item.price.toLocaleString()}`,
                      location: shopNames[item.shopId] || item.location
                    }} 
                    linkPrefix="/product" 
                  />
                );
              })}
            </div>
          )
        ) : (
          filteredStores.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-outline-variant/30 shadow-sm mx-4 sm:mx-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-on-surface-variant/50 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615m-7.5 0h7.5m3 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615m-7.5 0h7.5M12 9.349V3.75m0 0a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3Z" />
              </svg>
              <h3 className="text-lg font-bold text-on-surface mb-1">No stores found</h3>
              <p className="text-sm text-on-surface-variant font-medium max-w-sm mx-auto">
                No stores currently sell items matching your search filters.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5">
              {filteredStores.map((shop) => (
                <StoreCard
                  key={shop.id}
                  store={shop}
                  favorites={[]}
                />
              ))}
            </div>
          )
        )}

        {/* Loading State */}
        <div className="mt-12 mb-8 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant text-sm font-semibold">Loading more premium finds...</p>
        </div>
      </section>
    </main>
      </div>
    </UserLayout>
  );
}
