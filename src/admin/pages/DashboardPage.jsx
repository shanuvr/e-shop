import React from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import { DollarSign, ShoppingBag, Package, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <SellerAdminLayout title="Dashboard Overview" subtitle="Welcome back to your seller admin dashboard">
      <div className="space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Sales', value: '₹1,24,800', sub: '+18% this month', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Total Orders', value: '142', sub: '12 pending dispatch', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
            { label: 'Active Products', value: '18', sub: 'In stock catalog', icon: Package, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Conversion Rate', value: '3.4%', sub: 'High buyer traffic', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' }
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{card.label}</span>
                  <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center shrink-0`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{card.value}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5">{card.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-2">Quick Admin Actions</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">Manage your products, category catalog, or review customer orders.</p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/products" className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Manage Products</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link to="/admin/categories" className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Categories Master</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-2">Recent Store Notifications</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="font-bold text-slate-900">New Order #ORD-9821</span> received for Acoustic Headphones.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                Category <span className="font-bold text-slate-900">Audio & Acoustics</span> updated.
              </div>
            </div>
          </div>
        </div>

      </div>
    </SellerAdminLayout>
  );
}
