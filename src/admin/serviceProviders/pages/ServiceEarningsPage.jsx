import React from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import { DollarSign, CreditCard, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export default function ServiceEarningsPage() {
  return (
    <ServiceAdminLayout title="Earnings & Payout Ledger" subtitle="Track bank deposits and completed service earnings">
      <div className="space-y-6">
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Lifetime Earnings</span>
            <div className="text-2xl font-black text-slate-900">₹84,500</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 block">112 Completed Visits</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Next Payout Date</span>
            <div className="text-2xl font-black text-blue-600">Friday (₹14,200)</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Direct Bank Deposit</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Connected Bank Account</span>
            <div className="text-sm font-bold text-slate-900 mt-1">HDFC Bank •••• 4421</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Verified Payout Account</span>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Recent Deposit Transactions</h3>
          <div className="space-y-3">
            {[
              { id: 'PAY-4410', date: '29 Aug 2026', amount: '₹12,400', status: 'Deposited to HDFC Bank', ref: 'Ref #TXN-99881' },
              { id: 'PAY-4402', date: '22 Aug 2026', amount: '₹15,800', status: 'Deposited to HDFC Bank', ref: 'Ref #TXN-99870' }
            ].map((tx) => (
              <div key={tx.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{tx.id}</span>
                    <span className="text-xs text-slate-500 font-semibold">• {tx.date}</span>
                  </div>
                  <p className="text-xs text-emerald-600 font-bold mt-0.5">{tx.status} <span className="text-slate-400 font-normal">({tx.ref})</span></p>
                </div>
                <span className="text-base font-black text-slate-900">{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ServiceAdminLayout>
  );
}
