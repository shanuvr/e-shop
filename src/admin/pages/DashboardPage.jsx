import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  ArrowRight, 
  ArrowUpRight,
  AlertCircle
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

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('6m'); // '7d' | '30d' | '6m' | '1y'

  // Monthly Revenue & Sales Growth Data
  const revenueData = [
    { month: 'Mar', revenue: 68000, orders: 82 },
    { month: 'Apr', revenue: 84000, orders: 98 },
    { month: 'May', revenue: 92000, orders: 110 },
    { month: 'Jun', revenue: 115000, orders: 135 },
    { month: 'Jul', revenue: 132000, orders: 158 },
    { month: 'Aug', revenue: 148920, orders: 184 },
  ];

  // Category Distribution Data (Donut Chart)
  const categoryData = [
    { name: 'Audio & Acoustics', value: 62500, color: '#1a73e8' },
    { name: 'Wearable Tech', value: 46100, color: '#10b981' },
    { name: 'Electronics', value: 26800, color: '#f59e0b' },
    { name: 'Fashion & Wear', value: 13520, color: '#8b5cf6' },
  ];

  // Weekly Fulfillment Data (Bar Chart)
  const weeklyFulfillment = [
    { day: 'Mon', completed: 24, pending: 3 },
    { day: 'Tue', completed: 30, pending: 2 },
    { day: 'Wed', completed: 28, pending: 5 },
    { day: 'Thu', completed: 36, pending: 4 },
    { day: 'Fri', completed: 42, pending: 6 },
    { day: 'Sat', completed: 48, pending: 8 },
    { day: 'Sun', completed: 38, pending: 4 },
  ];

  // Recent Orders List
  const recentOrders = [
    { id: '#ORD-9824', customer: 'Anand V.', product: 'Acoustic Pro Headphones', amount: '₹24,999', status: 'Delivered' },
    { id: '#ORD-9823', customer: 'Priya K.', product: 'Elite Smartwatch Series', amount: '₹36,999', status: 'Processing' },
    { id: '#ORD-9822', customer: 'Rahul M.', product: 'Ultra Slim 4K OLED TV', amount: '₹54,990', status: 'Pending' },
    { id: '#ORD-9821', customer: 'Sneha P.', product: 'Noise Cancelling Earbuds', amount: '₹8,499', status: 'Delivered' },
  ];

  // Custom Tooltip for Revenue Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-sans border border-slate-800 space-y-1">
          <p className="font-bold text-slate-300">{label} Performance</p>
          <p className="text-emerald-400 font-extrabold text-sm">
            Revenue: ₹{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className="text-blue-300 font-semibold">
              Orders: {payload[1].value} units
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <SellerAdminLayout title="Dashboard Overview" subtitle="Real-time store performance, revenue analytics & order fulfillment">
      <div className="space-y-6 font-sans">
        
        {/* Top Header & Range Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Store Analytics Summary
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Tracking performance metrics for Thrissur Marketplace Store</p>
          </div>

          <div className="flex items-center gap-1.5">
            {['7d', '30d', '6m', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Sleek Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: 'Total Gross Revenue',
              value: '₹1,48,920',
              change: '+22.4%',
              isPositive: true,
              subtext: 'vs ₹1.21L last mo.',
              icon: DollarSign
            },
            {
              title: 'Total Store Orders',
              value: '184',
              change: '+14.8%',
              isPositive: true,
              subtext: '14 pending dispatch',
              icon: ShoppingBag
            },
            {
              title: 'Active Catalog',
              value: '24 Items',
              change: '2 Low Stock',
              isPositive: false,
              subtext: '94% in-stock rate',
              icon: Package
            },
            {
              title: 'Avg. Order Value (AOV)',
              value: '₹809',
              change: '+5.2%',
              isPositive: true,
              subtext: 'High cart conversion',
              icon: TrendingUp
            }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 truncate">
                    {item.title}
                  </span>
                  <IconComponent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>

                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">
                    {item.value}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.isPositive 
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' 
                      : 'text-amber-700 bg-amber-50 border border-amber-200/60'
                  }`}>
                    {item.change}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1: Area Revenue Growth & Category Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Revenue Growth Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Revenue & Order Growth Trend</h3>
                <p className="text-xs text-slate-500 font-medium">Monthly performance trajectory over the last 6 months</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                  <span className="text-slate-700">Revenue (₹)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700">Orders</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#1a73e8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#1a73e8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Sales Donut Chart (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Category Revenue Share</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">Breakdown of earnings by catalog category</p>
              
              <div className="h-[200px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-medium">Total Share</span>
                  <span className="text-base font-black text-slate-900">₹1.48L</span>
                </div>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="truncate">
                    <p className="text-[11px] font-bold text-slate-800 truncate">{cat.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">₹{(cat.value/1000).toFixed(1)}k</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Charts Row 2: Weekly Fulfillment Bar Chart & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Weekly Fulfillment Bar Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Weekly Fulfillment</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  92% Success Rate
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">Completed vs Pending orders (Mon-Sun)</p>

              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyFulfillment} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip />
                    <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="font-semibold text-slate-700">Fulfilled (206)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="font-semibold text-slate-700">Pending (32)</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table Widget (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-500 font-medium">Latest transactions processed on E-SHOP</p>
                </div>
                <Link
                  to="/admin/orders"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  View All Orders
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Product</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {recentOrders.map((ord, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 font-bold text-slate-900">{ord.id}</td>
                        <td className="py-3 text-slate-800">{ord.customer}</td>
                        <td className="py-3 text-slate-600 max-w-[150px] truncate">{ord.product}</td>
                        <td className="py-3 font-extrabold text-slate-900">{ord.amount}</td>
                        <td className="py-3 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : ord.status === 'Processing'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Admin Actions Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link to="/admin/products" className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-[11px] font-bold text-slate-800 flex items-center justify-between transition-colors">
                <span>Products Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link to="/admin/categories" className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-[11px] font-bold text-slate-800 flex items-center justify-between transition-colors">
                <span>Categories</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link to="/admin/payment" className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-[11px] font-bold text-slate-800 flex items-center justify-between transition-colors">
                <span>Payments</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link to="/admin/settings" className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-[11px] font-bold text-slate-800 flex items-center justify-between transition-colors">
                <span>Store Settings</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </SellerAdminLayout>
  );
}
