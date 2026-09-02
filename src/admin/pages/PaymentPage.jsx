import { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import {
  Landmark,
  TrendingUp,
  Percent,
  CheckCircle2,
  Receipt,
  Wallet,
  ArrowRight,
  Clock
} from 'lucide-react';

const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const fmt2 = (n) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState('bank');

  // ---- Bank payout details (where customer/store money is received) ----
  const [bankData, setBankData] = useState({
    accountHolder: 'Elite Digital Stores',
    accountNumber: '984710928301',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank, Swaraj Round Branch',
    upiId: 'elitemarketplace@hdfc'
  });
  const [bankSaved, setBankSaved] = useState(false);

  const handleSaveBank = (e) => {
    e.preventDefault();
    setBankSaved(true);
    setTimeout(() => setBankSaved(false), 3000);
  };

  // ---- Monthly commission (store pays the marketplace monthly) ----
  // NOTE: Commission rate is fixed by the e-shop admins — store admins cannot edit it.
  const COMMISSION_RATE = 8;
  const [records, setRecords] = useState([
    { id: 1, month: 'July 2026', revenue: 143250, rate: COMMISSION_RATE, status: 'Paid' },
    { id: 2, month: 'August 2026', revenue: 118480, rate: COMMISSION_RATE, status: 'Pending Confirmation' },
    { id: 3, month: 'September 2026', revenue: 62397, rate: COMMISSION_RATE, status: 'Pending' }
  ]);

  const totalPaid = records.filter(r => r.status === 'Paid').reduce((s, r) => s + (r.revenue * r.rate) / 100, 0);
  const dueRecord = records.find(r => r.status !== 'Paid') || records[records.length - 1];
  const currentDue = dueRecord ? (dueRecord.revenue * dueRecord.rate) / 100 : 0;
  const pendingConfirmationCount = records.filter(r => r.status === 'Pending Confirmation').length;
  const outstanding = records.filter(r => r.status !== 'Paid').reduce((s, r) => s + (r.revenue * r.rate) / 100, 0);

  const payCommission = (id) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: 'Pending Confirmation' } : r));
  };

  const stats = [
    { label: 'Commission Rate', value: `${COMMISSION_RATE}%`, icon: Percent, color: 'text-blue-600 bg-blue-50' },
    { label: 'This Month Revenue', value: fmt(dueRecord?.revenue || 0), icon: TrendingUp, color: 'text-slate-700 bg-slate-100' },
    { label: 'Commission Due', value: fmt2(currentDue), icon: Wallet, color: 'text-amber-600 bg-amber-50' },
    { label: 'Total Commission Paid', value: fmt(totalPaid), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' }
  ];

  return (
    <SellerAdminLayout title="Payment & Payouts" subtitle="Manage your payout bank and monthly commission">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm inline-flex">
          {[
            { key: 'bank', label: 'Payout Bank', icon: Landmark },
            { key: 'commission', label: 'Monthly Commission', icon: Percent }
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

        {/* ============ TAB 1: Payout Bank ============ */}
        {activeTab === 'bank' && (
          <div className="space-y-6 max-w-3xl">

            {/* Bank form */}
            <form onSubmit={handleSaveBank} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Bank Account Details</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Where your store payouts are sent</p>
                  </div>
                </div>
                {bankSaved && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Account Holder Name</label>
                <input
                  type="text"
                  value={bankData.accountHolder}
                  onChange={(e) => setBankData({ ...bankData, accountHolder: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Account Number</label>
                  <input
                    type="text"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">IFSC Code</label>
                  <input
                    type="text"
                    value={bankData.ifscCode}
                    onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bank & Branch Name</label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">UPI ID (optional)</label>
                  <input
                    type="text"
                    value={bankData.upiId}
                    onChange={(e) => setBankData({ ...bankData, upiId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div className="hidden sm:block" />
              </div>

              <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/20 transition-all cursor-pointer">
                Save Payout Settings
              </button>
            </form>
          </div>
        )}

        {/* ============ TAB 2: Monthly Commission ============ */}
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
                      {pendingConfirmationCount > 0 ? 'Commission awaiting confirmation' : 'Outstanding commission'}
                    </span>
                    <div className="text-3xl font-black tracking-tight">{fmt2(outstanding)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {pendingConfirmationCount > 0
                        ? `${pendingConfirmationCount} payment${pendingConfirmationCount > 1 ? 's' : ''} submitted and waiting for confirmation`
                        : `Unpaid commission across ${records.filter(r => r.status === 'Pending').length} month(s)`}
                    </span>
                  </div>
                </div>
                {pendingConfirmationCount === 0 && records.filter(r => r.status === 'Pending').length > 0 && (
                  <button
                    onClick={() => payCommission(dueRecord.id)}
                    className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    Pay Commission Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {pendingConfirmationCount === 0 && records.filter(r => r.status === 'Pending').length === 0 && (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" /> All caught up
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Commission settings + records */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              {/* Settings header */}
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Monthly Commission Statements</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Commission charged on your order revenue each month</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
                  <Percent className="w-3.5 h-3.5 text-primary" />
                  Rate: {COMMISSION_RATE}% · Set by e-shop admin
                </span>
              </div>

              {/* Records table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Month</th>
                      <th className="py-3.5 px-5">Order Revenue</th>
                      <th className="py-3.5 px-5">Rate</th>
                      <th className="py-3.5 px-5">Commission</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {records.map((r) => {
                      const amount = (r.revenue * r.rate) / 100;
                      return (
                        <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <span className="font-bold text-slate-900">{r.month}</span>
                          </td>
                          <td className="py-3.5 px-5 font-semibold text-slate-800">{fmt(r.revenue)}</td>
                          <td className="py-3.5 px-5">
                            <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-700">
                              <Percent className="w-3 h-3" /> {r.rate}%
                            </span>
                          </td>
                          <td className="py-3.5 px-5 font-black text-slate-900">{fmt2(amount)}</td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              r.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : r.status === 'Pending Confirmation'
                                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                                  : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}>
                              {r.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {r.status === 'Pending' && (
                              <button
                                onClick={() => payCommission(r.id)}
                                className="px-3 py-1.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                                title="Pay this month's commission"
                              >
                                Pay <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                            {r.status === 'Pending Confirmation' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                Awaiting e-shop admin
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
          </div>
        )}
      </div>
    </SellerAdminLayout>
  );
}
