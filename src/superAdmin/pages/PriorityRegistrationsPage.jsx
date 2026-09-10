import { useMemo, useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import {
  Crown,
  Users,
  Rocket,
  Layers,
  Search,
  ShieldCheck,
  IndianRupee,
  Calendar,
  Store,
  Filter
} from 'lucide-react';
import { useRegisteredSellers } from '../../lib/seller';

const PRIORITY_PRICE = 1999;

const formatDate = (iso) => {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

export default function PriorityRegistrationsPage() {
  const sellers = useRegisteredSellers();
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All');

  const sorted = useMemo(
    () =>
      [...sellers].sort(
        (a, b) => new Date(b.registeredAt || 0).getTime() - new Date(a.registeredAt || 0).getTime()
      ),
    [sellers]
  );

  const priorityCount = sellers.filter((s) => s.priority).length;
  const standardCount = sellers.length - priorityCount;
  const revenue = priorityCount * PRIORITY_PRICE;

  const filtered = sorted.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q.trim() ||
      (s.storeName || '').toLowerCase().includes(q) ||
      (s.ownerName || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.location || '').toLowerCase().includes(q);
    const matchesPlan =
      planFilter === 'All' ||
      (planFilter === 'priority' && s.priority) ||
      (planFilter === 'non-priority' && !s.priority);
    return matchesSearch && matchesPlan;
  });

  const stats = [
    { label: 'Total Registrations', value: sellers.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Priority Listings', value: priorityCount, icon: Rocket, color: 'text-amber-600 bg-amber-50' },
    { label: 'Standard (Free)', value: standardCount, icon: Layers, color: 'text-slate-600 bg-slate-100' },
    { label: 'Priority Revenue', value: revenue === 0 ? '₹0' : `₹${revenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-600 bg-emerald-50' }
  ];

  return (
    <SuperAdminLayout
      title="Seller Registrations"
      subtitle="Review every marketplace registration — who opted for Priority and who listed as Standard"
    >
      <div className="space-y-6 font-sans">

        {/* Header / Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Marketplace Seller Registrations
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Priority stores are pinned to the first page of marketplace search results.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search store, owner or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-primary"
            >
              <option value="All">All Plans</option>
              <option value="priority">Priority Only</option>
              <option value="non-priority">Standard Only</option>
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

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Store className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">
                {sellers.length === 0 ? 'No seller registrations yet' : 'No registrations match your filters'}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Registrations complete from the marketplace "List Products on Marketplace" form will show up here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-5">Store &amp; Owner</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Location</th>
                    <th className="py-3.5 px-5">Plan</th>
                    <th className="py-3.5 px-5">Amount</th>
                    <th className="py-3.5 px-5">Payment</th>
                    <th className="py-3.5 px-5">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            s.priority ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {s.priority ? <Crown className="w-5 h-5" /> : <Store className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 truncate max-w-[180px]">
                              {s.storeName || 'Unnamed Store'}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium truncate max-w-[180px]">
                              {s.ownerName || '—'} · {s.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex text-xs font-semibold text-slate-800 whitespace-nowrap">
                          {s.category || 'Local Store'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 font-medium">
                        <span className="truncate max-w-[140px] block">{s.location || 'Thrissur'}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          s.priority
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {s.priority ? <Rocket className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
                          {s.priority ? 'Priority' : 'Standard'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-black text-slate-900">
                        {s.priority ? `₹${PRIORITY_PRICE.toLocaleString('en-IN')}` : <span className="text-emerald-600 text-xs font-bold">Free</span>}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          s.priority
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {s.priority ? 'Paid' : 'N/A'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {formatDate(s.registeredAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 flex items-start gap-3">
          <Filter className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 font-semibold leading-relaxed">
            Priority listings are paid ({`₹${PRIORITY_PRICE.toLocaleString('en-IN')}`}/year) and get pinned to the first
            page of marketplace search results. Standard listings are free and appear in the normal order. Revenue shown
            reflects expected annual priority fees collected via the demo checkout.
          </p>
        </div>

      </div>
    </SuperAdminLayout>
  );
}