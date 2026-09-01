import React from 'react';
import ManagedSidebar from '../components/ManagedSidebar';
import { Bell, User, PhoneCall } from 'lucide-react';

export default function ManagedAdminLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 flex flex-col lg:flex-row">
      <ManagedSidebar />
      
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="hidden lg:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">{title || 'Managed Sales Portal'}</h1>
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => alert('Calling your assigned E-SHOP Manager: Kavya Nair (+91 98470 99887)')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              Call Account Manager
            </button>

            <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold text-xs">
                SL
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">Silk Land Textiles</span>
                <span className="text-[10px] text-slate-500 font-semibold block">Managed Merchant</span>
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
