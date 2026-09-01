import React from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import { Bell, ShieldCheck } from 'lucide-react';

export default function SuperAdminLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 flex flex-col lg:flex-row">
      <SuperAdminSidebar />
      
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="hidden lg:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 tracking-tight">{title || 'E-SHOP HQ Portal'}</h1>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                Platform Admin
              </span>
            </div>
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">
                HQ
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">E-SHOP Operations Team</span>
                <span className="text-[10px] text-blue-600 font-semibold block">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
