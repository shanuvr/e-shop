import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Globe,
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      {/* 1. Value Proposition / Trust Features Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Express Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">On all orders above ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hassle-Free Returns</h4>
                <p className="text-xs text-slate-400 mt-0.5">7-day easy return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Secure Checkout</h4>
                <p className="text-xs text-slate-400 mt-0.5">Encrypted payment gateway</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800/60 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">Expert help whenever you need</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Subscription Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-10 shadow-2xl shadow-blue-900/30">
          {/* Subtle background glow graphics */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6">
              <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-semibold rounded-full mb-3 backdrop-blur-md">
                Newsletter
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Unlock 15% Off Your First Order!
              </h3>
              <p className="text-blue-100 text-sm mt-2 max-w-lg">
                Subscribe to our newsletter for exclusive weekly deals, new arrival alerts, and curated insider promotions.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-slate-900/90 text-white placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-white text-blue-600 font-bold rounded-2xl text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  Subscribe
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-2 mt-3 text-emerald-300 text-xs font-medium animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for subscribing! Check your inbox soon for your discount code.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Multi-Column Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Contact (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                E-<span className="text-blue-500">SHOP</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              E-Shop is your premier multi-vendor online marketplace, connecting shoppers with top brands, verified sellers, and local service providers seamlessly.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>100 Innovation Tech Park, Koramangala, Bangalore, KA 560095</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 (800) 123-4567 / +91 (800) 765-4321</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@eshop-marketplace.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex items-center gap-2">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    ),
                    href: '#',
                    label: 'Facebook'
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                    href: '#',
                    label: 'Twitter'
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                    href: '#',
                    label: 'Instagram'
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    ),
                    href: '#',
                    label: 'LinkedIn'
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                    href: '#',
                    label: 'YouTube'
                  }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Shop & Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              Shop & Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/marketplace" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Electronics & Gadgets
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Home & Living
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Trending Deals
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> View Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Seller & Business */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              For Sellers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/seller" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium text-slate-200">
                  <ChevronRight className="w-3 h-3 text-blue-500" /> Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/admin/marketplace-register" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Register Marketplace
                </Link>
              </li>
              <li>
                <Link to="/admin/service-register" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Service Provider Join
                </Link>
              </li>
              <li>
                <Link to="/admin/managed-sales-register" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Managed Sales Partner
                </Link>
              </li>
              <li>
                <Link to="/seller-login" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Seller Login Portal
                </Link>
              </li>
              <li>
                <Link to="/super-admin/login" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Super Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              Customer Help
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#help" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Help Center & FAQ
                </a>
              </li>
              <li>
                <a href="#order-status" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Order Tracking
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Returns & Exchange
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Shipping Guidelines
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. Bottom Footer Bar: Copyright, Payment Methods & Back to Top */}
      <div className="bg-slate-950 py-6 border-t border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-400">
            <span>&copy; {new Date().getFullYear()} E-Shop Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>India (INR ₹)</span>
            </div>
          </div>

          {/* Center: Accepted Payment Icons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mr-1 hidden lg:inline">
              Payments:
            </span>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-slate-300">
                VISA
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-slate-300">
                MC
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-slate-300">
                UPI
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-slate-300">
                RuPay
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-slate-300 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-blue-400" /> Cards
              </span>
            </div>
          </div>

          {/* Right: Back to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-blue-600 px-3.5 py-1.5 rounded-xl border border-slate-800 hover:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm group"
          >
            <span className="font-medium text-xs">Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
}

