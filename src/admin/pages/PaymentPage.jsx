import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import { CreditCard, CheckCircle2, DollarSign } from 'lucide-react';

export default function PaymentPage() {
  const [bankData, setBankData] = useState({
    accountHolder: 'Elite Digital Stores',
    accountNumber: '984710928301',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank, Swaraj Round Branch'
  });

  const handleSaveBank = (e) => {
    e.preventDefault();
    alert('Bank payout details updated successfully!');
  };

  return (
    <SellerAdminLayout title="Payment & Payouts" subtitle="Manage your bank account & payout settings">
      <div className="space-y-6 max-w-3xl">
        
        {/* Payout Summary */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-300 font-bold uppercase tracking-wider block mb-1">Available Payout Balance</span>
            <div className="text-3xl font-black tracking-tight">₹42,850.00</div>
            <span className="text-[11px] text-slate-400 font-medium">Next scheduled payout on Friday</span>
          </div>

          <button
            onClick={() => alert('Instant payout request initiated!')}
            className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/30 transition-all cursor-pointer"
          >
            Request Instant Payout
          </button>
        </div>

        {/* Bank Form */}
        <form onSubmit={handleSaveBank} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-slate-900">Bank Account Details</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Account Holder Name</label>
            <input
              type="text"
              value={bankData.accountHolder}
              onChange={(e) => setBankData({ ...bankData, accountHolder: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Account Number</label>
              <input
                type="text"
                value={bankData.accountNumber}
                onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">IFSC Code</label>
              <input
                type="text"
                value={bankData.ifscCode}
                onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Bank & Branch Name</label>
            <input
              type="text"
              value={bankData.bankName}
              onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
            />
          </div>

          <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors">
            Save Bank Payout Settings
          </button>
        </form>

      </div>
    </SellerAdminLayout>
  );
}
