import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  ShoppingBag, 
  CreditCard, 
  Store, 
  LogOut,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export default function SellerSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/categories', label: 'Categories', icon: Grid },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/admin/payment', label: 'Payment', icon: CreditCard }
  ];

  return (
    <>
      {/* Mobile Bar */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-black text-lg tracking-tight">Marketplace <span className="text-primary text-xs">Seller</span></span>
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
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/30">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-white text-base tracking-tight leading-none">Seller Admin</h1>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Marketplace Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-2">
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation</div>
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
                        ? 'bg-primary text-white font-bold shadow-md shadow-primary/25'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
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
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}
