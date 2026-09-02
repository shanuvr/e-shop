import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  HelpCircle,
  Package,
  RotateCcw,
  Truck,
  ShieldCheck,
  FileText,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export const SUPPORT_NAV = [
  { to: '/help', key: 'help', label: 'Help Center & FAQ', icon: HelpCircle },
  { to: '/order-tracking', key: 'tracking', label: 'Order Tracking', icon: Package },
  { to: '/returns', key: 'returns', label: 'Returns & Exchange', icon: RotateCcw },
  { to: '/shipping', key: 'shipping', label: 'Shipping Guidelines', icon: Truck },
  { to: '/privacy', key: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
  { to: '/terms', key: 'terms', label: 'Terms of Service', icon: FileText }
];

export function InfoLayout({ active, title, description, children }) {
  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-130px)] py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-600">{title}</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">{description}</p>
          )}

          <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm lg:sticky lg:top-24">
              <p className="px-3.5 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Customer Support
              </p>
              {SUPPORT_NAV.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    active === item.key
                      ? 'bg-blue-50 text-primary'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                      active === item.key ? 'text-primary' : 'text-slate-300'
                    }`}
                  />
                </Link>
              ))}
            </aside>

            <section className="min-w-0 space-y-5">{children}</section>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export function InfoSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{a}</p>
      )}
    </div>
  );
}