import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShoppingBag,
  Store
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate customer back to home page
    navigate('/');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans antialiased">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Decorative Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
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
                Customer Account
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                Shop & Book Local Services
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Access your orders, track deliveries, save favorite products, and book local Thrissur services instantly.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                '100% Genuine verified local businesses',
                'Hassle-free 7-day returns & fast shipping',
                'Track orders & service appointments in real-time'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            {/* Link to Seller Login */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Are you a business owner?{' '}
                <Link to="/seller-login" className="text-blue-400 font-bold hover:underline">
                  Go to Seller Login &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isSignUp ? 'Create Customer Account' : 'Customer Login'}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                {isSignUp ? 'Enter your information to sign up for E-SHOP' : 'Sign in to access your cart, wishlist, and orders'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name for Sign Up */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
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
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
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
                <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Log In */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium">
                {isSignUp ? 'Already have a customer account?' : "Don't have an account yet?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary font-bold hover:underline cursor-pointer ml-1"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}
