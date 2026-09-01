import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import {
  DollarSign,
  Store,
  Zap,
  Users,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  CalendarClock,
  Clock,
  Clock3,
  BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const fmt = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const COLORS = {
  blue: '#1a73e8',
  emerald: '#10b981',
  amber: '#f59e0b',
  slate: '#64748b',
  violet: '#7c3aed'
};

function GMVTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const revenue = payload.find((p) => p.dataKey === 'revenue');
  const orders = payload.find((p) => p.dataKey === 'orders');
  return (
    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl text-xs border border-slate-800 space-y-1">
      <p className="font-bold text-slate-300">{label}</p>
      {revenue && <p className="text-blue-400 font-extrabold">GMV: {fmt(revenue.value)}</p>}
      {orders && <p className="text-emerald-400 font-semibold">{orders.value} order{orders.value === 1 ? '' : 's'}</p>}
    </div>
  );
}

export default function SuperAdminDashboard() {
  const [range, setRange] = useState('7d');

  const RANGES = {
    '7d': [
      { label: 'Mon', revenue: 482000, orders: 210 },
      { label: 'Tue', revenue: 516000, orders: 228 },
      { label: 'Wed', revenue: 557000, orders: 246 },
      { label: 'Thu', revenue: 601000, orders: 265 },
      { label: 'Fri', revenue: 698000, orders: 302 },
      { label: 'Sat', revenue: 734000, orders: 318 },
      { label: 'Sun', revenue: 502000, orders: 214 }
    ],
    '30d': [
      { label: 'Week 1', revenue: 3180000, orders: 1410 },
      { label: 'Week 2', revenue: 3420000, orders: 1528 },
      { label: 'Week 3', revenue: 3330000, orders: 1472 },
      { label: 'Week 4', revenue: 3680000, orders: 1624 }
    ],
    '90d': [
      { label: 'Jun', revenue: 12940000, orders: 5740 },
      { label: 'Jul', revenue: 13760000, orders: 6112 },
      { label: 'Aug', revenue: 14420000, orders: 6398 }
    ]
  };
  const trendData = RANGES[range];
  const periodTotal = trendData.reduce((s, d) => s + d.revenue, 0);

  const payouts = [
    { week: 'W1', payout: 156000 },
    { week: 'W2', payout: 172000 },
    { week: 'W3', payout: 168000 },
    { week: 'W4', payout: 189000 },
    { week: 'W5', payout: 184000 },
    { week: 'W6', payout: 196000 }
  ];
  const totalPayouts = payouts.reduce((s, d) => s + d.payout, 0);

  const sellerMix = [
    { name: 'Managed Sales Sellers', value: 14, color: COLORS.blue },
    { name: 'Individual Sellers', value: 22, color: COLORS.emerald },
    { name: 'Service Providers', value: 18, color: COLORS.amber },
    { name: 'Marketplace Stores', value: 74, color: COLORS.slate }
  ];
  const totalSellers = sellerMix.reduce((s, d) => s + d.value, 0);

  const categoryData = [
    { name: 'Electronics', value: 168000, color: COLORS.blue },
    { name: 'Home & Kitchen', value: 124000, color: COLORS.emerald },
    { name: 'Fashion', value: 98000, color: COLORS.violet },
    { name: 'Beauty & Health', value: 72000, color: COLORS.amber },
    { name: 'Others', value: 48000, color: COLORS.slate }
  ];

  const requests = [
    { store: 'Silk Land Textiles', category: 'Apparel & Fashion', area: 'Round West, Thrissur', stage: 'Awaiting assignment' },
    { store: 'Heritage Spices & Crafts', category: 'Food & Handicrafts', area: 'East Fort, Thrissur', stage: 'Awaiting assignment' }
  ];

  const stats = [
    { title: 'Platform GMV', value: fmt(periodTotal), chip: '+12.4%', tone: 'pos', sub: 'Selected period total', icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
    { title: 'Managed Sales Requests', value: '14 Merchants', chip: '2 New', tone: 'warn', sub: 'Awaiting assignment', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { title: 'Active Sellers', value: `${totalSellers} Stores`, chip: '+7 this month', tone: 'pos', sub: 'Verified across platform', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Live Marketplace Items', value: '7,842', chip: '808 categories', tone: 'neutral', sub: 'Across 8 categories', icon: Store, color: 'text-slate-600 bg-slate-100' }
  ];

  const chipCls = {
    pos: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    warn: 'text-amber-700 bg-amber-50 border-amber-200/60',
    neutral: 'text-slate-600 bg-slate-100 border-slate-200'
  };

  return (
    <SuperAdminLayout title="Platform Operations & GMV" subtitle="E-SHOP HQ System Operations Dashboard">
      <div className="space-y-6">

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 truncate">{item.title}</span>
                  <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">{item.value}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${chipCls[item.tone]}`}>
                    {item.chip}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">{item.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Analytics header + range control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Platform Revenue Analytics
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Total GMV and order volume across all sellers for the selected period</p>
          </div>
          <div className="flex items-center gap-1.5">
            {['7d', '30d', '90d'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  range === r ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Charts row 1: GMV trend + seller type mix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Platform GMV &amp; Order Trend</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {range === '7d' ? 'Daily GMV over the last 7 days' : range === '30d' ? 'Weekly GMV over the last 4 weeks' : 'Monthly GMV over the last quarter'}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                  <span className="text-slate-700">GMV</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-slate-700">Orders</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 100000}L`} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<GMVTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke={COLORS.blue} strokeWidth={2.5} fillOpacity={1} fill="url(#colorGmv)" />
                  <Area yAxisId="right" type="monotone" dataKey="orders" stroke={COLORS.emerald} strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Seller Type Mix</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">Registered sellers by selling model</p>

              <div className="h-[200px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sellerMix}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {sellerMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => [val, 'Sellers']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-medium">Total</span>
                  <span className="text-base font-black text-slate-900">{totalSellers} Sellers</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-slate-100">
              {sellerMix.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <p className="text-[11px] font-bold text-slate-800 truncate flex-1">{cat.name}</p>
                  <p className="text-[11px] font-bold text-slate-500">{cat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2: weekly payouts + category mix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Managed Payouts Disbursed</h3>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {fmt(totalPayouts)} · 6 wks
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">Gross amounts paid out to managed sellers weekly</p>

              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payouts} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 100000}L`} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(val) => [fmt(val), 'Payout']} />
                    <Bar dataKey="payout" name="Payout" fill={COLORS.blue} radius={[4, 4, 0, 0]} maxBarSize={34} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-500" />
                <span className="font-semibold text-slate-700">Gross payout</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                Disbursed on Fridays
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Category Sales Mix</h3>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  This month &middot; {fmt(categoryData.reduce((s, c) => s + c.value, 0))}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">Platform GMV by category for the current month</p>

              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => [fmt(val), 'GMV']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-slate-100">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <p className="text-[11px] font-bold text-slate-800 truncate flex-1">{cat.name}</p>
                  <p className="text-[11px] font-bold text-slate-500">{fmt(cat.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Managed requests queue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Managed Sales Requests Queue</h3>
              <p className="text-xs text-slate-500 font-medium">Merchants who submitted requests for full-service cataloging &amp; marketing</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-100 shrink-0">
              2 Action Needed
            </span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.store} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 truncate">{req.store}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                      {req.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">{req.area}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1.5">
                    <Clock3 className="w-3.5 h-3.5" />
                    {req.stage}
                  </span>
                  <Link
                    to="/super-admin/managed-requests"
                    className="px-3.5 py-2 bg-primary hover:bg-blue-700 text-white font-bold text-[11px] rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Assign
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
              Super Admin: E-SHOP Operations Team
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <Link to="/super-admin/managed-requests" className="flex items-center gap-1 font-bold text-primary hover:underline">
              Open Full Queue
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </SuperAdminLayout>
  );
}