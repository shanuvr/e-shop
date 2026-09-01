import React, { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import { Zap, Calendar, UserCheck, CheckCircle2, Phone, MapPin, Camera, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const handleAssignManager = (id) => {
    const managerName = prompt('Enter E-SHOP Staff / Manager Name to Assign:', 'Kavya Nair');
    if (managerName) {
      setRequests(requests.map(req => {
        if (req.id === id) {
          return {
            ...req,
            assignedManager: managerName,
            status: 'Photo Shoot Scheduled',
            shootDate: '05 Sept 2026'
          };
        }
        return req;
      }));
    }
  };

  return (
    <SuperAdminLayout title="Managed Sales Merchant Requests" subtitle="E-SHOP HQ Request Review & Staff Assignment">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Incoming Managed Sales Applications</h2>
            <p className="text-xs text-slate-500 font-medium">Review store details, assign E-SHOP account managers, and schedule photography visits</p>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-100">
            {requests.filter(r => !r.assignedManager).length} Pending Assignment
          </span>
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
                    <span>Manager: {req.assignedManager} • Shoot Date: {req.shootDate}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {!req.assignedManager ? (
                  <button
                    onClick={() => handleAssignManager(req.id)}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    Approve Store & Assign Manager
                  </button>
                ) : (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Store className="w-4 h-4" />
                      Open Store Admin Dashboard
                    </Link>
                    <Link
                      to="/super-admin/cataloging"
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      Upload Photo Shoot
                    </Link>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </SuperAdminLayout>
  );
}
