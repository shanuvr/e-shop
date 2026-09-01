import { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import {
  Search,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Box,
  MapPin,
  ShoppingBag,
  TrendingUp,
  ChevronDown,
  CreditCard
} from 'lucide-react';

const STATUS_CONFIG = {
  'Pending': { color: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500', step: 0 },
  'Confirmed': { color: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-500', step: 1 },
  'Packed': { color: 'bg-violet-50 text-violet-600 border-violet-200', dot: 'bg-violet-500', step: 2 },
  'Shipped': { color: 'bg-cyan-50 text-cyan-600 border-cyan-200', dot: 'bg-cyan-500', step: 3 },
  'Out for Delivery': { color: 'bg-indigo-50 text-indigo-600 border-indigo-200', dot: 'bg-indigo-500', step: 4 },
  'Delivered': { color: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', step: 5 },
  'Delayed': { color: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500', step: -1 },
  'Cancelled': { color: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400', step: -1 }
};

const STATUSES = Object.keys(STATUS_CONFIG);
const TIMELINE_STEPS = ['Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD-9821', customer: 'Ananya Sharma', items: [{ name: 'Acoustic Pro Headphones', qty: 1, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=100&h=100' }], total: 24999, status: 'Pending', date: 'Today, 09:30 AM', payment: 'UPI', address: 'Swaraj Round, Thrissur' },
    { id: 'ORD-9819', customer: 'Karthik Menon', items: [{ name: 'Elite Smartwatch Series', qty: 1, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=100&h=100' }], total: 36999, status: 'Shipped', date: 'Yesterday', payment: 'Card', address: 'MG Road, Kochi' },
    { id: 'ORD-9815', customer: 'Rahul Varma', items: [{ name: 'Deep Home Cleaning Service', qty: 1, img: null }], total: 499, status: 'Delivered', date: '28 Aug 2026', payment: 'COD', address: 'Guruvayur, Thrissur' },
    { id: 'ORD-9807', customer: 'Meera Nair', items: [{ name: 'Ultra Slim 4K Smart OLED TV', qty: 1, img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=100&h=100' }], total: 54990, status: 'Delayed', date: '27 Aug 2026', payment: 'UPI', address: 'Palakkad' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const inTransit = orders.filter(o => ['Confirmed', 'Packed', 'Shipped', 'Out for Delivery'].includes(o.status)).length;
  const pending = orders.filter(o => o.status === 'Pending').length;

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending', value: pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'In Transit', value: inTransit, icon: Truck, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Delivered', value: delivered, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-violet-600 bg-violet-50' }
  ];

  const formatMoney = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <SellerAdminLayout title="Orders & Fulfillment" subtitle="Track and manage customer orders">
      <div className="space-y-6">

        {/* Controls header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Order Fulfillment
              </h2>
              <p className="text-xs text-slate-500 font-medium">{orders.length} orders · {inTransit + pending} awaiting delivery</p>
            </div>
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Status filter chips */}
          <div className="flex flex-wrap gap-2">
            {['All', ...STATUSES].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-black text-slate-900 leading-none truncate">{s.value}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm py-16 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Package className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-700">No orders found</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((ord, oi) => {
              const cfg = STATUS_CONFIG[ord.status];
              const isTerminal = ord.status === 'Delivered' || ord.status === 'Cancelled';
              const isDelayed = ord.status === 'Delayed';
              return (
                <div key={ord.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  {/* Order header */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl ${AVATAR_COLORS[oi % AVATAR_COLORS.length]} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                        {ord.customer.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-slate-900">{ord.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.color}`}>
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mt-0.5">{ord.customer}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{ord.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900">{formatMoney(ord.total)}</p>
                        <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 justify-end">
                          <CreditCard className="w-3 h-3" /> {ord.payment}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body: items + status update */}
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Items */}
                    <div className="space-y-2.5">
                      {ord.items.map((it, ii) => (
                        <div key={ii} className="flex items-center gap-3">
                          {it.img ? (
                            <img src={it.img} alt={it.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <Box className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-800 truncate">{it.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Qty ×{it.qty}</p>
                          </div>
                          <span className="text-xs font-bold text-slate-700">{formatMoney(it.qty * (it.price || ord.total))}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {ord.address}
                      </div>
                    </div>

                    {/* Status update + progress */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Update Order Status
                        </label>
                        <div className="relative">
                          <select
                            value={ord.status}
                            onChange={(e) => updateStatus(ord.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors appearance-none cursor-pointer"
                          >
                            {STATUSES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Timeline / progress */}
                      {isDelayed ? (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs font-bold text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          Order is delayed — please review the delivery timeline.
                        </div>
                      ) : isTerminal ? (
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs font-bold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          {ord.status === 'Delivered' ? 'Order delivered successfully.' : 'Order cancelled.'}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Fulfillment progress</span>
                            <span className="text-[10px] font-bold text-slate-700">{cfg.step}/{TIMELINE_STEPS.length}</span>
                          </div>
                          <div className="flex items-center">
                            {TIMELINE_STEPS.map((step, si) => {
                              const reached = cfg.step >= si + 1;
                              return (
                                <div key={step} className="flex items-center flex-1 last:flex-none">
                                  <div className={`w-3 h-3 rounded-full ${reached ? 'bg-primary' : 'bg-slate-200'} ring-2 ring-white transition-colors`} />
                                  {si < TIMELINE_STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 ${cfg.step > si + 1 ? 'bg-primary' : 'bg-slate-200'}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-1.5">
                            {TIMELINE_STEPS.map((step, si) => (
                              <span key={step} className={`text-[8px] font-bold ${cfg.step >= si + 1 ? 'text-primary' : 'text-slate-400'} w-10 text-center`}>
                                {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SellerAdminLayout>
  );
}
