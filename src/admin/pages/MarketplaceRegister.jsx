import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import {
  ShoppingBag,
  Sparkles,
  Check,
  Layers,
  Rocket,
  CreditCard,
  Wallet,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { registerSeller } from '../../lib/seller';

const PRIORITY_PRICE = 1999;

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

  const [plan, setPlan] = useState('non-priority');
  const [payMethod, setPayMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const saveAndOpenDashboard = () => {
    registerSeller({
      storeName: formData.storeName,
      ownerName: formData.ownerName,
      category: formData.category,
      email: formData.email,
      location: formData.location,
      plan,
      priority: plan === 'priority',
      paid: plan === 'priority'
    });
    navigate('/admin/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plan === 'non-priority') {
      saveAndOpenDashboard();
      return;
    }

    // Priority plan requires payment before registration completes
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      saveAndOpenDashboard();
    }, 1800);
  };

  const planCard = (value, label, price, icon, highlight, points, selected) => (
    <button
      type="button"
      onClick={() => setPlan(value)}
      className={`text-left rounded-2xl border-2 p-3.5 transition-all cursor-pointer ${
        selected
          ? 'border-primary bg-blue-50/50 shadow-md shadow-primary/10'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
            selected ? 'bg-primary' : 'bg-slate-200'
          }`}
        >
          {icon}
        </span>
        <span className="font-black text-sm text-slate-900">{label}</span>
        {highlight && (
          <span className="ml-auto text-[9px] font-black uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
            {highlight}
          </span>
        )}
      </div>
      <p className="text-[10.5px] text-slate-500 font-semibold leading-snug">{points}</p>
      <div className="mt-1.5">
        {price ? (
          <span className={`text-base font-black ${selected ? 'text-primary' : 'text-slate-900'}`}>{price}</span>
        ) : (
          <span className="text-base font-black text-emerald-600">Free</span>
        )}
      </div>
    </button>
  );

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
                'Priority listing pins your store to the first page',
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
                Fill out store details, then choose how you want your store listed
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

              {/* Listing Plan */}
              <div className="pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Listing Plan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {planCard(
                    'non-priority',
                    'Standard',
                    null,
                    <Layers className="w-4 h-4" />,
                    null,
                    'Shows up normally in search results, exactly like every other store.',
                    plan === 'non-priority'
                  )}
                  {planCard(
                    'priority',
                    'Priority',
                    `₹${PRIORITY_PRICE.toLocaleString('en-IN')}/yr`,
                    <Rocket className="w-4 h-4" />,
                    'Top of search',
                    'Your store is pinned to the first page of search results, above all standard stores.',
                    plan === 'priority'
                  )}
                </div>
              </div>

              {/* Payment (Priority only) */}
              {plan === 'priority' && (
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">Priority Listing · 1 year</p>
                        <p className="text-[10px] font-medium text-slate-500">Pay once, stay pinned to the top of results</p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900 shrink-0">
                      ₹{PRIORITY_PRICE.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Payment Method Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayMethod('upi')}
                      className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold py-2 rounded-xl border transition-all cursor-pointer ${
                        payMethod === 'upi'
                          ? 'bg-primary border-primary text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayMethod('card')}
                      className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold py-2 rounded-xl border transition-all cursor-pointer ${
                        payMethod === 'card'
                          ? 'bg-primary border-primary text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Card
                    </button>
                  </div>

                  {payMethod === 'upi' ? (
                    <div className="relative pt-1">
                      <input
                        type="text"
                        id="upiId"
                        placeholder=" "
                        className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <label
                        htmlFor="upiId"
                        className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 pointer-events-none"
                      >
                        UPI ID (e.g. name@upi)
                      </label>
                      <p className="text-[9px] text-slate-400 font-medium mt-1">Demo checkout — any UPI ID works.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative pt-1">
                        <input
                          type="text"
                          id="cardName"
                          placeholder=" "
                          className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <label
                          htmlFor="cardName"
                          className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 pointer-events-none"
                        >
                          Name on Card
                        </label>
                      </div>
                      <div className="relative pt-1">
                        <input
                          type="text"
                          id="cardNumber"
                          inputMode="numeric"
                          placeholder=" "
                          className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <label
                          htmlFor="cardNumber"
                          className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 pointer-events-none"
                        >
                          Card Number
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative pt-1">
                          <input
                            type="text"
                            id="cardExpiry"
                            placeholder=" "
                            className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                          <label
                            htmlFor="cardExpiry"
                            className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 pointer-events-none"
                          >
                            MM/YY
                          </label>
                        </div>
                        <div className="relative pt-1">
                          <input
                            type="text"
                            id="cardCvv"
                            inputMode="numeric"
                            placeholder=" "
                            className="peer w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                          <label
                            htmlFor="cardCvv"
                            className="absolute left-3 -top-2.5 bg-white px-1.5 text-[11px] font-bold text-slate-500 pointer-events-none"
                          >
                            CVV
                          </label>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 font-medium">Demo checkout — any dummy card details work.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-primary hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xs mt-3 cursor-pointer active:scale-95"
              >
                {plan === 'priority' ? (
                  processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {paid ? 'Registering...' : 'Processing payment...'}
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{PRIORITY_PRICE.toLocaleString('en-IN')} & Register Store</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )
                ) : (
                  <>
                    <span>Register Free Store & Open Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}