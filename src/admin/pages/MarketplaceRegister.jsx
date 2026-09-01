import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import { 
  Store, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Building2, 
  MapPin, 
  ShoppingBag, 
  Sparkles,
  Check
} from 'lucide-react';

export default function MarketplaceRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    category: '',
    email: '',
    password: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Directly navigate to Marketplace Seller Dashboard
    navigate('/admin/dashboard');
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
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  E-SHOP
                </span>
              </Link>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                Marketplace Merchant Registration
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                Register Your Store on E-SHOP
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                List products or local services directly on the central E-SHOP marketplace for instant customer discovery.
              </p>
            </div>

            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                'Instant search ranking across E-SHOP categories',
                'List physical products or bookable home services',
                'Dedicated Seller Admin Dashboard'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Already registered?{' '}
                <Link to="/login" className="text-blue-400 font-bold hover:underline">
                  Seller Login &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Store Registration
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Fill out store details to access your Seller Admin Dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              
              {/* Store Name */}
              <div className="relative pt-1">
                <input
                  type="text"
                  id="storeName"
                  required
                  placeholder=" "
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <label
                  htmlFor="storeName"
                  className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                >
                  Business / Store Name
                </label>
              </div>

              {/* Owner Name */}
              <div className="relative pt-1">
                <input
                  type="text"
                  id="ownerName"
                  required
                  placeholder=" "
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <label
                  htmlFor="ownerName"
                  className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                >
                  Owner / Representative Name
                </label>
              </div>

              {/* Primary Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Electronics">Electronics & Appliances</option>
                    <option value="Fashion">Fashion & Clothing</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Services">Local Home Services</option>
                  </select>
                  <label
                    htmlFor="category"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-primary pointer-events-none"
                  >
                    Primary Category
                  </label>
                </div>

                <div className="relative pt-1">
                  <input
                    type="text"
                    id="location"
                    required
                    placeholder=" "
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="location"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    City / Location
                  </label>
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative pt-1">
                  <input
                    type="password"
                    id="password"
                    required
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Password
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xs mt-3 cursor-pointer active:scale-95"
              >
                <span>Register Store & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}
