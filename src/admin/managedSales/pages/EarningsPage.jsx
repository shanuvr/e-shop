import { useState } from 'react';
import ManagedAdminLayout from '../layout/ManagedAdminLayout';
import {
  Wallet,
  Percent,
  Receipt,
  CheckCircle2,
  Clock,
  TrendingUp,
  Store,
  ArrowRight,
  Landmark
} from 'lucide-react';

const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const fmt2 = (n) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState('plan');

  // ---- Managed plan collections ----
  // The managed store pays E-SHOP 8% on each week's sales (rate set by e-shop admin).
  const PLAN_RATE = 8;
  const [weeks, setWeeks] = useState([
    { id: 'M-PAY-104', period: 'Week of 25 Aug', sales: 342000, rate: PLAN_RATE, status: 'Pending Confirmation', submitted: 'Submitted 01 Sept' },
    { id: 'M-PAY-103', period: 'Week of 18 Aug', sales: 338000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 22 Aug' },
    { id: 'M-PAY-102', period: 'Week of 11 Aug', sales: 295000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 15 Aug' },
    { id: 'M-PAY-101', period: 'Week of 04 Aug', sales: 342000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 08 Aug' },
    { id: 'M-PAY-100', period: 'Week of 28 Jul', sales: 316000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 01 Aug' }
  ]);

  const dueFor = (w) => (w.sales * w.rate) / 100;

  const totalRevenue = weeks.reduce((s, w) => s + w.sales, 0);
  const totalDue = weeks.reduce((s, w) => s + dueFor(w), 0);

  const paidWeeks = weeks.filter((w) => w.status === 'Paid');
  const pendingConfirmWeeks = weeks.filter((w) => w.status === 'Pending Confirmation');

  const collected = paidWeeks.reduce((s, w) => s + dueFor(w), 0);
  const outstanding = totalDue - collected;

  const confirmPayment = (id) => {
    setWeeks(weeks.map((w) => (w.id === id ? { ...w, status: 'Paid', submitted: 'Confirmed just now' } : w)));
  };

  const confirmAllPending = () => {
    setWeeks(weeks.map((w) => (w.status === 'Pending Confirmation' ? { ...w, status: 'Paid', submitted: 'Confirmed just now' } : w)));
  };

  const planStats = [
    { label: 'Managed Plan Rate', value: `${PLAN_RATE}%`, note: 'Fixed by e-shop admin', icon: Percent, color: 'text-blue-600 bg-blue-50' },
    { label: 'Store Weekly Sales', value: fmt(totalRevenue), note: `${weeks.length} settled weeks`, icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
    { label: 'Plan Collections Due', value: fmt(totalDue), note: 'From managed store', icon: Receipt, color: 'text-amber-600 bg-amber-50' },
    { label: 'Collected by E-SHOP', value: fmt(collected), note: 'Confirmed this month', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' }
  ];

  const steps = [
    { icon: Store, title: 'Store pays into the E-SHOP plan', desc: 'The merchant submits their weekly or monthly plan amount to E-SHOP.' },
    { icon: Wallet, title: 'Payment lands in our review', desc: 'It arrives in our E-SHOP account and shows as pending confirmation.' },
    { icon: CheckCircle2, title: 'We confirm &amp; record it', desc: `We verify the ${PLAN_RATE}% plan collection and mark it collected.` }
  ];

  return (
    <ManagedAdminLayout title="Managed Plan Collections" subtitle="The managed store pays E-SHOP its weekly plan amount">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm inline-flex">
          {[
            { key: 'plan', label: 'Plan Collections', icon: Wallet },
            { key: 'overview', label: 'Collections Overview', icon: Receipt }
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === t.key
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ TAB 1: Plan Collections ============ */}
        {activeTab === 'plan' && (
          <div className="space-y-6">

            {/* Due banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-900/40 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                      {pendingConfirmWeeks.length > 0 ? 'Collections awaiting confirmation' : 'All collections up to date'}
                    </span>
                    <div className="text-3xl font-black tracking-tight">{fmt2(outstanding)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {pendingConfirmWeeks.length > 0
                        ? `${pendingConfirmWeeks.length} payment from Silk Land Textiles waiting on E-SHOP confirmation`
                        : `All ${PLAN_RATE}% plan collections from the managed store are confirmed`}
                    </span>
                  </div>
                </div>
                {pendingConfirmWeeks.length > 0 && (
                  <button
                    onClick={confirmAllPending}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    Confirm All Received
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {pendingConfirmWeeks.length === 0 && (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" /> All caught up
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {planStats.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-black text-slate-900 leading-none truncate">{s.value}</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">{s.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Weekly Plan Collections Ledger</h3>
                    <p className="text-[11px] text-slate-500 font-medium">The managed store pays E-SHOP {PLAN_RATE}% on weekly sales</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  Rate: {PLAN_RATE}% · Set by e-shop admin
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Week</th>
                      <th className="py-3.5 px-5">Store Sales</th>
                      <th className="py-3.5 px-5">Rate</th>
                      <th className="py-3.5 px-5">Plan Due</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {weeks.map((w) => {
                      const due = dueFor(w);
                      return (
                        <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] font-bold text-slate-400">{w.id}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">• {w.submitted}</span>
                            </div>
                            <p className="font-bold text-slate-900 mt-0.5">{w.period}</p>
                          </td>
                          <td className="py-3.5 px-5 font-semibold text-slate-800">{fmt(w.sales)}</td>
                          <td className="py-3.5 px-5">
                            <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-700">
                              <Percent className="w-3 h-3" /> {w.rate}%
                            </span>
                          </td>
                          <td className="py-3.5 px-5 font-black text-slate-900">{fmt2(due)}</td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              w.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-blue-50 text-blue-600 border-blue-200'
                            }`}>
                              {w.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {w.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {w.status === 'Pending Confirmation' && (
                              <button
                                onClick={() => confirmPayment(w.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                                title="Confirm this collection from the store"
                              >
                                Confirm <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                            {w.status === 'Paid' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Collected
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How this works */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-900/40 shadow-md">
              <h3 className="text-base font-bold text-white mb-5">How the managed-plan collection works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{i + 1}. {s.title}</p>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: Collections Overview ============ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Collections due banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-900/40 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                      {pendingConfirmWeeks.length > 0 ? 'Collections awaiting confirmation' : 'Outstanding collections'}
                    </span>
                    <div className="text-3xl font-black tracking-tight">{fmt2(outstanding)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {pendingConfirmWeeks.length > 0
                        ? `${pendingConfirmWeeks.length} plan payment submitted by Silk Land Textiles and waiting for e-shop confirmation`
                        : `Charged across ${weeks.length} settled week${weeks.length === 1 ? '' : 's'}`}
                    </span>
                  </div>
                </div>
                {pendingConfirmWeeks.length === 0 && paidWeeks.length === 0 && (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" /> All caught up
                  </span>
                )}
                {pendingConfirmWeeks.length === 0 && paidWeeks.length > 0 && (
                  <button
                    onClick={confirmAllPending}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    Confirm All Received
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Managed Plan Rate', value: `${PLAN_RATE}%`, note: 'Fixed by e-shop admin', icon: Percent, color: 'text-blue-600 bg-blue-50' },
                { label: 'Store Sales', value: fmt(totalRevenue), note: `${weeks.length} settled weeks`, icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
                { label: 'Collections Charged', value: fmt(totalDue), note: 'On weekly store sales', icon: Receipt, color: 'text-amber-600 bg-amber-50' },
                { label: 'Collected by E-SHOP', value: fmt(collected), note: 'After confirmation', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-black text-slate-900 leading-none truncate">{s.value}</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">{s.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Collections ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Managed Plan Collection Ledger</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Collections charged on the store&apos;s weekly sales — confirmed by e-shop</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  Rate: {PLAN_RATE}% · Set by e-shop admin
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Week &amp; Settlement</th>
                      <th className="py-3.5 px-5">Store Sales</th>
                      <th className="py-3.5 px-5">Rate</th>
                      <th className="py-3.5 px-5">Plan Due</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {weeks.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] font-bold text-slate-400">{w.id}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">• {w.submitted}</span>
                          </div>
                          <p className="font-bold text-slate-900 mt-0.5">{w.period}</p>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">{fmt(w.sales)}</td>
                        <td className="py-3.5 px-5">
                          <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-700">
                            <Percent className="w-3 h-3" /> {w.rate}%
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-black text-slate-900">{fmt2(dueFor(w))}</td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            w.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                            {w.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          {w.status === 'Pending Confirmation' && (
                            <button
                              onClick={() => confirmPayment(w.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Confirm this collection from the store"
                            >
                              Confirm <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {w.status === 'Paid' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Collected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receiving account */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">E-SHOP Receiving Account</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    The managed store uses these details to send the plan amount to E-SHOP.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      HDFC Bank •••• 2209
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      UPI: eshopmanaged@hdfc
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      Account Manager: Kavya Nair
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ManagedAdminLayout>
  );
}