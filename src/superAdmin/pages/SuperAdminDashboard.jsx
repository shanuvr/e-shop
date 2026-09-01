import SuperAdminLayout from '../layout/SuperAdminLayout';
import { DollarSign, Store, Zap, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout title="Platform Operations & GMV" subtitle="E-SHOP HQ System Operations Dashboard">
      <div className="space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Platform GMV', value: '₹18,42,000', sub: '+32% this month', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Managed Sales Requests', value: '14 Merchants', sub: '2 awaiting assignment', icon: Zap, color: 'text-amber-600 bg-amber-50' },
            { label: 'Active Photo Shoots', value: '6 Shoots', sub: 'Scheduled in Thrissur', icon: Camera, color: 'text-blue-600 bg-blue-50' },
            { label: 'Total Active Sellers', value: '128 Stores', sub: 'Verified Merchants', icon: Store, color: 'text-indigo-600 bg-indigo-50' }
          ].map((m, i) => {
            const IconComp = m.icon;
            return (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{m.label}</span>
                  <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center shrink-0`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{m.value}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Managed Sales Requests Queue</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-100">
                2 Action Needed
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Merchants who submitted requests for full-service cataloging & marketing.</p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Silk Land Textiles</span>
                  <span className="text-slate-400 text-[10px]">Apparel & Fashion • Round West, Thrissur</span>
                </div>
                <Link to="/super-admin/managed-requests" className="text-blue-600 font-bold hover:underline">
                  Assign & Schedule &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SuperAdminLayout>
  );
}
