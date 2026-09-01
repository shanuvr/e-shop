import { useState } from 'react';
import ManagedAdminLayout from '../layout/ManagedAdminLayout';
import {
  Truck,
  PackageCheck,
  MapPin,
  Clock,
  PackageSearch,
  CheckCircle2,
  Banknote,
  Route
} from 'lucide-react';

const sampleOrders = [
  { id: 'M-ORD-8822', item: 'Kanchipuram Pure Silk Saree (Red & Gold)', qty: '1 unit', customer: 'Meera Nambiar', city: 'Ernakulam', amount: '₹8,900', paid: 'UPI · Paid', stage: 'ready', courier: 'Blue Dart Express' },
  { id: 'M-ORD-8821', item: 'Handloom Cotton Kurta (Size L)', qty: '2 units', customer: 'Devika P', city: 'Thrissur East', amount: '₹4,200', paid: 'Card · Paid', stage: 'ready', courier: 'Delhivery' },
  { id: 'M-ORD-8820', item: 'Traditional Kasavu Dhoti Pack', qty: '3 pcs', customer: 'Rajesh Menon', city: 'Kochi', amount: '₹6,300', paid: 'UPI · Paid', stage: 'ready', courier: 'Ecom Express' },
  { id: 'M-ORD-8817', item: 'Kanchipuram Silk Saree (Peacock)', qty: '1 unit', customer: 'Anitha V', city: 'Palakkad', amount: '₹8,900', paid: 'UPI · Paid', stage: 'shipped', courier: 'Blue Dart Express' },
  { id: 'M-ORD-8816', item: 'Handloom Cotton Kurta (Size M)', qty: '1 unit', customer: 'Sajith K', city: 'Thrissur', amount: '₹2,100', paid: 'COD Accepted', stage: 'delivered', courier: 'Delhivery' },
  { id: 'M-ORD-8813', item: 'Silk Pattu Blouse Piece', qty: '2 pcs', customer: 'Lakshmi N', city: 'Trivandrum', amount: '₹3,400', paid: 'UPI · Paid', stage: 'delivered', courier: 'Ecom Express' }
];

const STAGE_META = {
  ready: { label: 'To Pick Up', pill: 'bg-blue-50 text-blue-700 border-blue-200' },
  shipped: { label: 'Dispatched', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
  delivered: { label: 'Delivered', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
};

export default function OrdersToPackPage() {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState(sampleOrders);

  const counts = {
    all: orders.length,
    ready: orders.filter((o) => o.stage === 'ready').length,
    shipped: orders.filter((o) => o.stage === 'shipped').length,
    delivered: orders.filter((o) => o.stage === 'delivered').length
  };

  const visible = filter === 'all' ? orders : orders.filter((o) => o.stage === filter);

  const move = (id, next) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, stage: next } : o)));
    alert(`${id} ${next === 'shipped' ? 'picked up & handed to courier' : 'marked as delivered'}`);
  };

  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'ready', label: 'To Pick Up' },
    { key: 'shipped', label: 'Dispatched' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const statCards = [
    { title: 'To Pick Up', value: String(counts.ready), sub: 'Ready at merchant store', icon: Truck, color: 'text-blue-600 bg-blue-50' },
    { title: 'Dispatched', value: String(counts.shipped), sub: 'In courier transit', icon: PackageSearch, color: 'text-amber-600 bg-amber-50' },
    { title: 'Delivered', value: String(counts.delivered), sub: 'This week', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Avg. Delivery', value: '2.1 days', sub: 'Across all couriers', icon: Clock, color: 'text-slate-700 bg-slate-100' }
  ];

  return (
    <ManagedAdminLayout title="Orders to Pack" subtitle="E-SHOP dispatch operations · pickup, shipping & delivery tracking">
      <div className="space-y-6">

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5 border border-emerald-900/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                ● Today&apos;s Pickup Window: 04:00 PM
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Dispatch Center</h1>
            <p className="text-xs text-slate-300 font-medium mt-1">
              We pick up packed orders from <span className="text-emerald-400 font-bold">Silk Land Textiles</span>, pack &amp; hand every parcel to the courier
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white">Pickup Route Today</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">3 stops · Thrissur → Kochi</p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 truncate">{item.title}</span>
                  <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">{item.value}</span>
                <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">{item.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Filter chips */}
        <div className="flex items-center flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                filter === f.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label} <span className={filter === f.key ? 'text-emerald-400' : 'text-slate-400'}>({counts[f.key]})</span>
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-3">
          {visible.length === 0 && (
            <p className="text-xs text-slate-400 font-medium py-6 text-center">No orders in this stage.</p>
          )}
          {visible.map((o) => {
            const meta = STAGE_META[o.stage];
            return (
              <div key={o.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-400">{o.id}</span>
                    <span className="text-xs font-bold text-slate-900 truncate">{o.item}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 flex-shrink-0">
                      {o.qty}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {o.customer} · {o.city}</span>
                    <span className="flex items-center gap-1"><Banknote className="w-3 h-3 text-slate-400" /> {o.paid}</span>
                    <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-slate-400" /> {o.courier}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                  <span className="text-sm font-black text-slate-900">{o.amount}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${meta.pill}`}>{meta.label}</span>
                  {o.stage === 'ready' && (
                    <button
                      onClick={() => move(o.id, 'shipped')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      Confirm Pickup &amp; Ship
                    </button>
                  )}
                  {o.stage === 'shipped' && (
                    <button
                      onClick={() => move(o.id, 'delivered')}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Today's route strip */}
        <div className="bg-blue-50 border border-blue-200/70 rounded-2xl p-5">
          <p className="text-xs font-bold text-blue-900 flex items-center gap-2 mb-3">
            <Route className="w-4 h-4 text-blue-600" />
            Today&apos;s Pickup Route — {counts.ready} stops
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { stop: 'Silk Land Textiles', time: '04:00 PM', note: 'Pickup 3 packed orders' },
              { stop: 'E-SHOP Central Hub', time: '05:15 PM', note: 'Packing & labels done' },
              { stop: 'Courier Bays', time: '06:00 PM', note: 'Blue Dart · Delhivery · Ecom' }
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white rounded-xl border border-blue-100 p-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900">{s.stop}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{s.time} · {s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ManagedAdminLayout>
  );
}