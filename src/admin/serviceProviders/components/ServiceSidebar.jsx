import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  LayoutDashboard, 
  CalendarCheck, 
  SlidersHorizontal, 
  DollarSign, 
  Settings,
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Clock
} from 'lucide-react';

export default function ServiceSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { to: '/admin/service-dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/service-requests', label: 'Booking Requests', icon: Clock, badge: '1 New' },
    { to: '/admin/service-bookings', label: 'Accepted Bookings', icon: CalendarCheck },
    { to: '/admin/service-manage', label: 'Service & Price Settings', icon: SlidersHorizontal },
    { to: '/admin/service-earnings', label: 'Earnings & Payouts', icon: DollarSign },
    { to: '/admin/service-settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-black text-lg tracking-tight">Service <span className="text-blue-400 text-xs">Provider</span></span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col justify-between transition-transform duration-300 transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } h-screen shrink-0 border-r border-slate-800/80`}>
        
        <div>
          {/* Header Logo */}
          <div className="p-5 border-b border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-white text-base tracking-tight leading-none">Service Portal</h1>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Thrissur Service Hub</span>
              </div>
            </Link>
          </div>

          {/* Provider Business Profile */}
          <div className="m-3 p-3 bg-blue-950/60 rounded-xl border border-blue-800/40 text-xs">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-0.5">Active Business</span>
            <div className="text-white font-bold truncate">Thrissur AC &amp; Electrical Care</div>
            <div className="text-[10px] text-slate-400">Primary: Appliance Repair</div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Provider Menu</div>
            {menuItems.map((item) => {
              const IconComp = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/20">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout Portal
          </button>
        </div>

      </aside>
    </>
  );
}
