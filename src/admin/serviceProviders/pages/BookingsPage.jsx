import React from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import { CalendarCheck, MapPin, Phone, User, Clock, CheckCircle2 } from 'lucide-react';

export default function BookingsPage() {
  const bookings = [
    { id: 'SRV-8821', service: 'Split AC Deep Jet Service', customer: 'Anand Kumar', phone: '+91 98470 12345', address: 'West Fort, Thrissur', time: 'Today, 03:30 PM', status: 'Confirmed', price: '₹799' },
    { id: 'SRV-8820', service: 'Electrical Distribution Box Repair', customer: 'Saritha Nair', phone: '+91 98471 99882', address: 'Mg Road, Thrissur', time: 'Tomorrow, 10:00 AM', status: 'Pending Confirmation', price: '₹499' },
    { id: 'SRV-8815', service: 'Full House Wiring Inspection', customer: 'Vipin Das', phone: '+91 98472 88991', address: 'Ramavarmapuram, Thrissur', time: '02 Sept, 11:00 AM', status: 'Completed', price: '₹1,200' }
  ];

  return (
    <ServiceAdminLayout title="Customer Home Bookings" subtitle="Manage all appointment requests and status updates">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-sans">Active & Past Appointments</h2>
            <p className="text-xs text-slate-500 font-medium">Click "Complete Job" once your home visit is finished</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
            {bookings.length} Total Bookings
          </span>
        </div>

        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{b.id}</span>
                  <h3 className="text-base font-bold text-slate-900">{b.service}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                    {b.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {b.customer} ({b.phone})</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.address}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {b.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-base font-black text-slate-900">{b.price}</span>
                {b.status !== 'Completed' && (
                  <button
                    onClick={() => alert(`Marked booking ${b.id} as Completed!`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Mark Job Completed
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </ServiceAdminLayout>
  );
}
