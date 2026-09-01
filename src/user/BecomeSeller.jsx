import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  Store,
  ShoppingBag,
  Globe,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  Package,
  TrendingUp,
  BadgeCheck,
  Rocket,
  CreditCard,
  LifeBuoy,
  Wrench
} from 'lucide-react';

export default function BecomeSeller() {
  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] min-h-screen font-sans text-slate-900 antialiased pb-20">

        {/* Hero Header */}
        <div className="bg-gradient-to-b from-blue-50/90 via-slate-50/80 to-[#f8fafc] border-b border-slate-200/60 py-10 sm:py-14 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/80 text-primary text-xs font-bold shadow-xs mb-4">
              <Rocket className="w-3.5 h-3.5 text-primary" />
              Grow your business with E-SHOP
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3 text-slate-900">
              Sell to thousands of <span className="text-primary">local customers</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-6 font-medium">
              Start selling products or services on the E-SHOP marketplace, or launch your own independent online store. Choose the model that fits your business.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-xs">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-primary" /> No upfront fees</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-primary" /> Real-time dashboard</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-primary" /> Secure payouts</span>
            </div>
          </div>
        </div>

        {/* Options Cards */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Option 1: Marketplace */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  <ShoppingBag className="w-3 h-3" />
                  Marketplace
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Best to get started</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                Sell on the E-SHOP Marketplace
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                List your products or home services on the central E-SHOP marketplace and get discovered by local shoppers instantly.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                {[
                  { icon: Package, text: 'List products or bookable services' },
                  { icon: TrendingUp, text: 'Instant visibility in E-SHOP search' },
                  { icon: Users, text: 'Reach 1,000s of local customers' },
                  { icon: CreditCard, text: 'Digital checkout & secure payouts' }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-blue-50/80 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-2">
                <Link
                  to="/admin/marketplace-register"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm shadow-primary/20"
                >
                  List Products on Marketplace
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/admin/service-register"
                  className="w-full inline-flex items-center justify-center gap-1.5 border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs py-2 rounded-xl transition-all"
                >
                  <Wrench className="w-3.5 h-3.5 text-primary" />
                  Offer Local Home Services
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400" />
                </Link>
                <Link
                  to="/admin/managed-sales-register"
                  className="w-full inline-flex items-center justify-center gap-1.5 border border-primary/40 text-primary hover:bg-blue-50/80 font-bold text-xs py-2 rounded-xl transition-all"
                >
                  E-SHOP Managed Sales
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Option 2: Independent Store */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-400/40 transition-all duration-300 overflow-hidden flex flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  <Globe className="w-3 h-3" />
                  Independent Store
                </span>
                <span className="text-[10px] font-semibold text-slate-400">For established brands</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                Launch your own online store
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                Build a fully independent storefront with your own domain, branding, and direct checkout — no marketplace commission.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                {[
                  { icon: Globe, text: 'Custom domain with free SSL' },
                  { icon: Store, text: 'You own the full brand experience' },
                  { icon: BarChart3, text: 'Complete admin dashboard' },
                  { icon: ShieldCheck, text: 'Direct payments, 0% commission' }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  to="/seller-login"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Build Independent Store
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Why Sell With Us */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-8">
            <div className="max-w-lg mb-7">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Why E-SHOP</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                Everything you need to sell online
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Users, title: 'Local reach', desc: 'Sell to shoppers and service seekers right in Thrissur and beyond.' },
                { icon: CreditCard, title: 'Easy payments', desc: 'Accept UPI, cards, and wallets through our secure checkout.' },
                { icon: BarChart3, title: 'Smart insights', desc: 'Track sales, views, and performance with a simple dashboard.' },
                { icon: LifeBuoy, title: 'Dedicated support', desc: 'Get help setting up and growing your store whenever you need it.' }
              ].map((f, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200/60 p-5">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white mb-3">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="max-w-lg mb-7">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Getting started</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
              Live in four simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up as a seller with your business details.' },
              { step: '02', title: 'Add your products', desc: 'List items with photos, prices, and stock.' },
              { step: '03', title: 'Start selling', desc: 'Orders come in through the marketplace or your store.' },
              { step: '04', title: 'Get paid', desc: 'Receive payouts securely and track them in your dashboard.' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/70 p-5 relative">
                <span className="absolute top-4 right-4 text-3xl font-black text-slate-100 select-none">{s.step}</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed pr-6">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Ready to start selling?
              </h3>
              <p className="text-blue-100 text-sm mt-1.5">
                Join E-SHOP today and reach your local customers in minutes.
              </p>
            </div>
            <Link
              to="/seller-login"
              className="relative z-10 inline-flex items-center gap-2 bg-white text-primary hover:bg-blue-50 font-bold text-sm px-7 py-3.5 rounded-full transition-colors shadow-lg shrink-0"
            >
              Become a Seller
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}
