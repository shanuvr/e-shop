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
  CreditCard
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

  const trustFeatures = [
    { icon: Truck, title: 'Free Express Delivery', desc: 'On all orders above ₹499' },
    { icon: RotateCcw, title: 'Hassle-Free Returns', desc: '7-day easy return policy' },
    { icon: ShieldCheck, title: '100% Secure Checkout', desc: 'Encrypted payment gateway' },
    { icon: Headphones, title: '24/7 Dedicated Support', desc: 'Expert help whenever you need' }
  ];

  const shopLinks = [
    { to: '/marketplace', label: 'All Products' },
    { to: '/marketplace?category=electronics', label: 'Electronics & Gadgets' },
    { to: '/marketplace?category=fashion', label: 'Fashion & Apparel' },
    { to: '/marketplace?category=home', label: 'Home & Living' },
    { to: '/marketplace', label: 'Trending Deals' },
    { to: '/cart', label: 'View Shopping Cart' }
  ];

  const sellerLinks = [
    { to: '/seller', label: 'Become a Seller' },
    { to: '/admin/marketplace-register', label: 'Register Marketplace' },
    { to: '/admin/service-register', label: 'Service Provider Join' },
    { to: '/admin/managed-sales-register', label: 'Managed Sales Partner' },
    { to: '/seller-login', label: 'Seller Login Portal' },
    { to: '/super-admin/login', label: 'Super Admin Access' }
  ];

  const supportLinks = [
    { to: '/help', label: 'Help Center & FAQ' },
    { to: '/order-tracking', label: 'Order Tracking' },
    { to: '/returns', label: 'Returns & Exchange' },
    { to: '/shipping', label: 'Shipping Guidelines' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' }
  ];

  const socials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      label: 'Twitter',
      href: 'https://www.twitter.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white font-sans text-slate-500">
      {/* Trust features */}
      <div className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {trustFeatures.map((f, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900">{f.title}</h4>
                  <p className="mt-0.5 text-[13px] text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
            {/* Brand & contact */}
            <div className="space-y-5 sm:pr-6 lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                  <Store className="h-5 w-5" />
                </div>
                <span className="flex items-baseline text-xl font-black tracking-tight">
                  <span className="text-slate-900">E-</span>
                  <span className="text-primary">SHOP</span>
                </span>
              </Link>

              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                E-Shop is your premier multi-vendor online marketplace, connecting shoppers with top
                brands, verified sellers, and local service providers seamlessly.
              </p>

              <div className="space-y-2.5 text-[13px]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span>100 Innovation Tech Park, Koramangala, Bangalore, KA 560095</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span>+91 (800) 123-4567 / +91 (800) 765-4321</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span>support@eshop-marketplace.com</span>
                </div>
              </div>

              <div className="pt-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Follow Us
                </p>
                <div className="flex items-center gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-1">
              <h4 className="mb-4 text-sm font-semibold text-slate-900">Shop & Explore</h4>
              <ul className="space-y-3 text-[13px]">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="mb-4 text-sm font-semibold text-slate-900">For Sellers</h4>
              <ul className="space-y-3 text-[13px]">
                {sellerLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="mb-4 text-sm font-semibold text-slate-900">Customer Help</h4>
              <ul className="space-y-3 text-[13px]">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Get 15% off your first order
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">
                Subscribe to our newsletter for exclusive weekly deals, new arrival alerts, and
                curated insider promotions.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full lg:w-[420px] lg:flex-shrink-0">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
                <button
                  type="submit"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Thank you for subscribing! Check your inbox soon for your discount code.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 md:justify-start">
            <span>&copy; {new Date().getFullYear()} E-Shop Inc. All rights reserved.</span>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              India (INR ₹)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-1 hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:inline">
              Payments
            </span>
            {['VISA', 'MC', 'UPI', 'RuPay'].map((method) => (
              <span
                key={method}
                className="rounded-md border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-500"
              >
                {method}
              </span>
            ))}
            <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              <CreditCard className="h-3 w-3 text-slate-400" />
              Cards
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 text-xs font-medium text-slate-500 transition-colors hover:border-primary hover:bg-slate-50 hover:text-primary"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}