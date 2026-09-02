import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import {
  Store,
  UserCheck,
  ShieldCheck,
  Power,
  BadgeCheck,
  Users,
  MapPin,
  Search,
  Filter,
  Eye,
  X,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Star,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_SELLERS = [
  {
    id: 'S-201',
    name: 'Anjali Boutique',
    owner: 'Anjali Krishnan',
    category: 'Fashion & Apparel',
    type: 'Individual Seller',
    location: 'Naalukettu Road, Thrissur',
    fullAddress: 'Door No. 14/820, Naalukettu Road, Swaraj Round Near M.G. Mall, Thrissur, Kerala 680001',
    phone: '+91 98460 11223',
    email: 'anjali.boutique@gmail.com',
    joinedDate: '12 Jan 2026',
    revenue: '₹1,84,500',
    rating: 4.9,
    productsCount: 12,
    status: 'Enabled',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200',
    cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=300',
    categoryBreakdown: [
      { name: 'Saree & Ethnic Wear', count: 5, icon: '👘' },
      { name: 'Kurtis & Salwar Sets', count: 4, icon: '👗' },
      { name: 'Jewelry & Accessories', count: 3, icon: '✨' }
    ]
  },
  {
    id: 'S-202',
    name: 'Crafters Corner',
    owner: 'Dev Anand',
    category: 'Handicrafts & Decor',
    type: 'Individual Seller',
    location: 'Kokkalai, Thrissur',
    fullAddress: 'Building No. 8/412, Kokkalai Main Junction, Opposite SBI Bank, Thrissur, Kerala 680021',
    phone: '+91 97451 44332',
    email: 'crafterscorner.tcr@gmail.com',
    joinedDate: '05 Feb 2026',
    revenue: '₹92,400',
    rating: 4.8,
    productsCount: 7,
    status: 'Enabled',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200',
    cover: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&h=300',
    categoryBreakdown: [
      { name: 'Traditional Wall Decor', count: 4, icon: '🖼️' },
      { name: 'Handcrafted Pottery & Clay', count: 3, icon: '🏺' }
    ]
  },
  {
    id: 'S-203',
    name: 'GreenLeaf Organics',
    owner: 'Meera Nair',
    category: 'Organic Foods',
    type: 'Individual Seller',
    location: 'Poothole, Thrissur',
    fullAddress: 'Plot No. 24, Green Leaf Arcade, Railway Station Road, Poothole, Thrissur, Kerala 680004',
    phone: '+91 94472 88990',
    email: 'meera.greenleaf@gmail.com',
    joinedDate: '18 Mar 2026',
    revenue: '₹64,200',
    rating: 4.6,
    productsCount: 9,
    status: 'Disabled',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200',
    cover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&h=300',
    categoryBreakdown: [
      { name: 'Natural Honey & Preserves', count: 4, icon: '🍯' },
      { name: 'Cold Pressed Virgin Oils', count: 5, icon: '🥥' }
    ]
  },
  {
    id: 'S-204',
    name: 'Rustic Woodworks',
    owner: 'Ravi Menon',
    category: 'Woodwork & Furniture',
    type: 'Individual Seller',
    location: 'Chembukkavu, Thrissur',
    fullAddress: 'Menon Timber Works, Zoo Road Junction, Chembukkavu, Thrissur, Kerala 680020',
    phone: '+91 98953 66778',
    email: 'ravi.woodworks@gmail.com',
    joinedDate: '01 Apr 2026',
    revenue: '₹1,45,000',
    rating: 4.9,
    productsCount: 5,
    status: 'Enabled',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200',
    cover: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&h=300',
    categoryBreakdown: [
      { name: 'Teak Wooden Home Furniture', count: 3, icon: '🪑' },
      { name: 'Handmade Kitchenware & Boxes', count: 2, icon: '🪵' }
    ]
  },
  {
    id: 'S-205',
    name: 'Sunrise Spices',
    owner: 'Fathima Beevi',
    category: 'Spices & Grocery',
    type: 'Individual Seller',
    location: 'Guruvayur Road, Thrissur',
    phone: '+91 99614 22334',
    email: 'sunrisespices.tcr@gmail.com',
    joinedDate: '10 May 2026',
    revenue: '₹78,900',
    rating: 4.7,
    productsCount: 11,
    status: 'Disabled',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200',
    cover: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&h=300',
    categoryBreakdown: [
      { name: 'Whole Cardamom & Spices', count: 6, icon: '🌶️' },
      { name: 'Organic Masala Powders', count: 5, icon: '🌾' }
    ]
  }
];

export default function IndividualSellersPage() {
  const [sellers, setSellers] = useState(DEFAULT_SELLERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSeller, setSelectedSeller] = useState(null);

  const enabledCount = sellers.filter(s => s.status === 'Enabled').length;
  const disabledCount = sellers.length - enabledCount;
  const totalProducts = sellers.reduce((sum, s) => sum + s.productsCount, 0);

  const toggleSeller = (id, e) => {
    if (e) e.stopPropagation();
    setSellers(sellers.map(s =>
      s.id === id
        ? { ...s, status: s.status === 'Enabled' ? 'Disabled' : 'Enabled' }
        : s
    ));
    if (selectedSeller && selectedSeller.id === id) {
      setSelectedSeller(prev => prev ? { ...prev, status: prev.status === 'Enabled' ? 'Disabled' : 'Enabled' } : null);
    }
  };

  const filteredSellers = sellers.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Sellers', value: sellers.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Enabled Stores', value: enabledCount, icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Disabled Stores', value: disabledCount, icon: Power, color: 'text-rose-600 bg-rose-50' },
    { label: 'Listed Products', value: totalProducts, icon: Store, color: 'text-violet-600 bg-violet-50' }
  ];

  return (
    <SuperAdminLayout title="Individual Sellers" subtitle="Approve, view and control individual seller stores on the platform">
      <div className="space-y-6 font-sans">

        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              Individual Seller Stores Catalog
            </h2>
            <p className="text-xs text-slate-500 font-medium">Control merchant accessibility, view products & seller details</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sellers or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-primary"
            >
              <option value="All">All Status</option>
              <option value="Enabled">Enabled Only</option>
              <option value="Disabled">Disabled Only</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Seller Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Store &amp; Owner</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Location</th>
                  <th className="py-3.5 px-5">Revenue</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredSellers.map((s) => {
                  const isEnabled = s.status === 'Enabled';
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedSeller(s)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                              {s.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium">Owner: {s.owner}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center text-xs font-semibold text-slate-800 whitespace-nowrap">
                          {s.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[160px]">{s.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-black text-emerald-600">
                        {s.revenue}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isEnabled
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isEnabled ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedSeller(s)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-primary" />
                            Details
                          </button>

                          <button
                            onClick={(e) => toggleSeller(s.id, e)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isEnabled
                                ? 'border border-rose-200 text-rose-600 hover:bg-rose-50'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            {isEnabled ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 flex items-start gap-3">
          <UserCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900 font-semibold leading-relaxed">
            Individual seller stores run independently on E-SHOP. Disabling a seller hides their store and products from customer search results immediately while preserving catalog data.
          </p>
        </div>

        {/* Seller Detail Popup Modal */}
        {selectedSeller && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 transform transition-all animate-[fadeIn_0.2s_ease-out]">
              
              {/* Modal Cover Header */}
              <div className="h-28 w-full relative bg-slate-800">
                <img
                  src={selectedSeller.cover}
                  alt={selectedSeller.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedSeller.avatar}
                      alt={selectedSeller.owner}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg bg-white shrink-0"
                    />
                    <div className="text-white">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold leading-tight">{selectedSeller.name}</h2>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          selectedSeller.status === 'Enabled' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {selectedSeller.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-200 font-medium mt-0.5">Category: {selectedSeller.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-5 space-y-4">

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sales</span>
                    <span className="font-black text-emerald-600 text-sm block mt-0.5">{selectedSeller.revenue}</span>
                  </div>
                  <div className="border-x border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Products</span>
                    <span className="font-bold text-slate-900 text-sm block mt-0.5">{selectedSeller.productsCount} Items</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Joined</span>
                    <span className="font-semibold text-slate-700 text-xs block mt-1">{selectedSeller.joinedDate}</span>
                  </div>
                </div>

                {/* Contact & Address Card */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Owner</span>
                      <span className="font-bold text-slate-900 text-xs block mt-0.5">{selectedSeller.owner}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone</span>
                      <span className="font-semibold text-slate-700 text-xs block mt-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-primary shrink-0" />
                        {selectedSeller.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                      <span className="font-semibold text-slate-700 text-xs block mt-0.5 truncate flex items-center gap-1">
                        <Mail className="w-3 h-3 text-primary shrink-0" />
                        {selectedSeller.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Store Address
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {selectedSeller.fullAddress || selectedSeller.location}
                    </p>
                  </div>
                </div>

                {/* Categories Breakdown */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-primary" />
                      Categories &amp; Stock
                    </h4>
                    <Link
                      to={`/shop/${selectedSeller.id}`}
                      onClick={() => setSelectedSeller(null)}
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Live Storefront
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedSeller.categoryBreakdown && selectedSeller.categoryBreakdown.map((cat, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center gap-2.5">
                        <span className="text-lg shrink-0">{cat.icon}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-[11px] truncate">{cat.name}</p>
                          <p className="text-[10px] text-blue-600 font-bold">{cat.count} Products</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Merchant
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSeller(null)}
                    className="px-3.5 py-1.5 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs hover:bg-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleSeller(selectedSeller.id, e)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedSeller.status === 'Enabled'
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    {selectedSeller.status === 'Enabled' ? 'Disable Store' : 'Enable Store'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}