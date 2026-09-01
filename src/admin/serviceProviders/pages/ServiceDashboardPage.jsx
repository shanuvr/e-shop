import React from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import { Wrench, CalendarCheck, DollarSign, Clock, MapPin, CheckCircle2, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceDashboardPage() {
  return (
    <ServiceAdminLayout title="Service Provider Overview" subtitle="Track local customer home bookings, active appointments, and weekly revenue">
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/20">
                ● Active Service Provider
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Serving Thrissur & 15km Radius</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Thrissur AC & Electrical Care</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Visiting Rate: <span className="text-blue-400 font-bold">₹499/visit</span> • Avg Response Time: <span className="text-emerald-400 font-bold">15 Mins</span>
            </p>
          </div>
          
          <Link
            to="/admin/service-manage"
            className="relative z-10 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Wrench className="w-4 h-4" />
            Edit Offered Services & Rates
          </Link>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Earnings', value: '₹14,200', sub: '24 Completed Jobs', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Pending Bookings', value: '2 Requests', sub: 'Action Required', icon: CalendarCheck, color: 'text-amber-600 bg-amber-50' },
            { label: 'Confirmed Today', value: '3 Jobs', sub: 'Scheduled visits', icon: Clock, color: 'text-blue-600 bg-blue-50' },
            { label: 'Rating & Reviews', value: '4.9 ★', sub: 'Based on 48 reviews', icon: CheckCircle2, color: 'text-indigo-600 bg-indigo-50' }
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{card.label}</span>
                  <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center shrink-0`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{card.value}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5">{card.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Incoming Customer Bookings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Incoming Customer Booking Requests</h3>
              <p className="text-xs text-slate-500 font-medium">Review customer address and accept visit times</p>
            </div>
            <Link to="/admin/service-bookings" className="text-xs font-bold text-blue-600 hover:underline">
              View All Bookings &rarr;
            </Link>
          </div>

          {[
            { id: 'SRV-8821', service: 'Split AC Deep Jet Service', customer: 'Anand Kumar (+91 98470 12345)', address: 'West Fort, Thrissur', time: 'Today, 03:30 PM', price: '₹799' },
            { id: 'SRV-8820', service: 'Electrical Distribution Box Repair', customer: 'Saritha Nair (+91 98471 99882)', address: 'Mg Road, Thrissur', time: 'Tomorrow, 10:00 AM', price: '₹499' }
          ].map((b) => (
            <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{b.id}</span>
                  <span className="text-xs font-bold text-slate-900">{b.service}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">{b.price}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {b.customer}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.address}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {b.time}</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Confirmed booking ${b.id} for ${b.customer}`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer self-start sm:self-auto"
              >
                Accept & Confirm Visit
              </button>
            </div>
          ))}
        </div>

      </div>
    </ServiceAdminLayout>
  );
}
