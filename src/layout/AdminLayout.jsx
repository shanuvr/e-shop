import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  ShoppingBag, 
  Globe, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Store, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Plus
} from 'lucide-react';

export default function AdminLayout({ children, activeSection, setActiveSection, onOpenAddModal }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Services', icon: Package, badge: '3' },
    { id: 'categories', label: 'Categories Master', icon: Grid },
    { id: 'orders', label: 'Orders & Deliveries', icon: ShoppingBag, badge: '4' },
    { id: 'domain', label: 'Custom Domain & Store', icon: Globe },
    { id: 'settings', label: 'Store Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-black text-lg tracking-tight">E-SHOP <span className="text-xs font-semibold text-blue-400">ADMIN</span></span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col justify-between transition-transform duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } h-screen shrink-0 border-r border-slate-800/80`}>
        
        <div>
          {/* Brand Logo & Store Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/30">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-white text-base tracking-tight leading-none">Elite Digital</h1>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Seller Dashboard</span>
              </div>
            </Link>
          </div>

          {/* Quick Store Domain Link */}
          <div className="px-4 py-3 bg-slate-900/80 mx-3 my-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="truncate">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Independent Domain</span>
              <span className="font-mono text-white text-[11px] font-semibold truncate block">elitedigital.com</span>
            </div>
            <a
              href="/shop/shop-1"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg transition-colors"
              title="Preview Standalone Storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 py-2 space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Master Menu</div>
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25 font-bold'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={onOpenAddModal}
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
          
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
              Exit Admin
            </Link>
            <span className="text-[10px] text-slate-600">v2.4 Pro</span>
          </div>
        </div>

      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        {/* Top Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight capitalize">
              {menuItems.find(m => m.id === activeSection)?.label || 'Seller Dashboard'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Manage your store products, domain mapping, and order fulfillment.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                ED
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">Elite Digital</span>
                <span className="text-[10px] text-slate-500 font-semibold block">Store Admin</span>
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
