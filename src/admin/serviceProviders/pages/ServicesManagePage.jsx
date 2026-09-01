import React, { useState } from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import { SlidersHorizontal, Plus, Edit2, Trash2, CheckCircle2, Wrench } from 'lucide-react';

export default function ServicesManagePage() {
  const [services, setServices] = useState([
    { id: 1, title: 'Split AC Deep Jet Service', category: 'Appliance Repair', rate: 799, duration: '60 Mins', active: true },
    { id: 2, title: 'Electrical Distribution Box Repair', category: 'Plumbing & Electrical', rate: 499, duration: '45 Mins', active: true },
    { id: 3, title: 'Full House Wiring Inspection', category: 'Plumbing & Electrical', rate: 1200, duration: '120 Mins', active: true }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newRate, setNewRate] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (newTitle && newRate) {
      setServices([
        ...services,
        { id: Date.now(), title: newTitle, category: 'Appliance Repair', rate: Number(newRate), duration: '60 Mins', active: true }
      ]);
      setNewTitle('');
      setNewRate('');
    }
  };

  return (
    <ServiceAdminLayout title="Services & Pricing Settings" subtitle="Configure offered service packages and hourly/visiting rates">
      <div className="space-y-6">
        
        {/* Form */}
        <form onSubmit={handleAddService} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 max-w-2xl">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" />
            Add New Offered Service Package
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Service Package Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Inverter AC PCB Repair"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Visiting / Service Charge (₹)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 599"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Add Service to Profile
          </button>
        </form>

        {/* List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Your Active Service Offerings</h3>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{s.category} • Est. Duration: {s.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-900">₹{s.rate}</span>
                  <button
                    onClick={() => setServices(services.filter(item => item.id !== s.id))}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ServiceAdminLayout>
  );
}
