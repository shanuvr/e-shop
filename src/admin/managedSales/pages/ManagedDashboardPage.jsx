import React from 'react';
import ManagedAdminLayout from '../layout/ManagedAdminLayout';
import { 
  Zap, 
  Camera, 
  Truck, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export default function ManagedDashboardPage() {
  return (
    <ManagedAdminLayout title="Managed Sales Overview" subtitle="Track cataloging progress, orders to dispatch, and weekly payouts">
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                ● Full-Service Managed Active
              </span>
              <span className="text-xs text-slate-400 font-semibold">• E-SHOP Handles Ads & Listings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Silk Land Textiles</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Assigned Account Manager: <span className="text-emerald-400 font-bold">Kavya Nair (+91 98470 99887)</span>
            </p>
          </div>
          
          <button
            onClick={() => alert('Account Manager Kavya Nair has been notified to schedule your next photo shoot!')}
            className="relative z-10 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Camera className="w-4 h-4" />
            Request Product Photo Shoot
          </button>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Payout', value: '₹34,200', sub: 'Deposited every Friday', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Pending Dispatch', value: '3 Orders', sub: 'Ready for courier pickup', icon: Truck, color: 'text-blue-600 bg-blue-50' },
            { label: 'Live Marketplace Items', value: '14 Items', sub: 'E-SHOP Promoted', icon: Zap, color: 'text-amber-600 bg-amber-50' },
            { label: 'Cataloging Progress', value: '5 Items', sub: 'In photo editing queue', icon: Camera, color: 'text-indigo-600 bg-indigo-50' }
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

        {/* 1. Dispatch Orders Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Orders Awaiting Your Packaging</h3>
              <p className="text-xs text-slate-500 font-medium">Please pack these items. E-SHOP pickup boy will arrive at 04:00 PM</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              3 Packages Ready
            </span>
          </div>

          {[
            { orderId: 'M-ORD-8821', item: 'Kanchipuram Pure Silk Saree (Red & Gold)', qty: '1 unit', customer: 'Meera Nambiar (Ernakulam)', status: 'Pack & Label Ready' },
            { orderId: 'M-ORD-8819', item: 'Handloom Cotton Kurta (Size L)', qty: '2 units', customer: 'Devika P (Thrissur East)', status: 'Pack & Label Ready' }
          ].map((ord) => (
            <div key={ord.orderId} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{ord.orderId}</span>
                  <span className="text-xs text-slate-500 font-semibold">• {ord.customer}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1">{ord.item} <span className="text-slate-500 font-normal">({ord.qty})</span></p>
              </div>

              <button
                onClick={() => alert(`Marked ${ord.orderId} as Packed and Ready for Pickup!`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                Confirm Packed
              </button>
            </div>
          ))}
        </div>

        {/* 2. Cataloging & Photo Editing Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">E-SHOP Cataloging Team Status</h3>
          <div className="space-y-3">
            {[
              { title: 'Designer Handloom Sarees (Batch #4)', status: 'Editing & Background Removal', date: 'Shot Yesterday' },
              { title: 'Traditional Kasavu Dhotis', status: 'Live on E-SHOP Marketplace', date: 'Approved Today' }
            ].map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{cat.title}</span>
                  <span className="text-slate-400 text-[10px]">{cat.date}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 text-[11px]">
                  {cat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ManagedAdminLayout>
  );
}
