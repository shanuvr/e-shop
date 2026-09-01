import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import { 
  Wrench, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Building2, 
  MapPin, 
  Phone, 
  Sparkles, 
  Check,
  DollarSign
} from 'lucide-react';

export default function ServiceRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    providerName: '',
    phone: '',
    serviceCategory: '',
    serviceArea: '',
    rate: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to Service Provider Admin Dashboard
    navigate('/admin/service-dashboard');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans antialiased">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-8 select-none">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  E-SHOP <span className="text-blue-400 text-xs uppercase">Services</span>
                </span>
              </Link>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Local Service Provider Registration
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                Offer Your Local Services
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Get booked by thousands of households in Thrissur for cleaning, appliance repair, plumbing, beauty, and tutoring.
              </p>
            </div>

            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                'Instant booking requests from local customers',
                'Set your own hourly rate & service radius',
                'Manage bookings & payouts in Admin Dashboard'
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
                Selling physical items instead?{' '}
                <Link to="/admin/marketplace-register" className="text-blue-400 font-bold hover:underline">
                  Marketplace Product Listing &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Service Provider Registration
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Register your service business to start receiving customer bookings
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
                  className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <label
                  htmlFor="businessName"
                  className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                >
                  Service Business Name
                </label>
              </div>

              {/* Provider Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <input
                    type="text"
                    id="providerName"
                    required
                    placeholder=" "
                    value={formData.providerName}
                    onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="providerName"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Provider Name
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
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Category & Visiting Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative pt-1">
                  <select
                    id="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Home Cleaning">Home & Sofa Cleaning</option>
                    <option value="Appliance Repair">Appliance & AC Repair</option>
                    <option value="Plumbing & Electrical">Plumbing & Electrical Work</option>
                    <option value="Beauty & Wellness">Beauty & Home Salon</option>
                    <option value="Tutoring & Classes">Home Tutoring & Classes</option>
                  </select>
                  <label
                    htmlFor="serviceCategory"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-primary pointer-events-none"
                  >
                    Primary Service Category
                  </label>
                </div>

                <div className="relative pt-1">
                  <input
                    type="number"
                    id="rate"
                    required
                    placeholder=" "
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <label
                    htmlFor="rate"
                    className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3 peer-autofill:text-[11px] peer-autofill:font-bold pointer-events-none"
                  >
                    Starting Rate (₹/visit)
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
                <span>Register Service & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}
