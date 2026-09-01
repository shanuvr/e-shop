import React, { useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import { 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Globe, 
  Grid, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Star, 
  MapPin,
  TrendingUp,
  Layers,
  Sparkles,
  Search,
  Filter,
  Check,
  Clock,
  ShieldCheck,
  Store
} from 'lucide-react';

export default function SellerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Custom Domain State
  const [customDomain, setCustomDomain] = useState('www.elitedigital.com');
  const [domainStatus, setDomainStatus] = useState('Active & SSL Secured');

  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Electronics & Gadgets', count: 18, status: 'Active' },
    { id: 2, name: 'Audio & Acoustics', count: 12, status: 'Active' },
    { id: 3, name: 'Wearable Tech', count: 9, status: 'Active' },
    { id: 4, name: 'Home Services', count: 5, status: 'Active' }
  ]);

  const [sellerListings, setSellerListings] = useState([
    {
      id: 'e1',
      title: 'Acoustic Pro Headphones',
      category: 'Audio & Acoustics',
      price: '₹24,999',
      location: 'Swaraj Round, Thrissur',
      description: 'Immersive sound experience with active noise cancellation.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'BESTSELLER',
      type: 'product'
    },
    {
      id: 'e2',
      title: 'Elite Smartwatch Series',
      category: 'Wearable Tech',
      price: '₹36,999',
      location: 'Swaraj Round, Thrissur',
      description: 'Next-gen health monitoring and workout tracking.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'NEW RELEASE',
      type: 'product'
    },
    {
      id: 's1',
      title: 'Deep Home Cleaning Service',
      category: 'Home Services',
      price: '₹499/hr',
      location: 'Thrissur & Nearby',
      description: 'Top-to-bottom sanitization for apartments and houses.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&h=300',
      tag: 'TOP RATED',
      type: 'service'
    }
  ]);

  const handleAddListing = (newListing) => {
    setSellerListings([newListing, ...sellerListings]);
  };

  const handleDeleteListing = (id) => {
    setSellerListings(sellerListings.filter(item => item.id !== id));
  };

  const filteredListings = selectedCategoryFilter === 'All'
    ? sellerListings
    : sellerListings.filter(item => item.category === selectedCategoryFilter);

  return (
    <AdminLayout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      onOpenAddModal={() => setIsAddModalOpen(true)}
    >
      
      {/* 1. OVERVIEW SECTION */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          
          {/* Hero Banner Banner Card */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                  ● Standalone Store Active
                </span>
                <span className="text-xs text-slate-400 font-semibold">• Domain Connected</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Elite Digital Store Admin</h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Independent E-Commerce Portal for <span className="text-blue-400 font-mono">www.elitedigital.com</span>
              </p>
            </div>
            
            <div className="relative z-10 flex gap-3">
              <a
                href="/shop/shop-1"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
              >
                <ExternalLink className="w-4 h-4" />
                Live Storefront
              </a>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: '₹1,48,200', sub: '+24% this month', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Total Orders', value: '186', sub: '8 awaiting dispatch', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
              { label: 'Master Products', value: sellerListings.length, sub: 'Items & Services', icon: Package, color: 'text-indigo-600 bg-indigo-50' },
              { label: 'Custom Domain', value: 'elitedigital.com', sub: 'SSL Secured', icon: Globe, color: 'text-amber-600 bg-amber-50' }
            ].map((m, idx) => {
              const IconComponent = m.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{m.label}</span>
                    <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center shrink-0`}>
                      <IconComponent className="w-4 h-4" />
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

          {/* Recent Products Overview */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Catalog Highlights</h3>
                <p className="text-xs text-slate-500 font-medium">Quick snapshot of listings active on your store</p>
              </div>
              <button
                onClick={() => setActiveSection('products')}
                className="text-xs font-bold text-primary hover:underline"
              >
                View All Products &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sellerListings.slice(0, 3).map((item) => (
                <ProductCard key={item.id} item={item} linkPrefix="/product" />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. PRODUCTS MASTER LIST SECTION */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Master Product Catalog</h2>
              <p className="text-xs text-slate-500 font-medium">Manage prices, descriptions, and stock for your store</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter:</span>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer font-bold text-primary"
                >
                  <option value="All">All Categories</option>
                  <option value="Audio & Acoustics">Audio & Acoustics</option>
                  <option value="Wearable Tech">Wearable Tech</option>
                  <option value="Home Services">Home Services</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredListings.map((item) => (
              <div key={item.id} className="relative group">
                <ProductCard item={item} linkPrefix="/product" />
                <button
                  onClick={() => handleDeleteListing(item.id)}
                  className="absolute top-2 right-2 z-20 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CATEGORIES MASTER SECTION */}
      {activeSection === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Master Categories Manager</h2>
              <p className="text-xs text-slate-500 font-medium">Create and organize product categories for your standalone store</p>
            </div>
            <button
              onClick={() => {
                const name = prompt('Enter new category name:');
                if (name) {
                  setCategoriesList([...categoriesList, { id: Date.now(), name, count: 0, status: 'Active' }]);
                }
              }}
              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary font-bold flex items-center justify-center text-xs">
                      <Grid className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                      <span className="text-xs text-slate-400 font-medium">{cat.count} products listed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
                      {cat.status}
                    </span>
                    <button
                      onClick={() => setCategoriesList(categoriesList.filter(c => c.id !== cat.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. ORDERS SECTION */}
      {activeSection === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Orders & Deliveries Master</h2>
            <p className="text-xs text-slate-500 font-medium">Track customer orders placed on your standalone website</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            {[
              { orderId: 'ORD-9821', customer: 'Ananya Sharma', items: 'Acoustic Pro Headphones', total: '₹24,999', status: 'Ready for Dispatch', date: 'Today, 09:30 AM' },
              { orderId: 'ORD-9819', customer: 'Karthik Menon', items: 'Elite Smartwatch Series', total: '₹36,999', status: 'Delivered', date: 'Yesterday' },
              { orderId: 'ORD-9815', customer: 'Rahul Varma', items: 'Deep Home Cleaning Service', total: '₹499', status: 'Service Scheduled', date: '28 Aug 2026' }
            ].map((ord) => (
              <div key={ord.orderId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{ord.orderId}</span>
                    <span className="text-xs font-semibold text-slate-500">• {ord.customer}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-1">{ord.items}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{ord.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-900">{ord.total}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CUSTOM DOMAIN SECTION */}
      {activeSection === 'domain' && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-bold text-slate-900">Custom Domain & Independent Website</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Connect your own custom domain name to give your store full brand independence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Your Custom Store Domain
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-primary"
                />
                <button
                  onClick={() => alert(`Domain mapping updated to ${customDomain}!`)}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Save Domain
                </button>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SSL Status: {domainStatus}</span>
              </div>
              <a href="/shop/shop-1" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                Open Site <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs space-y-2 text-slate-600">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">DNS CNAME Settings:</h4>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px]">
                Host: @ | Type: CNAME | Value: shops.e-shop.com
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SETTINGS SECTION */}
      {activeSection === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Store Settings & Branding</h2>
            <p className="text-xs text-slate-500 font-medium">Configure store name, location, and payment gateway</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Settings saved!'); }} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Store Name</label>
              <input type="text" defaultValue="Elite Digital Mall" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Business Location</label>
              <input type="text" defaultValue="Swaraj Round, Thrissur, Kerala" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold" />
            </div>
            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm">
              Save Settings
            </button>
          </form>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddListing={handleAddListing}
      />

    </AdminLayout>
  );
}
