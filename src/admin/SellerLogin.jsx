import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import { 
  Store, 
  Mail, 
  Lock, 
  ArrowRight, 
  Building2, 
  Check, 
  Sparkles,
  User,
  ShoppingBag,
  Globe,
  Zap
} from 'lucide-react';

export default function SellerLogin() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [businessTrack, setBusinessTrack] = useState('eshop-marketplace'); // 'eshop-marketplace' | 'own-store'
  const [eshopOption, setEshopOption] = useState('direct-listing'); // 'direct-listing' | 'managed-sales'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/seller/dashboard');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans antialiased">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Decorative Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-8 select-none">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white">
                  <Store className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  E-SHOP
                </span>
              </Link>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                Merchant & Business Portal
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                Grow Your Business Online
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Log in to access your seller admin dashboard, manage product listings, track orders, or configure custom domain settings.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                'Track 1: Sell on E-SHOP Marketplace (Self or Managed)',
                'Track 2: Own Standalone Storefront (yourstore.com)',
                'Master admin dashboard with category & order management'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            {/* Link to Customer Login */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Looking to buy products or services?{' '}
                <Link to="/login" className="text-blue-400 font-bold hover:underline">
                  Customer Login &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* Title */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isSignUp ? 'Register Business Account' : 'Merchant Login'}
                </h1>
                <Link to="/seller" className="text-xs font-bold text-primary hover:underline">
                  Compare Track Options
                </Link>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                {isSignUp ? 'Choose your business track to get started' : 'Enter seller credentials to access admin dashboard'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Registration Options */}
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      1. Select Business Track
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setBusinessTrack('eshop-marketplace')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          businessTrack === 'eshop-marketplace'
                            ? 'border-primary bg-blue-50/70 text-primary font-bold shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <ShoppingBag className="w-4 h-4" />
                          Sell on E-SHOP
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium mt-0.5">Marketplace Group</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBusinessTrack('own-store')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          businessTrack === 'own-store'
                            ? 'border-primary bg-blue-50/70 text-primary font-bold shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <Globe className="w-4 h-4" />
                          Own Store
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium mt-0.5">Independent Domain</div>
                      </button>
                    </div>
                  </div>

                  {/* Sub Option for E-SHOP Marketplace Track */}
                  {businessTrack === 'eshop-marketplace' && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        2. Marketplace Service Model
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEshopOption('direct-listing')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold text-center border transition-all ${
                            eshopOption === 'direct-listing'
                              ? 'bg-white border-primary text-primary shadow-sm'
                              : 'bg-transparent border-slate-200 text-slate-600'
                          }`}
                        >
                          Marketplace Direct Listing
                        </button>
                        <button
                          type="button"
                          onClick={() => setEshopOption('managed-sales')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold text-center border transition-all ${
                            eshopOption === 'managed-sales'
                              ? 'bg-white border-primary text-primary shadow-sm'
                              : 'bg-transparent border-slate-200 text-slate-600'
                          }`}
                        >
                          E-SHOP Managed Sales
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sub Info for Own Store Track */}
                  {businessTrack === 'own-store' && (
                    <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-xs text-slate-700 font-medium">
                      <span className="font-bold text-primary block mb-0.5">Independent Custom Domain Track</span>
                      You will get a dedicated admin portal to connect your domain name (<span className="font-mono font-bold">yourstore.com</span>) with 0% marketplace fee.
                    </div>
                  )}

                  {/* Representative Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Owner / Representative Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Varma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Store Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business / Store Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elite Digital Mall"
                        value={formData.storeName}
                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="seller@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer active:scale-95"
              >
                <span>{isSignUp ? 'Register & Open Admin Dashboard' : 'Login to Admin Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Log In */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium">
                {isSignUp ? 'Already registered as a seller?' : 'New merchant?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary font-bold hover:underline cursor-pointer ml-1"
                >
                  {isSignUp ? 'Seller Login' : 'Register Store Account'}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}
