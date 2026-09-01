import SuperAdminLayout from '../layout/SuperAdminLayout';
import { Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ManagedSellersPage() {
  const sellers = [
    {
      id: 'S-101',
      name: 'Elite Digital Mall',
      owner: 'Rahul Varma',
      type: 'Marketplace Seller',
      location: 'Swaraj Round, Thrissur',
      status: 'Approved & Active',
      productsCount: 18
    },
    {
      id: 'S-102',
      name: 'Silk Land Textiles',
      owner: 'Suresh Kumar',
      type: 'Managed Sales Seller',
      location: 'Round West, Thrissur',
      status: 'Approved & Active',
      productsCount: 14
    },
    {
      id: 'S-103',
      name: 'Heritage Spices & Crafts',
      owner: 'Lakshmi Menon',
      type: 'Managed Sales Seller',
      location: 'East Fort, Thrissur',
      status: 'Approved & Active',
      productsCount: 9
    }
  ];

  return (
    <SuperAdminLayout title="Managed Sellers" subtitle="Manage merchant stores and open their store admin dashboards">
      <div className="space-y-6">

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Managed Merchant Stores</h2>
            <p className="text-xs text-slate-500 font-medium">Click "Open Store Admin Dashboard" on any store to add products, categories, or manage orders</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100">
            {sellers.length} Active Stores
          </span>
        </div>

        <div className="space-y-4">
          {sellers.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Owner: {s.owner} • Location: {s.location} • {s.productsCount} Products Listed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2.5 bg-primary hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
                >
                  <Store className="w-4 h-4" />
                  Open Store Admin Dashboard
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </SuperAdminLayout>
  );
}