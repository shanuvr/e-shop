import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  Store,
  Users,
  Truck,
  Star,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Package,
  Wrench,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const stats = [
  { value: '500+', label: 'Verified local sellers', icon: Store },
  { value: '15,000+', label: 'Happy customers', icon: Users },
  { value: '98.5%', label: 'On-time delivery rate', icon: Truck },
  { value: '4.9', label: 'Average store rating', icon: Star }
];

const values = [
  {
    icon: Store,
    title: 'Local-first commerce',
    desc: 'Every product on E-SHOP comes from a real, verified neighbourhood business. Shopping local keeps your money in the community.'
  },
  {
    icon: ShieldCheck,
    title: 'Verified sellers & products',
    desc: 'Each seller is vetted and every listing reviewed, so what you receive is authentic and exactly as described.'
  },
  {
    icon: Truck,
    title: 'Fast, reliable delivery',
    desc: 'Hyperlocal logistics get orders to your doorstep quickly, with live tracking and a 7-day easy return policy.'
  },
  {
    icon: Package,
    title: 'Simpler selling',
    desc: 'We handle cataloguing, photography, order management and marketing — so sellers can go digital without the heavy lifting.'
  }
];

const steps = [
  {
    icon: ShoppingBag,
    title: 'Explore the marketplace',
    desc: 'Browse verified stores, products and services across categories, filtered by your location.'
  },
  {
    icon: Package,
    title: 'Order securely',
    desc: 'Add to cart and check out safely with UPI, cards or cash on delivery.'
  },
  {
    icon: Wrench,
    title: 'Delivered fast',
    desc: 'Get your order at your doorstep, or book a home service at a time that suits you.'
  }
];

export default function AboutUs() {
  return (
    <UserLayout>
      <div className="bg-[#f8fafc] py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-600">About Us</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              About E-SHOP
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-500">
              E-SHOP is the local marketplace for Kerala. We help trusted neighbourhood stores,
              artisans and service providers reach customers online, while keeping the experience
              of shopping local — genuine products, fair prices, and fast delivery.
            </p>
          </div>

          {/* Story */}
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                  alt="Modern local retail store experience"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 sm:left-6 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-lg shadow-slate-200/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Rooted in the community</p>
                  <p className="text-[11px] text-slate-500 font-medium">Serving Kerala since day one</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                A modern door to your local market
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Neighbourhood markets carry decades of trust, craft and unique products. But modern
                shoppers expect the convenience of browsing online, comparing prices and getting
                things delivered home. E-SHOP brings those two worlds together.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                What started as a simple idea — that great local businesses deserve a great online
                presence — has grown into a network of 500+ verified sellers serving thousands of
                customers every month. We look after everything from listing products to delivery
                logistics, so shop owners can focus on what they do best.
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  'Direct connection to authentic local stores and verified service providers',
                  'Transparent pricing with no hidden markups for customers',
                  'Same-day doorstep delivery and easy 7-day returns',
                  'Dedicated support for every seller on the platform'
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black leading-none text-slate-900">{item.value}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Values */}
          <section className="mt-16">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                What we stand for
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Four principles guide everything we build and every decision we make.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-colors hover:border-slate-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-16">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                How E-SHOP works
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                A simple three-step flow for buyers, built for speed and clarity.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
                      {idx + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8 lg:flex-row">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  Ready to shop local?
                </h2>
                <p className="mt-1.5 text-sm text-slate-600">
                  Explore verified stores near you, or bring your own business online with E-SHOP.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/seller"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Store className="h-4 w-4" />
                  Become a Seller
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </UserLayout>
  );
}