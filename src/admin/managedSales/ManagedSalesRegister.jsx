import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import { 
  Zap, 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Phone, 
  Camera, 
  TrendingUp, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from 'lucide-react';

export default function ManagedSalesRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    inventoryType: '',
    estimatedItems: '',
    preferredVisitDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to Managed Sales Seller Portal
    navigate('/admin/managed-dashboard');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans antialiased">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-8 select-none">
                <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  E-SHOP <span className="text-emerald-400 text-xs uppercase">Managed</span>
                </span>
              </Link>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-4 border border-emerald-400/20">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Full-Service Managed Selling
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                We Sell, You Fulfill
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Our team visits your shop, shoots HD photos, creates listings, runs targeted digital ads, and handles customer service. You simply pack items for pickup.
              </p>
            </div>

            {/* How Managed Sales Works */}
            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                { title: '1. Professional Photography', desc: 'HD photos & videos taken at your store' },
                { title: '2. Managed Listing & Marketing', desc: 'Targeted ads across Thrissur' },
                { title: '3. Pack & Dispatch', desc: 'Simply hand over packages to E-SHOP courier' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">{step.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Prefer self-listing?{' '}
                <Link to="/admin/marketplace-register" className="text-emerald-400 font-bold hover:underline">
                  Marketplace Self-Listing &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Request Managed Sales Service
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Fill out pickup details to assign your E-SHOP Account Manager
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              
              {/* Business Name */}
              <div className="relative pt-1">
                <input
                  type="text"
                  id="businessName"
                  required
                  placeholder=" "
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
                <label
                  htmlFor="businessName"
                  className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                >
                  Business / Shop Name
                </label>
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <input
                    type="text"
                    id="ownerName"
                    required
                    placeholder=" "
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                  <label
                    htmlFor="ownerName"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Contact Person
                  </label>
                </div>

                <div className="relative pt-1">
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Pickup Address */}
              <div className="relative pt-1">
                <input
                  type="text"
                  id="address"
                  required
                  placeholder=" "
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
                <label
                  htmlFor="address"
                  className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                >
                  Pickup Address (Thrissur)
                </label>
              </div>

              {/* Category & Item Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <select
                    id="inventoryType"
                    value={formData.inventoryType}
                    onChange={(e) => setFormData({ ...formData, inventoryType: e.target.value })}
                    className="w-full px-3 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Apparel & Fashion">Apparel & Fashion</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Handicrafts & Decor">Handicrafts & Decor</option>
                    <option value="Organic Foods & Spices">Organic Foods & Spices</option>
                  </select>
                  <label
                    htmlFor="inventoryType"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-emerald-600 pointer-events-none"
                  >
                    Product Category
                  </label>
                </div>

                <div className="relative pt-1">
                  <select
                    id="estimatedItems"
                    value={formData.estimatedItems}
                    onChange={(e) => setFormData({ ...formData, estimatedItems: e.target.value })}
                    className="w-full px-3 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
                  >
                    <option value="" disabled>Select Estimated Volume</option>
                    <option value="10-20 items">10 - 20 items</option>
                    <option value="20-50 items">20 - 50 items</option>
                    <option value="50-100 items">50 - 100 items</option>
                    <option value="100+ items">100+ items</option>
                  </select>
                  <label
                    htmlFor="estimatedItems"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-emerald-600 pointer-events-none"
                  >
                    Estimated Volume
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-xs mt-3 cursor-pointer active:scale-95"
              >
                <span>Submit Request & Open Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}
