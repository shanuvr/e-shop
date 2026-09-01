import React from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import { ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';

export default function OrdersPage() {
  const orders = [
    { orderId: 'ORD-9821', customer: 'Ananya Sharma', items: 'Acoustic Pro Headphones', total: '₹24,999', status: 'Ready for Dispatch', date: 'Today, 09:30 AM' },
    { orderId: 'ORD-9819', customer: 'Karthik Menon', items: 'Elite Smartwatch Series', total: '₹36,999', status: 'Delivered', date: 'Yesterday' },
    { orderId: 'ORD-9815', customer: 'Rahul Varma', items: 'Deep Home Cleaning Service', total: '₹499', status: 'Service Scheduled', date: '28 Aug 2026' }
  ];

  return (
    <SellerAdminLayout title="Orders & Fulfillment" subtitle="Track and manage customer orders">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Customer Orders Master List</h2>
          <p className="text-xs text-slate-500 font-medium">Process orders and update delivery status</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          {orders.map((ord) => (
            <div key={ord.orderId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{ord.orderId}</span>
                  <span className="text-xs font-semibold text-slate-500">• {ord.customer}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">{ord.items}</p>
                <span className="text-[10px] text-slate-400 font-medium">{ord.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-900">{ord.total}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100">
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SellerAdminLayout>
  );
}
