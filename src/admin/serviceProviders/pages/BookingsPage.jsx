import { useState } from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import {
  Search,
  CalendarCheck,
  User,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  Wrench,
  TrendingUp
} from 'lucide-react';

const STATUS_CONFIG = {
  'Requested': { badge: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500', step: -1 },
  'Confirmed': { badge: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-500', step: 0 },
  'In Progress': { badge: 'bg-slate-100 text-slate-600 border-slate-300', dot: 'bg-slate-500', step: 1 },
  'Completed': { badge: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', step: 2 },
  'Cancelled': { badge: 'bg-red-50 text-red-500 border-red-200', dot: 'bg-red-400', step: -1 }
};

const STATUSES = Object.keys(STATUS_CONFIG);
const TIMELINE_STEPS = ['Confirmed', 'In Progress', 'Completed'];

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-slate-500', 'bg-blue-700'
];

const fmt = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BookingsPage() {
  const [bookings, setBookings] = useState([
    { id: 'SRV-8821', service: 'Split AC Deep Jet Service', note: '2 AC units · deep jet cleaning', customer: 'Anand Kumar', phone: '+91 98470 12345', address: 'West Fort, Thrissur', time: 'Today, 03:30 PM', price: 799, status: 'Confirmed' },
    { id: 'SRV-8820', service: 'Electrical Distribution Box Repair', note: 'MCB replacement + wiring check', customer: 'Saritha Nair', phone: '+91 98471 99882', address: 'MG Road, Thrissur', time: 'Tomorrow, 10:00 AM', price: 499, status: 'Requested' },
    { id: 'SRV-8815', service: 'Full House Wiring Inspection', note: '12 points · safety report', customer: 'Vipin Das', phone: '+91 98472 88991', address: 'Ramavarmapuram, Thrissur', time: '02 Sept, 11:00 AM', price: 1200, status: 'In Progress' },
    { id: 'SRV-8812', service: 'Water Heater Full Service', note: 'Heater flush + thermostat clean', customer: 'Rahul Menon', phone: '+91 98473 55671', address: 'Punkunnam, Thrissur', time: '01 Sept, 05:00 PM', price: 649, status: 'Completed' },
    { id: 'SRV-8809', service: 'Ceiling Fan & Light Fixing', note: '2 fans + 1 LED fixture', customer: 'Meera Nair', phone: '+91 98474 22013', address: 'Ollur, Thrissur', time: '30 Aug 2026', price: 349, status: 'Completed' },
    { id: 'SRV-8805', service: 'Split AC Gas Refill', note: 'R-22 gas top-up · leak test', customer: 'Jijo Thomas', phone: '+91 98475 88340', address: 'Poothole, Thrissur', time: '28 Aug 2026', price: 999, status: 'Cancelled' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const updateStatus = (id, next) => {
    setBookings(bookings.map(b => (b.id === id ? { ...b, status: next } : b)));
  };

  const filtered = bookings.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const requested = bookings.filter(b => b.status === 'Requested').length;
  const upcoming = bookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const revenue = bookings.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + b.price, 0);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: CalendarCheck, color: 'text-blue-600 bg-blue-50' },
    { label: 'New Requests', value: requested, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Upcoming Visits', value: upcoming, icon: CalendarCheck, color: 'text-slate-600 bg-slate-100' },
    { label: 'Completed Visits', value: completed, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Revenue', value: fmt(revenue), icon: TrendingUp, color: 'text-blue-700 bg-blue-100' }
  ];

  return (
    <ServiceAdminLayout title="Customer Visit Bookings" subtitle="Manage appointment requests and visit statuses">
      <div className="space-y-6">

        {/* Controls header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-primary" />
                Visit Scheduling
              </h2>
              <p className="text-xs text-slate-500 font-medium">{bookings.length} bookings · {requested + upcoming} active visits</p>
            </div>
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID, customer or service..."
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

        {/* Stats cards */}
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

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm py-16 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-700">No bookings found</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b, bi) => {
              const cfg = STATUS_CONFIG[b.status];
              const isTerminal = b.status === 'Completed' || b.status === 'Cancelled';
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  {/* Card header */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl ${AVATAR_COLORS[bi % AVATAR_COLORS.length]} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                        {b.customer.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-bold text-slate-900">{b.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.badge}`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">{b.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {b.time}
                      </div>
                      <p className="text-lg font-black text-slate-900">{fmt(b.price)}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Visit details */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">{b.customer}</p>
                          <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {b.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{b.address}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{b.note}</p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700">
                        Customer pays you directly · UPI / Cash / Bank
                      </div>
                    </div>

                    {/* Progress & actions */}
                    <div className="space-y-3.5">
                      {b.status === 'Requested' ? (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs font-bold text-amber-600">
                          <Clock className="w-4 h-4" />
                          Awaiting your confirmation — review the visit and accept when ready
                        </div>
                      ) : isTerminal ? (
                        <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold ${
                          b.status === 'Completed'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                            : 'bg-red-50 border border-red-200 text-red-500'
                        }`}>
                          {b.status === 'Completed'
                            ? <><CheckCircle2 className="w-4 h-4" /> Visit completed. Customer payment received directly.</>
                            : <><XCircle className="w-4 h-4" /> Booking cancelled.</>}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Visit progress</span>
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
                              <span key={step} className={`text-[8px] font-bold ${cfg.step >= si + 1 ? 'text-primary' : 'text-slate-400'} w-14 text-center`}>
                                {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {b.status === 'Requested' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(b.id, 'Confirmed')}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Accept &amp; Confirm Visit
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, 'Cancelled')}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-slate-600 font-bold rounded-xl text-xs border border-slate-200 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => updateStatus(b.id, 'In Progress')}
                          className="px-4 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                          Start Visit
                        </button>
                      )}
                      {b.status === 'In Progress' && (
                        <button
                          onClick={() => updateStatus(b.id, 'Completed')}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Job Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ServiceAdminLayout>
  );
}