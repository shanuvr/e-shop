import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Hero2 from '../components/Hero2';
import ProductCard from '../components/ProductCard';
import { 
  ShieldCheck, 
  Tag, 
  RotateCcw, 
  LayoutGrid, 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Truck, 
  Headphones, 
  Heart, 
  MapPin, 
  ArrowRight,
  Mail,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [activeFaq, setActiveFaq] = useState(null);

  // Real-time flash sale countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const electronics = [
    {
      id: 1,
      title: 'Acoustic Pro Headphones',
      price: '₹24,999',
      location: 'New York, NY',
      description: 'Immersive sound experience with advanced active noise cancellation and memory foam.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'Top Rated',
      shipping: 'Free Shipping'
    },
    {
      id: 2,
      title: 'Elite Smartwatch Series',
      price: '₹36,999',
      location: 'Austin, TX',
      description: 'Next-gen health monitoring, custom workout tracking, and sleek responsive tactile controls.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'New Release',
      shipping: null
    },
    {
      id: 3,
      title: 'Lumix Mirrorless G9',
      price: '₹99,999',
      location: 'Tokyo, JP',
      description: 'Ultra-fast autofocus mirrorless camera featuring 4K video recording and robust build.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=300',
      tag: 'New Release',
      shipping: null
    },
    {
      id: 4,
      title: 'Sonic Fabric Speaker',
      price: '₹15,999',
      location: 'New York, NY',
      description: 'High-fidelity cylindrical Bluetooth speaker wrapped in tactile, sustainable textured fabric.',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&h=300',
      tag: 'Limited Edition',
      shipping: null
    }
  ];

  const services = [
    {
      id: 101,
      title: 'Deep Home Cleaning',
      price: '₹499/hr',
      location: 'San Francisco, CA',
      description: 'Professional top-to-bottom sanitization and cleaning for apartments, houses, and offices.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&h=300',
      tag: 'Top Rated',
      shipping: 'ECO-FRIENDLY'
    },
    {
      id: 102,
      title: 'AC & Fridge Maintenance',
      price: '₹799/visit',
      location: 'New York, NY',
      description: 'Certified technicians for quick troubleshooting and repair of all major household appliances.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&h=300',
      tag: 'Fast Response',
      shipping: 'WARRANTY PROVIDED'
    },
    {
      id: 103,
      title: 'Emergency Plumbing & Leak Fix',
      price: '₹599/hr',
      location: 'Chicago, IL',
      description: '24/7 emergency plumbers for leak detection, pipe fixing, and kitchen/bathroom fittings.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&h=300',
      tag: '24/7 Service',
      shipping: 'LICENSED PRO'
    },
    {
      id: 104,
      title: 'Coding & Math Personal Tutor',
      price: '₹299/hr',
      location: 'Remote / Online',
      description: 'One-on-one personalized learning plans for computer science, web development, and calculus.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=300',
      tag: 'Top Rated',
      shipping: 'FREE TRIAL CLASS'
    }
  ];

  const popularShops = [
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
      distance: '0.8 km'
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
      distance: '1.4 km'
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
      distance: '2.1 km'
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
      distance: '3.0 km'
    }
  ];

  const categories = [
    { name: 'Electronics', icon: <img src="/icons/device.png" alt="Electronics" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Home & Kitchen', icon: <img src="/icons/seater-sofa.png" alt="Home & Kitchen" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Fashion', icon: <img src="/icons/dress.png" alt="Fashion" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Beauty & Health', icon: <img src="/icons/beauty-product.png" alt="Beauty & Health" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Sports', icon: <img src="/icons/sports.png" alt="Sports" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Books & Stationery', icon: <img src="/icons/book.png" alt="Books & Stationery" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Automotive', icon: <img src="/icons/car-repair.png" alt="Automotive" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Services', icon: <img src="/icons/customer-service.png" alt="Services" className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'View All', icon: <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 group-hover:text-blue-600 transition-colors" /> }
  ];

  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] pb-20 flex flex-col font-sans text-slate-900 antialiased">
        
        {/* 1. Hero Banner */}
        <Hero2 />

        {/* 2. Floating Categories Row */}
        <div className="max-w-5xl mx-auto w-full px-3.5 sm:px-5 -mt-5 sm:-mt-7 relative z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-2.5 sm:p-3.5 flex flex-nowrap items-center justify-start md:justify-center gap-3 md:gap-5 lg:gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                to={cat.name === 'View All' ? '/categories' : `/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="flex flex-col items-center justify-center gap-1.5 group min-w-[68px] sm:min-w-[76px] text-center flex-shrink-0"
              >
                <div className="w-10 h-10 sm:w-[46px] sm:h-[46px] bg-slate-50/80 rounded-xl flex items-center justify-center group-hover:bg-blue-50/80 transition-all duration-300 border border-slate-100/50">
                  {cat.icon}
                </div>
                <span className="text-[9px] sm:text-[11px] font-semibold text-slate-600 group-hover:text-blue-600 transition-colors whitespace-nowrap tracking-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Popular Shops in Thrissur */}
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20">
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-primary text-[11px] md:text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                Local Marketplace
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-on-surface tracking-tight">Popular Shops in Thrissur</h2>
            </div>
            <Link className="text-primary font-semibold flex items-center hover:underline text-[13px] sm:text-sm gap-1" to="/shops">
              <span className="hidden sm:inline">View All Shops</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {popularShops.map((shop) => (
              <Link 
                to={`/shop/${shop.id}`} 
                key={shop.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="h-[110px] sm:h-[160px] bg-slate-100 w-full overflow-hidden relative">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-sm tracking-wider uppercase">
                      {shop.badge}
                    </span>

                    <span className={`absolute bottom-2.5 right-2.5 text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full backdrop-blur-md ${
                      shop.isOpen ? 'bg-emerald-500/90 text-white' : 'bg-slate-700/90 text-slate-200'
                    }`}>
                      {shop.isOpen ? 'OPEN' : 'CLOSED'}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider truncate">{shop.category}</span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{shop.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-[13px] sm:text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-1.5">{shop.name}</h3>

                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{shop.location}</span>
                    </div>
                  </div>
                </div>

                <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slate-400 border-t border-slate-50 mt-2">
                  <span className="hidden sm:inline">{shop.distance} away</span>
                  <span className="text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Visit Store &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. Popular in Electronics */}
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20">
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-primary text-[11px] md:text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Tech
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-on-surface tracking-tight">Popular in Electronics</h2>
            </div>
            <Link className="text-primary font-semibold flex items-center hover:underline text-sm gap-1" to="/marketplace?category=electronics">
              <span className="hidden sm:inline">View All</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {electronics.map((item) => (
              <ProductCard key={item.id} item={item} linkPrefix="/product" />
            ))}
          </div>
        </div>

        {/* 4. Popular Services */}
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20">
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-blue-600 text-[11px] md:text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Pros
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Popular Services</h2>
            </div>
            <Link to="/services" className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors border-b border-transparent hover:border-blue-600 pb-0.5 whitespace-nowrap">
              <span className="hidden sm:inline">View All Services</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {services.map((item) => (
              <ProductCard key={item.id} item={item} linkPrefix="/service" />
            ))}
          </div>
        </div>

        {/* 5. Bottom Columns (How It Works & Sell Your Way) */}
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* How E-SHOP Works */}
          <div className="lg:col-span-2 bg-[#f8fafc] rounded-3xl border border-slate-100 p-5 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center gap-3 flex-wrap mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How <span className="text-blue-600">E-SHOP</span> Works
                </h2>
                <p className="text-slate-500 text-xs mt-1">Our platform logic simplified</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">Step-by-Step Guide</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-stretch relative">
              {[
                {
                  step: '01',
                  title: 'Discover',
                  desc: 'Browse or search products, local services or verified shops near you.',
                  icon: <Search className="w-5 h-5 text-blue-600 group-hover:text-white" />
                },
                {
                  step: '02',
                  title: 'Choose',
                  desc: 'Compare pricing, reviews, and select exactly what matches your needs.',
                  icon: <ShoppingCart className="w-5 h-5 text-blue-600 group-hover:text-white" />
                },
                {
                  step: '03',
                  title: 'Order & Pay',
                  desc: 'Submit your order securely through our integrated digital checkout.',
                  icon: <CreditCard className="w-5 h-5 text-blue-600 group-hover:text-white" />
                },
                {
                  step: '04',
                  title: 'Receive',
                  desc: 'Enjoy rapid delivery or service execution with satisfaction guaranteed.',
                  icon: <Package className="w-5 h-5 text-blue-600 group-hover:text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col justify-between items-start text-left select-none group bg-white border border-slate-100/80 p-5 rounded-2xl relative overflow-hidden hover:bg-blue-605 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-lg">
                  <span className="absolute right-2 top-1 text-5xl font-black text-slate-100/50 group-hover:text-white/10 transition-colors select-none">
                    {step.step}
                  </span>
                  <div className="z-10">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5 md:mb-6 group-hover:bg-white/20 transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-[15px] text-slate-800 mb-2 group-hover:text-white transition-colors">{step.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed group-hover:text-blue-100 transition-colors">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sell Your Way */}
          <div className="bg-[#0f172a] rounded-3xl overflow-hidden flex flex-col justify-between relative min-h-[300px] shadow-lg group border border-slate-800">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="p-5 sm:p-8 z-10 flex flex-col justify-between h-full w-full sm:w-[65%] text-white relative">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">Sell Your Way</h2>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-6">
                  Grow your brand on E-SHOP. Choose how much of the sales process you want us to manage.
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { text: 'Own Online Store', desc: 'Full website control' },
                    { text: 'E-SHOP Marketplace', desc: 'List items instantly' },
                    { text: 'E-SHOP Managed Sales', desc: 'We sell, you fulfill' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-slate-100 leading-none">{item.text}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link 
                to="/seller" 
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-full py-3 px-6 w-max flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                Become a Seller
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </Link>
            </div>
            
            <div className="absolute right-0 bottom-0 h-full w-full sm:w-[38%] opacity-0 sm:opacity-100 pointer-events-none select-none z-0">
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0f172a] to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=300&h=400" 
                alt="Seller Partner" 
                className="h-full w-full object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* 6. Partners & Brands Logo Carousel */}
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20 text-center select-none bg-white rounded-3xl border border-slate-100 p-5 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Partners & Verified Brands</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 opacity-40 hover:opacity-60 transition-opacity duration-300">
            {['SAMSUNG', 'NIKE', 'APPLE', 'IKEA', 'SONY', 'DELL'].map((brand, idx) => (
              <span key={idx} className="text-base md:text-xl font-bold text-slate-700 tracking-widest font-sans hover:text-blue-600 transition-colors cursor-pointer">{brand}</span>
            ))}
          </div>
        </div>

        {/* 7. Flash Sale Countdown Banner */}
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 mt-12 md:mt-20">
          <div className="bg-slate-900 rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-lg border border-slate-800">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="z-10 text-center md:text-left mb-6 md:mb-0 max-w-xl">
              <span className="bg-blue-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Limited Deal</span>
              <h2 className="text-xl sm:text-3xl font-black mt-4 leading-tight tracking-tight text-white">Up to 40% Off on Premium Sound Systems</h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Elevate your home cinema experience today. Get free installation and an extended 2-year warranty with every purchase.
              </p>
              
              {/* Countdown Clocks */}
              <div className="flex items-center gap-3 justify-center md:justify-start mt-6">
                {[
                  { val: String(timeLeft.hours).padStart(2, '0'), label: 'Hours' },
                  { val: String(timeLeft.minutes).padStart(2, '0'), label: 'Mins' },
                  { val: String(timeLeft.seconds).padStart(2, '0'), label: 'Secs' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {idx > 0 && <span className="text-slate-700 font-bold">:</span>}
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2.5 rounded-xl min-w-[50px] font-mono text-lg font-bold">
                        {item.val}
                      </div>
                      <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase tracking-wider">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="z-10 flex flex-col items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&h=200" 
                alt="Sound System" 
                className="w-48 h-32 object-cover rounded-2xl shadow-md border border-slate-800" 
              />
              <Link 
                to="/flash-sale" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                Shop the Sale
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* 8. Customer Testimonials */}
        <div className="max-w-7xl mx-auto w-full px-6 mt-20">
          <div className="text-center max-w-lg mx-auto mb-12">
            <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Reviews</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Buyer',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80',
                rating: 5,
                comment: 'Booking home cleaning was super smooth. The professional arrived exactly on time and did an incredible job. Recommend E-SHOP for local services!'
              },
              {
                name: 'Arjun Mehta',
                role: 'Seller / Store Owner',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
                rating: 5,
                comment: 'Listing my electronics store on E-SHOP expanded my business. Setting up my shop was easy, and payouts are always secure and on time.'
              },
              {
                name: 'Emily Davis',
                role: 'Buyer',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80',
                rating: 5,
                comment: 'Bought mirrorless camera at a great price and it was delivered within 2 days with secure packaging. Excellent customer support during checkout.'
              }
            ].map((testi, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-105 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-6 top-6 text-slate-100 pointer-events-none select-none">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                    <path d="M11.19 10.43c0 2.2-.74 4.39-2.22 6.57-.27.38-.63.56-1.07.56-.3 0-.58-.1-.83-.3a1.47 1.47 0 0 1-.44-1.12c0-.52.26-1.04.79-1.57.82-.82 1.23-1.63 1.23-2.43 0-.4-.14-.73-.42-.98-.28-.24-.69-.37-1.22-.37-.58 0-1.1.18-1.56.54A3.42 3.42 0 0 0 4 13.91c0 1.24.4 2.23 1.2 2.97.8.75 1.83 1.12 3.09 1.12 2.5 0 4.5-1.74 5.99-5.23L11.19 10.43zm9 0c0 2.2-.74 4.39-2.22 6.57-.27.38-.63.56-1.07.56-.3 0-.58-.1-.83-.3a1.47 1.47 0 0 1-.44-1.12c0-.52.26-1.04.79-1.57.82-.82 1.23-1.63 1.23-2.43 0-.4-.14-.73-.42-.98-.28-.24-.69-.37-1.22-.37-.58 0-1.1.18-1.56.54a3.42 3.42 0 0 0-1.39 2.59c0 1.24.4 2.23 1.2 2.97.8.75 1.83 1.12 3.09 1.12 2.5 0 4.5-1.74 5.99-5.23L20.19 10.43z"/>
                  </svg>
                </div>
                <div className="z-10">
                  <div className="flex items-center gap-0.5 text-amber-400 mb-5">
                    {Array.from({ length: testi.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed italic relative">"{testi.comment}"</p>
                </div>
                <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-50 z-10">
                  <img src={testi.avatar} alt={testi.name} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{testi.name}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto w-full px-6 mt-20">
          <div className="text-center mb-12">
            <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Help Center</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          {/* Grouped clean borderless layout with dividers */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col divide-y divide-slate-100">
            {[
              {
                q: 'What is E-SHOP and how does it work?',
                a: 'E-SHOP is a unified marketplace for both products and services. You can shop items from verified sellers or book services (like cleaning, electronics repair, tutoring) from local professionals.'
              },
              {
                q: 'How do I register as a seller?',
                a: 'Click on the "Become a Seller" button on the landing page or navbar. You can choose a listing model that suits you, whether running your own online storefront or utilizing our marketplace tools.'
              },
              {
                q: 'Are payments on E-SHOP secure?',
                a: 'Yes, 100%. We use end-to-end encrypted payment integrations to process all credit cards, bank cards, and digital wallets. We also support escrow hold until your order is fulfilled.'
              },
              {
                q: 'What is the refund and returns policy?',
                a: 'Most items support a hassle-free 7-day return policy. Service bookings can be rescheduled or cancelled for a full refund up to 24 hours before the scheduled time.'
              }
            ].map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-2 text-left text-[13px] font-bold text-slate-800 hover:text-blue-605 transition-colors focus:outline-none select-none"
                >
                  <span>{faq.q}</span>
                  {activeFaq === index ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === index && (
                  <div className="pb-2 pt-2 text-[11px] text-slate-500 leading-relaxed transition-all">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 10. Newsletter Subscription */}
        <div className="max-w-7xl mx-auto w-full px-6 mt-20">
          <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm flex flex-col items-center text-center relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100/50">
              <Mail className="w-5 h-5" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-850 tracking-tight">Subscribe & Get ₹100 Off</h3>
            <p className="text-slate-500 text-xs mt-2 max-w-md leading-relaxed mb-8">
              Stay in the loop with updates, deals, and exclusive discount codes sent straight to your inbox weekly.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); console.log('Subscribed!'); }} className="flex items-center bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden w-full max-w-md p-1 focus-within:border-blue-500 focus-within:bg-white transition-all h-14 shadow-sm">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="w-full bg-transparent px-4 py-2 text-xs text-slate-800 outline-none placeholder-slate-400 font-medium"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-full rounded-xl text-xs font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 11. Footer Features Ribbon */}
        <div className="max-w-7xl mx-auto w-full px-6 mt-24 pt-8 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 select-none">
          {[
            {
              title: 'Free Shipping',
              desc: 'On orders above ₹499',
              icon: <Truck className="w-5 h-5 text-blue-600" />
            },
            {
              title: 'Easy Returns',
              desc: 'Hassle-free 7-day returns',
              icon: <RotateCcw className="w-5 h-5 text-blue-600" />
            },
            {
              title: 'Secure Payments',
              desc: '100% encrypted checkout',
              icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
            },
            {
              title: '24/7 Support',
              desc: "Expert help anytime you need",
              icon: <Headphones className="w-5 h-5 text-blue-600" />
            }
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center gap-4 text-left p-3.5 rounded-2xl hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100/20">
                {feat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-tight">{feat.title}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{feat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
