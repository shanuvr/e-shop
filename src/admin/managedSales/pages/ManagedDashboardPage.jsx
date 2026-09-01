import { useState } from 'react';
import ManagedAdminLayout from '../layout/ManagedAdminLayout';
import {
  Zap,
  Camera,
  Truck,
  DollarSign,
  CalendarClock,
  TrendingUp,
  PackageCheck,
  ChevronRight,
  CheckCircle2,
  UserCheck,
  Image,
  Wrench
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
  emerald: '#10b981',
  blue: '#1a73e8',
  amber: '#f59e0b',
  slate: '#64748b'
};

function SalesTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const revenue = payload.find((p) => p.dataKey === 'revenue');
  const orders = payload.find((p) => p.dataKey === 'orders');
  return (
    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl text-xs border border-slate-800 space-y-1">
      <p className="font-bold text-slate-300">{label}</p>
      {revenue && <p className="text-emerald-400 font-extrabold">Sales: {fmt(revenue.value)}</p>}
      {orders && <p className="text-blue-300 font-semibold">{orders.value} order{orders.value === 1 ? '' : 's'}</p>}
    </div>
  );
}

export default function ManagedDashboardPage() {
  const [range, setRange] = useState('7d');

  // Sales + order count switched by the selected range.
  const RANGES = {
    '7d': [
      { label: 'Mon', revenue: 3800, orders: 8 },
      { label: 'Tue', revenue: 4100, orders: 9 },
      { label: 'Wed', revenue: 4750, orders: 11 },
      { label: 'Thu', revenue: 5200, orders: 12 },
      { label: 'Fri', revenue: 6100, orders: 14 },
      { label: 'Sat', revenue: 6300, orders: 15 },
      { label: 'Sun', revenue: 3950, orders: 9 }
    ],
    '30d': [
      { label: 'Week 1', revenue: 28800, orders: 64 },
      { label: 'Week 2', revenue: 31200, orders: 70 },
      { label: 'Week 3', revenue: 29500, orders: 66 },
      { label: 'Week 4', revenue: 34200, orders: 78 }
    ],
    '90d': [
      { label: 'Jun', revenue: 118400, orders: 255 },
      { label: 'Jul', revenue: 129600, orders: 284 },
      { label: 'Aug', revenue: 136800, orders: 310 }
    ]
  };
  const trendData = RANGES[range];

  const periodTotal = trendData.reduce((s, d) => s + d.revenue, 0);

  // Weekly payouts deposited every Friday (gross).
  const payouts = [
    { week: 'W1', payout: 28800 },
    { week: 'W2', payout: 31200 },
    { week: 'W3', payout: 29500 },
    { week: 'W4', payout: 34200 },
    { week: 'W5', payout: 33800 },
    { week: 'W6', payout: 34200 }
  ];
  const totalPayouts = payouts.reduce((s, d) => s + d.payout, 0);

  // Category mix for this week (totals ₹34,200).
  const categoryData = [
    { name: 'Kanchipuram Silk Sarees', value: 16800, color: COLORS.emerald },
    { name: 'Handloom Kurtas', value: 9300, color: COLORS.blue },
    { name: 'Kasavu Dhotis', value: 5200, color: COLORS.amber },
    { name: 'Accessories & Others', value: 2900, color: COLORS.slate }
  ];

  const dispatchQueue = [
    { orderId: 'M-ORD-8822', item: 'Kanchipuram Pure Silk Saree (Red & Gold)', qty: '1 unit', customer: 'Meera Nambiar · Ernakulam' },
    { orderId: 'M-ORD-8821', item: 'Handloom Cotton Kurta (Size L)', qty: '2 units', customer: 'Devika P · Thrissur East' }
  ];

  const catalogSteps = [
    { label: 'Photo Queue', count: 5, helper: 'Uploaded & waiting', icon: Camera, tone: 'threshold' },
    { label: 'Editing & Backgrounds', count: 3, helper: 'Designer Sarees Batch #4', icon: Image, tone: 'warn' },
    { label: 'Final Review & Pricing', count: 2, helper: 'Pending approval', icon: Wrench, tone: 'warn' },
    { label: 'Live on Marketplace', count: 14, helper: 'Live & E-SHOP promoted', icon: CheckCircle2, tone: 'ok' }
  ];

  const stats = [
    { title: 'Weekly Payout', value: '₹34,200', chip: '+12.4%', tone: 'pos', sub: 'Deposited every Friday', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Pending Dispatch', value: '3 Orders', chip: 'Pickup 4 PM', tone: 'warn', sub: 'Ready for courier pickup', icon: Truck, color: 'text-blue-600 bg-blue-50' },
    { title: 'Live Marketplace Items', value: '14', chip: '+3 new', tone: 'pos', sub: 'E-SHOP promoted & listed', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { title: 'Cataloging Progress', value: '5', chip: '5 in queue', tone: 'warn', sub: 'Photo editing & review', icon: Camera, color: 'text-slate-700 bg-slate-100' }
  ];

  const chipCls = {
    pos: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    warn: 'text-amber-700 bg-amber-50 border-amber-200/60',
    neutral: 'text-slate-600 bg-slate-100 border-slate-200'
  };

  return (
    <ManagedAdminLayout title="Managed Sales Overview" subtitle="Track cataloging, orders to dispatch, and weekly payouts">
      <div className="space-y-6">

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5 border border-emerald-900/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                ● Full-Service Managed Active
              </span>
              <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">E-SHOP handles ads, listings &amp; cataloging</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Silk Land Textiles</h1>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Assigned Account Manager: <span className="text-emerald-400 font-bold">Kavya Nair</span> · +91 98470 99887
            </p>
          </div>

          <button
            onClick={() => alert('Account Manager Kavya Nair has been notified to schedule your next photo shoot!')}
            className="relative z-10 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Camera className="w-4 h-4" />
            Request Product Photo Shoot
          </button>
        </div>

        {/* Analytics header + range control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Sales Performance Analytics
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Sales revenue and order volume over the selected period</p>
          </div>
          <div className="flex items-center gap-1.5">
            {['7d', '30d', '90d'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  range === r
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

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

        {/* Charts row 1: sales trend + category mix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Sales &amp; Order Trend</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {range === '7d' ? 'Daily sales over the last 7 days' : range === '30d' ? 'Weekly sales over the last 4 weeks' : 'Monthly sales over the last quarter'}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-slate-700">Sales</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                  <span className="text-slate-700">Orders</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<SalesTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke={COLORS.emerald} strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                  <Area yAxisId="right" type="monotone" dataKey="orders" stroke={COLORS.blue} strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Category Sales Mix</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">This week&apos;s sales by product category</p>

              <div className="h-[200px] w-full relative flex items-center justify-center">
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
                    <Tooltip formatter={(val) => [fmt(val), 'Sales']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-medium">Week Total</span>
                  <span className="text-base font-black text-slate-900">{fmt(periodTotal)}</span>
                </div>
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

        {/* Charts row 2: weekly payouts + dispatch queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Weekly Payouts</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {fmt(totalPayouts)} · 6 wks
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">Gross payouts deposited every Friday</p>

              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payouts} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(val) => [fmt(val), 'Payout']} />
                    <Bar dataKey="payout" name="Payout" fill={COLORS.emerald} radius={[4, 4, 0, 0]} maxBarSize={34} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="font-semibold text-slate-700">Gross payout</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                Next payout: Friday
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Orders Awaiting Your Packaging</h3>
                <p className="text-xs text-slate-500 font-medium">Pack &amp; label these — E-SHOP pickup arrives today at 04:00 PM</p>
              </div>
              <Link to="/admin/managed-orders" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 shrink-0">
                View All Orders
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {dispatchQueue.map((ord) => (
                <div key={ord.orderId} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-400">{ord.orderId}</span>
                      <span className="text-xs font-bold text-slate-900 truncate">{ord.item}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                        {ord.qty}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">{ord.customer}</p>
                  </div>
                  <button
                    onClick={() => alert(`Marked ${ord.orderId} as Packed and Ready for Pickup!`)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    Confirm Packed
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cataloging pipeline */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">E-SHOP Cataloging Pipeline</h3>
              <p className="text-xs text-slate-500 font-medium">Where your product listings stand inside the E-SHOP team</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {catalogSteps.map((step, i) => {
              const IconComponent = step.icon;
              return (
                <div key={i} className="relative p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                  {i < catalogSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 z-10 bg-white rounded-full" />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      step.tone === 'ok' ? 'bg-emerald-50 text-emerald-600' : step.tone === 'warn' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-lg font-black tracking-tight ${
                      step.tone === 'ok' ? 'text-emerald-600' : step.tone === 'warn' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {step.count}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-3">{step.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">{step.helper}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Account Manager: Kavya Nair
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
              Next photo shoot slot: Thursday, 10:00 AM
            </span>
          </div>
        </div>

      </div>
    </ManagedAdminLayout>
  );
}