import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  Smartphone,
  Home,
  Shirt,
  HeartPulse,
  Dumbbell,
  BookOpen,
  Car,
  Wrench,
  Scissors,
  Utensils,
  Brush,
  Zap,
  ArrowRight,
  ShoppingBag,
  Store,
  LifeBuoy,
  Search,
  Laptop,
  Camera,
  Sparkles,
  Layers,
  Filter,
  CheckCircle2
} from 'lucide-react';

const productCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    badgeIcon: Laptop,
    count: '3,492 premium items',
    desc: 'High-end tech for professionals and enthusiasts.',
    action: 'Explore',
    featured: true,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    sub: ['Mobiles', 'Laptops', 'Audio', 'Cameras', 'Gaming']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    badgeIcon: Camera,
    count: '842 premium pieces',
    desc: 'Trending styles, designer apparel & footwear.',
    action: 'View',
    featured: false,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    sub: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories']
  },
  {
    id: 'mobiles-laptops',
    name: 'Mobiles & Laptops',
    icon: Laptop,
    badgeIcon: Laptop,
    count: '1,240 listed items',
    desc: 'Ultrabooks, smartphones & tech accessories.',
    action: 'Browse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    sub: ['Smartphones', 'MacBooks', 'Gaming Laptops', 'Tablets']
  },
  {
    id: 'properties',
    name: 'Properties',
    icon: Home,
    badgeIcon: Home,
    count: '156 luxury listings',
    desc: 'Luxury apartments, villas & commercial real estate.',
    action: 'Explore',
    featured: false,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
    sub: ['Furniture', 'Decor', 'Appliances', 'Cookware']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: Car,
    badgeIcon: Car,
    count: '412 elite motors',
    desc: 'Premium cars, electric vehicles & sports bikes.',
    action: 'Browse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
    sub: ['Accessories', 'Parts', 'Care & Detailing', 'Tyres']
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    icon: HeartPulse,
    badgeIcon: HeartPulse,
    count: '6,780 products',
    desc: 'Organic cosmetics, skincare & wellness.',
    action: 'Discover',
    featured: false,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    sub: ['Skincare', 'Makeup', 'Wellness', 'Fragrance']
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    icon: Dumbbell,
    badgeIcon: Dumbbell,
    count: '4,150 gear items',
    desc: 'Gym gear, outdoor equipment & athletic wear.',
    action: 'Explore',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
    sub: ['Fitness', 'Outdoor', 'Cycling', 'Team Sports']
  },
  {
    id: 'books-stationery',
    name: 'Books & Stationery',
    icon: BookOpen,
    badgeIcon: BookOpen,
    count: '9,340 collection',
    desc: 'Best-selling novels, academic art & office supplies.',
    action: 'Read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop',
    sub: ['Fiction', 'Academics', 'Art Supplies', 'Office']
  }
];

const serviceCategories = [
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    icon: Sparkles,
    badgeIcon: Sparkles,
    count: '1,280 verified pros',
    desc: 'Deep cleaning, sanitization & specialized housekeeping.',
    action: 'Book Now',
    featured: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    sub: ['Deep Clean', 'Move-in Clean', 'Sanitization']
  },
  {
    id: 'repair-maintenance',
    name: 'Repair & Maintenance',
    icon: Wrench,
    badgeIcon: Wrench,
    count: '2,050 experts',
    desc: 'AC servicing, plumbing, electrical & appliance care.',
    action: 'Explore',
    featured: false,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop',
    sub: ['AC & Fridge', 'Plumbing', 'Electrical', 'Appliance']
  },
  {
    id: 'beauty-salon',
    name: 'Beauty & Salon',
    icon: Scissors,
    badgeIcon: Scissors,
    count: '3,410 stylists',
    desc: 'In-home salon care, spa therapies & makeup.',
    action: 'Book',
    featured: false,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    sub: ['Hair', 'Spa & Massage', 'Makeup', 'Nails']
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    icon: HeartPulse,
    badgeIcon: HeartPulse,
    count: '1,760 specialists',
    desc: 'Physiotherapy, yoga trainers & nutrition guides.',
    action: 'Discover',
    featured: false,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1000&auto=format&fit=crop',
    sub: ['Physio', 'Yoga', 'Dietitian', 'Home Care']
  },
  {
    id: 'food-catering',
    name: 'Food & Catering',
    icon: Utensils,
    badgeIcon: Utensils,
    count: '2,330 caterers',
    desc: 'Private chefs, gourmet catering & event food.',
    action: 'Order',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
    sub: ['Chefs', 'Catering', 'Bakers', 'Home Food']
  },
  {
    id: 'home-renovation',
    name: 'Home Renovation',
    icon: Brush,
    badgeIcon: Brush,
    count: '980 contractors',
    desc: 'Interior design, painting, custom woodwork & flooring.',
    action: 'Consult',
    featured: false,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    sub: ['Painting', 'Interior', 'Carpentry', 'Flooring']
  },
  {
    id: 'electrical-electrician',
    name: 'Electrical & Automation',
    icon: Zap,
    badgeIcon: Zap,
    count: '1,540 technicians',
    desc: 'Wiring, smart home setup, fittings & emergency fixes.',
    action: 'Hire',
    featured: false,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop',
    sub: ['Wiring', 'Fittings', 'Installation', 'Repair']
  },
  {
    id: 'packers-movers',
    name: 'Packers & Movers',
    icon: LifeBuoy,
    badgeIcon: LifeBuoy,
    count: '720 movers',
    desc: 'Hassle-free local moves, packing & logistics.',
    action: 'Get Quote',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    sub: ['Local Moves', 'Packing', 'Loading', 'Storage']
  }
];

const storeCategories = [
  {
    id: 'electronics-mobiles-store',
    name: 'Electronics & Mobiles',
    icon: Smartphone,
    badgeIcon: Smartphone,
    count: '125 stores',
    desc: 'Authorized outlets, tech shops & repair centers.',
    action: 'Visit Shops',
    featured: true,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop',
    sub: ['Mobiles', 'Laptops', 'Cameras', 'Accessories']
  },
  {
    id: 'fashion-apparel-store',
    name: 'Fashion & Apparel',
    icon: Shirt,
    badgeIcon: Shirt,
    count: '210 shops',
    desc: 'Clothing boutiques, ethnic wear & shoe stores.',
    action: 'Explore',
    featured: false,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    sub: ['Ethnic Wear', 'Western', 'Footwear', 'Jewellery']
  },
  {
    id: 'groceries-spices-store',
    name: 'Groceries & Spices',
    icon: Utensils,
    badgeIcon: Utensils,
    count: '98 shops',
    desc: 'Fresh organic produce, spices & daily essentials.',
    action: 'Shop Local',
    featured: false,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
    sub: ['Fresh Produce', 'Organic', 'Spices', 'Dairy']
  },
  {
    id: 'home-decor-store',
    name: 'Home Decor & Crafts',
    icon: Brush,
    badgeIcon: Home,
    count: '86 shops',
    desc: 'Wooden craft stores, furniture showrooms & decor.',
    action: 'Browse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
    sub: ['Wooden Crafts', 'Furniture', 'Decor', 'Artisans']
  },
  {
    id: 'health-pharmacy-store',
    name: 'Health & Pharmacy',
    icon: HeartPulse,
    badgeIcon: HeartPulse,
    count: '74 shops',
    desc: 'Licensed pharmacies, wellness outlets & devices.',
    action: 'Locate',
    featured: false,
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000&auto=format&fit=crop',
    sub: ['Pharmacy', 'Wellness', 'Devices']
  },
  {
    id: 'books-stationery-store',
    name: 'Books & Stationery',
    icon: BookOpen,
    badgeIcon: BookOpen,
    count: '52 shops',
    desc: 'Independent bookstores, stationery & art shops.',
    action: 'Discover',
    featured: false,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop',
    sub: ['Bookstores', 'Stationery', 'Art Supplies']
  },
  {
    id: 'sports-fitness-store',
    name: 'Sports & Fitness',
    icon: Dumbbell,
    badgeIcon: Dumbbell,
    count: '61 shops',
    desc: 'Gym equipment dealers, sportswear & accessories.',
    action: 'View',
    featured: false,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop',
    sub: ['Gym Equipment', 'Sportswear', 'Accessories']
  },
  {
    id: 'automotive-store',
    name: 'Automotive Garages',
    icon: Car,
    badgeIcon: Car,
    count: '43 shops',
    desc: 'Spare parts centers, detailing shops & services.',
    action: 'Browse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1000&auto=format&fit=crop',
    sub: ['Spare Parts', 'Accessories', 'Service']
  }
];

const tabConfig = [
  { key: 'products', label: 'Products', icon: ShoppingBag, desc: 'Everything you need to buy' },
  { key: 'services', label: 'Services', icon: Wrench, desc: 'Local pros on demand' },
  { key: 'stores', label: 'Stores', icon: Store, desc: 'Verified shops near you' }
];

export default function Categories() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');

  const dataMap = {
    products: productCategories,
    services: serviceCategories,
    stores: storeCategories
  };

  const rawData = dataMap[activeTab];

  // Extract all subcategories for filter pills
  const availableSubCategories = useMemo(() => {
    const subs = new Set();
    rawData.forEach(item => {
      if (item.sub) item.sub.forEach(s => subs.add(s));
    });
    return ['All', ...Array.from(subs)];
  }, [rawData]);

  // Filter categories based on search and subcategory selection
  const filteredCategories = useMemo(() => {
    return rawData.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.sub.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSub =
        selectedSubCategory === 'All' || cat.sub.includes(selectedSubCategory);

      return matchesSearch && matchesSub;
    });
  }, [rawData, searchQuery, selectedSubCategory]);

  const getMarketplaceLink = (name) => {
    const categorySlug = name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    return `/marketplace?category=${encodeURIComponent(categorySlug)}&type=${activeTab}`;
  };

  // Reset filters on tab change
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSelectedSubCategory('All');
    setSearchQuery('');
  };

  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] min-h-screen text-slate-900 font-sans antialiased pb-20 selection:bg-blue-500 selection:text-white">
        {/* Compact Top Filter & Search Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4 px-6 md:px-12 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Tabs (Products, Services, Stores) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/80 shadow-inner">
                {tabConfig.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => handleTabChange(tab.key)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-sm scale-[1.02]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Sub-category Quick Filter Pills */}
              {availableSubCategories.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                  {availableSubCategories.slice(0, 6).map((sub) => {
                    const isSelected = selectedSubCategory === sub;
                    return (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubCategory(sub)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                          isSelected
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full bg-slate-100/90 border border-slate-200 focus:border-primary focus:bg-white rounded-full pl-9 pr-8 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 hover:text-slate-700 bg-slate-200 rounded-full px-1.5 py-0.5"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Categories Bento Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No categories found</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto mb-5">
                We couldn't find any category matching "{searchQuery}". Try searching for something else or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubCategory('All');
                }}
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-full text-xs hover:bg-blue-600 transition shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4 auto-rows-[160px] md:auto-rows-[175px]">
              {filteredCategories.map((cat, index) => {
                const BadgeIcon = cat.badgeIcon || cat.icon || Laptop;
                // Render the first filtered item (or explicit cat.featured) as a double-cell Hero Bento Card if no search active
                const isHero = (cat.featured || index === 0) && !searchQuery && selectedSubCategory === 'All';

                return (
                  <Link
                    key={cat.id || cat.name}
                    to={getMarketplaceLink(cat.name)}
                    className={`group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-slate-300/40 ${
                      isHero
                        ? 'col-span-1 md:col-span-2 row-span-2 min-h-[330px] md:min-h-[360px] p-5 md:p-6'
                        : 'col-span-1 row-span-1 min-h-[160px] md:min-h-[175px] p-4 md:p-4.5'
                    }`}
                  >
                    {/* Background Image with Scale Animation */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Multi-stage Vignette & Gradient Overlay for Card Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/45 transition-colors duration-500" />

                    {/* Top Floating Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1 bg-[#121212]/50 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                        <BadgeIcon className="w-3 h-3 text-white/90" />
                        <span>{cat.count}</span>
                      </div>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative z-10 mt-auto">
                      {isHero ? (
                        <>
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-none mb-1.5 drop-shadow-md">
                            {cat.name}
                          </h2>
                          {cat.desc && (
                            <p className="text-white/85 text-xs font-normal max-w-md mb-3 leading-snug line-clamp-2">
                              {cat.desc}
                            </p>
                          )}
                          <div className="inline-flex items-center gap-1.5 bg-white text-slate-950 font-bold text-xs px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300 shadow-md group-hover:translate-x-1">
                            <span>{cat.action || 'Explore'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight leading-tight mb-2 group-hover:text-blue-100 transition-colors">
                            {cat.name}
                          </h3>
                          <div className="inline-flex items-center gap-1 bg-white text-slate-950 font-bold text-[10px] md:text-[11px] px-3 py-1 rounded-full hover:bg-slate-100 transition-all duration-300 shadow-xs group-hover:translate-x-1">
                            <span>{cat.action || 'View'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Bottom Explore Banner */}
          <div className="mt-12 relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-slate-900 via-[#101b33] to-slate-950 p-6 md:p-8 border border-slate-800 shadow-xl text-white">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Marketplace
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Looking for something specific?
                </h3>
                <p className="text-slate-300 text-xs md:text-sm mt-1 leading-relaxed">
                  Head straight to our complete marketplace search to apply custom price filters, locations, and condition tags.
                </p>
              </div>
              <Link
                to={`/marketplace?type=${activeTab}`}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow-md shadow-primary/30 transition-all duration-300 shrink-0 hover:scale-[1.02]"
              >
                Go to {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Marketplace
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

