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
  Landmark,
  DollarSign
} from 'lucide-react';

const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const fmt2 = (n) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState('plan');

  // ---- Managed plan collections ----
  // The managed store pays E-SHOP 8% on each week's sales (rate set by e-shop admin).
  const PLAN_RATE = 8;
  const [weeks, setWeeks] = useState([
    { id: 'M-PAY-105', period: 'Week of 01 Sept', sales: 350000, rate: PLAN_RATE, status: 'Pending', submitted: 'Payment Due' },
    { id: 'M-PAY-104', period: 'Week of 25 Aug', sales: 342000, rate: PLAN_RATE, status: 'Pending Confirmation', submitted: 'Submitted 01 Sept' },
    { id: 'M-PAY-103', period: 'Week of 18 Aug', sales: 338000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 22 Aug' },
    { id: 'M-PAY-102', period: 'Week of 11 Aug', sales: 295000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 15 Aug' },
    { id: 'M-PAY-101', period: 'Week of 04 Aug', sales: 342000, rate: PLAN_RATE, status: 'Paid', submitted: 'Confirmed 08 Aug' }
  ]);

  const dueFor = (w) => (w.sales * w.rate) / 100;

  const totalRevenue = weeks.reduce((s, w) => s + w.sales, 0);
  const totalDue = weeks.reduce((s, w) => s + dueFor(w), 0);

  const pendingWeeks = weeks.filter((w) => w.status === 'Pending');
  const pendingConfirmWeeks = weeks.filter((w) => w.status === 'Pending Confirmation');
  const paidWeeks = weeks.filter((w) => w.status === 'Paid');

  const pendingDue = pendingWeeks.reduce((s, w) => s + dueFor(w), 0);
  const pendingConfirmDue = pendingConfirmWeeks.reduce((s, w) => s + dueFor(w), 0);
  const collected = paidWeeks.reduce((s, w) => s + dueFor(w), 0);

  const payPlanFee = (id) => {
    setWeeks(weeks.map((w) => (w.id === id ? { ...w, status: 'Pending Confirmation', submitted: 'Submitted just now' } : w)));
  };

  const payAllPending = () => {
    setWeeks(weeks.map((w) => (w.status === 'Pending' ? { ...w, status: 'Pending Confirmation', submitted: 'Submitted just now' } : w)));
  };

  const planStats = [
    { label: 'Managed Plan Rate', value: `${PLAN_RATE}%`, note: 'Fixed by e-shop admin', icon: Percent, color: 'text-blue-600 bg-blue-50' },
    { label: 'Store Weekly Sales', value: fmt(totalRevenue), note: `${weeks.length} settled weeks`, icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
    { label: 'Plan Fee Outstanding', value: fmt(pendingDue + pendingConfirmDue), note: 'Pending or awaiting confirmation', icon: Receipt, color: 'text-amber-600 bg-amber-50' },
    { label: 'Confirmed Paid to E-SHOP', value: fmt(collected), note: 'Settled collections', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' }
  ];

  const steps = [
    { icon: Store, title: '1. View weekly sales & 8% fee', desc: 'Calculate your 8% managed plan fee from weekly store transactions.' },
    { icon: DollarSign, title: '2. Click "Pay 8% Fee"', desc: 'Submit your payment to E-SHOP via UPI or Bank Transfer.' },
    { icon: CheckCircle2, title: '3. Await E-SHOP confirmation', desc: 'E-SHOP admin verifies your payment and updates status to Paid.' }
  ];

  return (
    <ManagedAdminLayout title="Managed Plan Collections & Fees" subtitle="Manage and pay your 8% weekly plan fees to E-SHOP">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm inline-flex">
          {[
            { key: 'plan', label: 'Managed Plan Fees', icon: Wallet },
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

        {/* ============ TAB 1: Plan Fees ============ */}
        {activeTab === 'plan' && (
          <div className="space-y-6">

            {/* Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-900/40 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                      {pendingWeeks.length > 0
                        ? 'Plan Fees Outstanding'
                        : pendingConfirmWeeks.length > 0
                          ? 'Payments Awaiting Confirmation'
                          : 'All Plan Fees Up To Date'}
                    </span>
                    <div className="text-3xl font-black tracking-tight">
                      {fmt2(pendingWeeks.length > 0 ? pendingDue : pendingConfirmDue)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {pendingWeeks.length > 0
                        ? `${pendingWeeks.length} weekly fee payment${pendingWeeks.length > 1 ? 's' : ''} ready to pay to E-SHOP`
                        : pendingConfirmWeeks.length > 0
                          ? `${pendingConfirmWeeks.length} payment submitted — waiting for E-SHOP admin to confirm receipt`
                          : `All ${PLAN_RATE}% managed plan fees are paid & confirmed`}
                    </span>
                  </div>
                </div>

                {pendingWeeks.length > 0 && (
                  <button
                    onClick={payAllPending}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    Pay All Pending Fees
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {pendingWeeks.length === 0 && pendingConfirmWeeks.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-200 text-xs font-bold shrink-0">
                    <Clock className="w-4 h-4 text-blue-300" />
                    Waiting Confirmation
                  </div>
                )}

                {pendingWeeks.length === 0 && pendingConfirmWeeks.length === 0 && (
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

            {/* Ledger Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Weekly Plan Fee Ledger</h3>
                    <p className="text-[11px] text-slate-500 font-medium">8% per-sales commission payable to E-SHOP</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  Rate: {PLAN_RATE}% · Fixed by e-shop admin
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Week</th>
                      <th className="py-3.5 px-5">Store Sales</th>
                      <th className="py-3.5 px-5">Rate</th>
                      <th className="py-3.5 px-5">Plan Fee Due</th>
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
                                : w.status === 'Pending Confirmation'
                                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                                  : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}>
                              {w.status === 'Paid' ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <Clock className="w-3 h-3" />
                              )}
                              {w.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {w.status === 'Pending' && (
                              <button
                                onClick={() => payPlanFee(w.id)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer shadow-sm shadow-emerald-600/20"
                                title="Pay this plan fee to E-SHOP"
                              >
                                Pay 8% Fee <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                            {w.status === 'Pending Confirmation' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                                <Clock className="w-3 h-3" />
                                Waiting Confirmation
                              </span>
                            )}
                            {w.status === 'Paid' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Confirmed
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

            {/* How it works steps */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-900/40 shadow-md">
              <h3 className="text-base font-bold text-white mb-5">How managed plan fee payments work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{s.title}</p>
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
                      Total Plan Collections Settled
                    </span>
                    <div className="text-3xl font-black tracking-tight">{fmt2(collected)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Total confirmed 8% plan fee collections from Silk Land Textiles
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Managed Plan Rate', value: `${PLAN_RATE}%`, note: 'Fixed by e-shop admin', icon: Percent, color: 'text-blue-600 bg-blue-50' },
                { label: 'Store Sales', value: fmt(totalRevenue), note: `${weeks.length} settled weeks`, icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
                { label: 'Plan Fees Paid', value: fmt(collected), note: 'Confirmed collections', icon: Receipt, color: 'text-amber-600 bg-amber-50' },
                { label: 'Account Manager', value: 'Kavya Nair', note: 'Assigned to your store', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' }
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

            {/* Receiving account */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">E-SHOP Receiving Account Details</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Send your weekly 8% plan fee to the following E-SHOP business account.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      HDFC Bank •••• 2209
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      UPI: eshopmanaged@hdfc
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      Account Manager: Kavya Nair (+91 98470 99887)
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