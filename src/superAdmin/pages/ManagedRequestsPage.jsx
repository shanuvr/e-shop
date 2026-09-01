import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import { UserCheck, Phone, MapPin, Store, Calendar, X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AVAILABLE_MANAGERS = [
  { id: 'MGR-101', name: 'Kavya Nair', region: 'Thrissur Central', capacity: '4/10 Stores', status: 'Active' },
  { id: 'MGR-102', name: 'Rahul Varma', region: 'Kochi North', capacity: '6/10 Stores', status: 'Active' },
  { id: 'MGR-103', name: 'Ananya Das', region: 'Kozhikode City', capacity: '3/8 Stores', status: 'Active' },
  { id: 'MGR-104', name: 'Arjun Menon', region: 'Trivandrum South', capacity: '5/10 Stores', status: 'Active' },
  { id: 'MGR-105', name: 'Priya Rajan', region: 'Palakkad East', capacity: '2/8 Stores', status: 'On Leave' }
];

export default function ManagedRequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 'REQ-101',
      businessName: 'Silk Land Textiles',
      ownerName: 'Suresh Kumar',
      phone: '+91 98470 11223',
      address: 'Round West, Thrissur',
      category: 'Apparel & Fashion',
      estimatedItems: '20-50 items',
      status: 'Awaiting Manager Assignment',
      assignedManager: null,
      shootDate: null
    },
    {
      id: 'REQ-102',
      businessName: 'Heritage Spices & Crafts',
      ownerName: 'Lakshmi Menon',
      phone: '+91 98471 99881',
      address: 'East Fort, Thrissur',
      category: 'Organic Foods & Spices',
      estimatedItems: '50-100 items',
      status: 'Photo Shoot Scheduled',
      assignedManager: 'Kavya Nair',
      shootDate: '04 Sept 2026'
    }
  ]);

  // Modal State
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedManager, setSelectedManager] = useState(AVAILABLE_MANAGERS[0].name);
  const [shootDate, setShootDate] = useState('06 Sept 2026');

  const openAssignModal = (req) => {
    setSelectedReq(req);
    // Default matching manager by region if possible
    const match = AVAILABLE_MANAGERS.find(m => req.address.toLowerCase().includes(m.region.toLowerCase().split(' ')[0])) || AVAILABLE_MANAGERS[0];
    setSelectedManager(match.name);
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!selectedReq || !selectedManager) return;

    setRequests(requests.map(req => {
      if (req.id === selectedReq.id) {
        return {
          ...req,
          assignedManager: selectedManager,
          status: 'Photo Shoot Scheduled',
          shootDate: shootDate || '06 Sept 2026'
        };
      }
      return req;
    }));

    setSelectedReq(null);
  };

  return (
    <SuperAdminLayout title="Managed Sales Merchant Requests" subtitle="E-SHOP HQ Request Review & Staff Assignment">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Incoming Managed Sales Applications</h2>
            <p className="text-xs text-slate-500 font-medium">Review store details, assign E-SHOP account managers, and schedule photography visits</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/super-admin/managers"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200/80"
            >
              <UserCheck className="w-4 h-4 text-primary" />
              Manage Account Managers Master
            </Link>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-100 shrink-0">
              {requests.filter(r => !r.assignedManager).length} Pending Assignment
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400">{req.id}</span>
                  <h3 className="text-base font-bold text-slate-900">{req.businessName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                    {req.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {req.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {req.ownerName} ({req.phone})
                  </span>
                  <span>Est. Volume: {req.estimatedItems}</span>
                </div>

                {req.assignedManager && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Manager: <strong>{req.assignedManager}</strong> • Shoot Date: <strong>{req.shootDate}</strong></span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {!req.assignedManager ? (
                  <button
                    onClick={() => openAssignModal(req)}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    Approve Store & Assign Manager
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => openAssignModal(req)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
                    >
                      Reassign
                    </button>
                    <Link
                      to="/admin/dashboard"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Store className="w-4 h-4" />
                      Open Store Admin Dashboard
                    </Link>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Assign Manager Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div>
                <h3 className="text-sm font-black text-slate-900">Assign Account Manager</h3>
                <p className="text-[11px] text-slate-500 font-medium">{selectedReq.businessName} ({selectedReq.id})</p>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignment} className="p-5 space-y-4">
              
              {/* Store Summary Card */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{selectedReq.businessName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-blue-700 font-bold text-[10px] border border-blue-200">
                    {selectedReq.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{selectedReq.address} • {selectedReq.ownerName}</p>
              </div>

              {/* Select Manager Dropdown from Master */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Select Account Manager <span className="text-rose-500">*</span>
                  </label>
                  <Link 
                    to="/super-admin/managers" 
                    target="_blank" 
                    className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5"
                  >
                    Open Master <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                
                <select
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {AVAILABLE_MANAGERS.map((mgr) => (
                    <option key={mgr.id} value={mgr.name}>
                      {mgr.name} — {mgr.region} ({mgr.capacity}) [{mgr.status}]
                    </option>
                  ))}
                </select>
              </div>



              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Assignment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </SuperAdminLayout>
  );
}
