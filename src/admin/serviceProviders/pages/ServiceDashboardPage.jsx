import { useState } from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import {
  Wrench,
  CalendarCheck,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  ArrowRight,
  MapPin,
  User
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
  slate: '#64748b'
};

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const earnings = payload.find((p) => p.dataKey === 'earnings');
  const completed = payload.find((p) => p.dataKey === 'completed');
  return (
    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl text-xs border border-slate-800 space-y-1">
      <p className="font-bold text-slate-300">{label}</p>
      {earnings && (
        <p className="text-emerald-400 font-extrabold">Earnings: {fmt(earnings.value)}</p>
      )}
      {completed && (
        <p className="text-blue-300 font-semibold">{completed.value} completed visit{completed.value === 1 ? '' : 's'}</p>
      )}
    </div>
  );
}

export default function ServiceDashboardPage() {
  const [range, setRange] = useState('7d');

  // Earnings + completed visits data, switched by the selected range.
  const RANGES = {
    '7d': [
      { label: 'Mon', earnings: 1850, completed: 3 },
      { label: 'Tue', earnings: 2100, completed: 3 },
      { label: 'Wed', earnings: 1750, completed: 3 },
      { label: 'Thu', earnings: 2900, completed: 5 },
      { label: 'Fri', earnings: 2600, completed: 4 },
      { label: 'Sat', earnings: 2100, completed: 4 },
      { label: 'Sun', earnings: 900, completed: 2 }
    ],
    '30d': [
      { label: 'Week 1', earnings: 3100, completed: 6 },
      { label: 'Week 2', earnings: 4300, completed: 8 },
      { label: 'Week 3', earnings: 3600, completed: 5 },
      { label: 'Week 4', earnings: 3200, completed: 5 }
    ],
    '90d': [
      { label: 'Jun', earnings: 38500, completed: 68 },
      { label: 'Jul', earnings: 41600, completed: 74 },
      { label: 'Aug', earnings: 45200, completed: 82 }
    ]
  };
  const earningsData = RANGES[range];

  const weekEarnings = earningsData.reduce((s, d) => s + d.earnings, 0);
  const weekVisits = earningsData.reduce((s, d) => s + d.completed, 0);

  // Revenue split by service type (this week).
  const serviceData = [
    { name: 'Split AC Jet Service', value: 5400, color: COLORS.blue },
    { name: 'Electrical Repair', value: 4300, color: COLORS.emerald },
    { name: 'Wiring Inspection', value: 2900, color: COLORS.amber },
    { name: 'Water Heater Service', value: 1600, color: COLORS.slate }
  ];

  // Completed vs pending visits (Mon-Sun).
  const weeklyBookings = [
    { day: 'Mon', completed: 3, pending: 0 },
    { day: 'Tue', completed: 3, pending: 1 },
    { day: 'Wed', completed: 3, pending: 0 },
    { day: 'Thu', completed: 5, pending: 1 },
    { day: 'Fri', completed: 4, pending: 0 },
    { day: 'Sat', completed: 4, pending: 0 },
    { day: 'Sun', completed: 2, pending: 0 }
  ];

  const upcomingVisits = [
    { id: 'SRV-8821', service: 'Split AC Deep Jet Service', customer: 'Anand Kumar', phone: '+91 98470 12345', address: 'West Fort, Thrissur', time: 'Today, 03:30 PM', price: '₹799', status: 'Confirmed' },
    { id: 'SRV-8820', service: 'Electrical Distribution Box Repair', customer: 'Saritha Nair', phone: '+91 98471 99882', address: 'MG Road, Thrissur', time: 'Tomorrow, 10:00 AM', price: '₹499', status: 'Pending Confirmation' },
    { id: 'SRV-8815', service: 'Full House Wiring Inspection', customer: 'Vipin Das', phone: '+91 98472 88991', address: 'Ramavarmapuram, Thrissur', time: '02 Sept, 11:00 AM', price: '₹1,200', status: 'Pending Confirmation' }
  ];

  const stats = [
    { title: 'This Week Earnings', value: fmt(14000), change: '+18%', positive: true, sub: '24 completed visits', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Completed Visits', value: '24', change: '+6', positive: true, sub: 'vs last week', icon: CalendarCheck, color: 'text-blue-600 bg-blue-50' },
    { title: 'Pending Bookings', value: '2', change: 'Action req', positive: false, sub: 'Awaiting confirmation', icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { title: 'Avg. Rating', value: '4.9 ★', change: '48 reviews', positive: true, sub: 'Top-rated provider', icon: Star, color: 'text-slate-700 bg-slate-100' }
  ];

  return (
    <ServiceAdminLayout title="Service Overview" subtitle="Performance, earnings & visit analytics for home services">
      <div className="space-y-6">

        {/* Provider banner */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-md px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/20">
                  ● Active Provider
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Serving Thrissur + 15 km</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Thrissur AC &amp; Electrical Care</h1>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Visiting Rate <span className="text-blue-300 font-bold">₹499/visit</span> · Avg response <span className="text-emerald-400 font-bold">15 mins</span> · 8% per-service commission
              </p>
            </div>
          </div>
          <Link
            to="/admin/service-manage"
            className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
          >
            <Wrench className="w-4 h-4" />
            Edit Services &amp; Rates
          </Link>
        </div>

        {/* Analytics header + range control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Service Analytics Summary
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Earnings and completed visits over the selected period</p>
          </div>
          <div className="flex items-center gap-1.5">
            {['7d', '30d', '90d'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  range === r
                    ? 'bg-primary text-white shadow-xs'
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
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.positive ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' : 'text-amber-700 bg-amber-50 border border-amber-200/60'
                  }`}>
                    {item.change}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">{item.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Charts row 1: earnings trend + service mix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Earnings &amp; Visits Trend</h3>
                <p className="text-xs text-slate-500 font-medium">{range === '7d' ? 'Daily earnings over the last 7 days' : range === '30d' ? 'Weekly earnings over the last 4 weeks' : 'Monthly earnings over the last quarter'}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                  <span className="text-slate-700">Earnings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700">Visits</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="earnings" stroke={COLORS.blue} strokeWidth={2.5} fillOpacity={1} fill="url(#colorEarnings)" />
                  <Area yAxisId="right" type="monotone" dataKey="completed" stroke={COLORS.emerald} strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Service Revenue Mix</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">This week&apos;s earnings by service type</p>

              <div className="h-[200px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => [fmt(val), 'Earnings']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-medium">Week Total</span>
                  <span className="text-base font-black text-slate-900">{fmt(weekEarnings)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-slate-100">
              {serviceData.map((svc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: svc.color }} />
                  <p className="text-[11px] font-bold text-slate-800 truncate flex-1">{svc.name}</p>
                  <p className="text-[11px] font-bold text-slate-500">{fmt(svc.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2: weekly bookings + upcoming visits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Weekly Visit Load</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {weekVisits} Completed
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">Completed vs pending home visits (Mon-Sun)</p>

              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyBookings} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="completed" name="Completed" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" name="Pending" fill={COLORS.amber} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="font-semibold text-slate-700">Completed (24)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="font-semibold text-slate-700">Pending (2)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Upcoming Home Visits</h3>
                <p className="text-xs text-slate-500 font-medium">Confirmed and pending customer appointments</p>
              </div>
              <Link to="/admin/service-bookings" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View All Bookings
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingVisits.map((b) => (
                <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">{b.id}</span>
                      <span className="text-xs font-bold text-slate-900 truncate">{b.service}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{b.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium mt-1">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {b.customer}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.address}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {b.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                    <span className="text-sm font-black text-slate-900">{b.price}</span>
                    {b.status === 'Pending Confirmation' && (
                      <button
                        onClick={() => alert(`Accepted booking ${b.id} for ${b.customer}`)}
                        className="px-3.5 py-2 bg-primary hover:bg-blue-700 text-white font-bold text-[11px] rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        Accept &amp; Confirm
                      </button>
                    )}
                    {b.status === 'Confirmed' && (
                      <span className="px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-[11px] font-bold">
                        Scheduled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ServiceAdminLayout>
  );
}