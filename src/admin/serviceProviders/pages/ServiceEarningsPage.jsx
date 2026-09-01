import { useState } from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import {
  Wallet,
  Percent,
  Receipt,
  CheckCircle2,
  Clock,
  TrendingUp,
  CalendarCheck,
  Landmark,
  ArrowRight,
  DollarSign
} from 'lucide-react';

const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const fmt2 = (n) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ServiceEarningsPage() {
  const [activeTab, setActiveTab] = useState('earnings');

  // ---- Per-service commission ----
  // Commission is charged ON EACH COMPLETED SERVICE JOB (not monthly).
  // Rate is fixed by the e-shop admin — service providers cannot edit it.
  const COMMISSION_RATE = 8;
  const [jobs, setJobs] = useState([
    { id: 'SRV-8841', service: 'Split AC Deep Jet Service', date: '30 Aug 2026', customer: 'Anand Kumar', fee: 799, rate: COMMISSION_RATE, status: 'Pending' },
    { id: 'SRV-8836', service: 'Full House Wiring Inspection', date: '29 Aug 2026', customer: 'Vipin Das', fee: 1200, rate: COMMISSION_RATE, status: 'Pending Confirmation' },
    { id: 'SRV-8832', service: 'Electrical Distribution Box Repair', date: '27 Aug 2026', customer: 'Saritha Nair', fee: 499, rate: COMMISSION_RATE, status: 'Paid' },
    { id: 'SRV-8828', service: 'Water Heater Full Service', date: '25 Aug 2026', customer: 'Rahul Menon', fee: 649, rate: COMMISSION_RATE, status: 'Paid' },
    { id: 'SRV-8821', service: 'Split AC Deep Jet Service', date: '22 Aug 2026', customer: 'Anand Kumar', fee: 799, rate: COMMISSION_RATE, status: 'Paid' }
  ]);

  const commissionFor = (j) => (j.fee * j.rate) / 100;
  const netFor = (j) => j.fee - commissionFor(j);

  const totalRevenue = jobs.reduce((s, j) => s + j.fee, 0);
  const totalCommission = jobs.reduce((s, j) => s + commissionFor(j), 0);
  const netEarnings = totalRevenue - totalCommission;

  const paidJobs = jobs.filter(j => j.status === 'Paid');
  const pendingJobs = jobs.filter(j => j.status === 'Pending');
  const pendingConfirmJobs = jobs.filter(j => j.status === 'Pending Confirmation');

  const paidCommission = paidJobs.reduce((s, j) => s + commissionFor(j), 0);
  const outstanding = totalCommission - paidCommission;

  const payCommission = (id) => {
    setJobs(jobs.map(j => (j.id === id ? { ...j, status: 'Pending Confirmation' } : j)));
  };

  const payAllPending = () => {
    setJobs(jobs.map(j => (j.status === 'Pending' ? { ...j, status: 'Pending Confirmation' } : j)));
  };

  // ---- Direct earnings (customers pay the provider directly) ----
  const recentVisits = [
    { id: 'SRV-8841', service: 'Split AC Deep Jet Service', date: '30 Aug 2026', customer: 'Anand Kumar', amount: 799, mode: 'UPI' },
    { id: 'SRV-8836', service: 'Full House Wiring Inspection', date: '29 Aug 2026', customer: 'Vipin Das', amount: 1200, mode: 'Bank Transfer' },
    { id: 'SRV-8832', service: 'Electrical Distribution Box Repair', date: '27 Aug 2026', customer: 'Saritha Nair', amount: 499, mode: 'Cash' },
    { id: 'SRV-8828', service: 'Water Heater Full Service', date: '25 Aug 2026', customer: 'Rahul Menon', amount: 649, mode: 'UPI' },
    { id: 'SRV-8821', service: 'Split AC Deep Jet Service', date: '22 Aug 2026', customer: 'Anand Kumar', amount: 799, mode: 'UPI' }
  ];

  const weekReceived = 14200;
  const weekVisits = 24;
  const avgPerVisit = Math.round(weekReceived / weekVisits);
  const commissionPayable = (weekReceived * COMMISSION_RATE) / 100;

  const earningsStats = [
    { label: 'Received This Week', value: fmt(weekReceived), note: `${weekVisits} completed visits`, icon: Wallet, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Completed Visits', value: String(weekVisits), note: 'this week', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
    { label: 'Avg. per Visit', value: fmt(avgPerVisit), note: 'incl. travel charge', icon: DollarSign, color: 'text-slate-700 bg-slate-100' },
    { label: 'Commission Payable', value: fmt(commissionPayable), note: `${COMMISSION_RATE}% per service`, icon: Percent, color: 'text-amber-600 bg-amber-50' }
  ];

  const commissionStats = [
    { label: 'Commission Rate', value: `${COMMISSION_RATE}%`, note: 'Fixed by e-shop admin', icon: Percent, color: 'text-blue-600 bg-blue-50' },
    { label: 'Service Revenue', value: fmt(totalRevenue), note: `${jobs.length} completed visits`, icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
    { label: 'Commission Charged', value: fmt(totalCommission), note: 'Per completed job', icon: Receipt, color: 'text-amber-600 bg-amber-50' },
    { label: 'Net Provider Earnings', value: fmt(netEarnings), note: 'After all commission', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' }
  ];

  const steps = [
    { icon: CalendarCheck, title: 'Customer books a home visit', desc: 'Appointment is confirmed through the e-shop.' },
    { icon: Wallet, title: 'Customer pays you directly', desc: 'By UPI, bank transfer, or cash at the visit — money goes straight to your account.' },
    { icon: Percent, title: 'You pay per-service commission', desc: `${COMMISSION_RATE}% of each job is recorded and paid to the e-shop.` }
  ];

  return (
    <ServiceAdminLayout title="Earnings & Per-Service Commission" subtitle="Direct customer payments and commission charged per completed visit">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm inline-flex">
          {[
            { key: 'earnings', label: 'Direct Earnings', icon: Wallet },
            { key: 'commission', label: 'Per-Service Commission', icon: Percent }
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === t.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ TAB 1: Direct Earnings ============ */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">

            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-300 font-bold uppercase tracking-wider block mb-1">Received directly from customers</span>
                    <div className="text-3xl font-black tracking-tight">{fmt(weekReceived)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      This week · Paid straight to your account by UPI, bank transfer, or cash — no platform hold
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {earningsStats.map((s, i) => (
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

            {/* Recent completed visits */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Completed Visits</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Payment received directly from the customer at each visit</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Job &amp; Service</th>
                      <th className="py-3.5 px-5">Customer</th>
                      <th className="py-3.5 px-5">Payment Mode</th>
                      <th className="py-3.5 px-5 text-right">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {recentVisits.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] font-bold text-slate-400">{v.id}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">• {v.date}</span>
                          </div>
                          <p className="font-bold text-slate-900 mt-0.5">{v.service}</p>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">{v.customer}</td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            v.mode === 'Cash'
                              ? 'bg-slate-50 text-slate-600 border-slate-200'
                              : v.mode === 'Bank Transfer'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                            {v.mode}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right font-black text-emerald-600">{fmt(v.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How payments work */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
              <h3 className="text-base font-bold text-white mb-5">How payments work for your service visits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{i + 1}. {s.title}</p>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Receiving account */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Your Receiving Account</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Customers use these details to pay you directly. Update them in your provider profile if they change.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      HDFC Bank •••• 4421
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      UPI: acservicekerala@hdfc
                    </span>
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                      Cash accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: Per-Service Commission ============ */}
        {activeTab === 'commission' && (
          <div className="space-y-6">

            {/* Commission due banner */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-300 font-bold uppercase tracking-wider block mb-1">
                      {pendingConfirmJobs.length > 0 ? 'Commission awaiting confirmation' : 'Outstanding commission'}
                    </span>
                    <div className="text-3xl font-black tracking-tight">{fmt2(outstanding)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {pendingConfirmJobs.length > 0
                        ? `${pendingConfirmJobs.length} job${pendingConfirmJobs.length > 1 ? 's' : ''} submitted and waiting for e-shop admin`
                        : `Charged across ${pendingJobs.length} completed service job${pendingJobs.length === 1 ? '' : 's'}`}
                    </span>
                  </div>
                </div>
                {pendingConfirmJobs.length === 0 && pendingJobs.length > 0 && (
                  <button
                    onClick={payAllPending}
                    className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    Pay Outstanding Commission
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {pendingConfirmJobs.length === 0 && pendingJobs.length === 0 && (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" /> All caught up
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {commissionStats.map((s, i) => (
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

            {/* Per-service ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Per-Service Commission Ledger</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Commission charged on every completed visit — no monthly statements</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
                  <Percent className="w-3.5 h-3.5 text-primary" />
                  Rate: {COMMISSION_RATE}% · Set by e-shop admin
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Job &amp; Service</th>
                      <th className="py-3.5 px-5">Service Fee</th>
                      <th className="py-3.5 px-5">Rate</th>
                      <th className="py-3.5 px-5">Commission</th>
                      <th className="py-3.5 px-5">You Earn</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {jobs.map((j) => (
                      <tr key={j.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] font-bold text-slate-400">{j.id}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">• {j.date}</span>
                          </div>
                          <p className="font-bold text-slate-900 mt-0.5">{j.service}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{j.customer}</p>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">{fmt(j.fee)}</td>
                        <td className="py-3.5 px-5">
                          <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-700">
                            <Percent className="w-3 h-3" /> {j.rate}%
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-black text-slate-900">{fmt2(commissionFor(j))}</td>
                        <td className="py-3.5 px-5 font-black text-emerald-600">{fmt2(netFor(j))}</td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            j.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : j.status === 'Pending Confirmation'
                                ? 'bg-blue-50 text-blue-600 border-blue-200'
                                : 'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>
                            {j.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {j.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          {j.status === 'Pending' && (
                            <button
                              onClick={() => payCommission(j.id)}
                              className="px-3 py-1.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Pay commission for this job"
                            >
                              Pay <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {j.status === 'Pending Confirmation' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              Awaiting e-shop admin
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </ServiceAdminLayout>
  );
}